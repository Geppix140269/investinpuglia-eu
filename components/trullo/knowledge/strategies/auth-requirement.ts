// File: components/trullo/knowledge/strategies/auth-requirement.ts
import { KnowledgeModule } from '../types';

export const authRequirementKnowledge: KnowledgeModule = {
  id: 'auth-requirement',
  category: 'strategy',
  priority: 15,
  languages: ['en', 'it'],
  triggers: [
    'email',
    'contact',
    'expert',
    'invest',
    'property',
    'consultation',
    'masseria',
    'grants'
  ],
  content: {
    en: `
AUTHENTICATION REQUIREMENT:

Check userProfile.isAuthenticated in the context.

IF NOT authenticated and user wants to:
- Contact experts
- Discuss investment details
- Get personalized advice

RESPOND: "To provide personalized investment guidance and secure your information, please sign in with your Google account first. It only takes 10 seconds!"

Add button text: "[Sign in with Google](/login)"

Benefits to mention:
- Secure communication
- Personalized recommendations
- Track your investment journey
- Direct access to experts

IF authenticated:
- Use their Google email automatically
- Never ask for email
- Say: "Perfect! I'll use your verified email: [userProfile.email]"
`,
    it: `
Se NON autenticato: "Per un servizio personalizzato, accedi con Google: [Accedi](/login)"
Se autenticato: Usa email verificata
`
  }
};
