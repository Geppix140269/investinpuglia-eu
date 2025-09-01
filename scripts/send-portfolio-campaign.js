// scripts/send-portfolio-campaign.js
// Send truthful portfolio email to investor mailing list

require('dotenv').config({ path: './.env.local' });
const { Resend } = require('resend');
const admin = require('firebase-admin');
const fs = require('fs').promises;
const path = require('path');

// Initialize Firebase Admin with service account
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "invest-in-puglia-eu",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);

class PortfolioCampaign {
  constructor() {
    this.sentEmails = [];
    this.failedEmails = [];
    this.htmlTemplate = null;
  }

  async loadTemplate() {
    console.log('📄 Loading email template...');
    const templatePath = path.join(__dirname, '../content/investor-portfolio-email-truthful.html');
    this.htmlTemplate = await fs.readFile(templatePath, 'utf-8');
    console.log('✅ Template loaded successfully');
  }

  async loadInvestors(limit = null) {
    console.log('📥 Loading investors from Firebase...');
    
    try {
      let query = db.collection('investor_mailing_list')
        .where('subscribed', '==', true);
      
      // For safety, let's limit the first batch
      if (limit) {
        query = query.limit(limit);
      }
      
      const snapshot = await query.get();
      const investors = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        // Only include investors with valid email and active/interested status
        if (data.email && (data.status === 'interested' || data.status === 'active' || !data.status)) {
          investors.push({
            id: doc.id,
            email: data.email,
            name: data.name || data.extractedName || 'Valued Investor'
          });
        }
      });
      
      console.log(`✅ Found ${investors.length} active investors`);
      return investors;
      
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
      
      // Update last email sent timestamp
      try {
        await db.collection('investor_mailing_list').doc(investor.id).update({
          lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
          lastCampaign: 'portfolio_expertise',
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } catch (updateError) {
        console.warn(`Warning: Could not update timestamp for ${investor.email}`);
      }
      
      this.sentEmails.push(investor.email);
      console.log(`✅ Sent to ${investor.email}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to send to ${investor.email}: ${error.message}`);
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
    const { limit = 50, batchSize = 5, delay = 2000 } = options;
    
    console.log('🚀 Starting Portfolio Email Campaign');
    console.log('=====================================\n');
    console.log(`📧 Sending to first ${limit} investors in batches of ${batchSize}\n`);
    
    try {
      // Load template
      await this.loadTemplate();
      
      // Load investors
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
        
        // Send emails in current batch
        for (const investor of batch) {
          await this.sendEmail(investor);
          // Small delay between individual emails
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Delay between batches
        if (i + batchSize < investors.length) {
          console.log(`⏳ Waiting ${delay/1000}s before next batch...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      
      // Save report
      const report = await this.saveReport();
      
      // Print summary
      console.log('\n=====================================');
      console.log('📊 CAMPAIGN COMPLETE');
      console.log('=====================================');
      console.log(`✅ Successfully sent: ${report.stats.sent}`);
      console.log(`❌ Failed: ${report.stats.failed}`);
      console.log(`📧 Total processed: ${report.stats.total}`);
      console.log('=====================================\n');
      
      if (this.failedEmails.length > 0) {
        console.log('Failed emails:');
        this.failedEmails.forEach(f => {
          console.log(`  - ${f.email}: ${f.error}`);
        });
      }
      
    } catch (error) {
      console.error('Fatal error:', error);
      process.exit(1);
    }
  }
}

// Run the campaign
if (require.main === module) {
  const campaign = new PortfolioCampaign();
  
  // Start with first 50 investors for safety
  // Increase limit or remove it to send to all
  campaign.run({
    limit: 50,      // Send to first 50 investors
    batchSize: 5,   // 5 emails per batch
    delay: 2000     // 2 second delay between batches
  }).catch(console.error);
}

module.exports = PortfolioCampaign;