// components/sections/Services.tsx
import Icon from '@/lib/iconMappings'

export default function Services() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Expert Services for Every Step
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From grant applications to property management, we provide comprehensive support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">💶</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">EU Grant Advisory</h3>
            <p className="text-gray-600 mb-6">
              Expert guidance on accessing up to €2.25M in EU grants with 95% approval rate
            </p>
            <a href="/contact" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline">Learn More →</a>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Due Diligence</h3>
            <p className="text-gray-600 mb-6">
              Strategic due diligence to uncover risks and opportunities before you commit
            </p>
            <a href="/contact" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline">Learn More →</a>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">VIP Concierge</h3>
            <p className="text-gray-600 mb-6">
              Personal guidance through every step of your Puglia investment journey
            </p>
            <a href="https://calendly.com/investinpuglia/30min" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline">Book Strategy Call →</a>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All services include access to my trusted network of vetted professionals
          </p>
          <a href="/services" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline">View All Services →</a>
        </div>
      </div>
    </section>
  )
}
