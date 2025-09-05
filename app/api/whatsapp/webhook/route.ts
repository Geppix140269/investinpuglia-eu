// WhatsApp Business API Webhook for Trullo AI
// Handles incoming WhatsApp messages via Twilio

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import OpenAI from 'openai';

// Initialize Twilio client with environment variables
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+447862140269';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Language detection patterns
const languagePatterns = {
  it: /\b(ciao|buongiorno|salve|grazie|investire|propriet[àa]|puglia)\b/i,
  de: /\b(hallo|guten|danke|investieren|immobilie|apulien)\b/i,
  fr: /\b(bonjour|salut|merci|investir|propriété|pouilles)\b/i,
  es: /\b(hola|buenos|gracias|invertir|propiedad|apulia)\b/i,
  ar: /\b(مرحبا|شكرا|استثمار|عقار|بوليا)\b/,
  zh: /\b(你好|谢谢|投资|房产|普利亚)\b/,
  en: /\b(hello|hi|thanks|invest|property|puglia|grant)\b/i
};

// System prompts for different languages
const SYSTEM_PROMPTS: Record<string, string> = {
  en: `You are Trullo, the WhatsApp AI assistant for Invest in Puglia. You help with:
- PIA and Mini PIA grants (€200K-€2.75M non-refundable EU grants)
- Real estate investments in Puglia
- Commercial and tourism projects
Keep responses concise for WhatsApp. Always encourage booking a consultation at https://investinpuglia.eu/consultation`,
  
  it: `Sei Trullo, l'assistente AI WhatsApp per Invest in Puglia. Aiuti con:
- Sovvenzioni PIA e Mini PIA (€200K-€2.75M sovvenzioni UE non rimborsabili)
- Investimenti immobiliari in Puglia
- Progetti commerciali e turistici
Mantieni le risposte concise per WhatsApp. Incoraggia sempre la prenotazione di una consulenza su https://investinpuglia.eu/consultation`,
  
  es: `Eres Trullo, el asistente de WhatsApp AI para Invest in Puglia. Ayudas con:
- Subvenciones PIA y Mini PIA (€200K-€2.75M subvenciones no reembolsables de la UE)
- Inversiones inmobiliarias en Puglia
- Proyectos comerciales y turísticos
Mantén las respuestas concisas para WhatsApp. Siempre anima a reservar una consulta en https://investinpuglia.eu/consultation`,
  
  fr: `Vous êtes Trullo, l'assistant WhatsApp IA pour Invest in Puglia. Vous aidez avec:
- Subventions PIA et Mini PIA (200K€-2,75M€ de subventions UE non remboursables)
- Investissements immobiliers en Puglia
- Projets commerciaux et touristiques
Gardez les réponses concises pour WhatsApp. Encouragez toujours la réservation d'une consultation sur https://investinpuglia.eu/consultation`,
  
  de: `Sie sind Trullo, der WhatsApp KI-Assistent für Invest in Puglia. Sie helfen bei:
- PIA- und Mini-PIA-Zuschüsse (200.000€-2,75 Mio.€ nicht rückzahlbare EU-Zuschüsse)
- Immobilieninvestitionen in Apulien
- Gewerbe- und Tourismusprojekte
Halten Sie die Antworten für WhatsApp kurz. Ermutigen Sie immer zur Buchung einer Beratung unter https://investinpuglia.eu/consultation`,
  
  ar: `أنت ترولو، مساعد WhatsApp الذكي لـ Invest in Puglia. تساعد في:
- منح PIA و Mini PIA (200 ألف يورو - 2.75 مليون يورو منح الاتحاد الأوروبي غير القابلة للاسترداد)
- استثمارات عقارية في بوليا
- مشاريع تجارية وسياحية
اجعل الردود موجزة لـ WhatsApp. شجع دائمًا على حجز استشارة على https://investinpuglia.eu/consultation`,
  
  zh: `您是Trullo，Invest in Puglia的WhatsApp AI助手。您帮助：
- PIA和Mini PIA补助金（20万欧元-275万欧元欧盟不可退还补助金）
- 普利亚房地产投资
- 商业和旅游项目
为WhatsApp保持简洁的回复。始终鼓励在https://investinpuglia.eu/consultation预约咨询`
};

// Detect language from message
function detectLanguage(text: string): string {
  for (const [lang, pattern] of Object.entries(languagePatterns)) {
    if (pattern.test(text)) return lang;
  }
  return 'en'; // Default to English
}

// Format WhatsApp message with rich formatting
function formatWhatsAppMessage(text: string): string {
  // WhatsApp supports basic formatting:
  // *bold* _italic_ ~strikethrough~ ```monospace```
  return text
    .replace(/\*\*(.*?)\*\*/g, '*$1*') // Convert ** to *
    .replace(/__(.*?)__/g, '_$1_'); // Convert __ to _
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
    
    // Extract message details
    const from = body.get('From') as string; // User's WhatsApp number
    const messageBody = body.get('Body') as string;
    const profileName = body.get('ProfileName') as string || 'User';
    
    if (!from || !messageBody) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const phoneNumber = from.replace('whatsapp:', '');
    console.log(`📱 WhatsApp message from ${profileName} (${phoneNumber}): ${messageBody}`);

    // Detect language
    const language = detectLanguage(messageBody);

    // Get AI response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { 
          role: 'system', 
          content: SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en 
        },
        { 
          role: 'user', 
          content: messageBody 
        }
      ],
      temperature: 0.7,
      max_tokens: 400 // Slightly increased for complete responses
    });

    const aiResponse = completion.choices[0].message.content || 
      'I apologize, I could not process your request. Please try again.';

    // Format response for WhatsApp
    const formattedResponse = formatWhatsAppMessage(aiResponse);

    // Only add quick replies for initial greeting or when specifically helpful
    const isGreeting = messageBody.toLowerCase().match(/^(hi|hello|ciao|hola|bonjour)/);
    const quickReplies = isGreeting && language === 'en' 
      ? '\n\n📞 Reply with:\n1 - Book Consultation\n2 - PIA Grants Info\n3 - View Properties\n4 - Human Support'
      : isGreeting && language === 'it'
      ? '\n\n📞 Rispondi con:\n1 - Prenota Consulenza\n2 - Info Sovvenzioni\n3 - Vedi Proprietà\n4 - Supporto Umano'
      : '';

    // WhatsApp has a 1600 character limit per message
    let finalMessage = formattedResponse;
    if (quickReplies && (formattedResponse.length + quickReplies.length) < 1500) {
      finalMessage = formattedResponse + quickReplies;
    }

    // Send response via Twilio
    await twilioClient.messages.create({
      body: finalMessage,
      from: TWILIO_WHATSAPP_NUMBER,
      to: from
    });

    // Send email notification to admin for high-value leads
    if (messageBody.toLowerCase().includes('consultation') || 
        messageBody.toLowerCase().includes('grant') ||
        messageBody.toLowerCase().includes('invest')) {
      
      // Send notification via Resend
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trullo/email-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: 'info@investinpuglia.eu',
          conversation: [{
            sender: 'user',
            text: messageBody,
            timestamp: new Date()
          }, {
            sender: 'trullo',
            text: aiResponse,
            timestamp: new Date()
          }],
          language
        })
      });
    }

    // Return success response
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