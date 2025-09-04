// lib/sitemap-generator.ts

/**
 * Sitemap Generator for InvestInPuglia
 * Optimized for search engines and AI crawlers
 */

export interface SitemapEntry {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

// High-priority pages for SEO
export const primaryPages: SitemapEntry[] = [
  {
    url: 'https://investinpuglia.eu',
    changeFrequency: 'daily',
    priority: 1.0,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/services',
    changeFrequency: 'weekly',
    priority: 0.95,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/portfolio',
    changeFrequency: 'weekly',
    priority: 0.95,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/properties',
    changeFrequency: 'daily',
    priority: 0.95,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/tools/mini-pia-calculator',
    changeFrequency: 'weekly',
    priority: 0.9,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/contact',
    changeFrequency: 'monthly',
    priority: 0.9,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/about',
    changeFrequency: 'monthly',
    priority: 0.85,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/investment-process',
    changeFrequency: 'monthly',
    priority: 0.85,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/book-consultation',
    changeFrequency: 'weekly',
    priority: 0.9,
    lastModified: new Date()
  }
]

// Location pages for local SEO
export const locationPages: SitemapEntry[] = [
  {
    url: 'https://investinpuglia.eu/locations',
    changeFrequency: 'weekly',
    priority: 0.85,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/bari',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/lecce',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/brindisi',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/monopoli',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/ostuni',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/salento',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/valle-ditria',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/locations/gargano',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  }
]

// Industry pages for sector-specific searches
export const industryPages: SitemapEntry[] = [
  {
    url: 'https://investinpuglia.eu/industries',
    changeFrequency: 'weekly',
    priority: 0.85,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/industries/tourism-hospitality',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/industries/manufacturing',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/industries/renewable-energy',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/industries/agtech-agriculture',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/industries/technology',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/industries/logistics',
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date()
  }
]

// Support pages
export const supportPages: SitemapEntry[] = [
  {
    url: 'https://investinpuglia.eu/faq',
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/how-it-works',
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/insights',
    changeFrequency: 'weekly',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/blog',
    changeFrequency: 'daily',
    priority: 0.75,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/mini-pia-guide',
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/join-network',
    changeFrequency: 'monthly',
    priority: 0.65,
    lastModified: new Date()
  }
]

// Legal pages (lower priority but necessary)
export const legalPages: SitemapEntry[] = [
  {
    url: 'https://investinpuglia.eu/privacy',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/terms',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/cookies',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: new Date()
  },
  {
    url: 'https://investinpuglia.eu/legal-notice',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: new Date()
  }
]

// Generate XML sitemap
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified.toISOString().split('T')[0]}</lastmod>` : ''}
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`
  
  return xml
}

// Generate sitemap index for multiple sitemaps
export function generateSitemapIndex(): string {
  const sitemaps = [
    'https://investinpuglia.eu/sitemap-main.xml',
    'https://investinpuglia.eu/sitemap-properties.xml',
    'https://investinpuglia.eu/sitemap-locations.xml',
    'https://investinpuglia.eu/sitemap-industries.xml',
    'https://investinpuglia.eu/sitemap-insights.xml',
    'https://investinpuglia.eu/sitemap-blog.xml'
  ]
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`
  
  return xml
}

// Get all sitemap entries
export function getAllSitemapEntries(): SitemapEntry[] {
  return [
    ...primaryPages,
    ...locationPages,
    ...industryPages,
    ...supportPages,
    ...legalPages
  ]
}