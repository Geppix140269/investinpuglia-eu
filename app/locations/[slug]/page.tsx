// app/locations/[slug]/page.tsx
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

import { notFound } from 'next/navigation'
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'
import { Metadata } from 'next'

// Create Sanity client
const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Match your Sanity locationPage structure
type LocationPage = {
  _id: string
  _type: string
  city: string
  province: string
  slug: {
    current: string
    _type: string
  }
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  additionalKeywords?: string[]
}

interface Props {
  params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = await client.fetch<LocationPage>(
    groq`*[_type == "locationPage" && slug.current == $slug][0] {
      city,
      province,
      metaTitle,
      metaDescription
    }`,
    { slug: params.slug }
  )

  if (!location) {
    return {
      title: 'Location Not Found | Invest in Puglia',
    }
  }

  return {
    title: location.metaTitle || `Invest in ${location.city}, ${location.province} | Puglia Investment Opportunities`,
    description: location.metaDescription || `Discover investment opportunities in ${location.city}, ${location.province}. Access Mini PIA grants up to 55% on €5M projects. Strategic location with exceptional growth potential.`,
  }
}

export default async function LocationPage({ params }: Props) {
  // Fetch the location data
  const location = await client.fetch<LocationPage>(
    groq`*[_type == "locationPage" && slug.current == $slug][0] {
      _id,
      _type,
      city,
      province,
      slug,
      metaTitle,
      metaDescription,
      focusKeyword,
      additionalKeywords
    }`,
    { slug: params.slug }
  )

  // If no location found, show 404
  if (!location) {
    notFound()
  }

  // Generate location-specific data
  const isCapital = location.city === 'Bari'
  const isCoastal = ['Bari', 'Brindisi', 'Lecce', 'Taranto', 'Polignano a Mare', 'Ostuni'].includes(location.city)
  const isHistoric = ['Lecce', 'Ostuni', 'Cisternino', 'Alberobello'].includes(location.city)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <a href="/locations" className="inline-block text-blue-200 hover:text-white mb-6">
            ← Back to All Locations
          </a>
          
          <h1 className="text-5xl font-bold mb-6">
            Invest in {location.city}, {location.province}
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl">
            {location.metaDescription || `Strategic investment location in ${location.province} with access to Mini PIA grants up to 55% on €5M projects.`}
          </p>

          {/* Location Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {isCapital && (
              <span className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                Regional Capital
              </span>
            )}
            {isCoastal && (
              <span className="bg-blue-400 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                Coastal Location
              </span>
            )}
            {isHistoric && (
              <span className="bg-purple-400 text-purple-900 px-4 py-2 rounded-full text-sm font-semibold">
                Historic City
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Key Investment Data */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Grant Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">55%</div>
                <div className="text-sm text-gray-600">Max Grant</div>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">€2.75M</div>
                <div className="text-sm text-gray-600">Max Funding</div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">€5M</div>
                <div className="text-sm text-gray-600">Max Project</div>
              </div>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Location Overview */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6">
                Why Invest in {location.city}?
              </h2>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700">
                  {location.city} offers exceptional investment opportunities with strategic advantages for businesses 
                  looking to establish or expand operations in Southern Italy. Located in {location.province} province, 
                  this {isCoastal ? 'coastal' : ''} {isHistoric ? 'historic' : ''} location provides access to 
                  generous government incentives through the Mini PIA grant program.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-600">Strategic Advantages</h3>
                  <ul className="space-y-2">
                    {isCapital && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Regional capital with major infrastructure</span>
                      </li>
                    )}
                    {isCoastal && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Coastal location with port facilities</span>
                      </li>
                    )}
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Access to skilled workforce</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Lower operational costs than Northern Italy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>EU market connectivity</span>
                    </li>
                    {isHistoric && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>UNESCO heritage sites and tourism appeal</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-emerald-600">Investment Sectors</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Tourism & Hospitality</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Manufacturing & Industry</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Agriculture & Food Processing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Renewable Energy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Technology & Innovation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Real Estate Development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mini PIA Grant Info */}
            <div className="bg-gradient-to-r from-purple-50 to-emerald-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Mini PIA Grants Available in {location.city}
              </h2>
              <p className="text-gray-700 mb-6">
                The Mini PIA (Piccoli Investimenti Attrattivi) program offers substantial financial support 
                for investments in {location.city}. This non-repayable grant covers up to 55% of eligible 
                investment costs, making it one of the most generous incentive programs in Europe.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-purple-600 mb-2">Tourism Projects</h4>
                  <p className="text-sm text-gray-600">Up to 55% grants for hotels, resorts, and hospitality</p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-emerald-600 mb-2">Manufacturing</h4>
                  <p className="text-sm text-gray-600">45-50% grants for production facilities</p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">Innovation</h4>
                  <p className="text-sm text-gray-600">50% grants for tech and R&D projects</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-lg p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start Your {location.city} Investment Journey
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert guidance on grants, site selection, and investment strategy
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://classic.investinpuglia.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block"
                >
                  Calculate Your Grant →
                </a>
                <a 
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition inline-block"
                >
                  Contact Our Team
                </a>
              </div>
            </div>

            {/* Related Locations */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Other Locations in {location.province}</h3>
              <div className="flex flex-wrap gap-2">
                <a href="/locations" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm transition">
                  View All Locations →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}