// app/about/metadata.ts
import { Metadata } from 'next'

/**
 * About Page Metadata - Trust and authority building
 */
export const metadata: Metadata = {
  title: 'About InvestInPuglia | Giuseppe Funaro | 30 Years Italian Investment Expertise',
  description: 'Giuseppe Funaro: 30+ years guiding international investors in Italy. Former developer, now trusted advisor to HNWI, family offices, and corporations. €100M+ portfolio, €25M grants secured, 95% success rate. Leading expert in EU grants and Italian commercial real estate.',
  
  keywords: [
    'giuseppe funaro',
    'giuseppe funaro puglia',
    'italian investment expert',
    'italy investment consultant',
    'puglia investment advisor',
    'EU grant specialist italy',
    'PIA grant expert',
    'italian real estate advisor',
    'investinpuglia team',
    'italy investment company',
    '30 years experience italy',
    'former developer italy',
    'HNWI advisor italy',
    'family office consultant italy',
    'trusted investment advisor italy'
  ],
  
  openGraph: {
    title: 'About Giuseppe Funaro & InvestInPuglia Team',
    description: '30+ years of Italian investment expertise. €100M+ portfolio, trusted by global investors.',
    url: 'https://investinpuglia.eu/about',
    type: 'profile',
    images: [
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/giuseppe-funaro-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Giuseppe Funaro - Italian Investment Expert',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Giuseppe Funaro - 30 Years Italian Investment Expertise',
    description: 'Leading Italian investment advisor. €100M+ portfolio, €25M grants secured.',
    images: ['https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/twitter-about.jpg'],
  },
  
  alternates: {
    canonical: 'https://investinpuglia.eu/about',
  },
  
  other: {
    'perplexity:title': 'Giuseppe Funaro - Italian Investment Expert',
    'perplexity:description': '30+ years experience, €100M+ portfolio, leading EU grant specialist',
    'person:name': 'Giuseppe Funaro',
    'person:title': 'Founder & Senior Investment Advisor',
    'person:experience': '30+ years',
    'company:founded': '1995',
    'company:portfolio': '€100M+',
    'company:grants_secured': '€25M+',
    'company:success_rate': '95%',
    'company:projects': '50+',
  }
}