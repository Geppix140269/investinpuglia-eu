// Path: components/Footer.tsx
'use client'

import { useState, useEffect } from 'react'
import Icon from '@/lib/iconMappings'

// Define the industry type
interface Industry {
  _id: string
  name: string
  slug: {
    current: string
  }
}

export default function Footer() {
  const [industries, setIndustries] = useState<Industry[]>([])
  const [showAllIndustries, setShowAllIndustries] = useState(false)

  // Fetch industries from Sanity
  useEffect(() => {
    async function fetchIndustries() {
      try {
        const response = await fetch('/api/get-industries')
        if (response.ok) {
          const data = await response.json()
          setIndustries(data)
        }
      } catch (error) {
        console.error('Error fetching industries:', error)
      }
    }
    fetchIndustries()
  }, [])

  // Show only first 10 industries by default
  const displayedIndustries = showAllIndustries ? industries : industries.slice(0, 10)

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/Logo_InvestInPuglia_Morph.png" 
              alt="Invest in Puglia" 
              className="h-12 w-auto mb-4 opacity-90"
            />
            <p className="text-gray-400 mb-4">
              EU PROPERTY GRANTS • INVESTMENT ADVISORY • PUGLIA EXPERTISE
            </p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a 
                href="https://facebook.com/investinpuglia" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/giuseppe-funaro" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* WhatsApp */}
              <a 
                href="https://wa.me/393514001402" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              
              {/* Email */}
              <a 
                href="mailto:info@investinpuglia.eu" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/calculator" className="text-gray-400 hover:text-white transition-colors">
                  Grant Calculator
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              <li>
                <a href="/industries" className="text-gray-400 hover:text-white transition-colors font-medium">
                  All Industries →
                </a>
              </li>
              {displayedIndustries.map((industry) => (
                <li key={industry._id}>
                  <a 
                    href={`/industries/${industry.slug.current}`} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {industry.name}
                  </a>
                </li>
              ))}
              {industries.length > 10 && (
                <li>
                  <button
                    onClick={() => setShowAllIndustries(!showAllIndustries)}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    {showAllIndustries ? '← Show Less' : `View All ${industries.length} Industries →`}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Locations & Legal */}
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Top Locations</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/en/locations" className="text-gray-400 hover:text-white transition-colors">
                    All Locations
                  </a>
                </li>
                <li>
                  <a href="/en/locations/invest-in-bari-bari" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Bari
                  </a>
                </li>
                <li>
                  <a href="/en/locations/invest-in-lecce-lecce" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Lecce
                  </a>
                </li>
                <li>
                  <a href="/en/locations/invest-in-taranto-taranto" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Taranto
                  </a>
                </li>
                <li>
                  <a href="/en/locations/invest-in-brindisi-brindisi" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Brindisi
                  </a>
                </li>
                <li>
                  <a href="/en/locations/invest-in-ostuni-brindisi" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Ostuni
                  </a>
                </li>
                <li>
                  <a href="/en/locations/invest-in-polignano-a-mare-bari" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Polignano a Mare
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Links Section - New Addition */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {/* Investment Resources */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Investment Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/tools" className="text-gray-500 hover:text-gray-300 transition-colors">
                    EU Grant Calculators
                  </a>
                </li>
                <li>
                  <a href="/fiscal-code" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Italian Fiscal Code Guide
                  </a>
                </li>
                <li>
                  <a href="/buyer-profile" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Buyer Profile System
                  </a>
                </li>
                <li>
                  <a href="/investment-process" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Investment Process
                  </a>
                </li>
              </ul>
            </div>

            {/* Property Types */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Property Types</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Masseria Restoration
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Trulli Properties
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Coastal Villas
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Historic Palazzi
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Our Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/services" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Grant Application Support
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Property Due Diligence
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Legal Representation
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Tax Planning Advisory
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Searches */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Popular Searches</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/calculator" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Mini PIA Turismo Grants
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Property Investment Puglia
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Italian Property Advisor
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">
                    EU Funding Italy 2025
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Invest in Puglia™. All rights reserved. | 1402 Celsius Ltd International Advisory, Consultancy and Procurment Specialists
            </p>
            <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm text-gray-400">
              <a href="tel:+393514001402" className="hover:text-white transition-colors flex items-center gap-2">
                <Icon name="phone" size={16} />
                +39 351 400 1402
              </a>
              <span>•</span>
              <a href="mailto:info@investinpuglia.eu" className="hover:text-white transition-colors flex items-center gap-2">
                <Icon name="mail" size={16} />
                info@investinpuglia.eu
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
