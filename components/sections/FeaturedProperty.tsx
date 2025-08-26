'use client'

import Link from 'next/link'
import CloudinaryImage from '@/components/properties/CloudinaryImage'
import { MapPin, Euro, Maximize, TrendingUp, ArrowRight, Building2, Trees } from 'lucide-react'

export default function FeaturedProperty() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-purple-600 font-semibold text-sm tracking-wide uppercase">
            Featured Investment Opportunity
          </span>
          <h2 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Palazzo Palmariggi
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Historic 1900s palazzo perfect for boutique hotel conversion with Mini PIA grant eligibility
          </p>
        </div>

        {/* Property Showcase */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="relative h-96 lg:h-full">
              <CloudinaryImage
                src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756236762/investinpuglia/properties/palazzo-palmariggi/palazzo-exterior.jpg"
                alt="Palazzo Palmariggi exterior"
                className="w-full h-full object-cover"
                width={800}
                height={600}
                priority
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Mini PIA Eligible
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                <p className="text-xs text-gray-600">Listed by</p>
                <p className="text-sm font-semibold text-gray-900">Mediterranea Luxury Estate Agency</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">€1,450,000</h3>
                  <p className="text-gray-600">Investment opportunity</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">26% ROI</p>
                  <p className="text-sm text-gray-600">Annual with Mini PIA</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                <span>Palmariggi, Lecce, Puglia - 8km from Adriatic Sea</span>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-purple-50 rounded-lg p-4">
                  <Maximize className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">1,300 m²</p>
                  <p className="text-sm text-gray-600">Interior Space</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <Trees className="h-6 w-6 text-emerald-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">5,000 m²</p>
                  <p className="text-sm text-gray-600">Buildable Garden</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">
                Magnificent early 20th century palazzo spanning two levels. Features authentic Salento-style 
                vaulted ceilings and elegant coffered ceilings on the first floor. Perfect for conversion 
                into a luxury boutique hotel with 20-30 rooms.
              </p>

              {/* Investment Highlights */}
              <div className="bg-gradient-to-r from-purple-50 to-emerald-50 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                  Investment Highlights
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Eligible for 50% Mini PIA grant (up to €1.5M non-refundable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Total investment €3M, your cost only €1.65M with grant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Projected value €3.8M after 5 years (5% annual appreciation)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Historic building in growing tourism market</span>
                  </li>
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/properties/palazzo-palmariggi"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  View Full Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="https://calendly.com/investinpuglia/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-purple-50 transition-all"
                >
                  Schedule Consultation
                </a>
              </div>

              {/* Browse More */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  href="/properties" 
                  className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
                >
                  <Building2 className="h-5 w-5 mr-2" />
                  Browse all investment properties →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Property sourced and verified by our partner agencies including{' '}
            <span className="font-semibold">Mediterranea Luxury Estate Agency</span>
          </p>
        </div>
      </div>
    </section>
  )
}