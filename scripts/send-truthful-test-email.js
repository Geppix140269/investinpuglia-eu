// scripts/send-truthful-test-email.js
// Send the truthful portfolio email highlighting real USPs

require('dotenv').config({ path: './.env.local' });
const { Resend } = require('resend');
const fs = require('fs').promises;
const path = require('path');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  console.log('📧 Sending truthful portfolio test email...\n');
  
  try {
    // Load the HTML template
    const templatePath = path.join(__dirname, '../content/investor-portfolio-email-truthful.html');
    let htmlTemplate = await fs.readFile(templatePath, 'utf-8');
    
    // Replace placeholders
    htmlTemplate = htmlTemplate.replace(/\[UNSUBSCRIBE_LINK\]/g, 'https://investinpuglia.eu/unsubscribe');
    
    const { data, error } = await resend.emails.send({
      from: 'Giuseppe Funaro <info@investinpuglia.eu>',
      to: 'info@1402celsius.com',
      subject: 'Your Puglia Investment Success: 100+ Years Experience, €25M+ Grants Secured',
      html: htmlTemplate
    });
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Email ID:', data.id);
    console.log('📬 Sent to: info@1402celsius.com');
    console.log('\n📋 This email highlights your REAL USPs:');
    console.log('   • 100+ years combined team experience');
    console.log('   • International business expertise');
    console.log('   • Local grant planning specialists');
    console.log('   • Technical project management team');
    console.log('   • €100M+ portfolio of managed projects');
    console.log('   • €25M+ in grants secured for clients');
    
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    process.exit(1);
  }
}

// Run immediately
sendTestEmail();