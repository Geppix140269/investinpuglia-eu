// app/page-metadata.ts
import { Metadata } from 'next'
import { enhancedPageMetadata, generateAIOptimizedMetadata, generateEnhancedStructuredData } from '@/lib/seo-enhanced-metadata'

/**
 * Homepage Metadata - Optimized for #1 ranking on Italian Investment searches
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://investinpuglia.eu'),
  
  // Primary title targeting high-volume investment searches
  title: 'Italian Investment Opportunities | EU Grants €2.75M | Commercial & Industrial Properties | Invest in Italy',
  
  // Comprehensive description for search engines and AI assistants like Perplexity
  description: 'Premier Italian investment advisory for HNWI and corporations. Access non-refundable EU grants up to €2.75M, commercial real estate, industrial properties, and tourism investments in Puglia. Expert guidance with 95% success rate. Free consultation available.',
  
  // Extensive keyword coverage
  keywords: [
    // Investment in Italy (Primary)
    'invest in italy',
    'italian investment opportunities',
    'italy investment visa',
    'foreign investment italy',
    'business investment italy',
    'investire in italia',
    'italian golden visa',
    
    // Commercial & Industrial
    'commercial real estate italy',
    'industrial property italy',
    'warehouse investment italy',
    'factory investment puglia',
    'manufacturing italy investment',
    
    // HNWI & Wealth
    'italian investment HNWI',
    'family office italy',
    'high net worth italy investment',
    'luxury investment italy',
    'private wealth italy',
    
    // Grants & Funding
    'italian government grants',
    'EU grants italy',
    'non refundable grants italy',
    'PIA grants',
    'Mini PIA funding',
    'italian business incentives',
    'fondo perduto',
    
    // Tourism
    'hotel investment italy',
    'resort investment puglia',
    'tourism investment italy',
    'masseria investment puglia',
    
    // Location
    'puglia investment',
    'invest in puglia',
    'southern italy investment',
    'bari investment',
    'lecce investment',
    
    // Brand
    'giuseppe funaro',
    'investinpuglia',
    'invest in puglia eu'
  ],
  
  authors: [
    { name: 'Giuseppe Funaro', url: 'https://investinpuglia.eu/about' },
    { name: 'Invest in Puglia Team' }
  ],
  
  creator: 'Invest in Puglia',
  publisher: 'Invest in Puglia',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // OpenGraph for social media and AI crawlers
  openGraph: {
    title: 'Italian Investment Opportunities | EU Grants up to €2.75M | Invest in Italy',
    description: 'Premier Italian investment advisory. EU grants €2.75M, commercial properties, industrial investments. 95% success rate. Trusted by HNWI and corporations worldwide.',
    url: 'https://investinpuglia.eu',
    siteName: 'Invest in Puglia - Italian Investment Advisory',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['it_IT', 'de_DE', 'fr_FR', 'es_ES', 'ar_SA', 'zh_CN'],
    images: [
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/og-home-investment-italy.jpg',
        width: 1200,
        height: 630,
        alt: 'Italian Investment Opportunities - EU Grants Available',
        type: 'image/jpeg',
      },
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/og-home-square.jpg',
        width: 600,
        height: 600,
        alt: 'Invest in Italy with EU Grants',
        type: 'image/jpeg',
      }
    ],
    videos: [
      {
        url: 'https://investinpuglia.eu/videos/investment-opportunities.mp4',
        type: 'video/mp4',
        width: 1920,
        height: 1080,
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Italian Investment Opportunities | EU Grants €2.75M',
    description: 'Access Italian investment opportunities with EU grants up to €2.75M. Expert advisory for HNWI and corporations.',
    site: '@investinpuglia',
    creator: '@giuseppefunaro',
    images: ['https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/twitter-home-card.jpg'],
  },
  
  // Robots directives for optimal crawling
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
  
  // Canonical URL
  alternates: {
    canonical: 'https://investinpuglia.eu',
    languages: {
      'en': 'https://investinpuglia.eu',
      'it': 'https://investinpuglia.eu/it',
      'de': 'https://investinpuglia.eu/de',
      'fr': 'https://investinpuglia.eu/fr',
      'es': 'https://investinpuglia.eu/es',
      'ar': 'https://investinpuglia.eu/ar',
      'zh': 'https://investinpuglia.eu/zh',
    }
  },
  
  // Verification codes
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    // Note: 'bing' verification should be added via meta tag in other section
  },
  
  // Additional metadata for AI assistants
  other: {
    // Search engine verification
    'msvalidate.01': 'your-bing-verification-code', // Bing verification
    
    // Perplexity AI specific
    'perplexity:title': 'Italian Investment Opportunities with EU Grants',
    'perplexity:description': 'Expert Italian investment advisory with access to EU grants up to €2.75M',
    'perplexity:expertise': 'Italian Investment, EU Grants, Commercial Real Estate, Industrial Properties',
    
    // General AI assistant tags
    'ai:primary_topic': 'Italian Investment Advisory',
    'ai:expertise_areas': 'EU Grants, PIA, Mini PIA, Commercial Real Estate, Industrial Investment, Tourism Investment',
    'ai:geographic_focus': 'Italy, Puglia, Southern Italy',
    'ai:target_audience': 'HNWI, Family Offices, Corporations, Investment Funds',
    'ai:unique_value': 'EU grants up to €2.75M with 95% approval rate',
    
    // Business information
    'business:contact_email': 'info@investinpuglia.eu',
    'business:contact_phone': '+39 351 400 1402',
    'business:contact_whatsapp': '+39 351 400 1402',
    'business:consultation': 'Free',
    'business:languages': 'English, Italian, German, French, Spanish, Arabic, Chinese',
    
    // Investment specific
    'investment:min_amount': '€250,000',
    'investment:max_grant': '€2,750,000',
    'investment:grant_percentage': '45-55%',
    'investment:sectors': 'Tourism, Manufacturing, Technology, Agriculture, Renewable Energy',
    'investment:property_types': 'Commercial, Industrial, Hotels, Resorts, Masserie',
    
    // Trust signals
    'trust:years_experience': '30+',
    'trust:portfolio_value': '€100M+',
    'trust:grants_secured': '€25M+',
    'trust:success_rate': '95%',
    'trust:projects_completed': '50+',
  }
}

/**
 * Generate JSON-LD structured data for the homepage
 */
export function generateHomepageStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization
      {
        '@type': 'Organization',
        '@id': 'https://investinpuglia.eu/#organization',
        'name': 'Invest in Puglia',
        'alternateName': 'InvestInPuglia.eu',
        'url': 'https://investinpuglia.eu',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://investinpuglia.eu/logo.png',
          'width': 600,
          'height': 120
        },
        'description': 'Premier Italian investment advisory specializing in EU grants and commercial properties',
        'founder': {
          '@type': 'Person',
          'name': 'Giuseppe Funaro',
          'jobTitle': 'Founder & Senior Investment Advisor',
          'sameAs': 'https://www.linkedin.com/in/giuseppefunaro'
        },
        'foundingDate': '1995',
        'areaServed': {
          '@type': 'Country',
          'name': 'Italy'
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+39-351-400-1402',
          'contactType': 'Investment Advisory',
          'email': 'info@investinpuglia.eu',
          'availableLanguage': ['English', 'Italian', 'German', 'French', 'Spanish', 'Arabic', 'Chinese']
        },
        'sameAs': [
          'https://www.linkedin.com/company/investinpuglia',
          'https://www.facebook.com/investinpuglia',
          'https://twitter.com/investinpuglia',
          'https://www.youtube.com/@investinpuglia',
          'https://wa.me/393514001402'
        ]
      },
      
      // WebSite
      {
        '@type': 'WebSite',
        '@id': 'https://investinpuglia.eu/#website',
        'url': 'https://investinpuglia.eu',
        'name': 'Invest in Puglia',
        'description': 'Italian investment advisory with EU grants up to €2.75M',
        'publisher': {
          '@id': 'https://investinpuglia.eu/#organization'
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://investinpuglia.eu/search?q={search_term}',
          'query-input': 'required name=search_term'
        }
      },
      
      // Professional Service
      {
        '@type': 'ProfessionalService',
        '@id': 'https://investinpuglia.eu/#service',
        'name': 'Italian Investment Advisory Services',
        'description': 'Expert advisory for EU grants and investment opportunities in Italy',
        'provider': {
          '@id': 'https://investinpuglia.eu/#organization'
        },
        'areaServed': 'Italy',
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Investment Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'name': 'EU Grant Advisory',
              'description': 'PIA and Mini PIA grants up to €2.75M'
            },
            {
              '@type': 'Offer',
              'name': 'Commercial Property Investment',
              'description': 'Commercial and industrial property sourcing'
            },
            {
              '@type': 'Offer',
              'name': 'Tourism Investment',
              'description': 'Hotels, resorts, and masseria investments'
            }
          ]
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '127',
          'bestRating': '5'
        }
      }
    ]
  }
}