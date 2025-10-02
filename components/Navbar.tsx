'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [miniPiaDropdownOpen, setMiniPiaDropdownOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'advisor', 'how-it-works', 'opportunity', 'trullo', 'faq']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <img
                src="/Logo_InvestInPuglia_Morph.png"
                alt="Invest in Puglia"
                width={180}
                height={48}
                className="h-10 md:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  // Fallback text if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('span');
                    fallback.textContent = 'InvestInPuglia';
                    fallback.className = 'logo-fallback font-bold text-lg text-purple-600';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              About
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center gap-1"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 pt-2 w-64"
                >
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <Link href="/services" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors font-semibold">
                      📋 All Services
                    </Link>
                    <div className="border-t border-gray-100">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        Service Tiers
                      </div>
                      <Link href="/property-snapshot" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm">
                        💎 Property Snapshot (€500)
                      </Link>
                      <Link href="/foundation-package" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm">
                        🏗️ Foundation Package (€2.5K)
                      </Link>
                      <Link href="/full-orchestration" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm">
                        🎯 Full Orchestration (2.5-3.5%)
                      </Link>
                      <Link href="/project-oversight" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm">
                        👁️ Project Oversight (€3K/mo)
                      </Link>
                    </div>
                    <div className="border-t border-gray-100">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        Tools & Resources
                      </div>
                      <Link href="/property-calculator" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm">
                        🏠 Property Calculator
                      </Link>
                      <Link href="/mini-pia-guide" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm">
                        📚 Mini PIA Guide
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Pricing
            </a>

            <a href="/how-it-works" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              How It Works
            </a>

            <a href="/portfolio" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Portfolio
            </a>

            <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* CTA Button - Right aligned */}
          <div className="hidden md:block ml-auto">
            <Link 
              href="/consultation"
              className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105 transform duration-200"
            >
              FREE Consultation →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-auto p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                About
              </a>

              <div>
                <div className="text-gray-700 font-medium py-2">Services</div>
                <div className="ml-4 space-y-2 mt-2">
                  <a href="/services" className="block text-gray-600 hover:text-gray-900 transition-colors py-1 font-semibold">
                    📋 All Services
                  </a>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Service Tiers</div>
                  <a href="/property-snapshot" className="block text-gray-600 hover:text-gray-900 transition-colors py-1 text-sm">
                    💎 Property Snapshot (€500)
                  </a>
                  <a href="/foundation-package" className="block text-gray-600 hover:text-gray-900 transition-colors py-1 text-sm">
                    🏗️ Foundation Package (€2.5K)
                  </a>
                  <a href="/full-orchestration" className="block text-gray-600 hover:text-gray-900 transition-colors py-1 text-sm">
                    🎯 Full Orchestration (2.5-3.5%)
                  </a>
                  <a href="/project-oversight" className="block text-gray-600 hover:text-gray-900 transition-colors py-1 text-sm">
                    👁️ Project Oversight (€3K/mo)
                  </a>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Tools & Resources</div>
                  <a href="/property-calculator" className="block text-gray-600 hover:text-gray-900 transition-colors py-1 text-sm">
                    🏠 Property Calculator
                  </a>
                  <a href="/mini-pia-guide" className="block text-gray-600 hover:text-gray-900 transition-colors py-1 text-sm">
                    📚 Mini PIA Guide
                  </a>
                </div>
              </div>

              <a href="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Pricing
              </a>

              <a href="/how-it-works" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                How It Works
              </a>

              <a href="/portfolio" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Portfolio
              </a>

              <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Contact
              </a>

              <Link
                href="/consultation"
                className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-3 rounded-full font-semibold text-center"
              >
                FREE Consultation →
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}