'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Crown, Shield, Eye, ArrowRight, Lock, Star, Film, MapPin } from 'lucide-react'
import CloudinaryImage from '@/components/properties/CloudinaryImage'

export default function ExclusiveEstateProperty() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide mb-8">
            <Crown className="w-5 h-5 text-yellow-300" />
            CONFIDENTIAL ESTATE COMPLEX
            <Crown className="w-5 h-5 text-yellow-300" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              NOBLE ESTATE
            </span>
            <br />
            <span className="text-white">COMPLEX</span>
          </h2>

          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-4">
            A magnificent 19th century estate complex with royal heritage awaits the discerning investor
          </p>

          <p className="text-lg text-green-200 max-w-2xl mx-auto">
            <em>Location and identity protected until verification • SMS access required</em>
          </p>
        </div>

        <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Mystery Image Side */}
            <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-green-800/50 to-teal-800/50">
              {/* Blurred Preview Image */}
              <div className="relative h-full overflow-hidden">
                <CloudinaryImage
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1758822064/strada_vista_hhbya2.png"
                  alt="Historic Estate Complex - Identity Protected"
                  className="w-full h-full object-cover blur-sm scale-110 transition-all duration-700 hover:blur-none hover:scale-100"
                  width={800}
                  height={600}
                  quality="auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay with Lock */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="bg-yellow-500 rounded-full p-6 mb-4 mx-auto w-fit">
                      <Lock className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-lg font-semibold mb-2">EXCLUSIVE ACCESS</p>
                    <p className="text-sm text-gray-300">Full imagery requires verification</p>
                  </div>
                </div>
              </div>

              {/* Exclusive Tags */}
              <div className="absolute top-6 left-6">
                <div className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  19TH CENTURY
                </div>
              </div>

              <div className="absolute top-6 right-6">
                <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  FILM LOCATION!
                </div>
              </div>

              <div className="absolute top-20 right-6">
                <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  CONFIDENTIAL
                </div>
              </div>
            </div>

            {/* Mystery Content Side */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-green-800/30 to-teal-800/30">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">
                    For Qualified Investors Only
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  Historic Noble Estate Complex
                </h3>

                <p className="text-green-100 mb-6 leading-relaxed">
                  A rare opportunity to acquire a magnificent estate complex with royal heritage and film location prestige.
                  Former noble residence with approved luxury resort development plans - Perfect for high-end hospitality conversion.
                </p>
              </div>

              {/* Mysterious Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-yellow-400">5,900</div>
                  <div className="text-xs text-green-200 uppercase tracking-wide">Covered SQM</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-yellow-400">47</div>
                  <div className="text-xs text-green-200 uppercase tracking-wide">Hectares</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-yellow-400">40</div>
                  <div className="text-xs text-green-200 uppercase tracking-wide">Planned Suites</div>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">What We Can Reveal:</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-100">Historic estate complex with royal family connections</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-100">Featured in internationally acclaimed films by renowned directors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-100">Approved luxury resort development plans for 40 premium suites</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-100">Strategic location near major historic city with excellent accessibility</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Link
                  href="/exclusive/project-estate-19"
                  className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-4 rounded-xl font-bold text-center hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  VERIFY & ACCESS FULL DETAILS
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-xs text-green-300 text-center">
                  SMS verification required • Confidentiality agreement mandatory
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Teaser */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-black/30 to-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Why the Secrecy?</h3>
            <p className="text-green-100 leading-relaxed">
              This extraordinary estate complex represents a once-in-a-lifetime opportunity to own a piece of Italian royal history
              with Hollywood film heritage. Due to its exceptional nature and the sensitive negotiations involved, we maintain strict
              confidentiality until serious investor qualification. <strong className="text-yellow-300">Those who gain access discover
              why this noble estate stands apart from any other luxury resort development opportunity in Southern Italy.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}