import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InvestiScope™ Classic - Mini PIA Calculator | InvestInPuglia.eu',
  description: 'Advanced calculator for Mini PIA Turismo grants with detailed financial projections and ROI analysis. Calculate your eligible costs, non-refundable grants, and tax credits instantly.',
  keywords: 'Mini PIA calculator, tourism grants Italy, Puglia investment calculator, InvestiScope, property investment Italy',
  openGraph: {
    title: 'InvestiScope™ Classic - Mini PIA Calculator',
    description: 'Calculate your Mini PIA Turismo grants and investment benefits instantly',
    url: 'https://investinpuglia.eu/tools/mini-pia-calculator',
    siteName: 'InvestInPuglia.eu',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}