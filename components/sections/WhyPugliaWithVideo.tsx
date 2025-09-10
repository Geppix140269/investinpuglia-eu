'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Globe2, CheckCircle, BarChart3, MapPin } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';

export default function WhyPugliaWithVideo() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Video Background */}
      <VideoBackground
        section="why-puglia"
        className="absolute inset-0"
        overlay={true}
        overlayOpacity={0.8}
        showIndicator={true}
        rotationInterval={12000} // 12 seconds
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>2024 MARKET INTELLIGENCE</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Work With Us
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-red-400 mt-2">
              The REAL Italian Advantage
            </span>
          </h2>
          
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            We are Italian professionals with over 30 years of international experience. 
            Our unmatched local network and 100+ years of combined project expertise set us apart.
          </p>
        </div>

        {/* Live Market Dashboard */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-16 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            2024 Performance Metrics
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-purple-700 mb-2">€150M+</div>
              <div className="text-sm font-semibold text-purple-600 mb-1">Projects Managed</div>
              <div className="text-xs text-gray-600">Demonstrable track record</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-emerald-700 mb-2">95%</div>
              <div className="text-sm font-semibold text-emerald-600 mb-1">Grant Success Rate</div>
              <div className="text-xs text-gray-600">Above industry average</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-blue-700 mb-2">50+</div>
              <div className="text-sm font-semibold text-blue-600 mb-1">Hotel Projects</div>
              <div className="text-xs text-gray-600">Tourism development</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-orange-700 mb-2">€20M+</div>
              <div className="text-sm font-semibold text-orange-600 mb-1">Grants Secured</div>
              <div className="text-xs text-gray-600">For clients</div>
            </div>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Your Local Italian Team
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Licensed Italian Professionals</h4>
                  <p className="text-gray-200 text-sm">
                    Dott. Ing. Cataldo Russo - Order of Engineers Lecce #1697 since 1995. 
                    29 years of proven tourism development experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                  <Globe2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">International Experience</h4>
                  <p className="text-gray-200 text-sm">
                    Giuseppe Funaro brings 30+ years of international business experience, 
                    ensuring seamless communication with foreign investors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-purple-500 rounded-full p-2 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Deep Local Network</h4>
                  <p className="text-gray-200 text-sm">
                    Established relationships with Puglia's best contractors, suppliers, 
                    and government officials for optimal project execution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Why Others Fail, We Succeed
            </h3>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="border-l-4 border-red-400 pl-6">
                  <h4 className="font-semibold text-red-300 mb-2">❌ Common Mistakes</h4>
                  <ul className="text-gray-200 text-sm space-y-1">
                    <li>• Working with unqualified "consultants"</li>
                    <li>• Missing crucial grant deadlines</li>
                    <li>• Overpaying for substandard work</li>
                    <li>• Navigating bureaucracy without local expertise</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="font-semibold text-green-300 mb-2">✅ Our Approach</h4>
                  <ul className="text-gray-200 text-sm space-y-1">
                    <li>• Licensed Italian professionals only</li>
                    <li>• Proactive grant application management</li>
                    <li>• Transparent, fixed-price agreements</li>
                    <li>• Full bureaucratic navigation support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-xl"
              >
                Work With Licensed Professionals
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}