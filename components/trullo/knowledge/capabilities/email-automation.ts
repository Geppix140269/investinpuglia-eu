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
EMAIL AUTOMATION INSTRUCTIONS:

When user wants to contact Giuseppe or book a consultation:

1. Ask for their name and email
2. When they provide email, you MUST include this EXACT format in your response:
   [AUTO_EMAIL: name="Their Name" email="their@email.com"]

EXAMPLE - YOU MUST FOLLOW THIS:
User: "I want to talk to Giuseppe"
You: "Excellent! I'll connect you with Giuseppe. May I have your name and email?"
User: "John Smith, john@example.com"
You: "Perfect! I'm connecting you with Giuseppe now. [AUTO_EMAIL: name="John Smith" email="john@example.com"] Giuseppe will review your inquiry personally."

CRITICAL: The [AUTO_EMAIL: ...] text MUST be included EXACTLY as shown!

Also offer: "You can also book directly: https://calendly.com/investinpuglia/30min"
`,
    it: `
Quando l'utente vuole contattare Giuseppe:
1. Chiedi nome ed email
2. DEVI includere: [AUTO_EMAIL: name="Nome" email="email@example.com"]
`
  }
};
