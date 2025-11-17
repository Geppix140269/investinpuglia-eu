'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Reasons data structure
interface Reason {
  number: number
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    number: 1,
    title: 'EU Non-Refundable Grants up to 60%',
    description: 'Access substantial government funding for tourism and industrial projects. Grants cover up to 60% of eligible costs with no repayment required.'
  },
  {
    number: 2,
    title: '7% Flat Tax for Foreign Pensioners',
    description: 'Enjoy one of Europe\'s most attractive tax regimes. Foreign retirees benefit from a special 7% flat tax rate for ten years.'
  },
  {
    number: 3,
    title: 'Growing Real Estate Market',
    description: 'Property values are rising steadily as international investors discover Puglia. Historic trulli and coastal properties offer exceptional value compared to other Mediterranean regions.'
  },
  {
    number: 4,
    title: 'Exploding Tourism Demand',
    description: 'Tourist arrivals grow 15-20% annually. Puglia is Italy\'s fastest-growing tourist destination, attracting sophisticated international travelers year-round.'
  },
  {
    number: 5,
    title: 'High Yield on Holiday Rentals',
    description: 'Premium properties generate 8-12% annual returns. The extended tourist season and strong demand create exceptional rental income opportunities.'
  },
  {
    number: 6,
    title: 'Mediterranean Strategic Location',
    description: 'Direct access to European, Middle Eastern, and North African markets. Major port of Bari connects to global trade routes and logistics networks.'
  },
  {
    number: 7,
    title: 'Renewable Energy Leadership',
    description: 'Italy\'s renewable energy hub with abundant solar and wind resources. Government incentives make Puglia ideal for green energy investments and data centers.'
  },
  {
    number: 8,
    title: 'Lower Operating Costs',
    description: 'Labor, real estate, and operational expenses are 30-40% below Northern Italy. Quality workforce and modern infrastructure at competitive rates.'
  },
  {
    number: 9,
    title: 'Exceptional Lifestyle',
    description: '300+ days of sunshine, pristine beaches, UNESCO sites, and world-class cuisine. Combine profitable investment with Mediterranean quality of life.'
  },
  {
    number: 10,
    title: 'EU Funding Transforming the Region',
    description: 'Billions in EU infrastructure investment modernizing transportation, digital connectivity, and public services. Strategic timing for early investors.'
  }
]

/**
 * InvestReasons Component
 *
 * Displays 10 compelling reasons to invest in Puglia with:
 * - Animated card grid
 * - Hover effects (scale, shadow, color shift)
 * - Scroll-triggered fade-in animations
 * - Responsive layout (mobile: 1 col, desktop: 3 cols)
 * - SEO-optimized structure
 * - Premium design matching InvestInPuglia.eu brand
 */
export default function InvestReasons() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-[#c9a350]/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(11,27,63,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(11,27,63,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0b1b3f] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <span className="font-sans text-xs font-bold uppercase tracking-wide">
              🏆 Investment Opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0b1b3f] mb-6 leading-tight">
            Top 10 Reasons to Invest in Puglia
          </h2>

          {/* Subheading */}
          <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why sophisticated investors are choosing Puglia for exceptional returns,
            government support, and unparalleled Mediterranean lifestyle.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.number}
              className="group"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
              }}
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:border-[#c9a350]/30 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                {/* Gold Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a350] to-[#d4af37] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#0b1b3f] to-[#1a2e5a] text-white rounded-xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <span className="font-display text-2xl font-bold">
                    {reason.number}
                  </span>
                </div>

                {/* Card Content */}
                <div>
                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-[#0b1b3f] mb-4 leading-tight group-hover:text-[#c9a350] transition-colors duration-300">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a350]/0 via-[#c9a350]/0 to-[#c9a350]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="relative bg-gradient-to-br from-[#0b1b3f] via-[#1a2e5a] to-[#0b1b3f] rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden"
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(201,163,80,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(201,163,80,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          {/* Gold Accent Lines */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a350] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a350] to-transparent" />

          {/* CTA Content */}
          <div className="relative z-10 text-center">
            {/* Icon or Accent */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#c9a350]/20 rounded-full mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c9a350] to-[#d4af37] rounded-full flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-[#0b1b3f]" />
              </div>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Ready to Evaluate Your Investment in Puglia?
            </h2>

            {/* Description */}
            <p className="font-sans text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a strategic consultation with our investment advisors to discuss your project,
              explore funding opportunities, and develop a customized roadmap to success.
            </p>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a350] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e0c050] text-[#0b1b3f] px-10 py-5 rounded-full font-sans text-base font-bold uppercase tracking-wide shadow-2xl hover:shadow-[#c9a350]/50 hover:scale-105 transition-all duration-300 group"
            >
              <span>Book a Strategic Call</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Subtext */}
            <p className="font-sans text-sm text-gray-400 mt-6">
              Free 30-minute consultation • No obligation • Expert guidance
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
