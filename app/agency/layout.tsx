import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate Agency Partner Portal | List Mini PIA Properties - InvestInPuglia',
  description: 'Join our exclusive network of real estate agencies. List your Mini PIA eligible properties (€30K-€5M) and connect with 5,000+ qualified international investors. Up to 55% grant funding available.',
  keywords: 'Mini PIA properties, real estate agency partnership, Puglia property investment, Italian real estate agents, investment properties Puglia, EU grants real estate, trulli properties, international investors Italy',
  
  openGraph: {
    title: '🏛️ Become a Partner Agency | List Your Mini PIA Properties',
    description: '✅ Connect with 5,000+ international investors\n✅ List Mini PIA eligible properties (€30K-€5M)\n✅ Up to 55% EU grant funding\n✅ Premium marketing & support\n\n🎯 Join 250+ agencies already partnering with InvestInPuglia',
    url: 'https://investinpuglia.eu/agency',
    siteName: 'InvestInPuglia.eu',
    images: [
      {
        url: 'https://investinpuglia.eu/images/og/agency-partnership.jpg',
        width: 1200,
        height: 630,
        alt: 'Partner with InvestInPuglia - List Your Mini PIA Properties',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: '🏛️ Real Estate Agencies: List Your Mini PIA Properties',
    description: 'Join our exclusive network. Connect with 5,000+ international investors. Up to 55% grant funding for your clients.',
    images: ['https://investinpuglia.eu/images/og/agency-partnership.jpg'],
    creator: '@investinpuglia',
  },
  
  alternates: {
    canonical: 'https://investinpuglia.eu/agency',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}