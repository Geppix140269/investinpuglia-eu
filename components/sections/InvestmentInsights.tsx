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

        {/* Professional Coming Soon Preview */}
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <TrendingUp className="h-10 w-10 text-blue-600" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Premium Investment Intelligence
            <br />
            <span className="text-blue-600">Under Development</span>
          </h3>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We're crafting comprehensive, data-driven insights specifically for sophisticated international investors
            seeking €200K-€2M opportunities in Puglia. Each piece will be meticulously researched and tailored for decision-makers.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-yellow-500">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">EU Grant Mastery</h4>
              <p className="text-gray-600 mb-4">Complete analysis of Mini PIA, industrial grants, and tourism funding with real case studies and financial projections.</p>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Coming Soon</span>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Market Intelligence</h4>
              <p className="text-gray-600 mb-4">Detailed ROI analysis, market trends, and competitive positioning data for Puglia's most promising sectors.</p>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Coming Soon</span>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-500">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Success Blueprints</h4>
              <p className="text-gray-600 mb-4">Real investor case studies with complete financial breakdowns, timelines, and lessons learned.</p>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Coming Soon</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/insights"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition-all"
            >
              <BookOpen className="h-6 w-6 mr-3" />
              Explore Intelligence Hub
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>

            <Link
              href="/consultation"
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Get Instant Insights
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>

          <p className="mt-6 text-gray-600">
            🎯 Why wait for published content when you can get personalized intelligence today?
          </p>
        </div>

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