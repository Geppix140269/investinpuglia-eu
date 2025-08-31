import Image from 'next/image'
import { Sparkles, MapPin, CheckCircle, Target, Clock } from 'lucide-react'

interface FinancedProject {
  name: string
  location: string
  description: string
  grant: string
  imageUrl: string
  fundingDetails: {
    totalInvestment: string
    grantAmount: string
    privateEquity: string
    expectedStart: string
  }
}

interface FinancedProjectsSectionProps {
  financedProjects: FinancedProject[]
}

export default function FinancedProjectsSection({ financedProjects }: FinancedProjectsSectionProps) {
  if (financedProjects.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold text-lg">Upcoming Projects</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Fully Financed & Ready to Launch</h2>
          <p className="text-xl text-gray-600">
            Projects with secured funding awaiting construction start
          </p>
        </div>
        
        <div className="grid lg:grid-cols-1 gap-8 max-w-5xl mx-auto">
          {financedProjects.map((project, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-yellow-400">
            {/* Project Image Header */}
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={1200}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-4xl font-bold mb-2">{project.name}</h3>
                <div className="flex items-center gap-2 text-xl">
                  <MapPin className="h-6 w-6" />
                  <span>{project.location}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                FUNDING SECURED
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Project Details */}
                <div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">{project.description}</p>
                  
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-green-800">{project.grant}</span>
                    </div>
                    <div className="text-sm text-green-700">
                      All funding approved and secured. Ready for implementation.
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Expected Start: <strong>{project.fundingDetails.expectedStart}</strong></span>
                  </div>
                </div>
                
                {/* Funding Breakdown */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-4">Investment Structure</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="text-2xl font-bold">{project.fundingDetails.totalInvestment}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                      <span className="text-gray-600">Grant Funding</span>
                      <span className="text-xl font-bold text-green-600">{project.fundingDetails.grantAmount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Private Equity</span>
                      <span className="text-xl font-bold text-blue-600">{project.fundingDetails.privateEquity}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-yellow-100 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-yellow-700" />
                      <span className="text-sm font-medium text-yellow-800">
                        Pre-construction phase: Final permits pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}