'use client';

import { useEffect } from 'react';
import { Calendar, ArrowRight, Phone } from 'lucide-react';

export default function BookConsultationPage() {
  useEffect(() => {
    // Redirect directly to Calendly after a brief moment
    const timer = setTimeout(() => {
      window.location.href = 'https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=booking_page&utm_campaign=free_consultation';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="mb-8">
            <Calendar className="h-20 w-20 text-green-600 mx-auto animate-pulse" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Redirecting to Book Your FREE Consultation
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            You're being redirected to our Calendly scheduling page to book your 
            FREE 30-minute consultation with our EU grant experts.
          </p>
          
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-green-800 mb-2">
              ✅ 100% FREE Consultation
            </p>
            <p className="text-gray-700">
              No payment required • Expert advice on €200K-€2M grants • 30 minutes that could transform your investment
            </p>
          </div>
          
          <a
            href="https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=booking_page&utm_campaign=free_consultation"
            className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all gap-3 animate-pulse"
          >
            <Phone className="h-6 w-6" />
            Book Your Call NOW
            <ArrowRight className="h-5 w-5" />
          </a>
          
          <p className="text-sm text-gray-500 mt-6">
            Not redirecting? <a href="https://calendly.com/investinpuglia/30min" className="text-blue-600 underline">Click here</a>
          </p>
        </div>
        
        <p className="text-gray-600 mt-8">
          Questions? Call us directly: +39 351 400 1402
        </p>
      </div>
    </div>
  );
}