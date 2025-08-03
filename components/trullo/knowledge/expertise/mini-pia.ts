// components/trullo/knowledge/expertise/mini-pia.ts

import { KnowledgeModule } from '../../types';

export const miniPIAKnowledge: KnowledgeModule = {
  id: 'mini-pia',
  title: 'Mini PIA (Pacchetti Integrati d\'Agevolazione)',
  category: 'expertise',
  enabled: true,
  content: {
    overview: `
      Mini PIA is Puglia's flagship business incentive program offering substantial grants for micro and small enterprises.
      
      Key Facts:
      • 30-35% non-repayable grants for investments
      • Up to €5 million total project funding
      • Covers renovation, equipment, innovation, training
      • Perfect for trullo tourism projects
      • Rolling applications - apply anytime until funds exhausted
    `,
    
    programStructure: {
      description: 'Mini PIA funds integrated investment packages combining:',
      components: [
        'Productive investments (mandatory) - up to 90% of project',
        'Innovation activities - up to €1 million',
        'Staff training - up to €500,000',
        'Environmental protection - up to €3 million',
        'Consulting and internationalization - up to €500,000 each'
      ]
    },
    
    financialBenefits: {
      microAndSmallEnterprises: {
        productiveInvestments: '45% grant + 20% financing support',
        innovation: '30% grant + 20% financing support',
        training: '50% grant + 20% financing support',
        environmental: '45% grant + 20% financing support',
        consulting: '30% grant + 20% financing support'
      },
      totalSupport: 'Up to 65% of eligible costs through combined grants and financing benefits',
      minimumInvestment: '€30,000',
      maximumInvestment: '€5,000,000'
    },
    
    eligibility: {
      businessTypes: [
        'Micro enterprises (less than 10 employees)',
        'Small enterprises (less than 50 employees)',
        'Self-employed professionals with VAT registration',
        'Business networks/consortiums (minimum 5 companies)'
      ],
      requirements: [
        'Legal headquarters or operational unit in Puglia',
        'Not in financial difficulty',
        'Up-to-date with taxes and social contributions',
        'Registered in Chamber of Commerce'
      ],
      eligibleSectors: 'Tourism, hospitality, services, manufacturing, digital, creative industries',
      excludedSectors: 'Primary agriculture, fishing, gambling, export-focused activities'
    },
    
    eligibleExpenses: {
      productiveInvestments: [
        'Building purchase and renovation',
        'New machinery and equipment',
        'Furniture and furnishings',
        'Software and digital systems',
        'Technical design and project management (up to 10%)'
      ],
      innovationActivities: [
        'Technology consulting',
        'Digital transformation services',
        'Process optimization',
        'Sustainability consulting'
      ],
      training: [
        'Digital skills development',
        'Green transition training',
        'Tourism and hospitality skills',
        'Language training for internationalization'
      ]
    },
    
    applicationProcess: {
      steps: [
        '1. Register on Sistema Puglia portal',
        '2. Prepare business plan and documentation',
        '3. Submit application online (generates CUP code)',
        '4. Bank evaluates and approves financing (6 months)',
        '5. Puglia Sviluppo reviews application',
        '6. Receive approval and start project',
        '7. Complete investment within 24 months',
        '8. Submit completion documentation',
        '9. Receive grant payment'
      ],
      keyDocuments: [
        'Detailed business plan',
        'Financial projections (3 years)',
        'Property ownership/lease documents',
        'Technical project descriptions',
        'Bank financing pre-approval'
      ],
      timeline: 'Evaluation typically 2-4 months from submission'
    },
    
    trulloSpecificBenefits: {
      description: 'Mini PIA is ideal for trullo renovation projects when structured as tourism businesses:',
      advantages: [
        'Covers complete renovation costs at 45% grant rate',
        'Funds furniture, equipment, and technology',
        'Supports website development and digital marketing',
        'Includes staff training for hospitality',
        'No collateral required for grant portion'
      ],
      typicalProjects: [
        'Trullo conversion to luxury B&B',
        'Agriturismo development',
        'Boutique hotel creation',
        'Restaurant/hospitality venue',
        'Wellness retreat center'
      ]
    },
    
    specialPrograms: {
      miniPIATurismo: {
        description: 'Dedicated tourism sector version with simplified procedures',
        benefits: 'Same grant rates but faster processing for tourism projects',
        openingDate: 'Applications accepted from May 22, 2024'
      },
      miniPIATaranto: {
        description: 'Special program for Taranto Province with EU Just Transition Fund',
        benefits: [
          'Higher grant rates (up to 70%)',
          'Additional €40 million budget',
          'Priority for green transition projects',
          'Support for economic diversification'
        ],
        eligibility: 'Projects must be located in Taranto Province'
      }
    },
    
    combinationOpportunities: {
      description: 'Mini PIA can be combined with:',
      options: [
        'Tax credits (credito d\'imposta Sud)',
        'Regional tourism incentives',
        'EU funds (where compatible)',
        'Bank financing at favorable rates'
      ],
      restrictions: 'Cannot combine with other grants for same expenses'
    },
    
    successFactors: {
      tips: [
        'Prepare comprehensive business plan showing job creation',
        'Emphasize innovation and digital aspects',
        'Include environmental sustainability measures',
        'Partner with approved bank early in process',
        'Consider using specialized consultants',
        'Structure tourism accommodation as "albergo diffuso" for better approval chances',
        'Include CRM systems and digital marketing in innovation plans',
        'Demonstrate energy efficiency improvements (Class B or higher)',
        'Show clear destagionalization strategies'
      ],
      commonMistakes: [
        'Underestimating documentation requirements',
        'Starting work before approval',
        'Inadequate financial projections',
        'Missing application windows',
        'Not properly documenting property availability',
        'Insufficient detail on sustainability measures'
      ]
    },
    
    realWorldExample: {
      description: 'Example of successful Mini PIA Turismo application',
      projectType: 'Albergo diffuso renovation and expansion',
      location: 'Historic city center',
      totalInvestment: '€2,337,846',
      grantApproved: '€1,157,234 (49.5% of investment)',
      breakdown: {
        directGrant: '€812,402 (34.8%)',
        bonusForJobCreation: '€111,048 (4.7%)',
        interestSubsidy: '€233,785 (10%)'
      },
      keySuccessFactors: [
        'Structured as tourism business (albergo diffuso)',
        'Combined property purchase with renovation',
        'Included digital innovation (CRM system)',
        'Created 2 new jobs',
        'Achieved energy efficiency class B',
        'Professional technical documentation'
      ],
      timeline: {
        applicationSubmission: 'August',
        bankApproval: 'October',
        finalApproval: 'July (following year)',
        totalProcessTime: '11 months'
      }
    },
    
    currentStatus: {
      availability: 'OPEN - Applications accepted on rolling basis',
      budget: '€40 million for 2024/2025',
      updates: [
        'Expanded eligible sectors in February 2024',
        'Simplified procedures introduced July 2024',
        'Mini PIA Taranto launched with JTF funding'
      ],
      website: 'https://www.minipia.puglia.it'
    }
  },
  
  responses: {
    'what is mini pia': `
      Mini PIA (Pacchetti Integrati d'Agevolazione) is Puglia's premier business incentive program offering 
      30-35% grants for investments up to €5 million. It's perfect for trullo renovation projects when 
      structured as tourism businesses. The program covers building renovation, equipment, innovation, 
      and training costs. Applications are open on a rolling basis until funds are exhausted.
    `,
    
    'mini pia funding amounts': `
      Mini PIA offers substantial funding:
      • Grants: 30-45% of eligible costs (non-repayable)
      • Additional financing support: up to 20%
      • Total support: up to 65% of project costs
      • Minimum investment: €30,000
      • Maximum investment: €5 million
      
      For a €500,000 trullo renovation project, you could receive up to €225,000 in grants 
      plus additional financing benefits.
    `,
    
    'mini pia eligibility': `
      To qualify for Mini PIA:
      • Be a micro or small enterprise (under 50 employees)
      • Have legal seat or operational unit in Puglia
      • Not be in financial difficulty
      • Be current with taxes and contributions
      
      Tourism and hospitality businesses are eligible, making it perfect for trullo B&Bs, 
      boutique hotels, and agriturismo projects.
    `,
    
    'mini pia application process': `
      The Mini PIA application process:
      1. Register on Sistema Puglia portal
      2. Prepare detailed business plan
      3. Secure bank pre-approval for co-financing
      4. Submit online application
      5. Receive evaluation (2-4 months)
      6. Start project after approval
      7. Complete within 24 months
      8. Submit documentation for payment
      
      Giuseppe can connect you with specialists who handle Mini PIA applications.
    `,
    
    'mini pia for trullos': `
      Mini PIA is excellent for trullo projects! When you structure your trullo as a tourism 
      business (B&B, boutique hotel, agriturismo), you can access:
      
      • 45% grants for renovation costs
      • 30% for digital systems and websites
      • 50% for staff training
      • Funding for furniture and equipment
      
      Many of Giuseppe's clients have used Mini PIA to transform traditional trullos into 
      successful hospitality businesses.
    `,
    
    'typical mini pia project': `
      Here's a real example of a successful Mini PIA Turismo project:
      
      • Project: Historic building conversion to albergo diffuso (12 rooms, 35 beds)
      • Investment: €2.3 million
      • Grant received: €1.16 million (49.5%)
      • Key components:
        - Building purchase and renovation: €1.85 million
        - Professional services: €63,000
        - Innovation (CRM system): €58,200
        - Digital marketing: €58,700
        - Equipment and furnishings: €36,000
      • Job creation: 2 new positions
      • Processing time: 11 months from application to approval
      
      Success factors: Clear business plan, bank pre-approval, professional 
      technical documentation, energy efficiency improvements.
    `,
    
    'combine mini pia with other incentives': `
      Yes! Mini PIA can be strategically combined with:
      
      • Tax credits (credito d'imposta Sud) - additional 45%
      • Superbonus for energy efficiency
      • Regional tourism incentives
      • Favorable bank financing
      
      Giuseppe's network includes experts who can structure your investment to maximize 
      all available incentives while ensuring compliance.
    `
  },
  
  triggers: [
    'mini pia',
    'pacchetti integrati',
    'puglia grants',
    'business incentives',
    'renovation funding',
    'tourism grants',
    'small business support',
    'EU funding',
    'investment incentives',
    'mini pia turismo',
    'mini pia taranto',
    'JTF funding',
    'transition fund'
  ]
};
