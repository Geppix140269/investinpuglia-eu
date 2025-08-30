import { Resend } from 'resend';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Initialize Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY';
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

// Professional email template matching yesterday's test
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
        <strong>Who we are:</strong> InvestInPuglia is a specialized advisory firm with a team of technical and business experts who have secured over €50M in Regional and EU grants for property investments in Puglia, Italy.
      </p>
      
      <!-- Mini PIA Grant Section -->
      <div style="background: #f8f9fa; border-left: 4px solid #764ba2; padding: 20px; margin: 25px 0;">
        <h2 style="color: #764ba2; margin: 0 0 15px 0; font-size: 20px;">The Mini PIA Grant Opportunity</h2>
        <p style="font-size: 15px; margin: 0 0 15px 0;">
          The Mini PIA is an Italian Regional grant program offering <strong>50% non-refundable funding</strong> for property investments in Puglia - from €30,000 to €2.75 million.
        </p>
        <ul style="margin: 15px 0; padding-left: 20px; font-size: 15px;">
          <li style="margin-bottom: 8px;">Hotels, B&Bs, and tourist accommodations</li>
          <li style="margin-bottom: 8px;">Restaurants and hospitality businesses</li>
          <li style="margin-bottom: 8px;">Manufacturing and technology ventures</li>
          <li style="margin-bottom: 8px;">Historic property renovations (including Trulli)</li>
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
      
      <!-- Our Expertise -->
      <div style="margin: 25px 0;">
        <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 15px 0;">Our Expertise at Your Service:</h3>
        <div style="font-size: 15px; line-height: 1.8;">
          ✅ 30+ years experience in EU/Regional grants<br>
          ✅ 95% grant approval success rate<br>
          ✅ Complete application management<br>
          ✅ Property sourcing and due diligence<br>
          ✅ AI Assistant "Trullo" for 24/7 support
        </div>
      </div>
      
      <!-- Free Tools -->
      <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <h3 style="color: #0369a1; font-size: 16px; margin: 0 0 15px 0;">Free Tools to Get Started:</h3>
        <div style="font-size: 15px; line-height: 1.8;">
          🧮 <a href="https://investinpuglia.eu/calculator" style="color: #0369a1; text-decoration: none;">InvestiScope Calculator</a> - Calculate your grant eligibility instantly<br>
          🤖 <a href="https://investinpuglia.eu" style="color: #0369a1; text-decoration: none;">Meet Trullo</a> - Our AI assistant for immediate answers<br>
          📊 <a href="https://investinpuglia.eu/portfolio" style="color: #0369a1; text-decoration: none;">View Our Portfolio</a> - €50M+ in successful projects
        </div>
      </div>
      
      <!-- CTA Section -->
      <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;">
        <h3 style="color: #7c2d12; margin: 0 0 10px 0; font-size: 18px;">Ready to Secure Your Mini PIA Grant?</h3>
        
        <div style="background: white; border-radius: 6px; padding: 15px; margin: 15px 0;">
          <p style="color: #dc2626; font-size: 18px; font-weight: 700; margin: 0;">🎉 LIMITED TIME: 50% OFF First 50 Bookings! 🎉</p>
          <p style="color: #7c2d12; font-size: 16px; margin: 10px 0;">Use code: <span style="background: #fef3c7; padding: 2px 8px; border-radius: 4px; font-weight: 600;">MINIPIA50</span></p>
        </div>
        
        <p style="color: #7c2d12; font-size: 14px; margin: 10px 0;">
          Professional consultation with Giuseppe Funaro<br>
          30+ years of grant expertise • 95% success rate
        </p>
        
        <div style="background: white; border-radius: 6px; padding: 12px; margin: 15px 0;">
          <p style="color: #374151; font-size: 14px; margin: 0;">
            <strong>Investment in Expert Guidance:</strong><br>
            Regular: €60 (30 min) | €100 (60 min)<br>
            <span style="color: #059669; font-weight: 600;">With MINIPIA50: €30 | €50</span>
          </p>
        </div>
        
        <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 15px 0;">⏰ Only 37 discounted spots remaining!</p>
        
        <a href="https://investinpuglia.eu/book-consultation?utm_source=email&utm_medium=campaign&utm_campaign=minipia50&code=MINIPIA50" 
           style="display: inline-block; background: #7c2d12; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-top: 10px;">
          Book Your Consultation →
        </a>
      </div>
      
      <!-- Why Choose Section -->
      <div style="margin: 25px 0;">
        <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 15px 0;">Why Choose InvestInPuglia?</h3>
        <div style="font-size: 14px; line-height: 1.8; color: #4b5563;">
          ✓ Direct relationships with regional grant authorities<br>
          ✓ Complete end-to-end service from property search to grant approval<br>
          ✓ Multi-lingual team (English, Italian, German, French, Spanish)<br>
          ✓ No upfront fees for initial consultation<br>
          ✓ Success-based pricing available for qualified projects
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
          📞 Italy: +39 351 400 1402 | UK: +44 1969 434469<br>
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

async function sendToAllContacts() {
  console.log('Starting email campaign with professional template...\n');
  
  // Get all contacts from Firebase
  const querySnapshot = await getDocs(collection(db, 'investor_mailing_list'));
  const contacts = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.email && data.subscribed !== false) {
      contacts.push(data.email);
    }
  });
  
  console.log(`Found ${contacts.length} subscribed contacts\n`);
  
  if (contacts.length === 0) {
    console.log('No contacts found!');
    process.exit(1);
  }
  
  // Confirm before sending
  console.log('Ready to send professional Mini PIA campaign to:', contacts.length, 'contacts');
  console.log('Email subject: "Unlock 50% Grant Funding for Your Italian Dream"');
  console.log('\nPress Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Send emails in batches
  const batchSize = 10;
  let sent = 0;
  let failed = 0;
  
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);
    
    console.log(`\nSending batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(contacts.length/batchSize)}...`);
    
    try {
      const { data, error } = await resend.batch.send(
        batch.map(email => ({
          from: 'Giuseppe Funaro <hello@investinpuglia.eu>',
          to: email,
          subject: 'Unlock 50% Grant Funding for Your Italian Dream',
          html: emailTemplate,
          tags: [
            { name: 'campaign', value: 'minipia-professional' },
            { name: 'batch', value: `batch-${Math.floor(i/batchSize) + 1}` }
          ]
        }))
      );
      
      if (error) {
        console.error('Batch error:', error);
        failed += batch.length;
      } else {
        console.log(`✓ Sent to ${batch.length} recipients`);
        sent += batch.length;
      }
      
      // Wait 1 second between batches to avoid rate limits
      if (i + batchSize < contacts.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error sending batch:', error);
      failed += batch.length;
    }
  }
  
  console.log('\n=== CAMPAIGN COMPLETE ===');
  console.log(`Successfully sent: ${sent}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${contacts.length}`);
  
  process.exit(0);
}

// Run the campaign
sendToAllContacts().catch(error => {
  console.error('Campaign failed:', error);
  process.exit(1);
});