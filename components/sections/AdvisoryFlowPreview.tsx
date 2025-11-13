/**
 * AdvisoryFlowPreview.tsx
 *
 * Home page section showcasing the 3-Phase Advisory Flow
 * with an interactive circular diagram. Clicking navigates to
 * the full advisory page.
 *
 * Features:
 * - Interactive circular visualization
 * - Hover tooltips showing phase deliverables
 * - Click to navigate to full advisory page
 * - Animated entrance effects
 * - Fully responsive design
 */

'use client'

import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import AdvisoryFlow from '@/components/AdvisoryFlow'
import { ArrowRight, ExternalLink } from 'lucide-react'

export default function AdvisoryFlowPreview() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const handlePhaseClick = () => {
    router.push('/advisory')
  }

  const handleViewFullPage = () => {
    router.push('/advisory')
  }

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-stone-50 via-white to-stone-50 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Our Advisory Process
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto">
            From opportunity identification to project delivery — a structured 3-phase approach
            guiding you through every step of your Puglia investment.
          </p>
        </motion.div>

        {/* Interactive Circular Diagram */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <AdvisoryFlow
            variant="circle"
            compact={true}
            onPhaseSelect={handlePhaseClick}
          />
        </motion.div>

        {/* Instruction text */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-stone-600 mb-6">
            <span className="hidden md:inline">Hover over</span>
            <span className="md:hidden">Tap</span> each phase to see key deliverables
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={handleViewFullPage}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-stone-400 focus:ring-offset-2 group"
          >
            <span>View Full Advisory Process</span>
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>

        {/* Key benefits grid */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              title: 'Strategic Engagement',
              description: 'Expert representation and eligibility assessment',
              color: 'stone'
            },
            {
              title: 'Project Structuring',
              description: 'Legal setup, grant coordination, and financing',
              color: 'stone'
            },
            {
              title: 'Optional Delivery',
              description: 'Ongoing oversight and compliance management',
              color: 'amber'
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className={`
                p-6 rounded-xl shadow-md border-2 bg-white
                ${benefit.color === 'amber'
                  ? 'border-amber-200 hover:border-amber-300'
                  : 'border-stone-200 hover:border-stone-300'
                }
                transition-all duration-300 hover:shadow-lg
              `}
            >
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-stone-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-12"
        >
          <a
            href="/advisory"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium transition-colors group"
          >
            <span>Learn about our Savings Calculator</span>
            <ExternalLink
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
