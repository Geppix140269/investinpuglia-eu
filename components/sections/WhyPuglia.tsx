'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Globe2, CheckCircle, BarChart3, MapPin } from 'lucide-react';

export default function WhyPugliaSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.02) 35px, rgba(0,0,0,.02) 70px)`
        }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>2024 MARKET INTELLIGENCE</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Work With Us
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600 mt-2">
              The REAL Italian Advantage
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are Italian professionals with over 30 years of international experience. 
            Our unmatched local network and 100+ years of combined project expertise set us apart.
          </p>
        </div>

        {/* Live Market Dashboard */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-16 border border-gray-100">
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
              <div className="text-4xl font-bold text-emerald-700 mb-2">€1M+</div>
              <div className="text-sm font-semibold text-emerald-600 mb-1">Minimum Investment</div>
              <div className="text-xs text-gray-600">We work exclusively with serious investors</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-purple-700 mb-2">100+</div>
              <div className="text-sm font-semibold text-purple-600 mb-1">Years Combined Expertise</div>
              <div className="text-xs text-gray-600">Project management & financing</div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6">
              <div className="text-4xl font-bold text-emerald-700 mb-2">55%</div>
              <div className="text-sm font-semibold text-emerald-600 mb-1">Grant Funding Available</div>
              <div className="text-xs text-gray-600">Non-refundable EU co-funding</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Market Intelligence */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-purple-600" />
              Our Comprehensive Services
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-semibold text-gray-900">Property Assessment</span>
                  <span className="text-sm font-bold text-purple-600">Expert Due Diligence</span>
                </div>
                <p className="text-sm text-gray-600">We are NOT real estate agents - we provide independent assessment</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-semibold text-gray-900">Grant Financing</span>
                  <span className="text-sm font-bold text-purple-600">Beyond Mini PIA</span>
                </div>
                <p className="text-sm text-gray-600">Access to full spectrum of EU and regional funding programs</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-semibold text-gray-900">Project Management</span>
                  <span className="text-sm font-bold text-purple-600">End-to-End</span>
                </div>
                <p className="text-sm text-gray-600">From concept through completion with local contractors</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-emerald-100 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Why We're Different</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Work with ALL prestigious real estate agencies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>LOCAL network built over decades</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>It's a privilege to work with us</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hot Zones */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-emerald-600" />
              Our Local Network Advantage
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold">Real Estate Partners</h4>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Exclusive</span>
                </div>
                <p className="text-sm opacity-90">Access to ALL prestigious agencies - not just one</p>
              </div>
              
              <div className="bg-white border-2 border-purple-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-gray-900">Government Relations</h4>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">Established</span>
                </div>
                <p className="text-sm text-gray-600">Direct access to grant authorities and approvals</p>
              </div>
              
              <div className="bg-white border-2 border-emerald-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-gray-900">Construction & Development</h4>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">Vetted</span>
                </div>
                <p className="text-sm text-gray-600">Trusted contractors and project managers</p>
              </div>
              
              <div className="bg-white border-2 border-purple-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-gray-900">Legal & Financial</h4>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">Expert</span>
                </div>
                <p className="text-sm text-gray-600">International tax optimization and compliance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-emerald-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Work With The REAL Experts
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We are Italians with international expertise. Our track record speaks for itself.
            This is a privilege reserved for serious investors only.
          </p>
          <Link
            href="/consultation"
            className="group px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3"
          >
            FREE Expert Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Start with our FREE consultation - no payment required
          </p>
        </div>
      </div>
    </section>
  );
}
