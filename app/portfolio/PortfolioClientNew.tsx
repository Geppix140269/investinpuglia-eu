'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { 
  Building2, MapPin, Calendar, TrendingUp, Users, Award,
  CheckCircle, Euro, Clock, Briefcase, Star, Shield,
  Home, FileCheck, Hammer, Target, ArrowRight, Sparkles,
  ChevronLeft, ChevronRight, Eye, Hotel, Waves
} from 'lucide-react'

interface Project {
  id: string
  name: string
  location: string
  value: string
  grant?: string
  status: string
  description: string
  imageUrl?: string
  category: string
  year?: string
  features?: string[]
  beforeImage?: string
  afterImage?: string
}

interface PortfolioClientProps {
  projects?: any[]
  pageSettings?: any
}

export default function PortfolioClientNew({ projects = [], pageSettings }: PortfolioClientProps) {
  const [activeTab, setActiveTab] = useState('transformation')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Donna Menga transformation showcase
  const donnaMengaTransformation = {
    title: "Masseria Donna Menga",
    subtitle: "From Abandoned Heritage to Luxury Resort",
    location: "Nardò, Puglia",
    investment: "€2.3M",
    grant: "PIA Turismo Funded",
    year: "2024",
    description: "Complete transformation of a historic masseria into a luxury rural tourism destination, preserving authentic Puglian architecture while introducing modern luxury amenities.",
    beforeImage: "/Cataldo's projects/Donna Menga Before.webp",
    afterImage: "/Cataldo's projects/Donna-Menga.webp",
    stats: {
      rooms: "15 Luxury Suites",
      area: "4,500 sqm",
      rating: "5 Stars",
      roi: "35% Expected"
    },
    features: [
      "Historic preservation with modern luxury",
      "Sustainable energy systems",
      "Organic farm-to-table restaurant",
      "Wellness spa & infinity pool",
      "Traditional olive grove restoration",
      "Smart home automation"
    ]
  }

  // Torre Matta - Featured Heritage Project
  const torreMattaProject = {
    id: "torre-matta",
    name: "Torre Matta",
    subtitle: "Otranto Castle Underground Recovery",
    location: "Otranto Historic Center",
    value: "€600,000",
    grant: "Heritage Preservation Fund",
    status: "Completed 2016",
    description: "Exceptional restoration of Otranto Castle's underground chambers, transforming forgotten medieval spaces into a cultural heritage site. This project showcases our expertise in preserving historical authenticity while creating functional modern spaces.",
    imageUrl: "/Cataldo's projects/Torre Matta.jpg",
    category: "heritage",
    year: "2016",
    achievements: [
      "UNESCO Heritage Standards Compliance",
      "Structural reinforcement of 15th-century vaults",
      "Advanced humidity control systems",
      "LED lighting preserving original atmosphere",
      "Accessibility improvements for public tours",
      "Archaeological discoveries preserved in-situ"
    ],
    impact: {
      visitors: "50,000+ annual visitors",
      jobs: "12 permanent positions created",
      revenue: "€500K annual tourism revenue",
      awards: "2017 Heritage Restoration Award"
    }
  }

  // Portfolio projects with categories - Using actual Cataldo's project images
  const portfolioProjects: Project[] = [
    {
      id: "baglioni",
      name: "Baglioni Masseria Muzza",
      location: "Otranto",
      value: "€5.5M",
      grant: "PIA Turismo",
      status: "Completed 2023",
      description: "5-star luxury hotel with 30 suites",
      imageUrl: "/Cataldo's projects/baglioni_masseria_muzza.jpg",
      category: "luxury",
      year: "2023",
      features: ["30 Suites", "Michelin Restaurant", "World-class Spa"]
    },
    {
      id: "voi-alimini",
      name: "VOI Hotels Alimini Resort",
      location: "Otranto",
      value: "€650K",
      status: "2015-2019",
      description: "Reception, restaurants, SPA, rooms for Alpitour World",
      imageUrl: "/Cataldo's projects/VOI Alimini Resort.jpg",
      category: "resort",
      year: "2019",
      features: ["Beach Access", "Multiple Pools", "Entertainment"]
    },
    {
      id: "nohasi",
      name: "Castello di Noha - Nohasi Palace",
      location: "Galatina",
      value: "€1.3M",
      grant: "Heritage Fund",
      status: "Completed 2022",
      description: "Castle restoration & luxury hotel spa conversion",
      imageUrl: "/Cataldo's projects/nohasi palace hotel and spa.jpg",
      category: "heritage",
      year: "2022",
      features: ["Historic Castle", "Luxury Spa", "Fine Dining"]
    },
    {
      id: "bellavista",
      name: "Hotel Bellavista",
      location: "Otranto",
      value: "€1M",
      grant: "Titolo II Turismo",
      status: "Completed 2022",
      description: "Complete renovation with sea view terraces",
      imageUrl: "/Cataldo's projects/Hotel-Bellavista.webp",
      category: "luxury",
      year: "2022",
      features: ["Sea Views", "Modern Amenities", "Beach Club"]
    },
    {
      id: "le-cale",
      name: "Le Cale d'Otranto Beach Resort",
      location: "Otranto",
      value: "€1.6M",
      grant: "Italia Turismo",
      status: "2015-2019",
      description: "Beach resort restoration and upgrades",
      imageUrl: "/Cataldo's projects/Le Cale d'Otranto Beach Resort.jpg",
      category: "resort",
      year: "2019",
      features: ["Private Beach", "Water Sports", "Beach Bar"]
    },
    {
      id: "palazzo-spinola",
      name: "Palazzo Spinola",
      location: "Gallipoli",
      value: "€1M",
      status: "Completed 2014",
      description: "Historic palazzo renovation in old town",
      imageUrl: "/Cataldo's projects/Palazzo Spinola Gallipoli.jpg",
      category: "heritage",
      year: "2014",
      features: ["Historic Center", "Luxury Suites", "Rooftop Terrace"]
    },
    {
      id: "bellaria",
      name: "Residence Bellaria",
      location: "Giurdignano",
      value: "€2M",
      status: "Completed 2007",
      description: "New hospitality structure with modern design",
      imageUrl: "/Cataldo's projects/Residence Bellaria giurdignano.jpg",
      category: "luxury",
      year: "2007",
      features: ["Modern Design", "Pool Area", "Garden Suites"]
    },
    {
      id: "basiliani",
      name: "Hotel Basiliani",
      location: "Otranto",
      value: "€2.5M",
      status: "Completed 2009",
      description: "New room block and facilities expansion",
      imageUrl: "/Cataldo's projects/Basiliani.jpg",
      category: "luxury",
      year: "2009",
      features: ["CDSHotels Chain", "Conference Center", "Wellness Area"]
    },
    {
      id: "blue-otranto",
      name: "B&B Blue Otranto",
      location: "Otranto",
      value: "€1.2M",
      status: "Completed 2023",
      description: "Boutique bed & breakfast with stunning sea views",
      imageUrl: "/Cataldo's projects/Blue_Otranto.jpg",
      category: "boutique",
      year: "2023",
      features: ["Sea Views", "Infinity Pool", "Design Rooms"]
    },
    {
      id: "country-club",
      name: "Country Club Alimini",
      location: "Otranto",
      value: "€1.3M",
      status: "2022-2024",
      description: "Sports facilities, pools, pub & restaurant",
      imageUrl: "/Cataldo's projects/country club alimini.jpg",
      category: "resort",
      year: "2024",
      features: ["Sports Complex", "Multiple Pools", "Restaurant & Pub"]
    },
    {
      id: "san-giuseppe",
      name: "Dimora San Giuseppe",
      location: "Otranto",
      value: "€1.8M",
      grant: "Listed Building Fund",
      status: "Completed 2008",
      description: "Historic masseria restoration & hotel conversion",
      imageUrl: "/Cataldo's projects/dimora san giuseppe.jpg",
      category: "heritage",
      year: "2008",
      features: ["Protected Monument", "Traditional Architecture", "Garden Oasis"]
    },
    {
      id: "don-girolamo",
      name: "Don Girolamo B&B",
      location: "Casamassella",
      value: "€500K",
      status: "Completed 2023",
      description: "Charming B&B conversion with rural charm",
      imageUrl: "/Cataldo's projects/don gerolamo.jpg",
      category: "boutique",
      year: "2023",
      features: ["Rural Setting", "Authentic Charm", "Local Cuisine"]
    },
    {
      id: "haethey",
      name: "Hotel degli Haethey",
      location: "Otranto",
      value: "€2.5M",
      status: "2003-2006",
      description: "Hotel expansion and elevation project",
      imageUrl: "/Cataldo's projects/hotel haethey otranto.jpg",
      category: "luxury",
      year: "2006",
      features: ["City Center", "Rooftop Pool", "Panoramic Views"]
    },
    {
      id: "petraria",
      name: "Hotel Petraria",
      location: "Cannole",
      value: "€5.5M",
      status: "Completed 2008",
      description: "New tourist structure with resort facilities",
      imageUrl: "/Cataldo's projects/hotel petraria cannole.jpg",
      category: "resort",
      year: "2008",
      features: ["Large Resort", "Event Spaces", "Wellness Center"]
    },
    {
      id: "torcito",
      name: "Hotel Torcito Resort",
      location: "Cannole",
      value: "€1M",
      grant: "Titolo II Turismo",
      status: "Completed 2023",
      description: "Upgrade & expansion of existing structure",
      imageUrl: "/Cataldo's projects/hotel torcito resort cannole.jpeg",
      category: "resort",
      year: "2023",
      features: ["Modern Upgrade", "Pool Complex", "Restaurant"]
    },
    {
      id: "montelauro",
      name: "Masseria Montelauro",
      location: "Otranto",
      value: "€3.3M",
      status: "2003-ongoing",
      description: "Conversion to hospitality with continuous expansion",
      imageUrl: "/Cataldo's projects/masseria montelauro.jpeg",
      category: "heritage",
      year: "2006",
      features: ["Historic Masseria", "Ongoing Development", "Agricultural Tourism"]
    },
    {
      id: "mulino",
      name: "Camping Mulino d'Acqua",
      location: "Otranto",
      value: "€1.2M",
      status: "2003-2017",
      description: "Camping facilities with SPA & quality upgrade",
      imageUrl: "/Cataldo's projects/camping mulino d'acqua otranto.jpg",
      category: "eco",
      year: "2017",
      features: ["Eco Camping", "Spa Facilities", "Nature Integration"]
    },
    {
      id: "masseria-furca",
      name: "Masseria Furca",
      location: "Otranto Area",
      value: "€2.8M",
      status: "Completed",
      description: "Traditional masseria conversion to boutique hotel",
      imageUrl: "/Cataldo's projects/masseria-furca.jpg",
      category: "heritage",
      year: "2020",
      features: ["Boutique Hotel", "Traditional Style", "Pool & Gardens"]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects', icon: <Building2 className="h-4 w-4" /> },
    { id: 'luxury', name: 'Luxury Hotels', icon: <Star className="h-4 w-4" /> },
    { id: 'resort', name: 'Beach Resorts', icon: <Waves className="h-4 w-4" /> },
    { id: 'heritage', name: 'Heritage Sites', icon: <Home className="h-4 w-4" /> },
    { id: 'boutique', name: 'Boutique B&B', icon: <Hotel className="h-4 w-4" /> },
    { id: 'eco', name: 'Eco Tourism', icon: <Sparkles className="h-4 w-4" /> }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === selectedCategory)

  // Stats
  const stats = {
    totalValue: 95000000,
    projectsCompleted: 50,
    grantsSecured: 20000000,
    yearsExperience: 29,
    successRate: 95,
    averageROI: 35
  }


  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 bg-gradient-to-br from-indigo-900 via-indigo-800 to-teal-700">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Transforming Puglia's Heritage
                <span className="block text-3xl md:text-4xl mt-2 text-teal-300">
                  Into Luxury Destinations
                </span>
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                29 years of excellence • €95M+ in completed projects • €20M grants secured
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {[
                  { value: '50+', label: 'Projects Completed' },
                  { value: '€95M+', label: 'Total Investment' },
                  { value: '95%', label: 'Success Rate' },
                  { value: '35%', label: 'Average ROI' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-indigo-200">{stat.label}</div>
                  </div>
                ))}
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
                  {donnaMengaTransformation.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {donnaMengaTransformation.subtitle}
                </p>
              </div>

              {/* Before/After Slider */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <BeforeAfterSlider
                  beforeImage={donnaMengaTransformation.beforeImage}
                  afterImage={donnaMengaTransformation.afterImage}
                  beforeLabel="Before Renovation"
                  afterLabel="After Transformation"
                  height={600}
                />
              </div>

              {/* Transformation Details */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Project Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Project Overview</h3>
                  <p className="text-gray-600 mb-6">
                    {donnaMengaTransformation.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Location</span>
                      <span className="font-semibold">{donnaMengaTransformation.location}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-semibold text-indigo-600">{donnaMengaTransformation.investment}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Funding</span>
                      <span className="font-semibold">{donnaMengaTransformation.grant}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600">Completion</span>
                      <span className="font-semibold">{donnaMengaTransformation.year}</span>
                    </div>
                  </div>
                </div>

                {/* Features & Stats */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {Object.entries(donnaMengaTransformation.stats).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-4">
                        <div className="text-lg font-semibold text-indigo-600">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                  
                  <ul className="space-y-3">
                    {donnaMengaTransformation.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Start Your Transformation Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
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
                  
                  <h2 className="text-4xl font-bold mb-4">{torreMattaProject.name}</h2>
                  <p className="text-xl text-gray-600 mb-6">{torreMattaProject.subtitle}</p>
                  
                  <p className="text-gray-700 mb-8">{torreMattaProject.description}</p>
                  
                  {/* Key Achievements */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Project Achievements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {torreMattaProject.achievements.slice(0, 4).map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Impact Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {Object.entries(torreMattaProject.impact).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-lg font-semibold text-amber-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Project Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{torreMattaProject.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold">{torreMattaProject.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{torreMattaProject.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Complete Portfolio</h2>
                <p className="text-xl text-gray-600">
                  Explore our diverse range of successful projects across Puglia
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
                  >
                    <div className="relative h-64">
                      <Image
                        src={project.imageUrl || '/drone-view.jpg'}
                        alt={project.name}
                        width={400}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Euro className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold">{project.value}</span>
                          {project.grant && (
                            <span className="text-teal-600">({project.grant})</span>
                          )}
                        </div>
                      </div>

                      {project.features && (
                        <div className="flex flex-wrap gap-2">
                          {project.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Property?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join 50+ successful investors who have transformed their properties into profitable luxury destinations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  <Briefcase className="h-5 w-5" />
                  Start Your Project
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-indigo-50 transition-all"
                >
                  <Eye className="h-5 w-5" />
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}