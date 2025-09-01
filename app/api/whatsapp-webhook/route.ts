// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import twilio from 'twilio';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Store conversation history in Firebase
async function storeMessage(phoneNumber: string, message: string, role: 'user' | 'assistant') {
  try {
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      message,
      role,
      created_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Failed to store message:', error);
  }
}

async function getConversationHistory(phoneNumber: string) {
  try {
    // Get conversation history from Firebase
    const conversationQuery = query(
      collection(db, 'whatsapp_conversations'),
      where('phone_number', '==', phoneNumber),
      orderBy('created_at', 'desc'),
      limit(10)
    );
    
    const snapshot = await getDocs(conversationQuery);
    const messages = snapshot.docs.map(doc => doc.data()).reverse();
    
    return messages.map(msg => ({
      role: msg.role,
      content: msg.message
    }));
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

async function processMessage(message: string, phoneNumber: string): Promise<string> {
  try {
    // Get conversation history
    const history = await getConversationHistory(phoneNumber);
    
    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: `You are a helpful assistant for InvestInPuglia.eu, specializing in:
- Real estate investments in Puglia, Italy
- Property renovation and restoration
- Investment grants and incentives (PIA, Mini PIA)
- Legal and tax guidance for foreign investors
- Masseria and Trulli properties

Be concise but informative. If asked about specific properties or investment opportunities, suggest they visit our website or contact our team directly.`
      },
      ...history,
      {
        role: 'user' as const,
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I could not process your message. Please try again.';
  } catch (error) {
    console.error('OpenAI error:', error);
    return 'I apologize for the inconvenience. Our AI service is temporarily unavailable. Please visit investinpuglia.eu or email us at info@investinpuglia.eu';
  }
}

// Webhook verification for WhatsApp
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified');
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle Twilio WhatsApp webhook
    if (body.From && body.Body) {
      const phoneNumber = body.From;
      const incomingMessage = body.Body;
      
      // Store user message
      await storeMessage(phoneNumber, incomingMessage, 'user');
      
      // Process message with AI
      const response = await processMessage(incomingMessage, phoneNumber);
      
      // Store AI response
      await storeMessage(phoneNumber, response, 'assistant');
      
      // Send response via Twilio
      await twilioClient.messages.create({
        body: response,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: phoneNumber
      });
      
      // Track analytics
      await addDoc(collection(db, 'whatsapp_analytics'), {
        phone_number: phoneNumber,
        message_type: 'conversation',
        created_at: serverTimestamp()
      });
      
      return NextResponse.json({ success: true });
    }
    
    // Handle Meta WhatsApp Business API webhook
    if (body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const message = body.entry[0].changes[0].value.messages[0];
      const phoneNumber = message.from;
      const incomingMessage = message.text?.body || '';
      
      // Process similar to Twilio
      await storeMessage(phoneNumber, incomingMessage, 'user');
      const response = await processMessage(incomingMessage, phoneNumber);
      await storeMessage(phoneNumber, response, 'assistant');
      
      // Note: Sending response via Meta API requires additional setup
      console.log('Meta WhatsApp message received:', incomingMessage);
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}