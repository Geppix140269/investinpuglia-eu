// app/api/whatsapp/route.ts
// Simplified endpoint name for Twilio compatibility
// This is the INTELLIGENT version with all fixes

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import twilio from 'twilio';
import { db } from '@/lib/firebase';
import { sanity } from '@/lib/sanity';
import { 
  BUSINESS_KNOWLEDGE, 
  SANITY_QUERIES, 
  CONVERSATION_FLOWS,
  CORRECTIONS 
} from '@/lib/trullo-knowledge';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Enhanced conversation state
interface ConversationState {
  phone_number: string;
  stage: 'initial' | 'qualifying' | 'interested' | 'booking' | 'follow_up';
  context: {
    name?: string;
    investment_type?: string;
    budget?: string;
    timeline?: string;
    grant_interest?: boolean;
    misconceptions_corrected?: string[];
    topics_discussed: string[];
    last_topic?: string;
  };
  language: 'en' | 'it';
  message_count: number;
  last_interaction: any;
  created_at: any;
}

// Get or create conversation state
async function getConversationState(phoneNumber: string): Promise<ConversationState> {
  try {
    const stateDoc = doc(db, 'whatsapp_states', phoneNumber);
    const stateSnap = await getDoc(stateDoc);
    
    if (stateSnap.exists()) {
      return stateSnap.data() as ConversationState;
    }
    
    const newState: ConversationState = {
      phone_number: phoneNumber,
      stage: 'initial',
      context: {
        topics_discussed: [],
        misconceptions_corrected: []
      },
      language: 'en',
      message_count: 0,
      last_interaction: serverTimestamp(),
      created_at: serverTimestamp()
    };
    
    await setDoc(stateDoc, newState);
    return newState;
  } catch (error) {
    console.error('Error getting conversation state:', error);
    return {
      phone_number: phoneNumber,
      stage: 'initial',
      context: { topics_discussed: [], misconceptions_corrected: [] },
      language: 'en',
      message_count: 0,
      last_interaction: serverTimestamp(),
      created_at: serverTimestamp()
    };
  }
}

// Get full conversation history
async function getFullConversationHistory(phoneNumber: string) {
  try {
    const conversationQuery = query(
      collection(db, 'whatsapp_conversations'),
      where('phone_number', '==', phoneNumber),
      orderBy('created_at', 'asc')
    );
    
    const snapshot = await getDocs(conversationQuery);
    return snapshot.docs.map(doc => ({
      role: doc.data().role,
      content: doc.data().message
    }));
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

// Update conversation state
async function updateConversationState(phoneNumber: string, updates: Partial<ConversationState>) {
  try {
    const stateDoc = doc(db, 'whatsapp_states', phoneNumber);
    await updateDoc(stateDoc, {
      ...updates,
      last_interaction: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating state:', error);
  }
}

// Store message
async function storeMessage(
  phoneNumber: string, 
  message: string, 
  role: 'user' | 'assistant',
  metadata?: any
) {
  try {
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      message,
      role,
      metadata,
      created_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Failed to store message:', error);
  }
}

// Generate intelligent response
async function generateIntelligentResponse(
  message: string,
  phoneNumber: string,
  state: ConversationState
): Promise<string> {
  try {
    const history = await getFullConversationHistory(phoneNumber);
    
    // Check for common misconceptions
    const lowerMessage = message.toLowerCase();
    let correction: string | null = null;
    
    if (lowerMessage.includes('property') && lowerMessage.includes('sale')) {
      correction = CORRECTIONS.properties;
    } else if (lowerMessage.includes('estate agent') || lowerMessage.includes('real estate')) {
      correction = BUSINESS_KNOWLEDGE.clarifications["Are you real estate agents?"];
    } else if (lowerMessage.includes('commission')) {
      correction = CORRECTIONS.commission;
    } else if (lowerMessage.includes('list') && lowerMessage.includes('property')) {
      correction = CORRECTIONS.listing;
    }
    
    const systemPrompt = `You are Giuseppe Funaro's personal assistant for InvestInPuglia.eu.

CRITICAL BUSINESS UNDERSTANDING:
- We are INVESTMENT CONSULTANTS, not estate agents
- We DON'T sell properties
- We ADVISE on investment strategy
- We CONNECT clients with vetted professionals
- Giuseppe personally oversees every project

Current conversation:
- Name: ${state.context.name || 'Not provided'}
- Investment Type: ${state.context.investment_type || 'Not specified'}
- Budget: ${state.context.budget || 'Not discussed'}
- Timeline: ${state.context.timeline || 'Not discussed'}
- Message #${state.message_count + 1}

${correction ? `IMPORTANT: Correct this misconception: ${correction}` : ''}

RULES:
1. NEVER repeat questions already answered
2. Build on previous context
3. Maximum 3-4 sentences
4. Guide toward €60 consultation
5. Always clarify we're consultants, not agents

Remember: You represent Giuseppe directly.`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.slice(-20),
      { role: 'user' as const, content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      max_tokens: 250,
      temperature: 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0.5
    });

    return completion.choices[0]?.message?.content || 
      'I apologize for the technical issue. Please WhatsApp Giuseppe directly at +34 623 041 055';
    
  } catch (error) {
    console.error('OpenAI error:', error);
    return "Hello! I'm Giuseppe's assistant at InvestInPuglia. We're investment consultants (not estate agents) specializing in Puglia opportunities and EU grants. How can we help with your investment strategy?";
  }
}

// Extract context from conversation
async function updateContextFromMessage(
  phoneNumber: string,
  userMessage: string,
  assistantResponse: string,
  currentState: ConversationState
) {
  const lowerMessage = userMessage.toLowerCase();
  const updates: Partial<ConversationState> = {
    message_count: currentState.message_count + 1
  };
  
  // Extract name
  if (!currentState.context.name) {
    const nameMatch = userMessage.match(/(?:i'm|i am|my name is|this is|it's)\s+([A-Z][a-z]+)/i);
    if (nameMatch) {
      updates.context = { ...currentState.context, name: nameMatch[1] };
    }
  }
  
  // Extract budget
  if (!currentState.context.budget && (lowerMessage.includes('€') || lowerMessage.includes('euro'))) {
    const budgetMatch = userMessage.match(/[€$]?\s*(\d+(?:[\.,]\d+)?)\s*(?:k|m|mil|million)?/i);
    if (budgetMatch) {
      updates.context = { ...currentState.context, budget: budgetMatch[0] };
    }
  }
  
  // Update stage
  if (currentState.stage === 'initial' && currentState.message_count >= 2) {
    updates.stage = 'qualifying';
  } else if (currentState.stage === 'qualifying' && (currentState.context.budget || currentState.context.investment_type)) {
    updates.stage = 'interested';
  } else if (currentState.stage === 'interested' && currentState.message_count >= 6) {
    updates.stage = 'booking';
  }
  
  await updateConversationState(phoneNumber, updates);
}

// Handle GET request (webhook verification)
export async function GET(request: NextRequest) {
  // Simple response for Twilio to validate the endpoint exists
  return new Response('WhatsApp webhook is active', { 
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    }
  });
}

// Handle POST request (incoming messages)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle Twilio WhatsApp webhook
    if (body.From && body.Body) {
      const phoneNumber = body.From;
      const incomingMessage = body.Body;
      
      console.log(`Message from ${phoneNumber}: ${incomingMessage}`);
      
      // Get conversation state
      const state = await getConversationState(phoneNumber);
      
      // Store user message
      await storeMessage(phoneNumber, incomingMessage, 'user', {
        stage: state.stage,
        message_count: state.message_count
      });
      
      // Generate intelligent response
      const response = await generateIntelligentResponse(incomingMessage, phoneNumber, state);
      
      // Update context
      await updateContextFromMessage(phoneNumber, incomingMessage, response, state);
      
      // Store assistant response
      await storeMessage(phoneNumber, response, 'assistant', {
        stage: state.stage,
        message_count: state.message_count + 1
      });
      
      // Send response via Twilio
      await twilioClient.messages.create({
        body: response,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: phoneNumber
      });
      
      // Track hot leads
      if (state.stage === 'booking' || state.context.budget) {
        await addDoc(collection(db, 'whatsapp_hot_leads'), {
          phone_number: phoneNumber,
          stage: state.stage,
          context: state.context,
          created_at: serverTimestamp()
        });
      }
      
      console.log(`Response sent to ${phoneNumber}`);
      return NextResponse.json({ success: true });
    }
    
    // Return success for other webhook types
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    // Return 200 to prevent Twilio retries
    return NextResponse.json({ error: 'Processing failed' }, { status: 200 });
  }
}