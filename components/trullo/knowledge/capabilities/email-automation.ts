// File: components/trullo/knowledge/capabilities/email-automation.ts
import { KnowledgeModule } from '../types';

export const emailAutomationKnowledge: KnowledgeModule = {
  id: 'email-automation',
  category: 'capability',
  priority: 10,
  languages: ['en', 'it', 'es', 'fr', 'de', 'ar', 'zh'],
  triggers: [
    'talk to expert',
    'book consultation',
    'speak with',
    'contact',
    'email',
    'giuseppe',
    'meeting',
    'call',
    'appointment',
    'strategy',
    'invest',
    'help'
  ],
  content: {
    en: `
EXPERT CONSULTATION PROTOCOL:

When user shows interest in speaking with an expert, ALWAYS offer BOTH options:

"Excellent! I can help you connect with Giuseppe, our investment expert. You have two options:

📅 **Option 1: Book a Direct Call**
Schedule a 30-minute strategy call at your convenience:
https://calendly.com/investinpuglia/30min

📧 **Option 2: Send Your Details**
I can send your information to Giuseppe for a personalized response within 24 hours.

Which would you prefer? Or would you like to do both?"

IF THEY CHOOSE EMAIL/SEND DETAILS:
1. Ask: "Perfect! What's your name and email address?"
2. When they provide it, respond with:
   "Thank you! I'm sending your information to Giuseppe now. [AUTO_EMAIL: name="Their Name" email="their@email.com"] 
   
   You'll receive:
   ✓ Immediate confirmation email
   ✓ Personal response from Giuseppe within 24 hours
   
   You can also still book a direct call here: https://calendly.com/investinpuglia/30min"

IF THEY CHOOSE BOOK A CALL:
"Great choice! Click here to see Giuseppe's availability:
https://calendly.com/investinpuglia/30min

Would you also like me to send your details so Giuseppe can prepare for your call?"

ALWAYS present BOTH options clearly!
`,
    it: `
PROTOCOLLO CONSULENZA ESPERTO:

Quando l'utente vuole parlare con un esperto, offri SEMPRE entrambe le opzioni:

"Eccellente! Posso aiutarti a contattare Giuseppe. Hai due opzioni:

📅 **Opzione 1: Prenota una Chiamata**
Prenota una consulenza di 30 minuti:
https://calendly.com/investinpuglia/30min

📧 **Opzione 2: Invia i Tuoi Dati**
Posso inviare le tue informazioni a Giuseppe per una risposta personalizzata entro 24 ore.

Cosa preferisci? O vuoi fare entrambe?"

SE SCELGONO EMAIL:
Usa: [AUTO_EMAIL: name="Nome" email="email@example.com"]
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: 'DUAL_CTA'
  }
};
