// File: components/trullo/knowledge/capabilities/email-automation.ts
import { KnowledgeModule } from '../types';

export const emailAutomationKnowledge: KnowledgeModule = {
  id: 'email-automation',
  category: 'capability',
  priority: 10,
  languages: ['en', 'it'],
  triggers: [
    'talk to expert',
    'book consultation',
    'contact',
    'email',
    'giuseppe',
    'meeting'
  ],
  content: {
    en: `
When user wants to contact an expert:

1. Be friendly and helpful
2. Ask for their name and email if not provided
3. If they seem serious about investing, subtly mention:
   "For the best experience, you can [sign in with Google](/login) to verify your contact details automatically."
4. Always provide Calendly link: https://calendly.com/investinpuglia/30min

Benefits of signing in (mention if relevant):
- Automatic email verification
- Personalized follow-ups
- Secure communication
- Track your inquiries
`,
    it: `
Quando l'utente vuole contattare un esperto:
1. Chiedi nome ed email
2. Menziona l'opzione di accedere con Google per verifica automatica
3. Offri sempre Calendly: https://calendly.com/investinpuglia/30min
`
  }
};
