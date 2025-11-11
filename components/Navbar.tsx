'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { ChevronDown, Building2, Calculator, FileText, Briefcase, TrendingUp, Network, ExternalLink, Users } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [miniPiaDropdownOpen, setMiniPiaDropdownOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      setScrolled(window.scrollY > 20)

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100'
        : 'bg-white/80 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-20">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <img
                src="/Logo_InvestInPuglia_Morph.png"
                alt="Invest in Puglia"
                width={180}
                height={48}
                className="h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('span');
                    fallback.textContent = 'InvestInPuglia';
                    fallback.className = 'logo-fallback font-bold text-xl bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/about"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors group"
            >
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors flex items-center gap-1.5 group"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pt-2 w-[420px]">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <Link
                        href="/services"
                        className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-emerald-50 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">All Services</div>
                          <div className="text-sm text-gray-600">Complete service overview</div>
                        </div>
                      </Link>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="px-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Tools & Resources
                        </div>
                        <div className="space-y-1">
                          <Link
                            href="/property-calculator"
                            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                          >
                            <Calculator className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Property Calculator</span>
                          </Link>
                          <a
                            href="https://apulink.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                          >
                            <ExternalLink className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">Apulink Platform</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors group"
            >
              Portfolio
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            <Link
              href="/advisory"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors group"
            >
              Advisory
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            <Link
              href="/insights"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors group"
            >
              Insights
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            {/* Mini PIA Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMiniPiaDropdownOpen(true)}
              onMouseLeave={() => setMiniPiaDropdownOpen(false)}
            >
              <button
                onClick={() => setMiniPiaDropdownOpen(!miniPiaDropdownOpen)}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors flex items-center gap-1.5 group"
              >
                Mini PIA
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${miniPiaDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>

              {miniPiaDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pt-2 w-64">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-4 space-y-1">
                      <Link
                        href="/mini-pia-guide"
                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-emerald-50 transition-all duration-200"
                      >
                        <FileText className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Guide</span>
                      </Link>
                      <Link
                        href="/tools"
                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-emerald-50 transition-all duration-200"
                      >
                        <Calculator className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">Calculator</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/join-network"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors group"
            >
              Network
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>

          {/* CTA Button - Right aligned */}
          <div className="hidden lg:block ml-auto">
            <Link
              href="/consultation"
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold overflow-hidden group transition-all hover:shadow-xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10">Free Consultation</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-auto p-2 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-200"
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
          <div className="lg:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <Link
                href="/about"
                className="px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <div className="px-4 py-3">
                <div className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  Services
                </div>
                <div className="ml-7 space-y-1">
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    All Services
                  </Link>
                  <div className="pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</div>
                  <Link
                    href="/property-calculator"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calculator className="h-4 w-4" />
                    Property Calculator
                  </Link>
                  <a
                    href="https://apulink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Apulink Platform
                  </a>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>

              <Link
                href="/advisory"
                className="px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                Advisory
              </Link>

              <Link
                href="/insights"
                className="px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                Investment Insights
              </Link>

              <div className="px-4 py-3">
                <div className="flex items-center gap-2 text-gray-900 font-semibold mb-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Mini PIA
                </div>
                <div className="ml-7 space-y-1">
                  <Link
                    href="/mini-pia-guide"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    Guide
                  </Link>
                  <Link
                    href="/tools"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calculator className="h-4 w-4" />
                    Calculator
                  </Link>
                </div>
              </div>

              <Link
                href="/join-network"
                className="px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                Join Our Network
              </Link>

              <Link
                href="/consultation"
                className="mx-4 mt-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                Free Consultation →
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}