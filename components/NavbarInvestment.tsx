'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

/**
 * Investment-Focused Navbar
 * Professional navy, gold, cyan color scheme
 */
export default function NavbarInvestment() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [miniPiaDropdownOpen, setMiniPiaDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-navy-900 via-primary-900 to-navy-800 border-b border-secondary-600/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="block group">
              <img
                src="/Logo_InvestInPuglia_Morph.png"
                alt="Invest in Puglia"
                className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/about"
              className="font-sans text-xs font-medium tracking-widest uppercase text-white/90 hover:text-secondary-400 transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-accent-400 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className="font-sans text-xs font-medium tracking-widest uppercase text-white/90 hover:text-secondary-400 transition-colors flex items-center gap-1 relative group"
              >
                Services
                <ChevronDown className={`h-3 w-3 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-accent-400 group-hover:w-full transition-all duration-300" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80">
                  <div className="glass-card shadow-xl border border-neutral-200">
                    <div className="p-6 space-y-3">
                      <Link
                        href="/services"
                        className="block font-sans text-sm tracking-wide text-white/90 hover:text-secondary-400 transition-colors py-2 font-medium"
                      >
                        All Services
                      </Link>
                      <div className="border-t border-secondary-600/30 pt-3 mt-3">
                        <div className="font-sans text-xs tracking-widest uppercase text-white/60 mb-3">
                          Tools & Resources
                        </div>
                        <Link
                          href="/property-calculator"
                          className="block font-sans text-sm tracking-wide text-white/90 hover:text-secondary-400 transition-colors py-2"
                        >
                          Grant Calculator
                        </Link>
                        <a
                          href="https://apulink.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-sans text-sm tracking-wide text-white/90 hover:text-accent-400 transition-colors py-2"
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
              className="font-sans text-xs font-medium tracking-widest uppercase text-white/90 hover:text-secondary-400 transition-colors relative group"
            >
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-accent-400 group-hover:w-full transition-all duration-300" />
            </Link>

            <Link
              href="/advisory"
              className="font-sans text-xs font-medium tracking-widest uppercase text-white/90 hover:text-secondary-400 transition-colors relative group"
            >
              Advisory
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-accent-400 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Mini PIA Dropdown - PROMINENT */}
            <div
              className="relative"
              onMouseEnter={() => setMiniPiaDropdownOpen(true)}
              onMouseLeave={() => setMiniPiaDropdownOpen(false)}
            >
              <button
                className="font-sans text-xs font-bold tracking-widest uppercase text-secondary-400 hover:text-secondary-300 transition-colors flex items-center gap-1 relative group px-3 py-2 bg-secondary-600/20 rounded-lg border border-secondary-400/30"
              >
                💰 Mini PIA
                <ChevronDown className={`h-3 w-3 transition-transform ${miniPiaDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {miniPiaDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                  <div className="glass-card shadow-xl border-2 border-secondary-200">
                    <div className="p-6 space-y-3">
                      <div className="mb-3 pb-3 border-b border-neutral-200">
                        <div className="font-sans text-xs uppercase tracking-wide text-secondary-700 font-bold mb-1">
                          Tourism & Industrial Grants
                        </div>
                        <div className="font-sans text-xs text-white/80 leading-relaxed">
                          Up to 50% non-refundable funding for hotels, data centers, manufacturing, and more
                        </div>
                      </div>
                      <Link
                        href="/mini-pia-guide"
                        className="block font-sans text-sm tracking-wide text-white/90 hover:text-secondary-400 transition-colors py-2 font-medium"
                      >
                        Complete Guide
                      </Link>
                      <Link
                        href="/property-calculator"
                        className="block font-sans text-sm tracking-wide text-white/90 hover:text-secondary-400 transition-colors py-2 font-medium"
                      >
                        Grant Calculator
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/insights"
              className="font-sans text-xs font-medium tracking-widest uppercase text-white/90 hover:text-secondary-400 transition-colors relative group"
            >
              Insights
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-accent-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* CTA Button - Right */}
          <div className="hidden lg:block">
            <Link href="/consultation" className="cta-button cta-secondary text-xs">
              Free Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-secondary-400 hover:bg-white/10 rounded-lg transition-all"
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
          <div className="lg:hidden border-t border-secondary-600/30 py-6">
            <div className="flex flex-col gap-1">
              <Link
                href="/about"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-white/90 hover:text-secondary-400 hover:bg-white/10 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <div className="px-4 py-3">
                <div className="font-sans text-xs tracking-widest uppercase text-white mb-3 font-semibold">
                  Services
                </div>
                <div className="ml-4 space-y-1">
                  <Link
                    href="/services"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-white/80 hover:text-navy-900 transition-colors rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    All Services
                  </Link>
                  <Link
                    href="/property-calculator"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-white/80 hover:text-navy-900 transition-colors rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Grant Calculator
                  </Link>
                  <a
                    href="https://apulink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-white/80 hover:text-accent-600 transition-colors rounded-lg hover:bg-accent-50"
                  >
                    Apulink
                  </a>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-white/90 hover:text-secondary-400 hover:bg-white/10 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>

              <Link
                href="/advisory"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-white/90 hover:text-secondary-400 hover:bg-white/10 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Advisory
              </Link>

              {/* PROMINENT Mini PIA in Mobile */}
              <div className="px-4 py-3 bg-secondary-600/20 border border-secondary-400/30 rounded-lg mx-4 my-2">
                <div className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-secondary-400 mb-3 font-bold">
                  💰 Mini PIA Grants
                </div>
                <div className="ml-2 space-y-1">
                  <Link
                    href="/mini-pia-guide"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-white/90 hover:text-secondary-400 transition-colors rounded-lg hover:bg-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Complete Guide
                  </Link>
                  <Link
                    href="/property-calculator"
                    className="block px-3 py-2 font-sans text-sm tracking-wide text-white/90 hover:text-secondary-400 transition-colors rounded-lg hover:bg-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Grant Calculator
                  </Link>
                </div>
              </div>

              <Link
                href="/insights"
                className="px-4 py-3 font-sans text-xs tracking-widest uppercase text-white/90 hover:text-secondary-400 hover:bg-white/10 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Insights
              </Link>

              <Link
                href="/consultation"
                className="mx-4 mt-4 cta-button cta-secondary text-center text-xs"
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
