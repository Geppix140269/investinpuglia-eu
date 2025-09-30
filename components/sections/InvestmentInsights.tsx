'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getLatestBlogPosts, formatDate, BlogPost } from '@/lib/sanity/blog'
import { Calendar, Clock, ArrowRight, TrendingUp, BookOpen, FileText } from 'lucide-react'

export default function InvestmentInsights() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const latestPosts = await getLatestBlogPosts(3)
        setPosts(latestPosts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-6 bg-gray-200 rounded w-full" />
                  <div className="h-16 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Expert Analysis
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Insights
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Strategic intelligence and expert analysis on Italian investment opportunities,
            EU grants, and market developments in Puglia
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href={`/insights/${post.slug.current}`}>
                    <div className="relative h-48 overflow-hidden">
                      {post.mainImage?.asset?.url ? (
                        <img
                          src={post.mainImage.asset.url}
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="relative w-full h-full overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756572217/investinpuglia/investinpuglia/hero_bg.jpg"
                            alt="Investment insights background"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80 flex items-center justify-center">
                            <FileText className="h-16 w-16 text-white opacity-70" />
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                            {post.categories[0].title}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(post.publishedAt)}
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      5 min read
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      <Link href={`/insights/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More Link */}
                    <Link
                      href={`/insights/${post.slug.current}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                    >
                      Read Full Analysis
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                href="/insights"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition-all"
              >
                <BookOpen className="h-6 w-6 mr-3" />
                Explore All Insights
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>

              <p className="mt-4 text-gray-600">
                Strategic intelligence to maximize your investment success
              </p>
            </div>
          </>
        ) : (
          /* No Posts State */
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Investment Insights Loading
            </h3>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Your published investment insights will appear here once they're live on the platform.
            </p>

            <Link
              href="/consultation"
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Get Personalized Insights Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Get Personalized Investment Guidance
          </h3>

          <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
            Ready to turn insights into action? Book your FREE consultation with our experts
            and discover the perfect investment strategy for your goals.
          </p>

          <Link
            href="/consultation"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
          >
            <Calendar className="h-6 w-6 mr-3" />
            Book FREE Consultation
            <ArrowRight className="ml-3 h-6 w-6" />
          </Link>

          <p className="mt-4 text-blue-200 text-sm">
            30-minute strategic session • No obligations • Expert guidance
          </p>
        </div>
      </div>
    </section>
  )
}