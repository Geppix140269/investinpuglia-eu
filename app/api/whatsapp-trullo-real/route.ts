// REAL Trullo AI WhatsApp Integration - Not Pre-packaged Bullshit!
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Get REAL AI response from Trullo
async function getRealTrulloResponse(message: string, phoneNumber: string, profileName: string) {
  try {
    // Get conversation history for context
    const conversationsRef = collection(db, 'whatsapp_conversations');
    const q = query(
      conversationsRef,
      where('phone_number', '==', phoneNumber),
      orderBy('created_at', 'desc'),
      limit(20) // Get more history for better context
    );
    
    const snapshot = await getDocs(q);
    const history = snapshot.docs.map(doc => doc.data()).reverse();
    
    // Analyze message for special handling
    const messageLower = message.toLowerCase();
    
    // If user shares a URL they can't analyze
    if (messageLower.includes('idealista.it') || messageLower.includes('immobile') || 
        messageLower.includes('.pdf') || messageLower.includes('http')) {
      return handleUrlMessage(message, history);
    }
    
    // Build conversation context
    const conversationHistory = history.map(h => ({
      role: h.sender === 'user' ? 'user' : 'assistant',
      content: h.message
    }));

    // Call the ACTUAL Trullo API that exists in your app
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://investinpuglia.eu'}/api/trullo-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        conversationHistory: conversationHistory,
        context: {
          platform: 'whatsapp',
          userName: profileName,
          phoneNumber: phoneNumber,
          isInvestor: true,
          interests: 'EU grants, property investment, Puglia',
          budget: 'unknown'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Trullo API error: ${response.status}`);
    }

    const data = await response.json();
    
    // If Trullo returns a response, use it
    if (data.response) {
      return enhanceResponse(data.response, message);
    }
    
    // Fallback to OpenAI if Trullo fails
    return await getOpenAIResponse(message, conversationHistory);
    
  } catch (error) {
    console.error('Trullo error:', error);
    // If all else fails, at least try OpenAI
    return await getOpenAIResponse(message, []);
  }
}

// Use OpenAI directly as backup
async function getOpenAIResponse(message: string, history: any[]) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      console.log('No OpenAI key, using smart fallback');
      return getSmartFallback(message, history);
    }

    // Check if this is a continuation of conversation
    const isFirstMessage = history.length === 0;
    const hasRecentGreeting = history.slice(-5).some(h => 
      h.content?.toLowerCase().includes('ciao') && h.content?.includes('trullo')
    );

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Trullo, an intelligent AI assistant for InvestInPuglia.

IMPORTANT RULES:
1. NEVER repeat the same greeting if you've already introduced yourself in this conversation
2. NEVER say "Ciao! I'm Trullo" if you've said it in the last 10 messages
3. Be NATURAL - respond like a real person would, not a robot
4. If someone sends a URL, acknowledge you can't open it and ask them to describe what they need
5. Remember context from the conversation - don't reset every message
6. Be helpful but not overly enthusiastic on every single message
7. Match the tone of the user - if they're brief, be brief

${isFirstMessage ? `First message - introduce yourself naturally:
"Ciao! I'm Trullo 🏛️ Welcome to InvestInPuglia! I see you're interested in investment opportunities in Puglia. How can I help you today?"` : `Ongoing conversation - DO NOT introduce yourself again. Just answer naturally.`}

Key Information (use when relevant, not every message):
- EU grants: 35-50% non-repayable (up to €2.25M)
- CEO consultation: €60 with Giuseppe Funaro
- Properties in: Ostuni, Lecce, Polignano, Alberobello, Bari
- Investment range: €200K to €5M
- Phone: +39 351 400 1402

Respond in the same language as the user. Be conversational, not scripted.`
          },
          ...history.slice(-10), // Last 10 messages for context
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.8
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      return enhanceResponse(data.choices[0].message.content, message);
    }
    
    return getSmartFallback(message);
    
  } catch (error) {
    console.error('OpenAI error:', error);
    return getSmartFallback(message);
  }
}

// Enhance response with relevant links and CTAs (but be smart about it)
function enhanceResponse(response: string, originalMessage: string) {
  const lower = originalMessage.toLowerCase();
  const responseLower = response.toLowerCase();
  
  // Don't add links if:
  // 1. Response already has links
  // 2. It's a simple greeting or acknowledgment
  // 3. Response is already long
  if (response.includes('http') || 
      response.length < 100 || 
      response.length > 400 ||
      responseLower.includes('i see') ||
      responseLower.includes('i notice') ||
      responseLower.includes('i understand')) {
    return response;
  }
  
  // Only add consultation link if truly discussing investment details
  if ((lower.includes('how much') || lower.includes('invest') || lower.includes('budget') || 
       lower.includes('cost') || lower.includes('price')) 
      && !response.includes('stripe.com')) {
    response += `\n\n💡 Want personalized advice? Book a consultation: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`;
  }
  
  return response;
}

// Smart fallback that actually tries to answer based on keywords
function getSmartFallback(message: string, history: any[] = []): string {
  const lower = message.toLowerCase();
  
  // Investment/budget questions
  if (lower.match(/\d+k|\d+m|€\d+|\$\d+|budget|invest/)) {
    const amount = extractAmount(message);
    if (amount > 0) {
      const grant = amount * 0.45;
      return `Based on your €${(amount/1000).toFixed(0)}K investment, you could receive:
      
💰 EU Grant (45%): €${(grant/1000).toFixed(0)}K
📊 Tax Credit (15%): €${(amount*0.15/1000).toFixed(0)}K
✅ Total Benefits: €${((grant + amount*0.15)/1000).toFixed(0)}K

This makes your net investment only €${((amount - grant)/1000).toFixed(0)}K!

Let's discuss your specific project and maximize your grant. Book a consultation: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`;
    }
  }
  
  // Property questions
  if (lower.includes('propert') || lower.includes('hotel') || lower.includes('villa')) {
    return `We have several premium properties available:

📍 Luxury Hotel in Ostuni - €3.2M (sea view, 20 rooms)
📍 Boutique B&B in Lecce - €850K (historic center)
📍 Beach Resort in Polignano - €5.5M (private beach)
📍 Trulli Complex in Alberobello - €1.2M (8 traditional trulli)

Each property is eligible for 35-50% EU grants!

View all properties: https://investinpuglia.eu/properties
Book a viewing: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`;
  }
  
  // Grant questions
  if (lower.includes('grant') || lower.includes('fund') || lower.includes('subsid')) {
    return `EU grants for Puglia tourism investments:

✅ 35-50% non-repayable grants
✅ Up to €2.25M maximum
✅ Additional 15% tax credit
✅ 70% bridge financing available

Requirements:
• Tourism accommodation project
• Located in Puglia
• Minimum 5% sustainability component
• Business plan and permits

Our success rate: 95%!

Get your personalized grant assessment: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`;
  }
  
  // Check if it's a greeting and if we've already greeted
  const hasGreeted = history.some(h => h.content?.includes('Trullo') && h.content?.includes('Welcome'));
  
  if (lower.match(/^(hi|hello|hey|ciao|buongiorno|salve|hola|bonjour)$/i)) {
    if (hasGreeted) {
      // Already greeted, be natural
      return `Hey there! What can I help you with regarding your Puglia investment plans?`;
    }
    return `Ciao! I'm Trullo 🏛️ Welcome to InvestInPuglia!

I can help you with:
• EU grants (35-50% non-repayable)
• Property investments in Puglia
• Consultation booking with our CEO

What interests you most?`;
  }
  
  // Handle URLs that can't be opened
  if (lower.includes('http://') || lower.includes('https://') || lower.includes('www.')) {
    return `I see you've shared a link, but I can't open external URLs directly. Could you tell me what information you need from that page? I'd be happy to help with any questions about Puglia investments, EU grants, or available properties!`;
  }
  
  // More natural default response
  return `I understand you're asking about "${message}". 

Let me help you with that. Could you provide a bit more detail about what you're looking for? 

Meanwhile, if you need immediate assistance, you can book a consultation with our CEO Giuseppe (€60) or call us directly at +39 351 400 1402.`;
}

// Extract amount from message
function extractAmount(message: string): number {
  const match = message.match(/(\d+)([km])?/i);
  if (match) {
    const num = parseInt(match[1]);
    const multiplier = match[2]?.toLowerCase() === 'm' ? 1000000 : 
                      match[2]?.toLowerCase() === 'k' ? 1000 : 1;
    return num * multiplier;
  }
  return 0;
}

// Handle URL messages intelligently
function handleUrlMessage(message: string, history: any[]): string {
  const lower = message.toLowerCase();
  
  // Property listing URLs
  if (lower.includes('idealista') || lower.includes('immobiliare')) {
    return `I see you've shared a property listing! While I can't access external links directly, I'd love to help you evaluate this opportunity.

Could you share:
• Property location and type?
• Asking price?
• Size (sqm/rooms)?

With this info, I can tell you:
✓ What EU grants apply (35-50%)
✓ Potential ROI
✓ Similar properties we have

Want to discuss this property with our CEO? Book here: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`;
  }
  
  // PDF documents
  if (lower.includes('.pdf')) {
    return `I notice you've shared a PDF document. I can't open files directly, but I can definitely help!

Is this:
• A property brochure?
• An investment proposal?
• Grant documentation?

Let me know what's in the document and I'll provide specific guidance on EU grants and investment opportunities.`;
  }
  
  // Generic URL
  return `Thanks for sharing that link! I can't access external websites, but I'm here to help.

Tell me what you found interesting on that page and I'll provide relevant information about:
• EU grants for that type of project
• Similar opportunities in our portfolio
• Investment potential in Puglia

What specifically caught your attention?`;
}

// Main webhook handler
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    
    const from = body.From as string;
    const to = body.To as string;
    const messageBody = body.Body as string;
    const profileName = body.ProfileName as string || 'User';
    const phoneNumber = from.replace('whatsapp:', '');
    
    console.log(`📱 WhatsApp from ${profileName} (${phoneNumber}): ${messageBody}`);
    
    // Store user message
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      message: messageBody,
      sender: 'user',
      profile_name: profileName,
      created_at: new Date().toISOString()
    });
    
    // Get REAL AI response
    const aiResponse = await getRealTrulloResponse(messageBody, phoneNumber, profileName);
    
    // Store AI response
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      message: aiResponse,
      sender: 'bot',
      created_at: new Date().toISOString()
    });
    
    // Send response via WhatsApp
    await twilioClient.messages.create({
      from: to,
      to: from,
      body: aiResponse
    });
    
    console.log('✅ AI response sent successfully');
    
    // Notify Giuseppe for high-value leads
    if (messageBody.match(/\d{3,}k|\d+m|ready|book|consult|call/i)) {
      await notifyGiuseppe(phoneNumber, profileName, messageBody, aiResponse);
    }
    
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
    
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    
    // Even if error, try to send something helpful
    const fallback = `I apologize, I'm having trouble processing your message right now.

Please either:
📞 Call us directly: +39 351 400 1402
📧 Email: info@investinpuglia.eu
💬 Or try again in a moment

Book a consultation: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`;
    
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${fallback}</Message></Response>`,
      { status: 200, headers: { 'Content-Type': 'text/xml' } }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({ 
    status: 'Real Trullo AI WhatsApp is ready!',
    features: [
      'Real AI responses using Trullo/OpenAI',
      'Full conversation context',
      'Smart fallbacks',
      'Lead detection',
      'Multi-language support'
    ],
    timestamp: new Date().toISOString()
  });
}

// Notify Giuseppe about high-value leads
async function notifyGiuseppe(phone: string, name: string, message: string, response: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'g.funaro@investinpuglia.eu',
        subject: `🔥 HOT WhatsApp Lead: ${name}`,
        html: `
          <h2>High-Value WhatsApp Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Their Message:</strong> ${message}</p>
          <p><strong>AI Response:</strong> ${response}</p>
          <hr>
          <p><a href="https://wa.me/${phone.replace('+', '')}" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply on WhatsApp</a></p>
        `
      })
    });
  } catch (error) {
    console.error('Failed to notify Giuseppe:', error);
  }
}