'use client';

import { useEffect } from 'react';
import { Calendar, ArrowRight, Phone, MessageSquare } from 'lucide-react';

export default function BookConsultationPage() {
  // Immediate redirect - no waiting
  useEffect(() => {
    // Track the direct booking attempt
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'direct_booking_page_visit', {
        event_category: 'consultation',
        event_label: 'book_consultation_page'
      });
    }

    // Instant redirect to Calendly
    window.location.href = 'https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=booking_page&utm_campaign=free_consultation';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="mb-8">
            <Calendar className="h-20 w-20 text-green-600 mx-auto animate-pulse" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Opening Calendly...
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Taking you directly to our scheduling page to book your FREE 30-minute consultation.
          </p>

          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-green-800 mb-2">
              ✅ 100% FREE Consultation
            </p>
            <p className="text-gray-700">
              No payment required • Expert advice on €200K-€2M grants • 30 minutes that could transform your investment
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="https://calendly.com/investinpuglia/30min?utm_source=website&utm_medium=booking_page&utm_campaign=free_consultation"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all gap-3"
            >
              <Calendar className="h-6 w-6" />
              Click Here if Not Redirected
              <ArrowRight className="h-5 w-5" />
            </a>

            <p className="text-sm text-gray-500">
              Or <a href="/consultation" className="text-blue-600 underline">complete our optional questionnaire</a> to help us prepare for your call
            </p>
          </div>
        </div>

        <p className="text-gray-600 mt-8">
          Questions? Call us directly: <a href="tel:+393514001402" className="font-semibold text-green-600">+39 351 400 1402</a>
        </p>
      </div>
    </div>
  );
}