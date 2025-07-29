// ========================================
// app/industries/[slug]/page.tsx
// Fixed version with correct _type
// ========================================

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'

// At the top of app/industries/[slug]/page.tsx
// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

type Props = {
  params: { slug: string }
}

// Updated industry type to match your schema
type Industry = {
  _id: string
  name: string // Changed from 'industry' to 'name'
  slug: { current: string }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  heroSection?: {
    title: string
    description: string
  }
  overview?: {
    marketSize: string
    growthRate: number
    keyAdvantages: string[]
  }
  grants?: Array<{
    _key: string
    name: string
    amount: string
    description: string
  }>
  majorPlayers?: string[]
  opportunities?: Array<{
    _key: string
    type: string
    description: string
    investmentRange: string
  }>
  statistics?: {
    numberOfBusinesses: number
    employees: number
    annualExports: string
    gdpContribution: number
  }
}

// Updated query to match your schema
const industryQuery = groq`*[_type == "industry" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  seo,
  heroSection,
  overview,
  grants,
  majorPlayers,
  opportunities,
  statistics
}`

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const industry = await client.fetch<Industry>(industryQuery, { slug })

  if (!industry) {
    return { title: 'Industry Not Found' }
  }

  return {
    title: industry.seo?.metaTitle || `${industry.name} Investment in Puglia`,
    description: industry.seo?.metaDescription || industry.heroSection?.description?.substring(0, 160),
  }
}

export async function generateStaticParams() {
  const industries = await client.fetch<{ slug: { current: string } }[]>(
    groq`*[_type == "industry"] { slug }`
  )

  return industries.map((industry) => ({
    slug: industry.slug.current,
  }))
}

export default async function IndustryPage({ params: { slug } }: Props) {
  const industry = await client.fetch<Industry>(industryQuery, { slug })

  if (!industry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <Link href="/industries" className="text-blue-200 hover:text-white mb-6 inline-block">
            ← Back to Industries
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {industry.heroSection?.title || industry.name}
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl">
            {industry.heroSection?.description || `Invest in ${industry.name} in Puglia`}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {industry.overview?.marketSize && (
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">{industry.overview.marketSize}</div>
                <div className="text-sm">Market Size</div>
              </div>
            )}
            {industry.overview?.growthRate && (
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">+{industry.overview.growthRate}%</div>
                <div className="text-sm">Growth Rate</div>
              </div>
            )}
            {industry.statistics && (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {industry.statistics.numberOfBusinesses?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm">Businesses</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {industry.statistics.employees?.toLocaleString() || 'N/A'}
                  </div>
                  <div className="text-sm">Employees</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Key Advantages */}
          {industry.overview?.keyAdvantages && industry.overview.keyAdvantages.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Key Advantages</h2>
              <ul className="space-y-3">
                {industry.overview.keyAdvantages.map((advantage, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Grants */}
          {industry.grants && industry.grants.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Available Grants & Incentives</h2>
              <div className="space-y-6">
                {industry.grants.map((grant, i) => (
                  <div key={grant._key || i} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold">{grant.name}</h3>
                      <span className="font-bold text-blue-600">{grant.amount}</span>
                    </div>
                    <p className="text-gray-600">{grant.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Investment Opportunities */}
          {industry.opportunities && industry.opportunities.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Investment Opportunities</h2>
              <div className="space-y-6">
                {industry.opportunities.map((opp, i) => (
                  <div key={opp._key || i} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-2">{opp.type}</h3>
                    <p className="text-gray-600 mb-3">{opp.description}</p>
                    <p className="text-purple-600 font-semibold">
                      Investment Range: {opp.investmentRange}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Major Players */}
          {industry.majorPlayers && industry.majorPlayers.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Major Players</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {industry.majorPlayers.map((player, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                    <span>{player}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Statistics */}
          {industry.statistics && (
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Industry Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                {industry.statistics.annualExports && (
                  <div>
                    <span className="text-gray-600">Annual Exports:</span>
                    <span className="font-semibold ml-2">{industry.statistics.annualExports}</span>
                  </div>
                )}
                {industry.statistics.gdpContribution && (
                  <div>
                    <span className="text-gray-600">GDP Contribution:</span>
                    <span className="font-semibold ml-2">{industry.statistics.gdpContribution}%</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Invest in {industry.name}?</h2>
            <p className="text-gray-600 mb-6">
              Calculate your potential grants and get personalized support from our team.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/calculator" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Calculate Your Grant
              </Link>
              <Link href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
