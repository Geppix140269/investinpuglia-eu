// components/sections/BuyerProfile.tsx
import Icon from '@/lib/iconMappings'

export default function BuyerProfile() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg animate-pulse">
            <Icon name="Sparkles" size={20} />
            NEW FEATURE
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
            Get Your Personalized <strong className="font-bold">Buyer Profile</strong>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join our exclusive database of qualified property buyers and get matched with perfect investment opportunities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="Target" size={24} />
                Get Matched with Properties
              </h3>
              <p className="text-white/80">
                Our AI-powered system matches your requirements with available properties and grants
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="Bell" size={24} />
                Priority Notifications
              </h3>
              <p className="text-white/80">
                Be the first to know about new properties that match your investment criteria
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="Handshake" size={24} />
                Connect with Top Agents
              </h3>
              <p className="text-white/80">
                Qualified real estate professionals compete to serve your specific needs
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all">
            <div className="text-center">
              <div className="mb-4">
                <Icon name="ClipboardList" size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Complete Your Profile</h3>
              <p className="text-white/80 mb-6">
                10-minute questionnaire to understand your:
              </p>
              <ul className="text-left space-y-2 mb-8 text-white/90">
                <li className="flex items-center gap-2">
                  <span className="text-purple-300">•</span> Investment budget & financing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-300">•</span> Property preferences & locations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-300">•</span> Timeline & readiness
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-300">•</span> Grant eligibility factors
                </li>
              </ul>
              <a 
                href="/buyer-profile" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all w-full justify-center"
              >
                Start Your Profile
                <Icon name="ArrowRight" size={20} />
              </a>
              <p className="text-sm text-white/60 mt-4">
                Free • No obligation • 100% confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
