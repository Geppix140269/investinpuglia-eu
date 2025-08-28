import { Metadata } from 'next'

// Base metadata configuration
export const siteConfig = {
  name: 'InvestInPuglia.eu',
  url: 'https://investinpuglia.eu',
  ogImage: 'https://investinpuglia.eu/images/og/default.jpg',
  description: 'Access EU-funded PIA & Mini PIA grants (30-55% non-refundable) for Puglia investments. Expert advisory for international investors. €30K-€5M range.',
  keywords: [
    'Mini PIA grants',
    'PIA Puglia',
    'EU grants Italy',
    'Puglia investment',
    'non-refundable grants',
    'Italian real estate investment',
    'trulli properties',
    'business grants Italy',
    'foreign investment Italy',
    'Puglia business opportunities'
  ],
  authors: [
    {
      name: 'Giuseppe De Pasquale',
      url: 'https://investinpuglia.eu/about',
    },
  ],
  creator: 'InvestInPuglia.eu',
}

// Reusable metadata generator
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image,
  noIndex = false,
}: {
  title: string
  description: string
  keywords?: string[]
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords].join(', '),
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@investinpuglia',
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  }
}

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title: 'PIA & Mini PIA Grants Puglia - EU Co-Funded Non-Refundable Grants | InvestInPuglia',
    description: 'Access 30-55% EU-funded grants for Puglia investments. Expert advisory for international investors. Mini PIA (€30K-€5M) and PIA programs. Free consultation.',
    keywords: ['PIA grants', 'Mini PIA Puglia', 'EU funding Italy', 'investment grants', 'Puglia opportunities'],
  },
  about: {
    title: 'About Us - PIA Grant Experts & Investment Advisors | InvestInPuglia',
    description: 'Meet our team of PIA/Mini PIA grant experts. Years of experience helping international investors access EU funding for Puglia investments.',
    keywords: ['PIA experts', 'grant consultants Italy', 'Puglia investment advisors', 'EU funding specialists'],
  },
  services: {
    title: 'PIA Grant Advisory Services - Application to Approval | InvestInPuglia',
    description: 'Complete PIA/Mini PIA grant advisory: eligibility assessment, application preparation, project management. Professional support throughout.',
    keywords: ['PIA grant services', 'grant application Italy', 'EU funding consultant', 'investment advisory Puglia'],
  },
  howItWorks: {
    title: 'How PIA Grants Work - Step-by-Step Process | InvestInPuglia',
    description: 'Understand the PIA/Mini PIA grant process: from initial assessment to fund disbursement. Clear timeline and requirements for EU grants.',
    keywords: ['PIA process', 'grant application steps', 'EU funding timeline', 'investment process Italy'],
  },
  investmentProcess: {
    title: 'Investment Process in Puglia - Complete Guide | InvestInPuglia',
    description: 'Complete guide to investing in Puglia: legal requirements, grant applications, property acquisition, business setup. Expert support included.',
    keywords: ['investment process Italy', 'Puglia investment guide', 'foreign investment Italy', 'business setup Puglia'],
  },
  properties: {
    title: 'Mini PIA Eligible Properties in Puglia - Investment Opportunities',
    description: 'Browse Mini PIA eligible properties across Puglia. Trulli, commercial real estate, hotels, restaurants. 30-55% grant funding available.',
    keywords: ['Mini PIA properties', 'Puglia real estate', 'investment properties Italy', 'trulli for sale'],
  },
  locations: {
    title: 'Investment Locations in Puglia - Cities & Provinces Guide',
    description: 'Discover prime investment locations across Puglia: Bari, Lecce, Brindisi, Taranto. Local incentives, infrastructure, and opportunities.',
    keywords: ['Puglia locations', 'invest in Bari', 'invest in Lecce', 'Puglia provinces', 'Italian cities investment'],
  },
  industries: {
    title: 'Eligible Industries for PIA Grants - Sectors & Opportunities',
    description: 'Industries eligible for PIA/Mini PIA grants: tourism, manufacturing, tech, agriculture, renewable energy. Sector-specific incentives up to 55%.',
    keywords: ['PIA eligible industries', 'Puglia business sectors', 'grant eligible businesses', 'investment sectors Italy'],
  },
  blog: {
    title: 'PIA Grants News & Insights - Investment Updates Puglia',
    description: 'Latest news on PIA/Mini PIA grants, success stories, regulatory updates, and investment opportunities in Puglia. Expert insights and guides.',
    keywords: ['PIA news', 'Puglia investment blog', 'grant updates Italy', 'investment insights'],
  },
  insights: {
    title: 'Investment Insights & Market Analysis - Puglia Economy',
    description: 'In-depth analysis of Puglia investment climate, economic trends, grant statistics, and market opportunities. Data-driven insights.',
    keywords: ['Puglia market analysis', 'investment insights Italy', 'economic data Puglia', 'grant statistics'],
  },
  faq: {
    title: 'PIA & Mini PIA Grants FAQ - Common Questions Answered',
    description: 'Frequently asked questions about PIA/Mini PIA grants: eligibility, amounts, timeline, requirements. Get clear answers from experts.',
    keywords: ['PIA FAQ', 'Mini PIA questions', 'grant FAQ Italy', 'investment questions Puglia'],
  },
  contact: {
    title: 'Contact PIA Grant Experts - Free Consultation | InvestInPuglia',
    description: 'Contact our PIA/Mini PIA grant experts for free consultation. Direct line to Giuseppe De Pasquale. Response within 24 hours.',
    keywords: ['contact PIA expert', 'grant consultation Italy', 'investment advisor contact', 'Puglia consultant'],
  },
  tools: {
    title: 'PIA Grant Tools & Calculators - Free Resources | InvestInPuglia',
    description: 'Free tools for PIA/Mini PIA grants: eligibility calculator, grant estimator, ROI calculator, document checklist. Streamline your application.',
    keywords: ['PIA calculator', 'grant tools', 'investment calculator Italy', 'Mini PIA simulator'],
  },
  privacy: {
    title: 'Privacy Policy - Data Protection | InvestInPuglia',
    description: 'Privacy policy and data protection practices at InvestInPuglia.eu. GDPR compliant. Your information is secure and confidential.',
    keywords: ['privacy policy', 'GDPR Italy', 'data protection'],
  },
  terms: {
    title: 'Terms of Service - Legal Information | InvestInPuglia',
    description: 'Terms of service and legal information for InvestInPuglia.eu services. Grant advisory terms and conditions.',
    keywords: ['terms of service', 'legal terms', 'advisory agreement'],
  },
  cookies: {
    title: 'Cookie Policy - Website Usage | InvestInPuglia',
    description: 'Cookie policy for InvestInPuglia.eu. How we use cookies to improve your experience and provide better grant advisory services.',
    keywords: ['cookie policy', 'website cookies', 'GDPR cookies'],
  },
}