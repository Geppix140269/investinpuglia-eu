'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ConsultationSuccessContent() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const duration = searchParams?.get('duration') || '30';
  const calendlyUrl = searchParams?.get('calendly') || 'https://calendly.com/investinpuglia/30min';
  
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

  const consultationType = '30-Minute Consultation';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping"></div>
              <CheckCircle className="h-24 w-24 text-green-500 relative" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Qualification Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your FREE {consultationType} is ready to be scheduled.
            </p>
            <div className="inline-flex items-center justify-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="font-medium">Duration: {duration} minutes</span>
            </div>
          </div>

          {/* Redirect Notice */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 mb-8">
            <div className="text-center text-white">
              <h2 className="text-2xl font-semibold mb-3">
                Redirecting to Calendly in {countdown} seconds...
              </h2>
              <p className="mb-4">
                You&apos;ll be taken to our scheduling page to book your preferred consultation time.
              </p>
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            </div>
          </div>

          {/* Manual Redirect Button */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              If you&apos;re not redirected automatically, click below:
            </p>
            <a
              href={calendlyUrl}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Schedule Your Consultation Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>

          {/* What&apos;s Next Section */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What happens next?
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                  1
                </span>
                <span>Choose your preferred date and time on Calendly</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                  2
                </span>
                <span>Receive a calendar invitation with meeting details</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                  3
                </span>
                <span>Prepare any questions about grants and investment opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                  4
                </span>
                <span>Join your consultation with our expert advisor</span>
              </li>
            </ol>
          </div>

          {/* Support Information */}
          <div className="bg-gray-50 rounded-lg p-4 mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need assistance? Contact us at{' '}
              <a href="mailto:g.funaro@investinpuglia.eu" className="text-blue-600 hover:underline font-medium">
                g.funaro@investinpuglia.eu
              </a>
              {' '}or call{' '}
              <a href="tel:+393514001402" className="text-blue-600 hover:underline font-medium">
                +39 351 400 1402
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConsultationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <ConsultationSuccessContent />
    </Suspense>
  );
}