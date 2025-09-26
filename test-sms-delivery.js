// SMS Delivery Test Script
// This script helps diagnose SMS delivery issues for international numbers
// Run with: node test-sms-delivery.js

const twilio = require('twilio');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER || '+447862140269';

if (!accountSid || !authToken) {
  console.error('❌ Missing Twilio credentials in .env.local');
  console.log('Required environment variables:');
  console.log('- TWILIO_ACCOUNT_SID');
  console.log('- TWILIO_AUTH_TOKEN');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

async function testSMSDelivery() {
  console.log('📱 SMS Delivery Test\n');
  console.log(`From number: ${fromNumber}`);
  console.log(`Account SID: ${accountSid.substring(0, 8)}...`);
  console.log('');

  // Test with a UK number (you should replace with your son's actual number for testing)
  const testNumbers = [
    '+447123456789', // Example UK mobile - replace with actual number
    '+393123456789'  // Example Italian mobile for comparison
  ];

  for (const number of testNumbers) {
    console.log(`\n🧪 Testing SMS to: ${number}`);

    try {
      // Check account balance first
      const balance = await client.balance.fetch();
      console.log(`💰 Account balance: ${balance.balance} ${balance.currency}`);

      // Send test SMS
      const message = await client.messages.create({
        from: fromNumber,
        to: number,
        body: 'Test SMS from InvestInPuglia - please ignore this message.'
      });

      console.log('✅ SMS sent successfully!');
      console.log(`   Message SID: ${message.sid}`);
      console.log(`   Status: ${message.status}`);
      console.log(`   Direction: ${message.direction}`);

      // Wait a moment then check status
      setTimeout(async () => {
        try {
          const updated = await client.messages(message.sid).fetch();
          console.log(`   Updated status: ${updated.status}`);
          if (updated.errorCode) {
            console.log(`   Error code: ${updated.errorCode}`);
            console.log(`   Error message: ${updated.errorMessage}`);
          }
        } catch (error) {
          console.log(`   Status check error: ${error.message}`);
        }
      }, 3000);

    } catch (error) {
      console.log('❌ SMS failed:');
      console.log(`   Error: ${error.message}`);
      console.log(`   Code: ${error.code}`);
      if (error.moreInfo) {
        console.log(`   More info: ${error.moreInfo}`);
      }

      // Common error codes and solutions
      if (error.code === 21614) {
        console.log('   💡 Solution: This number is not a valid mobile number');
      } else if (error.code === 21408) {
        console.log('   💡 Solution: Permission to send SMS to this country is denied');
      } else if (error.code === 21211) {
        console.log('   💡 Solution: Invalid To phone number');
      } else if (error.code === 21608) {
        console.log('   💡 Solution: The number is unsubscribed from receiving SMS');
      }
    }
  }

  // Check account capabilities
  console.log('\n🔍 Checking account capabilities...');
  try {
    const incomingNumbers = await client.incomingPhoneNumbers.list({ limit: 5 });
    console.log(`📞 Phone numbers on account: ${incomingNumbers.length}`);

    incomingNumbers.forEach(number => {
      console.log(`   ${number.phoneNumber} (${number.friendlyName})`);
      console.log(`     SMS enabled: ${number.smsEnabled}`);
      console.log(`     Voice enabled: ${number.voiceEnabled}`);
    });
  } catch (error) {
    console.log(`❌ Error checking numbers: ${error.message}`);
  }

  console.log('\n📋 Recommendations:');
  console.log('1. Ensure your Twilio account has international SMS enabled');
  console.log('2. Check your account balance and add funds if needed');
  console.log('3. Verify the destination country is allowed for SMS');
  console.log('4. Consider using a Twilio Messaging Service for better delivery rates');
  console.log('5. For production, implement proper error handling and retry logic');
}

// Run the test
testSMSDelivery().catch(console.error);