import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Investment Properties Puglia | Mini PIA Grant Eligible Properties',
  description: 'Discover exclusive Mini PIA grant-eligible investment properties in Puglia, Italy. Historic palazzos, seafront villas, tourism properties. 15-20% average ROI. Professional property advisory.',
  keywords: [
    'puglia investment properties',
    'mini PIA eligible properties',
    'puglia real estate investment',
    'tourism properties puglia',
    'historic palazzos puglia',
    'seafront villas puglia',
    'property investment southern italy',
    'puglia commercial properties',
    'EU grant eligible properties',
    'rental properties puglia'
  ],
  openGraph: {
    title: 'Premium Investment Properties in Puglia | Grant-Eligible Real Estate',
    description: 'Explore exclusive Mini PIA grant-eligible properties in Southern Italy. From historic buildings to modern developments. Expert property advisory included.',
    type: 'website',
    locale: 'en_US',
    url: 'https://investinpuglia.eu/properties',
    siteName: 'InvestInPuglia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Properties Puglia | InvestInPuglia',
    description: 'Exclusive investment properties in Puglia. Mini PIA grant eligible. 15-20% average ROI.',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/properties'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}