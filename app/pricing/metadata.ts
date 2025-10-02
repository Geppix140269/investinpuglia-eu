// app/pricing/metadata.ts
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transparent Pricing | Italian Investment Services | €500 to Full Orchestration',
  description: 'Clear, transparent pricing for Italian investment services. Four tiers: €500 property analysis, €2,500 foundation package, 2.5-3.5% full orchestration, €3K/month project oversight. No hidden fees, milestone-based payments, zero commission conflicts.',

  keywords: [
    'italian investment pricing',
    'property investment costs italy',
    'investment advisory fees italy',
    'transparent pricing italy',
    'italian investment consultant fees',
    'puglia investment costs',
    'EU grant consultant pricing',
    'property acquisition fees italy',
    'italian real estate advisory cost',
    'investment orchestration pricing',
    'project management fees italy',
    'milestone-based pricing',
    'no commission real estate italy',
    'investment advisory rates',
    'italian property consultant pricing'
  ],

  openGraph: {
    title: 'Transparent Pricing - Italian Investment Services',
    description: 'Four clear service tiers from €500 property analysis to full orchestration. Milestone payments, no hidden fees, zero commission conflicts.',
    url: 'https://investinpuglia.eu/pricing',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/og-pricing.jpg',
        width: 1200,
        height: 630,
        alt: 'Italian Investment Services Pricing',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Transparent Pricing | Italian Investment Services',
    description: 'Four tiers: €500 analysis to full orchestration. No hidden fees, milestone payments.',
    images: ['https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/twitter-pricing.jpg'],
  },

  alternates: {
    canonical: 'https://investinpuglia.eu/pricing',
  },

  other: {
    'perplexity:title': 'Italian Investment Services Pricing',
    'perplexity:description': 'Transparent, milestone-based pricing for Italian property investment services',
    'pricing:tier0': '€500 - Property Snapshot (7-10 days)',
    'pricing:tier1': '€2,500 - Foundation Package (30-45 days)',
    'pricing:tier2': '2.5-3.5% - Full Orchestration (6-9 months)',
    'pricing:tier3': '€3,000/month - Project Oversight (12-24 months)',
    'pricing:structure': 'Milestone-based payments',
    'pricing:transparency': 'No hidden fees, zero commission conflicts',
  }
}
