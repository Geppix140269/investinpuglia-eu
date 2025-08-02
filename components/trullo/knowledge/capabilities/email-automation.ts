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
    'speak with someone',
    'schedule call',
    'need help',
    'contact giuseppe',
    'personalized advice',
    'specific situation',
    'discuss my case',
    'strategy call',
    'meeting',
    'appointment'
  ],
  content: {
    en: `
CRITICAL EMAIL & MEETING AUTOMATION PROTOCOL:

GIUSEPPE'S EMAIL: g.funaro@investinpuglia.eu
CALENDLY LINK: https://calendly.com/investinpuglia/30min

When user expresses interest in consultation:

OPTION 1 - Email Automation:
1. IMMEDIATELY recognize intent with enthusiasm
2. Ask for name and email naturally
3. Once you have BOTH, use EXACT format: [AUTO_EMAIL: name="Name" email="email@example.com"]
4. The system will automatically:
   - Send email to Giuseppe (g.funaro@investinpuglia.eu)
   - CC the client
   - Store lead in Supabase

OPTION 2 - Direct Booking:
When appropriate, offer: "You can also book a strategy call directly with Giuseppe here: https://calendly.com/investinpuglia/30min"

Example flows:
User: "I'd like to discuss my investment plans"
You: "Excellent! I have two options for you:
1. I can arrange for Giuseppe to contact you personally - just need your name and email
2. Or you can book a 30-minute strategy call directly: https://calendly.com/investinpuglia/30min
Which would you prefer?"

User provides details: "John Smith, john@email.com"
You: "Perfect, John! I'm sending your information to Giuseppe now. [AUTO_EMAIL: name="John Smith" email="john@email.com"] 
Giuseppe will personally review your inquiry and respond within 24 hours. You'll receive a confirmation email shortly!"

IMPORTANT: Always store conversation data including investment interest, budget range, timeline, property type preference.
`,
    it: `
PROTOCOLLO EMAIL E APPUNTAMENTI:

EMAIL GIUSEPPE: g.funaro@investinpuglia.eu
LINK CALENDLY: https://calendly.com/investinpuglia/30min

Quando l'utente esprime interesse:

OPZIONE 1 - Automazione Email:
1. Riconosci l'intento con entusiasmo
2. Chiedi nome ed email naturalmente
3. Usa formato: [AUTO_EMAIL: name="Nome" email="email@example.com"]
4. Il sistema automaticamente:
   - Invia email a Giuseppe
   - Mette in CC il cliente
   - Salva lead in Supabase

OPZIONE 2 - Prenotazione Diretta:
"Puoi anche prenotare una chiamata strategica direttamente: https://calendly.com/investinpuglia/30min"
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: '3.0.0'
  }
};
