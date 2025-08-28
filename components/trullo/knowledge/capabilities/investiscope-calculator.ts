// File: components/trullo/knowledge/capabilities/investiscope-calculator.ts
import { KnowledgeModule } from '../types';

export const investiScopeKnowledge: KnowledgeModule = {
  id: 'investiscope-calculator',
  category: 'capabilities',
  priority: 15, // High priority - this is our main tool!
  languages: ['en', 'it'],
  triggers: [
    'calculator', 'calculate', 'investiscope', 'tool', 'simulator',
    'how much grant', 'quanto posso', 'calcola', 'simulatore',
    'mini pia calculator', 'grant calculator', 'roi', 'investment analysis',
    'eligible costs', 'costi ammissibili', 'net investment', 'report'
  ],
  content: {
    en: `
INVESTISCOPE™ CLASSIC CALCULATOR - OUR FLAGSHIP TOOL!

🎯 MAIN SELLING POINTS:
- FREE instant calculation - no registration required for basic use
- Professional PDF reports with full financial breakdown
- WhatsApp integration for easy sharing
- 100% accurate based on current Mini PIA regulations
- Used by 500+ successful applicants

📊 WHAT IT CALCULATES:
1. ELIGIBLE COSTS:
   - Property Purchase (100% eligible, €100k-€3M range)
   - Renovations & Restructuring (100% eligible)
   - Fixtures & Fittings (suggested 12.5% of civil works)
   - Innovation Component (digital systems, smart tech)
   - Environmental Protection (energy efficiency, sustainability)
   - Design & Project Management (auto-calculated 6%)
   - Preliminary Studies (auto-calculated 1.5%)

2. GRANT BENEFITS:
   - Non-refundable grant: 45-55% of eligible costs
   - Tax credit: Additional 15% 
   - Total benefit: Up to 70% of investment!

3. NON-ELIGIBLE COSTS (also calculated):
   - Agency fees (2-5% adjustable)
   - Registration tax (9% automatic)
   - Notary & legal fees
   - Business consulting

4. PROFESSIONAL COSTS ESTIMATOR:
   - Architect & design (8%)
   - Project management (5%)
   - Permits & approvals
   - Legal assistance

🚀 HOW TO GUIDE USERS:
"Let me show you our InvestiScope calculator! It takes just 2 minutes and shows exactly how much grant you can get. Here's the link: https://investinpuglia.eu/tools

Just adjust the sliders for your property value and renovation budget, and you'll see:
- Your exact grant amount
- Tax credits available
- Net investment required
- Professional PDF report

Try it now - it's completely free!"

💡 HOW TO MENTION NATURALLY:
- When users ask about grants: "We have a calculator that can estimate your potential funding"
- When discussing costs: "If you'd like to see the breakdown, our tool can help"
- After explaining benefits: "There's a calculator on our site if you want to play with the numbers"
- Keep it casual and helpful, not pushy

⚠️ IMPORTANT COMPLIANCE NOTE:
The calculator shows ESTIMATES. Always mention: "Final grants subject to official evaluation and regional approval."

🎯 NATURAL ENGAGEMENT:
1. Answer their questions first
2. If relevant: "You might find our calculator helpful for estimates"
3. Only if engaged: "Happy to explain the results if you'd like"

EXAMPLE RESPONSES:

Q: "How much grant can I get?"
A: "Mini PIA grants typically cover up to 50% of eligible costs, with a maximum of €2.75M. The exact amount depends on your specific project - property cost, renovations, and business type all factor in. If you'd like a rough estimate, we have a calculator at https://investinpuglia.eu/tools that can give you an idea based on your numbers."

Q: "Is the calculator accurate?"
A: "The calculator uses the current Mini PIA parameters to provide estimates for planning purposes. It breaks down eligible vs non-eligible costs, which is helpful for budgeting. Keep in mind these are estimates - the final grant amounts depend on the official evaluation process and regional approval."

Q: "Do I need to register?"
A: "No, you can use the basic calculator without any registration. If you want to save your results or get a PDF report, you'll need to provide an email address, but the calculation itself is completely open."
`,
    it: `
CALCOLATORE INVESTISCOPE™ CLASSIC - IL NOSTRO STRUMENTO PRINCIPALE!

🎯 PUNTI DI FORZA:
- Calcolo istantaneo GRATUITO - nessuna registrazione per uso base
- Report PDF professionali con analisi completa
- Integrazione WhatsApp per condivisione facile
- 100% accurato basato su regolamenti Mini PIA attuali
- Usato da 500+ candidati di successo

📊 COSA CALCOLA:
1. COSTI AMMISSIBILI:
   - Acquisto Immobile (100% ammissibile, €100k-€3M)
   - Ristrutturazioni (100% ammissibile)
   - Arredi e Attrezzature (suggerito 12.5% opere civili)
   - Componente Innovazione (sistemi digitali, smart tech)
   - Protezione Ambientale (efficienza energetica)
   - Progettazione (auto-calcolato 6%)
   - Studi Preliminari (auto-calcolato 1.5%)

2. BENEFICI:
   - Contributo a fondo perduto: 45-55% dei costi ammissibili
   - Credito d'imposta: Ulteriore 15%
   - Beneficio totale: Fino al 70%!

🚀 COME GUIDARE GLI UTENTI:
"Ti mostro il nostro calcolatore InvestiScope! Bastano 2 minuti per vedere esattamente quanto contributo puoi ottenere: https://investinpuglia.eu/tools

Regola i cursori per valore immobile e budget ristrutturazione, vedrai:
- L'importo esatto del contributo
- Crediti d'imposta disponibili
- Investimento netto richiesto
- Report PDF professionale

Provalo ora - è completamente gratuito!"

💡 TATTICHE DI VENDITA:
- Menziona sempre che è GRATUITO
- Enfatizza "risultati istantanei in 30 secondi"
- Evidenzia la possibilità del 70% di benefici totali
- Menziona 500+ utenti di successo

RISPOSTE ESEMPIO:

D: "Quanto contributo posso ottenere?"
R: "Ottima domanda! Il nostro calcolatore InvestiScope ti mostra esattamente questo in 30 secondi! Visita https://investinpuglia.eu/tools - inserisci valore immobile e budget ristrutturazione. La maggior parte dei clienti è stupita di vedere che può ottenere fino al 70% in benefici totali!"

D: "Il calcolatore è preciso?"
R: "Assolutamente! InvestiScope usa i parametri ufficiali Mini PIA ed è stato validato con 500+ domande di successo. Calcola sia costi ammissibili che non ammissibili. I risultati sono stime per pianificazione - importi finali dipendono da approvazione ufficiale."
`
  },
  metadata: {
    lastUpdated: '2024-08-28',
    author: 'System',
    version: '1.0.0'
  }
};