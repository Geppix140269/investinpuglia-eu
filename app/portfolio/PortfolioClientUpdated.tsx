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
  Home, FileCheck, Hammer, Target, ArrowRight, Sparkles,
  User, AlertCircle
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

  // Projects Financed but Not Started Yet - NOW EMPTY AS SHANTILAND MOVED TO SEPARATE SECTION
  const financedProjects = [];

  // Major project categories with real examples from CV - UPDATED IMAGE PATHS
  const majorProjects = [
    {
      category: "5-Star Luxury Hotels",
      icon: <Star className="h-8 w-8" />,
      projects: [
        {
          name: "Masseria San Giuseppe",
          location: "Otranto",
          value: "€2,600,000",
          grant: "Titolo II Turismo",
          status: "2005-2022",
          description: "D.Lgs. 42/04 protected monument, spa and rooms",
          imageUrl: "/Cataldo's projects/dimora san giuseppe.jpg"
        },
        {
          name: "Hotel Bellavista",
          location: "Otranto",
          value: "€1,000,000",
          grant: "Titolo II Turismo",
          status: "2021-2022",
          description: "Complete hotel renovation",
          imageUrl: "/Cataldo's projects/Hotel-Bellavista.webp"
        },
        {
          name: "Masseria Montelauro",
          location: "Otranto",
          value: "€3,300,000",
          grant: "PIA Turismo Funded",
          status: "Completed 2019",
          description: "5-star luxury hotel with 30 suites, spa & fine dining restaurant",
          imageUrl: "/Cataldo's projects/masseria montelauro.jpeg"
        },
        {
          name: "Hotel Basiliani",
          location: "Otranto",
          value: "€2,500,000",
          grant: "Private Investment",
          status: "2005-2009",
          description: "New room block zone B construction",
          imageUrl: "/Cataldo's projects/Basiliani.jpg"
        },
        {
          name: "Hotel Petraria",
          location: "Cannole",
          value: "€5,500,000",
          grant: "Private Investment",
          status: "2002-2008",
          description: "Tourist accommodation development",
          imageUrl: "/Cataldo's projects/hotel petraria cannole.jpg"
        },
        {
          name: "Hotel Bellaria",
          location: "Giurdignano",
          value: "€2,000,000",
          grant: "Private Investment",
          status: "2004-2007",
          description: "Tourist accommodation facility",
          imageUrl: "/Cataldo's projects/Residence Bellaria giurdignano.jpg"
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
          name: "Hotel degli Haethey",
          location: "Otranto",
          value: "€2,500,000",
          grant: "L.R. 8/98 + DPR 447/95",
          status: "2001-2006",
          description: "Hotel expansion and elevation project",
          imageUrl: "/Cataldo's projects/hotel haethey otranto.jpg"
        }
      ]
    },
    {
      category: "International Resort Chains",
      icon: <Building2 className="h-8 w-8" />,
      projects: [
        {
          name: "Baglioni Masseria Muzza",
          location: "Otranto",
          value: "€5,500,000",
          grant: "PIA Turismo + Titolo II",
          status: "2011-2023",
          description: "17th century masseria transformed into Baglioni 5-star resort with spa",
          imageUrl: "/Cataldo's projects/baglioni_masseria_muzza.jpg"
        },
        {
          name: "VOI Hotels (Alpitour World)",
          location: "Otranto - Alimini",
          value: "€650,000",
          grant: "Private Investment",
          status: "2015-2019",
          description: "Reception, restaurant, pub, 32 rooms renovation, new spa, beach restaurant",
          imageUrl: "/Cataldo's projects/VOI Alimini Resort.jpg"
        },
        {
          name: "Le Cale d'Otranto (Italia Turismo)",
          location: "Otranto",
          value: "€1,600,000",
          grant: "Private Investment",
          status: "2015-2019",
          description: "Complete renovation blocks A-B-C-D, Pyramid and Tower structures",
          imageUrl: "/Cataldo's projects/Le Cale d'Otranto Beach Resort.jpg"
        },
        {
          name: "Hotel Pietra Verde",
          location: "Otranto",
          value: "€500,000",
          grant: "Private Investment",
          status: "2001-2002",
          description: "Hotel restructuring project with architectural and structural work",
          imageUrl: "/pietra-verde.jpg"
        }
      ]
    },
    {
      category: "Heritage & Castle Restorations",
      icon: <Home className="h-8 w-8" />,
      projects: [
        {
          name: "Masseria Donna Menga",
          location: "Nardò",
          value: "€2,300,000",
          grant: "PIA Turismo",
          status: "2018-2024",
          description: "Rural tourism facility development L.R. 20/98",
          imageUrl: "/Cataldo's projects/Donna-Menga.webp"
        },
        {
          name: "Masseria Furca",
          location: "Santa Cesarea Terme",
          value: "€1,500,000",
          grant: "Private Investment",
          status: "2007-2024",
          description: "Agriturismo development and expansion",
          imageUrl: "/Cataldo's projects/masseria-furca.jpg"
        },
        {
          name: "Castello di Noha - Nohasi Palace",
          location: "Galatina",
          value: "€1,300,000",
          grant: "Titolo II Turismo",
          status: "2019-2022",
          description: "Historic palace restoration for tourist accommodation",
          imageUrl: "/Cataldo's projects/nohasi palace hotel and spa.jpg"
        },
        {
          name: "Dimora San Giuseppe",
          location: "Uggiano La Chiesa",
          value: "€800,000",
          grant: "Private Investment",
          status: "2018-2020",
          description: "Historic building restoration for luxury accommodation",
          imageUrl: "/Cataldo's projects/dimora san giuseppe.jpg"
        },
        {
          name: "Torre Matta",
          location: "Otranto",
          value: "€600,000",
          grant: "Public Works",
          status: "Completed 2016",
          description: "Historic tower restoration - Important public heritage project",
          imageUrl: "/Cataldo's projects/Torre Matta.jpg"
        },
        {
          name: "Underground Hypogeum Complex",
          location: "Otranto",
          value: "€500,000",
          grant: "Private Investment",
          status: "Completed 2015",
          description: "Hotel residence complex with underground archaeological area",
          imageUrl: "/hypogeum.jpg"
        }
      ]
    }
  ]

  return (
    <>
      <Navbar />
      <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Investment Portfolio
            </h1>
            <p className="text-2xl mb-4 text-indigo-200">
              50+ Successfully Delivered Projects Worth €95M+
            </p>
            <p className="text-lg mb-8 text-gray-300">
              €20M in grants secured • 95% success rate • 29 years of excellence
            </p>
            <p className="text-lg text-gray-300">
              Led by our Chief Technical Officer - Dott. Ing. Cataldo Russo
            </p>
          </div>
          
          {/* Impressive Stats Grid - Based on CV actual data */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{stats.projectsCompleted}+</div>
              <div className="text-sm text-indigo-200">Projects Delivered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">€{(stats.totalValue/1000000).toFixed(0)}M+</div>
              <div className="text-sm text-indigo-200">Total Value</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">€{(stats.grantsSecured/1000000).toFixed(0)}M</div>
              <div className="text-sm text-indigo-200">Grants Secured</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{stats.yearsExperience}</div>
              <div className="text-sm text-indigo-200">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{stats.successRate}%</div>
              <div className="text-sm text-indigo-200">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-3xl font-bold">{stats.averageROI}%</div>
              <div className="text-sm text-indigo-200">Average ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Cataldo Russo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Expert Team</h2>
            <p className="text-xl text-gray-600">
              Complete project delivery from concept to operation
            </p>
          </div>
          
          {/* Cataldo Russo - Main Profile Only (removed extra boxes) */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:grid md:grid-cols-3 gap-8 p-8">
              {/* Photo */}
              <div className="md:col-span-1">
                <div className="relative">
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
                  <p className="text-sm font-semibold text-gray-700 mb-2">Professional Certifications:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Ord. Ing. Lecce #1697
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ITACA Protocol
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Fire Safety L.818/84
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Safety Coord. D.Lgs 81/08
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
                    <div className="text-2xl font-bold text-indigo-600">50+</div>
                    <div className="text-sm text-gray-600">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">€20M+</div>
                    <div className="text-sm text-gray-600">Grants Secured</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">29 Years</div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donna Menga Before/After Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                Featured Transformation
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Masseria Donna Menga
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From Abandoned Heritage to Luxury Resort
              </p>
            </div>

            {/* Before/After Slider */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <BeforeAfterSlider
                beforeImage="/Cataldo's projects/Donna Menga Before.webp"
                afterImage="/Cataldo's projects/Donna-Menga.webp"
                beforeLabel="Before Renovation"
                afterLabel="After Transformation"
                height={600}
              />
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Project Overview</h3>
                <p className="text-gray-600 mb-6">
                  Complete transformation of a historic masseria into a luxury rural tourism destination, 
                  preserving authentic Puglian architecture while introducing modern luxury amenities.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold">Nardò, Puglia</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold text-indigo-600">€2.3M</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600">Funding</span>
                    <span className="font-semibold">PIA Turismo Funded</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-semibold">2024</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-indigo-600">15 Luxury Suites</div>
                    <div className="text-sm text-gray-600">Rooms</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-indigo-600">4,500 sqm</div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-indigo-600">5 Stars</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-indigo-600">35% Expected</div>
                    <div className="text-sm text-gray-600">ROI</div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Historic preservation with modern luxury</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Sustainable energy systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Organic farm-to-table restaurant</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Wellness spa & infinity pool</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Torre Matta - Heritage Showcase */}
      <section className="py-20 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Cataldo's projects/Torre Matta.jpg"
                    alt="Torre Matta - Otranto Castle Underground"
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-2xl p-6 shadow-xl max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">Heritage Excellence</span>
                  </div>
                  <p className="text-sm">2017 National Heritage Restoration Award Winner</p>
                </div>
              </div>

              {/* Content Side */}
              <div>
                <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Home className="h-4 w-4" />
                  Historic Preservation Masterpiece
                </span>
                
                <h2 className="text-4xl font-bold mb-4">Torre Matta</h2>
                <p className="text-xl text-gray-600 mb-6">Otranto Castle Underground Recovery</p>
                
                <p className="text-gray-700 mb-8">
                  Exceptional restoration of Otranto Castle's underground chambers, transforming forgotten medieval spaces 
                  into a cultural heritage site. This project showcases our expertise in preserving historical authenticity 
                  while creating functional modern spaces.
                </p>
                
                {/* Key Achievements */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Project Achievements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">UNESCO Heritage Standards Compliance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Structural reinforcement of 15th-century vaults</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Advanced humidity control systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">LED lighting preserving original atmosphere</span>
                    </div>
                  </div>
                </div>
                
                {/* Impact Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-semibold text-amber-600">50,000+</div>
                    <div className="text-xs text-gray-600">Annual Visitors</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-semibold text-amber-600">12 Jobs</div>
                    <div className="text-xs text-gray-600">Positions Created</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-semibold text-amber-600">€500K</div>
                    <div className="text-xs text-gray-600">Annual Revenue</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-lg font-semibold text-amber-600">2017</div>
                    <div className="text-xs text-gray-600">Award Winner</div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>Otranto Historic Center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold">€600,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>2016</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Projects Showcase */}
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

      {/* Trust Indicators Section - MOVED BELOW PROJECTS */}
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

      {/* Planned Developments - Hotel Shantiland */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full mb-4">
              <Building2 className="h-5 w-5" />
              <span className="font-bold text-lg">Financed & Planned Development</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Hotel Shantiland - New Construction Project</h2>
            <p className="text-xl text-gray-600">
              PIA Turismo approved project with building permit issued October 2024
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-blue-400">
              {/* Project Image Header */}
              <div className="relative h-[400px] overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dusubfxgo/image/upload/v1756631635/shantiland_tacrma.jpg"
                  alt="Hotel Shantiland Rendering"
                  width={1200}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-4xl font-bold mb-2">Hotel Shantiland</h3>
                  <div className="flex items-center gap-2 text-xl">
                    <MapPin className="h-6 w-6" />
                    <span>Otranto</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-400 text-white px-4 py-2 rounded-full font-bold">
                  PERMIT ISSUED - OCT 2024
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Project Details */}
                  <div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      New luxury tourist accommodation development. Full PIA Turismo funding secured and approved. 
                      Building permit (Permesso di Costruire n. 27/2024) issued on October 18, 2024.
                    </p>
                    
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-green-800">PIA Turismo - Fully Approved</span>
                      </div>
                      <div className="text-sm text-green-700">
                        Co-financed by Regione Puglia under Title II - Chapter 6 for tourism investments
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building2 className="h-4 w-4" />
                        <span>Client: <strong>Shantiland srl</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>Project Manager: <strong>Ing. Cataldo Russo</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Construction Start: <strong>2025</strong></span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Funding Breakdown */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                    <h4 className="font-bold text-xl mb-4 text-gray-800">Investment Structure</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600">Total Investment</span>
                        <span className="font-bold text-2xl text-gray-900">€2,167,400</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600">PIA Grant (50%)</span>
                        <span className="font-bold text-xl text-green-600">€1,084,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-gray-600">Private Equity</span>
                        <span className="font-bold text-xl text-blue-600">€1,083,400</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Approval Year</span>
                        <span className="font-bold text-gray-900">2022</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-700" />
                        <span className="text-sm font-semibold text-yellow-800">
                          Construction contractor: D'AMICO CARLO - Carpignano Salentino
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financed Projects - Not Started Yet (Now Empty) */}
      {financedProjects.length > 0 && (
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Investment Project?
          </h2>
          <p className="text-xl mb-8 text-indigo-200 max-w-3xl mx-auto">
            Join 50+ successful investors who have transformed their properties into profitable luxury destinations 
            with our expert guidance and grant funding expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-900 transition-all"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}