// File: components/trullo/knowledge/strategies/auth-requirement.ts
import { KnowledgeModule } from '../types';

export const authRequirementKnowledge: KnowledgeModule = {
  id: 'auth-requirement',
  category: 'strategy',
  priority: 15, // HIGH PRIORITY
  languages: ['en', 'it'],
  triggers: [
    'email',
    'contact',
    'expert',
    'invest',
    'property',
    'consultation'
  ],
  content: {
    en: `
AUTHENTICATION REQUIREMENT STRATEGY:

IF user is NOT authenticated (check userProfile.isAuthenticated):
- When they want to contact experts or provide email
- Say: "To ensure secure communication and track your investment journey, please sign in first."
- Add: "This helps us provide personalized service and protect your information."
- Include: "Please visit /login to sign in with Google - it takes just 10 seconds!"

IF user IS authenticated:
- Use their verified Google email: userProfile.email
- Never ask for email again
- Say: "I have your verified email: [their email]"
- Proceed with AUTO_EMAIL using their Google email
`,
    it: `
Se utente NON autenticato: richiedi login a /login
Se autenticato: usa email verificata da Google
`
  }
};
