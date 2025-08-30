import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, MapPin, Calendar, Euro, TrendingUp, 
  CheckCircle, Users, Building2, Award, Download,
  Phone, Mail, ChevronRight, Star
} from 'lucide-react';
import HeroVisual from '@/components/sections/HeroVisual';

// Project data (in production, this would come from a database)
const projectsData: Record<string, any> = {
  'baglioni-masseria-muzza': {
    name: 'Baglioni Hotel - Masseria Muzza',
    category: 'Luxury Hotels',
    location: 'Otranto, Puglia',
    year: '2023',
    status: 'Completed',
    grant: '€2.8M',
    grantType: 'PIA Turismo',
    totalInvestment: '€8.5M',
    roi: '22% Annual',
    paybackPeriod: '4.5 years',
    description: 'Complete transformation of a historic 16th-century masseria into a world-class 5-star luxury hotel, combining authentic Puglian architecture with modern luxury amenities.',
    
    overview: `The Baglioni Masseria Muzza project represents one of our most prestigious achievements in luxury hospitality development. 
    This ambitious transformation preserved the historic character of the 16th-century masseria while introducing world-class amenities 
    and services that meet the expectations of international luxury travelers.`,
    
    highlights: [
      '40 luxury suites and villas',
      'World-class spa & wellness center',
      'Fine dining restaurant with Michelin-star chef',
      'Conference facilities for 200 guests',
      'Private beach club access',
      'Organic gardens and olive groves',
      '100% renewable energy systems',
      'Created 85 permanent jobs'
    ],
    
    grantDetails: {
      program: 'PIA Turismo - Grandi Imprese',
      totalEligible: '€6.2M',
      grantPercentage: '45%',
      grantAmount: '€2.8M',
      applicationDate: 'March 2022',
      approvalDate: 'July 2022',
      completionDate: 'June 2023'
    },
    
    results: {
      occupancyRate: '78%',
      averageDailyRate: '€450',
      guestSatisfaction: '9.4/10',
      tripadvisorRanking: '#2 in Otranto',
      employeesHired: '85',
      localSuppliers: '45+'
    },
    
    testimonial: {
      text: "The InvestInPuglia team's expertise in navigating the PIA grant process was invaluable. Their 30 years of experience showed in every interaction, from initial consultation to final approval.",
      author: 'Roberto Polito',
      position: 'CEO, Baglioni Hotels & Resorts',
      rating: 5
    }
  },
  
  'grand-hotel-tiziano': {
    name: 'Grand Hotel Tiziano',
    category: 'Business Hotels',
    location: 'Lecce, Puglia',
    year: '2024',
    status: 'Completed',
    grant: '€1.5M',
    grantType: 'NRRP Tourism',
    totalInvestment: '€4.2M',
    roi: '18% Annual',
    paybackPeriod: '5.5 years',
    description: 'Strategic renovation and expansion of a 4-star business hotel in the heart of Lecce, enhancing conference facilities and modernizing all guest amenities.',
    
    overview: `The Grand Hotel Tiziano project focused on repositioning this historic property as Lecce's premier business and conference hotel. 
    Our team secured NRRP funding to support comprehensive renovations that elevated service standards while maintaining the property's elegant character.`,
    
    highlights: [
      '276 renovated rooms and suites',
      'State-of-the-art conference center',
      'Rooftop restaurant and bar',
      'Business center and co-working spaces',
      'Underground parking for 150 cars',
      'Energy efficiency upgrades',
      'Smart room technology',
      'Created 120 jobs'
    ],
    
    grantDetails: {
      program: 'NRRP - Tourism Digital Transition',
      totalEligible: '€3.3M',
      grantPercentage: '45%',
      grantAmount: '€1.5M',
      applicationDate: 'January 2023',
      approvalDate: 'April 2023',
      completionDate: 'March 2024'
    },
    
    results: {
      occupancyRate: '82%',
      averageDailyRate: '€180',
      conferenceBookings: '150+/year',
      guestSatisfaction: '8.9/10',
      corporateContracts: '45',
      revenueIncrease: '+65%'
    },
    
    testimonial: {
      text: "Working with InvestInPuglia transformed our vision into reality. Their grant expertise saved us millions and accelerated our timeline by at least a year.",
      author: 'Marco Tiziano',
      position: 'Owner, Grand Hotel Tiziano',
      rating: 5
    }
  }
};

export async function generateStaticParams() {
  return Object.keys(projectsData).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projectsData[params.id];
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} - InvestInPuglia Portfolio`,
    description: `${project.description} Grant secured: ${project.grant}. ROI: ${project.roi}.`,
    keywords: [
      project.category,
      'Puglia investment',
      'EU grants',
      project.grantType,
      'investment portfolio',
      'success story'
    ],
    openGraph: {
      title: `${project.name} - ${project.grant} EU Grant Success`,
      description: project.description,
      images: ['/og-portfolio.png'],
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projectsData[params.id];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0">
          <HeroVisual />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/70 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <Link 
            href="/portfolio"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Portfolio
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                project.status === 'Completed' 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-yellow-500/20 text-yellow-300'
              }`}>
                {project.status}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-blue-100 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {project.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Completed {project.year}
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                30+ Years Experience Team
              </div>
            </div>
            
            <p className="text-xl text-blue-100 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6">
                <Euro className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-900">{project.grant}</div>
                <div className="text-sm text-blue-700">EU Grant Secured</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-900">{project.roi}</div>
                <div className="text-sm text-green-700">Return on Investment</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-6">
                <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-900">{project.totalInvestment}</div>
                <div className="text-sm text-purple-700">Total Investment</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-lg p-6">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-orange-900">{project.paybackPeriod}</div>
                <div className="text-sm text-orange-700">Payback Period</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {project.overview}
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Achievements</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {project.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grant Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Grant Funding Details</h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Grant Program</h4>
                  <p className="text-xl text-blue-900 font-bold">{project.grantDetails.program}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Grant Amount</h4>
                  <p className="text-xl text-blue-900 font-bold">{project.grantDetails.grantAmount}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Grant Percentage</h4>
                  <p className="text-xl text-blue-900 font-bold">{project.grantDetails.grantPercentage}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Total Eligible Costs</h4>
                  <p className="text-xl text-blue-900 font-bold">{project.grantDetails.totalEligible}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-blue-200">
                <h4 className="font-semibold text-gray-700 mb-4">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Submitted</span>
                    <span className="font-semibold">{project.grantDetails.applicationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grant Approved</span>
                    <span className="font-semibold">{project.grantDetails.approvalDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project Completed</span>
                    <span className="font-semibold">{project.grantDetails.completionDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Results & Impact</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {Object.entries(project.results).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-2xl font-bold text-blue-900 mb-2">{value as string}</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(project.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "{project.testimonial.text}"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-gray-900">{project.testimonial.author}</div>
                  <div className="text-sm text-gray-600">{project.testimonial.position}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              With 30+ years of expertise in EU and Regional grants, our team can help you 
              secure the funding you need for your Puglia investment project.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/consultation"
                className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Our Team
              </Link>
              <a 
                href="#"
                className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Case Study
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}