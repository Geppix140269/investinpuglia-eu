// PATH: test-telegram.js
// Save this file in your project root and run: node test-telegram.js

const TELEGRAM_BOT_TOKEN = '8437913928:AAFJbRPY3pwE2Tz7dsl2snhA05bLFwigxDI';
const GIUSEPPE_CHAT_ID = '7644197226';

async function sendTestMessage() {
  console.log('Sending test message to Telegram...');
  
  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: GIUSEPPE_CHAT_ID,
        text: '✅ <b>TEST SUCCESSFUL!</b>\n\n' +
              '🎉 Your Telegram bot is connected!\n' +
              '🤖 Trullo notifications are ready to go!\n\n' +
              'You will receive alerts when:\n' +
              '• New chat sessions start\n' +
              '• Important keywords are mentioned\n' +
              '• Contact forms are submitted\n' +
              '• Multiple sessions are active',
        parse_mode: 'HTML'
      })
    }
  );
  
  const result = await response.json();
  console.log('Result:', result);
  
  if (result.ok) {
    console.log('✅ SUCCESS! Check your Telegram!');
  } else {
    console.log('❌ Error:', result);
  }
}

sendTestMessage();
