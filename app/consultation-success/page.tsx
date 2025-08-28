'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ConsultationSuccessPage() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const duration = searchParams.get('duration') || '30';
  const calendlyUrl = searchParams.get('calendly') || 'https://calendly.com/investinpuglia/30min';
  
  useEffect(() => {
    // Auto-redirect to Calendly after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = calendlyUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [calendlyUrl]);

  const consultationType = duration === '60' ? '1-Hour Deep Dive' : '30-Minute Consultation';
  const price = duration === '60' ? '€100' : '€60';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Euro className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Thank you for booking your {consultationType}
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-left">
              <p className="text-sm text-gray-500">Consultation Type</p>
              <p className="text-lg font-semibold text-gray-900">{consultationType}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="text-lg font-semibold text-green-600">{price}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Next Step: Schedule Your Consultation
            </h3>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-800 mb-2">
                Redirecting to Calendly in <span className="font-bold">{countdown}</span> seconds...
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(5 - countdown) * 20}%` }}
                />
              </div>
            </div>

            <a
              href={calendlyUrl}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Now on Calendly
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            
            <p className="mt-4 text-sm text-gray-600">
              Choose your preferred date and time with Giuseppe Funaro
            </p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What Happens Next?
          </h3>
          
          <div className="text-left space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">1</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Schedule Your Call</p>
                <p className="text-sm text-gray-600">Select a convenient time on Calendly</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">2</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Receive Confirmation</p>
                <p className="text-sm text-gray-600">You'll get an email with meeting details and preparation tips</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">3</span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Join the Consultation</p>
                <p className="text-sm text-gray-600">Connect via video call to discuss your investment goals</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Receive Your Action Plan</p>
                <p className="text-sm text-gray-600">Get a personalized roadmap for your Mini PIA grant application</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:invest@investinpuglia.eu" className="text-blue-600 hover:underline">
              invest@investinpuglia.eu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Add Euro icon component
const Euro = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);