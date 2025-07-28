// app/sitemap.ts
import { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://investinpuglia.eu'
  
  // Fetch all locations
  const locations = await sanityClient.fetch(`
    *[_type == "locationPage"] {
      slug
    }
  `)
  
  // Fetch all industries
  const industries = await sanityClient.fetch(`
    *[_type == "industryPage"] {
      slug
    }
  `)
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/how-it-works',
    '/calculator',
    '/contact',
    '/faq',
    '/blog',
  ]
  
  // Languages
  const languages = ['en', 'it', 'de', 'fr', 'ar', 'zh']
  
  // Generate URLs for all static pages in all languages
  const staticUrls = languages.flatMap(lang =>
    staticPages.map(page => ({
      url: `${baseUrl}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )
  
  // Generate URLs for all location pages
  const locationUrls = languages.flatMap(lang =>
    locations.map((location: any) => ({
      url: `${baseUrl}/${lang}/locations/${location.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )
  
  // Generate URLs for all industry pages
  const industryUrls = languages.flatMap(lang =>
    industries.map((industry: any) => ({
      url: `${baseUrl}/${lang}/industries/${industry.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )
  
  // Add index pages for locations and industries
  const indexUrls = languages.flatMap(lang => [
    {
      url: `${baseUrl}/${lang}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ])
  
  return [...staticUrls, ...locationUrls, ...industryUrls, ...indexUrls]
}
