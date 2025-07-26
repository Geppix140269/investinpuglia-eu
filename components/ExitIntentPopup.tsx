// components/ExitIntentPopup.tsx
'use client'

import { useState, useEffect } from 'react'

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check if user has already registered
    const hasRegistered = localStorage.getItem('miniPIAGuideRegistered')
    if (hasRegistered) {
      return // Don't set up exit intent if already registered
    }

    let exitIntentShown = false
    let lastScrollTop = 0
    let scrollUpCount = 0

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true
        setShowPopup(true)
      }
    }

    // Mobile: Scroll detection
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      if (scrollTop < lastScrollTop && scrollTop < 100) {
        scrollUpCount++
        if (scrollUpCount >= 2 && !exitIntentShown) {
          exitIntentShown = true
          setShowPopup(true)
        }
      } else {
        scrollUpCount = 0
      }
      
      lastScrollTop = scrollTop
    }

    // Mobile: Back button detection
    const handlePopState = (e: PopStateEvent) => {
      if (!exitIntentShown) {
        e.preventDefault()
        exitIntentShown = true
        setShowPopup(true)
        history.pushState(null, '', window.location.pathname)
      }
    }

    // Set up event listeners
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('popstate', handlePopState)
    
    // Initialize history state
    history.pushState(null, '', window.location.pathname)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    setIsSubmitting(true)
    
    try {
      // Send to your API endpoint
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'exit_intent_mini_pia_guide'
        })
      })
      
      console.log('API Response status:', response.status)
      
      if (response.ok) {
        // Mark as registered to prevent future popups
        localStorage.setItem('miniPIAGuideRegistered', 'true')
        localStorage.setItem('miniPIAGuideRegisteredDate', new Date().toISOString())
        
        // Trigger immediate download
        const link = document.createElement('a')
        link.href = '/Mini-PIA-Grant-Guide-2025.pdf' // Put PDF in public folder
        link.download = 'Mini-PIA-Grant-Guide-2025.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Show success message
        alert('Thank you! Your Mini PIA Grant Guide is downloading now.')
        
        // Close popup
        setShowPopup(false)
        setFormData({ name: '', email: '' })
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Also check on popup render in case localStorage was cleared elsewhere
  if (showPopup && localStorage.getItem('miniPIAGuideRegistered')) {
    setShowPopup(false)
    return null
  }

  if (!showPopup) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-fadeInPopup"
      onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 md:p-10 relative animate-slideUpPopup">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-5 right-5 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all hover:rotate-90"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Wait! Don't Miss Out
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Get Your FREE Guide to Puglia's EU Funded Grants
          </h2>
          <p className="text-lg text-gray-600">
            Discover how to secure up to €2.25M with Mini PIA grants
          </p>
        </div>
        
        {/* Benefits */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="space-y-3">
            {[
              'Complete Mini PIA eligibility checklist',
              'Step-by-step application roadmap',
              'Common mistakes to avoid (save €1000s)',
              '2025 grant calendar and deadlines'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-emerald-600 text-xl">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
              placeholder="John Smith"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Get My Free Grant Guide →'}
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-500 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}