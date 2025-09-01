// scripts/send-campaign-simple.js
// Simple campaign sender using Resend API directly

require('dotenv').config({ path: './.env.local' });
const { Resend } = require('resend');
const fs = require('fs').promises;
const path = require('path');

const resend = new Resend(process.env.RESEND_API_KEY);

// Your investor mailing list - add emails here
// These should be taken from your Firebase database
const INVESTOR_LIST = [
  // Add your investor emails here
  // Format: { email: 'investor@example.com', name: 'Investor Name' }
  // Start with a small test batch
];

class SimplePortfolioCampaign {
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

  async run(investors) {
    console.log('🚀 Portfolio Email Campaign');
    console.log('===========================\n');
    
    if (!investors || investors.length === 0) {
      console.log('⚠️  No investors provided!');
      console.log('\nTo use this script:');
      console.log('1. Export your investor emails from Firebase');
      console.log('2. Add them to the INVESTOR_LIST array in this file');
      console.log('3. Run the script again\n');
      return;
    }
    
    console.log(`📧 Sending to ${investors.length} investors\n`);
    
    try {
      await this.loadTemplate();
      
      // Send emails with delay between each
      for (const investor of investors) {
        await this.sendEmail(investor);
        // 1 second delay between emails
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Summary
      console.log('\n===========================');
      console.log('📊 CAMPAIGN COMPLETE');
      console.log('===========================');
      console.log(`✅ Sent: ${this.sentEmails.length}`);
      console.log(`❌ Failed: ${this.failedEmails.length}`);
      console.log('===========================\n');
      
      if (this.failedEmails.length > 0) {
        console.log('Failed emails:');
        this.failedEmails.forEach(f => {
          console.log(`  - ${f.email}: ${f.error}`);
        });
      }
      
      // Save report
      const report = {
        date: new Date().toISOString(),
        sent: this.sentEmails,
        failed: this.failedEmails
      };
      
      const fileName = `campaign-report-${new Date().toISOString().split('T')[0]}.json`;
      await fs.writeFile(fileName, JSON.stringify(report, null, 2));
      console.log(`\n📊 Report saved to ${fileName}`);
      
    } catch (error) {
      console.error('Fatal error:', error);
    }
  }
}

// Run the campaign
if (require.main === module) {
  const campaign = new SimplePortfolioCampaign();
  
  // For now, let's send a test to your email
  // Replace this with your actual investor list from Firebase
  const testInvestors = [
    { email: 'info@1402celsius.com', name: 'Test Investor' }
    // Add more investors here from your Firebase export
  ];
  
  campaign.run(testInvestors).catch(console.error);
}

module.exports = SimplePortfolioCampaign;