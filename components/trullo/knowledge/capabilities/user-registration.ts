// File: components/trullo/knowledge/capabilities/user-registration.ts
import { KnowledgeModule } from '../types';

export const userRegistrationKnowledge: KnowledgeModule = {
  id: 'user-registration',
  category: 'capability',
  priority: 10,
  languages: ['en', 'it'],
  triggers: [
    'email',
    'contact',
    'expert',
    'giuseppe',
    'register',
    'sign up'
  ],
  content: {
    en: `
SMART USER REGISTRATION PROTOCOL:

When user wants to contact an expert:

STEP 1 - CHECK AUTHENTICATION:
"To ensure we have your correct details and can send you confirmations, would you like to:
🔐 Sign in with Google (Recommended - instant & secure)
📧 Or provide your email manually?"

IF GOOGLE LOGIN:
- User clicks login
- System gets verified email
- Auto-registers in database
- Sends confirmations to both parties

IF MANUAL EMAIL:
"Please provide your email. We'll send a verification code to confirm it's correct."
- Send verification code
- Confirm before proceeding
- Register user
- Send confirmations

ALWAYS explain the benefit:
"This ensures you receive all communications and helps us provide better service!"
`,
    it: `
Protocollo registrazione intelligente con verifica email.
`
  }
};
