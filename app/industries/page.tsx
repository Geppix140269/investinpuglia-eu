// app/industries/page.tsx
// Fixed version using createClient directly

import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

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
const industriesQuery = groq`*[_type == "industry" || _type == "industryPage"] | order(industry asc) {
  _id,
  "industry": coalesce(name, industry),
  slug,
  "heroTitle": coalesce(heroTitle, name),
  "heroDescription": coalesce(heroDescription, "Investment opportunities"),
  "marketSize": coalesce(marketSize, "Growing"),
  "growthRate": coalesce(growthRate, "10"),
  statistics
}`

export const metadata: Metadata = {
  title: 'Industries for Investment in Puglia | Invest in Puglia',
  description: 'Explore investment opportunities across key industries in Puglia: Tourism, Agriculture, Aerospace, Renewable Energy, Manufacturing, and more.',
}

export default async function IndustriesPage() {
  const industries = await client.fetch<Industry[]>(industriesQuery)

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

