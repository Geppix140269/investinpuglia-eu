// Test WhatsApp Integration for InvestInPuglia
// Run with: node scripts/test-whatsapp-integration.js

require('dotenv').config({ path: '.env.local' });
const twilio = require('twilio');

// Your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'YOUR_ACCOUNT_SID';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'YOUR_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

// WhatsApp configuration
const WHATSAPP_NUMBER = 'whatsapp:+447862140269';
const MESSAGE_SERVICE_SID = 'MG607c186c6439b65a5413ab2f71d82b13';

// Approved template SIDs
const TEMPLATES = {
  OTP: 'HX51ca4dc03eab5256c777b9c64da0faf9b',
  WELCOME: 'HX1947d14deb90d0d8c7b5b064e1c49974',
  INQUIRY: 'HX9611bf3fc2a783f125c3bdc96fe2c204',
  APPOINTMENT: 'HX5dae804ae9579051a8914f79c71c1f594'
};

async function testWhatsAppIntegration() {
  console.log('🚀 Testing WhatsApp Integration for InvestInPuglia\n');
  
  // Test phone number (replace with your WhatsApp number for testing)
  const testPhone = process.argv[2];
  
  if (!testPhone) {
    console.error('❌ Please provide a phone number: node test-whatsapp.js +393511234567');
    process.exit(1);
  }
  
  const whatsappNumber = testPhone.startsWith('whatsapp:') 
    ? testPhone 
    : `whatsapp:${testPhone}`;
  
  console.log(`📱 Testing with number: ${whatsappNumber}\n`);
  
  try {
    // Test 1: Send Welcome Message
    console.log('1️⃣ Sending WELCOME template...');
    const welcomeMsg = await client.messages.create({
      from: WHATSAPP_NUMBER,
      to: whatsappNumber,
      contentSid: TEMPLATES.WELCOME,
      contentVariables: JSON.stringify({
        '1': 'Test User',
        '2': 'InvestInPuglia Team'
      }),
      messagingServiceSid: MESSAGE_SERVICE_SID
    });
    console.log(`✅ Welcome sent: ${welcomeMsg.sid}\n`);
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 2: Send Inquiry Response
    console.log('2️⃣ Sending INQUIRY template...');
    const inquiryMsg = await client.messages.create({
      from: WHATSAPP_NUMBER,
      to: whatsappNumber,
      contentSid: TEMPLATES.INQUIRY,
      contentVariables: JSON.stringify({
        '1': 'Test User',
        '2': 'Luxury Hotel',
        '3': '€2.25M',
        '4': 'https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07'
      }),
      messagingServiceSid: MESSAGE_SERVICE_SID
    });
    console.log(`✅ Inquiry sent: ${inquiryMsg.sid}\n`);
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 3: Send Appointment Confirmation
    console.log('3️⃣ Sending APPOINTMENT template...');
    const appointmentMsg = await client.messages.create({
      from: WHATSAPP_NUMBER,
      to: whatsappNumber,
      contentSid: TEMPLATES.APPOINTMENT,
      contentVariables: JSON.stringify({
        '1': 'Test User',
        '2': 'Tomorrow',
        '3': '15:00 CET',
        '4': 'Giuseppe Funaro'
      }),
      messagingServiceSid: MESSAGE_SERVICE_SID
    });
    console.log(`✅ Appointment sent: ${appointmentMsg.sid}\n`);
    
    // Test 4: Send regular message (only works within 24-hour window)
    console.log('4️⃣ Attempting regular message (may fail if outside 24-hour window)...');
    try {
      const regularMsg = await client.messages.create({
        from: WHATSAPP_NUMBER,
        to: whatsappNumber,
        body: `🏛️ Welcome to InvestInPuglia!
        
I'm Trullo, your AI assistant. Here's what I can help you with:

💰 EU Grants up to €2.25M
🏡 Premium Properties in Puglia
📊 ROI Calculations
📅 Consultation Booking (€60)

Reply with your investment budget to get started!

View properties: https://investinpuglia.eu/properties
Book consultation: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`
      });
      console.log(`✅ Regular message sent: ${regularMsg.sid}\n`);
    } catch (error) {
      console.log(`⚠️ Regular message failed (expected if outside 24-hour window)\n`);
    }
    
    // Test 5: Send message with media
    console.log('5️⃣ Sending message with property image...');
    try {
      const mediaMsg = await client.messages.create({
        from: WHATSAPP_NUMBER,
        to: whatsappNumber,
        body: '🏡 Check out this stunning property in Ostuni!',
        mediaUrl: ['https://investinpuglia.eu/images/locations/ostuni-thumb.jpg']
      });
      console.log(`✅ Media message sent: ${mediaMsg.sid}\n`);
    } catch (error) {
      console.log(`⚠️ Media message failed (expected if outside 24-hour window)\n`);
    }
    
    console.log('✨ WhatsApp Integration Test Complete!');
    console.log('\n📝 Next Steps:');
    console.log('1. Check your WhatsApp for the messages');
    console.log('2. Reply to establish 24-hour window');
    console.log('3. Configure webhook URL in Twilio console:');
    console.log('   https://investinpuglia.eu/api/whatsapp-webhook');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  }
}

// Run the test
testWhatsAppIntegration();