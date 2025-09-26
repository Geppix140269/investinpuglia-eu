'use client'

import Link from 'next/link'
import { Euro, TrendingUp, Building, Percent, ArrowRight } from 'lucide-react'
import CloudinaryImage from '@/components/properties/CloudinaryImage'

export default function PalazzoOpportunity() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-wide">
            Featured Mini PIA Opportunity
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Palazzo Palmariggi - Historic Investment Deal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            Early 1900s Palazzo with Mini PIA Grant Eligibility
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Exceptional opportunity in Palmariggi, Lecce - Perfect for boutique hotel conversion
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-96 lg:h-[500px]">
              <CloudinaryImage
                src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756236762/investinpuglia/properties/palazzo-palmariggi/palazzo-exterior.jpg"
                alt="Palazzo Palmariggi - Historic investment opportunity"
                className="w-full h-full object-cover"
                width={800}
                height={600}
                quality="auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Mini PIA Eligible
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  GREAT DEAL!
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Historic Palazzo - Reduced Price
                </h3>
                <p className="text-gray-600 mb-4">
                  Magnificent early 20th century palazzo spanning 1,300 sqm with 5,000 sqm buildable land.
                  Original Salento vaulted ceilings and elegant coffered details throughout.
                </p>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 line-through mb-1">€1,450,000</div>
                  <div className="text-2xl font-bold text-red-600">€1,250,000</div>
                  <div className="text-sm text-gray-600">Purchase Price</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-emerald-600">€1,405,000</div>
                  <div className="text-sm text-gray-600">Mini PIA Grant (50%)</div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">1,300</div>
                  <div className="text-sm text-gray-600">Sqm Interior</div>
                </div>
                <div className="text-center">
                  <Percent className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">50%</div>
                  <div className="text-sm text-gray-600">Grant Available</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">20-30</div>
                  <div className="text-sm text-gray-600">Hotel Rooms</div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-gray-900">Investment Breakdown</span>
                </div>
                <div className="text-sm text-gray-700">
                  Total: €2,810,000 (€1,250,000 purchase + €1,560,000 renovation)
                  <br />
                  <span className="text-emerald-600 font-semibold">💰 Save €200,000 on purchase price!</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/properties/palazzo-palmariggi"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  View Full Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/consultation"
                  className="flex-1 bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}