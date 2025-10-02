// app/property-snapshot/metadata.ts
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Property Snapshot Analysis €500 | 7-Day Property Report | Invest in Puglia',
  description: 'Test our expertise for just €500. Get comprehensive property analysis in 7-10 days: hidden costs, grant eligibility (€350K-€2.25M potential), red flags assessment. Save yourself from €200K+ mistakes with expert Italian property due diligence.',

  keywords: [
    'italian property analysis',
    'property due diligence italy',
    'property inspection puglia',
    'italian property assessment',
    'property report italy',
    'real estate analysis puglia',
    'property evaluation italy',
    'hidden costs italian property',
    'grant eligibility check italy',
    'property red flags italy',
    'italian property expert',
    'property snapshot service',
    'quick property assessment',
    'italian real estate report',
    'property investment analysis puglia'
  ],

  openGraph: {
    title: '€500 Property Snapshot | 7-Day Expert Analysis',
    description: 'Comprehensive property analysis: hidden costs, grant eligibility, red flags. Test our expertise before larger commitment.',
    url: 'https://investinpuglia.eu/property-snapshot',
    type: 'product',
    images: [
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/og-property-snapshot.jpg',
        width: 1200,
        height: 630,
        alt: 'Property Snapshot Analysis Service',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '€500 Property Snapshot | Italian Property Analysis',
    description: '7-day comprehensive analysis: hidden costs, grant eligibility, red flags. Expert due diligence.',
    images: ['https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/twitter-property-snapshot.jpg'],
  },

  alternates: {
    canonical: 'https://investinpuglia.eu/property-snapshot',
  },

  other: {
    'perplexity:title': 'Property Snapshot Analysis - €500',
    'perplexity:description': 'Expert 7-day property analysis for Italian real estate investments',
    'service:name': 'Property Snapshot Analysis',
    'service:tier': 'Tier 0 - Entry Level',
    'service:price': '€500',
    'service:duration': '7-10 days',
    'service:deliverable': 'Comprehensive property analysis report',
    'service:roi': '100X-1000X potential savings',
  }
}
