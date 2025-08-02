// File: components/trullo/knowledge/core/expert-directory.ts
import { KnowledgeModule } from '../types';

export interface Expert {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  specialties: string[];
  languages: string[];
  title: string;
  isExternal: boolean;
}

export const EXPERT_DIRECTORY: Expert[] = [
  {
    id: 'giuseppe',
    name: 'Giuseppe Funaro',
    email: 'g.funaro@investinpuglia.eu',
    phone: '+39 351 400 1402',
    whatsapp: '+393514001402',
    specialties: ['investment', 'real estate', 'general', 'property', 'puglia', 'trulli', 'masseria', 'grants', 'pia turismo', 'tourism', 'agriturismo'],
    languages: ['en', 'it'],
    title: 'Investment Advisor',
    isExternal: false
  },
  {
    id: 'russo',
    name: 'Ing. Cataldo Russo',
    email: 'cataldorusso@msn.com',
    phone: '+39 347 533 0647',
    whatsapp: '+393475330647',
    specialties: ['engineering', 'construction', 'renovation', 'structural', 'technical', 'permits', 'building'],
    languages: ['it', 'en'],
    title: 'Chief Engineer',
    isExternal: true
  },
  {
    id: 'quarta',
    name: 'Antonio Quarta',
    email: 'a.quarta@studioquarta.it',
    phone: '+39 348 331 9772',
    whatsapp: '+393483319772',
    specialties: ['accounting', 'tax', 'finance', 'fiscal', 'business', 'company', 'vat', 'taxes'],
    languages: ['it', 'en'],
    title: 'Senior Accountant',
    isExternal: true
  }
];

export const expertRoutingKnowledge: KnowledgeModule = {
  id: 'expert-routing',
  category: 'core',
  priority: 10,
  languages: ['en', 'it'],
  triggers: [
    'expert', 'contact', 'speak', 'help', 'consult',
    'esperto', 'contattare', 'parlare', 'aiuto', 'consulenza',
    'ristrutturare', 'ristrutturazione', 'ingegnere', 'commercialista',
    'renovation', 'engineer', 'accountant', 'tax', 'engineering',
    'costruzione', 'permesso', 'strutturale', 'tecnico'
  ],
  content: {
    en: `
EXPERT ROUTING WITH PRIVACY PROTOCOL:

1. IDENTIFY the topic and route to expert
2. PRIVACY RULES:
   - INTERNAL (Giuseppe): Gets full customer details
   - EXTERNAL (Russo, Quarta): Gets ONLY the inquiry, NO customer info
   - Giuseppe is ALWAYS CC'd on all communications

3. For EXTERNAL experts, say:
   "I'll send your technical question to [Expert Name] while keeping your details private. Giuseppe will coordinate the response with you directly."

4. Contact options remain:
   📧 Email (privacy-protected for external)
   📱 WhatsApp (direct chat)
   📅 Schedule Call
`,
    it: `
Protocollo routing con privacy per esperti esterni.
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: '1.0.0'
  }
};


