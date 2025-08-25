// app/sitemap-locations.xml/route.ts
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function GET() {
  const baseUrl = 'https://investinpuglia.eu'
  
  // Fetch ALL locations from Sanity
  const locations = await client.fetch<{ 
    slug: { current: string },
    name: string,
    _updatedAt: string
  }[]>(
    groq`*[_type == "locationPage"] { 
      slug, 
      name,
      _updatedAt
    }`
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/locations</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${locations.map(location => `
  <url>
    <loc>${baseUrl}/locations/${location.slug.current}</loc>
    <lastmod>${location._updatedAt ? new Date(location._updatedAt).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
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