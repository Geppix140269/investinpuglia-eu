import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, FileText, Image as ImageIcon } from 'lucide-react'

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
      {/* Header */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-900 opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-sans text-sm font-medium">Back to Home</span>
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Media & Press
          </h1>
          <p className="font-sans text-lg text-neutral-600 max-w-3xl">
            Discover our latest news, press releases, videos, and media resources about investment opportunities in Puglia.
          </p>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Play className="h-6 w-6 text-primary-700" />
            <h2 className="font-display text-3xl font-bold text-navy-900">
              Video Gallery
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Luxury Masseria Hotel Transformation',
                thumbnail: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170284/geppix1402_81420_Luxury_Masseria_Hotel_AFTER__Drone_footage_a_6ee2bd3a-89ac-4bfb-a632-da8fe2d1b53a_0_qioxeb.jpg',
                duration: '0:45'
              },
              {
                title: 'Masseria Pool Descent',
                thumbnail: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170286/geppix1402_81420_Slow_drone_descent_towards_masseria_pool_at__43c0b5ca-59f3-43dd-82f1-5a9f498e6369_0_yuu5cw.jpg',
                duration: '1:12'
              },
              {
                title: 'Beach Club Experience',
                thumbnail: 'https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888562/investinpuglia/hero-videos/beach-club.jpg',
                duration: '0:38'
              }
            ].map((video, idx) => (
              <div key={idx} className="glass-card overflow-hidden group cursor-pointer">
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary-700 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-sans text-base font-semibold text-navy-900">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-6 w-6 text-primary-700" />
            <h2 className="font-display text-3xl font-bold text-navy-900">
              Press Releases & News
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                date: 'February 2025',
                title: 'Over €25M in Grants Secured for Tourism Projects',
                excerpt: 'Invest in Puglia successfully secures substantial government funding for foreign investors in the hospitality sector.'
              },
              {
                date: 'January 2025',
                title: 'New Industrial Investment Opportunities in Puglia',
                excerpt: 'Government announces expanded PIA grants for manufacturing and data center developments in Southern Italy.'
              },
              {
                date: 'December 2024',
                title: 'Baglioni Masseria Muzza - A Success Story',
                excerpt: '5-star luxury resort completion showcases the potential of PIA grant programs for hotel investors.'
              },
              {
                date: 'November 2024',
                title: 'Foreign Investment Guide 2025 Released',
                excerpt: 'Comprehensive guide for international investors looking to leverage Italian government grants in Puglia.'
              }
            ].map((news, idx) => (
              <div key={idx} className="glass-card hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="text-xs font-sans font-semibold text-primary-700 uppercase tracking-wide mb-2">
                    {news.date}
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-3">
                    {news.title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-600 mb-4">
                    {news.excerpt}
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 text-sm font-medium transition-colors">
                    Read More
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <ImageIcon className="h-6 w-6 text-primary-700" />
            <h2 className="font-display text-3xl font-bold text-navy-900">
              Media Kit & Resources
            </h2>
          </div>

          <div className="glass-card">
            <div className="p-8">
              <h3 className="font-display text-2xl font-bold text-navy-900 mb-4">
                Download Our Media Kit
              </h3>
              <p className="font-sans text-base text-neutral-600 mb-6">
                Access high-resolution images, logos, brand guidelines, and press materials about Invest in Puglia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#4A90E2]/80 backdrop-blur-md text-white px-8 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:bg-[#4A90E2] transition-all shadow-lg border border-white/20">
                  Download Media Kit
                </button>
                <Link href="/contact" className="inline-block bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition-all text-center">
                  Contact Press Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
