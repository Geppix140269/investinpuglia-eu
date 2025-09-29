// components/sections/MeetTheTeam.tsx
'use client'

import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import Icon from '@/lib/iconMappings'

export default function MeetTheTeam() {
  const coreTeam = [
    {
      name: "Giuseppe Funaro",
      role: "Founder & Client Representative",
      description: "With 35+ years in international business, I represent foreign clients in all aspects of Italian property investment. My role is to ensure clear communication, manage expectations, and coordinate all project phases from initial consultation to completion.",
      image: "/Giuseppe Funaro 062025.png",
      expertise: [
        "Foreign Client Representation",
        "Project Coordination & Management", 
        "Cross-Cultural Communication",
        "Investment Strategy Guidance"
      ]
    },
    {
      name: "Dott. Ing. Cataldo Russo",
      role: "Technical Partner & Chief Engineer",
      description: "Licensed Italian Engineer-Architect with 29 years of demonstrable experience. Cataldo creates and manages all technical aspects of projects - from initial design through construction completion. Successfully delivered 50+ hotel and resort projects worth €95M+.",
      image: "/russo-photo.jpg",
      expertise: [
        "Architectural & Engineering Design",
        "Technical Project Management",
        "Heritage Restoration",
        "Grant Applications (€20M+ secured)"
      ]
    }
  ]

  const partnerCategories = {
    charteredAccountants: [
      {
        name: "Antonio Quarta",
        role: "Chartered Accountant - Grant Financing Specialist",
        description: "Independent financial executive with track record in €150M+ project financing. Expert in Mini PIA grants and EU funding navigation. Available when specialized financial structuring is required.",
        expertise: ["Mini PIA Grant Applications", "EU Funding Navigation", "Financial Structuring", "Tax Optimization"],
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759136529/antonio_quarta_ws6wj8.jpg"
      },
      {
        name: "Maurizio Deta",
        role: "Chartered Accountant - Financial & Tax Advisor",
        description: "Seasoned financial consultant and chartered accountant with nearly 30 years of experience guiding businesses and public institutions through complex financial and regulatory landscapes. Based in Lecce, he specializes in corporate finance, taxation, and banking strategy, with particular focus on debt restructuring, incentive funding, and insolvency procedures. Known for his calm precision and strategic insight, Maurizio bridges private and public sectors, helping organizations unlock growth through clear financial planning and expertly managed funding pathways.",
        expertise: ["Corporate Finance & Taxation", "Debt Restructuring", "Incentive Funding", "Banking Strategy", "Credit Securitisation", "Project Planning"],
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759136664/Screenshot_2025-09-29_110324_mvumlf.png",
        location: "Lecce"
      },
      {
        name: "Giorgio Caracciolo",
        role: "Chartered Accountant - Business & Financial Advisor",
        description: "Experienced chartered accountant specializing in business consulting, financial advisory, and accounting services for international businesses. Provides comprehensive financial guidance and regulatory compliance support for foreign investors in Italy.",
        expertise: ["Business Consulting", "Financial Advisory", "Accounting Services", "International Business Setup", "Tax Compliance", "Financial Planning"],
        website: "https://giorgiocaracciolo.it",
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759129953/Screenshot_2025-09-29_085846_zcz9kn.png"
      }
    ],
    legalExperts: [
      {
        name: "Avv. Marco Magaraggia",
        role: "Legal Expert - Real Estate Law (Preferred Partner)",
        description: "Independent legal professional specializing in Italian real estate law for foreign buyers. English-speaking lawyer with expertise in property purchase assistance and compliance for international investors.",
        expertise: ["Property Purchase Legal Assistance", "Foreign Buyer Compliance", "International Tax Guidance"],
        website: "https://italian-lawyer.eu",
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1756908802/Marco_Magaraggia_italian_laywer_lecce_puglia_biznf1.webp"
      },
      {
        name: "Notaio Riccardo Pellegrino",
        role: "Legal Expert - Notary Services Lecce (Preferred Partner)",
        description: "Experienced notary based in Lecce specializing in real estate transactions and property law. Provides essential notarial services for property purchases and legal documentation.",
        expertise: ["Property Transaction Notarization", "Legal Documentation", "Title Verification", "Contract Authentication"],
        location: "Lecce"
      }
    ],
    bankingPartners: [
      {
        name: "Intesa San Paolo",
        role: "Preferred Banking Partner",
        description: "Italy's leading banking group providing specialized services for international investors. Expert in bank account opening procedures and project financing for real estate investments.",
        expertise: ["Bank Account Opening", "Project Financing", "International Banking Services", "Investment Loans"],
        type: "institution",
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759138773/intesa-sanpaolo-vector-logo_qpripe.png"
      }
    ]
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Icon name="Users" size={20} />
            100+ YEARS COMBINED EXPERTISE
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Meet Our <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Core Team</strong>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Giuseppe and Cataldo work together as the core team - Giuseppe handles all client relations and project coordination, 
            while Cataldo manages the technical and engineering aspects of every project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {coreTeam.map((member, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border border-gray-100">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex-shrink-0 mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <CloudinaryImage
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-semibold text-base mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                    <div className="space-y-2 text-left">
                      {member.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={16} className="text-emerald-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    {(member as any).website && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <a 
                          href={(member as any).website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                        >
                          <Icon name="Globe" size={16} />
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Our <strong className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Professional Partners</strong>
            </h3>
            <p className="text-gray-600 mb-8 text-center max-w-4xl mx-auto">
              Specialized professionals organized by expertise area. These English-speaking professionals are available when specialized services are needed.
              They work independently and charge their own fees based on project requirements.
            </p>

            {/* Chartered Accountants Section */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Icon name="Calculator" size={20} className="text-blue-600" />
                Chartered Accountants - Financial & Business Specialists
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {partnerCategories.charteredAccountants.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    {partner.image && (
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                          <CloudinaryImage
                            src={partner.image}
                            alt={partner.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h5>
                    <p className="text-blue-600 font-semibold text-sm mb-3">{partner.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    <div className="space-y-1 mb-4">
                      {partner.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={14} className="text-emerald-600 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    {partner.location && (
                      <div className="mt-2 text-center">
                        <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                          <Icon name="MapPin" size={12} />
                          {partner.location}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Experts Section */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Icon name="Scale" size={20} className="text-purple-600" />
                Legal Experts - Real Estate Law
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {partnerCategories.legalExperts.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    {partner.image && (
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                          <CloudinaryImage
                            src={partner.image}
                            alt={partner.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h5>
                    <p className="text-purple-600 font-semibold text-sm mb-3">{partner.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    <div className="space-y-1 mb-4">
                      {partner.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={14} className="text-emerald-600 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    {partner.website && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                        >
                          <Icon name="Globe" size={16} />
                          Visit Website
                        </a>
                      </div>
                    )}
                    {partner.location && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                          <Icon name="MapPin" size={12} />
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
                <Icon name="Building2" size={20} className="text-green-600" />
                Banking Partners
              </h4>
              <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                {partnerCategories.bankingPartners.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    {partner.image && (
                      <div className="flex justify-center mb-4">
                        <div className="w-32 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
                          <CloudinaryImage
                            src={partner.image}
                            alt={partner.name}
                            width={120}
                            height={60}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h5>
                    <p className="text-green-600 font-semibold text-sm mb-3">{partner.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    <div className="space-y-1">
                      {partner.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={14} className="text-emerald-600 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 text-center">
            <strong>35+ years of combined core team experience</strong> - Giuseppe coordinates your project while Cataldo handles all technical execution.
          </p>
          <Link 
            href="/consultation"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl"
          >
            FREE Expert Consultation
            <Icon name="ArrowRight" size={20} />
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Start with our FREE consultation - no payment required
          </p>
        </div>
      </div>
    </section>
  )
}