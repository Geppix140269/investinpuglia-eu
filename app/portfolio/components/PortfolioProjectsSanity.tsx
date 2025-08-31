'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Euro, Calendar, CheckCircle, Crown, Building2, Home, ChevronRight, Award } from 'lucide-react'
import { sanity } from '@/lib/sanity'
import { urlFor } from '@/sanity/lib/image'
import { getProjectImage } from './projectImageMap'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  status: string
  location: {
    city: string
    province: string
    region: string
  }
  description: string
  mainImage?: any
  investment?: {
    amount: number
    roi?: number
    completionYear?: number
  }
  metrics?: {
    rooms?: number
    capacity?: number
    occupancyRate?: number
    eventsPerYear?: number
  }
  featured?: boolean
}

const categoryMap = {
  'luxury-hotel': '5-Star Luxury Hotels & Masserias',
  'beach-resort': 'Beach Resorts & Tourism Properties',
  'historic-restoration': 'Heritage & Castle Restorations',
  'business-hotel': '4-Star Business Hotels'
}

const categoryIcons = {
  'luxury-hotel': <Crown className="h-5 w-5" />,
  'beach-resort': <Building2 className="h-5 w-5" />,
  'historic-restoration': <Home className="h-5 w-5" />,
  'business-hotel': <Building2 className="h-5 w-5" />
}

export default function PortfolioProjectsSanity() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "renovationProject"] | order(order asc, _createdAt desc) {
          _id,
          title,
          slug,
          category,
          status,
          location,
          description,
          mainImage,
          investment,
          metrics,
          featured
        }`
        const data = await sanity.fetch(query)
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category
    if (!acc[category]) acc[category] = []
    acc[category].push(project)
    return acc
  }, {} as Record<string, Project[]>)

  const filteredProjects = selectedCategory === 'all' 
    ? Object.entries(groupedProjects)
    : Object.entries(groupedProjects).filter(([cat]) => cat === selectedCategory)

  const formatValue = (amount: number) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`
    }
    return `€${(amount / 1000).toFixed(0)}K`
  }

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading portfolio projects...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="h-4 w-4" />
              PROVEN TRACK RECORD
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              €100M+ in Successful Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From historic masserias to international resort chains, explore our track record of transforming properties into profitable luxury destinations
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Projects
            </button>
            {Object.entries(categoryMap).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {categoryIcons[key as keyof typeof categoryIcons]}
                {label}
              </button>
            ))}
          </div>
          
          {/* Projects Display */}
          {filteredProjects.map(([category, categoryProjects]) => (
            <div key={category} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-4 rounded-2xl text-white shadow-lg">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {categoryMap[category as keyof typeof categoryMap]}
                  </h3>
                  <p className="text-gray-600">{categoryProjects.length} Projects Completed</p>
                </div>
              </div>
              
              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProjects.map((project) => (
                  <div 
                    key={project._id} 
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={getProjectImage(project.slug.current)}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Value Badge */}
                      {project.investment?.amount && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                            {formatValue(project.investment.amount)}
                          </div>
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-700">
                          {project.status === 'completed' ? 'Completed' : project.status}
                          {project.investment?.completionYear && ` ${project.investment.completionYear}`}
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                        {project.title}
                      </h4>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{project.location.city}, {project.location.province}</span>
                        </div>
                        {project.investment?.roi && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <span className="font-semibold text-gray-900">{project.investment.roi}% ROI</span>
                          </div>
                        )}
                        {project.metrics?.rooms && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span>{project.metrics.rooms} Rooms</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <button className="w-full flex items-center justify-between text-emerald-600 hover:text-emerald-700 transition-colors font-semibold">
                          <span>View Details</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Summary Stats */}
          <div className="mt-16 bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">€100M+</div>
                <div className="text-emerald-200">Total Investment Value</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">€25M+</div>
                <div className="text-emerald-200">Grants Secured</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-emerald-200">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-emerald-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}