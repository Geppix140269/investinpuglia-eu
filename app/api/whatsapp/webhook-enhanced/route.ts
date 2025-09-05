// Enhanced WhatsApp Webhook for Comprehensive Data Collection
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Initialize services
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+447862140269';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Initialize Supabase for data storage
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )
  : null;

// System prompt for efficient information gathering
const SYSTEM_PROMPT = `You are Trullo, the AI assistant for Invest in Puglia.

CRITICAL RULES:
1. Keep responses SHORT (2-3 sentences max)
2. NEVER repeat questions already answered
3. REMEMBER everything the user told you
4. Ask ONE clear question at a time
5. Be friendly but EFFICIENT

YOUR GOAL: Quickly gather key information:
- Name (if not known)
- Email (if not known)
- Budget range
- Timeline
- Property type interest
- Location preference

CONVERSATION FLOW:
- Greet briefly
- Ask for missing information ONLY
- Skip questions if you already have the answer
- Provide quick, useful answers
- After 5-7 exchanges, offer to connect with Giuseppe

NEVER:
- Write long paragraphs
- Ask for information you already have
- Repeat yourself
- Be overly chatty

ALWAYS:
- Check what you already know before asking
- Be direct and helpful
- Move the conversation forward`;

// Track conversation state
interface UserSession {
  phoneNumber: string;
  name?: string;
  email?: string;
  country?: string;
  budget?: string;
  timeline?: string;
  propertyType?: string;
  location?: string;
  purpose?: string;
  companyName?: string;
  industry?: string;
  grantInterest?: boolean;
  conversationStage: 'greeting' | 'personal' | 'investment' | 'details' | 'closing';
  messagesCount: number;
  lastMessage: Date;
  collectedData: Record<string, any>;
}

// Store session in memory as cache
const sessions = new Map<string, UserSession>();

// Load session from database
async function loadSession(phoneNumber: string): Promise<UserSession | null> {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('whatsapp_conversations')
      .select('*')
      .eq('phone_number', phoneNumber)
      .order('timestamp', { ascending: false })
      .limit(1);
    
    if (error || !data || data.length === 0) return null;
    
    const latest = data[0];
    return {
      phoneNumber,
      name: latest.user_name,
      email: latest.email,
      country: latest.country,
      budget: latest.budget,
      timeline: latest.timeline,
      propertyType: latest.property_type,
      location: latest.location,
      purpose: latest.purpose,
      companyName: latest.company_name,
      industry: latest.industry,
      grantInterest: latest.grant_interest,
      conversationStage: latest.conversation_stage || 'greeting',
      messagesCount: latest.messages_count || 0,
      lastMessage: new Date(latest.timestamp),
      collectedData: latest.collected_data || {}
    };
  } catch (error) {
    console.error('Error loading session:', error);
    return null;
  }
}

// Language detection
function detectLanguage(text: string): string {
  const patterns = {
    it: /\b(ciao|buongiorno|salve|grazie|investire|propriet[àa])\b/i,
    de: /\b(hallo|guten|danke|investieren|immobilie)\b/i,
    fr: /\b(bonjour|salut|merci|investir|propriété)\b/i,
    es: /\b(hola|buenos|gracias|invertir|propiedad)\b/i,
    en: /\b(hello|hi|thanks|invest|property|grant)\b/i
  };
  
  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) return lang;
  }
  return 'en';
}

// Save conversation data to database
async function saveConversationData(session: UserSession, message: string, response: string) {
  if (!supabase) {
    // Fallback: Save to a JSON file or send via email
    console.log('Conversation Data:', {
      ...session,
      lastUserMessage: message,
      lastBotResponse: response,
      timestamp: new Date().toISOString()
    });
    return;
  }

  try {
    // Save to Supabase
    await supabase.from('whatsapp_conversations').insert({
      phone_number: session.phoneNumber,
      user_name: session.name,
      email: session.email,
      country: session.country,
      budget: session.budget,
      timeline: session.timeline,
      property_type: session.propertyType,
      location: session.location,
      purpose: session.purpose,
      company_name: session.companyName,
      industry: session.industry,
      grant_interest: session.grantInterest,
      conversation_stage: session.conversationStage,
      messages_count: session.messagesCount,
      collected_data: session.collectedData,
      user_message: message,
      bot_response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving conversation data:', error);
  }
}

// Extract information from user messages
function extractInformation(message: string, session: UserSession): Partial<UserSession> {
  const updates: Partial<UserSession> = {};
  const lowerMessage = message.toLowerCase();
  
  // Extract name (when people say "I'm X", "My name is X", "This is X", etc.)
  if (!session.name) {
    const namePatterns = [
      /(?:i'?m|i am|my name is|this is|name's?|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+here/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/  // Just a name by itself
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1] && match[1].length > 1) {
        updates.name = match[1].trim();
        break;
      }
    }
  }
  
  // Extract email
  const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) updates.email = emailMatch[0];
  
  // Extract budget mentions
  const budgetMatch = message.match(/€?\s*(\d+(?:k|K|m|M|\.\d+)?)\s*(?:euro|EUR|€|million|thousand)/i);
  if (budgetMatch) updates.budget = budgetMatch[0];
  
  // Extract timeline
  const timelineMatch = message.match(/\b(next\s+(?:month|year|week)|(?:\d+|few|couple)\s+(?:months?|years?|weeks?)|\b(?:january|february|march|april|may|june|july|august|september|october|november|december)\b)/i);
  if (timelineMatch) updates.timeline = timelineMatch[0];
  
  // Extract property type
  if (/\b(hotel|resort|b&b|apartment|villa|commercial|restaurant|agricultural|farm)\b/i.test(message)) {
    updates.propertyType = message.match(/\b(hotel|resort|b&b|apartment|villa|commercial|restaurant|agricultural|farm)\b/i)?.[0];
  }
  
  // Extract location mentions
  const locationMatch = message.match(/\b(bari|lecce|brindisi|taranto|foggia|monopoli|polignano|ostuni|alberobello|gallipoli|otranto)\b/i);
  if (locationMatch) updates.location = locationMatch[0];
  
  // Update collected data
  if (Object.keys(updates).length > 0) {
    updates.collectedData = {
      ...session.collectedData,
      ...updates,
      [`message_${session.messagesCount}`]: message
    };
  }
  
  return updates;
}

// Determine conversation stage and next questions
function getConversationContext(session: UserSession): string {
  let context = `\nYOU ALREADY KNOW:\n`;
  
  if (session.name) context += `Name: ${session.name}\n`;
  if (session.email) context += `Email: ${session.email}\n`;
  if (session.country) context += `Country: ${session.country}\n`;
  if (session.budget) context += `Budget: ${session.budget}\n`;
  if (session.timeline) context += `Timeline: ${session.timeline}\n`;
  if (session.propertyType) context += `Property: ${session.propertyType}\n`;
  if (session.location) context += `Location: ${session.location}\n`;
  
  context += `\nMessages: ${session.messagesCount}\n`;
  
  // What's missing?
  const missing: string[] = [];
  if (!session.name) missing.push('name');
  if (!session.email) missing.push('email');
  if (!session.budget) missing.push('budget');
  if (!session.propertyType) missing.push('property type');
  if (!session.timeline) missing.push('timeline');
  
  if (missing.length > 0) {
    context += `\nSTILL NEED: ${missing.join(', ')}\n`;
    context += `Ask for ONE of these (the most important first).`;
  } else if (session.messagesCount >= 7) {
    context += `\nAll key info collected. Offer to connect with Giuseppe.`;
  }
  
  context += `\nREMEMBER: Never ask for information you already have!`;
  
  return context;
}

// GET endpoint for webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === 'TRULLO_WHATSAPP_TOKEN') {
    console.log('Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// POST endpoint to handle incoming messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    
    const from = body.get('From') as string;
    const messageBody = body.get('Body') as string;
    const profileName = body.get('ProfileName') as string || 'Friend';
    
    if (!from || !messageBody) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const phoneNumber = from.replace('whatsapp:', '');
    console.log(`📱 WhatsApp message from ${profileName} (${phoneNumber}): ${messageBody}`);

    // Get session from cache or load from database
    let session = sessions.get(phoneNumber);
    
    if (!session) {
      // Try to load from database
      const loadedSession = await loadSession(phoneNumber);
      
      if (!loadedSession) {
        // Create new session
        session = {
          phoneNumber,
          conversationStage: 'greeting' as const,
          messagesCount: 0,
          lastMessage: new Date(),
          collectedData: {}
        };
      } else {
        session = loadedSession;
        console.log(`Loaded existing session for ${phoneNumber} with ${session.messagesCount} messages`);
      }
      
      // Cache the session
      sessions.set(phoneNumber, session);
    }

    // Update session with extracted information
    const extractedInfo = extractInformation(messageBody, session);
    session = { ...session, ...extractedInfo };
    
    // Update message count and last message time
    session.messagesCount++;
    session.lastMessage = new Date();
    
    // Update conversation stage based on data collected
    if (session.messagesCount <= 2) {
      session.conversationStage = 'greeting';
    } else if (!session.name || !session.email) {
      session.conversationStage = 'personal';
    } else if (!session.budget || !session.propertyType) {
      session.conversationStage = 'investment';
    } else if (!session.location || !session.timeline) {
      session.conversationStage = 'details';
    } else {
      session.conversationStage = 'closing';
    }
    
    // Get conversation context
    const conversationContext = getConversationContext(session);
    
    // Detect language
    const language = detectLanguage(messageBody);
    
    // Get AI response with full context
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { 
          role: 'system', 
          content: SYSTEM_PROMPT + conversationContext
        },
        { 
          role: 'user', 
          content: messageBody 
        }
      ],
      temperature: 0.3, // Lower for more focused responses
      max_tokens: 150 // Short responses only
    });

    const aiResponse = completion.choices[0].message.content || 
      'I apologize, I had trouble processing that. Could you please tell me more about your investment plans in Puglia?';

    // Save session
    sessions.set(phoneNumber, session);
    
    // Save conversation data to database
    await saveConversationData(session, messageBody, aiResponse);
    
    // Send response via Twilio (split if too long)
    const maxLength = 1500;
    if (aiResponse.length > maxLength) {
      // Split into multiple messages
      const messages: string[] = [];
      let currentMessage = '';
      const sentences = aiResponse.split('. ');
      
      for (const sentence of sentences) {
        if ((currentMessage + sentence).length > maxLength) {
          messages.push(currentMessage);
          currentMessage = sentence + '.';
        } else {
          currentMessage += (currentMessage ? ' ' : '') + sentence + '.';
        }
      }
      if (currentMessage) messages.push(currentMessage);
      
      // Send each message
      for (const msg of messages) {
        await twilioClient.messages.create({
          body: msg,
          from: TWILIO_WHATSAPP_NUMBER,
          to: from
        });
        // Small delay between messages
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } else {
      // Send single message
      await twilioClient.messages.create({
        body: aiResponse,
        from: TWILIO_WHATSAPP_NUMBER,
        to: from
      });
    }
    
    // Send email notification for high-value leads
    if (session.budget && session.email && session.messagesCount > 5) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trullo/lead-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session,
          lastMessage: messageBody,
          lastResponse: aiResponse
        })
      });
    }

    return new NextResponse('', { 
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });

  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}