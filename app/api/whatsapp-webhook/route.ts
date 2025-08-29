// WhatsApp Business API Webhook for InvestInPuglia
// Handles incoming WhatsApp messages via Twilio

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

// Initialize Twilio client with your credentials
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Initialize Supabase for conversation storage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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
  return 'en'; // Default to English
}

// Get Trullo AI response
async function getTrulloResponse(message: string, language: string, phoneNumber: string) {
  try {
    // Get conversation history
    const { data: history } = await supabase
      .from('whatsapp_conversations')
      .select('*')
      .eq('phone_number', phoneNumber)
      .order('created_at', { ascending: false })
      .limit(10);

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
    return "I'm here to help with your Puglia investment questions. How can I assist you?";
  }
}

// Format WhatsApp message with rich content
function formatWhatsAppMessage(text: string, options?: {
  includeButtons?: boolean;
  includeConsultation?: boolean;
  language?: string;
}) {
  let formattedText = text;
  
  // Add consultation offer if appropriate
  if (options?.includeConsultation) {
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

// Store conversation in database
async function storeConversation(phoneNumber: string, message: string, sender: 'user' | 'bot', language: string) {
  try {
    await supabase.from('whatsapp_conversations').insert({
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

// Verify Twilio webhook signature
function verifyTwilioSignature(request: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  
  const twilioSignature = request.headers.get('X-Twilio-Signature') || '';
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp-webhook`;
  const params = Object.fromEntries(new URL(request.url).searchParams);
  
  return twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN!,
    twilioSignature,
    url,
    params
  );
}

// GET request for webhook verification
export async function GET(request: NextRequest) {
  // Twilio webhook verification
  return new NextResponse('Webhook verified', { status: 200 });
}

// POST request to handle incoming messages
export async function POST(request: NextRequest) {
  try {
    // Verify request is from Twilio
    if (!verifyTwilioSignature(request)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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
    
    // Track analytics
    await supabase.from('whatsapp_analytics').insert({
      phone_number: phoneNumber,
      profile_name: profileName,
      language: detectedLanguage,
      has_investment_intent: hasInvestmentIntent,
      message_length: messageBody.length,
      created_at: new Date().toISOString()
    });
    
    // If high-value lead, notify Giuseppe
    if (hasInvestmentIntent) {
      await notifyGiuseppe(phoneNumber, profileName, messageBody, detectedLanguage);
    }
    
    // Return TwiML response (empty, as we're using the API)
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
    
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Notify Giuseppe about high-value leads
async function notifyGiuseppe(phoneNumber: string, name: string, message: string, language: string) {
  try {
    // Send email notification
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