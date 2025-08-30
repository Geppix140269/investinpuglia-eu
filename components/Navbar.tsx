'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [miniPiaDropdownOpen, setMiniPiaDropdownOpen] = useState(false)

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
                className="h-10 md:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="/services" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Services
            </a>
            
            <a href="/portfolio" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Portfolio
            </a>
            
            {/* Mini PIA Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMiniPiaDropdownOpen(!miniPiaDropdownOpen)}
                onMouseEnter={() => setMiniPiaDropdownOpen(true)}
                onMouseLeave={() => setMiniPiaDropdownOpen(false)}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center gap-1"
              >
                Mini PIA
                <ChevronDown className={`h-4 w-4 transition-transform ${miniPiaDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {miniPiaDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                  onMouseEnter={() => setMiniPiaDropdownOpen(true)}
                  onMouseLeave={() => setMiniPiaDropdownOpen(false)}
                >
                  <Link href="/mini-pia-guide" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                    📚 Guide
                  </Link>
                  <Link href="/tools" className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-t border-gray-100">
                    🧮 Calculator
                  </Link>
                </div>
              )}
            </div>
            
            <a href="/agency" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Agencies
            </a>
          </div>

          {/* CTA Button - Right aligned */}
          <div className="hidden md:block ml-auto">
            <a 
              href="https://calendly.com/investinpuglia/30min"
              className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105 transform duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Strategy Call →
            </a>
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
              <a href="/services" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Services
              </a>
              
              <a href="/portfolio" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Portfolio
              </a>
              
              <div>
                <div className="text-gray-700 font-medium py-2">Mini PIA</div>
                <div className="ml-4 space-y-2 mt-2">
                  <a href="/mini-pia-guide" className="block text-gray-600 hover:text-gray-900 transition-colors py-1">
                    📚 Guide
                  </a>
                  <a href="/tools" className="block text-gray-600 hover:text-gray-900 transition-colors py-1">
                    🧮 Calculator
                  </a>
                </div>
              </div>
              
              <a href="/agency" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Agencies
              </a>
              
              <a 
                href="https://calendly.com/investinpuglia/30min"
                className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-3 rounded-full font-semibold text-center"
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