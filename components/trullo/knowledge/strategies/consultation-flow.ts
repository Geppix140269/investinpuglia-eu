// File: components/trullo/knowledge/strategies/consultation-flow.ts
import { KnowledgeModule } from '../types';

export const consultationFlowStrategy: KnowledgeModule = {
  id: 'consultation-flow-strategy',
  category: 'strategy',
  priority: 15,
  languages: ['en', 'it'],
  triggers: [
    'book consultation', 'free consultation', 'schedule call', 'speak with expert',
    'consultation', 'call with giuseppe', 'expert advice', 'schedule meeting',
    'book a call', 'free call', '30 minute', 'thirty minute', 'calendly'
  ],
  content: {
    en: `
CONSULTATION FLOW STRATEGY:

Core Purpose: Guide users through a qualification questionnaire before booking their FREE 30-minute consultation via Calendly.

CONSULTATION WORKFLOW:

1. INITIAL ENGAGEMENT:
When user mentions consultation/booking:
"Excellent! I'd love to help you schedule your FREE 30-minute consultation with our expert team! 🌟

**What You'll Get:**
✅ Personalized grant eligibility assessment (up to €2M available)
✅ Investment strategy tailored to your goals
✅ Clear roadmap for your Puglia property investment
✅ Direct access to our senior advisors

Before we schedule your call, I'll need to ask you a few quick questions to ensure we maximize the value of your consultation time.

Ready to start? It only takes 3-5 minutes! 🚀"

2. QUALIFICATION QUESTIONNAIRE:

Question 1 - Investment Timeline:
"First, when are you planning to make your investment in Puglia?
a) Within 3 months
b) 3-6 months
c) 6-12 months
d) Just exploring options"

Question 2 - Investment Budget:
"What's your approximate total investment budget (property + renovation)?
a) €200,000 - €500,000
b) €500,000 - €1,000,000
c) €1,000,000 - €2,000,000
d) Above €2,000,000
e) Still determining budget"

Question 3 - Property Type:
"What type of property investment interests you most?
a) Luxury villa for personal use/rental
b) Boutique hotel or B&B
c) Traditional trullo or masseria restoration
d) Commercial/hospitality property
e) Mixed-use development"

Question 4 - Grant Interest:
"Are you interested in EU grant funding (Mini PIA can cover 30-50% of costs)?
a) Yes, this is a priority
b) Yes, but need more information
c) Maybe, depends on requirements
d) No, self-funding entirely"

Question 5 - Previous Experience:
"Do you have experience with property investment or renovation projects?
a) Yes, extensive experience
b) Some experience
c) First-time investor
d) Experience in other countries but not Italy"

Question 6 - Location Preference:
"Do you have a preferred area in Puglia?
a) Coastal areas (Polignano, Monopoli, etc.)
b) Valle d'Itria (Ostuni, Cisternino, etc.)
c) Salento (Lecce, Gallipoli, etc.)
d) Open to recommendations
e) Specific location: [let them specify]"

3. QUALIFICATION COMPLETE - CALENDLY REDIRECT:

For QUALIFIED leads (budget €200K+, timeline within 12 months):
"Perfect! Based on your responses, you're an excellent candidate for our grant programs! 🎉

**Your Investment Profile:**
✅ Eligible for Mini PIA grants (30-50% funding)
✅ Strong potential for [specific benefit based on answers]
✅ Timeline aligns with current grant windows

**Next Step: Schedule Your FREE Consultation**
I'm now connecting you to our calendar system where you can choose your preferred time slot.

[TRIGGER CALENDLY POPUP or REDIRECT]
📅 Click here to schedule: https://calendly.com/investinpuglia/30min

**What Happens Next:**
1. Choose your preferred date/time
2. Receive confirmation with meeting link
3. We'll send you a preparation guide
4. Join your 30-minute expert consultation

Looking forward to helping you unlock your Puglia investment opportunity!"

For EXPLORATORY leads (longer timeline or unclear budget):
"Thank you for sharing your investment interests! 🏠

While you're still in the exploration phase, I'd recommend:

**Immediate Actions:**
📧 Join our investor newsletter for market updates
📱 Download our Free Investment Guide
🎯 Review our portfolio of success stories

**When You're Ready:**
Your FREE consultation will be available whenever you're prepared to move forward. In the meantime, feel free to ask me any questions about:
- Property types and locations
- Grant programs overview
- Investment process in Italy
- Success stories from other investors

Would you like me to add you to our newsletter for exclusive investment opportunities?"

4. HANDLING OBJECTIONS:

"Why do I need to answer questions first?"
"Great question! These brief questions help us:
✅ Match you with the right specialist
✅ Prepare relevant grant information for YOUR situation
✅ Maximize the value of your 30-minute consultation
✅ Provide specific property recommendations

It only takes 3 minutes and ensures you get actionable advice rather than generic information!"

"Can I just book directly?"
"Of course! If you prefer to book immediately:
📅 Direct booking: https://calendly.com/investinpuglia/30min

However, answering these quick questions first means our team can prepare personalized recommendations specifically for your situation - making your consultation much more valuable!"

5. POST-BOOKING CONFIRMATION:

"Excellent! Your consultation is being scheduled! 📅

**You'll receive:**
📧 Email confirmation within 5 minutes
📋 Preparation guide to maximize your consultation
🔗 Meeting link (Zoom/Phone options available)

**To Prepare:**
• Have any specific properties in mind? Note their addresses
• Gather questions about grants and investment process
• Consider your investment timeline and goals

Any questions before your consultation?"

IMPLEMENTATION RULES:
- ALWAYS collect questionnaire data before Calendly
- Store responses for consultant preparation
- Maintain excitement and momentum throughout
- Position questionnaire as value-add, not barrier
- Provide immediate value even if not qualified
- Use urgency sparingly but effectively
- Track conversion at each step
`,
    it: `
STRATEGIA FLUSSO CONSULENZA:

Scopo: Guidare gli utenti attraverso un questionario di qualificazione prima di prenotare la consulenza GRATUITA di 30 minuti.

FLUSSO DI LAVORO:

1. Coinvolgimento iniziale per consulenza
2. Questionario di qualificazione (6 domande)
3. Reindirizzamento a Calendly per utenti qualificati
4. Follow-up e preparazione

Mantenere sempre entusiasmo e professionalità nel guidare attraverso il processo.
`
  },
  metadata: {
    lastUpdated: '2025-01-09',
    author: 'System',
    version: '1.0.0'
  }
};