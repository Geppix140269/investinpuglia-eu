// PATH: app/api/trullo-telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GIUSEPPE_CHAT_ID = process.env.GIUSEPPE_TELEGRAM_CHAT_ID!;

// Send Telegram notification
async function sendTelegramNotification(message: string) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: GIUSEPPE_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );
    
    const result = await response.json();
    console.log('Telegram notification sent:', result);
    return result;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    
    let message = '';
    
    switch (type) {
      case 'new_session':
        message = `🚨 <b>NEW TRULLO SESSION</b>\n\n` +
                 `📍 <b>Location:</b>\n` +
                 `🌍 ${data.city}, ${data.region}\n` +
                 `🏴 ${data.country} (${data.countryCode})\n` +
                 `🌐 IP: ${data.ip}\n` +
                 `⏰ Timezone: ${data.timezone}\n\n` +
                 `💻 <b>Device Info:</b>\n` +
                 `📱 Type: ${data.device}\n` +
                 `🌐 Browser: ${data.browser}\n` +
                 `📐 Screen: ${data.screenResolution}\n` +
                 `🖼️ Viewport: ${data.viewport}\n\n` +
                 `🔍 <b>Session Info:</b>\n` +
                 `💬 Chat Language: ${data.chatLanguage}\n` +
                 `🌐 Browser Language: ${data.language}\n` +
                 `📄 Current Page: ${data.currentPage}\n` +
                 `🔗 Referrer: ${data.referrer}\n` +
                 `⏰ Started: ${new Date(data.started_at).toLocaleString()}\n\n` +
                 `<a href="https://investinpuglia.eu/trullo-monitor">Open Monitor</a>`;
        break;
        
      case 'new_contact':
        message = `🎯 <b>NEW CONTACT REQUEST</b>\n\n` +
                 `👤 Name: ${data.name}\n` +
                 `📧 Email: ${data.email}\n` +
                 `📱 Phone: ${data.phone || 'N/A'}\n` +
                 `💬 Message: "${data.message.substring(0, 100)}..."\n\n` +
                 `<a href="https://investinpuglia.eu/trullo-monitor?tab=contacts">View Contacts</a>`;
        break;
        
      case 'keyword_alert':
        message = `⚡ <b>KEYWORD ALERT</b>\n\n` +
                 `🔑 Keywords: ${data.keywords.join(', ')}\n` +
                 `💬 Message: "${data.message.substring(0, 150)}..."\n` +
                 `👤 From: ${data.role}\n\n` +
                 `<a href="https://investinpuglia.eu/trullo-monitor">View Conversation</a>`;
        break;
        
      case 'multiple_sessions':
        message = `⚠️ <b>MULTIPLE ACTIVE SESSIONS</b>\n\n` +
                 `📊 Active Sessions: ${data.count}\n` +
                 `🌍 Languages: ${data.languages.join(', ')}\n\n` +
                 `<a href="https://investinpuglia.eu/trullo-monitor">Monitor All</a>`;
        break;
    }
    
    if (message) {
      await sendTelegramNotification(message);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram API error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
