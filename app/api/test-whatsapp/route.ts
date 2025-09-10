// Test endpoint to simulate WhatsApp messages for Telegram integration testing
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber = 'whatsapp:+1234567890', message = 'Test message for Trullo' } = await request.json();
    
    // Simulate a WhatsApp webhook call to the intelligent endpoint
    const webhookUrl = `${request.nextUrl.origin}/api/whatsapp-intelligent`;
    
    console.log(`Testing WhatsApp webhook: ${webhookUrl}`);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        From: phoneNumber,
        Body: message,
        To: process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+447862140269'
      })
    });
    
    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'WhatsApp test message sent',
      phoneNumber,
      testMessage: message,
      webhookResponse: result,
      telegramNotificationSent: true
    });
    
  } catch (error) {
    console.error('WhatsApp test error:', error);
    return NextResponse.json({ 
      error: 'Test failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "WhatsApp Test Endpoint",
    usage: {
      method: "POST",
      body: {
        phoneNumber: "whatsapp:+1234567890 (optional)",
        message: "Your test message (optional)"
      },
      description: "Simulates a WhatsApp message which will trigger Telegram notifications"
    }
  });
}