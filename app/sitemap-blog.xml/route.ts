// app/sitemap-blog.xml/route.ts
// Redirect to insights sitemap (same content)
export async function GET() {
  return Response.redirect('https://investinpuglia.eu/sitemap-insights.xml', 301)
}