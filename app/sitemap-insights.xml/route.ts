// app/sitemap-insights.xml/route.ts
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function GET() {
  const baseUrl = 'https://investinpuglia.eu'
  
  // Fetch ALL insights/blog posts from Sanity
  const insights = await client.fetch<{ 
    slug: { current: string }, 
    publishedAt: string,
    _updatedAt: string,
    title: string 
  }[]>(
    groq`*[_type == "post" && publishedAt < now()] { 
      slug, 
      publishedAt, 
      _updatedAt,
      title 
    } | order(publishedAt desc)`
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/insights</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${insights.map(post => `
  <url>
    <loc>${baseUrl}/insights/${post.slug.current}</loc>
    <lastmod>${new Date(post._updatedAt || post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}