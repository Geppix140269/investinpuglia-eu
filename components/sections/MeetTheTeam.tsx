// components/sections/MeetTheTeam.tsx
'use client'

import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import Icon from '@/lib/iconMappings'

export default function MeetTheTeam() {
  const teamMembers = [
    {
      name: "Dott. Ing. Cataldo Russo",
      role: "Chief Technical Officer",
      description: "Licensed Italian Engineer-Architect with 29 years of demonstrable experience. Successfully delivered 50+ hotel and resort projects worth €95M+, securing €20M in grants. LOCAL connections built over decades.",
      image: "/russo-photo.jpg",
      expertise: [
        "Architectural & Engineering Design",
        "Grant Funding (€20M+ secured)",
        "Heritage Restoration",
        "ITACA Protocol Certified"
      ]
    },
    {
      name: "Antonio Quarta",
      role: "Chief Financial Officer",
      description: "Italian financial executive with demonstrable track record in €150M+ project financing. Expert in navigating EU grants beyond Mini PIA. Deep LOCAL banking and institutional relationships.",
      image: "https://res.cloudinary.com/dusubfxgo/image/upload/c_fill,f_auto,g_face,h_800,q_auto:best,w_800/v1756629855/investinpuglia/team/antonio-quarta-cfo.jpg",
      expertise: [
        "Financial Structuring & Modeling",
        "Investment Analysis & Due Diligence",
        "Grant Funding Applications",
        "Risk Management & Compliance"
      ]
    },
    {
      name: "Avv. Marco Magaraggia",
      role: "Legal Counsel - Italian & International Law",
      description: "Specializing in Italian real estate law, foreign investments, and international taxation. Expert in navigating Italian bureaucracy and ensuring compliance for foreign investors.",
      image: "https://res.cloudinary.com/dusubfxgo/image/upload/c_fill,f_auto,g_face,h_800,q_auto:best,w_800/v1756898400/investinpuglia/team/marco-magaraggia-professional.jpg",
      expertise: [
        "Italian Real Estate Law",
        "International Tax Optimization",
        "Foreign Investment Compliance",
        "Contract Negotiation & Due Diligence"
      ]
    }
  ]

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
            The REAL <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Italian Experts</strong>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Italians with 30+ years international experience. Our network is LOCAL, our expertise is REAL, 
            and working with us is a privilege reserved for serious investors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
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
          <p className="text-gray-600 mb-6">
            <strong>100+ years of combined expertise</strong> in project management and financing. 
            We are the REAL thing - not improvised consultants.
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