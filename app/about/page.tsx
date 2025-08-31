import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Award, Shield, Target, Users, Building2, 
  TrendingUp, Globe, Briefcase, Star, CheckCircle,
  Mail, Phone, Linkedin, Calendar, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - Leadership Team | InvestInPuglia',
  description: 'Meet the InvestInPuglia leadership team. Giuseppe Funaro (CEO), Dott. Ing. Cataldo Russo (CTO), Antonio Quarta (CFO). 29+ years of excellence in Italian real estate and tourism development.',
  keywords: 'InvestInPuglia team, Giuseppe Funaro CEO, Cataldo Russo CTO, Antonio Quarta CFO, Puglia investment experts, Italian real estate team',
}

export default function AboutPage() {
  const leadership = [
    {
      name: "Giuseppe Funaro",
      role: "Chief Executive Officer",
      image: "/giuseppe-photo.jpg",
      bio: "Visionary entrepreneur with deep expertise in Italian real estate and international investment. Giuseppe leads InvestInPuglia's strategic vision, fostering relationships with high-net-worth individuals and institutional investors worldwide.",
      expertise: [
        "International Investment Relations",
        "Strategic Business Development", 
        "Real Estate Investment Strategy",
        "Cross-border Transactions"
      ],
      achievements: [
        "Facilitated €50M+ in foreign investments",
        "Built network of 500+ international investors",
        "Pioneered digital investment platforms for Puglia",
        "Established partnerships with global investment firms"
      ],
      linkedin: "https://linkedin.com/in/giuseppefunaro",
      email: "giuseppe@investinpuglia.eu"
    },
    {
      name: "Dott. Ing. Cataldo Russo",
      role: "Chief Technical Officer",
      image: "/russo-photo.jpg",
      bio: "Licensed Engineer-Architect with 29 years of excellence in tourism development. Cataldo oversees all technical aspects, from project design to grant funding, ensuring the highest standards of execution.",
      expertise: [
        "Architectural & Engineering Design",
        "Grant Funding (€20M+ secured)",
        "Heritage Restoration (D.Lgs. 42/04)",
        "Sustainable Construction (ITACA Certified)"
      ],
      achievements: [
        "Completed 50+ hotel/resort projects",
        "€80M+ in total project value delivered",
        "95% grant application success rate",
        "Order of Engineers Lecce #1697 since 1995"
      ],
      credentials: [
        "ITACA Protocol Certified (2016)",
        "Fire Safety Specialist (L.818/84)",
        "D.Lgs 81/2008 Safety Coordinator",
        "Seismic Design Specialist"
      ],
      email: "cataldo@investinpuglia.eu"
    },
    {
      name: "Antonio Quarta",
      role: "Chief Financial Officer",
      image: "https://res.cloudinary.com/dusubfxgo/image/upload/c_fill,f_auto,g_face,h_800,q_auto:best,w_800/v1756629855/investinpuglia/team/antonio-quarta-cfo.jpg",
      bio: "Seasoned financial executive with extensive experience in real estate finance and investment structuring. Antonio ensures financial excellence and optimal returns for all InvestInPuglia projects.",
      expertise: [
        "Financial Structuring & Modeling",
        "Investment Analysis & Due Diligence",
        "Grant Funding Applications",
        "Risk Management & Compliance"
      ],
      achievements: [
        "Structured €30M+ in development financing",
        "Optimized tax strategies saving clients €5M+",
        "Managed portfolio with 35% average ROI",
        "Expert in Italian fiscal regulations"
      ],
      email: "antonio@investinpuglia.eu"
    }
  ]

  const companyStats = [
    { value: "29+", label: "Years of Excellence", icon: <Calendar className="h-6 w-6" /> },
    { value: "€80M+", label: "Projects Completed", icon: <TrendingUp className="h-6 w-6" /> },
    { value: "50+", label: "Hotels & Resorts", icon: <Building2 className="h-6 w-6" /> },
    { value: "€20M", label: "Grants Secured", icon: <Award className="h-6 w-6" /> },
    { value: "95%", label: "Success Rate", icon: <Star className="h-6 w-6" /> },
    { value: "500+", label: "Happy Investors", icon: <Users className="h-6 w-6" /> }
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
                dynamic region. Combining decades of experience in international real estate, engineering excellence, 
                and financial expertise, we recognized that while Puglia offers exceptional investment opportunities, 
                international investors often struggle to navigate the local landscape.
              </p>
              <p className="mb-6">
                Led by our Chief Technical Officer, Dott. Ing. Cataldo Russo, with 29 years of proven success in 
                tourism development, we have completed over 50 hotel and resort projects valued at more than €80 million. 
                Our track record includes securing €20 million in grants with a 95% success rate, making us the 
                preferred partner for serious investors.
              </p>
              <p>
                Today, InvestInPuglia serves as the trusted advisor for international investors seeking to capitalize 
                on Puglia's economic renaissance, whether through property acquisition, tourism development, or strategic 
                investments in the region's growing hospitality sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Executive Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining international business acumen with deep technical expertise and financial excellence
            </p>
          </div>

          <div className="space-y-20">
            {leadership.map((leader, index) => (
              <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur-2xl opacity-20"></div>
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="rounded-2xl shadow-2xl w-full max-w-md mx-auto relative z-10"
                    />
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <h3 className="text-3xl font-bold mb-2">{leader.name}</h3>
                    <p className="text-indigo-600 font-semibold text-lg mb-4">{leader.role}</p>
                    
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      {leader.bio}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3 text-slate-900">Core Expertise</h4>
                      <div className="space-y-2">
                        {leader.expertise.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3 text-slate-900">Key Achievements</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {leader.achievements.map((achievement, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {leader.credentials && (
                      <div className="mb-6">
                        <h4 className="font-bold text-lg mb-3 text-slate-900">Professional Credentials</h4>
                        <div className="flex flex-wrap gap-2">
                          {leader.credentials.map((credential, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {credential}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        <Mail className="h-5 w-5" />
                        Contact
                      </a>
                      {leader.linkedin && (
                        <a
                          href={leader.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                          <Linkedin className="h-5 w-5" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                <p><strong>Phone:</strong> +39 347 533 0647</p>
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
            Join hundreds of successful investors who have trusted InvestInPuglia with their Italian real estate dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-consultation"
              className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all"
            >
              Schedule Free Consultation
            </Link>
            <a
              href="tel:+393475330647"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all"
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