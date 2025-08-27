import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PIA & Mini PIA Grant Services | Property Investment Advisory Puglia',
  description: 'Expert PIA and Mini PIA grant advisory services in Puglia. 3-phase structured approach: Property Search (€2,500), Negotiation (€2,500), Preliminary Agreement (€2,500). 95% success rate.',
  keywords: [
    'PIA grant services',
    'Mini PIA grant advisory',
    'Puglia property investment services',
    'EU co-funded grants advisory',
    'property search puglia',
    'investment negotiation services',
    'preliminary agreement support',
    'CUP approval assistance',
    'grant application services',
    'puglia investment consultant'
  ],
  openGraph: {
    title: 'PIA & Mini PIA Grant Advisory Services | Professional Investment Support',
    description: '3-phase structured approach to securing PIA grants in Puglia. From property search to final deed. Transparent pricing, flexible à la carte services.',
    type: 'website',
    locale: 'en_US',
    url: 'https://investinpuglia.eu/services',
    siteName: 'InvestInPuglia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIA Grant Advisory Services | InvestInPuglia',
    description: 'Structured 3-phase approach to PIA grants. €7,500 total investment to secure your Puglia property.',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/services'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}