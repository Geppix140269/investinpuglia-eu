// components/PersonalizedZaraTheme.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Euro, Calendar, Play, ChevronLeft, ChevronRight } from 'lucide-react'

// Portfolio data from existing PortfolioSlider
const portfolioProjects = [
  {
    id: 1,
    name: "Baglioni Masseria Muzza 5★",
    location: "Otranto",
    value: "€5.1M",
    year: "2015-2023",
    description: "17th century masseria transformed into Baglioni 5-star luxury resort with world-class spa",
    image: "/Cataldo's projects/baglioni_masseria_muzza.jpg",
    highlight: "PIA Turismo Funded"
  },
  {
    id: 2,
    name: "VOI Alimini Resort (Alpitour)",
    location: "Otranto",
    value: "€1.2M",
    year: "2015-2019",
    description: "Complete renovation: reception, restaurants, spa, 32 rooms for international chain",
    image: "/Cataldo's projects/VOI Alimini Resort.jpg",
    highlight: "International Chain"
  },
  {
    id: 3,
    name: "Le Cale d'Otranto",
    location: "Otranto",
    value: "€3M",
    year: "2015-2019",
    description: "Complete renovation of blocks A-B-C-D, Pyramid and Tower structures",
    image: "/Cataldo's projects/Le Cale d'Otranto Beach Resort.jpg",
    highlight: "Italia Turismo"
  },
  {
    id: 4,
    name: "Hotel degli Haethey",
    location: "Otranto",
    value: "€2.5M",
    year: "2003-2006",
    description: "Hotel expansion and elevation project with modern amenities",
    image: "/Cataldo's projects/hotel haethey otranto.jpg",
    highlight: "Expansion Project"
  },
  {
    id: 5,
    name: "Masseria Montelauro",
    location: "Otranto",
    value: "€3.8M",
    year: "2019",
    description: "5-star luxury hotel with 30 suites, spa & fine dining restaurant",
    image: "/Cataldo's projects/masseria montelauro.jpeg",
    highlight: "PIA Turismo"
  },
  {
    id: 6,
    name: "Nohasi Palace Hotel",
    location: "Noha, Galatina",
    value: "€1.3M",
    year: "2022",
    description: "Historic palace restoration for luxury tourist accommodation",
    image: "/Cataldo's projects/nohasi palace hotel and spa.jpg",
    highlight: "Heritage Restoration"
  }
]

// Video clips data (placeholder for now)
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
 * Personalized Zara-Inspired Theme Component
 * Clean Zara aesthetic + Brand colors + Glass morphism + Real portfolio data
 */
export default function PersonalizedZaraTheme() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length)
  }

  const currentProject = portfolioProjects[currentSlide]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Hero Section - Minimalist with Glass Morphism */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-accent-600/5 to-secondary-600/10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="badge badge-primary mb-4 inline-block">
              Luxury Real Estate
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-accent-600 to-secondary-600">
            INVEST IN PUGLIA
          </h1>

          <p className="font-sans text-base md:text-lg tracking-wide text-neutral-700 mb-12 max-w-2xl mx-auto">
            Where timeless Italian elegance meets modern investment opportunities.
            Over 30 years of excellence in Puglia's luxury real estate market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="cta-button cta-primary">
              Explore Portfolio
            </button>
            <button className="cta-button cta-secondary">
              Book Consultation
            </button>
          </div>

          {/* Stats - Glass Morphism Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { value: '€100M+', label: 'Total Projects' },
              { value: '50+', label: 'Hotels & Resorts' },
              { value: '€25M', label: 'Grants Secured' }
            ].map((stat, idx) => (
              <div key={idx} className="glass-card text-center">
                <div className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 mb-2">
                  {stat.value}
                </div>
                <div className="font-sans text-sm tracking-wide uppercase text-neutral-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Video Clips Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-neutral-900 via-primary-900 to-accent-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-accent mb-4 inline-block">
              Visual Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Experience Puglia in Motion
            </h2>
            <p className="font-sans text-lg text-neutral-300 max-w-2xl mx-auto">
              Discover our portfolio through stunning drone footage and immersive video tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoClips.map((clip) => (
              <div key={clip.id} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Glass Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 group-hover:bg-primary-600/80 transition-all">
                      <Play className="h-6 w-6 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-semibold">
                    {clip.duration}
                  </div>
                </div>

                <h3 className="font-sans text-sm font-semibold mt-3 tracking-wide uppercase text-white/90 group-hover:text-primary-300 transition-colors">
                  {clip.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="cta-button cta-primary">
              View All Videos
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties Slider - Using Real Portfolio Data */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-secondary mb-4 inline-block">
            Portfolio Highlights
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mb-4">
            Transforming Puglia's Landscape
          </h2>
          <p className="font-sans text-lg text-neutral-600 max-w-2xl mx-auto">
            Over 30 years of excellence in hotels, masserie, and landmark restorations
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={currentProject.image}
                  alt={currentProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-accent">
                    {currentProject.highlight}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                <h3 className="font-display text-3xl font-bold text-neutral-900 mb-4">
                  {currentProject.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <span className="font-sans text-base text-neutral-700">{currentProject.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Euro className="h-5 w-5 text-secondary-600" />
                    <span className="font-sans text-lg font-bold text-neutral-900">{currentProject.value}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent-600" />
                    <span className="font-sans text-base text-neutral-700">{currentProject.year}</span>
                  </div>
                </div>

                <p className="font-sans text-base text-neutral-600 mb-8 leading-relaxed">
                  {currentProject.description}
                </p>

                <Link href="/portfolio" className="cta-button cta-primary w-fit">
                  View Full Portfolio
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6 text-neutral-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6 text-neutral-900" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {portfolioProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-gradient-to-r from-primary-600 to-secondary-600'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Glass Morphism */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-secondary-600">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="glass-card-dark">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Start Your Investment Journey
            </h2>
            <p className="font-sans text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join over 100+ successful investors who have transformed their vision into reality in Puglia
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cta-button cta-primary">
                Schedule Consultation
              </button>
              <button className="cta-button cta-secondary">
                Download Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
