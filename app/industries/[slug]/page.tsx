// app/industries/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { createClient } from '@sanity/client'
import { groq } from 'next-sanity'

// Create Sanity client with YOUR credentials
const client = createClient({
  projectId: 'trdbxmjo',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Match YOUR exact Sanity structure
type Industry = {
  _id: string
  _type: string
  name: string
  slug: {
    current: string
    _type: string
  }
}

interface Props {
  params: { slug: string }
}

export default async function IndustryPage({ params }: Props) {
  // Fetch the industry data
  const industry = await client.fetch<Industry>(
    groq`*[_type == "industry" && slug.current == $slug][0] {
      _id,
      _type,
      name,
      slug
    }`,
    { slug: params.slug }
  )

  // If no industry found, show 404
  if (!industry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <a href="/industries" className="inline-block text-blue-200 hover:text-white mb-6">
            ← Back to All Industries
          </a>
          
          <h1 className="text-5xl font-bold mb-6">
            {industry.name}
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl">
            Investment opportunities in {industry.name} with up to 55% government grants on €5M projects
          </p>
        </div>
      </section>

      {/* Grant Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Key Stats */}
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

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6">
                {industry.name} Investment Opportunities in Puglia
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Puglia offers exceptional opportunities for {industry.name.toLowerCase()} investments with substantial government support through the Mini PIA grant program.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-600">Grant Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Up to 55% non-repayable grants</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Maximum €2.75M funding (55% of €5M)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>No application deadline</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Professional support included</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-emerald-600">Why Puglia?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Strategic Mediterranean location</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>30% lower costs than Northern Italy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Growing skilled workforce</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>EU market access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-lg p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Invest in {industry.name}?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get your free grant eligibility assessment today
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://classic.investinpuglia.eu"
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                >
                  Calculate Your Grant →
                </a>
                <a 
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition"
                >
                  Contact Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
