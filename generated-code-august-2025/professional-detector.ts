// Professional Interest Detection for Trullo
// Add this to your Trullo message processing

interface ProfessionalInterest {
  type: string;
  keywords: string[];
  confidence: number;
  language: string;
}

interface DetectedInterest {
  professionalType: string;
  confidence: number;
  matchedKeywords: string[];
  suggestedResponse?: string;
}

// Professional categories and their keywords in multiple languages
const PROFESSIONAL_KEYWORDS: Record<string, Record<string, string[]>> = {
  lawyer: {
    en: ['lawyer', 'attorney', 'legal', 'contract', 'notary', 'law firm'],
    it: ['avvocato', 'legale', 'contratto', 'notaio', 'studio legale'],
    es: ['abogado', 'legal', 'contrato', 'notario', 'bufete'],
    fr: ['avocat', 'juridique', 'contrat', 'notaire', 'cabinet'],
    de: ['anwalt', 'rechts', 'vertrag', 'notar', 'kanzlei'],
  },
  architect: {
    en: ['architect', 'design', 'renovation', 'restoration', 'planning'],
    it: ['architetto', 'progetto', 'ristrutturazione', 'restauro', 'progettazione'],
    es: ['arquitecto', 'diseño', 'renovación', 'restauración', 'planificación'],
    fr: ['architecte', 'conception', 'rénovation', 'restauration', 'planification'],
    de: ['architekt', 'design', 'renovierung', 'restaurierung', 'planung'],
  },
  accountant: {
    en: ['accountant', 'tax', 'fiscal', 'bookkeeping', 'CPA', 'taxes'],
    it: ['commercialista', 'fiscale', 'tasse', 'contabilità', 'tributario'],
    es: ['contador', 'fiscal', 'impuestos', 'contabilidad', 'tributario'],
    fr: ['comptable', 'fiscal', 'impôts', 'comptabilité', 'fiscaliste'],
    de: ['buchhalter', 'steuer', 'fiskal', 'buchhaltung', 'steuerberater'],
  },
  realtor: {
    en: ['real estate', 'realtor', 'property agent', 'estate agent', 'broker'],
    it: ['agente immobiliare', 'agenzia', 'mediatore', 'immobiliare'],
    es: ['inmobiliaria', 'agente', 'corredor', 'bienes raíces'],
    fr: ['immobilier', 'agent', 'courtier', 'agence immobilière'],
    de: ['immobilien', 'makler', 'immobilienmakler', 'maklerbüro'],
  },
  engineer: {
    en: ['engineer', 'structural', 'surveyor', 'inspection', 'technical'],
    it: ['ingegnere', 'strutturale', 'geometra', 'perizia', 'tecnico'],
    es: ['ingeniero', 'estructural', 'topógrafo', 'inspección', 'técnico'],
    fr: ['ingénieur', 'structurel', 'géomètre', 'inspection', 'technique'],
    de: ['ingenieur', 'statiker', 'vermesser', 'inspektion', 'technisch'],
  },
  contractor: {
    en: ['contractor', 'builder', 'construction', 'renovation company'],
    it: ['impresa', 'costruttore', 'edile', 'ristrutturazione', 'muratore'],
    es: ['contratista', 'constructor', 'construcción', 'empresa de reformas'],
    fr: ['entrepreneur', 'constructeur', 'construction', 'entreprise de rénovation'],
    de: ['bauunternehmer', 'bauherr', 'baufirma', 'renovierungsfirma'],
  }
};

// Detect professional interest in user message
export function detectProfessionalInterest(
  message: string, 
  language: string = 'en'
): DetectedInterest | null {
  const lowerMessage = message.toLowerCase();
  const detectedInterests: DetectedInterest[] = [];

  // Check each professional type
  for (const [professionalType, languageKeywords] of Object.entries(PROFESSIONAL_KEYWORDS)) {
    const keywords = languageKeywords[language] || languageKeywords.en;
    const matchedKeywords = keywords.filter(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );

    if (matchedKeywords.length > 0) {
      detectedInterests.push({
        professionalType,
        confidence: Math.min(matchedKeywords.length * 0.3, 1),
        matchedKeywords,
      });
    }
  }

  // Return the highest confidence match
  if (detectedInterests.length > 0) {
    return detectedInterests.reduce((prev, current) => 
      prev.confidence > current.confidence ? prev : current
    );
  }

  return null;
}

// Store professional interest in Supabase
export async function logProfessionalInterest(
  conversationId: string,
  professionalType: string,
  confidence: number,
  userMessage: string,
  language: string
) {
  try {
    const response = await fetch('/api/professional-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation_id: conversationId,
        professional_type: professionalType,
        confidence,
        user_message: userMessage,
        language,
        detected_at: new Date().toISOString()
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error logging professional interest:', error);
    return false;
  }
}

// Generate follow-up response when professional interest detected
export function generateProfessionalFollowUp(
  professionalType: string,
  language: string = 'en'
): string {
  const followUps: Record<string, Record<string, string>> = {
    en: {
      lawyer: "I can connect you with experienced property lawyers in Puglia who specialize in foreign investments. Would you like me to share some trusted professionals?",
      architect: "We work with talented architects who understand both traditional Puglia style and modern renovation needs. Shall I introduce you to some?",
      accountant: "Tax optimization is crucial for investors. I can recommend certified accountants who specialize in international tax planning. Interested?",
      realtor: "Finding the right property is key. Our partner real estate agents know the best investment opportunities. Would you like their contacts?",
      engineer: "Structural assessments are important, especially for older properties. I can connect you with qualified engineers. Would that help?",
      contractor: "Quality renovation work is essential. We have vetted contractors with excellent track records. Want to know more?"
    },
    it: {
      lawyer: "Posso metterti in contatto con avvocati esperti in Puglia specializzati in investimenti stranieri. Vuoi che condivida alcuni professionisti di fiducia?",
      architect: "Lavoriamo con architetti di talento che comprendono sia lo stile tradizionale pugliese che le esigenze di ristrutturazione moderna. Vuoi che te ne presenti alcuni?",
      accountant: "L'ottimizzazione fiscale è cruciale per gli investitori. Posso consigliare commercialisti certificati specializzati in pianificazione fiscale internazionale. Interessato?",
      realtor: "Trovare la proprietà giusta è fondamentale. I nostri agenti immobiliari partner conoscono le migliori opportunità di investimento. Vuoi i loro contatti?",
      engineer: "Le valutazioni strutturali sono importanti, soprattutto per le proprietà più vecchie. Posso metterti in contatto con ingegneri qualificati. Ti sarebbe utile?",
      contractor: "Un lavoro di ristrutturazione di qualità è essenziale. Abbiamo imprese verificate con ottimi precedenti. Vuoi saperne di più?"
    }
  };

  const languageFollowUps = followUps[language] || followUps.en;
  return languageFollowUps[professionalType] || "";
}

// Usage in your Trullo chat handler:
/*
// In your message processing:
const professionalInterest = detectProfessionalInterest(userMessage, language);

if (professionalInterest) {
  // Log the interest
  await logProfessionalInterest(
    conversationId,
    professionalInterest.professionalType,
    professionalInterest.confidence,
    userMessage,
    language
  );

  // Add follow-up to Trullo's response
  const followUp = generateProfessionalFollowUp(
    professionalInterest.professionalType,
    language
  );
  
  // Append to AI response
  aiResponse += `\n\n${followUp}`;
}
*/