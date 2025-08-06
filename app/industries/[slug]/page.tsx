// app/industries/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'

// Force dynamic rendering - THIS IS CRITICAL
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Create Sanity client
const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production', 
  apiVersion: '2024-01-01',
  useCdn: false, // Don't use CDN for dynamic pages
})

// Industry type matching your ACTUAL Sanity data
type Industry = {
  _id: string
  _type: string
  name: string
  slug: { 
    current: string
    _type: string
  }
}

// Simple query using confirmed structure
const industryQuery = groq`*[_type == "industry" && slug.current == $slug][0] {
  _id,
  _type,
  name,
  slug
}`

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const industry = await client.fetch<Industry>(industryQuery, { slug: params.slug })
    
    if (!industry) {
      return {
        title: 'Industry Not Found | Invest in Puglia'
      }
    }

    return {
      title: `${industry.name} Investment Opportunities in Puglia | Invest in Puglia`,
      description: `Discover investment opportunities in ${industry.name} sector in Puglia with government grants up to 55% and comprehensive support.`,
    }
  } catch (error) {
    return {
      title: 'Industry | Invest in Puglia'
    }
  }
}

// NO generateStaticParams - let pages be dynamic

export default async function IndustryPage({ params }: Props) {
  try {
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
              {industry.name} Investment in Puglia
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
              Discover exceptional investment opportunities in {industry.name} with government grants up to 55% and comprehensive support from our expert team.
            </p>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Grant Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-500">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Up to 55%</div>
                  <div className="text-sm text-gray-600">Grant Coverage</div>
                  <div className="text-xs text-purple-500 mt-1">Non-repayable</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-emerald-500">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">€2.75M</div>
                  <div className="text-sm text-gray-600">Max Grant Amount</div>
                  <div className="text-xs text-emerald-500 mt-1">55% of €5M project</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Approval Rate</div>
                  <div className="text-xs text-blue-500 mt-1">With our guidance</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-orange-500">
                  <div className="text-3xl font-bold text-orange-600 mb-2">No Deadline</div>
                  <div className="text-sm text-gray-600">Continuous Funding</div>
                  <div className="text-xs text-orange-500 mt-1">Sportello aperto</div>
                </div>
              </div>

              {/* Industry Focus Section */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{industry.name} Investment Opportunities</h2>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    {industry.name} represents one of Puglia&apos;s most dynamic and promising sectors for international investment. 
                    With strategic location advantages, competitive costs, and substantial government incentives, 
                    this sector offers exceptional opportunities for growth and profitability.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                      <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">✓</span>
                      Strategic Advantages
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span>Prime location in Southern Italy with EU market access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span>Competitive operational costs compared to Northern Italy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span>Growing skilled workforce and talent pool</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span>Strong regional government support and incentives</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">€</span>
                      Financial Benefits
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>Mini PIA grants covering up to 55% of eligible costs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>Special Economic Zone (SEZ) additional benefits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>Streamlined permitting and approval processes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>Professional advisory support included</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Invest in {industry.name}?</h2>
                <p className="text-xl mb-8 text-white/90">
                  Get personalized advice on investment opportunities and grant eligibility in Puglia&apos;s thriving {industry.name.toLowerCase()} sector.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <a 
                    href="https://classic.investinpuglia.eu"
                    className="bg-white text-purple-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                  >
                    Calculate Your Grant Eligibility
                    <span className="ml-2">→</span>
                  </a>
                  <a 
                    href="/consultation"
                    className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                  >
                    Book Advisory Consultation
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching industry:', error)
    notFound()
  }
}
