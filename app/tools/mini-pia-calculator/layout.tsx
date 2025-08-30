import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mini PIA Calculator - Calculate Your 45-55% Grant | InvestInPuglia',
  description: 'Free Mini PIA Turismo grant calculator. Input your tourism investment and instantly see your 45-55% grant amount. Max €2M for foreign investors in Puglia.',
  keywords: 'Mini PIA calculator, tourism grants Italy, Puglia investment calculator, InvestiScope, property investment Italy, EU grants calculator',
  
  openGraph: {
    title: '🧮 Calculate Your Tourism Grant in 30 Seconds - Up to €2M',
    description: '✓ FREE Mini PIA Calculator • ✓ 45-55% Grants • ✓ Instant Results • ✓ Foreign Investor Friendly • Try Now!',
    url: 'https://investinpuglia.eu/tools',
    siteName: 'InvestInPuglia',
    images: [
      {
        url: 'https://investinpuglia.eu/images/calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Mini PIA Grant Calculator - Calculate Your 45-55% Tourism Grant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: '🧮 Mini PIA Calculator: Get Your Grant Amount in 30 Seconds',
    description: 'Free calculator for tourism investments in Puglia. See your 45-55% grant instantly. Max €2M available.',
    images: ['https://investinpuglia.eu/images/calculator-twitter.jpg'],
  },
  
  alternates: {
    canonical: 'https://investinpuglia.eu/tools',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  other: {
    'og:whatsapp:title': '🧮 FREE: Calculate Your €2M Tourism Grant',
    'og:whatsapp:description': 'Mini PIA Calculator • 45-55% grants • Try it now 👇',
  }
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}