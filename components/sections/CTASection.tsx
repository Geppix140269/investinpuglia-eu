// components/sections/CTASection.tsx
import Icon from '@/lib/iconMappings'
import CTAButton from '@/components/CTAButton'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-emerald-600 text-white relative overflow-hidden animate-gradient bg-[length:400%_400%]">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            Don''t Learn the Hard Way<br/><strong className="font-bold">Start Smart</strong>
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Why risk your investment? Work with an advisor who guarantees success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CTAButton
              variant="custom"
              href="https://calendly.com/investinpuglia/30min"
              text="Book Free Consultation"
              location="footer-cta"
              className="text-lg px-10 py-5 bg-white text-purple-700 hover:bg-gray-100 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            />
            <CTAButton
              variant="custom"
              href="/contact"
              text="Get in Touch"
              location="footer-cta"
              className="text-lg px-10 py-5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            />
          </div>
          
          <p className="mt-8 text-sm text-white/70 flex items-center justify-center gap-2">
            <Icon name="AlertTriangle" size={16} />
            Warning: 95% of investors who go it alone face major problems. Don''t be one of them.
          </p>
        </div>
      </div>
    </section>
  )
}
