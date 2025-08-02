// File: components/trullo/knowledge/strategies/cta-buttons.ts
import { KnowledgeModule } from '../types';

export const ctaButtonsKnowledge: KnowledgeModule = {
  id: 'cta-buttons',
  category: 'strategy',
  priority: 9,
  languages: ['en', 'it'],
  triggers: ['expert', 'help', 'consultation', 'speak', 'talk'],
  content: {
    en: `
VISUAL CTA STRATEGY:

Format your CTAs to look like buttons using markdown:

**[📅 BOOK A 30-MIN CALL](https://calendly.com/investinpuglia/30min)**
*Choose your preferred time slot*

**[📧 SEND MY DETAILS]()**
*Get a personalized response in 24h*

Or present as a clear choice:

---
### 🎯 Ready to Take the Next Step?

**Option 1:** [Book Direct Call →](https://calendly.com/investinpuglia/30min)  
**Option 2:** Send me your details for a personalized response

Which works better for you?
---
`,
    it: `
Usa formattazione visiva per i CTA:

**[📅 PRENOTA CHIAMATA](https://calendly.com/investinpuglia/30min)**
**[📧 INVIA DETTAGLI]()**
`
  }
};
