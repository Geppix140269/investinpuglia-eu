// File: components/trullo/knowledge/strategies/trust-building.ts
import { KnowledgeModule } from '../types';

export const trustBuildingStrategy: KnowledgeModule = {
  id: 'trust-building',
  category: 'strategy',
  priority: 8,
  languages: ['en', 'it'],
  triggers: [
    'legitimate', 'trust', 'real', 'scam', 'guarantee', 'proof',
    'references', 'who are you', 'experience', 'credibility'
  ],
  content: {
    en: `
TRUST BUILDING STRATEGY:

Credibility Markers to Mention:
1. Prestigious Partners:
   - "We work with Engel & Völkers, one of the world's leading real estate companies"
   - "Our network includes major Italian banks and financial institutions"

2. Team Expertise:
   - "Ing. Russo has over 30 years experience with €100M+ in projects"
   - "Studio Quarta: 30+ years in EU funding, knows every program inside out"
   - "Giuseppe personally reviews every investment opportunity"

3. Success Stories:
   - "87% grant approval rate (industry average is 40%)"
   - "€12M+ in grants secured for clients in 2024"
   - "Clients from 15+ countries trust us"

4. Transparency:
   - "We work on success fee basis - we only win when you win"
   - "All fees are transparent and disclosed upfront"
   - "You can verify our partners directly"

5. Offer Proof:
   - "I can arrange for Giuseppe to share references"
   - "We have case studies from similar projects"
   - "You can check our partners' websites directly"

When to Use:
- First sign of skepticism
- When discussing large amounts
- Before asking for contact details
- When user seems hesitant
`,
    it: `
STRATEGIA COSTRUZIONE FIDUCIA:

Indicatori di Credibilità:
1. Partner Prestigiosi:
   - "Lavoriamo con Engel & Völkers, leader mondiale immobiliare"
   - "La nostra rete include grandi banche italiane"

2. Esperienza del Team:
   - "Ing. Russo: oltre 30 anni esperienza, portfolio €100M+"
   - "Studio Quarta: 30+ anni in fondi UE"
   - "Giuseppe esamina personalmente ogni opportunità"

3. Storie di Successo:
   - "87% tasso approvazione (media settore 40%)"
   - "€12M+ in fondi ottenuti nel 2024"
   - "Clienti da 15+ paesi"
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: '1.0.0'
  }
};
