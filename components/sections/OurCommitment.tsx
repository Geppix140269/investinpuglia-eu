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
        
        {/* Founder message - builds trust through transparency */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 text-center">
            <img 
              src="/Giuseppe Funaro 062025.jpg" 
              alt="Giuseppe Funaro"
              className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white/20"
            />
            <p className="text-lg md:text-xl text-white/90 italic mb-6">
              "Having worked internationally for years, I understand the challenges 
              of investing abroad. That's why I founded InvestInPuglia - to be the 
              trusted local partner I wish I'd had when making my own investments."
            </p>
            <p className="font-semibold text-lg">Giuseppe Funaro</p>
            <p className="text-white/70">Founder & CEO</p>
          </div>
        </div>
        
        {/* Professional Network - Real credibility */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/70 mb-4">Working in partnership with:</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-white/60">
              <p className="font-semibold">Studio Notarile</p>
              <p className="text-sm">Legal Services</p>
            </div>
            <div className="text-white/60">
              <p className="font-semibold">Ing. Russo & Associates</p>
              <p className="text-sm">Engineering</p>
            </div>
            <div className="text-white/60">
              <p className="font-semibold">Studio Quarta</p>
              <p className="text-sm">EU Funding</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
