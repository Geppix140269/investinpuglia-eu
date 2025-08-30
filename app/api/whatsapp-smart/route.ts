// Smart WhatsApp Bot for InvestInPuglia - Full Conversation Flow
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Stripe consultation link
const STRIPE_LINK = 'https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07';

// Comprehensive responses based on intent
const RESPONSES = {
  greeting: {
    en: `🏛️ Welcome to InvestInPuglia!

I'm your AI assistant for EU grants and property investments in Puglia, Italy.

I can help you with:
💰 EU Grants up to €2.25M
🏡 Premium Properties 
📊 ROI Calculations
📅 Book Consultation with CEO

What interests you most?
1️⃣ View available properties
2️⃣ Calculate grant eligibility
3️⃣ Book strategy call (€60)
4️⃣ Learn about the process

Reply with a number or tell me about your investment plans!`,
    
    it: `🏛️ Benvenuto su InvestInPuglia!

Sono il tuo assistente AI per contributi UE e investimenti immobiliari in Puglia.

Posso aiutarti con:
💰 Contributi UE fino a €2.25M
🏡 Proprietà Premium
📊 Calcoli ROI
📅 Consulenza con il CEO

Cosa ti interessa di più?
1️⃣ Proprietà disponibili
2️⃣ Calcola idoneità contributi
3️⃣ Prenota chiamata (€60)
4️⃣ Info sul processo

Rispondi con un numero o parlami dei tuoi piani!`
  },
  
  properties: {
    en: `🏡 Current Premium Properties in Puglia:

📍 **Luxury Hotel - Ostuni**
• Price: €3.2M
• 20 rooms, sea view
• Grant eligible: up to €1.4M

📍 **Boutique B&B - Lecce**
• Price: €850K
• Historic center
• Grant eligible: up to €380K

📍 **Beach Resort - Polignano**
• Price: €5.5M
• 40 rooms, private beach
• Grant eligible: up to €2.25M

📍 **Trulli Complex - Alberobello**
• Price: €1.2M
• 8 traditional trulli
• Grant eligible: up to €540K

Want details on any property? Or book a viewing?
👉 Reply with property name or "book viewing"`,
    
    it: `🏡 Proprietà Premium in Puglia:

📍 **Hotel di Lusso - Ostuni**
• Prezzo: €3.2M
• 20 camere, vista mare
• Contributo: fino a €1.4M

📍 **B&B Boutique - Lecce**
• Prezzo: €850K
• Centro storico
• Contributo: fino a €380K

📍 **Resort Spiaggia - Polignano**
• Prezzo: €5.5M
• 40 camere, spiaggia privata
• Contributo: fino a €2.25M

📍 **Complesso Trulli - Alberobello**
• Prezzo: €1.2M
• 8 trulli tradizionali
• Contributo: fino a €540K

Vuoi dettagli? O prenotare una visita?
👉 Rispondi con nome proprietà o "prenota visita"`
  },
  
  grants: {
    en: `💰 EU Grant Calculator for Puglia Tourism:

Tell me your investment amount and I'll calculate your grant!

**Grant Rates:**
• 35% - Basic tourism project
• 40% - With sustainability features
• 45% - Including innovation
• 50% - Full integration (sustainability + innovation)

**Example Calculations:**
€500K investment = up to €250K grant
€1M investment = up to €500K grant
€3M investment = up to €1.5M grant

Plus: 15% additional tax credit!

What's your planned investment amount?`,
    
    it: `💰 Calcolo Contributi UE per Turismo Puglia:

Dimmi il tuo importo di investimento e calcolerò il contributo!

**Tassi di Contributo:**
• 35% - Progetto turistico base
• 40% - Con sostenibilità
• 45% - Con innovazione
• 50% - Integrazione completa

**Esempi:**
€500K investimento = fino a €250K contributo
€1M investimento = fino a €500K contributo
€3M investimento = fino a €1.5M contributo

Più: 15% credito d'imposta aggiuntivo!

Qual è il tuo budget di investimento?`
  },
  
  consultation: {
    en: `📅 **Book Your Strategy Call with Giuseppe Funaro**

Get personalized investment guidance from our CEO!

**What's Included (30 minutes):**
✅ Grant eligibility assessment
✅ Property recommendations for your budget
✅ ROI projections
✅ Step-by-step action plan
✅ Answer all your questions

💰 **Special Price: €60** (normally €150)

📞 **Available slots this week:**
• Tomorrow 15:00
• Thursday 10:00
• Friday 14:00

**Book now:** ${STRIPE_LINK}

After payment, you'll receive:
1. Zoom link via email
2. WhatsApp reminder
3. Preparation checklist

Ready to book? Click the link above! 🚀`,
    
    it: `📅 **Prenota Chiamata con Giuseppe Funaro**

Consulenza personalizzata dal nostro CEO!

**Cosa Include (30 minuti):**
✅ Valutazione idoneità contributi
✅ Proprietà per il tuo budget
✅ Proiezioni ROI
✅ Piano d'azione dettagliato
✅ Risposte a tutte le domande

💰 **Prezzo Speciale: €60** (normale €150)

📞 **Slot disponibili:**
• Domani 15:00
• Giovedì 10:00
• Venerdì 14:00

**Prenota ora:** ${STRIPE_LINK}

Dopo il pagamento riceverai:
1. Link Zoom via email
2. Promemoria WhatsApp
3. Checklist preparazione

Pronto? Clicca il link sopra! 🚀`
  },
  
  process: {
    en: `📋 **Your Investment Journey with InvestInPuglia:**

**Phase 1: Discovery (You are here)**
• Initial consultation
• Property selection
• Grant eligibility check

**Phase 2: Planning (2-4 weeks)**
• Business plan development
• Financial structuring
• Legal entity setup

**Phase 3: Application (4-6 weeks)**
• Grant application submission
• Document preparation
• Bank financing arrangement

**Phase 4: Approval (8-12 weeks)**
• Regional evaluation
• Integration requests
• Final approval

**Phase 5: Implementation (12-18 months)**
• Property acquisition
• Renovation/Development
• Grant disbursement

**Our Success Rate: 95%**
**Average Grant: €750K**

Ready to start? Book your consultation!
${STRIPE_LINK}`,
    
    it: `📋 **Il Tuo Percorso con InvestInPuglia:**

**Fase 1: Scoperta (Sei qui)**
• Consulenza iniziale
• Selezione proprietà
• Verifica idoneità

**Fase 2: Pianificazione (2-4 settimane)**
• Sviluppo business plan
• Struttura finanziaria
• Costituzione società

**Fase 3: Domanda (4-6 settimane)**
• Invio domanda contributo
• Preparazione documenti
• Accordi bancari

**Fase 4: Approvazione (8-12 settimane)**
• Valutazione regionale
• Integrazioni
• Approvazione finale

**Fase 5: Realizzazione (12-18 mesi)**
• Acquisizione proprietà
• Ristrutturazione
• Erogazione contributo

**Tasso Successo: 95%**
**Contributo Medio: €750K**

Pronto per iniziare? Prenota consulenza!
${STRIPE_LINK}`
  }
};

// Calculate grant based on amount
function calculateGrant(amount: number): string {
  const grantAmount = amount * 0.45; // 45% average
  const taxCredit = amount * 0.15;
  const total = grantAmount + taxCredit;
  
  return `Based on €${(amount/1000).toFixed(0)}K investment:

📊 **Your Grant Package:**
• EU Grant (45%): €${(grantAmount/1000).toFixed(0)}K
• Tax Credit (15%): €${(taxCredit/1000).toFixed(0)}K
• Total Benefits: €${(total/1000).toFixed(0)}K
• Your Investment: €${((amount-grantAmount)/1000).toFixed(0)}K

This could fund a beautiful property in Puglia!

Want to see properties in your budget range?
Book a consultation to get started: ${STRIPE_LINK}`;
}

// Detect language
function detectLanguage(text: string): string {
  const lower = text.toLowerCase();
  if (lower.match(/ciao|buon|grazie|italiano|italia/)) return 'it';
  if (lower.match(/hallo|guten|danke|deutsch/)) return 'de';
  if (lower.match(/bonjour|merci|français/)) return 'fr';
  if (lower.match(/hola|gracias|español/)) return 'es';
  return 'en';
}

// Detect intent from message
function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  
  // Check for menu selections
  if (lower.includes('1') || lower.includes('propert')) return 'properties';
  if (lower.includes('2') || lower.includes('grant') || lower.includes('calculat')) return 'grants';
  if (lower.includes('3') || lower.includes('book') || lower.includes('consult') || lower.includes('call')) return 'consultation';
  if (lower.includes('4') || lower.includes('process') || lower.includes('how')) return 'process';
  
  // Check for amounts (investment discussion)
  if (lower.match(/\d+k|\d+m|€\d+|\$\d+|thousand|million/)) return 'amount';
  
  // Check for specific properties
  if (lower.includes('ostuni') || lower.includes('lecce') || lower.includes('polignano') || lower.includes('trulli')) return 'properties';
  
  // Default to greeting
  return 'greeting';
}

// Get conversation state
async function getConversationState(phoneNumber: string) {
  try {
    const stateDoc = await getDoc(doc(db, 'whatsapp_states', phoneNumber));
    return stateDoc.exists() ? stateDoc.data() : { messageCount: 0, lastIntent: 'greeting' };
  } catch {
    return { messageCount: 0, lastIntent: 'greeting' };
  }
}

// Save conversation state
async function saveConversationState(phoneNumber: string, state: any) {
  try {
    await setDoc(doc(db, 'whatsapp_states', phoneNumber), {
      ...state,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving state:', error);
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({ 
    status: 'WhatsApp Smart Bot is ready!',
    timestamp: new Date().toISOString()
  });
}

// POST endpoint for WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    
    const from = body.From as string;
    const messageBody = body.Body as string;
    const profileName = body.ProfileName as string;
    const phoneNumber = from.replace('whatsapp:', '');
    
    console.log(`📱 Message from ${profileName}: ${messageBody}`);
    
    // Get conversation state
    const state = await getConversationState(phoneNumber);
    const language = detectLanguage(messageBody);
    const intent = detectIntent(messageBody);
    
    // Generate appropriate response
    let response = '';
    
    // Check if it's an amount
    if (intent === 'amount') {
      const amount = parseInt(messageBody.replace(/[^\d]/g, ''));
      if (amount > 0) {
        response = calculateGrant(amount * (messageBody.includes('m') ? 1000000 : 1000));
      }
    } else {
      // Get response based on intent
      response = RESPONSES[intent as keyof typeof RESPONSES]?.[language as 'en' | 'it'] 
        || RESPONSES.greeting[language as 'en' | 'it'] 
        || RESPONSES.greeting.en;
    }
    
    // Add personalization for returning users
    if (state.messageCount > 0) {
      const greeting = language === 'it' ? `Bentornato ${profileName}! ` : `Welcome back ${profileName}! `;
      if (!response.includes(profileName)) {
        response = greeting + '\n\n' + response;
      }
    }
    
    // Save conversation
    await addDoc(collection(db, 'whatsapp_conversations'), {
      phone_number: phoneNumber,
      name: profileName,
      message: messageBody,
      response: response,
      intent: intent,
      language: language,
      created_at: new Date().toISOString()
    });
    
    // Update state
    await saveConversationState(phoneNumber, {
      messageCount: state.messageCount + 1,
      lastIntent: intent,
      language: language,
      name: profileName
    });
    
    // Send response
    await twilioClient.messages.create({
      from: body.To as string,
      to: from,
      body: response
    });
    
    // If high value lead, notify Giuseppe
    if (intent === 'amount' || intent === 'consultation') {
      await notifyGiuseppe(phoneNumber, profileName, messageBody);
    }
    
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' }
    });
    
  } catch (error) {
    console.error('Error:', error);
    // Fallback response
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Message>Welcome to InvestInPuglia! 🏛️
        
Reply with:
1 - View properties
2 - Calculate grants
3 - Book consultation (€60)
4 - Learn the process

Or tell me your investment budget!</Message>
      </Response>`,
      { status: 200, headers: { 'Content-Type': 'text/xml' } }
    );
  }
}

// Notify Giuseppe
async function notifyGiuseppe(phone: string, name: string, message: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'g.funaro@investinpuglia.eu',
        subject: `🔥 WhatsApp Lead: ${name}`,
        html: `
          <h2>High-Value WhatsApp Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><a href="https://wa.me/${phone.replace('+', '')}">Reply on WhatsApp</a></p>
        `
      })
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
}