import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact InvestInPuglia | Book Free Consultation - PIA & Mini PIA Grant Experts',
  description: 'Contact our PIA & Mini PIA grant experts for a free consultation. Based in Puglia, Italy. Phone: +39 351 400 1402. Email: info@investinpuglia.eu. Average response time: 24 hours.',
  keywords: [
    'contact invest in puglia',
    'PIA grant consultation',
    'Mini PIA grant expert',
    'Giuseppe Funaro contact',
    'Puglia investment consultant',
    'EU grants consultation',
    'free PIA assessment',
    'Puglia property investment contact',
    'FESR grant advisor',
    'italian property consultant contact'
  ],
  openGraph: {
    title: 'Contact PIA & Mini PIA Grant Experts - Free Consultation | InvestInPuglia',
    description: 'Get in touch with our EU grant specialists. Free consultation for PIA and Mini PIA applications. 95% success rate. Based in Puglia, Italy.',
    type: 'website',
    locale: 'en_US',
    url: 'https://investinpuglia.eu/contact',
    siteName: 'InvestInPuglia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact InvestInPuglia | PIA Grant Experts',
    description: 'Free consultation for PIA and Mini PIA grants in Puglia. Expert advisory with 95% approval success rate.',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/contact'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}