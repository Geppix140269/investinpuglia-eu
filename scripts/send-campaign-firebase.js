// scripts/send-campaign-firebase.js
// Send portfolio email campaign using Firebase and Resend

require('dotenv').config({ path: './.env.local' });
const { Resend } = require('resend');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');
const fs = require('fs').promises;
const path = require('path');

// Firebase configuration from your environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "invest-in-puglia-eu.firebaseapp.com",
  projectId: "invest-in-puglia-eu",
  storageBucket: "invest-in-puglia-eu.firebasestorage.app",
  messagingSenderId: "515052973978",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const resend = new Resend(process.env.RESEND_API_KEY);

class FirebasePortfolioCampaign {
  constructor() {
    this.sentEmails = [];
    this.failedEmails = [];
    this.htmlTemplate = null;
  }

  async loadTemplate() {
    console.log('📄 Loading email template...');
    const templatePath = path.join(__dirname, '../content/investor-portfolio-email-truthful.html');
    this.htmlTemplate = await fs.readFile(templatePath, 'utf-8');
    console.log('✅ Template loaded\n');
  }

  async loadInvestors(limit = null) {
    console.log('📥 Loading investors from Firebase...');
    
    try {
      const investorsRef = collection(db, 'investor_mailing_list');
      let q = query(investorsRef, where('subscribed', '==', true));
      
      const querySnapshot = await getDocs(q);
      const investors = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email && (data.status === 'interested' || data.status === 'active' || !data.status)) {
          investors.push({
            id: doc.id,
            email: data.email,
            name: data.name || data.extractedName || 'Valued Investor'
          });
        }
      });
      
      // Apply limit if specified
      const finalInvestors = limit ? investors.slice(0, limit) : investors;
      
      console.log(`✅ Found ${finalInvestors.length} active investors`);
      return finalInvestors;
      
    } catch (error) {
      console.error('Error loading investors:', error);
      return [];
    }
  }

  personalizeTemplate(template, investor) {
    let personalized = template;
    
    // Add unsubscribe link
    const unsubscribeLink = `https://investinpuglia.eu/unsubscribe?email=${encodeURIComponent(investor.email)}`;
    personalized = personalized.replace(/\[UNSUBSCRIBE_LINK\]/g, unsubscribeLink);
    
    // Add UTM tracking
    const utmParams = `?utm_source=email&utm_medium=portfolio&utm_campaign=expertise_showcase`;
    personalized = personalized.replace(/href="https:\/\/investinpuglia\.eu\/(portfolio|consultation)"/g, 
      `href="https://investinpuglia.eu/$1${utmParams}"`);
    
    return personalized;
  }

  async sendEmail(investor) {
    try {
      const personalizedHtml = this.personalizeTemplate(this.htmlTemplate, investor);
      
      const { data, error } = await resend.emails.send({
        from: 'Giuseppe Funaro <info@investinpuglia.eu>',
        to: investor.email,
        subject: 'Your Puglia Investment Success: 100+ Years Experience, €25M+ Grants Secured',
        html: personalizedHtml
      });
      
      if (error) {
        throw error;
      }
      
      // Update last email sent timestamp in Firebase
      try {
        const investorRef = doc(db, 'investor_mailing_list', investor.id);
        await updateDoc(investorRef, {
          lastEmailSent: new Date(),
          lastCampaign: 'portfolio_expertise',
          updatedAt: new Date()
        });
      } catch (updateError) {
        console.warn(`Warning: Could not update timestamp for ${investor.email}`);
      }
      
      this.sentEmails.push(investor.email);
      console.log(`✅ Sent to ${investor.email}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed: ${investor.email} - ${error.message}`);
      this.failedEmails.push({
        email: investor.email,
        error: error.message
      });
      return false;
    }
  }

  async saveReport() {
    const report = {
      campaign: 'portfolio_expertise',
      date: new Date().toISOString(),
      subject: 'Your Puglia Investment Success: 100+ Years Experience, €25M+ Grants Secured',
      stats: {
        total: this.sentEmails.length + this.failedEmails.length,
        sent: this.sentEmails.length,
        failed: this.failedEmails.length
      },
      sentEmails: this.sentEmails,
      failedEmails: this.failedEmails
    };
    
    const fileName = `campaign-report-${new Date().toISOString().split('T')[0]}.json`;
    await fs.writeFile(fileName, JSON.stringify(report, null, 2));
    
    console.log(`\n📊 Report saved to ${fileName}`);
    return report;
  }

  async run(options = {}) {
    const { 
      limit = 50,        // Start with 50 for safety
      batchSize = 5,     // Send 5 at a time
      delay = 2000       // 2 second delay between batches
    } = options;
    
    console.log('🚀 Portfolio Email Campaign');
    console.log('===========================\n');
    console.log(`📧 Campaign: 100+ Years Experience, €25M+ Grants Secured`);
    console.log(`📨 Sending to first ${limit} investors`);
    console.log(`⚙️  Batch size: ${batchSize}, Delay: ${delay/1000}s\n`);
    
    try {
      // Load template
      await this.loadTemplate();
      
      // Load investors from Firebase
      const investors = await this.loadInvestors(limit);
      
      if (investors.length === 0) {
        console.log('No active investors found.');
        return;
      }
      
      console.log(`\n📨 Starting to send emails...\n`);
      
      // Send emails in batches
      for (let i = 0; i < investors.length; i += batchSize) {
        const batch = investors.slice(i, i + batchSize);
        console.log(`\nBatch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(investors.length/batchSize)}`);
        console.log('─────────────────────');
        
        // Send emails in current batch
        for (const investor of batch) {
          await this.sendEmail(investor);
          // Small delay between individual emails
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Delay between batches
        if (i + batchSize < investors.length) {
          console.log(`\n⏳ Waiting ${delay/1000}s before next batch...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      
      // Save report
      const report = await this.saveReport();
      
      // Print summary
      console.log('\n===========================');
      console.log('📊 CAMPAIGN COMPLETE');
      console.log('===========================');
      console.log(`✅ Successfully sent: ${report.stats.sent}`);
      console.log(`❌ Failed: ${report.stats.failed}`);
      console.log(`📧 Total processed: ${report.stats.total}`);
      console.log('===========================\n');
      
      if (this.failedEmails.length > 0) {
        console.log('Failed emails:');
        this.failedEmails.forEach(f => {
          console.log(`  - ${f.email}: ${f.error}`);
        });
      }
      
      console.log('\n✨ Campaign completed successfully!');
      
    } catch (error) {
      console.error('Fatal error:', error);
      process.exit(1);
    }
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    console.log(`
Portfolio Email Campaign
========================

Usage: node send-campaign-firebase.js [options]

Options:
  --limit <n>     Number of emails to send (default: 50)
  --batch <n>     Batch size (default: 5)
  --delay <n>     Delay between batches in ms (default: 2000)
  --all           Send to all subscribers (removes limit)
  --help          Show this help message

Examples:
  node send-campaign-firebase.js                    # Send to first 50
  node send-campaign-firebase.js --limit 100        # Send to first 100
  node send-campaign-firebase.js --all              # Send to all
  node send-campaign-firebase.js --limit 20 --batch 2 --delay 5000
    `);
    process.exit(0);
  }
  
  const campaign = new FirebasePortfolioCampaign();
  
  const options = {
    limit: args.includes('--all') ? null : (args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : 50),
    batchSize: args.includes('--batch') ? parseInt(args[args.indexOf('--batch') + 1]) : 5,
    delay: args.includes('--delay') ? parseInt(args[args.indexOf('--delay') + 1]) : 2000
  };
  
  console.log('Starting campaign with options:', options);
  
  campaign.run(options).catch(console.error);
}

module.exports = FirebasePortfolioCampaign;