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
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="facebook" size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="twitter" size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="linkedin" size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="instagram" size={24} />
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

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Invest in Puglia™. All rights reserved.
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
