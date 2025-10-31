'use client';

import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';

export default function ConsultationCTA() {
  const handleQuickBook = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'homepage_cta_click', {
        event_category: 'consultation',
        event_label: 'quick_book_homepage'
      });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 via-green-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Unlock €200K-€2M in EU Grants?
          </h2>
          <p className="text-xl md:text-2xl text-green-50 mb-8 max-w-3xl mx-auto">
            Book your FREE 30-minute consultation with our EU grant experts.
            No payment required. No obligations.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <CheckCircle className="h-8 w-8 text-green-300 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">100% FREE</h3>
            <p className="text-green-50">
              No payment required. Get expert advice at no cost.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <CheckCircle className="h-8 w-8 text-green-300 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">30 Minutes</h3>
            <p className="text-green-50">
              Quick, focused session on your investment goals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <CheckCircle className="h-8 w-8 text-green-300 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Expert Guidance</h3>
            <p className="text-green-50">
              30+ years experience in EU grants & property investment.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=homepage_cta&utm_campaign=consultation"
            onClick={handleQuickBook}
            className="group bg-white text-green-700 px-8 py-5 rounded-full font-bold text-xl hover:bg-green-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-3"
          >
            <Calendar className="h-7 w-7 group-hover:scale-110 transition-transform" />
            Book FREE Consultation
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/consultation"
            className="text-white border-2 border-white/50 hover:border-white px-8 py-5 rounded-full font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
          >
            Learn More About Our Process
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 text-center">
          <p className="text-green-100 text-sm">
            ⚡ Limited slots available • 95% approval rate • Join 50+ successful investors
          </p>
        </div>

        {/* Alternative Contact */}
        <div className="mt-6 text-center">
          <p className="text-green-50 text-sm">
            Prefer to call? <a href="tel:+393514001402" className="font-bold text-white underline hover:text-green-200">+39 351 400 1402</a>
          </p>
        </div>
      </div>
    </section>
  );
}
