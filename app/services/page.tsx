'use client'

import Link from 'next/link'
import { Building2, FileText, Briefcase, TrendingUp, Shield, Users, CheckCircle, ArrowRight, Star, Award } from 'lucide-react'
import CloudinaryImage from '@/components/CloudinaryImage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  const services = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "EU Grant Consulting",
      price: "Success-Based",
      description: "Access up to €2.25M in non-repayable grants",
      features: [
        "PIA Turismo grant applications",
        "Business plan development",
        "Technical documentation",
        "Regional authority liaison",
        "95% approval success rate"
      ],
      highlight: true
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Investment Advisory",
      price: "€5,000 + Project-Based",
      description: "Complete investment lifecycle management",
      features: [
        "€5,000 engagement fee",
        "Property search & evaluation",
        "Due diligence coordination",
        "Price negotiation",
        "Legal support - tailored to project",
        "Contract management - tailored to project"
      ]
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Project Management",
      price: "Milestone-Based",
      description: "End-to-end project coordination",
      features: [
        "Technical team assembly",
        "Permit acquisition",
        "Construction oversight",
        "Quality control",
        "Timeline management"
      ]
    }
  ]

  const phases = [
    {
      number: "01",
      title: "Discovery & Planning",
      duration: "2-4 weeks",
      activities: [
        "Property search based on criteria",
        "Investment opportunity analysis",
        "Grant eligibility assessment",
        "Initial business plan"
      ]
    },
    {
      number: "02", 
      title: "Due Diligence",
      duration: "4-6 weeks",
      activities: [
        "Legal assessment",
        "Technical evaluation",
        "Price negotiation",
        "Document preparation"
      ]
    },
    {
      number: "03",
      title: "Contract & Closing",
      duration: "2-3 weeks",
      activities: [
        "Preliminary agreement",
        "Deposit structuring",
        "Notary coordination",
        "Ownership transfer"
      ]
    },
    {
      number: "04",
      title: "Grant Application",
      duration: "8-12 weeks",
      activities: [
        "Complete application prep",
        "CUP code acquisition",
        "Regional approval",
        "Funding disbursement"
      ]
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Investment Services
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Comprehensive support for foreign investors accessing Puglia's €2.25M grant opportunities
            </p>
            
            {/* Key Value Props */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">€20M+</div>
                <div className="text-sm text-purple-200 mt-1">Grants Secured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm text-purple-200 mt-1">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">29+</div>
                <div className="text-sm text-purple-200 mt-1">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Tailored solutions for international investors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 ${
                  service.highlight ? 'ring-2 ring-indigo-500 relative' : ''
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-indigo-600 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-3xl font-light text-gray-900 mb-2">{service.price}</p>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                    service.highlight
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Get Started <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Investment Process</h2>
            <p className="text-xl text-gray-600">
              Clear, structured approach from property search to grant approval
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase, index) => (
                <div key={index} className="relative">
                  {index < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 z-0"></div>
                  )}
                  
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-indigo-500 hover:shadow-lg transition-all relative z-10">
                    <div className="text-4xl font-bold text-indigo-600 mb-3">{phase.number}</div>
                    <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{phase.duration}</p>
                    
                    <ul className="space-y-2">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Proven Track Record</h2>
              <p className="text-xl text-gray-600">
                Leading foreign investment facilitation in Puglia since 1995
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Hotels Developed</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">€80M</div>
                <div className="text-gray-600">Total Projects</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600">Compliance Rate</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
              <p className="text-xl text-gray-600">
                Clear, milestone-based fee structure aligned with your success
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Phase 1: Initial Investment</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between py-2 border-b border-gray-200">
                      <span>Property Search</span>
                      <span className="font-semibold">€2,500</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-gray-200">
                      <span>Due Diligence</span>
                      <span className="font-semibold">€2,500</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-gray-200">
                      <span>Contract Support</span>
                      <span className="font-semibold">€2,500</span>
                    </li>
                    <li className="flex justify-between py-2 font-bold text-lg">
                      <span>Total Phase 1</span>
                      <span className="text-indigo-600">€7,500</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Phase 2: Grant & Completion</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between py-2 border-b border-gray-200">
                      <span>CUP Approval</span>
                      <span className="font-semibold">€2,500</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-gray-200">
                      <span>Final Deed</span>
                      <span className="font-semibold">€2,500</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-gray-200">
                      <span>Grant Success Fee</span>
                      <span className="font-semibold">2.5%</span>
                    </li>
                    <li className="flex justify-between py-2 font-bold text-lg">
                      <span>Total Phase 2</span>
                      <span className="text-purple-600">€5,000+</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-center">
                  <Star className="inline-block h-5 w-5 text-yellow-500 mr-2" />
                  <strong>Performance Bonus:</strong> 5% of any amount saved through negotiation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Invest in Puglia?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join successful international investors who have transformed their vision into reality with our expert guidance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-agreement"
              className="inline-block bg-white text-indigo-900 py-4 px-8 rounded-lg font-semibold hover:shadow-2xl transition-all text-lg"
            >
              Sign Agreement Online
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-indigo-800 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-all text-lg"
            >
              Schedule Consultation
            </Link>
          </div>
          
          <p className="mt-8 text-indigo-200">
            Or call us directly: +39 351 400 1402
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}