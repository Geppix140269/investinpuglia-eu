// app/sitemap.ts
import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://investinpuglia.eu'
  
  // Fetch ALL locations from Sanity
  const locations = await client.fetch<{ slug: { current: string } }[]>(
    groq`*[_type == "locationPage"] { slug }`
  )
  
  // Fetch ALL industries from Sanity
  const industries = await client.fetch<{ slug: { current: string } }[]>(
    groq`*[_type == "industry"] { slug }`
  )
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/calculator`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/how-it-works`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      priority: 0.7,
    },
  ]
  
  // Location index page
  const locationPages = [
    {
      url: `${baseUrl}/en/locations`,
      lastModified: new Date(),
      priority: 0.9,
    },
    // Generate URLs for ALL locations
    ...locations.map((location) => ({
      url: `${baseUrl}/en/locations/${location.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
  
  // Industry index page
  const industryPages = [
    {
      url: `${baseUrl}/en/industries`,
      lastModified: new Date(),
      priority: 0.9,
    },
    // Generate URLs for ALL industries
    ...industries.map((industry) => ({
      url: `${baseUrl}/en/industries/${industry.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
  
  // Also add non-localized URLs if they exist
  const nonLocalizedPages = [
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      priority: 0.9,
    },
    ...industries.map((industry) => ({
      url: `${baseUrl}/industries/${industry.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
  
  return [...staticPages, ...locationPages, ...industryPages, ...nonLocalizedPages]
}
