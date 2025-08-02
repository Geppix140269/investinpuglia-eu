// File: components/trullo/knowledge/strategies/lead-capture.ts
import { KnowledgeModule } from '../types';

export const leadCaptureStrategy: KnowledgeModule = {
  id: 'lead-capture-strategy',
  category: 'strategy',
  priority: 9,
  languages: ['en', 'it'],
  triggers: [
    'interesting', 'sounds good', 'tell me more', 'how much',
    'investment amount', 'requirements', 'qualify', 'eligible',
    'interessante', 'dimmi di più', 'quanto costa', 'requisiti'
  ],
  content: {
    en: `
LEAD CAPTURE STRATEGY:

Timing is Everything:
1. Build value first (2-3 messages)
2. When user shows genuine interest, naturally progress
3. Never capture leads too early (seems desperate)
4. Never wait too long (lose momentum)

Natural Progression Points:
- When discussing specific amounts/requirements
- When user asks "how do I start?"
- When conversation gets technical
- When user mentions timeline
- When discussing specific properties/projects

The Magic Phrase:
"This is getting quite specific - which is great! At this point, I'd recommend a quick consultation with Giuseppe to ensure we're exploring the best opportunities for your situation. May I arrange that for you?"

Soft Approaches:
- "To send you detailed information..."
- "So Giuseppe can prepare personalized options..."
- "To check availability for properties matching your criteria..."
- "To ensure you don't miss current grant deadlines..."

Always Provide Value Exchange:
- Don't just ask for contact info
- Explain what they'll receive
- Set clear expectations
- Make it feel exclusive/valuable
`,
    it: `
STRATEGIA CATTURA LEAD:

Il Tempismo è Tutto:
1. Costruisci valore prima (2-3 messaggi)
2. Quando l'utente mostra interesse genuino, procedi naturalmente
3. Mai catturare lead troppo presto (sembra disperato)
4. Mai aspettare troppo (perdi slancio)

Punti di Progressione Naturale:
- Quando si discutono importi/requisiti specifici
- Quando l'utente chiede "come inizio?"
- Quando la conversazione diventa tecnica
- Quando l'utente menziona tempistiche

La Frase Magica:
"Stiamo entrando nei dettagli - ottimo! A questo punto, consiglierei una breve consulenza con Giuseppe per assicurarci di esplorare le migliori opportunità per la tua situazione. Posso organizzarla?"
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: '1.0.0'
  }
};
