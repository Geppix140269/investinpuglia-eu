'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { 
  Building2, MapPin, Calendar, TrendingUp, Users, Award,
  CheckCircle, Euro, Clock, Briefcase, Star, Shield,
  Home, FileCheck, Hammer, Target, ArrowRight, Sparkles
} from 'lucide-react'

interface Project {
  name: string
  location: string
  value: string
  grant: string
  status: string
  description: string
  imageUrl?: string
}

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
      highlight: "110/110"
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
          name: "Hotel Shantiland",
          location: "Otranto",
          value: "€2,167,400",
          grant: "PIA Turismo",
          status: "In Progress 2022",
          description: "New tourist accommodation development",
          imageUrl: "https://res.cloudinary.com/dusubfxgo/image/upload/v1756631635/shantiland_tacrma.jpg"
        },
        {
          name: "Hotel degli Haethey",
          location: "Otranto",
          value: "€2,500,000",
          grant: "L.R. 8/98 + DPR 447/95",
          status: "2001-2006",
          description: "Hotel expansion and elevation project",
          imageUrl: "/hotel-haethey.jpg"
        },
        {
          name: "Masseria San Giuseppe",
          location: "Otranto",
          value: "€2,600,000",
          grant: "Titolo II Turismo",
          status: "2005-2022",
          description: "D.Lgs. 42/04 protected monument, spa and rooms",
          imageUrl: "/masseria-muzza.jpg"
        },
        {
          name: "Hotel Koinè",
          location: "Otranto",
          value: "€3,500,000",
          grant: "Private Investment",
          status: "2002-2006",
          description: "Recreational structure transformation to tourist accommodation",
          imageUrl: "/hotel-koine.jpg"
        },
        {
          name: "Masseria Montelauro",
          location: "Otranto",
          value: "€3,800,000",
          grant: "PIA Turismo Funded",
          status: "Completed 2019",
          description: "5-star luxury hotel with 30 suites, spa & fine dining restaurant",
          imageUrl: "/montelauro.jpg"
        },
        {
          name: "Hotel Bellavista",
          location: "Otranto",
          value: "€1,000,000",
          grant: "Titolo II Turismo",
          status: "2021-2022",
          description: "Complete hotel renovation",
          imageUrl: "/hotel-bellavista.webp"
        },
        {
          name: "Hotel Basiliani",
          location: "Otranto",
          value: "€2,500,000",
          grant: "Private Investment",
          status: "2005-2009",
          description: "New room block zone B construction",
          imageUrl: "/hotel-basiliani.jpg"
        },
        {
          name: "Hotel Petraria",
          location: "Cannole",
          value: "€5,500,000",
          grant: "Private Investment",
          status: "2002-2008",
          description: "Tourist accommodation development",
          imageUrl: "/hotel-petraria.jpg"
        },
        {
          name: "Hotel Bellaria",
          location: "Giurdignano",
          value: "€2,000,000",
          grant: "Private Investment",
          status: "2004-2007",
          description: "Tourist accommodation facility",
          imageUrl: "/hotel-bellaria.jpg"
        }
      ]
    },
    {
      category: "International Resort Chains",
      icon: <Building2 className="h-8 w-8" />,
      projects: [
        {
          name: "VOI Alimini Resort",
          location: "Otranto",
          value: "€1,120,000",
          grant: "Private Investment",
          status: "2015-2019",
          description: "Reception, restaurant, pub, 32 rooms renovation, new spa, beach restaurant",
          imageUrl: "/voi-alimini.webp"
        },
        {
          name: "Le Cale d'Otranto - Italia Turismo",
          location: "Otranto",
          value: "€3,000,000",
          grant: "Private Investment",
          status: "2015-2019",
          description: "Complete renovation blocks A-B-C-D, Pyramid and Tower structures",
          imageUrl: "/blue-otranto.jpg"
        },
        {
          name: "Hotel Pietra Verde",
          location: "Otranto",
          value: "€300,000",
          grant: "Private Investment",
          status: "2001-2002",
          description: "Hotel restructuring project with architectural and structural work",
          imageUrl: "/pietra-verde.jpg"
        },
        {
          name: "Baglioni Masseria Muzza 5*",
          location: "Otranto",
          value: "€4,500,000",
          grant: "PIA Turismo + Titolo II",
          status: "2011-2023",
          description: "17th century masseria transformed into Baglioni 5-star resort with spa",
          imageUrl: "/baglioni_masseria_muzza_gallery_601da4b9a3.jpg"
        }
      ]
    },
    {
      category: "Historic Restorations",
      icon: <Home className="h-8 w-8" />,
      projects: [
        {
          name: "Castello di Noha - Nohasi Palace",
          location: "Noha, Galatina",
          value: "€1,300,000",
          grant: "Titolo II Turismo",
          status: "2019-2022",
          description: "Historic palace restoration for tourist accommodation",
          imageUrl: "/nohasi-palace.jpg"
        },
        {
          name: "Masseria Donna Menga",
          location: "Nardò",
          value: "€3,600,000",
          grant: "PIA Turismo",
          status: "2018-2024",
          description: "Rural tourism facility development L.R. 20/98",
          imageUrl: "/donna-menga.jpg"
        },
        {
          name: "Masseria Lu Furca",
          location: "Otranto",
          value: "€1,200,000",
          grant: "Private Investment",
          status: "2007-2024",
          description: "Agriturismo development and expansion",
          imageUrl: "/masseria-furca.jpg"
        },
        {
          name: "Torre Matta",
          location: "Otranto",
          value: "€600,000",
          grant: "Public Works",
          status: "Completed 2016",
          description: "Historic tower restoration - Important public heritage project",
          imageUrl: "/torre-matta.jpg"
        },
        {
          name: "Hypogeum Palazzo",
          location: "Otranto",
          value: "€2,000,000",
          grant: "Private Investment",
          status: "Completed 2015",
          description: "Hotel residence complex with underground archaeological area",
          imageUrl: "/hypogeum.jpg"
        },
        {
          name: "Dimora di Giuseppe",
          location: "Otranto",
          value: "€800,000",
          grant: "Private Investment",
          status: "2018-2020",
          description: "Historic building restoration for luxury accommodation",
          imageUrl: "/dimora-giuseppe.jpg"
        }
      ]
    }
  ]

  // Financial expertise showcase - From CV: "€20.000.000 di importo lavori, per progetti redatti ed approvati"
  const financialExpertise = [
    { label: "Total Grants", amount: "€20M", description: "Projects approved and funded" },
    { label: "PIA Turismo", amount: "Multiple", description: "Tourism development grants" },
    { label: "Titolo II", amount: "Multiple", description: "Business expansion funding" },
    { label: "L.488/PSR", amount: "Multiple", description: "Investment & rural funds" }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section - InvestInPuglia Portfolio */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("/pattern.svg")',
            backgroundRepeat: 'repeat'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* InvestInPuglia Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-bold uppercase tracking-wider">Proven Excellence Since 1995</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                InvestInPuglia Portfolio
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 mb-2">
                29 Years of Tourism Development Excellence
              </p>
              <p className="text-lg text-gray-300">
                Led by our Chief Technical Officer - Dott. Ing. Cataldo Russo
              </p>
            </div>
            
            {/* Impressive Stats Grid - Based on CV actual data */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">€80M+</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Total Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">35+</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Hotels/Resorts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">€20M</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Grants Secured</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">29</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Years Since 1995</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">D.Lgs 42/04</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Heritage Expert</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">ITACA</div>
                <div className="text-xs uppercase tracking-wider opacity-90 mt-1">Certified 2016</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Leadership */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Expert Team</h2>
            <p className="text-xl text-gray-600">
              Complete project delivery from concept to operation
            </p>
          </div>
          
          {/* Team Leadership */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Cataldo's Photo */}
              <div className="md:col-span-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-30"></div>
                  <img
                    src="/russo-photo.jpg"
                    alt="Dott. Ing. Cataldo Russo"
                    className="rounded-full w-48 h-48 mx-auto border-4 border-white shadow-xl object-cover"
                  />
                </div>
              </div>
              
              {/* Cataldo's Info */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2">Dott. Ing. Cataldo Russo</h3>
                <p className="text-indigo-600 font-semibold mb-3">Chief Technical Officer & Lead Engineer-Architect</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Cataldo's Professional Certifications:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Order of Engineers Lecce #1697
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ITACA Protocol Certified
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Fire Safety Specialist (L.818/84)
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                      D.Lgs 81/2008 Safety Coordinator
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  With nearly three decades of experience, <strong>Ing. Cataldo Russo</strong> personally leads our technical team in delivering 
                  world-class tourism developments. His direct expertise in grant funding and regulatory compliance 
                  has secured over €20 million in funding for international investors.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">29</div>
                    <div className="text-sm text-gray-600">Cataldo's Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">50+</div>
                    <div className="text-sm text-gray-600">Hotels by Cataldo</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">95%</div>
                    <div className="text-sm text-gray-600">Cataldo's Grant Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Supporting Team */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Cataldo's Team</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Arch. Wanda Barca - Heritage Restoration (La Sapienza Rome)</li>
                <li>• Ing. Paolo Meleti - MEP Systems Specialist</li>
                <li>• Ing. Matteo Pellegrino - Environmental Engineer</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Cataldo's Technical Expertise</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Advanced structural engineering (seismic design certified)</li>
                <li>• Bioclimatic architecture & energy efficiency (ITACA certified)</li>
                <li>• Heritage restoration & conservation (D.Lgs. 42/04 specialist)</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-3">Services Led by Cataldo</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Complete design-build services (29 years experience)</li>
                <li>• Construction supervision & safety (D.Lgs 81/2008 certified)</li>
                <li>• Grant application & compliance (€20M+ secured)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why International Investors Choose InvestInPuglia</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our technical team combines three decades of excellence with proven grant funding expertise
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
                    {/* Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                      <img
                        src={project.imageUrl || `/russo-photo.jpg`}
                        alt={project.name}
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
              "Our team has successfully obtained funding through L.488, PIA Turismo, PSR, and POIN programs, 
              developing specific expertise in technical-administrative procedures for grants 
              valued at approximately €20,000,000 in approved and completed projects."
            </p>
            <p className="text-sm italic">- InvestInPuglia Technical Team</p>
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

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Partner with Proven Excellence</h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Join international investors who have successfully developed premium tourism properties in Puglia 
            with InvestInPuglia's proven expertise
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
              href="tel:+393514001402"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-all"
            >
              Call: +39 351 400 1402
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}