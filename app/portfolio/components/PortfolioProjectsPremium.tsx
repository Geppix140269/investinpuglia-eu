import React, { useState } from 'react'
import Image from 'next/image'
import { MapPin, Euro, Calendar, CheckCircle, Star, Building2, Home, Briefcase, ChevronRight, Award } from 'lucide-react'
import { majorProjectsPremium } from './projectsDataPremium'

export default function PortfolioProjectsPremium() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getIcon = (category: string) => {
    switch(category) {
      case "5-Star Luxury Hotels":
        return <Star className="h-5 w-5" />
      case "International Resort Chains":
        return <Building2 className="h-5 w-5" />
      case "Heritage & Castle Restorations":
        return <Home className="h-5 w-5" />
      case "4-Star Business Hotels":
        return <Briefcase className="h-5 w-5" />
      default:
        return <Building2 className="h-5 w-5" />
    }
  }

  const filteredProjects = selectedCategory === 'all' 
    ? majorProjectsPremium 
    : majorProjectsPremium.filter(cat => cat.category === selectedCategory)

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="h-4 w-4" />
              COMPLETED PORTFOLIO
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              €100M+ Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three decades of transforming historic masserias and heritage properties into profitable luxury destinations across Puglia
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Projects
            </button>
            {majorProjectsPremium.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  selectedCategory === category.category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {getIcon(category.category)}
                {category.category}
              </button>
            ))}
          </div>
          
          {/* Projects Display */}
          {filteredProjects.map((category, catIndex) => (
            <div key={catIndex} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl text-white shadow-lg">
                  {getIcon(category.category)}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{category.category}</h3>
                  <p className="text-gray-600">{category.projects.length} Projects Completed</p>
                </div>
              </div>
              
              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.projects.map((project, projIndex) => (
                  <div 
                    key={projIndex} 
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/800x600/1e40af/ffffff?text=${encodeURIComponent(project.name)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-green-700">
                          {project.status.includes('Completed') ? 'Completed' : project.status}
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h4>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Euro className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">{project.value}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{project.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">{project.grant}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 transition-colors">
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Summary Stats */}
          <div className="mt-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">€100M+</div>
                <div className="text-blue-200">Total Investment Value</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">€20M+</div>
                <div className="text-blue-200">Grants Secured</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-200">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}