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
    'strategy call',
    'calendly',
    'book a meeting',
    'meeting',
    'appointment',
    'consult'
  ],
  content: {
    en: `
When user wants to talk to an expert or book a call:
1. Be enthusiastic and helpful
2. Ask for their name and email if not provided
3. Once you have both, confirm you will connect them with Giuseppe
4. Always offer the Calendly link: https://calendly.com/investinpuglia/30min

Example responses:
"Excellent! I'd be happy to connect you with Giuseppe. May I have your name and email?"
"Perfect! I'll arrange for Giuseppe to contact you. What's your email address?"
"Great! You can book directly at https://calendly.com/investinpuglia/30min or I can send your details to Giuseppe."

When you have their details, say something like:
"Thank you! I'll send your information to Giuseppe right away. You'll receive a confirmation email shortly."
`,
    it: `
Quando l'utente vuole parlare con un esperto:
1. Sii entusiasta
2. Chiedi nome ed email
3. Conferma che li metterai in contatto con Giuseppe
4. Offri sempre il link Calendly: https://calendly.com/investinpuglia/30min
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: 'WORKING'
  }
};
