'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatCurrency, getCategoryDisplayName } from '@/lib/sanity/renovation'
import { 
  Building2, MapPin, Calendar, TrendingUp, Users, Award,
  CheckCircle, Search, Filter, ChevronRight, Euro, Clock
} from 'lucide-react'

interface PortfolioClientProps {
  projects: any[]
  pageSettings: any
}

export default function PortfolioClient({ projects, pageSettings }: PortfolioClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Get unique categories and statuses from projects
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]
  const statuses = ['all', ...Array.from(new Set(projects.map(p => p.status)))]

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Calculate statistics
  const totalInvestment = projects.reduce((sum, p) => sum + (p.investment?.amount || 0), 0)
  const averageROI = projects.reduce((sum, p) => sum + (p.investment?.roi || 0), 0) / projects.length
  const totalProjects = projects.length
  const completedProjects = projects.filter(p => p.status === 'completed').length

  useEffect(() => {
    // Scroll animations
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

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
              Renovation & Restructuring Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 animate-fade-up animation-delay-200">
              Engineer Architect Cataldo Russo's Excellence in Puglia Development
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fade-up animation-delay-400">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">
                  {formatCurrency(totalInvestment)}
                </div>
                <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Total Investment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">{totalProjects}+</div>
                <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">{averageROI.toFixed(0)}%</div>
                <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Average ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">{completedProjects}</div>
                <div className="text-sm uppercase tracking-wider opacity-90 mt-2">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{getCategoryDisplayName(cat)}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-on-scroll"
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-indigo-400 to-purple-600">
                  {project.mainImage ? (
                    <Image
                      src={project.mainImage}
                      alt={project.mainImageAlt || project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 className="h-24 w-24 text-white/30" />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                      {getCategoryDisplayName(project.category)}
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'completed' || project.status === 'delivered'
                        ? 'bg-green-500 text-white' 
                        : project.status === 'in-progress'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {project.status?.replace('-', ' ').charAt(0).toUpperCase() + project.status?.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location?.city}, {project.location?.province}
                    {project.investment?.completionYear && (
                      <>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.investment.completionYear}
                      </>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                  {/* Investment Info */}
                  {project.investment && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {project.investment.amount && (
                        <div className="bg-indigo-50 rounded-lg p-3">
                          <div className="text-xs text-indigo-600 mb-1">Investment</div>
                          <div className="text-lg font-bold text-indigo-900">
                            {formatCurrency(project.investment.amount)}
                          </div>
                        </div>
                      )}
                      {project.investment.roi && (
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-xs text-green-600 mb-1">ROI</div>
                          <div className="text-lg font-bold text-green-900">{project.investment.roi}%</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {project.features.slice(0, 3).map((feature: string, i: number) => (
                        <div key={i} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.metrics.size && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {project.metrics.size}
                        </span>
                      )}
                      {project.metrics.rooms && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {project.metrics.rooms} rooms
                        </span>
                      )}
                      {project.metrics.capacity && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {project.metrics.capacity} guests
                        </span>
                      )}
                    </div>
                  )}

                  {/* Architect */}
                  <div className="text-xs text-gray-500 border-t pt-3">
                    {project.architect || 'Engineer Architect Cataldo Russo'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No projects found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 animate-on-scroll">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-95 animate-on-scroll">
            Partner with Puglia's leading renovation and development experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link
              href="/book-consultation"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              Contact Us
            </Link>
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

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  )
}