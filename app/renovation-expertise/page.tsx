import { Metadata } from 'next'
import RenovationExpertiseClient from './RenovationExpertiseClient'

export const metadata: Metadata = {
  title: 'Renovation & Restructuring Expertise | Engineer Architect Cataldo Russo | InvestInPuglia',
  description: 'Discover our exceptional renovation and restructuring projects in Puglia. Engineer Architect Cataldo Russo\'s portfolio showcases luxury hotels, historic restorations, and premium real estate transformations with proven ROI.',
  keywords: 'Puglia renovation, restructuring projects Italy, restoration expertise, Cataldo Russo architect, luxury hotel renovation, Baglioni Hotel, Oasi Sarparea, investment opportunities Puglia',
  openGraph: {
    title: 'Puglia Renovation & Restructuring Excellence',
    description: 'Transform your investment with Puglia\'s leading renovation experts. 50+ successful projects, €95M+ development value, 30% average ROI.',
    url: 'https://investinpuglia.eu/renovation-expertise',
    siteName: 'InvestInPuglia',
    images: [
      {
        url: 'https://investinpuglia.eu/projects/baglioni-pool.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury renovation projects in Puglia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puglia Renovation & Restructuring Excellence',
    description: 'Transform your investment with Puglia\'s leading renovation experts.',
    images: ['https://investinpuglia.eu/projects/baglioni-pool.jpg'],
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/renovation-expertise',
  },
}

export default function RenovationExpertisePage() {
  return <RenovationExpertiseClient />
}