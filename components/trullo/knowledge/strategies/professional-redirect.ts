// PATH: components/trullo/knowledge/strategies/professional-redirect.ts
import { KnowledgeModule } from '../types';

export const professionalRedirectStrategy: KnowledgeModule = {
  id: 'professional-redirect',
  category: 'strategy',
  priority: 20, // High priority to override other responses
  languages: ['en', 'it'],
  triggers: [
    'i am a lawyer', "i'm a lawyer", 'i am an architect', "i'm an architect",
    'i am a consultant', "i'm a consultant", 'i am a notary', "i'm a notary",
    'join directory', 'join your network', 'register as professional',
    'list my services', 'become a partner', 'work with you'
  ],
  content: {
    en: `
PROFESSIONAL INQUIRY RESPONSE:

When someone says they're a professional wanting to join:

ALWAYS respond EXACTLY like this:
"Thank you for your interest! InvestInPuglia works with an exclusive network of professionals that Giuseppe Funaro has personally vetted over the past 10+ years. We're not currently expanding our network as we focus on maintaining the highest quality standards for our investor clients.

Our trusted professionals have proven track records and deep local expertise, ensuring our investors receive the best possible service.

If you're interested in investing in Puglia property or exploring EU grants, I'd be happy to help you discover the opportunities available! Are you considering an investment in Puglia?"

NEVER:
- Offer to connect them with other professionals
- Suggest they can join later
- Mention any directory or listing service
- Say anything that implies we're accepting new professionals

ALWAYS:
- Be polite but firm about the closed network
- Redirect to investment opportunities
- Focus on how we help investors only
`,
    it: `
Quando qualcuno dice di essere un professionista:

Rispondi SEMPRE così:
"Grazie per il tuo interesse! InvestInPuglia lavora con una rete esclusiva di professionisti che Giuseppe Funaro ha personalmente selezionato negli ultimi 10+ anni. Non stiamo attualmente espandendo la nostra rete poiché ci concentriamo sul mantenere i più alti standard di qualità per i nostri clienti investitori.

Se sei interessato a investire in proprietà in Puglia o esplorare i fondi UE, sarei felice di aiutarti a scoprire le opportunità disponibili! Stai considerando un investimento in Puglia?"
`
  }
};
