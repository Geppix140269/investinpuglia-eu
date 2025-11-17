'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

/**
 * Angel Bakeries-Inspired Navbar Component
 * Clean design with brown header and white text
 */
export default function NavbarZara() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [miniPiaDropdownOpen, setMiniPiaDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
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

      {/* Main Navigation */}
      <div className="bg-[#5D4037] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/about"
                className="font-sans text-sm font-normal text-white hover:text-gray-300 transition-colors"
              >
                Our Story
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  className="font-sans text-sm font-normal text-white hover:text-gray-300 transition-colors flex items-center gap-1"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64">
                    <div className="bg-white shadow-lg">
                      <div className="p-4 space-y-2">
                        <Link
                          href="/services"
                          className="block font-sans text-sm text-gray-700 hover:text-[#5D4037] transition-colors py-2"
                        >
                          All Services
                        </Link>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="font-sans text-xs uppercase text-gray-500 mb-2">
                            Tools
                          </div>
                          <Link
                            href="/property-calculator"
                            className="block font-sans text-sm text-gray-700 hover:text-[#5D4037] transition-colors py-2"
                          >
                            Property Calculator
                          </Link>
                          <a
                            href="https://apulink.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block font-sans text-sm text-gray-700 hover:text-[#5D4037] transition-colors py-2"
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
                className="font-sans text-sm font-normal text-white hover:text-gray-300 transition-colors"
              >
                Portfolio
              </Link>

              <Link
                href="/insights"
                className="font-sans text-sm font-normal text-white hover:text-gray-300 transition-colors"
              >
                Insights
              </Link>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="flex items-center group">
                <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-gray-300 transition-colors">
                  INVEST IN PUGLIA
                </span>
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/advisory"
                className="font-sans text-sm font-normal text-white hover:text-gray-300 transition-colors"
              >
                Advisory
              </Link>
              <Link
                href="/consultation"
                className="font-sans text-sm font-semibold text-white hover:text-gray-300 transition-colors"
              >
                Find a Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:bg-[#4A3933] transition-colors"
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
            <div className="lg:hidden border-t border-[#4A3933] py-4">
              <div className="flex flex-col gap-1">
                <Link
                  href="/about"
                  className="px-4 py-3 font-sans text-sm text-white hover:bg-[#4A3933] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Our Story
                </Link>

                <div className="px-4 py-3">
                  <div className="font-sans text-sm text-white mb-2">
                    Services
                  </div>
                  <div className="ml-4 space-y-1">
                    <Link
                      href="/services"
                      className="block px-3 py-2 font-sans text-sm text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      All Services
                    </Link>
                    <Link
                      href="/property-calculator"
                      className="block px-3 py-2 font-sans text-sm text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Property Calculator
                    </Link>
                    <a
                      href="https://apulink.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 font-sans text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Apulink Platform
                    </a>
                  </div>
                </div>

                <Link
                  href="/portfolio"
                  className="px-4 py-3 font-sans text-sm text-white hover:bg-[#4A3933] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </Link>

                <Link
                  href="/insights"
                  className="px-4 py-3 font-sans text-sm text-white hover:bg-[#4A3933] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Insights
                </Link>

                <Link
                  href="/advisory"
                  className="px-4 py-3 font-sans text-sm text-white hover:bg-[#4A3933] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Advisory
                </Link>

                <Link
                  href="/consultation"
                  className="mx-4 mt-4 bg-white text-[#5D4037] px-6 py-2 text-center font-sans text-sm font-semibold hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Find a Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
