// app/sitemap-industries.xml/route.ts
import { groq } from 'next-sanity'
import { sanity } from '@/lib/sanity'

export async function GET() {
  const baseUrl = 'https://investinpuglia.eu'

  // Fetch ALL industries from Sanity (return empty if not configured)
  let industries: {
    slug: { current: string },
    name: string,
    _updatedAt: string
  }[] = []

  if (sanity) {
    try {
      industries = await sanity.fetch<typeof industries>(
        groq`*[_type == "industry"] {
          slug,
          name,
          _updatedAt
        }`
      )
    } catch (error) {
      console.error('Failed to fetch industries for sitemap:', error)
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/industries</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${industries.map(industry => `
  <url>
    <loc>${baseUrl}/industries/${industry.slug.current}</loc>
    <lastmod>${industry._updatedAt ? new Date(industry._updatedAt).toISOString() : new Date().toISOString()}</lastmod>
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