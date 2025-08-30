// Update WhatsApp Business Profile via Twilio
const twilio = require('twilio');

// Your credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'YOUR_ACCOUNT_SID';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'YOUR_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

async function updateWhatsAppProfile() {
  try {
    // Update the messaging service
    const service = await client.messaging.v1
      .services('MG607c186c6439b65a5413ab2f71d82b13')
      .update({
        friendlyName: 'InvestInPuglia WhatsApp',
        statusCallback: 'https://investinpuglia.eu/api/whatsapp-status'
      });
    
    console.log('✅ Service updated:', service.friendlyName);
    
    // Note: Business profile update must be done through Twilio Console
    // or by submitting a support ticket with this information:
    
    console.log('\n📋 Submit this to Twilio Support:');
    console.log('================================');
    console.log('Please update our WhatsApp Business Profile:');
    console.log('');
    console.log('Phone Number: +447862140269');
    console.log('Display Name: InvestInPuglia');
    console.log('Business Category: Financial Services / Real Estate');
    console.log('Business Description: EU Grants & Property Investment Advisory for Puglia, Italy');
    console.log('Website: https://investinpuglia.eu');
    console.log('Email: info@investinpuglia.eu');
    console.log('Address: Via Roma 123, 70121 Bari, Italy');
    console.log('');
    console.log('Our Meta Business ID: [get from Meta Business Manager]');
    console.log('');
    console.log('Please sync with our approved Meta WhatsApp Business account.');
    console.log('================================\n');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

updateWhatsAppProfile();