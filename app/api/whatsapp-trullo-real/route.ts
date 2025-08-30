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
      return getSmartFallback(message);
    }

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
            content: `You are Trullo, the friendly and enthusiastic AI assistant for InvestInPuglia! 🏛️

Your personality:
- Warm, welcoming, and excited to help
- Professional but approachable
- Use emojis appropriately (🏛️ 🏡 💰 ✨ 📊 🎯)
- Start conversations with "Ciao! I'm Trullo" when greeting

ALWAYS introduce yourself on first contact:
"Ciao! I'm Trullo, your personal investment guide for Puglia! 🏛️ I'm here to help you discover amazing EU grants up to €2.25M and stunning properties in Italy's most beautiful region!"

Key Information:
- EU grants: 35-50% non-repayable (up to €2.25M)
- CEO consultation: €60 with Giuseppe Funaro
- Booking link: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07
- Properties: Ostuni, Lecce, Polignano, Alberobello, Bari
- Investment range: €200K to €5M
- Success rate: 95% grant approval
- Phone: +39 351 400 1402

Be enthusiastic about Puglia's opportunities! Make investors excited about the possibilities.
Answer in the same language as the user's message.`
          },
          ...history.slice(-10), // Last 10 messages for context
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
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

// Enhance response with relevant links and CTAs
function enhanceResponse(response: string, originalMessage: string) {
  const lower = originalMessage.toLowerCase();
  
  // Add consultation link if discussing investment/budget
  if ((lower.includes('invest') || lower.includes('budget') || lower.includes('grant')) 
      && !response.includes('stripe.com')) {
    response += `\n\n💡 Ready to discuss your specific situation? Book a 30-minute consultation with our CEO Giuseppe for just €60: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07`;
  }
  
  // Add property link if discussing properties
  if (lower.includes('propert') && !response.includes('investinpuglia.eu/properties')) {
    response += `\n\n🏡 View all available properties: https://investinpuglia.eu/properties`;
  }
  
  // Add contact for immediate help
  if (lower.includes('urgent') || lower.includes('now') || lower.includes('today')) {
    response += `\n\n📞 Need immediate assistance? Call Giuseppe directly: +39 351 400 1402`;
  }
  
  return response;
}

// Smart fallback that actually tries to answer based on keywords
function getSmartFallback(message: string): string {
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
  
  // Default helpful response
  return `I understand you're asking about "${message}". 

I can help you with:
• EU grants up to €2.25M (35-50% of investment)
• Premium properties in Puglia
• Investment strategies and ROI calculations
• Complete application support

For a detailed answer to your specific question, I recommend booking a 30-minute consultation with our CEO Giuseppe Funaro for €60: https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07

Or call directly: +39 351 400 1402`;
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