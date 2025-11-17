'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function NavbarInvestmentTheme() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [grantsDropdownOpen, setGrantsDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner - Blue */}
      <div className="bg-[#4A90E2] text-white">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="font-sans text-xs font-semibold tracking-wide">
              DISCOVER INVESTMENT OPPORTUNITIES IN BEAUTIFUL PUGLIA
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs font-medium">
              <Link href="/media" className="hover:text-gray-200 transition-colors">Media</Link>
              <Link href="/faq" className="hover:text-gray-200 transition-colors">FAQ</Link>
              <Link href="/contact" className="hover:text-gray-200 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - White Glass Morphism */}
      <div className="bg-white/70 backdrop-blur-md text-gray-800 shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/about"
                className="font-sans text-sm font-normal text-gray-800 hover:text-[#4A90E2] transition-colors"
              >
                Our Story
              </Link>

              {/* Grants Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setGrantsDropdownOpen(true)}
                onMouseLeave={() => setGrantsDropdownOpen(false)}
              >
                <button
                  className="font-sans text-sm font-normal text-gray-800 hover:text-[#4A90E2] transition-colors flex items-center gap-1"
                >
                  PIA Grants
                  <ChevronDown className={`h-4 w-4 transition-transform ${grantsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {grantsDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64">
                    <div className="bg-white/90 backdrop-blur-md shadow-lg border border-white/20">
                      <div className="p-4 space-y-2">
                        <Link
                          href="/mini-pia-guide"
                          className="block font-sans text-sm text-gray-700 hover:text-[#4A90E2] transition-colors py-2"
                        >
                          Mini PIA Grant
                        </Link>
                        <Link
                          href="/pia-turismo"
                          className="block font-sans text-sm text-gray-700 hover:text-[#4A90E2] transition-colors py-2"
                        >
                          PIA Turismo
                        </Link>
                        <Link
                          href="/property-calculator"
                          className="block font-sans text-sm text-gray-700 hover:text-[#4A90E2] transition-colors py-2"
                        >
                          Grant Calculator
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/#services"
                className="font-sans text-sm font-normal text-gray-800 hover:text-[#4A90E2] transition-colors"
              >
                Services
              </Link>

              <Link
                href="/portfolio"
                className="font-sans text-sm font-normal text-gray-800 hover:text-[#4A90E2] transition-colors"
              >
                Portfolio
              </Link>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="flex items-center group">
                <img
                  src="/Logo_InvestInPuglia_Black.png"
                  alt="Invest In Puglia"
                  className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/consultation"
                className="relative overflow-hidden font-sans text-xs font-semibold text-gray-800 px-5 py-2.5 rounded-full transition-all uppercase tracking-wide hover:scale-105 border-2 border-white/40 hover:border-white/60"
                style={{
                  background: 'rgba(74, 144, 226, 0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(74, 144, 226, 0.5), 0 4px 12px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
                }}
              >
                <span className="relative z-10">BOOK a 30 min FREE consultation</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col gap-1">
                <Link
                  href="/about"
                  className="px-4 py-3 font-sans text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Story
                </Link>

                <div className="px-4 py-3">
                  <div className="font-sans text-sm text-gray-800 font-semibold mb-2">
                    PIA Grants
                  </div>
                  <div className="ml-4 space-y-1">
                    <Link
                      href="/mini-pia-guide"
                      className="block px-3 py-2 font-sans text-sm text-gray-600 hover:text-[#4A90E2] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Mini PIA Grant
                    </Link>
                    <Link
                      href="/pia-turismo"
                      className="block px-3 py-2 font-sans text-sm text-gray-600 hover:text-[#4A90E2] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      PIA Turismo
                    </Link>
                    <Link
                      href="/property-calculator"
                      className="block px-3 py-2 font-sans text-sm text-gray-600 hover:text-[#4A90E2] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Grant Calculator
                    </Link>
                  </div>
                </div>

                <Link
                  href="/#services"
                  className="px-4 py-3 font-sans text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>

                <Link
                  href="/portfolio"
                  className="px-4 py-3 font-sans text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>

                <Link
                  href="/consultation"
                  className="mx-4 mt-4 bg-[#4A90E2]/80 backdrop-blur-md text-gray-800 px-6 py-3 text-center font-sans text-xs font-semibold hover:bg-[#4A90E2] transition-colors uppercase tracking-wide rounded-full border border-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BOOK a 30 min FREE consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
