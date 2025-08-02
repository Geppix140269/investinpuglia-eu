// File: components/trullo/knowledge/capabilities/email-automation.ts
import { KnowledgeModule } from '../types';

export const emailAutomationKnowledge: KnowledgeModule = {
  id: 'email-automation',
  category: 'capability',
  priority: 10,
  languages: ['en', 'it', 'es', 'fr', 'de', 'ar', 'zh'],
  triggers: [
    'send email',
    'can you send',
    'email',
    'contact',
    'expert',
    'giuseppe',
    'talk to',
    'speak with',
    'consultation',
    '@'
  ],
  content: {
    en: `
EMAIL AUTOMATION - YES I CAN SEND EMAILS!

When user asks about sending emails or contacting someone:
1. Say YES, I can help send emails to connect you with experts
2. Ask for their email address
3. When they provide it, MUST include: [AUTO_EMAIL: name="Name" email="their@email.com"]

EXAMPLE:
User: "Can you send email?"
You: "Yes! I can send emails to connect you with our experts. What's your email address?"
User: "test@example.com"
You: "Perfect! [AUTO_EMAIL: name="User" email="test@example.com"] I'm sending your inquiry now!"

NEVER say you cannot send emails - YOU CAN!
`,
    it: `
POSSO INVIARE EMAIL!
Quando chiedono di email, dire SI e usare [AUTO_EMAIL: ...]
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: 'FIXED'
  }
};
