// app/page.tsx - Complete Modern Design with Glass Morphism

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'
import ExitIntentPopup from '@/components/ExitIntentPopup'

export default function HomePage() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Auto-open Trullo after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const trulloButton = document.querySelector('button[aria-label="Open chat"]') as HTMLButtonElement
      if (trulloButton) {
        trulloButton.click()
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Exit Intent Popup */}
      {/* Only show exit intent on desktop */}
      <div className="hidden md:block">
        <ExitIntentPopup />
      </div>

      {/* Hero Section with Video + Glass Morphism */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Loading Placeholder with Gradient */}
          {!videoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-emerald-700 to-teal-700 flex items-center justify-center z-10">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Optimized Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            poster="/puglia-background-poster.jpg"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={(e) => (e.target as HTMLVideoElement).play()}
          >
            <source src="/puglia-background-optimized.webm" type="video/webm" />
            <source src="/puglia-background.mp4" type="video/mp4" />
            <img 
              src="/puglia-background-fallback.jpg" 
              alt="Beautiful Puglia landscape"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
          
          {/* Gradient Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-transparent to-emerald-900/50"></div>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        

        
        {/* Content with Glass Morphism */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
          {/* Glass Badge - Hidden on mobile */}
          <div className="hidden md:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-fadeIn shadow-xl">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            TRUSTED ADVISORY • VERIFIED LOCAL EXPERTS • PUGLIA
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 animate-fadeIn animation-delay-100 leading-tight">
            Don't Risk Your Investment<br />
            <span className="font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Work with Puglia's Trusted Experts
            </span>
          </h1>
          
          {/* Glass Card for Subtitle */}
          <div className="max-w-4xl mx-auto mb-10 animate-fadeIn animation-delay-200">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
              <p className="text-xl md:text-2xl text-white font-medium mb-3">
                Save €100,000s and Years of Mistakes with Professional Guidance
              </p>
              <p className="text-lg md:text-xl text-white/90 font-light">
                We connect you with verified local architects, engineers, and grant specialists who ensure your project succeeds on time and on budget
              </p>
            </div>
          </div>
          
          {/* Glass Benefits Cards - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fadeIn animation-delay-300">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl text-white font-medium text-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <Icon name="Check" size={20} className="inline-block mr-2" />
              Verified local professionals
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl text-white font-medium text-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <Icon name="Check" size={20} className="inline-block mr-2" />
              Prevent costly mistakes
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl text-white font-medium text-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <Icon name="Check" size={20} className="inline-block mr-2" />
              Real references & results
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl text-white font-medium text-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <Icon name="Check" size={20} className="inline-block mr-2" />
              €50M+ grants secured
            </div>
          </div>
          
          {/* Glass CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fadeIn animation-delay-400">
            <CTAButton 
              variant="custom"
              href="/calculator"
              text="Check Grant Eligibility"
              location="hero"
              className="bg-white/90 backdrop-blur-md text-purple-700 px-8 py-5 rounded-full font-bold hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg border border-white/50"
            />
            <CTAButton 
              variant="custom"
              href="#advisor"
              text="Meet Our Expert Network"
              location="hero"
              icon={<Icon name="Users" size={24} />}
              className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-5 rounded-full text-lg font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
          </div>
          
          {/* Glass Contact Card - Hidden on mobile */}
          <div className="mt-16 animate-fadeIn animation-delay-500 hidden md:block">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 inline-block shadow-xl">
              <p className="text-white font-medium text-lg mb-3">Avoid costly mistakes. Talk to trusted experts first.</p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-white">
                <a href="tel:+393514001402" className="hover:text-emerald-300 transition-colors font-medium flex items-center gap-2">
                  <Icon name="Phone" size={20} />
                  +39 351 400 1402
                </a>
                <span className="text-white/30">•</span>
                <a href="mailto:info@investinpuglia.eu" className="hover:text-emerald-300 transition-colors font-medium flex items-center gap-2">
                  <Icon name="Mail" size={20} />
                  info@investinpuglia.eu
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator with glass effect */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full">
            <Icon name="ArrowDown" size={24} className="text-white" />
          </div>
        </div>
      </section>

      {/* Grant Source Institutions Section - Glass Design */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                FUNDING PROGRAM AFFILIATION
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Grant Source <strong className="font-bold">Institutions</strong>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Invest in Puglia™ is your trusted connection to verified local professionals who ensure 
                your grant applications succeed and your projects avoid the common pitfalls that cost time and money.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
              <p className="text-center text-sm text-gray-600 mb-6 font-medium">
                This grant opportunity is co-financed by:
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-12 mb-8">
                <div className="flex flex-col items-center">
                  <img 
                    src="/EN_co_fundedvertical_RGB_POS.png" 
                    alt="Co-funded by the European Union" 
                    className="h-24 w-auto mb-2"
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src="/regione_puglia-Photoroom.png" 
                    alt="Regione Puglia" 
                    className="h-20 w-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">Regione Puglia</p>
                  <p className="text-xs text-gray-500">POR Puglia 2014-2027</p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-xs text-gray-500 text-center italic">
                  <strong>Disclaimer:</strong> Invest in Puglia™ is an independent private consultancy and is not 
                  affiliated with or endorsed by Regione Puglia or the European Union.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section - Glass Cards over Gradient */}
      <section className="py-20 relative bg-gradient-to-br from-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Icon name="Target" size={20} />
              THE SMART APPROACH
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Why Risk It? <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Work with Proven Experts</strong>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
              <div className="mb-4">
                <Icon name="AlertTriangle" size={48} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Avoid €100k+ Mistakes</h3>
              <p className="text-gray-700">
                95% of foreign investors overpay or face legal issues. Our vetted network of 
                local architects, engineers, and lawyers protect your investment.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
              <div className="mb-4">
                <Icon name="Check" size={48} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Real References</h3>
              <p className="text-gray-700">
                Every professional in our network has completed 10+ successful projects. 
                Check references, see real results, work with confidence.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
              <div className="mb-4">
                <Icon name="Trophy" size={48} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">Guaranteed Success</h3>
              <p className="text-gray-700">
                Our network has secured €50M+ in grants with 95% approval rate. 
                We know exactly what works and what doesn't.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Modern Glass Process */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900 text-white relative overflow-hidden" id="how-it-works">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <Icon name="RefreshCw" size={20} />
              YOUR SUCCESS PATH
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
              From Vision to <strong className="font-bold">Profitable Reality</strong>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
              <div className="mb-4">
                <Icon name="Shield" size={48} className="text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Due Diligence</h3>
              <p className="text-gray-300">
                Our experts uncover hidden issues before you buy, saving you from costly surprises
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
              <div className="mb-4">
                <Icon name="Users" size={48} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Local Team</h3>
              <p className="text-gray-300">
                Work with architects, engineers, and contractors who have proven track records
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
              <div className="mb-4">
                <Icon name="Banknote" size={48} className="text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Grant Success</h3>
              <p className="text-gray-300">
                95% approval rate because we know exactly what grant evaluators require
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
              <div className="mb-4">
                <Icon name="TrendingUp" size={48} className="text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-rose-400">ROI Maximized</h3>
              <p className="text-gray-300">
                Avoid overpaying, secure maximum grants, achieve 25%+ annual returns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Buyer Profile Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg animate-pulse">
              <Icon name="Sparkles" size={20} />
              NEW FEATURE
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
              Get Your Personalized <strong className="font-bold">Buyer Profile</strong>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Join our exclusive database of qualified property buyers and get matched with perfect investment opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Icon name="Target" size={24} />
                  Get Matched with Properties
                </h3>
                <p className="text-white/80">
                  Our AI-powered system matches your requirements with available properties and grants
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Icon name="Bell" size={24} />
                  Priority Notifications
                </h3>
                <p className="text-white/80">
                  Be the first to know about new properties that match your investment criteria
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Icon name="Handshake" size={24} />
                  Connect with Top Agents
                </h3>
                <p className="text-white/80">
                  Qualified real estate professionals compete to serve your specific needs
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all">
              <div className="text-center">
                <div className="mb-4">
                  <Icon name="ClipboardList" size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Complete Your Profile</h3>
                <p className="text-white/80 mb-6">
                  10-minute questionnaire to understand your:
                </p>
                <ul className="text-left space-y-2 mb-8 text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-300">•</span> Investment budget & financing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-300">•</span> Property preferences & locations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-300">•</span> Timeline & readiness
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-300">•</span> Grant eligibility factors
                  </li>
                </ul>
                <a 
                  href="/buyer-profile" 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all w-full justify-center"
                >
                  Start Your Profile
                  <Icon name="ArrowRight" size={20} />
                </a>
                <p className="text-sm text-white/60 mt-4">
                  Free • No obligation • 100% confidential
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Giuseppe - Glass Card Design */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-emerald-50 relative overflow-hidden" id="advisor">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Icon name="User" size={20} />
              YOUR ADVISOR
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Meet <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Giuseppe Funaro</strong>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your strategic partner in Italian property investment success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-3xl transform rotate-3"></div>
              <img 
                src="/Giuseppe Funaro 062025.jpg" 
                alt="Giuseppe Funaro - Property Investment Advisor Puglia" 
                className="relative rounded-3xl shadow-2xl w-full transform -rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
            
            <div>
              <div className="prose prose-lg">
                <p className="text-lg text-gray-700 mb-6">
                  After 35+ years in international business, I've seen too many investors lose fortunes 
                  due to language barriers, cultural misunderstandings, and working with the wrong people. 
                  That's why I've built a network of only the most trusted, proven professionals in Puglia.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      <strong>Every professional vetted</strong> - minimum 10 successful projects required
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      <strong>Real references provided</strong> - talk to past clients before you commit
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      <strong>Fixed pricing agreements</strong> - no surprise costs or delays
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <Icon name="Check" size={20} className="text-green-600 mt-1" />
                    <span className="text-gray-700">
                      <strong>Full project oversight</strong> - I personally ensure standards are met
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-emerald-100 rounded-2xl p-6 border border-white/50 shadow-lg">
                  <p className="text-sm text-gray-600 italic mb-2">
                    "I don't just give advice - I connect you with the exact professionals who have 
                    successfully completed similar projects. Your success is guaranteed because you're 
                    working with proven experts, not taking chances."
                  </p>
                  <p className="text-sm font-semibold text-gray-800">— Giuseppe Funaro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Glass Cards with Hover Effects */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Icon name="Wrench" size={20} />
              PROFESSIONAL TOOLS
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Your Complete <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Protection System</strong>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stop gambling with your investment - work with verified professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-white/50">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="mb-6 group-hover:scale-110 transition-transform">
                <Icon name="Calculator" size={56} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Grant Calculators</h3>
              <p className="mb-6 text-gray-600">
                AI-powered tools to instantly calculate your eligibility for up to €2.25M in grants
              </p>
              <CTAButton 
                variant="custom"
                href="/calculator"
                text="Try Calculator"
                location="services"
                className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
                showIcon={true}
              />
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-white/50">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="mb-6 group-hover:scale-110 transition-transform">
                <Icon name="Search" size={56} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Due Diligence Reports</h3>
              <p className="mb-6 text-gray-600">
                Uncover hidden problems BEFORE you buy - structural issues, legal problems, true costs
              </p>
              <CTAButton 
                variant="custom"
                href="/surveys"
                text="Order Survey"
                location="services"
                className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
                showIcon={true}
              />
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-white/50">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="mb-6 group-hover:scale-110 transition-transform">
                <Icon name="ClipboardList" size={56} className="text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Verified Professionals</h3>
              <p className="mb-6 text-gray-600">
                Connect with pre-vetted architects, engineers, contractors with proven track records
              </p>
              <CTAButton 
                variant="custom"
                href="https://calendly.com/investinpuglia/30min"
                text="Book Expert Call"
                location="services"
                className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
                showIcon={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Glass Cards on Dark Background */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <Icon name="Star" size={20} />
              PROVEN RESULTS
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
              Success Stories That <strong className="font-bold">Inspire</strong>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={20} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-4 text-white/90">
                "We saved €180k by avoiding a property with hidden structural issues that Giuseppe's 
                team discovered. His network is worth their weight in gold."
              </p>
              <div className="pt-4 border-t border-white/20">
                <p className="font-semibold">Mark Thompson</p>
                <p className="text-sm text-white/70">UK Investor • Lecce Project</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={20} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-4 text-white/90">
                "The architect Giuseppe recommended completed our project 2 months early and 
                €50k under budget. Real professionals make all the difference!"
              </p>
              <div className="pt-4 border-t border-white/20">
                <p className="font-semibold">Sophie Laurent</p>
                <p className="text-sm text-white/70">French Investor • Ostuni Villa</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={20} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-4 text-white/90">
                "Other investors we know spent 3x more and still have problems. Giuseppe's 
                team handled everything perfectly - grants approved, project profitable!"
              </p>
              <div className="pt-4 border-t border-white/20">
                <p className="font-semibold">James Mitchell</p>
                <p className="text-sm text-white/70">US Investor • Gallipoli Resort</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-8 text-white/90 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full">
              <div>
                <p className="text-4xl font-bold">€50M+</p>
                <p className="text-sm">Grants Secured by Network</p>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div>
                <p className="text-4xl font-bold">€100k+</p>
                <p className="text-sm">Average Savings Per Client</p>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div>
                <p className="text-4xl font-bold">Zero</p>
                <p className="text-sm">Project Failures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean Glass Design */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Icon name="HelpCircle" size={20} />
              COMMON QUESTIONS
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Everything You Need to <strong className="font-bold">Know</strong>
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                What are the biggest risks for foreign investors?
              </h3>
              <p className="text-gray-700">
                Language barriers, hiring unvetted contractors, missing grant deadlines, and 
                overpaying for properties. Most lose €100k+ to avoidable mistakes. Our verified 
                network eliminates these risks completely.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                How do you protect my investment?
              </h3>
              <p className="text-gray-700">
                Every professional is pre-vetted with 10+ successful projects. You get references, 
                fixed-price contracts, and I personally oversee your project. We've never had a 
                failure because we only work with proven experts.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                How much are Puglia property grants?
              </h3>
              <p className="text-gray-700">
                Foreign investors can secure up to €2.25M for property investment 
                in Puglia through Mini PIA grants, covering 35-65% of eligible costs.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Best areas for Puglia property investment?
              </h3>
              <p className="text-gray-700">
                Top investment zones: Lecce (cultural capital), coastal properties 
                in Gallipoli and Otranto, trulli properties in Valle d'Itria, 
                and emerging areas near Brindisi airport.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Can foreigners buy property in Puglia?
              </h3>
              <p className="text-gray-700">
                Yes, EU and non-EU citizens can freely purchase property in Puglia. 
                Our advisory services handle all legal requirements and maximize 
                available grants for foreign investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Gradient with Glass Elements */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-emerald-600 text-white relative overflow-hidden animate-gradient bg-[length:400%_400%]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-light mb-6">
              Don't Learn the Hard Way<br/><strong className="font-bold">Start Smart</strong>
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Why risk your investment? Work with professionals who guarantee success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAButton 
                variant="calculator"
                location="footer-cta"
                className="text-lg px-10 py-5 bg-white text-purple-700 hover:bg-gray-100 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              />
              <CTAButton 
                variant="custom"
                href="https://calendly.com/investinpuglia/30min"
                text="Book Expert Call"
                location="footer-cta"
                className="text-lg px-10 py-5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              />
            </div>
            
            <p className="mt-8 text-sm text-white/70 flex items-center justify-center gap-2">
              <Icon name="AlertTriangle" size={16} />
              Warning: 95% of investors who go it alone face major problems. Don't be one of them.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
