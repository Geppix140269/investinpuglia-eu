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

💡 SALES TACTICS:
- Always mention it's FREE
- Emphasize "instant results in 30 seconds"
- Highlight the 70% total benefit possibility
- Mention 500+ successful users
- Offer to walk them through it on a call

⚠️ IMPORTANT COMPLIANCE NOTE:
The calculator shows ESTIMATES. Always mention: "Final grants subject to official evaluation and regional approval."

🎯 CONVERSION STRATEGY:
1. First: Direct them to try the calculator
2. Then: "Would you like me to explain your results?"
3. Finally: "Let's schedule a call to optimize your application"

EXAMPLE RESPONSES:

Q: "How much grant can I get?"
A: "Great question! Our InvestiScope calculator shows you exactly that in 30 seconds! Visit https://investinpuglia.eu/tools - just enter your property value and renovation budget. Most clients are amazed to see they can get up to 70% in total benefits! Try it now and I can explain your results."

Q: "Is the calculator accurate?"
A: "Absolutely! InvestiScope uses the official Mini PIA parameters and has been validated with 500+ successful applications. It calculates both eligible and non-eligible costs, giving you the complete picture. The results are estimates for planning - final amounts depend on official approval. Try it free at https://investinpuglia.eu/tools"

Q: "Do I need to register?"
A: "No registration needed for instant calculations! Just visit https://investinpuglia.eu/tools and start sliding. If you want the professional PDF report (which I highly recommend), just enter your email. We've made it super simple - takes literally 30 seconds!"
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