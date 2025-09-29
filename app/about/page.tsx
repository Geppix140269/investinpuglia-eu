import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Award, Shield, Target, Users, Building2, 
  TrendingUp, Globe, Briefcase, Star, CheckCircle,
  Mail, Phone, Linkedin, Calendar, ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata-utils'

// Dynamic metadata generation
export async function generateMetadata() {
  return await generatePageMetadata('/about')
}

export default function AboutPage() {
  const coreTeam = [
    {
      name: "Giuseppe Funaro",
      role: "Founder & Client Representative",
      image: "/Giuseppe Funaro 062025.png",
      bio: "With 35+ years in international business, Giuseppe represents foreign clients in all aspects of Italian property investment. His role is to ensure clear communication, manage expectations, and coordinate all project phases from initial consultation to completion.",
      expertise: [
        "Foreign Client Representation",
        "Project Coordination & Management",
        "Cross-Cultural Communication",
        "Investment Strategy Guidance"
      ],
      achievements: [
        "35+ years international business experience",
        "Specializes in foreign client representation",
        "Coordinates all project phases",
        "Ensures clear client communication"
      ],
      email: "giuseppe@investinpuglia.eu"
    },
    {
      name: "Dott. Ing. Cataldo Russo",
      role: "Technical Partner & Chief Engineer",
      image: "/russo-photo.jpg",
      bio: "Licensed Italian Engineer-Architect with 29 years of demonstrable experience. Cataldo creates and manages all technical aspects of projects - from initial design through construction completion. Successfully delivered 50+ hotel and resort projects worth €95M+.",
      expertise: [
        "Architectural & Engineering Design",
        "Technical Project Management",
        "Heritage Restoration",
        "Grant Applications (€20M+ secured)"
      ],
      achievements: [
        "Completed 50+ hotel/resort projects",
        "€95M+ in total project value delivered",
        "€20M+ in grants secured",
        "Order of Engineers Lecce #1697 since 1995"
      ],
      credentials: [
        "ITACA Protocol Certified (2016)",
        "Fire Safety Specialist (L.818/84)",
        "D.Lgs 81/2008 Safety Coordinator",
        "Seismic Design Specialist"
      ],
      email: "info@investinpuglia.eu"
    }
  ]

  const partnerCategories = {
    charteredAccountants: [
      {
        name: "Antonio Quarta",
        role: "Chartered Accountant - Grant Financing Specialist",
        bio: "Independent financial executive with track record in €150M+ project financing. Expert in Mini PIA grants and EU funding navigation. Available when specialized financial structuring is required.",
        expertise: ["Mini PIA Grant Applications", "EU Funding Navigation", "Financial Structuring", "Tax Optimization"],
        email: "info@investinpuglia.eu"
      },
      {
        name: "Maurizio Deta",
        role: "Chartered Accountant - Grant Financing Specialist",
        bio: "Specialized chartered accountant with extensive experience in grant financing and EU funding programs. Expert in financial structuring for tourism and real estate development projects.",
        expertise: ["EU Grant Applications", "Financial Project Structuring", "Tax Planning", "Funding Compliance"],
        email: "info@investinpuglia.eu"
      }
    ],
    legalExperts: [
      {
        name: "Avv. Marco Magaraggia",
        role: "Legal Expert - Real Estate Law (Preferred Partner)",
        bio: "Independent legal professional specializing in Italian real estate law for foreign buyers. English-speaking lawyer with expertise in property purchase assistance and compliance for international investors.",
        expertise: ["Property Purchase Legal Assistance", "Foreign Buyer Compliance", "International Tax Guidance"],
        email: "info@italian-lawyer.eu",
        website: "https://italian-lawyer.eu"
      },
      {
        name: "Notaio Riccardo Pellegrino",
        role: "Legal Expert - Notary Services Lecce (Preferred Partner)",
        bio: "Experienced notary based in Lecce specializing in real estate transactions and property law. Provides essential notarial services for property purchases and legal documentation.",
        expertise: ["Property Transaction Notarization", "Legal Documentation", "Title Verification", "Contract Authentication"],
        email: "info@investinpuglia.eu",
        location: "Lecce"
      },
      {
        name: "Giorgio Caracciolo",
        role: "Legal Expert - Real Estate Law",
        bio: "Experienced legal professional specializing in Italian real estate law and property transactions. Provides comprehensive legal support for international property investors.",
        expertise: ["Real Estate Transactions", "Property Law", "Investment Legal Support", "Due Diligence"],
        email: "info@investinpuglia.eu",
        website: "https://giorgiocaracciolo.it",
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759129953/Screenshot_2025-09-29_085846_zcz9kn.png"
      }
    ],
    bankingPartners: [
      {
        name: "Intesa San Paolo",
        role: "Preferred Banking Partner",
        bio: "Italy's leading banking group providing specialized services for international investors. Expert in bank account opening procedures and project financing for real estate investments.",
        expertise: ["Bank Account Opening", "Project Financing", "International Banking Services", "Investment Loans"],
        email: "info@investinpuglia.eu",
        type: "institution"
      }
    ]
  }

  const companyStats = [
    { value: "35+", label: "Years Combined Experience", icon: <Calendar className="h-6 w-6" /> },
    { value: "€95M+", label: "Projects Completed", icon: <TrendingUp className="h-6 w-6" /> },
    { value: "50+", label: "Hotels & Resorts", icon: <Building2 className="h-6 w-6" /> },
    { value: "€20M+", label: "Grants Secured", icon: <Award className="h-6 w-6" /> },
    { value: "95%", label: "Grant Success Rate", icon: <Star className="h-6 w-6" /> },
    { value: "2", label: "Core Team Members", icon: <Users className="h-6 w-6" /> }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("/pattern.svg")',
            backgroundRepeat: 'repeat'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About InvestInPuglia
            </h1>
            <p className="text-xl md:text-2xl text-indigo-200 mb-8">
              Your trusted partner for property investment and tourism development in Puglia
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book-consultation"
                className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-all"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-indigo-600 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                InvestInPuglia emerged from a deep understanding of the untapped potential in Southern Italy's most 
                dynamic region. Our core team combines Giuseppe Funaro's 35+ years of international business experience 
                with Dott. Ing. Cataldo Russo's 29 years of technical engineering excellence, creating a unique partnership 
                focused on serving foreign investors in the Italian property market.
              </p>
              <p className="mb-6">
                Giuseppe handles all client relations and project coordination, ensuring clear communication and smooth 
                project management from initial consultation to completion. Cataldo manages all technical aspects - from 
                architectural design through construction completion - having successfully delivered 50+ hotel and resort 
                projects valued at more than €95 million with €20M+ in grants secured.
              </p>
              <p>
                Today, InvestInPuglia serves as the trusted advisor for international investors seeking to capitalize 
                on Puglia's economic renaissance, with our core team ensuring every project receives both expert client 
                representation and world-class technical execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Giuseppe Funaro */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Users className="h-5 w-5" />
              YOUR ADVISOR
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Meet <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Giuseppe Funaro</strong>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Coordinator of this initiative and your guide to Italian property investment success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-3xl transform rotate-3"></div>
              <img 
                src="/Giuseppe Funaro 062025.png" 
                alt="Giuseppe Funaro - Property Investment Advisor Puglia" 
                className="relative rounded-3xl shadow-2xl w-full transform -rotate-3 hover:rotate-0 transition-transform duration-300"
              />
              {/* LinkedIn button below image */}
              <div className="text-center mt-6">
                <a 
                  href="https://www.linkedin.com/in/giuseppe-funaro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-purple-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-white/50"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-semibold">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
            
            <div>
              <div className="prose prose-lg">
                <p className="text-lg text-gray-700 mb-6">
                  After 35+ years in international business, I've seen too many investors lose fortunes 
                  due to language barriers, cultural misunderstandings, and working with the wrong people. 
                  As coordinator of this initiative, I've built a network of only the most trusted, independent professionals in Puglia.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Every professional vetted</strong> - minimum 10 successful projects required
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Real references provided</strong> - talk to past clients before you commit
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Fixed pricing agreements</strong> - no surprise costs or delays
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Full project oversight</strong> - I personally ensure standards are met
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-emerald-100 rounded-2xl p-6 border border-white/50 shadow-lg">
                  <p className="text-sm text-gray-600 italic mb-2">
                    "As coordinator, I don't just give advice - I connect you with the exact independent professionals who have 
                    successfully completed similar projects. Your success is guaranteed because you're 
                    working with proven experts, not taking chances."
                  </p>
                  <p className="text-sm font-semibold text-gray-800">— Giuseppe Funaro, Coordinator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Cataldo Russo */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Building2 className="h-5 w-5" />
              TECHNICAL EXPERT
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Meet <strong className="font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Dott. Ing. Cataldo Russo</strong>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Licensed Engineer-Architect with 29 years of proven excellence in tourism development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative md:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-3xl transform -rotate-3"></div>
              <img 
                src="/russo-photo.jpg" 
                alt="Dott. Ing. Cataldo Russo - Technical Director" 
                className="relative rounded-3xl shadow-2xl w-full transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
            
            <div className="md:order-1">
              <div className="prose prose-lg">
                <p className="text-lg text-gray-700 mb-6">
                  With 29 years of demonstrable experience and Order of Engineers Lecce registration #1697 since 1995, 
                  I ensure every technical aspect meets the highest standards. My track record includes 50+ completed 
                  hotel and resort projects with €95M+ total value and €20M+ in secured grants with 95% success rate.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>ITACA Protocol Certified</strong> - sustainable construction specialist since 2016
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Heritage restoration expert</strong> - D.Lgs. 42/04 specialized for historical properties
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Grant funding mastery</strong> - 95% success rate with PIA Turismo and EU programs
                    </span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      <strong>Complete technical oversight</strong> - from initial design through final construction
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl p-6 border border-white/50 shadow-lg">
                  <p className="text-sm text-gray-600 italic mb-2">
                    "Every project I undertake follows the same rigorous standards that have delivered €95M+ in successful developments. 
                    My engineering certification and 29-year track record ensure your investment is built on solid technical foundations 
                    with maximum grant optimization."
                  </p>
                  <p className="text-sm font-semibold text-gray-800">— Dott. Ing. Cataldo Russo, Technical Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Giuseppe and Cataldo work together as the core team - Giuseppe handles all client relations and project coordination, 
              while Cataldo manages the technical and engineering aspects of every project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {coreTeam.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border border-gray-100">
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative flex-shrink-0 mb-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-purple-600 font-semibold text-lg mb-4">{member.role}</p>
                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {member.bio}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-bold text-lg mb-3 text-slate-900">Core Expertise</h4>
                        <div className="space-y-2 text-left">
                          {member.expertise.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold text-lg mb-3 text-slate-900">Key Achievements</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {member.achievements.map((achievement, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                              <span className="text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {member.credentials && (
                        <div className="mb-6">
                          <h4 className="font-bold text-lg mb-3 text-slate-900">Professional Credentials</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.credentials.map((credential, i) => (
                              <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                                {credential}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4 justify-center">
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                          <Mail className="h-5 w-5" />
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Partners */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Professional Partners
            </h3>
            <p className="text-gray-600 mb-8 max-w-4xl mx-auto">
              Specialized professionals organized by expertise area. These English-speaking professionals are available when specialized services are needed.
              They work independently and charge their own fees based on project requirements.
            </p>

            {/* Chartered Accountants Section */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                Chartered Accountants - Grant Financing Specialists
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {partnerCategories.charteredAccountants.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h5>
                    <p className="text-blue-600 font-semibold text-sm mb-3">{partner.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{partner.bio}</p>
                    <div className="space-y-1 mb-4">
                      {partner.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 justify-center">
                      <a
                        href={`mailto:${partner.email}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                      >
                        <Mail className="h-4 w-4" />
                        Contact
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Experts Section */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Legal Experts - Real Estate Law
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {partnerCategories.legalExperts.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    {partner.image && (
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                          <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h5>
                    <p className="text-purple-600 font-semibold text-sm mb-3">{partner.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{partner.bio}</p>
                    <div className="space-y-1 mb-4">
                      {partner.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 justify-center">
                      <a
                        href={`mailto:${partner.email}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                      >
                        <Mail className="h-4 w-4" />
                        Contact
                      </a>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                        >
                          <Globe className="h-4 w-4" />
                          Website
                        </a>
                      )}
                    </div>
                    {partner.location && (
                      <div className="mt-2 text-center">
                        <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                          <Globe className="h-3 w-3" />
                          {partner.location}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Banking Partners Section */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                Banking Partners
              </h4>
              <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                {partnerCategories.bankingPartners.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h5>
                    <p className="text-green-600 font-semibold text-sm mb-3">{partner.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{partner.bio}</p>
                    <div className="space-y-1 mb-4">
                      {partner.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 justify-center">
                      <a
                        href={`mailto:${partner.email}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                      >
                        <Mail className="h-4 w-4" />
                        Contact
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every project and relationship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity & Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships through transparency, honesty, and unwavering commitment to our clients' success.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence & Innovation</h3>
              <p className="text-gray-600">
                Delivering exceptional results through cutting-edge solutions and meticulous attention to detail.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise, Global Vision</h3>
              <p className="text-gray-600">
                Combining deep local knowledge with international best practices to create unique investment opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for property investment and tourism development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Briefcase className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Property Investment</h3>
              <p className="text-gray-600 text-sm">
                Complete guidance on property acquisition, from market analysis to post-purchase management.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Building2 className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Tourism Development</h3>
              <p className="text-gray-600 text-sm">
                Hotel and resort development with proven expertise in 5-star properties.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Award className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Grant Funding</h3>
              <p className="text-gray-600 text-sm">
                Expert assistance securing PIA Turismo, Titolo II, and EU funding programs.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Shield className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Project Management</h3>
              <p className="text-gray-600 text-sm">
                End-to-end management ensuring timely delivery and quality outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold mb-4">Legal Information</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <p><strong>Company:</strong> 1402 Celsius Ltd</p>
                <p><strong>Registration:</strong> 124 75013</p>
                <p><strong>VAT:</strong> GB 343 1702 32</p>
              </div>
              <div>
                <p><strong>Address:</strong> 20-22 Wenlock Road, N1 7GU, London, United Kingdom</p>
                <p><strong>Email:</strong> info@investinpuglia.eu</p>
                <p><strong>Phone:</strong> +39 351 400 1402</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Puglia Investment Journey?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Work directly with Giuseppe and Cataldo - our core team with 35+ years of combined expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-consultation"
              className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all"
            >
              Schedule Free Consultation
            </Link>
            <a
              href="tel:+393514001402"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all"
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