// components/ZaraThemeDemo.tsx
'use client'

import React from 'react'

/**
 * Zara-Inspired Theme Demo Component
 * Showcases the minimalist black and white design system inspired by Zara
 */
export default function ZaraThemeDemo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimalist */}
      <section className="relative h-screen flex items-center justify-center border-b border-gray-200">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-black">
            INVEST IN PUGLIA
          </h1>
          <p className="font-sans text-sm md:text-base tracking-wide uppercase text-gray-600 mb-12 max-w-2xl mx-auto">
            Where timeless elegance meets modern opportunity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="cta-button cta-primary">
              Explore Opportunities
            </button>
            <button className="cta-button cta-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid - Minimal */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="badge badge-primary mb-4">
            NEW ARRIVALS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-black tracking-tight">
            Featured Properties
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group cursor-pointer">
              {/* Image Placeholder */}
              <div className="aspect-[3/4] bg-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <span className="badge badge-primary text-xs">
                    NEW
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold tracking-tight text-black group-hover:text-gray-600 transition-colors">
                  LUXURY VILLA IN OSTUNI
                </h3>
                <p className="font-sans text-sm text-gray-600 tracking-wide">
                  3 Bedrooms • 2 Bathrooms • 250m²
                </p>
                <p className="font-sans text-base font-medium text-black">
                  €450,000
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="cta-button cta-secondary">
            View All Properties
          </button>
        </div>
      </section>

      {/* Info Section - Two Column */}
      <section className="border-t border-gray-200 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl font-bold text-black mb-6 tracking-tight">
              WHY INVEST IN PUGLIA
            </h2>
            <p className="font-sans text-base text-gray-700 leading-relaxed mb-6">
              Discover the perfect blend of Italian heritage and modern luxury.
              Puglia offers exceptional investment opportunities in one of Europe's
              most sought-after destinations.
            </p>
            <ul className="space-y-4">
              {['Strategic Mediterranean Location', 'Growing Tourism Sector', 'Tax Incentives Available', 'Historic Properties'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 font-sans text-sm tracking-wide">
                  <div className="w-1 h-1 bg-black rounded-full" />
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-6xl font-bold text-black mb-4">
                150+
              </div>
              <p className="font-sans text-sm tracking-widest uppercase text-gray-600">
                Properties Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Minimal */}
      <section className="border-t border-gray-200 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
            STAY INFORMED
          </h2>
          <p className="font-sans text-sm tracking-wide text-gray-600 mb-8">
            RECEIVE THE LATEST INVESTMENT OPPORTUNITIES AND MARKET INSIGHTS
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="flex-1 px-6 py-4 border-2 border-black text-sm tracking-wide uppercase placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-colors font-sans"
            />
            <button className="cta-button cta-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display text-xl font-bold text-black mb-4 tracking-tight">
                INVEST IN PUGLIA
              </h3>
              <p className="font-sans text-xs text-gray-600 tracking-wide">
                Premium real estate investments in Southern Italy
              </p>
            </div>

            {['Company', 'Services', 'Contact'].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-sans text-xs font-medium tracking-widest uppercase text-black mb-4">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {['About', 'Properties', 'Blog', 'Contact'].map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="font-sans text-xs text-gray-600 hover:text-black transition-colors tracking-wide">
                        {link.toUpperCase()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-gray-500 tracking-wide">
              © 2025 INVEST IN PUGLIA. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              {['PRIVACY', 'TERMS', 'COOKIES'].map((link, idx) => (
                <a key={idx} href="#" className="font-sans text-xs text-gray-500 hover:text-black transition-colors tracking-wide">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
