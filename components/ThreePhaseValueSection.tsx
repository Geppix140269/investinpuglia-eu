'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import ThreePhaseFlow from './ThreePhaseFlow'
import CostSavingsVisualizer from './CostSavingsVisualizer'
import { Phone, FileText } from 'lucide-react'

export default function ThreePhaseValueSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="services" className="py-24 px-6 bg-gradient-to-br from-neutral-50 via-white to-blue-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <span className="inline-block bg-gradient-to-r from-[#4A90E2] to-[#34d399] text-white font-sans text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wide mb-6 shadow-lg">
            Our Methodology
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Our 3-Phase Method and Where the Value Comes From
          </h2>
          <p className="font-sans text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three Phases. One Structured Path From Idea to Delivered Project.
          </p>
          <p className="font-sans text-sm text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Our work follows a clear three-phase method. We start by defining and stress-testing the opportunity,
            then structure it into a bankable and fundable project, and finally, if requested, coordinate execution
            through to delivery.
          </p>
        </motion.div>

        {/* Three Phase Flow */}
        <motion.div
          className="mb-16"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
        >
          <ThreePhaseFlow />
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <span className="font-sans text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Value Proposition
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Cost Savings Visualizer */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3 }}
        >
          <CostSavingsVisualizer />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Want to see how this could apply to your project?
            </h3>
            <p className="font-sans text-base text-gray-600 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your investment opportunity, or request a detailed project review
              to understand potential savings and funding opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-white border-2 border-white/40 hover:border-white/60 group"
              style={{
                background: 'rgba(74, 144, 226, 0.9)',
                boxShadow: '0 8px 32px rgba(74, 144, 226, 0.3), 0 4px 12px rgba(74, 144, 226, 0.2)'
              }}
            >
              <Phone className="h-5 w-5" />
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </Link>

            <Link
              href="/contact"
              className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-gray-800 bg-white border-2 border-gray-300 hover:border-[#4A90E2] hover:text-[#4A90E2] group"
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <FileText className="h-5 w-5" />
              <span className="relative z-10">Request a Project Review</span>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-display text-2xl font-bold text-[#4A90E2] mb-2">
                  €25M+
                </div>
                <div className="font-sans text-sm text-gray-600">
                  In Grants Secured
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[#34d399] mb-2">
                  30+ Years
                </div>
                <div className="font-sans text-sm text-gray-600">
                  Renovation Expertise
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[#f59e0b] mb-2">
                  50+ Projects
                </div>
                <div className="font-sans text-sm text-gray-600">
                  Successfully Delivered
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
