// app/api/whatsapp-professional/route.ts
// Professional WhatsApp Integration with Proper Context Management
import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/openai-client';
import twilio from 'twilio';
import { db } from '@/lib/firebase';
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


const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Conversation state management
interface ConversationState {
  phone_number: string;
  stage: 'initial' | 'qualifying' | 'interested' | 'booking' | 'follow_up';
  context: {
    name?: string;
    budget?: string;
    timeline?: string;
    property_type?: string;
    grant_interest?: boolean;
    questions_asked: string[];
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
    
    // Create new state
    const newState: ConversationState = {
      phone_number: phoneNumber,
      stage: 'initial',
      context: {
        questions_asked: []
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
    // Return default state on error
    return {
      phone_number: phoneNumber,
      stage: 'initial',
      context: { questions_asked: [] },
      language: 'en',
      message_count: 0,
      last_interaction: serverTimestamp(),
      created_at: serverTimestamp()
    };
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
    console.error('Error updating conversation state:', error);
  }
}

// Get full conversation history (not limited)
async function getFullConversationHistory(phoneNumber: string) {
  try {
    const conversationQuery = query(
      collection(db, 'whatsapp_conversations'),
      where('phone_number', '==', phoneNumber),
      orderBy('created_at', 'asc') // Chronological order
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

// Store message with metadata
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

// Intelligent response generation based on context
async function generateContextualResponse(
  message: string,
  phoneNumber: string,
  state: ConversationState
): Promise<string> {
  try {
    // Get full conversation history
    const history = await getFullConversationHistory(phoneNumber);
    
    // Build context-aware system prompt
    const systemPrompt = `You are Giuseppe Funaro's personal WhatsApp assistant for InvestInPuglia.eu.
    
CRITICAL: You must maintain natural conversation flow and NEVER repeat questions already answered.

Current conversation state:
- Stage: ${state.stage}
- Name: ${state.context.name || 'Not provided yet'}
- Budget: ${state.context.budget || 'Not discussed'}
- Timeline: ${state.context.timeline || 'Not discussed'}
- Property Type: ${state.context.property_type || 'Not specified'}
- Grant Interest: ${state.context.grant_interest ? 'Yes' : 'Not mentioned'}
- Previous topics: ${state.context.questions_asked.join(', ') || 'None'}
- Message count: ${state.message_count}

CONVERSATION RULES:
1. NEVER ask for information already provided
2. Build on previous context naturally
3. If they've given their name, use it occasionally
4. Progress the conversation toward booking a consultation
5. Be concise but warm - this is WhatsApp, not email
6. Maximum 3-4 sentences per response
7. Use emojis sparingly but appropriately
8. If conversation exceeds 10 messages, suggest booking a call

STAGE-BASED RESPONSES:
- initial: Warm greeting, ask what brings them to Puglia
- qualifying: Understand budget, timeline, goals
- interested: Provide specific value, examples, build trust
- booking: Guide toward €60 consultation booking
- follow_up: Maintain engagement, provide value

Remember: You represent Giuseppe personally. Be professional but approachable.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.slice(-20), // Keep last 20 messages for context
      { role: 'user' as const, content: message }
    ];

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // Better model for context understanding
      messages,
      max_tokens: 300, // Appropriate for WhatsApp
      temperature: 0.7,
      presence_penalty: 0.6, // Reduce repetition
      frequency_penalty: 0.5 // Encourage variety
    });

    const response = completion.choices[0]?.message?.content || 
      'I apologize, I had a brief connection issue. Could you please repeat that?';

    // Extract and update context from conversation
    await updateContextFromConversation(phoneNumber, message, response, state);

    return response;
  } catch (error) {
    console.error('OpenAI error:', error);
    
    // Fallback responses based on stage
    const fallbacks = {
      initial: "Hello! I'm helping Giuseppe connect with investors interested in Puglia. What brings you here today?",
      qualifying: "That's interesting! To better assist you, what's your investment timeline?",
      interested: "Based on what you've shared, I think Giuseppe could really help. Would you like to schedule a consultation?",
      booking: "Great! You can book a 30-minute consultation with Giuseppe for €60 here: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07",
      follow_up: "Thanks for your patience! Giuseppe would love to discuss your Puglia investment plans. When works for you?"
    };
    
    return fallbacks[state.stage] || "I'm here to help with your Puglia investment questions. What would you like to know?";
  }
}

// Extract context from conversation
async function updateContextFromConversation(
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
  if (!currentState.context.budget && (lowerMessage.includes('€') || lowerMessage.includes('euro') || lowerMessage.includes('budget'))) {
    const budgetMatch = userMessage.match(/[€$]?\s*(\d+(?:[\.,]\d+)?)\s*(?:k|m|mil|million)?/i);
    if (budgetMatch) {
      updates.context = { ...currentState.context, budget: budgetMatch[0] };
    }
  }
  
  // Extract timeline
  if (!currentState.context.timeline && (lowerMessage.includes('month') || lowerMessage.includes('year') || lowerMessage.includes('soon'))) {
    updates.context = { ...currentState.context, timeline: userMessage };
  }
  
  // Detect grant interest
  if (lowerMessage.includes('grant') || lowerMessage.includes('funding') || lowerMessage.includes('pia')) {
    updates.context = { ...currentState.context, grant_interest: true };
  }
  
  // Update stage based on conversation progress
  if (currentState.stage === 'initial' && currentState.message_count >= 2) {
    updates.stage = 'qualifying';
  } else if (currentState.stage === 'qualifying' && (currentState.context.budget || currentState.context.timeline)) {
    updates.stage = 'interested';
  } else if (currentState.stage === 'interested' && currentState.message_count >= 6) {
    updates.stage = 'booking';
  } else if (assistantResponse.includes('stripe.com') || assistantResponse.includes('book')) {
    updates.stage = 'follow_up';
  }
  
  // Track questions asked to avoid repetition
  const questionsAsked = [...(currentState.context.questions_asked || [])];
  if (assistantResponse.includes('?')) {
    const questionTopic = assistantResponse.split('?')[0].slice(-50); // Last 50 chars before ?
    if (!questionsAsked.includes(questionTopic)) {
      questionsAsked.push(questionTopic);
    }
  }
  updates.context = { ...updates.context, questions_asked: questionsAsked };
  
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
    
    // Handle Twilio WhatsApp webhook
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
      
      // Generate contextual response
      const response = await generateContextualResponse(incomingMessage, phoneNumber, state);
      
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
      
      // Track high-value conversation
      if (state.stage === 'booking' || state.stage === 'follow_up') {
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
    
    // Don't try to access body in error handler as it may not be defined
    // Just log the error and return success to prevent webhook retries
    
    return NextResponse.json({ error: 'Processing failed' }, { status: 200 }); // Return 200 to prevent retries
  }
}