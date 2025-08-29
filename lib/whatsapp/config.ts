// WhatsApp Business API Configuration

export const WHATSAPP_CONFIG = {
  // Twilio WhatsApp number
  WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+447862140269',
  
  // Stripe payment link
  CONSULTATION_LINK: 'https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07',
  CONSULTATION_PRICE: 60,
  
  // Lead scoring thresholds
  LEAD_SCORING: {
    HIGH_VALUE: 70,      // Notify Giuseppe immediately
    MEDIUM_VALUE: 40,    // Add to follow-up queue
    LOW_VALUE: 20        // Automated nurturing only
  },
  
  // Conversation states
  STATES: {
    GREETING: 'greeting',
    QUALIFICATION: 'qualification',
    PROPERTY_INTEREST: 'property_interest',
    GRANT_INQUIRY: 'grant_inquiry',
    CONSULTATION_OFFER: 'consultation_offer',
    CONTACT_CAPTURE: 'contact_capture',
    HUMAN_HANDOFF: 'human_handoff'
  },
  
  // Auto-response delays (in ms)
  RESPONSE_DELAYS: {
    MIN: 1000,  // 1 second
    MAX: 3000   // 3 seconds
  },
  
  // Follow-up sequences (in hours)
  FOLLOW_UP_SCHEDULE: {
    FIRST_FOLLOWUP: 24,      // 1 day
    SECOND_FOLLOWUP: 72,     // 3 days
    THIRD_FOLLOWUP: 168,     // 1 week
    MONTHLY_CHECK: 720       // 30 days
  },
  
  // Languages supported
  LANGUAGES: ['en', 'it', 'de', 'fr', 'es', 'ar', 'zh', 'ru'],
  
  // Quick replies
  QUICK_REPLIES: {
    en: [
      'Tell me about EU grants',
      'Show available properties',
      'Book consultation',
      'Investment process'
    ],
    it: [
      'Informazioni sui contributi UE',
      'Mostra proprietà disponibili',
      'Prenota consulenza',
      'Processo di investimento'
    ],
    de: [
      'EU-Zuschüsse Info',
      'Verfügbare Immobilien',
      'Beratung buchen',
      'Investitionsprozess'
    ]
  },
  
  // Message templates
  TEMPLATES: {
    WELCOME: {
      en: `👋 Welcome to InvestInPuglia!

I'm Trullo, your AI investment assistant. I can help you with:

🏛️ EU grants up to €2.25M
🏡 Prime properties in Puglia
📊 ROI calculations
📅 Consultation booking

What brings you here today?`,
      
      it: `👋 Benvenuto su InvestInPuglia!

Sono Trullo, il tuo assistente AI per gli investimenti. Posso aiutarti con:

🏛️ Contributi UE fino a €2.25M
🏡 Proprietà esclusive in Puglia
📊 Calcoli ROI
📅 Prenotazione consulenze

Cosa ti porta qui oggi?`
    },
    
    CONSULTATION_OFFER: {
      en: `💡 *Ready for personalized advice?*

Book a 30-minute strategy call with Giuseppe Funaro, our CEO:

✅ Grant eligibility assessment
✅ Property recommendations
✅ Investment strategy
✅ Next steps action plan

*Special price: €60* (normally €150)

Click here to book: ${process.env.NEXT_PUBLIC_BASE_URL}/consultation`,
      
      it: `💡 *Pronto per una consulenza personalizzata?*

Prenota una chiamata strategica di 30 minuti con Giuseppe Funaro, nostro CEO:

✅ Valutazione idoneità contributi
✅ Raccomandazioni proprietà
✅ Strategia di investimento
✅ Piano d'azione

*Prezzo speciale: €60* (normalmente €150)

Clicca qui per prenotare: ${process.env.NEXT_PUBLIC_BASE_URL}/consultation`
    }
  }
};

// Lead scoring algorithm
export function calculateLeadScore(data: {
  messageCount: number;
  hasInvestmentIntent: boolean;
  budgetMentioned: boolean;
  propertyViewed: boolean;
  consultationInterest: boolean;
  responseTime: number; // in seconds
  language: string;
}): number {
  let score = 0;
  
  // Message engagement (max 20 points)
  score += Math.min(data.messageCount * 2, 20);
  
  // Investment intent (30 points)
  if (data.hasInvestmentIntent) score += 30;
  
  // Budget mentioned (20 points)
  if (data.budgetMentioned) score += 20;
  
  // Property interest (15 points)
  if (data.propertyViewed) score += 15;
  
  // Consultation interest (25 points)
  if (data.consultationInterest) score += 25;
  
  // Quick response (10 points if under 30 seconds)
  if (data.responseTime < 30) score += 10;
  
  // International lead bonus (5 points)
  if (!['it'].includes(data.language)) score += 5;
  
  return Math.min(score, 100); // Cap at 100
}

// Determine next message based on conversation state
export function getNextState(currentState: string, userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Check for specific intents
  if (message.includes('grant') || message.includes('contribut')) {
    return WHATSAPP_CONFIG.STATES.GRANT_INQUIRY;
  }
  
  if (message.includes('propert') || message.includes('hotel') || message.includes('villa')) {
    return WHATSAPP_CONFIG.STATES.PROPERTY_INTEREST;
  }
  
  if (message.includes('consult') || message.includes('call') || message.includes('meet')) {
    return WHATSAPP_CONFIG.STATES.CONSULTATION_OFFER;
  }
  
  if (message.includes('email') || message.includes('@')) {
    return WHATSAPP_CONFIG.STATES.CONTACT_CAPTURE;
  }
  
  if (message.includes('speak') || message.includes('human') || message.includes('giuseppe')) {
    return WHATSAPP_CONFIG.STATES.HUMAN_HANDOFF;
  }
  
  // Default progression
  switch (currentState) {
    case WHATSAPP_CONFIG.STATES.GREETING:
      return WHATSAPP_CONFIG.STATES.QUALIFICATION;
    case WHATSAPP_CONFIG.STATES.QUALIFICATION:
      return WHATSAPP_CONFIG.STATES.PROPERTY_INTEREST;
    default:
      return currentState;
  }
}