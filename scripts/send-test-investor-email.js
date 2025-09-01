// scripts/send-test-investor-email.js
// Simple test script to send portfolio email to test address

require('dotenv').config({ path: './.env.local' });
const { Resend } = require('resend');
const fs = require('fs').promises;
const path = require('path');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  console.log('📧 Sending investor portfolio test email...\n');
  
  try {
    // Load the HTML template
    const templatePath = path.join(__dirname, '../content/investor-portfolio-email.html');
    let htmlTemplate = await fs.readFile(templatePath, 'utf-8');
    
    // Personalize for test
    htmlTemplate = htmlTemplate.replace(/Dear Valued Investor/g, 'Dear Test Investor');
    htmlTemplate = htmlTemplate.replace(/\[UNSUBSCRIBE_LINK\]/g, 'https://investinpuglia.eu/unsubscribe');
    
    // Add UTM parameters for tracking
    const utmParams = '?utm_source=email&utm_medium=test&utm_campaign=portfolio_test';
    htmlTemplate = htmlTemplate.replace(/href="https:\/\/investinpuglia\.eu\/(portfolio|consultation)"/g, 
      `href="https://investinpuglia.eu/$1${utmParams}"`);
    
    const { data, error } = await resend.emails.send({
      from: 'Giuseppe Funaro <info@investinpuglia.eu>',
      to: 'info@1402celsius.com',
      subject: '🏆 TEST: See How We Turned €100M Into Profitable Puglia Investments - Your Opportunity Inside',
      html: htmlTemplate
    });
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Email ID:', data.id);
    console.log('📬 Sent to: info@1402celsius.com');
    console.log('\n🔍 Check your inbox for the investor portfolio email');
    console.log('📊 Subject: "TEST: See How We Turned €100M Into Profitable Puglia Investments"');
    
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    process.exit(1);
  }
}

// Run immediately
sendTestEmail();