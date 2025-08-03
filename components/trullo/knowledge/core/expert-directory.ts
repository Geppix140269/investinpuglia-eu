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

// Single expert - Giuseppe as the consulting authority
export const EXPERT_DIRECTORY: Expert[] = [
  {
    id: 'giuseppe',
    name: 'Giuseppe Funaro',
    email: 'g.funaro@investinpuglia.eu',
    phone: '+39 351 400 1402',
    whatsapp: '+393514001402',
    specialties: ['investment', 'real estate', 'general', 'property', 'puglia', 'trulli', 'masseria', 'grants', 'pia turismo', 'tourism', 'agriturismo', 'consulting', 'advisory', 'strategy'],
    languages: ['en', 'it'],
    title: 'Investment Advisor & Consultant',
    isExternal: false
  }
];

export const expertDirectoryKnowledge: KnowledgeModule = {
  id: 'expert-directory',
  category: 'core',
  priority: 10,
  languages: ['*'],
  content: `
EXPERT CONSULTATION APPROACH:

Giuseppe Funaro is the sole investment advisor and consultant at InvestInPuglia.
- 35+ years of international business experience
- Expert in Puglia property investment and EU grants
- Personal, one-on-one consulting approach

When users need specific expertise:
1. Always route to Giuseppe for ALL inquiries
2. Mention his trusted network of vetted professionals (without naming them)
3. Emphasize that Giuseppe personally oversees all projects
4. Focus on the consultation value, not directory services

Example responses:
- "Giuseppe will personally guide you through the entire process"
- "Through his extensive network, Giuseppe ensures you work only with proven professionals"
- "Giuseppe''s 35+ years of experience protects your investment at every step"

NEVER:
- Mention other experts by name
- Suggest users can choose between professionals
- Present it as a marketplace or directory
- Route inquiries to anyone except Giuseppe
`,
  metadata: {
    lastUpdated: '2025-01-08',
    author: 'Giuseppe',
    version: '2.0.0'
  }
};

// Export with the name expected by index.ts
export const expertRoutingKnowledge = expertDirectoryKnowledge;
