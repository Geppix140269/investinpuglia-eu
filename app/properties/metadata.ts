// app/properties/metadata.ts
import { Metadata } from 'next'

/**
 * Properties Page Metadata - Target direct property investment searches
 */
export const metadata: Metadata = {
  title: 'Italian Investment Properties for Sale | Commercial, Industrial, Hotels | EU Grants Eligible',
  description: 'Exclusive Italian investment properties: commercial buildings, industrial facilities, hotels, resorts, and development land. All properties eligible for EU grants up to €2.75M. Prime locations in Puglia including Bari, Lecce, Brindisi. Complete investment management and grant advisory included.',
  
  keywords: [
    // Property Types
    'italian investment properties',
    'commercial property for sale italy',
    'industrial property for sale italy',
    'hotel for sale italy',
    'resort for sale italy',
    'development land italy',
    
    // Specific Properties
    'warehouse for sale italy',
    'factory for sale italy',
    'business park for sale italy',
    'masseria for sale puglia',
    'trullo for sale puglia',
    'palazzo for sale italy',
    
    // Investment Focus
    'investment property italy',
    'income producing property italy',
    'commercial real estate italy',
    'industrial real estate italy',
    'hospitality property italy',
    
    // Location Specific
    'puglia properties for sale',
    'bari commercial property',
    'lecce investment property',
    'brindisi industrial property',
    'salento coastal property',
    'ostuni property investment',
    
    // With Grants
    'properties with EU grants',
    'grant eligible properties italy',
    'subsidized investment italy',
    'PIA eligible properties',
    'fondo perduto properties',
    
    // Buyer Types
    'foreign investment property italy',
    'international buyer italy',
    'non resident property italy',
    'golden visa property italy'
  ],
  
  openGraph: {
    title: 'Italian Investment Properties | Commercial, Industrial, Tourism | EU Grants',
    description: 'Browse exclusive Italian investment properties with EU grant eligibility. Commercial, industrial, and tourism properties in prime locations.',
    url: 'https://investinpuglia.eu/properties',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/og-properties-listing.jpg',
        width: 1200,
        height: 630,
        alt: 'Italian Investment Properties for Sale',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Italian Investment Properties | EU Grants Available',
    description: 'Exclusive investment properties in Italy. Commercial, industrial, tourism. All eligible for EU grants up to €2.75M.',
    images: ['https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/twitter-properties.jpg'],
  },
  
  alternates: {
    canonical: 'https://investinpuglia.eu/properties',
  },
  
  other: {
    'perplexity:title': 'Italian Investment Properties with EU Grant Eligibility',
    'perplexity:description': 'Curated selection of investment properties in Italy, all eligible for EU grants',
    'ai:property_types': 'Commercial, Industrial, Hotels, Resorts, Development Land',
    'ai:price_range': '€500K to €20M+',
    'ai:locations': 'Puglia, Bari, Lecce, Brindisi, Salento, Ostuni',
    'ai:grant_eligibility': 'All properties eligible for EU grants up to 55%',
    'ai:services_included': 'Due Diligence, Grant Application, Project Management',
  }
}