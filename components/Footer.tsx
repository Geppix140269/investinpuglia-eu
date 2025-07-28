// Path: components/Footer.tsx
'use client'

import Icon from '@/lib/iconMappings'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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

          {/* Investment Locations (SEO) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <ul className="space-y-2">
              <li>
                <a href="/en/locations" className="text-gray-400 hover:text-white transition-colors">
                  All Puglia Locations
                </a>
              </li>
              <li>
                <a href="/en/locations/invest-in-bari-bari" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Invest in Bari
                </a>
              </li>
              <li>
                <a href="/en/locations/invest-in-lecce-lecce" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Invest in Lecce
                </a>
              </li>
              <li>
                <a href="/en/locations/invest-in-taranto-taranto" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Invest in Taranto
                </a>
              </li>
              <li>
                <a href="/en/locations/invest-in-foggia-foggia" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Invest in Foggia
                </a>
              </li>
              <li>
                <a href="/en/locations/invest-in-brindisi-brindisi" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Invest in Brindisi
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/legal-notice" className="text-gray-400 hover:text-white transition-colors">
                  Legal Notice
                </a>
              </li>
            </ul>
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
