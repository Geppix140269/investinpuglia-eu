import { Resend } from 'resend';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Resend
const RESEND_API_KEY = 're_WoQwLg5D_Lsgj238sCTppCyVVKoTxTc4R';
const resend = new Resend(RESEND_API_KEY);

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5W53Mh-RqugrgyaALsf4ERPKHNiEF4BM",
  authDomain: "invest-in-puglia-eu.firebaseapp.com",
  projectId: "invest-in-puglia-eu",
  storageBucket: "invest-in-puglia-eu.firebasestorage.app",
  messagingSenderId: "515852973978",
  appId: "1:515852973978:web:68df8862710f0b89df5423"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load tracking data
const trackerPath = path.join(__dirname, 'campaign-tracker.json');
let tracker = {};

try {
  tracker = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));
} catch (error) {
  console.log('No previous tracking data found. Starting fresh.');
  tracker = {
    campaign: 'minipia-whatsapp-2024-12',
    sentSuccessfully: [],
    failedToSend: [],
    stats: { totalSent: 0, totalFailed: 0 }
  };
}

// Email template (same as before)
const emailTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0 0 10px 0; font-size: 28px; font-weight: 700;">Unlock 50% Grant Funding for Your Italian Dream</h1>
      <p style="color: #f3e8ff; margin: 0; font-size: 16px;">EU Mini PIA Grants - Now Available for International Investors</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 30px;">
      
      <!-- Greeting -->
      <p style="font-size: 16px; margin: 0 0 20px 0;">Dear Investor,</p>
      
      <!-- Introduction -->
      <p style="font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        You may not know us yet, but we've been helping international investors access millions in EU grants for over 30 years.
      </p>
      
      <!-- Who we are -->
      <p style="font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
        <strong>Who we are:</strong> InvestInPuglia is a specialized advisory firm with a team of technical and business experts who have secured over €50M in Regional and EU grants for project investments in Puglia, Italy.
      </p>
      
      <!-- NEW: WhatsApp/Trullo Integration - SUPER PROMINENT -->
      <div style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; box-shadow: 0 10px 30px rgba(37, 211, 102, 0.3);">
        <h2 style="margin: 0 0 10px 0; font-size: 24px;">🚀 NEW: Instant WhatsApp Support with Trullo AI!</h2>
        <p style="margin: 0 0 15px 0; font-size: 16px; color: #f0f9ff;">
          Get immediate answers about grants, properties, and investments 24/7
        </p>
        <div style="background: white; border-radius: 8px; padding: 15px; margin: 15px 0;">
          <p style="color: #128C7E; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">
            💬 Chat with Trullo on WhatsApp NOW
          </p>
          <a href="https://wa.me/447862140269?text=Hi%20Trullo!%20I%27m%20interested%20in%20Mini%20PIA%20grants" 
             style="display: inline-block; background: #25D366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; margin: 10px 0;">
            <span style="font-size: 20px;">📱</span> +44 7862 140269
          </a>
          <p style="color: #666; font-size: 13px; margin: 10px 0 0 0;">
            Click to start chatting or save this number
          </p>
        </div>
        <p style="margin: 15px 0 0 0; font-size: 14px; color: #e0f2fe;">
          ✓ Instant grant calculations ✓ Property searches ✓ Investment analysis ✓ Available in 5 languages
        </p>
      </div>
      
      <!-- Mini PIA Grant Section -->
      <div style="background: #f8f9fa; border-left: 4px solid #764ba2; padding: 20px; margin: 25px 0;">
        <h2 style="color: #764ba2; margin: 0 0 15px 0; font-size: 20px;">The Mini PIA Grant Opportunity</h2>
        <p style="font-size: 15px; margin: 0 0 15px 0;">
          The Mini PIA is an Italian Regional grant program offering <strong>50% non-refundable funding</strong> for project investments (property acquisition and restructuring) in Puglia - from <strong>€30,000 to €5 million</strong>.
        </p>
        <ul style="margin: 15px 0; padding-left: 20px; font-size: 15px;">
          <li style="margin-bottom: 8px;">Hotels, B&Bs, and tourist accommodations</li>
          <li style="margin-bottom: 8px;">Manufacturing and technology ventures</li>
          <li style="margin-bottom: 8px;">Historic property renovations (including Trulli - 55% funding!)</li>
        </ul>
      </div>
      
      <!-- Rest of email template continues... -->
      
      <!-- Signature -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 15px; margin: 0;">Best regards,</p>
        <p style="font-size: 15px; margin: 10px 0;">
          <strong>Giuseppe Funaro</strong><br>
          Founder & Lead Investment Consultant<br>
          InvestInPuglia.eu
        </p>
        <p style="font-size: 14px; color: #6b7280; margin: 15px 0;">
          💬 WhatsApp: +44 7862 140269 | 📞 Italy: +39 351 400 1402<br>
          📧 g.funaro@investinpuglia.eu | 🌐 investinpuglia.eu
        </p>
      </div>
      
    </div>
  </div>
</body>
</html>`;

async function resumeCampaign() {
  console.log('🔄 RESUMING Mini PIA WhatsApp Campaign\n');
  console.log('='.repeat(60));
  
  // Load previously sent emails
  const sentEmails = new Set(tracker.sentSuccessfully.map(e => e.toLowerCase()));
  const failedEmails = tracker.failedToSend || [];
  
  console.log(`📊 Previous Campaign Status:`);
  console.log(`   ✅ Already sent: ${sentEmails.size} emails`);
  console.log(`   ❌ Failed to send: ${failedEmails.length} emails`);
  console.log(`   📅 Last run: ${tracker.stats?.lastBatchSent || 'Unknown'}\n`);
  
  // Get all contacts from Firebase
  const querySnapshot = await getDocs(collection(db, 'investor_mailing_list'));
  const allContacts = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.email && data.subscribed !== false) {
      allContacts.push(data.email.toLowerCase());
    }
  });
  
  // Filter out already sent emails
  const remainingContacts = allContacts.filter(email => !sentEmails.has(email.toLowerCase()));
  
  console.log(`📬 Contacts to Process:`);
  console.log(`   📋 Total in database: ${allContacts.length}`);
  console.log(`   ✉️ Remaining to send: ${remainingContacts.length}`);
  console.log(`   🔄 Retrying failed: ${failedEmails.length}\n`);
  
  // Combine failed emails (priority) with remaining contacts
  const contactsToSend = [...failedEmails, ...remainingContacts.filter(e => !failedEmails.includes(e))];
  
  if (contactsToSend.length === 0) {
    console.log('✅ All contacts have been sent to!');
    process.exit(0);
  }
  
  // Confirm before sending
  console.log(`⚠️  READY TO SEND TO ${contactsToSend.length} CONTACTS`);
  console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('📤 Starting email delivery...\n');
  
  // Send emails in batches
  const batchSize = 10;
  let sent = 0;
  let failed = 0;
  const newFailedEmails = [];
  const newSentEmails = [];
  
  for (let i = 0; i < contactsToSend.length; i += batchSize) {
    const batch = contactsToSend.slice(i, i + batchSize);
    const batchNumber = Math.floor(i/batchSize) + 1;
    const totalBatches = Math.ceil(contactsToSend.length/batchSize);
    
    console.log(`📦 Batch ${batchNumber}/${totalBatches} - Sending to ${batch.length} recipients...`);
    
    try {
      const { data, error } = await resend.batch.send(
        batch.map(email => ({
          from: 'Giuseppe Funaro <hello@investinpuglia.eu>',
          to: email,
          bcc: 'info@1402celsius.com',
          subject: '💬 WhatsApp Support Now Available! Unlock 50% Grant Funding for Your Italian Dream',
          html: emailTemplate,
          tags: [
            { name: 'campaign', value: 'minipia-whatsapp-resume' },
            { name: 'batch', value: `batch-${batchNumber}` },
            { name: 'resumed', value: 'true' }
          ]
        }))
      );
      
      if (error) {
        console.error(`   ❌ Batch ${batchNumber} error:`, error);
        failed += batch.length;
        newFailedEmails.push(...batch);
        
        // If quota exceeded, stop and save progress
        if (error.name === 'daily_quota_exceeded') {
          console.log('\n⚠️  Daily quota exceeded. Saving progress...');
          break;
        }
      } else {
        console.log(`   ✅ Batch ${batchNumber} sent successfully (${batch.length} emails)`);
        sent += batch.length;
        newSentEmails.push(...batch);
      }
      
      // Progress indicator
      const progress = Math.round((i + batch.length) / contactsToSend.length * 100);
      console.log(`   📊 Progress: ${progress}%\n`);
      
      // Wait between batches
      if (i + batchSize < contactsToSend.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`   ❌ Error sending batch ${batchNumber}:`, error.message);
      failed += batch.length;
      newFailedEmails.push(...batch);
    }
  }
  
  // Update tracker
  tracker.sentSuccessfully = [...new Set([...tracker.sentSuccessfully, ...newSentEmails])];
  tracker.failedToSend = newFailedEmails;
  tracker.stats = {
    totalSent: tracker.sentSuccessfully.length,
    totalFailed: newFailedEmails.length,
    totalProcessed: tracker.sentSuccessfully.length + newFailedEmails.length,
    remainingContacts: allContacts.length - tracker.sentSuccessfully.length,
    lastBatchSent: new Date().toISOString(),
    sessionSent: sent,
    sessionFailed: failed
  };
  
  // Save updated tracker
  fs.writeFileSync(trackerPath, JSON.stringify(tracker, null, 2));
  
  console.log('='.repeat(60));
  console.log('\n📊 SESSION COMPLETE!\n');
  console.log('📈 This Session:');
  console.log(`   ✅ Sent: ${sent} emails`);
  console.log(`   ❌ Failed: ${failed} emails`);
  
  console.log('\n📊 Overall Campaign:');
  console.log(`   ✅ Total sent: ${tracker.sentSuccessfully.length} emails`);
  console.log(`   ❌ Total failed: ${tracker.failedToSend.length} emails`);
  console.log(`   📧 Remaining: ${tracker.stats.remainingContacts} contacts`);
  
  if (newFailedEmails.length > 0) {
    console.log('\n⚠️  Failed emails saved for retry:');
    newFailedEmails.slice(0, 10).forEach(email => {
      console.log(`   - ${email}`);
    });
  }
  
  console.log('\n✅ Progress saved to campaign-tracker.json');
  console.log('   Run this script again tomorrow to continue.');
  
  process.exit(0);
}

// Run the campaign
resumeCampaign().catch(error => {
  console.error('❌ Campaign failed:', error);
  process.exit(1);
});