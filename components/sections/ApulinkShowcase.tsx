// PATH: components/sections/ApulinkShowcase.tsx
'use client';

import React from 'react';
import { ExternalLink, Globe, Shield, Users, Building2, FileCheck, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';

const ApulinkShowcase = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-Language Support',
      description: 'Available in English, Italian, German, French, Spanish, and Arabic'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified Professionals',
      description: 'Pre-vetted lawyers, architects, engineers, and contractors'
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Streamlined Process',
      description: 'Digital documentation and application tracking'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Property Services',
      description: 'Complete support from acquisition to renovation'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Local Expertise',
      description: 'Connect with Puglia\'s top business professionals'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Investment Guidance',
      description: 'Expert advisory for grants and incentives'
    }
  ];

  const services = [
    'Legal & Notary Services',
    'Architecture & Design',
    'Construction & Renovation',
    'Property Management',
    'Tax & Accounting',
    'Business Formation',
    'Permit Processing',
    'Translation Services'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Announcement Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold text-sm mb-6">
            <Award className="w-5 h-5" />
            NOW LIVE FOR INTERNATIONAL INVESTORS
            <Award className="w-5 h-5" />
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Introducing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
              Apulink.com
            </span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Your Gateway to Trusted Professional Services in Puglia
          </p>
          
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Apulink.com is our upcoming platform designed to connect foreign investors 
            with Puglia's trusted professionals. We're currently building our network 
            to help eliminate language barriers and bureaucratic complexities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-amber-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Services Showcase */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comprehensive Professional Network
              </h3>
              <p className="text-gray-600 mb-6">
                Apulink connects you with pre-qualified professionals across all sectors 
                essential for property investment and business development in Puglia.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-600 to-amber-500 rounded-xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Why Choose Apulink?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>All professionals speak English fluently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Verified credentials and client reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>24/7 support for international clients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Integrated with Italian bureaucratic systems</span>
                  </li>
                </ul>
              </div>
              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-300 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Platform Goals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">Growing</div>
            <div className="text-sm text-gray-600">Professional Network</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">6+</div>
            <div className="text-sm text-gray-600">Languages Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">Direct</div>
            <div className="text-sm text-gray-600">Client Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Secure Platform</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-amber-500 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Start Your Puglia Investment Journey Today
          </h3>
          <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
            Be among the first to access our growing network of professionals 
            ready to help you establish your presence in Puglia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://apulink.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Visit Apulink.com
              <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              SSL Secured
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              GDPR Compliant
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certified Partners
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Apulink.com is a subsidiary of Invest in Puglia, specializing in connecting international 
            investors with verified Italian professionals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApulinkShowcase;