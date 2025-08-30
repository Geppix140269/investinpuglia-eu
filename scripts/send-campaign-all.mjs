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

// Email template WITHOUT personalized names
const emailTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 700;">Transform Your Italian Dream Into Reality</h1>
      <p style="color: #f3e8ff; margin: 20px 0 0 0; font-size: 18px;">Unlock 50% EU Grant Funding for Puglia Investments</p>
    </div>
    
    <!-- Body -->
    <div style="padding: 40px 30px;">
      <!-- Greeting -->
      <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
        <p style="font-size: 18px; margin: 0; color: #581c87; font-weight: 500;">Dear Investor,</p>
      </div>
      
      <!-- Intro -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="color: #1e293b; font-size: 28px; margin: 0 0 15px 0;">Your Gateway to Italian Investment Success</h2>
        <p style="font-size: 18px; color: #64748b;">We're InvestInPuglia — your specialized partner in unlocking exclusive EU grant opportunities.</p>
      </div>
      
      <!-- Special Offer -->
      <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
        <h3 style="color: white; margin: 0 0 10px 0; font-size: 24px;">🎁 EXCLUSIVE OFFER</h3>
        <p style="color: white; font-size: 20px; margin: 0; font-weight: 600;">FREE 30-Minute Consultation</p>
        <p style="color: #fef3c7; margin: 10px 0 0 0;">Use Code: MINIPIA50</p>
      </div>
      
      <!-- Grant Info -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 25px; margin: 30px 0;">
        <h3 style="color: #764ba2; margin: 0 0 15px 0; text-align: center;">MINI PIA GRANT PROGRAM</h3>
        <p style="text-align: center; font-size: 24px; color: #1e293b; margin: 15px 0;">
          <strong>50% Non-Refundable Funding</strong>
        </p>
        <p style="text-align: center; color: #64748b;">€30K - €2.75M • Application Deadline 2027</p>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://investinpuglia.eu/book-consultation?utm_source=email&utm_medium=campaign&utm_campaign=minipia50&code=MINIPIA50" 
           style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 18px;">
          Book Your FREE Consultation →
        </a>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e2e8f0; margin-top: 40px;">
        <p style="color: #94a3b8; font-size: 14px; margin: 0;">
          InvestInPuglia.eu • Your Gateway to Italian Investment Success
        </p>
        <p style="color: #cbd5e1; font-size: 12px; margin: 10px 0;">
          <a href="{{{unsubscribe}}}" style="color: #94a3b8;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

async function sendToAllContacts() {
  console.log('Starting email campaign...\n');
  
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
  console.log('Ready to send to:', contacts.length, 'contacts');
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
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
          from: 'InvestInPuglia <hello@investinpuglia.eu>',
          to: email,
          subject: '🎁 FREE Consultation: Unlock 50% EU Grants for Your Italian Investment',
          html: emailTemplate,
          tags: [
            { name: 'campaign', value: 'minipia-introduction' },
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