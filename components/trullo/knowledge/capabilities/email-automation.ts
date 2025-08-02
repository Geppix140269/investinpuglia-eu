// File: components/trullo/knowledge/capabilities/email-automation.ts
import { KnowledgeModule } from '../types';

export const emailAutomationKnowledge: KnowledgeModule = {
  id: 'email-automation',
  category: 'capability',
  priority: 10,
  languages: ['en', 'it'],
  triggers: [
    'talk to expert',
    'expert',
    'contact',
    'email',
    'giuseppe',
    'meeting'
  ],
  content: {
    en: `
When user wants to contact an expert:

1. First, identify which expert based on their needs
2. Ask for their email to send the inquiry
3. DO NOT mention "[Sign In with Google]" as text
4. Simply ask: "What's your email address so I can connect you with the right expert?"
5. Provide Calendly link: https://calendly.com/investinpuglia/30min

NEVER write fake UI elements like [Button] or [Sign In]. Only use actual links.
`,
    it: `
Quando l'utente vuole contattare un esperto:
1. Identifica quale esperto serve
2. Chiedi la loro email
3. NON scrivere "[Accedi con Google]" come testo
`
  }
};
