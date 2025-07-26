'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 z-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo - Centered on mobile, aligned left on desktop */}
          <div className="absolute inset-x-0 top-0 flex justify-center items-center h-16 md:static md:justify-start">
            <a href="/" className="flex items-center group">
              <img 
                src="/Logo_InvestInPuglia_Morph.png" 
                alt="Invest in Puglia" 
                className="h-10 md:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Home
            </a>
            <a href="/investment-process" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Process
            </a>

            {/* Tools dropdown with calculators */}
            <div className="relative group">
              <a href="/tools" className="text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center gap-1">
                Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  Calculators
                </div>
                <a href="/calculator" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                  Grant Calculator
                </a>
                <a href="/classic" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                  Classic Calculator
                </a>
                <a href="https://investiscope-easy.netlify.app/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                  Quick Calculator
                </a>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mt-2">
                  Analysis
                </div>
                <a href="/buyer-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                  Buyer Profile
                </a>
              </div>
            </div>

            <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Contact
            </a>
            <a href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Blog
            </a>
            <a 
              href="https://calendly.com/investinpuglia/30min" 
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105 transform duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Strategy Call →
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Home
              </a>
              <a href="/investment-process" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Investment Process
              </a>

              {/* Tools section with sub-items */}
              <div>
                <a href="/tools" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2 block">
                  Tools
                </a>
                <div className="ml-4 mt-2 space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-1">
                    Calculators
                  </div>
                  <a href="/calculator" className="text-gray-600 hover:text-gray-900 transition-colors text-sm block py-1">
                    → Grant Calculator
                  </a>
                  <a href="/classic" className="text-gray-600 hover:text-gray-900 transition-colors text-sm block py-1">
                    → Classic Calculator
                  </a>
                  <a href="https://investiscope-easy.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors text-sm block py-1">
                    → Quick Calculator
                  </a>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-1 mt-2">
                    Analysis
                  </div>
                  <a href="/buyer-profile" className="text-gray-600 hover:text-gray-900 transition-colors text-sm block py-1">
                    → Buyer Profile
                  </a>
                </div>
              </div>

              <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Contact
              </a>
              <a href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Blog
              </a>
              <a 
                href="https://calendly.com/investinpuglia/30min" 
                className="bg-green-600 text-white px-5 py-3 rounded-full font-semibold text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Strategy Call →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
