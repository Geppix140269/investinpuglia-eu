// components/sections/OurCommitment.tsx
import Icon from '@/lib/iconMappings'

export default function OurCommitment() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-emerald-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <Icon name="Shield" size={20} />
            OUR COMMITMENT
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
            What You Can <strong className="font-bold">Expect</strong>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            As a new company, we're building our reputation on transparency, 
            professionalism, and delivering real value to every client.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <Icon name="MagnifyingGlass" size={48} className="text-white/80 mb-4" />
            <h3 className="text-xl font-bold mb-3">Thorough Due Diligence</h3>
            <p className="text-white/80">
              Every property undergoes comprehensive checks with our network of 
              surveyors, lawyers, and local experts before you commit.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <Icon name="Shield" size={48} className="text-white/80 mb-4" />
            <h3 className="text-xl font-bold mb-3">Protected Investments</h3>
            <p className="text-white/80">
              We work only with licensed professionals and ensure all transactions 
              follow Italian law and EU regulations to protect your investment.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <Icon name="Euro" size={48} className="text-white/80 mb-4" />
            <h3 className="text-xl font-bold mb-3">Grant Expertise</h3>
            <p className="text-white/80">
              Our team stays updated on all EU funding opportunities and works 
              with specialized consultants to maximize your grant potential.
            </p>
          </div>
        </div>
        
        {/* Professional Network - Real credibility */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8">Our Trusted Partners</h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Partner 1 - Ing. Russo */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 flex items-center gap-6">
              <img 
                src="/russo-photo.jpg" 
                alt="Ing. Arch. Cataldo Russo"
                className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
              />
              <div className="flex-1">
                <h4 className="font-bold text-lg">Ing. Arch. Cataldo Russo</h4>
                <p className="text-white/80 text-sm">Engineering & Architecture</p>
                <p className="text-white/60 text-xs mt-1">Property Development Expert</p>
              </div>
            </div>
            
            {/* Partner 2 - Dott. Quarta */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 flex items-center gap-6">
              <img 
                src="/quarta-photo.jpg" 
                alt="Dott. Antonio Quarta"
                className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
              />
              <div className="flex-1">
                <h4 className="font-bold text-lg">Dott. Antonio Quarta</h4>
                <p className="text-white/80 text-sm">Studio Quarta - Chartered Accountant</p>
                <p className="text-white/60 text-xs mt-1">Subsidized Finance Specialist</p>
              </div>
            </div>
          </div>
          
          {/* Additional Services */}
          <div className="mt-8 bg-white/5 rounded-2xl p-8 border border-white/10">
            <h4 className="text-lg font-bold mb-4 text-center">Complete Administrative Support</h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-emerald-400 mt-0.5" />
                <span className="text-white/80">Italian Fiscal Code Attribution</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-emerald-400 mt-0.5" />
                <span className="text-white/80">Bank Account Opening</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-emerald-400 mt-0.5" />
                <span className="text-white/80">Limited Company Formation</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-emerald-400 mt-0.5" />
                <span className="text-white/80">Power of Attorney Services</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-emerald-400 mt-0.5" />
                <span className="text-white/80">Legal Representation</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-emerald-400 mt-0.5" />
                <span className="text-white/80">Contract Negotiation</span>
              </div>
            </div>
            <p className="text-center text-white/60 text-sm mt-6">
              Working with all major notary offices across Puglia
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
