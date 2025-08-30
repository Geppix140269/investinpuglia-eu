'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, Award, Users, TrendingUp, Calendar, MapPin, 
  Euro, CheckCircle, Star, ArrowRight, Filter, Search,
  Briefcase, Hotel, Ship, Home, Factory, ChevronRight, Heart
} from 'lucide-react';

const projects = [
  {
    id: 'baglioni-masseria-muzza',
    category: 'Luxury Hotels',
    name: 'Baglioni Hotel - Masseria Muzza',
    location: 'Otranto, Puglia',
    year: '2023',
    grant: '€2.8M',
    totalInvestment: '€8.5M',
    status: 'Completed',
    description: 'Transformation of historic masseria into 5-star luxury hotel',
    image: '/projects/baglioni-masseria.jpg',
    highlights: ['40 luxury suites', 'Spa & wellness center', 'Fine dining restaurant', 'EU grant secured'],
    roi: '22% Annual'
  },
  {
    id: 'grand-hotel-tiziano',
    category: 'Business Hotels',
    name: 'Grand Hotel Tiziano',
    location: 'Lecce, Puglia',
    year: '2024',
    grant: '€1.5M',
    totalInvestment: '€4.2M',
    status: 'Completed',
    description: '4-star business hotel renovation and expansion project',
    image: '/projects/hotel-tiziano.jpg',
    highlights: ['276 rooms', 'Conference center', 'Rooftop restaurant', 'NRRP funding secured'],
    roi: '18% Annual'
  },
  {
    id: 'bb-blue-otranto',
    category: 'Boutique B&B',
    name: 'B&B Blue Otranto',
    location: 'Otranto, Puglia',
    year: '2023',
    grant: '€450K',
    totalInvestment: '€1.1M',
    status: 'Completed',
    description: 'Luxury boutique B&B with panoramic sea views',
    image: '/projects/bb-blue-otranto.jpg',
    highlights: ['12 designer suites', 'Infinity pool', 'Sea view terrace', 'Mini PIA grant'],
    roi: '25% Annual'
  },
  {
    id: 'cantieri-navali-jolly',
    category: 'Marine Infrastructure',
    name: 'Cantieri Navali - Gruppo Jolly',
    location: 'Taranto, Puglia',
    year: '2024',
    grant: '€5.2M',
    totalInvestment: '€12M',
    status: 'In Progress',
    description: 'Modern shipyard and marine services facility',
    image: '/projects/cantieri-navali.jpg',
    highlights: ['50,000 m² facility', '200+ jobs created', 'Yacht services', 'PIA Turismo grant'],
    roi: '20% Annual'
  },
  {
    id: 'riva-marina-resort',
    category: 'Beach Resorts',
    name: 'Riva Marina Resort',
    location: 'Carovigno, Puglia',
    year: '2023',
    grant: '€3.1M',
    totalInvestment: '€9M',
    status: 'Completed',
    description: '4-star beach resort with private beach access',
    image: '/projects/riva-marina.jpg',
    highlights: ['442 rooms', 'Private beach', '5 restaurants', 'Sports facilities'],
    roi: '19% Annual'
  },
  {
    id: 'masseria-santa-lucia',
    category: 'Wedding Venues',
    name: 'Masseria Santa Lucia',
    location: 'Ostuni, Puglia',
    year: '2023',
    grant: '€680K',
    totalInvestment: '€1.8M',
    status: 'Completed',
    description: 'Historic masseria converted to luxury wedding venue',
    image: '/projects/santa-lucia.jpg',
    highlights: ['300 guest capacity', 'Panoramic terrace', 'Luxury suites', 'Event spaces'],
    roi: '28% Annual'
  },
  {
    id: 'donna-menga',
    category: 'Boutique Hotels',
    name: 'Donna Menga',
    location: 'Marina di Novaglie, Puglia',
    year: '2024',
    grant: '€920K',
    totalInvestment: '€2.4M',
    status: 'Completed',
    description: 'Cliffside boutique hotel with Mediterranean charm',
    image: '/projects/donna-menga.jpg',
    highlights: ['24 luxury rooms', 'Sea view restaurant', 'Infinity pool', 'Wellness center'],
    roi: '23% Annual'
  },
  {
    id: 'oasi-sarparea',
    category: 'Eco Resorts',
    name: 'Oasi Sarparea',
    location: 'Pulsano, Puglia',
    year: '2024',
    grant: '€1.2M',
    totalInvestment: '€3.5M',
    status: 'In Progress',
    description: 'Sustainable eco-resort in natural reserve',
    image: '/projects/oasi-sarparea.jpg',
    highlights: ['Eco-lodges', 'Solar powered', 'Nature trails', 'Environmental certification'],
    roi: '21% Annual'
  }
];

const categories = ['All Projects', 'Luxury Hotels', 'Business Hotels', 'Beach Resorts', 'Boutique B&B', 'Wedding Venues', 'Marine Infrastructure', 'Eco Resorts'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All Projects' || project.category === selectedCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalGrants = projects.reduce((sum, p) => sum + parseFloat(p.grant.replace('€', '').replace('M', '').replace('K', '000')), 0);
  const totalInvestment = projects.reduce((sum, p) => sum + parseFloat(p.totalInvestment.replace('€', '').replace('M', '')), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          {/* Clean geometric background pattern instead of HeroVisual */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/70 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">30+ Years EU Grant Expertise</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6">
              InvestInPuglia Engineering Team
              <span className="block text-3xl mt-3 text-blue-200">Portfolio of Excellence</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-4xl">
              Our team's combined experience of over 30 years in Regional and EU grant programmes 
              has successfully delivered transformative projects across Puglia, securing millions in funding 
              and creating sustainable investment opportunities.
            </p>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">€{totalGrants.toFixed(1)}M+</div>
                <div className="text-sm text-blue-200">Grants Secured</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">€{totalInvestment.toFixed(1)}M+</div>
                <div className="text-sm text-blue-200">Total Investment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">{projects.length}+</div>
                <div className="text-sm text-blue-200">Projects Delivered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Three Decades of Grant Excellence
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our engineering team brings unparalleled expertise in navigating the complex landscape 
              of EU and Regional funding programmes, ensuring maximum grant capture for every project.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Consultation</h3>
                <p className="text-gray-600">Strategic guidance through every phase of grant application and project development</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                <p className="text-gray-600">95% success rate in securing EU and Regional grants for our clients</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">ROI Optimization</h3>
                <p className="text-gray-600">Average 20%+ annual returns on grant-supported investments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.category === 'Luxury Hotels' && <Hotel className="h-24 w-24 text-white/30" />}
                    {project.category === 'Business Hotels' && <Building2 className="h-24 w-24 text-white/30" />}
                    {project.category === 'Beach Resorts' && <Hotel className="h-24 w-24 text-white/30" />}
                    {project.category === 'Boutique B&B' && <Home className="h-24 w-24 text-white/30" />}
                    {project.category === 'Marine Infrastructure' && <Ship className="h-24 w-24 text-white/30" />}
                    {project.category === 'Wedding Venues' && <Heart className="h-24 w-24 text-white/30" />}
                    {project.category === 'Eco Resorts' && <Hotel className="h-24 w-24 text-white/30" />}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.year}
                  </div>

                  <p className="text-gray-600 mb-4">{project.description}</p>

                  {/* Financial Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-xs text-blue-600 mb-1">EU Grant</div>
                      <div className="text-lg font-bold text-blue-900">{project.grant}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xs text-green-600 mb-1">ROI</div>
                      <div className="text-lg font-bold text-green-900">{project.roi}</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link 
                    href={`/portfolio/${project.id}`}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors group"
                  >
                    View Project Details
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Success Story Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the ranks of successful investors who have leveraged our 30+ years of expertise 
              in EU and Regional grants to transform their vision into reality.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/consultation"
                className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Contact Our Team
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Custom Wedding icon since Heart is already imported
const WeddingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);