// app/industries/page.tsx
// Simple version without i18n complications - single language (English)

import { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

// Industry type
type Industry = {
  _id: string
  industry: string
  slug: { current: string }
  heroTitle: string
  heroDescription: string
  marketSize: string
  growthRate: string
  statistics?: {
    businesses: number
    employees: number
  }
}

// Query
const industriesQuery = groq`*[_type == "industryPage"] | order(industry asc) {
  _id,
  industry,
  slug,
  heroTitle,
  heroDescription,
  marketSize,
  growthRate,
  statistics
}`

export const metadata: Metadata = {
  title: 'Industries for Investment in Puglia | Invest in Puglia',
  description: 'Explore investment opportunities across key industries in Puglia: Tourism, Agriculture, Aerospace, Renewable Energy, Manufacturing, and more.',
}

export default async function IndustriesPage() {
  const industries = await sanityFetch<Industry[]>({
    query: industriesQuery,
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Industries for Investment in Puglia
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            Discover thriving sectors with exceptional growth potential. From tourism to technology, 
            Puglia offers diverse investment opportunities backed by generous incentives.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry._id}
                href={`/industries/${industry.slug.current}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {industry.industry}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {industry.heroDescription}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Market Size</span>
                      <span className="font-semibold">{industry.marketSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Growth Rate</span>
                      <span className="font-semibold text-green-600">+{industry.growthRate}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-blue-600 font-semibold">
                    Explore opportunities →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ===== INDIVIDUAL INDUSTRY PAGE =====
// app/industries/[slug]/page.tsx

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

type Props = {
  params: { slug: string }
}

// Full industry type
type Industry = {
  _id: string
  industry: string
  slug: { current: string }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  heroTitle: string
  heroDescription: string
  marketSize: string
  growthRate: string
  keyAdvantages: string[]
  availableGrants: Array<{
    grantName: string
    amount: string
    description: string
  }>
  majorPlayers: string[]
  investmentOpportunities: Array<{
    type: string
    description: string
    investmentRange: string
  }>
  statistics?: {
    businesses: number
    employees: number
    exports: string
    contribution: string
  }
}

const industryQuery = groq`*[_type == "industryPage" && slug.current == $slug][0] {
  _id,
  industry,
  slug,
  seo,
  heroTitle,
  heroDescription,
  marketSize,
  growthRate,
  keyAdvantages,
  availableGrants,
  majorPlayers,
  investmentOpportunities,
  statistics
}`

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const industry = await sanityFetch<Industry>({
    query: industryQuery,
    params: { slug },
  })

  if (!industry) {
    return { title: 'Industry Not Found' }
  }

  return {
    title: industry.seo?.metaTitle || `${industry.industry} Investment in Puglia`,
    description: industry.seo?.metaDescription || industry.heroDescription.substring(0, 160),
  }
}

export default async function IndustryPage({ params: { slug } }: Props) {
  const industry = await sanityFetch<Industry>({
    query: industryQuery,
    params: { slug },
  })

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{industry.heroTitle}</h1>
          <p className="text-xl text-blue-100 max-w-4xl">{industry.heroDescription}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{industry.marketSize}</div>
              <div className="text-sm">Market Size</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">+{industry.growthRate}%</div>
              <div className="text-sm">Growth Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Key Advantages */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Advantages</h2>
            <ul className="space-y-3">
              {industry.keyAdvantages.map((advantage, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Grants */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Available Grants & Incentives</h2>
            <div className="space-y-6">
              {industry.availableGrants.map((grant, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{grant.grantName}</h3>
                    <span className="font-bold text-blue-600">{grant.amount}</span>
                  </div>
                  <p className="text-gray-600">{grant.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Investment Opportunities */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Investment Opportunities</h2>
            <div className="space-y-6">
              {industry.investmentOpportunities.map((opp, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{opp.type}</h3>
                  <p className="text-gray-600 mb-3">{opp.description}</p>
                  <p className="text-purple-600 font-semibold">
                    Investment Range: {opp.investmentRange}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Invest in {industry.industry}?</h2>
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
