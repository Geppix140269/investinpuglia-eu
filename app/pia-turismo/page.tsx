import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Calculator, Award, TrendingUp, FileText } from 'lucide-react'

export default function PIATurismoPage() {
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

          <div className="inline-block bg-orange-500 text-white font-sans text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wide mb-6">
            💰 Up to €20M in Grants
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            PIA Turismo Grant
          </h1>
          <p className="font-sans text-lg text-neutral-600 max-w-3xl">
            The Tourism PIA Grant provides up to <strong>35% non-refundable funding</strong> for major hotel, resort, and hospitality projects in Puglia and Southern Italy.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-12 text-center">
            Why Choose PIA Turismo?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: '35% Grant Rate',
                description: 'Up to 35% of eligible project costs covered by non-refundable government grants'
              },
              {
                icon: TrendingUp,
                title: 'Up to €20M',
                description: 'Maximum grant amount of €20 million for large-scale tourism developments'
              },
              {
                icon: Check,
                title: 'Non-Refundable',
                description: 'Grants do not need to be repaid - pure investment capital for your project'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="glass-card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="font-sans text-sm text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligible Projects */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-12">
            Eligible Tourism Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Hotels & Resorts',
                items: [
                  '4-star and 5-star hotels',
                  'Luxury resort developments',
                  'Boutique hotel conversions',
                  'Historic building transformations'
                ]
              },
              {
                title: 'Hospitality Facilities',
                items: [
                  'Spa and wellness centers',
                  'Conference and event venues',
                  'Restaurants and fine dining',
                  'Beach clubs and leisure facilities'
                ]
              },
              {
                title: 'Tourist Accommodations',
                items: [
                  'Agriturismo and farm stays',
                  'Masseria restorations',
                  'Villa rental complexes',
                  'Bed & Breakfast facilities'
                ]
              },
              {
                title: 'Supporting Infrastructure',
                items: [
                  'Tourist information centers',
                  'Parking and transport facilities',
                  'Recreational amenities',
                  'Cultural and heritage sites'
                ]
              }
            ].map((category, idx) => (
              <div key={idx} className="glass-card">
                <h3 className="font-display text-xl font-bold text-navy-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary-700 flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-sm text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Requirements */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-12">
            Investment Requirements
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card border-l-4 border-primary-700">
              <h3 className="font-display text-xl font-bold text-navy-900 mb-4">
                Minimum Investment
              </h3>
              <div className="space-y-3 font-sans text-sm text-neutral-700">
                <p>
                  <strong>Minimum project size:</strong> €1,500,000
                </p>
                <p>
                  <strong>Grant amount:</strong> 35% of eligible costs
                </p>
                <p>
                  <strong>Maximum grant:</strong> €20,000,000
                </p>
                <p>
                  <strong>Self-financing required:</strong> At least 25% equity
                </p>
              </div>
            </div>

            <div className="glass-card border-l-4 border-secondary-700">
              <h3 className="font-display text-xl font-bold text-navy-900 mb-4">
                Eligible Costs
              </h3>
              <ul className="space-y-3">
                {[
                  'Building construction and renovation',
                  'Equipment and furnishings',
                  'Technology and systems',
                  'Machinery and installations',
                  'Professional fees (limited)',
                  'Energy efficiency improvements'
                ].map((cost, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary-700 flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-neutral-700">{cost}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-12">
            Success Stories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Baglioni Masseria Muzza',
                location: 'Otranto',
                grant: '€2.1M',
                description: '17th century masseria transformed into Baglioni 5-star luxury resort'
              },
              {
                name: 'Masseria Montelauro',
                location: 'Otranto',
                grant: '€1.5M',
                description: '5-star luxury hotel with 30 suites, spa & fine dining restaurant'
              },
              {
                name: 'Le Cale d\'Otranto',
                location: 'Otranto',
                grant: '€1.2M',
                description: 'Complete renovation of beach resort structures'
              }
            ].map((project, idx) => (
              <div key={idx} className="glass-card">
                <div className="mb-4">
                  <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                    {project.grant} Grant
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-2">
                    {project.name}
                  </h3>
                  <div className="text-sm text-neutral-600 mb-3">
                    📍 {project.location}
                  </div>
                </div>
                <p className="font-sans text-sm text-neutral-700">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card text-center">
            <div className="p-12">
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                Ready to Apply for PIA Turismo?
              </h2>
              <p className="font-sans text-base text-neutral-600 mb-8 max-w-2xl mx-auto">
                Our team has secured over €25M in grants for tourism projects. Let us guide you through the application process.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/property-calculator" className="inline-block bg-[#4A90E2]/80 backdrop-blur-md text-white px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:bg-[#4A90E2] transition-all shadow-lg border border-white/20">
                  <Calculator className="inline h-4 w-4 mr-2" />
                  Calculate Your Grant
                </Link>
                <Link href="/consultation" className="inline-block bg-orange-500/80 backdrop-blur-md text-white px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:bg-orange-500 transition-all shadow-lg border border-white/20">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
