// app/page.tsx
// Main homepage - Investment Theme

import InvestmentTheme from '@/components/InvestmentTheme'
import { getLatestBlogPosts } from '@/lib/sanity/blog'

export const metadata = {
  title: 'Invest in Puglia | EU Grants, Tax Benefits & Strategic Investment Opportunities',
  description: 'Discover exceptional investment opportunities in Puglia, Italy. Access EU grants up to 60%, 7% flat tax for pensioners, booming tourism market, and premium lifestyle. Expert advisory and project orchestration for foreign investors.',
  keywords: 'Puglia investment, EU grants Italy, Italian tax benefits, Puglia real estate, tourism investment, renewable energy Italy, foreign investment Italy',
}

export default async function HomePage() {
  // Fetch most recent blog post for Insights section
  const latestPosts = await getLatestBlogPosts(1)

  // Extra safety: filter out any posts with null or undefined slugs
  const validPosts = latestPosts.filter(post =>
    post &&
    post.slug &&
    post.slug.current &&
    typeof post.slug.current === 'string'
  )

  return <InvestmentTheme latestPosts={validPosts} />
}
