import { generateMetadata, pageMetadata } from '@/lib/metadata'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

export const metadata = {
  title: 'Investment Insights in Puglia - Expert Analysis | InvestInPuglia.eu',
  description: 'Professional investment intelligence and strategic insights for sophisticated investors exploring opportunities in Puglia, Italy.',
  keywords: 'investment insights puglia, italian investment analysis, eu grants puglia, property investment italy',
}

async function getPosts() {
  const posts = await client.fetch(`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{name, image},
      mainImage,
      categories[]->{title},
      publishedAt,
      excerpt,
      "autoExcerpt": array::join(string::split((pt::text(body)), "")[0..255], "") + "...",
      "readTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `)
  return posts
}

export default async function InsightsPage() {
  const posts = await getPosts()

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  const heroImages = [
    "https://res.cloudinary.com/dusubfxgo/image/upload/v1759148365/geppix1402_81420_Scenic_view_of_the_Taranto_coastline_blendin_2b46ba66-dbc3-425f-83fc-5bbb100d64b3_0_upd1ge.png",
    "https://res.cloudinary.com/dusubfxgo/image/upload/v1759148362/geppix1402_81420_Visual_representation_of_European_Union_fund_5eb17f49-801e-496b-b948-60a933a6e532_3_u34q3f.png",
    "https://res.cloudinary.com/dusubfxgo/image/upload/v1759148361/geppix1402_81420_Visual_representation_of_European_Union_fund_5eb17f49-801e-496b-b948-60a933a6e532_2_mhz8y1.png",
    "https://res.cloudinary.com/dusubfxgo/image/upload/v1759148360/geppix1402_81420_Scenic_view_of_the_Taranto_coastline_blendin_2b46ba66-dbc3-425f-83fc-5bbb100d64b3_2_fkn5pi.png",
    "https://res.cloudinary.com/dusubfxgo/image/upload/v1759148355/geppix1402_81420_A_small_industrial_plant_in_Puglia_converted_49e68ba5-879c-40c3-bc8c-8fe446008551_1_q3crr4.png",
    "https://res.cloudinary.com/dusubfxgo/image/upload/v1759148356/geppix1402_81420_Old_mechanical_factory_in_Taranto_renovated__8cd42447-5cb8-4df2-82d5-7388ed6a3efc_1_y9nwiq.png"
  ]

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Images */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-32 overflow-hidden">
        {/* Background Images Grid */}
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 gap-0 opacity-10">
          {heroImages.map((image, index) => (
            <div key={index} className="relative h-full">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-purple-800/80"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Expert Investment Intelligence
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">In</span>vestment{' '}
            <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">In</span>sights{' '}
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">in</span>{' '}
            <span className="text-white">Puglia</span>
          </h1>

          <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
            Strategic intelligence and expert analysis for sophisticated international investors
            seeking €200K-€2M opportunities in Italy's most promising region
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">EU Grant Intelligence</h3>
              <p className="text-blue-200">Comprehensive analysis of funding opportunities worth millions</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Market Analysis</h3>
              <p className="text-blue-200">Real-time insights on investment trends and ROI potential</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Success Strategies</h3>
              <p className="text-blue-200">Proven methodologies from 30+ years of investment expertise</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/consultation"
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Get Personal Insights
            </a>

            <a
              href="#insights"
              className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Explore Intelligence
            </a>
          </div>

          <p className="mt-8 text-blue-200 text-sm">
            🏆 Trusted by international investors • 30+ years expertise • €millions in successful projects
          </p>
        </div>
      </section>

      {/* Professional Coming Soon Section */}
      <section id="insights" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Exclusive Content Coming Soon
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              Premium Investment Intelligence
              <br />
              <span className="text-blue-600">Under Development</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              We're crafting comprehensive, data-driven insights that will transform how sophisticated investors
              approach opportunities in Puglia. Each piece will be meticulously researched and tailored for
              international decision-makers seeking €200K-€2M opportunities.
            </p>
          </div>

          {/* Coming Soon Content Preview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">EU Grant Mastery</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Complete analysis of Mini PIA, industrial grants, and tourism funding opportunities with real case studies and financial projections.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Coming Soon</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Market Intelligence</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Detailed ROI analysis, market trends, and competitive positioning data for Puglia's most promising sectors.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Coming Soon</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Success Blueprints</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Real investor case studies with complete financial breakdowns, timelines, and lessons learned from 30+ years of experience.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Coming Soon</span>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-white">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Get Instant Access</h3>
                  <p className="text-blue-100 mb-8 text-lg">
                    Why wait for published insights when you can get personalized intelligence today?
                    Book a FREE consultation and receive custom analysis tailored to your specific investment goals.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <svg className="h-6 w-6 text-green-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">30-minute strategic session with Giuseppe Funaro</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-6 w-6 text-green-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Custom grant eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-6 w-6 text-green-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Personalized investment roadmap</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-6 w-6 text-green-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Access to exclusive deal flow</span>
                  </div>
                </div>

                <a
                  href="/consultation"
                  className="block w-full bg-white text-blue-600 text-center py-4 px-8 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Book FREE Consultation Now →
                </a>

                <p className="text-center text-blue-200 text-sm mt-4">
                  🎯 100% FREE • No obligations • Limited slots available
                </p>
              </div>
            </div>
          </div>

          {/* Executive Summary Preview */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              What Makes Our Intelligence Different?
            </h3>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">€50M+</div>
                <p className="text-gray-600">Grants Secured</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                <p className="text-gray-600">Successful Projects</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">15</div>
                <p className="text-gray-600">Countries Served</p>
              </div>
            </div>

            <p className="text-xl text-gray-600 mt-8 max-w-3xl mx-auto">
              Every insight is backed by real market data, successful implementations, and
              deep relationships with EU institutions and Italian authorities.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}