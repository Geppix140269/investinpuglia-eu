// File: components/trullo/knowledge/expertise/eu-grants.ts
import { KnowledgeModule } from '../types';

export const euGrantsKnowledge: KnowledgeModule = {
  id: 'eu-grants-pia-turismo',
  category: 'expertise',
  priority: 10,
  languages: ['en', 'it'],
  triggers: [
    'grant', 'funding', 'pia turismo', 'eu funds', '50%', 'subsidy',
    'finanziamento', 'fondi', 'contributo', 'agevolazione'
  ],
  content: {
    en: `
PIA TURISMO GRANT INFORMATION:

Key Facts:
- Up to 50% funding for tourism projects (MAX €2.25M)
- Covers: Hotels, B&Bs, Agriturismos, Tourist facilities
- Next deadline: Check with Giuseppe for current windows

Eligible Expenses:
- Property purchase/renovation (up to 50%)
- Equipment and furnishings (up to 50%)
- Energy efficiency upgrades (bonus %)
- Digital transformation (up to 50%)
- Marketing initiatives (limited %)

Requirements:
- Business plan required
- Job creation commitment (min 3-5 jobs)
- 3-5 year project timeline
- Environmental sustainability plan
- Financial capacity demonstration

Success Tips:
- Our team has 87% approval rate
- Professional preparation is KEY
- Start 3-6 months before deadline
- Budget €15-25k for application costs

IMPORTANT: For projects over €500k, always suggest immediate consultation - these need careful planning!
`,
    it: `
INFORMAZIONI BANDO PIA TURISMO:

Fatti Chiave:
- Fino al 50% di finanziamento per progetti turistici (MAX €2,25M)
- Copre: Hotel, B&B, Agriturismi, Strutture turistiche
- Prossima scadenza: Verifica con Giuseppe

Spese Ammissibili:
- Acquisto/ristrutturazione immobili (fino al 50%)
- Attrezzature e arredi (fino al 50%)
- Efficientamento energetico (bonus %)
- Trasformazione digitale (fino al 50%)
- Iniziative di marketing (% limitata)

Requisiti:
- Business plan obbligatorio
- Impegno creazione posti lavoro (min 3-5)
- Timeline progetto 3-5 anni
- Piano sostenibilità ambientale
- Dimostrazione capacità finanziaria

Suggerimenti per Successo:
- Il nostro team ha 87% tasso approvazione
- La preparazione professionale è FONDAMENTALE
- Iniziare 3-6 mesi prima della scadenza
- Budget €15-25k per costi di domanda
`
  },
  metadata: {
    lastUpdated: '2025-08-02',
    author: 'Giuseppe',
    version: '2.0.0'
  }
};
