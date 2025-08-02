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
    'appointment'
  ],
  content: {
    en: `
When user wants to contact Giuseppe or book a consultation:

1. Be friendly and ask for their name and email
2. Confirm you'll connect them with Giuseppe
3. Always offer the Calendly link: https://calendly.com/investinpuglia/30min

Example responses:
"I'd be happy to connect you with Giuseppe! May I have your name and email?"
"Perfect! I'll send your information to Giuseppe. You can also book directly at https://calendly.com/investinpuglia/30min"
`,
    it: `
Quando l'utente vuole contattare Giuseppe:
1. Chiedi nome ed email
2. Conferma che li metterai in contatto
3. Offri il link Calendly: https://calendly.com/investinpuglia/30min
`
  }
};
