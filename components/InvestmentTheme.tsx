// components/InvestmentTheme.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Euro, Calendar, Play, ChevronLeft, ChevronRight, TrendingUp, Calculator, FileText, ArrowRight, Check, Award } from 'lucide-react'
import ThreePhaseValueSection from './ThreePhaseValueSection'
import InvestReasons from './InvestReasons'

// Portfolio data
const portfolioProjects = [
  {
    id: 1,
    name: "Baglioni Masseria Muzza 5★",
    location: "Otranto",
    value: "€5.1M",
    year: "2015-2023",
    description: "17th century masseria transformed into Baglioni 5-star luxury resort with world-class spa",
    image: "/Cataldo's projects/baglioni_masseria_muzza.jpg",
    highlight: "PIA Turismo Funded",
    grant: "€2.1M"
  },
  {
    id: 2,
    name: "VOI Alimini Resort (Alpitour)",
    location: "Otranto",
    value: "€1.2M",
    year: "2015-2019",
    description: "Complete renovation: reception, restaurants, spa, 32 rooms for international chain",
    image: "/Cataldo's projects/VOI Alimini Resort.jpg",
    highlight: "International Chain",
    grant: "€480K"
  },
  {
    id: 3,
    name: "Le Cale d'Otranto",
    location: "Otranto",
    value: "€3M",
    year: "2015-2019",
    description: "Complete renovation of blocks A-B-C-D, Pyramid and Tower structures",
    image: "/Cataldo's projects/Le Cale d'Otranto Beach Resort.jpg",
    highlight: "Italia Turismo",
    grant: "€1.2M"
  },
  {
    id: 4,
    name: "Masseria Montelauro",
    location: "Otranto",
    value: "€3.8M",
    year: "2019",
    description: "5-star luxury hotel with 30 suites, spa & fine dining restaurant",
    image: "/Cataldo's projects/masseria montelauro.jpeg",
    highlight: "PIA Turismo",
    grant: "€1.5M"
  }
]

// Video clips
const videoClips = [
  {
    id: 1,
    title: "Luxury Masseria Hotel",
    thumbnail: "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170284/geppix1402_81420_Luxury_Masseria_Hotel_AFTER__Drone_footage_a_6ee2bd3a-89ac-4bfb-a632-da8fe2d1b53a_0_qioxeb.jpg",
    duration: "0:45"
  },
  {
    id: 2,
    title: "Masseria Pool Descent",
    thumbnail: "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1759170286/geppix1402_81420_Slow_drone_descent_towards_masseria_pool_at__43c0b5ca-59f3-43dd-82f1-5a9f498e6369_0_yuu5cw.jpg",
    duration: "1:12"
  },
  {
    id: 3,
    title: "Beach Club Experience",
    thumbnail: "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888562/investinpuglia/hero-videos/beach-club.jpg",
    duration: "0:38"
  },
  {
    id: 4,
    title: "Rooftop Bar View",
    thumbnail: "https://res.cloudinary.com/dusubfxgo/image/upload/f_auto,q_auto:low,w_1920,h_1080,c_limit/v1756888546/investinpuglia/hero-videos/rooftop-bar.jpg",
    duration: "0:52"
  }
]

/**
 * Investment-Focused Theme
 * Professional colors (Navy, Gold, Cyan) + Prominent PIA Grants Section
 */
// Hero images array
const heroImages = [
  '/images/industries/trulli-alberobello.jpg',
  '/images/industries/manufacturing-puglia.jpg'
]

export default function InvestmentTheme() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [investmentAmount, setInvestmentAmount] = useState(1000000)
  const [grantType, setGrantType] = useState('miniPIA')
  const [currentHeroImage, setCurrentHeroImage] = useState(0)

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length)
  }

  const currentProject = portfolioProjects[currentSlide]

  // Simple grant calculator
  const calculateGrant = () => {
    if (grantType === 'miniPIA') {
      // Mini PIA: 45% of max project value €5M = max grant €2.25M
      const cappedInvestment = Math.min(investmentAmount, 5000000)
      const grant = cappedInvestment * 0.45
      return grant
    } else {
      // PIA Turismo: 35% non-refundable grant, max €20M
      const grant = Math.min(investmentAmount * 0.35, 20000000)
      return grant
    }
  }

  const grantAmount = calculateGrant()
  const grantPercentage = grantType === 'miniPIA' ? 45 : 35
  const maxGrant = grantType === 'miniPIA' ? '€2.25M' : '€20M'

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
      {/* Hero Section - Investment Focus */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image - Rotating */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Investment in Puglia ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentHeroImage ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Darker overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block bg-orange-500 text-white font-sans text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wide shadow-2xl">
              🏆 Over €25M in Grants Secured
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white" style={{textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)'}}>
            Strategic Investment in Puglia
            <span className="block font-bold mt-4 leading-tight" style={{
              background: 'linear-gradient(to right, #fbbf24, #34d399, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'brightness(1.4) contrast(1.2)',
              textShadow: 'none'
            }}>
              Tourism & Industrial Development
            </span>
          </h1>

          <p className="font-sans text-base md:text-lg text-white mb-8 max-w-3xl mx-auto leading-relaxed" style={{textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)'}}>
            Your trusted <strong className="text-white">Investment Advisors & Project Orchestrators</strong> for foreign investors in Puglia.
          </p>

          <p className="font-sans text-base md:text-lg text-white mb-12 max-w-3xl mx-auto leading-relaxed" style={{textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)'}}>
            Unlock exceptional returns with Italian government grants covering up to 50% of your investment
            in <strong className="text-yellow-300">tourism</strong> (hotels, resorts, hospitality) and <strong className="text-cyan-300">industrial</strong> (data centers, manufacturing, logistics) projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="relative overflow-hidden px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-white border-2 border-white/40 hover:border-white/60" style={{
              background: 'rgba(74, 144, 226, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(74, 144, 226, 0.5), 0 4px 12px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
            }}>
              <span className="relative z-10">Calculate Your Grant</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </button>
            <button className="relative overflow-hidden px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-white border-2 border-white/40 hover:border-white/60" style={{
              background: 'rgba(249, 115, 22, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(249, 115, 22, 0.5), 0 4px 12px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
            }}>
              <span className="relative z-10">View Portfolio</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </button>
          </div>

          {/* Stats - Glass Morphism Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: '€100M+', label: 'Total Projects', icon: TrendingUp },
              { value: '€25M', label: 'Grants Secured', icon: Award },
              { value: '50%', label: 'Max Grant Rate', icon: Calculator },
              { value: '50+', label: 'Success Stories', icon: Check }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg text-center border border-white/10">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
                <div className="font-display text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="font-sans text-xs tracking-wide uppercase text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMINENT MINI PIA & PIA GRANTS SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-secondary mb-4 inline-block text-sm">
              💰 NON-REFUNDABLE GRANTS
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-primary-700 leading-tight">
              PIA Grant Calculator
            </h2>
            <p className="font-sans text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Calculate your eligible non-refundable grant from Italian government programs for
              <strong className="text-navy-900"> tourism</strong> (hotels, resorts, hospitality) and
              <strong className="text-navy-900"> industrial</strong> (data centers, manufacturing, logistics) investments
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: Calculator */}
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-200">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-navy-900">
                    Quick Grant Estimator
                  </h3>
                  <p className="font-sans text-sm text-neutral-600">
                    Instant calculation of your potential grant
                  </p>
                </div>
              </div>

              {/* Grant Type Selection */}
              <div className="mb-6">
                <label className="block font-sans text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
                  Select Grant Program
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGrantType('miniPIA')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      grantType === 'miniPIA'
                        ? 'border-secondary-600 bg-secondary-50'
                        : 'border-neutral-200 bg-white hover:border-secondary-300'
                    }`}
                  >
                    <div className="font-sans text-sm font-bold text-navy-900 mb-1">
                      Mini PIA
                    </div>
                    <div className="font-sans text-xs text-neutral-600">
                      45% grant • Max €5M
                    </div>
                  </button>
                  <button
                    onClick={() => setGrantType('piaTurismo')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      grantType === 'piaTurismo'
                        ? 'border-secondary-600 bg-secondary-50'
                        : 'border-neutral-200 bg-white hover:border-secondary-300'
                    }`}
                  >
                    <div className="font-sans text-sm font-bold text-navy-900 mb-1">
                      PIA Turismo
                    </div>
                    <div className="font-sans text-xs text-neutral-600">
                      35% grant • Max €20M
                    </div>
                  </button>
                </div>
              </div>

              {/* Investment Amount Slider */}
              <div className="mb-6">
                <label className="block font-sans text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
                  Total Investment Amount
                </label>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-secondary-600"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="font-sans text-xs text-neutral-500">€100K</span>
                  <div className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-primary-700">
                    €{(investmentAmount / 1000000).toFixed(2)}M
                  </div>
                  <span className="font-sans text-xs text-neutral-500">€5M</span>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="font-sans text-xs uppercase tracking-wide text-neutral-600 mb-2">
                      Grant Rate
                    </div>
                    <div className="font-display text-2xl font-bold text-navy-900">
                      {grantPercentage}%
                    </div>
                  </div>
                  <div>
                    <div className="font-sans text-xs uppercase tracking-wide text-neutral-600 mb-2">
                      Maximum Grant
                    </div>
                    <div className="font-display text-2xl font-bold text-navy-900">
                      {maxGrant}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <div className="font-sans text-xs uppercase tracking-wide text-neutral-600 mb-2">
                    Your Estimated Grant
                  </div>
                  <div className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-accent-600">
                    €{(grantAmount / 1000).toFixed(0)}K
                  </div>
                  <div className="font-sans text-sm text-neutral-600 mt-2">
                    Your investment: €{((investmentAmount - grantAmount) / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Link href="/property-calculator" className="relative overflow-hidden flex items-center justify-center gap-2 text-gray-800 px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wide hover:scale-105 transition-all border-2 border-white/40 hover:border-white/60" style={{
                  background: 'rgba(74, 144, 226, 0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(74, 144, 226, 0.5), 0 4px 12px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
                }}>
                  <span className="relative z-10 flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Full Calculator
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </Link>
                <Link href="/mini-pia-guide" className="relative overflow-hidden flex items-center justify-center gap-2 text-gray-800 px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wide hover:scale-105 transition-all border-2 border-white/40 hover:border-white/60" style={{
                  background: 'rgba(249, 115, 22, 0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(249, 115, 22, 0.5), 0 4px 12px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
                }}>
                  <span className="relative z-10 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Complete Guide
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </Link>
              </div>
            </div>

            {/* RIGHT: Program Benefits */}
            <div className="space-y-6">
              <div className="glass-card border-l-4 border-secondary-600">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-secondary-700" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-navy-900 mb-2 leading-tight">
                      Mini PIA Grant
                    </h4>
                    <ul className="space-y-2 font-sans text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                        <span><strong>45% non-refundable grant</strong> up to €5 million</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                        <span>Tourism: Hotels, B&Bs, resorts, hospitality facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                        <span>Industrial: Small manufacturing, logistics, tech facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                        <span>Fast-track approval process (3-6 months)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-card border-l-4 border-primary-600">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-navy-900 mb-2 leading-tight">
                      PIA Grant (Tourism & Industrial)
                    </h4>
                    <ul className="space-y-2 font-sans text-sm text-neutral-700">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span><strong>35% non-refundable grant</strong> for Tourism up to €20 million</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span>Tourism: Major hotels, resorts, large hospitality projects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span>Industrial: Data centers, manufacturing plants, logistics hubs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span>Full advisory support from application to project completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-card bg-gradient-to-br from-accent-50 to-primary-50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-navy-900 mb-2 leading-tight">
                      Your Investment Advisors & Project Orchestrators
                    </h4>
                    <p className="font-sans text-sm text-neutral-700 mb-3 leading-relaxed">
                      We orchestrate and advise foreign investors on tourism and industrial projects in Puglia.
                      Over <strong>€25M in grants secured</strong> and 30+ years of renovation expertise.
                    </p>
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                    >
                      Schedule Free Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Portfolio Slider */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-primary mb-4 inline-block">
            30+ Years of Renovation Expertise
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-primary-700 mb-4 leading-tight">
            Selected Renovation Projects
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-4">
            A selection of renovation and restructuring projects conducted by our team over the past 30 years in Puglia
          </p>
          <p className="font-sans text-sm text-neutral-500 max-w-2xl mx-auto italic">
            Values shown represent total project costs (renovation & restructuring), not property values.
            Showcasing our expertise in transforming historic properties and commercial facilities.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={currentProject.image}
                  alt={currentProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-secondary">
                    {currentProject.highlight}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-navy-900/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="font-sans text-xs text-neutral-300 uppercase tracking-wide mb-1">
                    Grant Secured
                  </div>
                  <div className="font-display text-2xl font-bold text-secondary-400">
                    {currentProject.grant}
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-4 leading-tight">
                  {currentProject.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <span className="font-sans text-base text-neutral-700">{currentProject.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Euro className="h-5 w-5 text-secondary-600" />
                    <div className="flex flex-col">
                      <span className="font-sans text-lg font-bold text-neutral-900">{currentProject.value}</span>
                      <span className="font-sans text-xs text-neutral-500">Total renovation cost</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent-600" />
                    <span className="font-sans text-base text-neutral-700">{currentProject.year}</span>
                  </div>
                </div>

                <p className="font-sans text-base text-neutral-600 mb-8 leading-relaxed">
                  {currentProject.description}
                </p>

                <Link href="/portfolio" className="relative overflow-hidden inline-block text-gray-800 px-8 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all border-2 border-white/40 hover:border-white/60" style={{
                  background: 'rgba(74, 144, 226, 0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(74, 144, 226, 0.5), 0 4px 12px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
                }}>
                  <span className="relative z-10">View Full Portfolio</span>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
          >
            <ChevronLeft className="h-6 w-6 text-navy-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
          >
            <ChevronRight className="h-6 w-6 text-navy-900" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {portfolioProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-gradient-to-r from-secondary-600 to-primary-600'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10 Reasons to Invest Section */}
      <InvestReasons />

      {/* Three Phase Value Section */}
      <ThreePhaseValueSection />

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-primary-900 to-accent-900">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="glass-card-dark">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to Start Your Investment in Puglia?
            </h2>
            <p className="font-sans text-base md:text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
              As your <strong className="text-secondary-400">Investment Advisors</strong> and <strong className="text-accent-400">Project Orchestrators</strong>,
              we guide foreign investors through every step of tourism and industrial development in Puglia.
            </p>
            <p className="font-sans text-base text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              From grant applications to project completion, we orchestrate your success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative overflow-hidden px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-white border-2 border-white/40 hover:border-white/60" style={{
                background: 'rgba(249, 115, 22, 0.25)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(249, 115, 22, 0.5), 0 4px 12px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
              }}>
                <span className="relative z-10">Schedule Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </button>
              <Link href="/mini-pia-guide" className="relative overflow-hidden inline-block px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wide hover:scale-105 transition-all text-white border-2 border-white/40 hover:border-white/60" style={{
                background: 'rgba(74, 144, 226, 0.25)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(74, 144, 226, 0.5), 0 4px 12px rgba(74, 144, 226, 0.3), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)'
              }}>
                <span className="relative z-10">Download PIA Guide</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
