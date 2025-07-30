// components/sections/Services.tsx
import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'

export default function Services() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Icon name="Wrench" size={20} />
            PROFESSIONAL TOOLS
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Your Complete <strong className="font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Protection System</strong>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stop gambling with your investment - work with verified professionals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-white/50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="mb-6 group-hover:scale-110 transition-transform">
              <Icon name="Calculator" size={56} className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Grant Calculators</h3>
            <p className="mb-6 text-gray-600">
              AI-powered tools to instantly calculate your eligibility for up to €2.25M in grants
            </p>
            <CTAButton 
              variant="custom"
              href="/calculator"
              text="Try Calculator"
              location="services"
              className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
              showIcon={true}
            />
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-white/50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="mb-6 group-hover:scale-110 transition-transform">
              <Icon name="Search" size={56} className="text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Due Diligence Reports</h3>
            <p className="mb-6 text-gray-600">
              Uncover hidden problems BEFORE you buy - structural issues, legal problems, true costs
            </p>
            <CTAButton 
              variant="custom"
              href="/surveys"
              text="Order Survey"
              location="services"
              className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
              showIcon={true}
            />
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-white/50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="mb-6 group-hover:scale-110 transition-transform">
              <Icon name="ClipboardList" size={56} className="text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Verified Professionals</h3>
            <p className="mb-6 text-gray-600">
              Connect with pre-vetted architects, engineers, contractors with proven track records
            </p>
            <CTAButton 
              variant="custom"
              href="https://calendly.com/investinpuglia/30min"
              text="Book Expert Call"
              location="services"
              className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
              showIcon={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
