// Path: components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsOpen(false) // Close mobile menu
  }

  // Track active section on scroll
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
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'advisor' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'FAQ', id: 'faq' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center group"
            >
              <img
                src="/Logo_InvestInPuglia_Morph.png"
                alt="Invest in Puglia"
                className="h-10 md:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-gray-700 hover:text-gray-900 transition-colors font-medium ${
                  activeSection === link.id ? 'text-purple-600 border-b-2 border-purple-600' : ''
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <a
              href="/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Contact
            </a>
            
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
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
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
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-gray-700 hover:text-gray-900 transition-colors font-medium py-2 text-left ${
                    activeSection === link.id ? 'text-purple-600' : ''
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              <a
                href="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Contact
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
