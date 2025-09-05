// lib/seo-metadata.ts
import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
}

const BASE_URL = 'https://investinpuglia.eu';

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'PIA & Mini PIA Grants Puglia - EU Co-Funded Non-Refundable Grants | Invest in Puglia',
    description: 'Expert advisory for PIA and Mini PIA non-refundable grants. EU co-funded Puglia Regional Development programmes offering up to 55% funding (max €2.75M) for international businesses. Tourism, manufacturing, technology, and agriculture sectors. Free assessment and 95% approval rate.',
    keywords: [
      'PIA grants puglia',
      'Mini PIA grants',
      'PIA Turismo',
      'non refundable grants italy',
      'EU co-funded puglia',
      'Puglia Regional Development programmes',
      'FESR puglia',
      'fondo perduto puglia',
      'PIA Medie Imprese',
      'PIA Piccole Imprese',
      'Mini PIA Turismo',
      'Mini PIA Manifatturiero',
      '55% non refundable grants',
      '€2.75M PIA funding',
      'Puglia Sviluppo',
      'Regione Puglia incentivi',
      'invest in puglia',
      'giuseppe funaro PIA consultant'
    ],
    path: '/'
  },
  consultation: {
    title: 'Free PIA Grant Consultation - Expert Advisory for Puglia Investments',
    description: 'Book your free consultation for PIA and Mini PIA grants in Puglia. Expert assessment of your eligibility for up to €2.75M in non-refundable EU co-funded grants. 95% approval success rate.',
    keywords: [
      'PIA consultation',
      'free grant assessment',
      'PIA eligibility check',
      'Mini PIA application support',
      'Puglia investment advisory',
      'EU grants consultation'
    ],
    path: '/consultation'
  },
  'mini-pia-guide': {
    title: 'Mini PIA Grant Guide - Complete Application Process & Requirements',
    description: 'Comprehensive guide to Mini PIA grants in Puglia. Learn about eligibility, application process, funding amounts (€200K-€2M), and success strategies for tourism, manufacturing, and technology sectors.',
    keywords: [
      'Mini PIA guide',
      'Mini PIA requirements',
      'Mini PIA application process',
      'Mini PIA tourism',
      'Mini PIA manufacturing',
      'Puglia grant guide'
    ],
    path: '/mini-pia-guide'
  },
  insights: {
    title: 'Puglia Investment Insights - Market Analysis & Grant Updates',
    description: 'Latest insights on Puglia investment opportunities, PIA grant updates, success stories, and market analysis. Stay informed about EU funding opportunities and regional development programmes.',
    keywords: [
      'Puglia investment news',
      'PIA grant updates',
      'EU funding news',
      'Puglia market analysis',
      'investment insights italy'
    ],
    path: '/insights'
  }
};

export function generateMetadata(page: string): Metadata {
  const meta = pageMetadata[page] || pageMetadata.home;
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords?.join(', '),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}${meta.path}`,
      siteName: 'Invest in Puglia',
      type: 'website',
      images: [
        {
          url: meta.image || `${BASE_URL}/og-image-default.jpg`,
          width: 1200,
          height: 630,
          alt: meta.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title.substring(0, 70), // Twitter title limit
      description: meta.description.substring(0, 125), // Twitter description limit
      images: [meta.image || `${BASE_URL}/og-image-default.jpg`]
    },
    alternates: {
      canonical: `${BASE_URL}${meta.path}`
    }
  };
}

// Generate FAQ structured data for SEO
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Generate Service structured data for grant advisory
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PIA & Mini PIA Grant Advisory',
    description: 'Expert advisory services for EU co-funded grants in Puglia, Italy',
    provider: {
      '@type': 'Organization',
      name: 'Invest in Puglia',
      url: BASE_URL
    },
    areaServed: {
      '@type': 'Place',
      name: 'Puglia, Italy'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Grant Advisory Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PIA Turismo',
            description: 'Tourism sector grants up to €2.75M'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mini PIA',
            description: 'Small-medium enterprise grants €200K-€2M'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PIA Medie Imprese',
            description: 'Medium enterprise development grants'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5'
    }
  };
}

// Generate BreadcrumbList for better navigation in search results
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`
    }))
  };
}