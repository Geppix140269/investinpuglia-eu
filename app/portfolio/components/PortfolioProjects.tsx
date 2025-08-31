import React from 'react'
import Image from 'next/image'
import { MapPin, Euro, Calendar, CheckCircle, Star, Building2, Home, Crown } from 'lucide-react'
import { majorProjects } from './projectsData'

export default function PortfolioProjects() {
  const getIcon = (category: string) => {
    switch(category) {
      case "5-Star Luxury Hotels & Masserias":
        return <Crown className="h-8 w-8" />
      case "Beach Resorts & Tourism Properties":
        return <Building2 className="h-8 w-8" />
      case "Heritage & Castle Restorations":
        return <Home className="h-8 w-8" />
      default:
        return <Building2 className="h-8 w-8" />
    }
  }

  const getCategoryGradient = (category: string) => {
    switch(category) {
      case "5-Star Luxury Hotels & Masserias":
        return "from-amber-600 to-amber-700"
      case "Beach Resorts & Tourism Properties":
        return "from-emerald-600 to-emerald-700"
      case "Heritage & Castle Restorations":
        return "from-slate-600 to-slate-700"
      default:
        return "from-emerald-600 to-emerald-700"
    }
  }

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            €100M+ Major Projects Portfolio
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Three decades of successfully delivered luxury hotels, heritage restorations, and world-class resort developments across Puglia
          </p>
        </div>
        
        {majorProjects.map((category, catIndex) => (
          <div key={catIndex} className="mb-20">
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className={`bg-gradient-to-r ${getCategoryGradient(category.category)} p-4 rounded-2xl text-white shadow-xl`}>
                {getIcon(category.category)}
              </div>
              <h3 className="text-3xl font-bold text-slate-800">{category.category}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {category.projects.map((project, projIndex) => (
                <div key={projIndex} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  {project.imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {/* Project value badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                        <span className="text-sm font-bold text-emerald-600">{project.value}</span>
                      </div>
                    </div>
                  )}
                  <div className="p-8">
                    <h4 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {project.name}
                    </h4>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <span>{project.status}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-600">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm font-semibold text-emerald-800">{project.grant}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-xl mb-8 text-emerald-100">
              Let's discuss how we can transform your investment vision into reality
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all hover:scale-105 shadow-xl"
            >
              Start Your Project Today
              <Star className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}