// Path: components/sections/Services.tsx
import Icon from '@/lib/iconMappings'
import { CloudinaryImage } from '@/components/CloudinaryImage'

export default function Services() {
  const teamMembers = [
    {
      name: "Giuseppe Funaro",
      role: "Founder & Investment Advisor",
      description: "After 35+ years in international business, I've seen too many investors lose fortunes due to language barriers, cultural misunderstandings, and working with the wrong people. That's why I've built a network of only the most trusted, proven professionals in Puglia.",
      image: "/Giuseppe Funaro 062025.png",
      linkedin: "https://www.linkedin.com/in/giuseppe-funaro/"
    },
    {
      name: "Dott. Ing. Cataldo Russo",
      role: "Chief Technical Officer",
      description: "Licensed Engineer-Architect with 29 years of experience. Successfully delivered 50+ hotel and resort projects worth €95M+, securing €20M in grants. Registered with Lecce Order of Engineers (#1697) since 1995.",
      image: "/russo-photo.jpg",
      linkedin: null
    },
    {
      name: "Victoria Russo",
      role: "Operations Manager",
      description: "Coordinates all aspects of project implementation, from initial consultation to final delivery. Ensures seamless communication between international clients and local teams.",
      image: "/team/victoria-russo.jpg",
      linkedin: null
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-purple-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet The Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced professionals dedicated to your investment success in Puglia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-64 bg-gradient-to-br from-purple-100 to-emerald-100">
                <CloudinaryImage
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {member.description}
                </p>
                {member.linkedin && (
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 hover:underline"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Working with trusted professionals who have delivered results for decades
          </p>
          <a 
            href="https://calendly.com/investinpuglia/30min" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl transition-all"
          >
            Schedule a Consultation
            <Icon name="ArrowRight" size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}