// lib/site-metadata.ts
import { Metadata } from 'next'

const SITE_URL = 'https://investinpuglia.eu'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

interface GenerateMetadataProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string[]
}

export function generatePageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords = []
}: GenerateMetadataProps): Metadata {
  const url = `${SITE_URL}${path}`
  
  // Add default keywords to all pages
  const allKeywords = [
    'invest in puglia',
    'puglia grants',
    'EU funding',
    'italian investment',
    'Mini PIA',
    '55% grants',
    '€2.75M funding',
    ...keywords
  ]

  return {
    title,
    description,
    keywords: allKeywords,
    
    // Open Graph for WhatsApp/Facebook
    openGraph: {
      title,
      description,
      url,
      siteName: 'Invest in Puglia',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
      type,
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      site: '@investinpuglia',
      creator: '@investinpuglia',
    },
    
    // Additional SEO tags
    alternates: {
      canonical: url,
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
    
    // Other metadata
    authors: [{ name: 'Invest in Puglia' }],
    creator: 'Invest in Puglia',
    publisher: 'Invest in Puglia',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    
    // Verification codes (if you have them)
    verification: {
      google: 'G-2369HHR8PF',
      // Add others if needed
    },
  }
}
