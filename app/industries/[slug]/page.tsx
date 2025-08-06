// app/industries/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'trdbxmjo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Industry type matching your actual API data structure
type Industry = {
  _id: string
  name: string // This matches your API response
  slug: { current: string }
  heroTitle?: string
  heroDescription?: string
  marketSize?: string
  growthRate?: string
  statistics?: {
    businesses: number
    employees: number
  }
}

// CORRECTED QUERY - Uses "industryPage" to match your Sanity schema
const industryQuery = groq`*[_type == "industryPage" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  heroTitle,
  heroDescription,
  marketSize,
  growthRate,
  statistics
}`

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = await client.fetch<Industry>(industryQuery, { slug: params.slug })
  
  if (!industry) {
    return {
      title: 'Industry Not Found | Invest in Puglia'
    }
  }

  return {
    title: `${industry.name} Investment Opportunities in Puglia | Invest in Puglia`,
    description: industry.heroDescription || `Discover investment opportunities in ${industry.name} sector in Puglia with government grants up to 55%.`,
  }
}

export async function generateStaticParams() {
  // CORRECTED QUERY - Uses "industryPage" to match your Sanity schema
  const industries = await client.fetch<{ slug: { current: string } }[]>(
    groq`*[_type == "industryPage"] { slug }`
  )

  return industries.map((industry) => ({
    slug: industry.slug.current,
  }))
}

export default async function IndustryPage({ params }: Props) {
  const industry = await client.fetch<Industry>(industryQuery, { slug: params.slug })

  if (!industry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <a href="/industries" className="text-blue-200 hover:text-white transition-colors">
              ← Back to All Industries
            </a>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {industry.heroTitle || `${industry.name} in Puglia`}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            {industry.heroDescription || `Discover exceptional investment opportunities in ${industry.name} with government grants up to 55% and comprehensive support.`}
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Up to 55%</div>
                <div className="text-sm text-gray-600">Grant Coverage</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">€2.75M</div>
                <div className="text-sm text-gray-600">Max Funding</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Approval Rate</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">30 Days</div>
                <div className="text-sm text-gray-600">Avg Process Time</div>
              </div>
            </div>

            {/* Industry Details */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{industry.name} Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {industry.marketSize && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-900">Market Size</h3>
                    <p className="text-2xl font-bold text-blue-600">{industry.marketSize}</p>
                  </div>
                )}
                
                {industry.growthRate && (
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2 text-green-900">Growth Rate</h3>
                    <p className="text-2xl font-bold text-green-600">+{industry.growthRate}%</p>
                  </div>
                )}
              </div>

              {industry.statistics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {industry.statistics.businesses && (
                    <div className="bg-purple-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-2 text-purple-900">Active Businesses</h3>
                      <p className="text-2xl font-bold text-purple-600">{industry.statistics.businesses.toLocaleString()}</p>
                    </div>
                  )}
                  
                  {industry.statistics.employees && (
                    <div className="bg-orange-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-2 text-orange-900">Total Employment</h3>
                      <p className="text-2xl font-bold text-orange-600">{industry.statistics.employees.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Investment Opportunities */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Invest in {industry.name}?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Strategic Advantages</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span>Prime location in Southern Italy with EU market access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span>Competitive operational costs compared to Northern Italy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span>Skilled workforce and growing talent pool</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">✓</span>
                      <span>Strong government support and incentive programs</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Incentives</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">💰</span>
                      <span>Mini PIA grants up to 55% of eligible costs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">🏢</span>
                      <span>Special Economic Zone (SEZ) benefits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📋</span>
                      <span>Streamlined permitting processes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">🤝</span>
                      <span>Professional advisory support included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Grant Information */}
            <div className="bg-gradient-to-r from-purple-50 to-emerald-50 rounded-xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Grant Opportunities for {industry.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-lg font-semibold mb-3 text-purple-600">Tourism & Hospitality</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-2">55%</div>
                  <div className="text-sm text-gray-600 mb-3">Up to €2.25M</div>
                  <p className="text-sm">For trulli restoration, boutique hotels, and unique accommodations.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-lg font-semibold mb-3 text-emerald-600">Manufacturing & Tech</h3>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">45%</div>
                  <div className="text-sm text-gray-600 mb-3">Up to €5M</div>
                  <p className="text-sm">For innovation hubs, production facilities, and green technology.</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow">
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Food & Agriculture</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">50%</div>
                  <div className="text-sm text-gray-600 mb-3">Up to €2M</div>
                  <p className="text-sm">For agriturismo, wine estates, and farm-to-table concepts.</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Invest in {industry.name}?</h2>
              <p className="text-xl mb-8">Get personalized advice on investment opportunities and grant eligibility in Puglia's thriving {industry.name.toLowerCase()} sector.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://classic.investinpuglia.eu"
                  className="bg-white text-purple-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  Calculate Your Grant Eligibility
                </a>
                <a 
                  href="/consultation"
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Book Advisory Consultation
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/80">
                  Professional support • 95% approval rate • 30 years experience • No deadline applications
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
