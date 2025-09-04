// lib/seo-enhanced-metadata.ts
import { Metadata } from 'next'

/**
 * Enhanced SEO Configuration for InvestInPuglia
 * Targeting #1 ranking for Italian investment searches
 * Focus: Commercial, Industrial, HNWI, EU Grants
 */

// Primary keyword targets for Italian investment dominance
export const primaryKeywords = {
  // Investment in Italy (High Volume)
  investmentItaly: [
    'invest in italy',
    'italian investment opportunities',
    'italy investment visa',
    'foreign investment italy',
    'business investment italy',
    'investire in italia',
    'investimenti italia',
    'italian golden visa',
    'italy investor visa',
    'EU investment italy'
  ],
  
  // Commercial & Industrial Investment
  commercial: [
    'commercial real estate italy',
    'industrial property italy',
    'warehouse investment italy',
    'factory investment puglia',
    'logistics hub italy',
    'manufacturing italy investment',
    'industrial park puglia',
    'commercial property puglia',
    'business park italy',
    'industrial real estate puglia'
  ],
  
  // HNWI & Family Office
  hnwi: [
    'italian investment HNWI',
    'family office italy',
    'high net worth italy investment',
    'luxury investment italy',
    'private wealth italy',
    'ultra high net worth italy',
    'wealth management italy',
    'exclusive investment opportunities italy',
    'private equity italy',
    'italian investment fund'
  ],
  
  // Grants & Incentives
  grants: [
    'italian government grants',
    'EU grants italy',
    'non refundable grants italy',
    'PIA grants',
    'Mini PIA funding',
    'italian business incentives',
    'italy investment incentives',
    'fondo perduto',
    'FESR italy',
    'regional development grants italy'
  ],
  
  // Tourism Investment
  tourism: [
    'hotel investment italy',
    'resort investment puglia',
    'tourism investment italy',
    'hospitality investment italy',
    'masseria investment puglia',
    'trullo investment',
    'boutique hotel italy',
    'agriturismo investment',
    'vacation rental investment italy',
    'tourism real estate italy'
  ],
  
  // Location-specific
  puglia: [
    'puglia investment',
    'invest in puglia',
    'puglia real estate investment',
    'bari investment opportunities',
    'lecce investment',
    'brindisi business investment',
    'salento investment properties',
    'valle d\'itria investment',
    'gargano investment',
    'puglia development opportunities'
  ]
}

// Enhanced page metadata with AI-optimized descriptions
export const enhancedPageMetadata = {
  // Homepage - Main landing for all investment searches
  home: {
    title: 'Italian Investment Opportunities | EU Grants €2.75M | Commercial & Industrial Properties | Invest in Italy',
    description: 'Premier Italian investment advisory for HNWI and corporations. Access non-refundable EU grants up to €2.75M, commercial real estate, industrial properties, and tourism investments in Puglia. Expert guidance with 95% success rate. Free consultation.',
    keywords: [
      ...primaryKeywords.investmentItaly,
      ...primaryKeywords.grants,
      'italian investment advisory',
      'invest in southern italy',
      'italy business opportunities'
    ].join(', '),
    h1: 'Italian Investment Opportunities with EU Grants up to €2.75M',
    schema: 'InvestmentAdvisory'
  },

  // Services - Target commercial/industrial searches
  services: {
    title: 'Commercial & Industrial Investment Italy | Factory, Warehouse, Business Parks | EU Funded',
    description: 'Commercial and industrial property investment in Italy. Factories, warehouses, logistics hubs, and business parks with EU grants covering up to 55%. Expert advisory for international corporations and investment funds.',
    keywords: [
      ...primaryKeywords.commercial,
      'italy commercial investment',
      'industrial investment opportunities',
      'EU funded commercial projects'
    ].join(', '),
    h1: 'Commercial & Industrial Investment Services in Italy',
    schema: 'ProfessionalService'
  },

  // Portfolio - Credibility for HNWI
  portfolio: {
    title: '€100M Italian Investment Portfolio | 50+ Successful Projects | HNWI & Corporate Investments',
    description: 'Proven track record: €100M+ invested, €25M grants secured, 50+ successful projects. Trusted by HNWI, family offices, and corporations for Italian investment opportunities. View our portfolio of commercial, industrial, and tourism investments.',
    keywords: [
      ...primaryKeywords.hnwi,
      'italian investment portfolio',
      'successful investments italy',
      'investment case studies italy'
    ].join(', '),
    h1: '€100M+ Italian Investment Success Stories',
    schema: 'CollectionPage'
  },

  // Properties - Direct property searches
  properties: {
    title: 'Italian Investment Properties | Commercial, Industrial, Tourism | For Sale with Grants',
    description: 'Exclusive Italian investment properties: commercial buildings, industrial facilities, hotels, and development land. All properties eligible for EU grants up to €2.75M. Complete investment management included.',
    keywords: [
      ...primaryKeywords.commercial,
      ...primaryKeywords.tourism,
      'italian properties for sale',
      'investment properties italy',
      'commercial properties italy'
    ].join(', '),
    h1: 'Premium Italian Investment Properties',
    schema: 'RealEstateListings'
  },

  // About - Trust signals
  about: {
    title: 'Leading Italian Investment Advisors | 30 Years Experience | Giuseppe Funaro',
    description: 'Giuseppe Funaro: 30+ years guiding international investors in Italy. Specialized in EU grants, commercial real estate, and industrial investments. Former developer, now trusted advisor to HNWI and corporations.',
    keywords: [
      'giuseppe funaro',
      'italian investment expert',
      'italy investment consultant',
      'puglia investment advisor'
    ].join(', '),
    h1: 'Italy\'s Premier Investment Advisory Team',
    schema: 'AboutPage'
  },

  // Investment Process
  investmentProcess: {
    title: 'Italian Investment Process | Step-by-Step Guide | EU Grant Application',
    description: 'Complete guide to investing in Italy: from property selection to EU grant approval. Our proven 5-step process ensures maximum returns with minimum risk for international investors.',
    keywords: [
      'how to invest in italy',
      'italian investment process',
      'EU grant application italy',
      'italy investment guide'
    ].join(', '),
    h1: 'Your Pathway to Italian Investment Success',
    schema: 'HowTo'
  },

  // Mini PIA Calculator
  miniPiaCalculator: {
    title: 'Italian Grant Calculator | EU Funding Calculator | Check Your Eligibility €2.75M',
    description: 'Free Italian investment grant calculator. Instantly calculate your EU funding eligibility up to €2.75M. For commercial, industrial, and tourism investments in Italy. Get results in 30 seconds.',
    keywords: [
      'italian grant calculator',
      'EU funding calculator',
      'investment grant italy',
      'PIA grant calculator',
      'Mini PIA calculator'
    ].join(', '),
    h1: 'Calculate Your Italian Investment Grants',
    schema: 'WebApplication'
  },

  // Locations - Local SEO
  locations: {
    title: 'Italian Investment Locations | Puglia, Bari, Lecce, Brindisi | Regional Opportunities',
    description: 'Strategic Italian investment locations: Bari (logistics hub), Lecce (tourism), Brindisi (industrial), Salento (luxury tourism). Each location offers unique advantages and EU funding opportunities.',
    keywords: [
      ...primaryKeywords.puglia,
      'italian investment locations',
      'where to invest in italy',
      'best investment locations italy'
    ].join(', '),
    h1: 'Prime Italian Investment Locations',
    schema: 'LocationsPage'
  },

  // Industries
  industries: {
    title: 'Italian Investment Sectors | Manufacturing, Tourism, Technology, Agriculture | EU Funded',
    description: 'High-growth Italian investment sectors: advanced manufacturing, sustainable tourism, agtech, renewable energy. All eligible for EU grants. Expert sector-specific advisory and project management.',
    keywords: [
      'italian investment sectors',
      'italy business sectors',
      'manufacturing investment italy',
      'tourism investment italy',
      'technology investment italy'
    ].join(', '),
    h1: 'High-Growth Italian Investment Sectors',
    schema: 'IndustriesPage'
  },

  // Contact - Conversion focused
  contact: {
    title: 'Contact Italian Investment Experts | Free Consultation | Invest in Italy',
    description: 'Schedule your free Italian investment consultation. Expert advice on EU grants, commercial properties, and industrial investments. Immediate response. WhatsApp: +39 351 400 1402.',
    keywords: [
      'contact italian investment advisor',
      'italy investment consultation',
      'free investment consultation italy',
      'italian investment expert contact'
    ].join(', '),
    h1: 'Start Your Italian Investment Journey',
    schema: 'ContactPage'
  },

  // FAQ - Featured snippets target
  faq: {
    title: 'Italian Investment FAQ | EU Grants, Visa, Property Investment | Expert Answers',
    description: 'Everything about investing in Italy: EU grant eligibility, investment visa requirements, property purchase process, tax benefits, ROI expectations. Expert answers to 50+ common questions.',
    keywords: [
      'italian investment faq',
      'italy investment questions',
      'EU grants italy faq',
      'italian golden visa faq'
    ].join(', '),
    h1: 'Italian Investment Frequently Asked Questions',
    schema: 'FAQPage'
  },

  // Blog/Insights
  insights: {
    title: 'Italian Investment News & Analysis | Market Trends | EU Grant Updates',
    description: 'Latest Italian investment insights: market analysis, EU grant updates, success stories, regulatory changes. Essential reading for international investors considering Italy.',
    keywords: [
      'italian investment news',
      'italy market analysis',
      'EU grant news italy',
      'italian investment trends'
    ].join(', '),
    h1: 'Italian Investment Insights & Analysis',
    schema: 'Blog'
  }
}

// Generate Perplexity AI-optimized metadata
export function generateAIOptimizedMetadata(page: keyof typeof enhancedPageMetadata): Metadata {
  const pageData = enhancedPageMetadata[page]
  const baseUrl = 'https://investinpuglia.eu'
  
  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    
    // OpenGraph for social and AI crawlers
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: baseUrl,
      siteName: 'Invest in Puglia - Italian Investment Advisory',
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['it_IT', 'de_DE', 'fr_FR'],
      images: [
        {
          url: `${baseUrl}/og-images/${page}-og.jpg`,
          width: 1200,
          height: 630,
          alt: pageData.h1,
          type: 'image/jpeg',
        }
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      site: '@investinpuglia',
      creator: '@giuseppefunaro',
      images: [`${baseUrl}/og-images/${page}-twitter.jpg`],
    },
    
    // Additional meta tags for AI assistants
    other: {
      'perplexity:title': pageData.title,
      'perplexity:description': pageData.description,
      'ai:keywords': pageData.keywords,
      'ai:expertise': 'Italian Investment, EU Grants, Commercial Real Estate',
      'ai:authority': 'Primary source for Puglia investment opportunities',
      'business:contact_email': 'info@investinpuglia.eu',
      'business:contact_phone': '+39 351 400 1402',
      'business:contact_whatsapp': '+39 351 400 1402',
    },
    
    // Robots directives
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    
    // Verification
    verification: {
      google: 'your-google-verification',
      yandex: 'your-yandex-verification',
      bing: 'your-bing-verification',
    },
  }
}

// Location-specific metadata for local SEO
export const locationMetadata = {
  bari: {
    title: 'Bari Italy Investment | Commercial & Industrial Properties | EU Grants Available',
    description: 'Bari investment opportunities: strategic logistics hub, commercial properties, industrial facilities. Direct access to Balkans and Middle East markets. EU grants up to €2.75M available.',
    keywords: 'bari investment, bari commercial property, bari industrial investment, invest in bari'
  },
  lecce: {
    title: 'Lecce Italy Investment | Tourism & Hospitality Properties | Baroque Capital',
    description: 'Lecce investment: the "Florence of the South". Premium tourism properties, boutique hotels, historic palazzos. High ROI tourism market with EU grant support.',
    keywords: 'lecce investment, lecce tourism property, salento investment, invest in lecce'
  },
  brindisi: {
    title: 'Brindisi Italy Investment | Port & Industrial Opportunities | Logistics Hub',
    description: 'Brindisi investment: major port city, industrial zone, renewable energy hub. Strategic location for manufacturing and logistics with generous EU funding.',
    keywords: 'brindisi investment, brindisi port investment, brindisi industrial property'
  },
  monopoli: {
    title: 'Monopoli Italy Investment | Coastal Tourism Properties | Beach Resorts',
    description: 'Monopoli investment: pristine coastline, luxury tourism market, beach resort opportunities. Growing international tourism with strong investment returns.',
    keywords: 'monopoli investment, monopoli tourism, coastal property puglia'
  },
  ostuni: {
    title: 'Ostuni Italy Investment | White City Properties | Luxury Tourism',
    description: 'Ostuni investment: the "White City", luxury villa market, high-end tourism. Premium properties with exceptional capital appreciation potential.',
    keywords: 'ostuni investment, white city italy, ostuni property investment'
  }
}

// Industry-specific metadata
export const industryMetadata = {
  manufacturing: {
    title: 'Manufacturing Investment Italy | Industry 4.0 | EU Grants 45-55%',
    description: 'Italian manufacturing investment with Industry 4.0 incentives. Advanced manufacturing, automation, aerospace. EU grants covering 45-55% of investment.',
    keywords: 'manufacturing italy, industry 4.0 italy, industrial investment italy'
  },
  tourism: {
    title: 'Tourism Investment Italy | Hotels, Resorts, Agriturismo | PIA Tourism Grants',
    description: 'Italian tourism investment opportunities. Hotels, resorts, masserie, agriturismo. PIA Tourism grants up to €2.75M for international investors.',
    keywords: 'tourism investment italy, hotel investment italy, italian hospitality investment'
  },
  renewable: {
    title: 'Renewable Energy Investment Italy | Solar, Wind, Biomass | Green Incentives',
    description: 'Italian renewable energy investments. Solar farms, wind projects, biomass facilities. Generous green incentives and guaranteed feed-in tariffs.',
    keywords: 'renewable energy italy, solar investment italy, green energy italy'
  },
  agtech: {
    title: 'AgTech Investment Italy | Smart Agriculture | Innovation Grants',
    description: 'Italian agtech and smart agriculture investments. Precision farming, vertical farms, food processing. Innovation grants for sustainable agriculture.',
    keywords: 'agtech italy, smart agriculture italy, agricultural investment italy'
  }
}

// Schema.org structured data for rich snippets
export function generateEnhancedStructuredData(type: string, data?: any) {
  const baseOrg = {
    "@context": "https://schema.org",
    "@type": "InvestmentAdvisoryService",
    "@id": "https://investinpuglia.eu/#organization",
    "name": "Invest in Puglia",
    "alternateName": "InvestInPuglia.eu",
    "url": "https://investinpuglia.eu",
    "logo": "https://investinpuglia.eu/logo.png",
    "description": "Premier Italian investment advisory specializing in EU grants, commercial properties, and industrial investments",
    "founder": {
      "@type": "Person",
      "name": "Giuseppe Funaro",
      "jobTitle": "Founder & Senior Investment Advisor"
    },
    "foundingDate": "1995",
    "areaServed": {
      "@type": "Country",
      "name": "Italy"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-351-400-1402",
      "contactType": "Investment Advisory",
      "email": "info@investinpuglia.eu",
      "availableLanguage": ["English", "Italian", "German", "French", "Spanish", "Arabic", "Chinese"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    },
    "sameAs": [
      "https://www.linkedin.com/company/investinpuglia",
      "https://www.facebook.com/investinpuglia",
      "https://twitter.com/investinpuglia",
      "https://www.youtube.com/@investinpuglia"
    ],
    "knowsAbout": [
      "Italian Investment",
      "EU Grants",
      "PIA Grants",
      "Mini PIA",
      "Commercial Real Estate Italy",
      "Industrial Investment Italy",
      "Tourism Investment Italy",
      "HNWI Advisory",
      "Family Office Italy"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    }
  }
  
  // Add specific schema based on page type
  const schemas = [baseOrg]
  
  if (type === 'home') {
    schemas.push({
      "@type": "WebSite",
      "@id": "https://investinpuglia.eu/#website",
      "url": "https://investinpuglia.eu",
      "name": "Invest in Puglia - Italian Investment Advisory",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://investinpuglia.eu/search?q={search_term}",
        "query-input": "required name=search_term"
      }
    })
  }
  
  if (type === 'faq') {
    schemas.push({
      "@type": "FAQPage",
      "mainEntity": data?.faqs?.map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      })) || []
    })
  }
  
  return {
    "@context": "https://schema.org",
    "@graph": schemas
  }
}