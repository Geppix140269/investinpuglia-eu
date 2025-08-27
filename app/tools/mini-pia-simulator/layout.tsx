import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mini PIA Simulator | Advanced Grant Calculator - Up to €2.75M Funding',
  description: 'Professional Mini PIA Turismo grant calculator with detailed financial projections. Calculate 55% non-refundable grants up to €2.75M. ROI analysis, break-even calculations, PDF reports.',
  keywords: [
    'mini PIA simulator',
    'mini PIA turismo calculator',
    'PIA grant calculator advanced',
    '55% non refundable grants',
    '€2.75M grant funding',
    'ROI calculator puglia',
    'tourism property calculator',
    'EU grant simulator',
    'FESR grant calculator',
    'puglia development grants'
  ],
  openGraph: {
    title: 'Mini PIA Simulator - Advanced Grant Calculator | Up to €2.75M Funding',
    description: 'Professional Mini PIA Turismo grant calculator with AI-powered analysis. 55% non-refundable grants, detailed ROI projections, instant results.',
    type: 'website',
    locale: 'en_US',
    url: 'https://investinpuglia.eu/tools/mini-pia-simulator',
    siteName: 'InvestInPuglia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mini PIA Simulator | Advanced Grant Calculator',
    description: 'Calculate Mini PIA grants up to €2.75M. Professional ROI analysis with detailed projections.',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/tools/mini-pia-simulator'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function MiniPIASimulatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}