// PATH: app/faq/page.tsx
import { Metadata } from 'next'
import Icon from '@/lib/iconMappings'
import FAQClient from '@/components/FAQClient'

export const metadata: Metadata = {
  title: 'FAQs | InvestInPuglia - Investment Questions Answered',
  description: 'Find answers to frequently asked questions about property and business investments in Puglia, Italy. Expert guidance on investment process, costs, and opportunities.',
  keywords: 'Puglia investment FAQ, property investment questions, business investment Italy, investment costs Puglia, investment process questions',
  openGraph: {
    title: 'Frequently Asked Questions - InvestInPuglia',
    description: 'Get answers to common questions about investing in Puglia, Italy. Property, business, costs, and process explained.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'it_IT',
    siteName: 'InvestInPuglia',
  },
  alternates: {
    canonical: 'https://investinpuglia.com/faq'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },
}

export default function FAQPage() {
  return <FAQClient />
}


