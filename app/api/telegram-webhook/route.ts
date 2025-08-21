// PATH: app/api/telegram-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GIUSEPPE_CHAT_ID = process.env.GIUSEPPE_TELEGRAM_CHAT_ID!;

// Command handlers
const commands: { [key: string]: () => Promise<string> } = {
  '/report': async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/telegram-reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportType: 'daily', immediate: true })
    });
    return response.ok ? '✅ Daily report generated and sent!' : '❌ Failed to generate report';
  },
  
  '/weekly': async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/telegram-reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportType: 'weekly', immediate: true })
    });
    return response.ok ? '✅ Weekly report generated and sent!' : '❌ Failed to generate report';
  },
  
  '/visitors': async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/visitor-tracking`);
    const data = await response.json();
    
    let message = `👥 <b>CURRENT VISITORS</b>\n\n`;
    message += `Total Active: ${data.totalVisitors || 0}\n`;
    message += `Today's Visits: ${data.dailyStats?.totalVisitors || 0}\n`;
    message += `Page Views: ${data.dailyStats?.totalPageViews || 0}\n`;
    message += `Countries: ${data.dailyStats?.uniqueCountries?.size || 0}\n\n`;
    
    if (data.visitors && data.visitors.length > 0) {
      message += `<b>Recent Visitors:</b>\n`;
      data.visitors.slice(0, 5).forEach((v: any) => {
        message += `• ${v.location?.city}, ${v.location?.country}\n`;
        message += `  ${v.totalPageViews} pages, ${Math.round(v.totalDuration)}s\n`;
      });
    }
    
    return message;
  },
  
  '/geo': async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/visitor-tracking?report=geographic`);
    return response.ok ? '✅ Geographic report sent!' : '❌ Failed to generate geographic report';
  },
  
  '/help': async () => {
    return `🤖 <b>INVESTINPUGLIA BOT COMMANDS</b>\n\n` +
           `/report - Get daily analytics report\n` +
           `/weekly - Get weekly analytics report\n` +
           `/visitors - Show current visitor stats\n` +
           `/geo - Get geographic distribution report\n` +
           `/status - Check system status\n` +
           `/help - Show this help message\n\n` +
           `💡 Reports are also sent automatically:\n` +
           `• Daily at 9:00 AM and 6:00 PM\n` +
           `• Weekly on Mondays at 10:00 AM`;
  },
  
  '/status': async () => {
    try {
      // Check various API endpoints
      const checks = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/visitor-tracking`),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/trullo-analytics`),
      ]);
      
      const allOk = checks.every(r => r.ok);
      
      return allOk 
        ? '✅ All systems operational\n🌐 Website: Online\n🤖 Trullo: Active\n📊 Analytics: Running'
        : '⚠️ Some systems may be experiencing issues';
    } catch (error) {
      return '❌ Error checking system status';
    }
  }
};

// Send message to Telegram
async function sendTelegramMessage(chatId: string, text: string) {
  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML'
        })
      }
    );
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}

// Webhook handler for Telegram bot
export async function POST(request: NextRequest) {
  try {
    const update = await request.json();
    
    // Handle message updates
    if (update.message) {
      const { chat, text, from } = update.message;
      
      // Only respond to Giuseppe's messages
      if (chat.id.toString() !== GIUSEPPE_CHAT_ID) {
        return NextResponse.json({ ok: true });
      }
      
      // Check if it's a command
      if (text && text.startsWith('/')) {
        const command = text.split(' ')[0].toLowerCase();
        
        if (commands[command]) {
          const response = await commands[command]();
          await sendTelegramMessage(chat.id, response);
        } else {
          await sendTelegramMessage(
            chat.id, 
            `❓ Unknown command: ${command}\nUse /help to see available commands.`
          );
        }
      }
    }
    
    return NextResponse.json({ ok: true });
    
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Setup webhook (call this once to register the webhook)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  if (action === 'setup') {
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://investinpuglia.eu'}/api/telegram-webhook`;
    
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: webhookUrl,
            allowed_updates: ['message', 'callback_query']
          })
        }
      );
      
      const result = await response.json();
      
      return NextResponse.json({
        success: result.ok,
        message: result.description || 'Webhook setup complete',
        webhookUrl
      });
      
    } catch (error) {
      return NextResponse.json({ error: 'Failed to setup webhook' }, { status: 500 });
    }
  }
  
  return NextResponse.json({
    message: 'Telegram webhook endpoint',
    setupUrl: '/api/telegram-webhook?action=setup'
  });
}