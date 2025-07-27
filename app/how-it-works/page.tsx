'use client'
import React from 'react';
import { 
  Clock, 
  FileText, 
  Search, 
  Building, 
  Handshake, 
  Euro, 
  TrendingUp, 
  Shield, 
  Award,
  CheckCircle,
  ArrowRight,
  Users,
  MapPin,
  Calculator,
  FileCheck,
  Home,
  Briefcase
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'Free assessment of your investment goals and eligibility',
      icon: Users,
      details: [
        'Personalized video call consultation',
        'Investment objectives assessment',
        'Eligibility check for grants and incentives',
        'Preliminary investment strategy'
      ]
    },
    {
      number: '02',
      title: 'Grant Application',
      description: 'Expert assistance with EU funding applications',
      icon: FileText,
      details: [
        'PIA Turismo (50% grant) application',
        'Document preparation and review',
        'Business plan development',
        'Submission and follow-up'
      ]
    },
    {
      number: '03',
      title: 'Property Search',
      description: 'Curated selection of investment properties',
      icon: Search,
      details: [
        'Market analysis and property sourcing',
        'Due diligence and valuations',
        'Virtual property tours',
        'Investment potential assessment'
      ]
    },
    {
      number: '04',
      title: 'Legal Support',
      description: 'Complete legal and administrative assistance',
      icon: Shield,
      details: [
        'Fiscal code application',
        'Bank account opening',
        'Contract review and negotiation',
        'Notary coordination'
      ]
    },
    {
      number: '05',
      title: 'Project Management',
      description: 'End-to-end renovation and development support',
      icon: Building,
      details: [
        'Architect and contractor selection',
        'Project timeline management',
        'Quality control and inspections',
        'Grant compliance monitoring'
      ]
    },
    {
      number: '06',
      title: 'Asset Management',
      description: 'Ongoing property and investment management',
      icon: TrendingUp,
      details: [
        'Property management services',
        'Rental income optimization',
        'Tax optimization strategies',
        'Exit strategy planning'
      ]
    }
  ];

  const services = [
    {
      title: 'EU Grant Expertise',
      description: 'Maximize funding with our 30+ years of experience',
      icon: Award,
      features: [
        'PIA Turismo - 50% grant for tourism projects',
        'Regional development funds',
        'Green energy incentives',
        'Digital transformation grants'
      ]
    },
    {
      title: 'Tax Optimization',
      description: 'Benefit from Italy\'s favorable tax schemes',
      icon: Calculator,
      features: [
        '7% flat tax for retirees',
        '70% tax reduction for new residents',
        'Corporate tax benefits',
        'Capital gains optimization'
      ]
    },
    {
      title: 'Property Services',
      description: 'Comprehensive real estate support',
      icon: Home,
      features: [
        'Property sourcing and due diligence',
        'Renovation project management',
        'Property management',
        'Market analysis and valuation'
      ]
    },
    {
      title: 'Transaction Support',
      description: 'Expert guidance through the entire acquisition process',
      icon: Handshake,
      details: [
        'Negotiation strategy and support',
        'Coordination with legal professionals',
        'Document preparation and verification',
        'Post-acquisition assistance'
      ]
    }
  ];

  const timeline = [
    {
      phase: 'Discovery',
      duration: '1-2 weeks',
      activities: ['Initial consultation', 'Eligibility assessment', 'Investment strategy']
    },
    {
      phase: 'Application',
      duration: '4-6 weeks',
      activities: ['Grant application', 'Business plan', 'Document preparation']
    },
    {
      phase: 'Acquisition',
      duration: '6-8 weeks',
      activities: ['Property search', 'Due diligence', 'Legal procedures']
    },
    {
      phase: 'Development',
      duration: '6-12 months',
      activities: ['Renovation planning', 'Project execution', 'Grant compliance']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              How It Works
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your journey to successful investment in Puglia, simplified and supported every step of the way
            </p>
            <div className="flex justify-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold">50%</div>
                <div className="text-blue-200">Grant Funding</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">7%</div>
                <div className="text-blue-200">Flat Tax</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">30+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Investment Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to successful investment, we guide you through every step
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="text-6xl font-bold text-gray-200 mr-4">
                      {step.number}
                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for successful investment in Puglia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <service.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {(service.features || service.details || []).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From consultation to completion - your investment journey mapped out
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
              
              {timeline.map((phase, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-600">
                          {phase.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {phase.phase}
                      </h3>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="text-gray-600">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Fee Model */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Euro className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Success Fee Model
                </h2>
                <p className="text-xl text-gray-600">
                  We succeed when you succeed
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Initial Engagement
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Small engagement fee to ensure serious commitment and cover initial assessments
                  </p>
                  <div className="text-3xl font-bold text-blue-600">
                    €2,500
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    One-time fee
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Success Fee
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Paid only upon successful grant approval and property acquisition
                  </p>
                  <div className="text-3xl font-bold text-green-600">
                    5-10%
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Of total investment
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <p className="text-center text-gray-700">
                  <strong>No success, no fee</strong> - We're invested in your success.
                  Our success fee is only charged when your grant is approved and investment is completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our experts and discover how EU grants can fund 50% of your investment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/investinpuglia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-800 transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
