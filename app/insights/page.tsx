import { generateMetadata, pageMetadata } from '@/lib/metadata'
import { sanity as client } from '@/lib/sanity'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

export const metadata = {
  title: 'Investment Insights in Puglia - Expert Analysis | InvestInPuglia.eu',
  description: 'Professional investment intelligence and strategic insights for sophisticated investors exploring opportunities in Puglia, Italy.',
  keywords: 'investment insights puglia, italian investment analysis, eu grants puglia, property investment italy',
}

async function getPosts() {
  if (!client) return []

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

      {/* Blog Posts Section */}
      <section id="insights" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="bg-blue-600 w-1 h-8 mr-4"></span>
                Featured Investment Intelligence
              </h2>
              <article className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="grid md:grid-cols-2">
                  {featuredPost.mainImage && (
                    <Link href={`/insights/${featuredPost.slug.current}`} className="relative overflow-hidden">
                      <img
                        src={urlFor(featuredPost.mainImage).width(1200).height(800).url()}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  )}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    {featuredPost.categories && (
                      <div className="flex gap-2 mb-4">
                        {featuredPost.categories.map((category: any) => (
                          <span key={category.title} className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                      <Link href={`/insights/${featuredPost.slug.current}`}>
                        {featuredPost.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 mb-6 text-lg line-clamp-3">
                      {featuredPost.excerpt || featuredPost.autoExcerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {featuredPost.author?.image && (
                          <img
                            src={urlFor(featuredPost.author.image).width(40).height(40).url()}
                            alt={featuredPost.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{featuredPost.author?.name || 'Giuseppe Funaro'}</p>
                          <p className="text-gray-500">{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      {featuredPost.readTime && (
                        <span className="text-sm text-gray-500">{featuredPost.readTime} min read</span>
                      )}
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/insights/${featuredPost.slug.current}`}
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Read Full Analysis
                        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {otherPosts.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="bg-blue-600 w-1 h-8 mr-4"></span>
                Latest Investment Insights
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {otherPosts.map((post: any) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {post.mainImage && (
                      <Link href={`/insights/${post.slug.current}`} className="relative block overflow-hidden h-48">
                        <img
                          src={urlFor(post.mainImage).width(800).height(450).url()}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    )}

                    <div className="p-6">
                      {post.categories && (
                        <div className="flex gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category: any) => (
                            <span key={category.title} className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-full">
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/insights/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                        {post.excerpt || post.autoExcerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          {post.author?.image && (
                            <img
                              src={urlFor(post.author.image).width(24).height(24).url()}
                              alt={post.author.name}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span>{post.author?.name || 'Giuseppe Funaro'}</span>
                        </div>
                        {post.readTime && (
                          <span>{post.readTime} min</span>
                        )}
                      </div>

                      <Link
                        href={`/insights/${post.slug.current}`}
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
                      >
                        Read More
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Investment Insights Loading</h3>
              <p className="text-gray-500">Your published insights will appear here shortly.</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Get Personalized Investment Intelligence</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Ready to apply these insights to your specific investment goals? Book a FREE consultation
              with our experts for personalized guidance worth €thousands in strategic value.
            </p>
            <a
              href="/consultation"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Book FREE Expert Consultation
            </a>
            <p className="mt-4 text-blue-200 text-sm">
              ⚡ 30-minute session • 100% FREE • No obligations • Expert analysis worth €5,000+
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}