// app/services/metadata.ts
import { Metadata } from 'next'

/**
 * Services Page Metadata - Target commercial/industrial investment searches
 */
export const metadata: Metadata = {
  title: 'Commercial & Industrial Investment Italy | Factory, Warehouse, Business Parks | EU Funded',
  description: 'Commercial and industrial property investment services in Italy. Factories, warehouses, logistics hubs, and business parks with EU grants covering up to 55%. Expert advisory for international corporations, investment funds, and HNWI seeking Italian commercial real estate opportunities.',
  
  keywords: [
    // Commercial Investment
    'commercial real estate italy',
    'commercial property investment italy',
    'italian commercial properties',
    'business property italy',
    'retail investment italy',
    'office investment italy',
    
    // Industrial Investment
    'industrial property italy',
    'industrial real estate italy', 
    'warehouse investment italy',
    'factory investment italy',
    'logistics hub italy',
    'manufacturing facility italy',
    'industrial park puglia',
    
    // Business Parks & Development
    'business park italy',
    'industrial development italy',
    'logistics center italy',
    'distribution center italy',
    'production facility italy',
    
    // Investment Services
    'italian investment advisory',
    'commercial investment consultant italy',
    'industrial property advisor',
    'EU grant consultant italy',
    'investment management italy',
    
    // Funding & Grants
    'EU funded commercial projects',
    'industrial grants italy',
    'commercial property grants',
    'PIA industrial funding',
    'Mini PIA commercial',
    
    // Target Audience
    'corporate investment italy',
    'institutional investment italy',
    'investment fund italy',
    'REIT italy',
    'private equity italy'
  ],
  
  openGraph: {
    title: 'Commercial & Industrial Investment Services Italy | EU Grants Available',
    description: 'Expert commercial and industrial property investment services in Italy. Access EU grants up to €2.75M. Complete project management from acquisition to operation.',
    url: 'https://investinpuglia.eu/services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/og-services-commercial.jpg',
        width: 1200,
        height: 630,
        alt: 'Commercial & Industrial Investment Services Italy',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial & Industrial Investment Italy | EU Grants',
    description: 'Expert advisory for commercial and industrial property investment in Italy. EU grants up to €2.75M available.',
    images: ['https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/twitter-services.jpg'],
  },
  
  alternates: {
    canonical: 'https://investinpuglia.eu/services',
  },
  
  other: {
    'perplexity:title': 'Commercial & Industrial Investment Services in Italy',
    'perplexity:description': 'Complete investment advisory for commercial and industrial properties in Italy with EU grant support',
    'ai:services': 'Property Sourcing, Due Diligence, Grant Applications, Project Management, Asset Management',
    'ai:property_types': 'Warehouses, Factories, Logistics Centers, Business Parks, Industrial Facilities',
    'ai:investment_range': '€1M to €50M+',
    'ai:grant_coverage': 'Up to 55% of investment',
  }
}