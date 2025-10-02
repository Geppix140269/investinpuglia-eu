// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://investinpuglia.eu'
  
  // Try to fetch from Sanity but handle errors gracefully
  let locations: any[] = []
  let industries: any[] = []
  let insights: any[] = []
  
  try {
    const { client } = await import('@/sanity/lib/client')
    const { groq } = await import('next-sanity')
    
    // Fetch ALL locations from Sanity
    locations = await client.fetch<{ slug: { current: string } }[]>(
      groq`*[_type == "locationPage"] { slug }`
    ).catch(() => [])
    
    // Fetch ALL industries from Sanity
    industries = await client.fetch<{ slug: { current: string } }[]>(
      groq`*[_type == "industry"] { slug }`
    ).catch(() => [])
    
    // Fetch ALL insights/blog posts from Sanity
    insights = await client.fetch<{ slug: { current: string }, publishedAt: string }[]>(
      groq`*[_type == "post" && publishedAt < now()] { slug, publishedAt } | order(publishedAt desc)`
    ).catch(() => [])
  } catch (error) {
    console.error('Error fetching Sanity data for sitemap:', error)
  }
  
  // Static pages - UPDATED WITH CORRECT URLS (no /en prefix)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mini-pia-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/mini-pia-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book-consultation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/join-network`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/investment-process`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/renovation-expertise`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Service Tier Pages (NEW - High Priority for SEO)
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/property-snapshot`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/foundation-package`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/full-orchestration`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/project-oversight`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
  ]
  
  // Location pages (without /en prefix)
  const locationPages = locations.length > 0 ? [
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Generate URLs for ALL locations
    ...locations.map((location) => ({
      url: `${baseUrl}/locations/${location.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ] : []
  
  // Industry pages (without /en prefix)
  const industryPages = industries.length > 0 ? [
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Generate URLs for ALL industries
    ...industries.map((industry) => ({
      url: `${baseUrl}/industries/${industry.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ] : []
  
  // Insights/Blog pages (SEO-focused, high priority for AI crawlers)
  const insightsPages = insights.length > 0 ? [
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    ...insights.map((post) => ({
      url: `${baseUrl}/insights/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ] : []
  
  // Blog pages (if different from insights)
  const blogPages = insights.length > 0 ? insights.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) : []
  
  // Combine all pages and return
  return [
    ...staticPages,
    ...locationPages,
    ...industryPages,
    ...insightsPages,
    ...blogPages
  ]
}
