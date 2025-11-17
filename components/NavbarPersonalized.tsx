'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

/**
 * Personalized Navbar - Clean Zara aesthetic with brand colors
 */
export default function NavbarPersonalized() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [miniPiaDropdownOpen, setMiniPiaDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-secondary-700 transition-all">
                INVEST IN PUGLIA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/about"
              className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-700 hover:text-primary-600 transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-700 hover:text-primary-600 transition-colors flex items-center gap-1 relative group"
              >
                Services
                <ChevronDown className={`h-3 w-3 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80">
                  <div className="glass-card shadow-xl">
                    <div className="p-6 space-y-3">
                      <Link
                        href="/services"
                        className="block font-sans text-sm tracking-wide text-neutral-700 hover:text-primary-600 transition-colors py-2 font-medium"
                      >
                        All Services
                      </Link>
                      <div className="border-t border-neutral-200 pt-3 mt-3">
                        <div className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-3">
                          Tools & Resources
                        </div>
                        <Link
                          href="/property-calculator"
                          className="block font-sans text-sm tracking-wide text-neutral-700 hover:text-primary-600 transition-colors py-2"
                        >
                          Property Calculator
                        </Link>
                        <a
                          href="https://apulink.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-sans text-sm tracking-wide text-neutral-700 hover:text-secondary-600 transition-colors py-2"
                        >
                          Apulink Platform
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-700 hover:text-primary-600 transition-colors relative group"
            >
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300" />
            </Link>

            <Link
              href="/advisory"
              className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-700 hover:text-primary-600 transition-colors relative group"
            >
              Advisory
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300" />
            </Link>

            <Link
              href="/insights"
              className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-700 hover:text-primary-600 transition-colors relative group"
            >
              Insights
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Mini PIA Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMiniPiaDropdownOpen(true)}
              onMouseLeave={() => setMiniPiaDropdownOpen(false)}
            >
              <button
                className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-700 hover:text-primary-600 transition-colors flex items-center gap-1 relative group"
              >
                Mini PIA
                <ChevronDown className={`h-3 w-3 transition-transform ${miniPiaDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300" />
              </button>

              {miniPiaDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                  <div className="glass-card shadow-xl">
                    <div className="p-6 space-y-3">
                      <Link
                        href="/mini-pia-guide"
                        className="block font-sans text-sm tracking-wide text-neutral-700 hover:text-primary-600 transition-colors py-2"
                      >
                        Guide
                      </Link>
                      <Link
                        href="/tools"
                        className="block font-sans text-sm tracking-wide text-neutral-700 hover:text-secondary-600 transition-colors py-2"
                      >
                        Calculator
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/join-network"
              className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-700 hover:text-primary-600 transition-colors relative group"
            >
              Network
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* CTA Button - Right */}
          <div className="hidden lg:block">
            <Link href="/consultation" className="cta-button cta-primary text-xs">
              Free Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden border-t border-neutral-200 py-6">
            <div className="flex flex-col gap-1">
              <Link
                href="/about"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <div className="px-4 py-3">
                <div className="font-sans text-xs tracking-widest uppercase text-neutral-900 mb-3 font-semibold">
                  Services
                </div>
                <div className="ml-4 space-y-1">
                  <Link
                    href="/services"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-neutral-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    onClick={() => setIsOpen(false)}
                  >
                    All Services
                  </Link>
                  <Link
                    href="/property-calculator"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-neutral-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Calculator
                  </Link>
                  <a
                    href="https://apulink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-neutral-600 hover:text-secondary-600 transition-colors rounded-lg hover:bg-secondary-50"
                  >
                    Apulink
                  </a>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>

              <Link
                href="/advisory"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Advisory
              </Link>

              <Link
                href="/insights"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Insights
              </Link>

              <div className="px-4 py-3">
                <div className="font-sans text-xs tracking-widest uppercase text-neutral-900 mb-3 font-semibold">
                  Mini PIA
                </div>
                <div className="ml-4 space-y-1">
                  <Link
                    href="/mini-pia-guide"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-neutral-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Guide
                  </Link>
                  <Link
                    href="/tools"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-neutral-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Calculator
                  </Link>
                </div>
              </div>

              <Link
                href="/join-network"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Network
              </Link>

              <Link
                href="/consultation"
                className="mx-4 mt-4 cta-button cta-primary text-center text-xs"
                onClick={() => setIsOpen(false)}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
