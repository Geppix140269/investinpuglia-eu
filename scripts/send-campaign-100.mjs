import { Resend } from 'resend';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

// Email template with WhatsApp/Trullo integration
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
      
      <!-- Urgency Banner -->
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%); color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 25px 0;">
        <p style="margin: 0; font-size: 16px; font-weight: 600;">⏰ URGENT: Mini PIA ends in 2027 - First Come, First Served!</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Limited funds remaining • Applications processed in order received</p>
      </div>
      
      <!-- Why reach out now -->
      <p style="font-size: 15px; margin: 20px 0;">
        <strong>Why reach out now?</strong> The next application window closes soon, and preparation takes 4-6 weeks.
      </p>
      
      <!-- Our Team Combined Experience -->
      <div style="margin: 25px 0;">
        <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 15px 0;">Our Team's Combined Experience at Your Service:</h3>
        <div style="font-size: 15px; line-height: 1.8;">
          ✅ 30+ years experience in EU/Regional grants<br>
          ✅ 95% grant approval success rate<br>
          ✅ Complete application management<br>
          ✅ Property sourcing and due diligence<br>
          ✅ WhatsApp support with Trullo AI 24/7
        </div>
      </div>
      
      <!-- Free Tools with WhatsApp CTA -->
      <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <h3 style="color: #0369a1; font-size: 16px; margin: 0 0 15px 0;">Free Tools to Get Started:</h3>
        <div style="font-size: 15px; line-height: 1.8;">
          💬 <a href="https://wa.me/447862140269" style="color: #25D366; font-weight: 600;">WhatsApp Trullo AI</a> - Instant answers on +44 7862 140269<br>
          🧮 <a href="https://investinpuglia.eu/tools" style="color: #0369a1; font-weight: 600;">InvestiScope Calculator</a> - Calculate your grant eligibility instantly<br>
          🤖 <a href="https://investinpuglia.eu" style="color: #0369a1; font-weight: 600;">Web Chat with Trullo</a> - Our AI assistant on the website<br>
          📊 <a href="https://investinpuglia.eu/portfolio" style="color: #0369a1;">View Our Portfolio</a> - €50M+ in successful projects
        </div>
      </div>
      
      <!-- CTA Section - EMPHASIZING FREE & WhatsApp -->
      <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;">
        <h3 style="color: #7c2d12; margin: 0 0 10px 0; font-size: 18px;">Ready to Secure Your Mini PIA Grant?</h3>
        
        <div style="background: white; border-radius: 6px; padding: 15px; margin: 15px 0;">
          <p style="color: #dc2626; font-size: 20px; font-weight: 700; margin: 0;">🎉 FREE CONSULTATION for First 50 Investors! 🎉</p>
          <p style="color: #7c2d12; font-size: 16px; margin: 10px 0;">Use code: <span style="background: #fef3c7; padding: 2px 8px; border-radius: 4px; font-weight: 600;">MINIPIA50</span></p>
          <p style="color: #059669; font-size: 14px; margin: 5px 0;">100% FREE for the first 50 bookings (normally €60-€100)</p>
        </div>
        
        <p style="color: #7c2d12; font-size: 14px; margin: 10px 0;">
          Professional consultation with Giuseppe Funaro<br>
          30+ years of grant expertise • 95% success rate
        </p>
        
        <!-- WhatsApp Quick Contact -->
        <div style="background: #25D366; border-radius: 6px; padding: 12px; margin: 15px 0;">
          <p style="color: white; font-size: 14px; margin: 0;">
            <strong>Quick Question?</strong> WhatsApp us: +44 7862 140269
          </p>
        </div>
        
        <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 15px 0;">⏰ Only 37 FREE spots remaining!</p>
        
        <a href="https://investinpuglia.eu/book-consultation?utm_source=email&utm_medium=campaign&utm_campaign=minipia50&code=MINIPIA50" 
           style="display: inline-block; background: #7c2d12; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-top: 10px;">
          Book Your FREE Consultation →
        </a>
      </div>
      
      <!-- Why Choose Section -->
      <div style="margin: 25px 0;">
        <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 15px 0;">Why Choose InvestInPuglia?</h3>
        <div style="font-size: 14px; line-height: 1.8; color: #4b5563;">
          ✓ Direct relationships with regional grant authorities<br>
          ✓ Complete end-to-end service from property search to grant approval<br>
          ✓ Multi-lingual team (English, Italian, German, French, Spanish)<br>
          ✓ WhatsApp support with AI-powered Trullo assistant<br>
          ✓ No upfront fees for initial consultation<br>
          ✓ Success-based pricing available for qualified projects
        </div>
      </div>
      
      <!-- Contact Options Section -->
      <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
        <h3 style="color: #581c87; margin: 0 0 15px 0;">Multiple Ways to Connect</h3>
        <div style="display: inline-block; text-align: left;">
          <p style="margin: 5px 0; color: #6b21a8;">
            💬 <strong>WhatsApp:</strong> <a href="https://wa.me/447862140269" style="color: #25D366; text-decoration: none;">+44 7862 140269</a>
          </p>
          <p style="margin: 5px 0; color: #6b21a8;">
            📞 <strong>Call Italy:</strong> <a href="tel:+393514001402" style="color: #6b21a8; text-decoration: none;">+39 351 400 1402</a>
          </p>
          <p style="margin: 5px 0; color: #6b21a8;">
            📧 <strong>Email:</strong> <a href="mailto:g.funaro@investinpuglia.eu" style="color: #6b21a8; text-decoration: none;">g.funaro@investinpuglia.eu</a>
          </p>
          <p style="margin: 5px 0; color: #6b21a8;">
            🌐 <strong>Web:</strong> <a href="https://investinpuglia.eu" style="color: #6b21a8; text-decoration: none;">investinpuglia.eu</a>
          </p>
        </div>
      </div>
      
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
      
      <!-- Footer -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
          This email was sent to you because you expressed interest in Italian property investment opportunities.
        </p>
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 10px 0;">
          InvestInPuglia.eu | 1402 Celsius Ltd | Puglia, Italy<br>
          <a href="{{{unsubscribe}}}" style="color: #9ca3af;">Unsubscribe</a> | 
          <a href="https://investinpuglia.eu/privacy" style="color: #9ca3af;">Privacy Policy</a>
        </p>
      </div>
      
    </div>
  </div>
</body>
</html>`;

async function sendTo100Contacts() {
  console.log('🚀 Starting Mini PIA WhatsApp Campaign - First 100 Contacts\n');
  console.log('='.repeat(60));
  
  // Get all contacts from Firebase
  const querySnapshot = await getDocs(collection(db, 'investor_mailing_list'));
  const contacts = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.email && data.subscribed !== false) {
      contacts.push(data.email);
    }
  });
  
  // Limit to first 100 contacts
  const targetContacts = contacts.slice(0, 100);
  
  console.log(`📊 Campaign Statistics:`);
  console.log(`   Total contacts in database: ${contacts.length}`);
  console.log(`   Sending to first: 100 contacts`);
  console.log(`   Subject: "💬 WhatsApp Support Now Available! Unlock 50% Grant Funding"`);
  console.log(`   Features: WhatsApp/Trullo AI integration\n`);
  
  if (targetContacts.length === 0) {
    console.log('❌ No contacts found!');
    process.exit(1);
  }
  
  // Confirm before sending
  console.log('⚠️  READY TO SEND TO 100 CONTACTS');
  console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('📤 Starting email delivery...\n');
  
  // Send emails in batches of 10
  const batchSize = 10;
  let sent = 0;
  let failed = 0;
  const failedEmails = [];
  
  for (let i = 0; i < targetContacts.length; i += batchSize) {
    const batch = targetContacts.slice(i, i + batchSize);
    const batchNumber = Math.floor(i/batchSize) + 1;
    const totalBatches = Math.ceil(targetContacts.length/batchSize);
    
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
            { name: 'campaign', value: 'minipia-whatsapp-100' },
            { name: 'batch', value: `batch-${batchNumber}` },
            { name: 'feature', value: 'whatsapp-trullo' }
          ]
        }))
      );
      
      if (error) {
        console.error(`   ❌ Batch ${batchNumber} error:`, error);
        failed += batch.length;
        failedEmails.push(...batch);
      } else {
        console.log(`   ✅ Batch ${batchNumber} sent successfully (${batch.length} emails)`);
        sent += batch.length;
      }
      
      // Progress indicator
      const progress = Math.round((i + batch.length) / targetContacts.length * 100);
      console.log(`   📊 Progress: ${progress}%\n`);
      
      // Wait 1 second between batches to avoid rate limits
      if (i + batchSize < targetContacts.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`   ❌ Error sending batch ${batchNumber}:`, error.message);
      failed += batch.length;
      failedEmails.push(...batch);
    }
  }
  
  console.log('='.repeat(60));
  console.log('\n🎉 CAMPAIGN COMPLETE!\n');
  console.log('📈 Final Statistics:');
  console.log(`   ✅ Successfully sent: ${sent} emails`);
  console.log(`   ❌ Failed: ${failed} emails`);
  console.log(`   📊 Success rate: ${Math.round(sent/targetContacts.length * 100)}%`);
  console.log(`   📧 Total processed: ${targetContacts.length} contacts`);
  
  if (failedEmails.length > 0) {
    console.log('\n⚠️  Failed emails (first 10):');
    failedEmails.slice(0, 10).forEach(email => {
      console.log(`   - ${email}`);
    });
  }
  
  console.log('\n💡 Next Steps:');
  console.log('   1. Monitor WhatsApp for incoming messages');
  console.log('   2. Check email analytics in Resend dashboard');
  console.log('   3. Follow up with engaged contacts');
  console.log('   4. Track consultation bookings with code MINIPIA50');
  
  process.exit(0);
}

// Run the campaign
sendTo100Contacts().catch(error => {
  console.error('❌ Campaign failed:', error);
  process.exit(1);
});