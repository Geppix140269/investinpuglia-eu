// File: components/trullo/knowledge/capabilities/email-automation.ts
import { KnowledgeModule } from '../types';

export const emailAutomationKnowledge: KnowledgeModule = {
  id: 'email-automation',
  category: 'capability',
  priority: 10,
  languages: ['en', 'it', 'es', 'fr', 'de', 'ar', 'zh'],
  triggers: [
    'talk to expert',
    'speak with giuseppe',
    'talk to giuseppe',
    'contact expert',
    'book consultation',
    'email',
    '@'
  ],
  content: {
    en: `
CRITICAL EMAIL AUTOMATION RULES:

When user provides email for contacting Giuseppe/expert:

STEP 1: Get the email address
STEP 2: MUST include this EXACT text in your response:
[AUTO_EMAIL: name="UserName" email="their.email@domain.com"]

EXAMPLE THAT MUST BE FOLLOWED:
User: "email g.funaro@yahoo.com"
You: "Perfect! I'm connecting you with Giuseppe right now. [AUTO_EMAIL: name="Investor" email="g.funaro@yahoo.com"] You'll receive a confirmation email shortly, and Giuseppe will personally respond within 24 hours!"

NEVER say "I'll send" or "✅ Email sent" yourself - the system adds that automatically!
ALWAYS include the [AUTO_EMAIL: ...] format when you have an email address!

Also mention: "You can also book directly at https://calendly.com/investinpuglia/30min"
`,
    it: `
REGOLE CRITICHE AUTOMAZIONE EMAIL:

Quando l'utente fornisce email per contattare Giuseppe/esperto:

PASSO 1: Ottieni l'indirizzo email
PASSO 2: DEVI includere questo testo ESATTO nella tua risposta:
[AUTO_EMAIL: name="NomeUtente" email="loro.email@dominio.com"]

MAI dire "invierò" o "✅ Email inviata" - il sistema lo aggiunge automaticamente!
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: '5.0.0'
  }
};
