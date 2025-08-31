'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, MapPin, Euro, Calendar, ExternalLink } from 'lucide-react'

const portfolioProjects = [
  {
    id: 1,
    name: "Baglioni Masseria Muzza 5★",
    location: "Otranto",
    value: "€5.1M",
    year: "2015-2023",
    description: "17th century masseria transformed into Baglioni 5-star luxury resort with world-class spa",
    image: "/baglioni_masseria_muzza_gallery_601da4b9a3.jpg",
    highlight: "PIA Turismo Funded"
  },
  {
    id: 2,
    name: "VOI Alimini Resort (Alpitour)",
    location: "Otranto",
    value: "€1.2M",
    year: "2015-2019",
    description: "Complete renovation: reception, restaurants, spa, 32 rooms for international chain",
    image: "/voi-alimini.webp",
    highlight: "International Chain"
  },
  {
    id: 3,
    name: "Le Cale d'Otranto",
    location: "Otranto",
    value: "€3M",
    year: "2015-2019",
    description: "Complete renovation of blocks A-B-C-D, Pyramid and Tower structures",
    image: "/blue-otranto.jpg",
    highlight: "Italia Turismo"
  },
  {
    id: 4,
    name: "Hotel degli Haethey",
    location: "Otranto",
    value: "€2.5M",
    year: "2003-2006",
    description: "Hotel expansion and elevation project with modern amenities",
    image: "/hotel-haethey.jpg",
    highlight: "Expansion Project"
  },
  {
    id: 5,
    name: "Masseria Montelauro",
    location: "Otranto",
    value: "€3.8M",
    year: "2019",
    description: "5-star luxury hotel with 30 suites, spa & fine dining restaurant",
    image: "/montelauro.jpg",
    highlight: "PIA Turismo"
  },
  {
    id: 6,
    name: "Nohasi Palace Hotel",
    location: "Noha, Galatina",
    value: "€1.3M",
    year: "2022",
    description: "Historic palace restoration for luxury tourist accommodation",
    image: "/nohasi-palace.jpg",
    highlight: "Heritage Restoration"
  },
  {
    id: 7,
    name: "Torre Matta",
    location: "Otranto",
    value: "€600K",
    year: "2016",
    description: "Historic tower restoration - Important public heritage project",
    image: "/torre-matta.jpg",
    highlight: "Public Heritage"
  },
  {
    id: 8,
    name: "Masseria Donna Menga",
    location: "Nardò",
    value: "€2.3M",
    year: "2024",
    description: "Rural tourism facility development with modern luxury amenities",
    image: "/donna-menga.jpg",
    highlight: "Rural Tourism"
  }
]

export default function PortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === portfolioProjects.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === 0 ? portfolioProjects.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === portfolioProjects.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const currentProject = portfolioProjects[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("/pattern.svg")',
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Investment Portfolio
          </h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-2">
            29 Years of Excellence in Tourism Development
          </p>
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">€80M+</div>
              <div className="text-sm text-indigo-200">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">35+</div>
              <div className="text-sm text-indigo-200">Hotels & Resorts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">€20M</div>
              <div className="text-sm text-indigo-200">Grants Secured</div>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={currentProject.image}
                  alt={currentProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold text-sm">
                  {currentProject.highlight}
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4">{currentProject.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-yellow-400" />
                    <span className="text-lg">{currentProject.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Euro className="h-5 w-5 text-yellow-400" />
                    <span className="text-lg font-bold">{currentProject.value}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <span className="text-lg">{currentProject.year}</span>
                  </div>
                </div>

                <p className="text-indigo-100 mb-8 text-lg">
                  {currentProject.description}
                </p>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors w-fit"
                >
                  View Full Portfolio
                  <ExternalLink className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {portfolioProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-yellow-400' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-indigo-200 mb-4">
            Led by Dott. Ing. Cataldo Russo - 29 years of proven excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Explore Full Portfolio
            </Link>
            <Link
              href="/book-consultation"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-all"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}