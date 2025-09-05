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

// Comprehensive system prompt for detailed information gathering
const SYSTEM_PROMPT = `You are Trullo, the friendly and professional AI assistant for Invest in Puglia. 

YOUR PRIMARY GOAL: Build trust and gather comprehensive information about the user's investment intentions.

CONVERSATION STYLE:
- Be warm, friendly, and conversational
- Show genuine interest in their plans
- Be detailed and thorough in your responses
- Make users feel safe and valued
- Use their name once you know it

INFORMATION TO GATHER (progressively, not all at once):
1. Personal Information:
   - Full name
   - Email address (if not from registration)
   - Phone number (already have from WhatsApp)
   - Country of residence
   - Nationality
   - Language preference

2. Investment Profile:
   - Investment budget range
   - Investment timeline (when they plan to invest)
   - Investment purpose (personal use, rental, business)
   - Previous investment experience in Italy
   - Familiarity with EU grants

3. Specific Interests:
   - Property type (residential, commercial, tourism, agricultural)
   - Preferred locations in Puglia
   - Specific cities or areas of interest
   - Size requirements
   - Must-have features

4. Business Details (if applicable):
   - Company name
   - Industry sector
   - Number of employees
   - Annual revenue
   - Expansion plans

5. Grant Eligibility:
   - Interest in PIA/Mini PIA grants
   - Business plan status
   - Job creation potential
   - Innovation aspects
   - Environmental sustainability plans

QUESTIONING STRATEGY:
- Start with easy, non-threatening questions
- Build rapport before asking financial details
- Use open-ended questions to encourage detailed responses
- Acknowledge and validate their responses
- Share relevant success stories and examples
- Provide valuable information while gathering data

IMPORTANT RULES:
1. NEVER rush the conversation
2. ALWAYS provide detailed, valuable answers
3. Make the conversation feel natural, not like an interrogation
4. Store ALL information shared by the user
5. Remember context from previous messages
6. Only suggest contacting Giuseppe or booking consultation AFTER gathering sufficient information

FINAL ACTIONS (only after comprehensive discussion):
When you have gathered sufficient information, offer:
1. "I can arrange a personal call with Giuseppe Funaro, our founder"
2. "Book a detailed consultation to discuss your specific needs"
3. "I'll send you a comprehensive information package"

Remember: The goal is to understand their complete situation before offering next steps.`;

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

// Store session in memory (in production, use Redis or database)
const sessions = new Map<string, UserSession>();

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
  let context = `\nCurrent information about the user:\n`;
  
  if (session.name) context += `- Name: ${session.name}\n`;
  if (session.email) context += `- Email: ${session.email}\n`;
  if (session.country) context += `- Country: ${session.country}\n`;
  if (session.budget) context += `- Budget: ${session.budget}\n`;
  if (session.timeline) context += `- Timeline: ${session.timeline}\n`;
  if (session.propertyType) context += `- Property Type: ${session.propertyType}\n`;
  if (session.location) context += `- Location Interest: ${session.location}\n`;
  if (session.purpose) context += `- Purpose: ${session.purpose}\n`;
  
  context += `\nConversation stage: ${session.conversationStage}\n`;
  context += `Messages exchanged: ${session.messagesCount}\n`;
  
  // Suggest what information to gather next
  if (!session.name) {
    context += `\nNext: Ask for their name in a friendly way.`;
  } else if (!session.email) {
    context += `\nNext: Ask for their email to send detailed information.`;
  } else if (!session.budget) {
    context += `\nNext: Explore their investment capacity and budget range.`;
  } else if (!session.propertyType) {
    context += `\nNext: Understand what type of property or business they're interested in.`;
  } else if (!session.timeline) {
    context += `\nNext: Understand their investment timeline.`;
  } else if (!session.location) {
    context += `\nNext: Explore which areas of Puglia interest them most.`;
  } else if (session.messagesCount > 10) {
    context += `\nNext: You have gathered good information. Consider offering to connect them with Giuseppe or book a consultation.`;
  }
  
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

    // Get or create session
    let session = sessions.get(phoneNumber) || {
      phoneNumber,
      conversationStage: 'greeting' as const,
      messagesCount: 0,
      lastMessage: new Date(),
      collectedData: {}
    };

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
      temperature: 0.7,
      max_tokens: 1000 // Allow detailed responses
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