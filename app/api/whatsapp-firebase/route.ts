// WhatsApp Business API Webhook for InvestInPuglia - FIREBASE VERSION
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Stripe consultation link
const STRIPE_CONSULTATION_LINK = 'https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07';

// Language detection patterns
const languagePatterns = {
  it: /\b(ciao|buongiorno|salve|grazie|investire|propriet[àa]|puglia)\b/i,
  de: /\b(hallo|guten|danke|investieren|immobilie|apulien)\b/i,
  fr: /\b(bonjour|salut|merci|investir|propriété|pouilles)\b/i,
  es: /\b(hola|buenos|gracias|invertir|propiedad|apulia)\b/i,
  ar: /\b(مرحبا|شكرا|استثمار|عقار|بوليا)\b/,
  zh: /\b(你好|谢谢|投资|房产|普利亚)\b/,
  ru: /\b(привет|здравствуйте|спасибо|инвестировать|недвижимость|апулия)\b/i,
  en: /\b(hello|hi|thanks|invest|property|puglia|grant)\b/i
};

// Detect language from message
function detectLanguage(text: string): string {
  for (const [lang, pattern] of Object.entries(languagePatterns)) {
    if (pattern.test(text)) return lang;
  }
  return 'en';
}

// Get Trullo AI response
async function getTrulloResponse(message: string, language: string, phoneNumber: string) {
  try {
    // Get conversation history from Firebase
    const conversationsRef = collection(db, 'whatsapp_conversations');
    const q = query(
      conversationsRef, 
      where('phone_number', '==', phoneNumber),
      orderBy('created_at', 'desc'),
      limit(10)
    );
    
    const snapshot = await getDocs(q);
    const history = snapshot.docs.map(doc => doc.data());

    // Call Trullo API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trullo-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        language,
        conversationHistory: history?.map(h => ({
          role: h.sender,
          content: h.message
        })),
        source: 'whatsapp',
        phoneNumber
      })
    });

    const data = await response.json();
    return data.response || "I'll help you explore investment opportunities in Puglia. What are you looking for?";
  } catch (error) {
    console.error('Trullo API error:', error);
    // Fallback response
    return generateFallbackResponse(message, language);
  }
}

// Fallback response if Trullo API fails
function generateFallbackResponse(message: string, language: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for investment amount mentions
  if (lowerMessage.match(/\d+k|\d+m|€\d+|\$\d+/)) {
    return language === 'it' 
      ? `Ottimo! Con il tuo budget potresti qualificarti per contributi significativi. Prenota una consulenza per €60 per scoprire di più: ${STRIPE_CONSULTATION_LINK}`
      : `Excellent! With your budget, you could qualify for significant grants. Book a €60 consultation to learn more: ${STRIPE_CONSULTATION_LINK}`;
  }
  
  // Check for property interest
  if (lowerMessage.includes('propert') || lowerMessage.includes('hotel') || lowerMessage.includes('villa')) {
    return language === 'it'
      ? `Abbiamo diverse proprietà disponibili in Puglia con contributi UE fino a €2.25M. Vuoi vedere le opzioni? Prenota una consulenza: ${STRIPE_CONSULTATION_LINK}`
      : `We have several properties available in Puglia with EU grants up to €2.25M. Want to see options? Book a consultation: ${STRIPE_CONSULTATION_LINK}`;
  }
  
  // Default welcome
  return language === 'it'
    ? `Benvenuto su InvestInPuglia! Posso aiutarti con:\n💰 Contributi UE fino a €2.25M\n🏡 Proprietà in Puglia\n📊 Calcoli ROI\n\nQual è il tuo budget di investimento?`
    : `Welcome to InvestInPuglia! I can help you with:\n💰 EU Grants up to €2.25M\n🏡 Properties in Puglia\n📊 ROI Calculations\n\nWhat's your investment budget?`;
}

// Store conversation in Firebase
async function storeConversation(phoneNumber: string, message: string, sender: 'user' | 'bot', language: string) {
  try {
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      message,
      sender,
      language,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error storing conversation:', error);
  }
}

// Check if message mentions budget/investment amount
function checkForInvestmentIntent(message: string): boolean {
  const investmentPatterns = [
    /\b\d+k\b/i,
    /€\s*\d+/,
    /\$\s*\d+/,
    /\b(hundred|thousand|million|k|m)\b/i,
    /\b(invest|budget|spend|buy|purchase|grant|property)\b/i
  ];
  
  return investmentPatterns.some(pattern => pattern.test(message));
}

// Format WhatsApp message with rich content
function formatWhatsAppMessage(text: string, options?: {
  includeConsultation?: boolean;
  language?: string;
}) {
  let formattedText = text;
  
  // Add consultation offer if appropriate
  if (options?.includeConsultation && !text.includes(STRIPE_CONSULTATION_LINK)) {
    const consultationText = {
      en: `\n\n💡 *Ready for personalized advice?*\nBook a 30-min strategy call with Giuseppe Funaro for just €60:\n${STRIPE_CONSULTATION_LINK}`,
      it: `\n\n💡 *Pronto per una consulenza personalizzata?*\nPrenota una chiamata strategica di 30 minuti con Giuseppe Funaro a soli €60:\n${STRIPE_CONSULTATION_LINK}`,
      de: `\n\n💡 *Bereit für persönliche Beratung?*\nBuchen Sie ein 30-minütiges Strategiegespräch mit Giuseppe Funaro für nur €60:\n${STRIPE_CONSULTATION_LINK}`,
      fr: `\n\n💡 *Prêt pour des conseils personnalisés?*\nRéservez un appel stratégique de 30 minutes avec Giuseppe Funaro pour seulement 60€:\n${STRIPE_CONSULTATION_LINK}`,
      es: `\n\n💡 *¿Listo para asesoramiento personalizado?*\nReserva una llamada estratégica de 30 minutos con Giuseppe Funaro por solo €60:\n${STRIPE_CONSULTATION_LINK}`
    };
    
    formattedText += consultationText[options.language as keyof typeof consultationText] || consultationText.en;
  }
  
  return formattedText;
}

// GET request for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'WhatsApp webhook (Firebase) is ready!',
    timestamp: new Date().toISOString()
  });
}

// POST request to handle incoming messages
export async function POST(request: NextRequest) {
  try {
    // Parse the form data from Twilio
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    
    // Extract message details
    const from = body.From as string; // WhatsApp number (e.g., "whatsapp:+393511234567")
    const to = body.To as string;
    const messageBody = body.Body as string;
    const profileName = body.ProfileName as string;
    
    // Clean phone number
    const phoneNumber = from.replace('whatsapp:', '');
    
    console.log(`📱 WhatsApp message from ${profileName} (${phoneNumber}): ${messageBody}`);
    
    // Store user message
    const detectedLanguage = detectLanguage(messageBody);
    await storeConversation(phoneNumber, messageBody, 'user', detectedLanguage);
    
    // Check for investment intent
    const hasInvestmentIntent = checkForInvestmentIntent(messageBody);
    
    // Get AI response from Trullo
    const aiResponse = await getTrulloResponse(messageBody, detectedLanguage, phoneNumber);
    
    // Format response with consultation offer if appropriate
    const formattedResponse = formatWhatsAppMessage(aiResponse, {
      includeConsultation: hasInvestmentIntent,
      language: detectedLanguage
    });
    
    // Store bot response
    await storeConversation(phoneNumber, formattedResponse, 'bot', detectedLanguage);
    
    // Send response via Twilio
    const message = await twilioClient.messages.create({
      from: to, // Your WhatsApp number
      to: from, // User's WhatsApp number
      body: formattedResponse
    });
    
    console.log(`✅ Response sent: ${message.sid}`);
    
    // Store lead info in Firebase if high-value
    if (hasInvestmentIntent) {
      await addDoc(collection(db, 'whatsapp_leads'), {
        phone_number: phoneNumber,
        name: profileName,
        language: detectedLanguage,
        has_investment_intent: true,
        first_message: messageBody,
        created_at: new Date().toISOString()
      });
      
      // Notify Giuseppe
      await notifyGiuseppe(phoneNumber, profileName, messageBody, detectedLanguage);
    }
    
    // Return TwiML response (empty, as we're using the API)
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
    
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    
    // Return a simple fallback response
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Message>
          Welcome to InvestInPuglia! 🏛️
          
          I can help you with EU grants and property investments in Puglia.
          
          Book a consultation: ${STRIPE_CONSULTATION_LINK}
          
          Reply with your investment budget to get started!
        </Message>
      </Response>`,
      { 
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
      }
    );
  }
}

// Notify Giuseppe about high-value leads
async function notifyGiuseppe(phoneNumber: string, name: string, message: string, language: string) {
  try {
    // Use your existing email service
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'g.funaro@investinpuglia.eu',
        subject: `🔥 WhatsApp Lead: ${name}`,
        html: `
          <h2>New High-Value WhatsApp Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>Language:</strong> ${language}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Action:</strong> <a href="https://wa.me/${phoneNumber.replace('+', '')}">Reply on WhatsApp</a></p>
        `
      })
    });
  } catch (error) {
    console.error('Error notifying Giuseppe:', error);
  }
}