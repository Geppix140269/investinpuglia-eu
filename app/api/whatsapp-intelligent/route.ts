// app/api/whatsapp-intelligent/route.ts
// Intelligent WhatsApp Bot with Correct Business Understanding & Sanity CMS Integration

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

// Fetch real-time content from Sanity
async function fetchSanityContent(contentType: string) {
  try {
    switch(contentType) {
      case 'insights':
        return await sanity.fetch(SANITY_QUERIES.latestInsights);
      case 'team':
        return await sanity.fetch(SANITY_QUERIES.teamMembers);
      case 'services':
        return await sanity.fetch(SANITY_QUERIES.services);
      case 'testimonials':
        return await sanity.fetch(SANITY_QUERIES.testimonials);
      case 'faqs':
        return await sanity.fetch(SANITY_QUERIES.faqs);
      default:
        return null;
    }
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}

// Enhanced conversation state
interface ConversationState {
  phone_number: string;
  stage: 'initial' | 'qualifying' | 'interested' | 'booking' | 'follow_up';
  context: {
    name?: string;
    investment_type?: string; // NOT property type
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

// Generate response with correct business understanding
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
    
    // Fetch relevant Sanity content if needed
    let sanityContext = '';
    if (lowerMessage.includes('blog') || lowerMessage.includes('article')) {
      const insights = await fetchSanityContent('insights');
      if (insights) {
        sanityContext = `Recent insights from our blog: ${insights.map((i: any) => i.title).join(', ')}`;
      }
    } else if (lowerMessage.includes('testimonial') || lowerMessage.includes('review')) {
      const testimonials = await fetchSanityContent('testimonials');
      if (testimonials) {
        sanityContext = `Recent client success: ${testimonials[0]?.testimonial || 'Many successful projects'}`;
      }
    }
    
    const systemPrompt = `You are Giuseppe Funaro's personal assistant for InvestInPuglia.eu.

CRITICAL BUSINESS UNDERSTANDING:
${JSON.stringify(BUSINESS_KNOWLEDGE.identity, null, 2)}

YOU MUST UNDERSTAND:
- We are NOT estate agents or real estate brokers
- We are INVESTMENT CONSULTANTS and PROJECT MANAGERS
- We don't sell properties, we advise on investment strategy
- We connect clients with our CLOSED network of vetted professionals
- Giuseppe personally oversees every project

Current conversation state:
- Stage: ${state.stage}
- Name: ${state.context.name || 'Not provided'}
- Investment Interest: ${state.context.investment_type || 'Not specified'}
- Budget: ${state.context.budget || 'Not discussed'}
- Timeline: ${state.context.timeline || 'Not discussed'}
- Topics discussed: ${state.context.topics_discussed.join(', ')}
- Misconceptions corrected: ${state.context.misconceptions_corrected?.join(', ') || 'None'}

${correction ? `IMPORTANT CORRECTION NEEDED: ${correction}` : ''}
${sanityContext ? `RELEVANT CONTENT: ${sanityContext}` : ''}

CONVERSATION GUIDELINES:
1. Always clarify we're consultants, not agents
2. Focus on investment strategy, not property features
3. Emphasize Giuseppe's personal oversight
4. Use language from BUSINESS_KNOWLEDGE
5. Maximum 3-4 sentences for WhatsApp
6. Guide toward €60 consultation or €2,500 Investment Protection Fee

AVAILABLE SERVICES TO MENTION:
${JSON.stringify(BUSINESS_KNOWLEDGE.services.primary, null, 2)}

Remember: Professional yet approachable. You represent Giuseppe directly.`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.slice(-20),
      { role: 'user' as const, content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      max_tokens: 300,
      temperature: 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0.5
    });

    let response = completion.choices[0]?.message?.content || 
      'I apologize for the technical issue. Please WhatsApp Giuseppe directly at +34 623 041 055';
    
    // Track if we corrected a misconception
    if (correction) {
      const misconceptions = state.context.misconceptions_corrected || [];
      if (!misconceptions.includes(lowerMessage)) {
        misconceptions.push(lowerMessage);
        await updateConversationState(phoneNumber, {
          context: { ...state.context, misconceptions_corrected: misconceptions }
        });
      }
    }
    
    return response;
  } catch (error) {
    console.error('OpenAI error:', error);
    
    // Fallback with correct business understanding
    const fallbacks = {
      initial: "Hello! I'm Giuseppe's assistant at InvestInPuglia. We're investment consultants (not estate agents) specializing in Puglia opportunities and EU grants up to €2.75M. How can we help with your investment strategy?",
      qualifying: "What type of investment are you considering? We advise on tourism projects, renovations, and help access Mini PIA grants.",
      interested: "Based on your interests, Giuseppe's expertise could really help. He's managed €80M+ in projects. Would you like a consultation?",
      booking: "Giuseppe offers 30-minute consultations for €60. You'll get personalized investment strategy and grant eligibility assessment. Shall I send the booking link?",
      follow_up: "Giuseppe would be happy to discuss your Puglia investment plans. WhatsApp him directly at +34 623 041 055."
    };
    
    return fallbacks[state.stage] || BUSINESS_KNOWLEDGE.clarifications["Are you real estate agents?"];
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
  
  // Extract investment type (NOT property type - we're not agents!)
  if (lowerMessage.includes('hotel') || lowerMessage.includes('b&b') || lowerMessage.includes('hospitality')) {
    updates.context = { ...currentState.context, investment_type: 'hospitality' };
  } else if (lowerMessage.includes('renovation') || lowerMessage.includes('restore')) {
    updates.context = { ...currentState.context, investment_type: 'renovation' };
  } else if (lowerMessage.includes('tourism') || lowerMessage.includes('tourist')) {
    updates.context = { ...currentState.context, investment_type: 'tourism' };
  }
  
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
  
  // Detect grant interest
  if (lowerMessage.includes('grant') || lowerMessage.includes('funding') || lowerMessage.includes('pia')) {
    updates.context = { ...currentState.context, grant_interest: true };
  }
  
  // Update stage
  if (currentState.stage === 'initial' && currentState.message_count >= 2) {
    updates.stage = 'qualifying';
  } else if (currentState.stage === 'qualifying' && (currentState.context.budget || currentState.context.investment_type)) {
    updates.stage = 'interested';
  } else if (currentState.stage === 'interested' && currentState.message_count >= 6) {
    updates.stage = 'booking';
  } else if (assistantResponse.includes('€60') || assistantResponse.includes('consultation')) {
    updates.stage = 'follow_up';
  }
  
  // Track topics
  const topics = [...(currentState.context.topics_discussed || [])];
  if (lowerMessage.includes('grant')) topics.push('grants');
  if (lowerMessage.includes('investment')) topics.push('investment');
  if (lowerMessage.includes('consult')) topics.push('consultation');
  updates.context = { ...updates.context, topics_discussed: [...new Set(topics)] };
  
  await updateConversationState(phoneNumber, updates);
}

// Webhook verification
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

// Handle incoming messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (body.From && body.Body) {
      const phoneNumber = body.From;
      const incomingMessage = body.Body;
      
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
      
      // Send response
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
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 200 });
  }
}