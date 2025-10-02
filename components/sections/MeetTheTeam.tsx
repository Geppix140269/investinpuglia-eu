// components/sections/MeetTheTeam.tsx
'use client'

import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import Icon from '@/lib/iconMappings'

export default function MeetTheTeam() {
  const coreTeam = [
    {
      name: "Giuseppe Funaro",
      role: "Founder & Business Development Director",
      description: "With 35+ years in international business, I represent foreign clients in all aspects of Italian investment projects. As Business Development Director of Capitalimprese and full member of the International Trade Council, I specialize in tourism development, industrial projects, and commercial ventures. My role is to ensure clear communication, manage expectations, and coordinate all project phases from initial consultation to completion.",
      image: "/Giuseppe Funaro 062025.png",
      expertise: [
        "Foreign Client Representation",
        "Industrial & Commercial Project Development",
        "Tourism Development Projects",
        "EU Grant Applications & Management",
        "International Business Strategy",
        "Cross-Cultural Communication"
      ],
      affiliations: [
        {
          name: "Capitalimprese",
          role: "Business Development Director",
          website: "https://capitalimprese.it",
          logo: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759139352/capitalimprese_text_byzfue.png"
        },
        {
          name: "International Trade Council",
          role: "Full Member",
          logo: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759139412/ITC_zb3kum.png"
        }
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
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759136529/antonio_quarta_ws6wj8.jpg",
        keyFactor: "Fluent in English"
      },
      {
        name: "Maurizio Deta",
        role: "Chartered Accountant - Financial & Tax Advisor",
        description: "Seasoned financial consultant and chartered accountant with nearly 30 years of experience in corporate finance, taxation, and banking strategy. Based in Lecce, he specializes in debt restructuring, incentive funding, and insolvency procedures for both private and public sector clients.",
        expertise: ["Corporate Finance & Taxation", "Debt Restructuring", "Incentive Funding", "Banking Strategy", "Credit Securitisation", "Project Planning"],
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759136664/Screenshot_2025-09-29_110324_mvumlf.png",
        location: "Lecce",
        keyFactor: "Tax Expert"
      },
      {
        name: "Giorgio Caracciolo",
        role: "Chartered Accountant - Business & Financial Advisor",
        description: "Experienced chartered accountant with 40+ years specializing in business consulting, financial advisory, and industrial projects. Provides comprehensive financial guidance and regulatory compliance support for international businesses investing in Italy.",
        expertise: ["Business Consulting", "Financial Advisory", "Industrial Project Development", "International Business Setup", "Tax Compliance", "Financial Planning"],
        website: "https://giorgiocaracciolo.it",
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759129953/Screenshot_2025-09-29_085846_zcz9kn.png",
        keyFactor: "40+ Years Experience & Industrial Projects"
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
        location: "Lecce",
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759206138/Screenshot_2025-09-30_062113_lhxsfv.png"
      }
    ],
    recommendedBanks: [
      {
        name: "Intesa San Paolo",
        role: "Recommended Banking Institution",
        description: "Italy's leading banking group offering specialized services for international investors. We recommend them for bank account opening procedures and project financing for real estate investments in Italy.",
        expertise: ["Bank Account Opening", "Project Financing", "International Banking Services", "Investment Loans"],
        type: "institution",
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759138773/intesa-sanpaolo-vector-logo_qpripe.png"
      }
    ],
    strategicPartners: [
      {
        name: "Ger Rottink",
        company: "NEXUS Capital Architects",
        role: "Founder / CEO - Strategic Investment Partner",
        description: "30 years of Expertise in structured Finance, VC and PE Capital. European RE Development / total Project Management / Engineering. Strategic Investment advisors specializing in bridging and advising investments from The Netherlands in Italy.",
        expertise: [
          "Structured Financing",
          "European RE Development",
          "Project Management & Engineering",
          "Exit Strategy Advisors",
          "EU Tax, Legal and Notarial Advisors",
          "Bridging Dutch-Italian Investments"
        ],
        image: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759206413/image_qdvlvv.png",
        companyLogo: "https://res.cloudinary.com/dusubfxgo/image/upload/v1759206912/Screenshot_2025-09-30_063420-Photoroom_wkb4hx.png",
        companyDescription: "Navigating your finance with accuracy & precision. Overall Project Management. Advisors in (EU) Tax, legal and Notarial matters. RE Development. Civil Engineering. Project Management. Structured Financing. Exit strategy advisors. Local experts in Tax, Legal and Notarial expertise Italy. RE specialists with in-house disciplines / expertise.",
        type: "strategic"
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
            Meet the <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Core Team</strong>
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
                    <div className="space-y-2 text-left mb-4">
                      {member.expertise.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={16} className="text-emerald-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    {(member as any).affiliations && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Professional Affiliations</h4>
                        <div className="space-y-3">
                          {(member as any).affiliations.map((affiliation: any, i: number) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
                                  <CloudinaryImage
                                    src={affiliation.logo}
                                    alt={affiliation.name}
                                    width={40}
                                    height={40}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 text-sm">{affiliation.name}</h5>
                                  <p className="text-xs text-gray-600">{affiliation.role}</p>
                                  {affiliation.website && (
                                    <a
                                      href={affiliation.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 text-xs mt-1"
                                    >
                                      <Icon name="Globe" size={12} />
                                      Website
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
              <strong className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Professional Network</strong>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center">
                {partnerCategories.charteredAccountants.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 w-full max-w-sm">
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
                    <p className="text-blue-600 font-semibold text-sm mb-2">{partner.role}</p>
                    {(partner as any).keyFactor && (
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                        ⭐ {(partner as any).keyFactor}
                      </div>
                    )}
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

            {/* Recommended Banks Section */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Icon name="Building2" size={20} className="text-green-600" />
                Recommended Banking Institutions
              </h4>
              <p className="text-center text-gray-600 mb-4 text-sm max-w-2xl mx-auto">
                Based on my experience, I recommend the following banking institutions for international investors in Italy.
                I am not affiliated with or a partner of these institutions.
              </p>
              <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                {partnerCategories.recommendedBanks.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    {partner.image && (
                      <div className="flex justify-center mb-4">
                        <div className="w-40 h-20 flex items-center justify-center bg-transparent rounded-lg p-2">
                          <CloudinaryImage
                            src={partner.image}
                            alt={partner.name}
                            width={150}
                            height={75}
                            className="max-w-full max-h-full object-contain filter drop-shadow-lg"
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

            {/* Strategic Partners Section - International Investor Network */}
            <div className="mb-10">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-purple-600" />
                Strategic Investment Partners
              </h4>
              <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
                Our strategic partners specialize in connecting international investors with Italian investment opportunities.
                They provide comprehensive support from initial structuring through project completion.
              </p>
              <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                {partnerCategories.strategicPartners.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-8 border border-purple-200 shadow-lg">
                    <div className="grid md:grid-cols-3 gap-6 items-start">
                      {/* Left: Profile */}
                      <div className="flex flex-col items-center text-center">
                        {partner.image && (
                          <div className="mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                              <CloudinaryImage
                                src={partner.image}
                                alt={partner.name}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <h5 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h5>
                        <p className="text-purple-600 font-semibold text-sm mb-3">{partner.role}</p>

                        {(partner as any).companyLogo && (
                          <div className="mt-4 mb-3">
                            <div className="bg-white rounded-lg p-3 shadow-md">
                              <CloudinaryImage
                                src={(partner as any).companyLogo}
                                alt={(partner as any).company}
                                width={120}
                                height={60}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>
                        )}
                        <p className="text-sm font-semibold text-gray-700">{(partner as any).company}</p>
                      </div>

                      {/* Middle: Description */}
                      <div className="md:col-span-2">
                        <div className="mb-4">
                          <h6 className="font-semibold text-gray-900 mb-2">About {partner.name}</h6>
                          <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                        </div>

                        <div className="mb-4">
                          <h6 className="font-semibold text-gray-900 mb-2">Expertise</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {partner.expertise.map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Icon name="CheckCircle" size={14} className="text-emerald-600 flex-shrink-0" />
                                <span className="text-xs text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {(partner as any).companyDescription && (
                          <div className="bg-white/50 rounded-lg p-4 border border-purple-200 mt-4">
                            <h6 className="font-semibold text-gray-900 mb-2">About {(partner as any).company}</h6>
                            <p className="text-xs text-gray-600 leading-relaxed">{(partner as any).companyDescription}</p>
                          </div>
                        )}

                        <div className="mt-4 bg-purple-100 rounded-lg p-3 border border-purple-300">
                          <p className="text-sm text-purple-800 font-medium">
                            <Icon name="Users" size={16} className="inline mr-2" />
                            <strong>Partnership Role:</strong> NEXUS Capital Architects works with our team to source and connect international
                            investors, particularly from the Netherlands, with premium Italian investment opportunities.
                          </p>
                        </div>
                      </div>
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