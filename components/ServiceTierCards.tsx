'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface ServiceTier {
  tier: string
  name: string
  price: string
  duration: string
  description: string
  benefits: string[]
  idealFor: string
  ctaText: string
  ctaLink: string
  highlight?: boolean
}

const serviceTiers: ServiceTier[] = [
  {
    tier: "TIER 0",
    name: "Property Snapshot",
    price: "€500",
    duration: "7-10 days",
    description: "Test my expertise. I'll analyze one property in 7 days - hidden costs, grant eligibility, red flags. If I save you from one bad decision, this pays for itself 100X.",
    benefits: [
      "Analysis of one specific property",
      "Hidden costs breakdown",
      "Grant eligibility assessment (€350K-€2.25M potential)",
      "Red flags report",
      "'Should you proceed or walk away?' recommendation"
    ],
    idealFor: "First-time Italian property investors testing my expertise",
    ctaText: "Learn More",
    ctaLink: "/property-snapshot"
  },
  {
    tier: "TIER 1",
    name: "Investment Foundation",
    price: "€2,500",
    duration: "30-45 days",
    description: "30-45 days of market research, property options, fiscal setup, and decision framework. What takes others 6 months and €50K in mistakes.",
    benefits: [
      "Custom property search (5-8 options)",
      "Comparative market analysis",
      "Fiscal code & bank account coordination",
      "Grant eligibility matrix",
      "Investment decision framework"
    ],
    idealFor: "Serious buyers ready to invest €500K-€2M",
    ctaText: "Learn More",
    ctaLink: "/foundation-package",
    highlight: true
  },
  {
    tier: "TIER 2",
    name: "Full Orchestration",
    price: "2.5-3.5%",
    duration: "6-9 months",
    description: "I orchestrate your entire acquisition, secure your grants, and assemble your team. 6-9 months of expert coordination with zero commission conflicts.",
    benefits: [
      "Property negotiation (I negotiate for YOU)",
      "Complete Mini PIA grant application",
      "Professional team assembly",
      "Architect & contractor vetting",
      "All permits & approvals"
    ],
    idealFor: "Buyers ready to acquire property within 3-6 months",
    ctaText: "Learn More",
    ctaLink: "/full-orchestration"
  },
  {
    tier: "TIER 3",
    name: "Project Oversight",
    price: "€3,000/month",
    duration: "12-24 months",
    description: "Your boots on the ground during construction. Weekly reports, contractor oversight, quality control. €3K/month to protect your €1M investment.",
    benefits: [
      "Weekly site visits with photos/videos",
      "Contractor performance assessment",
      "Quality control checkpoints",
      "Monthly financial reporting",
      "Grant compliance monitoring"
    ],
    idealFor: "Remote investors managing construction from abroad",
    ctaText: "Learn More",
    ctaLink: "/project-oversight"
  }
]

export default function ServiceTierCards() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Start Small, Scale Smart - Proven Value at Every Step
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four service tiers designed to meet you where you are in your investment journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {serviceTiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col ${
                tier.highlight ? 'ring-2 ring-indigo-500 relative transform scale-105' : ''
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-4">
                <div className="text-sm font-bold text-indigo-600 mb-1">{tier.tier}</div>
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                </div>
                <div className="text-sm text-gray-500">{tier.duration}</div>
              </div>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                {tier.description}
              </p>

              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-3">What You Get:</div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-700 mb-1">Ideal For:</div>
                <div className="text-xs text-gray-600">{tier.idealFor}</div>
              </div>

              <Link
                href={tier.ctaLink}
                className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                  tier.highlight
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {tier.ctaText} <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
