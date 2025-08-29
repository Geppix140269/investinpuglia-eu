'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RenovationExpertiseClient() {
  const [activeSliders, setActiveSliders] = useState<{[key: string]: number}>({
    masseria: 50,
    trulli: 50
  })

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated')
        }
      })
    }, observerOptions)
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleSliderChange = (project: string, value: number) => {
    setActiveSliders(prev => ({
      ...prev,
      [project]: value
    }))
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Puglia Renovation & Restructuring Excellence
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 animate-fade-up animation-delay-200">
            Engineer Architect Cataldo Russo - Transforming Puglia's Heritage into Premium Investments
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 animate-fade-up animation-delay-400">
            <div className="text-center">
              <div className="text-4xl font-bold">50+</div>
              <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">€95M+</div>
              <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Development Value</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">30%</div>
              <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">15+</div>
              <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">Our Expertise</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-on-scroll">
            Specialized renovation and restructuring services for premium properties in Puglia
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏛️',
                title: 'Historic Restoration',
                description: 'Expert restoration of masserias, trulli, and historic palazzos preserving authentic Puglian architecture while integrating modern luxury amenities.'
              },
              {
                icon: '🏨',
                title: 'Luxury Hotel Development',
                description: 'Complete transformation of properties into world-class hospitality venues, including 5-star hotels and boutique resorts with proven occupancy rates.'
              },
              {
                icon: '🏖️',
                title: 'Coastal Resort Planning',
                description: 'Strategic development of beachfront properties and eco-resorts, maximizing sea views and creating sustainable tourism destinations.'
              },
              {
                icon: '🏡',
                title: 'Residential Conversion',
                description: 'Converting agricultural buildings into luxury residences, maintaining traditional charm while ensuring modern comfort and energy efficiency.'
              },
              {
                icon: '📐',
                title: 'Urban Planning & Permits',
                description: 'Complete management of zoning approvals, building permits, and regulatory compliance for complex development projects.'
              },
              {
                icon: '🌿',
                title: 'Sustainable Design',
                description: 'Integration of renewable energy, water conservation, and eco-friendly materials meeting international sustainability standards.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">Featured Projects</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-on-scroll">
            Discover our portfolio of successful renovations and developments across Puglia
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Oasi Sarparea */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
                  Oasi Sarparea Eco-Resort
                </div>
              </div>
              <div className="p-6">
                <span className="text-indigo-600 text-sm uppercase tracking-wider">Eco-Resort Development</span>
                <h3 className="text-2xl font-bold mt-2 mb-3">Oasi Sarparea</h3>
                <p className="text-gray-600 mb-4">
                  41-hectare holistic wellness resort in Nardò featuring 95,000 mc of luxury accommodations, spa facilities, and sustainable architecture integrated with Mediterranean nature.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="font-bold text-lg">€45M</div>
                    <div className="text-xs text-gray-500 uppercase">Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">2024</div>
                    <div className="text-xs text-gray-500 uppercase">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">35%</div>
                    <div className="text-xs text-gray-500 uppercase">Projected ROI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Baglioni Hotel */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll">
              <div className="h-64 relative">
                <Image
                  src="/projects/baglioni-pool.jpg"
                  alt="Baglioni Hotel Masseria Muzza"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-indigo-600 text-sm uppercase tracking-wider">5-Star Hotel</span>
                <h3 className="text-2xl font-bold mt-2 mb-3">Baglioni Hotel Masseria Muzza</h3>
                <p className="text-gray-600 mb-4">
                  Complete renovation of historic masseria into ultra-luxury hotel with 30 suites, Michelin-star restaurant potential, and world-class spa facilities in Otranto.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="font-bold text-lg">€28M</div>
                    <div className="text-xs text-gray-500 uppercase">Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">2023</div>
                    <div className="text-xs text-gray-500 uppercase">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">28%</div>
                    <div className="text-xs text-gray-500 uppercase">Annual ROI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Riva Marina */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll">
              <div className="h-64 relative">
                <Image
                  src="/projects/riva-marina-exterior.jpg"
                  alt="Riva Marina Resort"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-indigo-600 text-sm uppercase tracking-wider">Beach Resort</span>
                <h3 className="text-2xl font-bold mt-2 mb-3">Riva Marina Resort</h3>
                <p className="text-gray-600 mb-4">
                  Transformation of coastal property into premier beach resort with 120 rooms, conference facilities, multiple restaurants, and private beach access.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="font-bold text-lg">€35M</div>
                    <div className="text-xs text-gray-500 uppercase">Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">2022</div>
                    <div className="text-xs text-gray-500 uppercase">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">85%</div>
                    <div className="text-xs text-gray-500 uppercase">Occupancy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Santa Lucia */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll">
              <div className="h-64 relative">
                <Image
                  src="/projects/santa-lucia-wedding.jpg"
                  alt="Santa Lucia Estate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-indigo-600 text-sm uppercase tracking-wider">Event Venue</span>
                <h3 className="text-2xl font-bold mt-2 mb-3">Santa Lucia Estate</h3>
                <p className="text-gray-600 mb-4">
                  Historic villa restoration creating exclusive wedding and event venue with accommodation for 50 guests, panoramic terraces, and traditional gardens.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="font-bold text-lg">€8M</div>
                    <div className="text-xs text-gray-500 uppercase">Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">2021</div>
                    <div className="text-xs text-gray-500 uppercase">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">150+</div>
                    <div className="text-xs text-gray-500 uppercase">Events/Year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 animate-on-scroll">Investment Performance</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '280%', label: 'Average Property Value Increase' },
              { value: '18', label: 'Months Average ROI Timeline' },
              { value: '92%', label: 'Client Satisfaction Rate' },
              { value: '100%', label: 'Permit Approval Success' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="text-5xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 animate-on-scroll">Ready to Transform Your Investment?</h2>
          <p className="text-xl mb-8 opacity-95 animate-on-scroll">
            Partner with Puglia's leading renovation and development experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <a
              href="/book-consultation"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Schedule Consultation
            </a>
            <a
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              View Full Portfolio
            </a>
          </div>

          {/* Current Opportunities */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <h3 className="text-2xl font-bold mb-8">Current Investment Opportunities</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-2">Coastal Resort Development</h4>
                <p className="text-sm opacity-90 mb-3">12-hectare beachfront property near Porto Cesareo</p>
                <p className="font-bold text-lg">€18M investment</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-2">Historic Palazzo Restoration</h4>
                <p className="text-sm opacity-90 mb-3">17th-century palazzo in Lecce city center</p>
                <p className="font-bold text-lg">€6.5M investment</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-2">Masseria Hotel Conversion</h4>
                <p className="text-sm opacity-90 mb-3">8-hectare estate with olive groves near Ostuni</p>
                <p className="font-bold text-lg">€12M investment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.8s ease forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .animate-on-scroll.animated {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  )
}