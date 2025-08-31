import Image from 'next/image'
import { Building2, Star, Home, MapPin } from 'lucide-react'

interface Project {
  name: string
  location: string
  value: string
  grant: string
  status: string
  description: string
  imageUrl?: string
}

interface MajorProjectCategory {
  category: string
  icon: JSX.Element
  projects: Project[]
}

interface MajorProjectsSectionProps {
  majorProjects: MajorProjectCategory[]
}

export default function MajorProjectsSection({ majorProjects }: MajorProjectsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Completed Portfolio of Excellence</h2>
          <p className="text-xl text-gray-600">
            Successfully delivered 5-star hotels and international resort chains
          </p>
        </div>
        
        {majorProjects.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold">{category.category}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {category.projects.map((project, projIndex) => (
                <div key={projIndex} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                    <Image
                      src={project.imageUrl || `/russo-photo.jpg`}
                      alt={project.name}
                      width={600}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-indigo-600">{project.status}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{project.name}</h4>
                        <p className="text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">{project.value}</div>
                        <div className="text-xs text-gray-500">{project.status}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    
                    {project.grant && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <span className="text-sm font-semibold text-green-800">
                          ✓ {project.grant}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}