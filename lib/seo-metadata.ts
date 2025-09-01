// lib/seo-metadata.ts
import { Metadata } from 'next'

// Base configuration for all pages
export const siteConfig = {
  name: 'InvestInPuglia',
  description: 'Expert PIA and Mini PIA grant advisory. EU co-funded Puglia Regional Development programmes with non-refundable grants up to €2.75M.',
  url: 'https://investinpuglia.eu',
  ogImage: 'https://investinpuglia.eu/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/investinpuglia',
    facebook: 'https://facebook.com/investinpuglia',
    linkedin: 'https://linkedin.com/company/investinpuglia',
    whatsapp: 'https://wa.me/393514001402'
  },
  contact: {
    email: 'info@investinpuglia.eu',
    phone: '+39 351 400 1402',
    whatsapp: '+39 351 400 1402'
  }
}

// SEO configuration for different page types
export const seoConfig = {
  home: {
    title: 'PIA & Mini PIA Grants Advisory - EU Co-Funded Non-Refundable Grants up to €2.75M',
    description: 'Expert advisory for PIA Turismo, Mini PIA, and EU regional development grants in Puglia. Non-refundable co-funded grants up to €2,750,000. Free consultation available.',
    keywords: 'PIA grants, Mini PIA, EU funding Puglia, non-refundable grants Italy, PIA Turismo, FESR Puglia, Puglia Sviluppo, fondo perduto, Italian investment grants, tourism grants Italy'
  },
  portfolio: {
    title: '€100M+ Portfolio | 30 Years Excellence in Hospitality & Heritage',
    description: 'Discover our impressive portfolio: €100M+ in successful projects, €25M grants secured. VOI Alimini, Masseria Muzza, Le Cale d\'Otranto. 30 years of proven excellence in Puglia development.',
    keywords: 'Puglia hotel portfolio, luxury resort development, investment portfolio Italy, PIA Turismo grants, Masseria restoration, Otranto hotels, tourism investment Puglia, Italian hospitality projects'
  },
  properties: {
    title: 'Premium Investment Properties in Puglia | Hotels, Masserie & Resorts',
    description: 'Exclusive portfolio of investment-ready properties in Puglia. Historic masserie, coastal hotels, development land. Complete grant advisory and project management included.',
    keywords: 'Puglia properties for sale, masseria for sale Puglia, hotel investment Italy, coastal property Puglia, investment properties Italy, tourism real estate Puglia'
  },
  blog: {
    title: 'Puglia Investment Insights | Grants, Properties & Market Analysis',
    description: 'Expert insights on PIA grants, Mini PIA funding, Puglia property investment, and EU regional development. Stay updated with the latest investment opportunities and grant deadlines.',
    keywords: 'Puglia investment blog, PIA grant news, Italian property market, EU funding updates, tourism investment insights, Puglia real estate trends'
  },
  contact: {
    title: 'Contact Us | Free PIA Grant Consultation',
    description: 'Schedule your free consultation for PIA and Mini PIA grants. Expert advisory for EU co-funded grants up to €2.75M. Contact our team today.',
    keywords: 'PIA grant consultation, Mini PIA advisory, contact InvestInPuglia, EU grant consultant Italy, Puglia investment advisor'
  },
  locations: {
    title: 'Investment Locations in Puglia | Lecce, Brindisi, Bari & More',
    description: 'Discover prime investment locations across Puglia. From coastal Salento to historic Valle d\'Itria, find the perfect location for your tourism or business investment.',
    keywords: 'Puglia investment locations, Lecce properties, Brindisi real estate, Bari investment, Salento tourism, Valle d\'Itria properties, Gargano development'
  },
  tools: {
    miniPia: {
      title: 'Mini PIA Calculator | Calculate Your Grant Eligibility',
      description: 'Free Mini PIA grant calculator. Calculate your eligibility for non-refundable grants up to €2.25M. Instant results for tourism and business investments in Puglia.',
      keywords: 'Mini PIA calculator, PIA grant calculator, EU grant eligibility, tourism grant calculator, Puglia investment calculator'
    }
  }
}

// Generate complete metadata for a page
export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  image,
  noindex = false,
  type = 'website'
}: {
  title: string
  description: string
  keywords?: string
  path?: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article' | 'profile'
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`
    },
    description,
    keywords,
    authors: [{ name: 'Giuseppe Funaro', url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'it': `${url}?lang=it`,
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@investinpuglia',
      site: '@investinpuglia',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    }
  }
}

// Generate JSON-LD structured data for different page types
export function generateStructuredData(type: string, data: any) {
  const baseOrganization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}/logo.png`,
      "width": 600,
      "height": 60
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone,
      "contactType": "customer service",
      "email": siteConfig.contact.email,
      "availableLanguage": ["English", "Italian", "German", "French", "Spanish"]
    },
    "sameAs": Object.values(siteConfig.links)
  }

  switch (type) {
    case 'home':
      return {
        "@context": "https://schema.org",
        "@graph": [
          baseOrganization,
          {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
            "url": siteConfig.url,
            "name": siteConfig.name,
            "description": siteConfig.description,
            "publisher": {
              "@id": `${siteConfig.url}/#organization`
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${siteConfig.url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "ProfessionalService",
            "@id": `${siteConfig.url}/#service`,
            "name": "PIA & Mini PIA Grant Advisory",
            "description": "Expert advisory for EU co-funded grants in Puglia",
            "provider": {
              "@id": `${siteConfig.url}/#organization`
            },
            "areaServed": {
              "@type": "Place",
              "name": "Puglia, Italy"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Grant Advisory Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "name": "Mini PIA Advisory",
                  "description": "Grants up to €2.25M for tourism projects"
                },
                {
                  "@type": "Offer",
                  "name": "PIA Turismo Advisory",
                  "description": "Grants for large tourism investments"
                }
              ]
            }
          }
        ]
      }

    case 'portfolio':
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Investment Portfolio",
        "description": "€100M+ successful projects in Puglia",
        "url": `${siteConfig.url}/portfolio`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": data.projectCount || 50,
          "itemListElement": data.projects?.map((project: any, index: number) => ({
            "@type": "CreativeWork",
            "position": index + 1,
            "name": project.name,
            "description": project.description,
            "url": `${siteConfig.url}/portfolio/${project.slug}`
          })) || []
        }
      }

    case 'property':
      return {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": data.title,
        "description": data.description,
        "url": `${siteConfig.url}/properties/${data.slug}`,
        "image": data.images,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": data.location?.city,
          "addressRegion": "Puglia",
          "addressCountry": "IT"
        },
        "geo": data.coordinates ? {
          "@type": "GeoCoordinates",
          "latitude": data.coordinates.lat,
          "longitude": data.coordinates.lng
        } : undefined,
        "offers": {
          "@type": "Offer",
          "price": data.price,
          "priceCurrency": "EUR"
        }
      }

    case 'article':
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.description,
        "image": data.image,
        "datePublished": data.publishedAt,
        "dateModified": data.updatedAt || data.publishedAt,
        "author": {
          "@type": "Person",
          "name": data.author || "Giuseppe Funaro",
          "url": `${siteConfig.url}/about`
        },
        "publisher": baseOrganization,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/blog/${data.slug}`
        }
      }

    case 'faq':
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.questions?.map((q: any) => ({
          "@type": "Question",
          "name": q.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.answer
          }
        })) || []
      }

    default:
      return baseOrganization
  }
}

// Breadcrumb structured data generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

// Local Business structured data for location pages
export function generateLocalBusinessSchema(location: any) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `InvestInPuglia - ${location.name}`,
    "description": `Investment advisory services in ${location.name}, Puglia`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": "Puglia",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    },
    "url": `${siteConfig.url}/locations/${location.slug}`,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "priceRange": "€€€",
    "openingHours": "Mo-Fr 09:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  }
}