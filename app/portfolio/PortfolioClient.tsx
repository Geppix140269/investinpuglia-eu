'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Building2, MapPin, Calendar, TrendingUp, Users, Award,
  CheckCircle, Euro, Clock, Briefcase, Star, Shield,
  Home, FileCheck, Hammer, Target
} from 'lucide-react'

interface PortfolioClientProps {
  projects: any[]
  pageSettings: any
}

export default function PortfolioClient({ projects, pageSettings }: PortfolioClientProps) {
  const [activeTab, setActiveTab] = useState('credentials')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Cataldo Russo's impressive statistics
  const stats = {
    totalValue: 95000000, // €95M+ in completed projects
    projectsCompleted: 50,
    grantsSecured: 20000000, // €20M in grants secured
    yearsExperience: 29, // Since 1995
    successRate: 95,
    averageROI: 35
  }

  // Key credentials to highlight
  const credentials = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Licensed Engineer-Architect",
      description: "Registered with Lecce Order of Engineers (#1697) since 1995",
      highlight: "110/110 Cum Laude"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "ITACA Protocol Certified",
      description: "Certified for sustainable construction and energy efficiency standards",
      highlight: "Since 2016"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Fire Safety Specialist",
      description: "Ministry of Interior certified for fire prevention systems",
      highlight: "Law 818/84"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Grant Funding Expert",
      description: "€20M+ in secured funding (PIA Turismo, PSR, POIN, L.488)",
      highlight: "95% Success Rate"
    }
  ]

  // Major project categories with real examples from CV
  const majorProjects = [
    {
      category: "5-Star Luxury Hotels",
      icon: <Star className="h-8 w-8" />,
      projects: [
        {
          name: "Hotel Masseria Muzza",
          location: "Otranto",
          value: "€4,500,000",
          grant: "PIA Turismo Funded",
          status: "Completed 2015",
          description: "Complete transformation into 5-star luxury hotel"
        },
        {
          name: "Masseria Donna Menga",
          location: "Nardò",
          value: "€2,300,000",
          grant: "PIA Turismo Funded",
          status: "Completed 2024",
          description: "Rural tourism excellence"
        }
      ]
    },
    {
      category: "International Resort Chains",
      icon: <Building2 className="h-8 w-8" />,
      projects: [
        {
          name: "VOI Hotels (Alpitour World)",
          location: "Otranto",
          value: "€1,320,000",
          grant: "Multiple phases",
          status: "2015-2019",
          description: "Complete renovation of resort facilities"
        },
        {
          name: "Le Cale d'Otranto (Italia Turismo)",
          location: "Otranto",
          value: "€3,000,000",
          grant: "Phased development",
          status: "2015-2019",
          description: "Major tourist village restructuring"
        }
      ]
    },
    {
      category: "Historic Restorations",
      icon: <Home className="h-8 w-8" />,
      projects: [
        {
          name: "Castello di Noha",
          location: "Galatina",
          value: "€1,300,000",
          grant: "Titolo II Turismo",
          status: "Completed 2022",
          description: "Medieval castle to luxury accommodation"
        },
        {
          name: "Masseria San Giuseppe",
          location: "Otranto",
          value: "€1,800,000",
          grant: "Protected monument",
          status: "Completed 2008",
          description: "D.Lgs. 42/04 protected heritage site"
        }
      ]
    }
  ]

  // Financial expertise showcase
  const financialExpertise = [
    { label: "PIA Turismo", amount: "€15M+", description: "Major tourism grants secured" },
    { label: "Titolo II", amount: "€8M+", description: "Development funding obtained" },
    { label: "PSR/POIN", amount: "€5M+", description: "Rural development funds" },
    { label: "L.488", amount: "€3M+", description: "Investment law benefits" }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section - Professional & Impressive */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("/pattern.svg")',
            backgroundRepeat: 'repeat'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Professional Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-bold uppercase tracking-wider">Established 1995</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Dott. Ing. Cataldo Russo
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 mb-2">
                Engineer-Architect | Tourism Development Specialist
              </p>
              <p className="text-lg text-gray-300">
                Order of Engineers, Province of Lecce - Reg. #1697
              </p>
            </div>
            
            {/* Impressive Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">€95M+</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Project Value</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">50+</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Hotels Built</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">€20M</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Grants Secured</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">29</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">95%</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">35%</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Avg. ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why International Investors Choose Russo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three decades of excellence in tourism development with proven grant funding expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-6 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                    {cred.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{cred.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{cred.description}</p>
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                      {cred.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Projects Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Portfolio of Excellence</h2>
            <p className="text-xl text-gray-600">
              From 5-star hotels to international resort chains
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

      {/* Grant Funding Expertise */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">€20 Million in Secured Funding</h2>
            <p className="text-xl text-indigo-100">
              Proven expertise in navigating Italian and EU grant systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {financialExpertise.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{item.amount}</div>
                <div className="text-lg font-semibold mb-2">{item.label}</div>
                <div className="text-sm text-indigo-200">{item.description}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-6">
              "Since most of my projects have successfully obtained funding (L.488, PIA Turismo, PSR, POIN), 
              I have developed specific expertise in technical-administrative procedures for grants 
              valued at approximately €20,000,000 in approved and completed projects."
            </p>
            <p className="text-sm italic">- Dott. Ing. Cataldo Russo</p>
          </div>
        </div>
      </section>

      {/* Public Sector Trust */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Trusted by Government</h2>
                <p className="text-gray-700 mb-6">
                  Extensive experience with public sector projects demonstrates reliability and compliance expertise
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Municipality of Otranto - Multiple infrastructure projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Province of Lecce - School renovations (€2M+)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Protected monuments restoration specialist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Port Authority planning and development</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="font-bold text-lg mb-4">Government Certifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="font-semibold">D.Lgs 81/2008</div>
                      <div className="text-sm text-gray-600">Safety Coordinator</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <FileCheck className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="font-semibold">Seismic Zone Design</div>
                      <div className="text-sm text-gray-600">Ordinance 3274/2003</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="font-semibold">Heritage Restoration</div>
                      <div className="text-sm text-gray-600">D.Lgs. 42/04 Specialist</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Full-Service Development Team</h2>
            <p className="text-xl text-gray-600">
              Complete project delivery from concept to operation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Core Team</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Arch. Wanda Barca - Heritage Restoration (La Sapienza Rome)</li>
                <li>• Ing. Paolo Meleti - MEP Systems Specialist</li>
                <li>• Ing. Matteo Pellegrino - Environmental Engineer</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Technical Capabilities</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Advanced structural engineering (seismic design)</li>
                <li>• Bioclimatic architecture & energy efficiency</li>
                <li>• Heritage restoration & conservation</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Project Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Complete design-build services</li>
                <li>• Construction supervision & safety</li>
                <li>• Grant application & compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Partner with Proven Excellence</h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Join international investors who have successfully developed premium tourism properties in Puglia 
            with Cataldo Russo's expertise
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400">29</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">€95M+</div>
                <div className="text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm">Grant Success</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-consultation"
              className="bg-white text-indigo-900 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Schedule Investment Consultation
            </Link>
            <a
              href="tel:+393475330647"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-all"
            >
              Call: +39 347 533 0647
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}