// app/contact/page.tsx
'use client'

export default function ContactPage() {
  return (
    <>
      {/* Hero Section with ALL effects */}
      <section className="min-h-screen flex items-center py-20 px-5 relative overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] via-[#059669] to-[#047857] bg-[length:400%_400%] animate-gradient">
        {/* Animated background elements */}
        <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] opacity-10" 
             style={{
               background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
               animation: 'shimmer 15s linear infinite'
             }} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center">
            {/* Badge with glow */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-7 py-3 rounded-full text-sm font-bold mb-8 shadow-lg animate-fadeIn">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              EXPERT GUIDANCE AWAITS
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 animate-fadeIn animation-delay-100">
              Get in <strong className="font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Touch</strong>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto animate-fadeIn animation-delay-200">
              Ready to secure your Italian property investment with expert guidance? Let's discuss your project.
            </p>
            
            {/* Glass morphism box */}
            <div className="inline-block bg-gradient-to-r from-emerald-400/20 to-green-500/10 backdrop-blur-md border border-emerald-400/30 px-8 py-5 rounded-full mb-10 animate-fadeIn animation-delay-300">
              <p className="text-white text-lg font-semibold">
                ðŸ“ž Average response time: Within 24 hours
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fadeIn animation-delay-400">
              <a 
                href="https://calendly.com/investinpuglia/30min" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-full text-lg font-bold hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Strategy Call
                <span className="text-2xl">â†’</span>
              </a>
              <a 
                href="mailto:info@investinpuglia.eu" 
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
              >
                Email Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options with glass cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Direct Contact - Glass card */}
            <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/50">
              <h2 className="text-2xl font-bold mb-8">Direct Contact</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Email</h3>
                  <a href="mailto:info@investinpuglia.eu" className="text-green-600 hover:underline text-lg">
                    info@investinpuglia.eu
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Phone/WhatsApp</h3>
                  <a href="tel:+393514001402" className="text-green-600 hover:underline text-lg">
                    +39 351 400 1402
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 - 18:00 CET<br/>
                    Saturday: 10:00 - 14:00 CET
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule Consultation - Glass card with gradient */}
            <div className="relative bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-green-200/50">
              <h2 className="text-2xl font-bold mb-8">Schedule a Consultation</h2>
              
              <p className="text-gray-700 mb-6">
                Book a free 30-minute strategy call to discuss your property investment goals and grant opportunities.
              </p>
              
              <a 
                href="https://calendly.com/investinpuglia/30min" 
                className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all w-full text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Strategy Call â†’
              </a>
              
              <p className="text-sm text-gray-600 mt-4">
                Average response time: Within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}





