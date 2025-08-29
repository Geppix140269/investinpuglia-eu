// Simple WhatsApp Test Webhook
import { NextRequest, NextResponse } from 'next/server';

// GET request for testing if endpoint is alive
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'WhatsApp webhook is ready!',
    timestamp: new Date().toISOString()
  });
}

// POST request to handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  console.log('📱 WhatsApp webhook called!');
  
  try {
    // Parse the form data from Twilio
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    
    console.log('Received message:', {
      from: body.From,
      to: body.To,
      message: body.Body,
      profileName: body.ProfileName
    });
    
    // Simple TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>
    🏛️ Welcome to InvestInPuglia! 
    
I received your message: "${body.Body}"

I can help you with:
💰 EU Grants up to €2.25M
🏡 Properties in Puglia
📅 Book consultation: €60

Reply with your investment budget to get started!
  </Message>
</Response>`;
    
    return new NextResponse(twiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    
    // Return empty TwiML response to prevent Twilio errors
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { 
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
      }
    );
  }
}