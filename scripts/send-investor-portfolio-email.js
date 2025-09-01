// scripts/send-investor-portfolio-email.js
// Email campaign to send portfolio showcase to investor mailing list

require('dotenv').config({ path: './.env.local' });
const { Resend } = require('resend');
const admin = require('firebase-admin');
const fs = require('fs').promises;
const path = require('path');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);

class InvestorPortfolioEmailer {
  constructor() {
    this.sentEmails = [];
    this.failedEmails = [];
    this.htmlTemplate = null;
  }

  async loadEmailTemplate() {
    console.log('📄 Loading email template...');
    const templatePath = path.join(__dirname, '../content/investor-portfolio-email.html');
    this.htmlTemplate = await fs.readFile(templatePath, 'utf-8');
    console.log('✅ Template loaded successfully');
  }

  async loadInvestors(testMode = false, limit = null) {
    console.log('📥 Loading investors from Firebase...');
    
    let query = db.collection('investor_mailing_list')
      .where('status', 'in', ['interested', 'active'])
      .where('subscribed', '==', true);
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const snapshot = await query.get();
    const investors = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      investors.push({
        id: doc.id,
        email: data.email,
        name: data.name || data.extractedName || 'Valued Investor',
        tags: data.tags || [],
        source: data.source,
        lastEmailSent: data.lastEmailSent
      });
    });
    
    console.log(`✅ Found ${investors.length} investors to email`);
    
    if (testMode) {
      // In test mode, only send to test email
      return [{
        id: 'test',
        email: 'info@1402celsius.com',
        name: 'Test Investor'
      }];
    }
    
    return investors;
  }

  personalizeTemplate(template, investor) {
    let personalized = template;
    
    // Replace name
    personalized = personalized.replace(/Dear Valued Investor/g, `Dear ${investor.name}`);
    
    // Add UTM parameters to links for tracking
    const utmParams = `?utm_source=email&utm_medium=portfolio&utm_campaign=investor_portfolio_${new Date().toISOString().split('T')[0]}`;
    personalized = personalized.replace(/href="https:\/\/investinpuglia\.eu\/(portfolio|consultation)"/g, 
      `href="https://investinpuglia.eu/$1${utmParams}"`);
    
    // Add unsubscribe link
    const unsubscribeLink = `https://investinpuglia.eu/unsubscribe?email=${encodeURIComponent(investor.email)}&id=${investor.id}`;
    personalized = personalized.replace(/\[UNSUBSCRIBE_LINK\]/g, unsubscribeLink);
    
    return personalized;
  }

  async sendEmail(investor) {
    try {
      const personalizedHtml = this.personalizeTemplate(this.htmlTemplate, investor);
      
      const { data, error } = await resend.emails.send({
        from: 'Giuseppe Funaro <info@investinpuglia.eu>',
        to: investor.email,
        subject: '🏆 See How We Turned €100M Into Profitable Puglia Investments - Your Opportunity Inside',
        html: personalizedHtml,
        tags: [
          { name: 'campaign', value: 'portfolio_showcase' },
          { name: 'type', value: 'investor_nurture' }
        ]
      });
      
      if (error) {
        throw error;
      }
      
      // Update Firestore with email sent timestamp
      await db.collection('investor_mailing_list').doc(investor.id).update({
        lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
        emailsSent: admin.firestore.FieldValue.increment(1),
        lastCampaign: 'portfolio_showcase',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      this.sentEmails.push({
        email: investor.email,
        name: investor.name,
        messageId: data.id,
        timestamp: new Date().toISOString()
      });
      
      console.log(`✅ Sent to ${investor.name} (${investor.email})`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to send to ${investor.email}: ${error.message}`);
      this.failedEmails.push({
        email: investor.email,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      return false;
    }
  }

  async saveCampaignReport() {
    const report = {
      campaign: 'portfolio_showcase',
      date: new Date().toISOString(),
      stats: {
        total: this.sentEmails.length + this.failedEmails.length,
        sent: this.sentEmails.length,
        failed: this.failedEmails.length,
        successRate: `${((this.sentEmails.length / (this.sentEmails.length + this.failedEmails.length)) * 100).toFixed(1)}%`
      },
      sentEmails: this.sentEmails,
      failedEmails: this.failedEmails
    };
    
    // Save to Firestore
    await db.collection('email_campaigns').add({
      ...report,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Save to local file
    const fileName = `campaign-report-portfolio-${new Date().toISOString().split('T')[0]}.json`;
    await fs.writeFile(fileName, JSON.stringify(report, null, 2));
    
    console.log(`\n📊 Report saved to ${fileName} and Firestore`);
    
    return report;
  }

  async run(options = {}) {
    const {
      testMode = false,
      batchSize = 10,
      delayBetweenBatches = 5000,
      limit = null
    } = options;
    
    console.log('🚀 Starting Portfolio Email Campaign');
    console.log('=====================================\n');
    
    if (testMode) {
      console.log('⚠️  Running in TEST MODE - Only sending to test email\n');
    }
    
    try {
      // Load template
      await this.loadEmailTemplate();
      
      // Load investors
      const investors = await this.loadInvestors(testMode, limit);
      
      if (investors.length === 0) {
        console.log('No investors to email. Exiting.');
        return;
      }
      
      console.log(`\n📧 Sending emails in batches of ${batchSize}...\n`);
      
      // Send emails in batches
      for (let i = 0; i < investors.length; i += batchSize) {
        const batch = investors.slice(i, i + batchSize);
        console.log(`\nBatch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(investors.length/batchSize)}`);
        
        // Send emails in parallel within batch
        await Promise.all(
          batch.map(investor => this.sendEmail(investor))
        );
        
        // Delay between batches to avoid rate limits
        if (i + batchSize < investors.length) {
          console.log(`⏳ Waiting ${delayBetweenBatches/1000}s before next batch...`);
          await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
      }
      
      // Generate and save report
      const report = await this.saveCampaignReport();
      
      // Print summary
      console.log('\n=====================================');
      console.log('📊 CAMPAIGN SUMMARY');
      console.log('=====================================');
      console.log(`✅ Successfully sent: ${report.stats.sent}`);
      console.log(`❌ Failed: ${report.stats.failed}`);
      console.log(`📈 Success rate: ${report.stats.successRate}`);
      console.log('=====================================\n');
      
      if (this.failedEmails.length > 0) {
        console.log('Failed emails:');
        this.failedEmails.forEach(f => {
          console.log(`  - ${f.email}: ${f.error}`);
        });
      }
      
    } catch (error) {
      console.error('Fatal error in campaign:', error);
      process.exit(1);
    }
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    testMode: args.includes('--test'),
    limit: args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : null,
    batchSize: args.includes('--batch') ? parseInt(args[args.indexOf('--batch') + 1]) : 10
  };
  
  if (args.includes('--help')) {
    console.log(`
Portfolio Email Campaign Tool
=============================

Usage: node send-investor-portfolio-email.js [options]

Options:
  --test          Run in test mode (only sends to test email)
  --limit <n>     Limit number of emails to send
  --batch <n>     Set batch size (default: 10)
  --help          Show this help message

Examples:
  node send-investor-portfolio-email.js --test
  node send-investor-portfolio-email.js --limit 50 --batch 5
  node send-investor-portfolio-email.js
    `);
    process.exit(0);
  }
  
  const emailer = new InvestorPortfolioEmailer();
  emailer.run(options).catch(console.error);
}

module.exports = InvestorPortfolioEmailer;