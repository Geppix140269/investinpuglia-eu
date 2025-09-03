'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Shield, Star, Users, Tag } from 'lucide-react';
import Link from 'next/link';

function BookConsultationContent() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const source = searchParams?.get('source') || 'website';
  const campaign = searchParams?.get('campaign') || 'direct';

  const consultationOptions = [
    {
      duration: '30',
      title: 'FREE 30-Minute Consultation',
      description: 'Complete eligibility assessment and personalized strategy session - absolutely FREE!',
      popular: true,
      features: [
        'Grant eligibility assessment',
        'Investment strategy overview',
        'Personalized Q&A session',
        'Clear next steps roadmap',
        'No obligation or payment required'
      ],
      calendlyUrl: 'https://calendly.com/investinpuglia/30min'
    }
  ];

  const handleProceedToScheduling = () => {
    setIsProcessing(true);
    const selectedOption = consultationOptions[0];
    
    // Redirect to consultation page for Trullo qualification first
    window.location.href = `/consultation?source=${source}&campaign=${campaign}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FREE Expert Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance on accessing EU grants for your Italian property investment. 
            Our experts have secured over €50M in grants for international investors.
          </p>
        </div>

        {/* FREE Offer Banner */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 shadow-lg text-white">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <Tag className="h-8 w-8 mr-3" />
                <div className="text-center">
                  <h3 className="text-xl font-bold">100% FREE Consultation!</h3>
                  <p>No payment required • No hidden fees • No obligations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">30+ Years Experience</h3>
            <p className="text-sm text-gray-600">Trusted by investors worldwide</p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">95% Success Rate</h3>
            <p className="text-sm text-gray-600">Grant approval track record</p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">€50M+ Secured</h3>
            <p className="text-sm text-gray-600">In grants for our clients</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Consultation Option */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Consultation Package</h2>
            
            {consultationOptions.map((option) => (
              <div 
                key={option.duration}
                className="relative rounded-lg shadow-lg overflow-hidden transition-all ring-2 ring-blue-600"
              >
                {option.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {option.description}
                  </p>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-bold text-green-600">FREE</span>
                    <span className="text-gray-500 ml-2">consultation</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="w-full py-3 px-6 rounded-lg font-semibold bg-blue-600 text-white text-center">
                    ✓ Your Selected Package
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Information Section */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-600">100% FREE Consultation</h3>
              <div className="text-green-600">
                <CheckCircle className="h-6 w-6 inline-block mr-2" />
                No payment required - completely FREE!
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This consultation is our gift to serious investors looking to explore Italian property opportunities with EU grant financing.
              </p>
            </div>

            {/* What to Expect */}
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  <div>
                    <strong>Start Qualification</strong>
                    <p className="text-sm text-gray-600">Answer quick questions with our AI assistant Trullo</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  <div>
                    <strong>Schedule Your Call</strong>
                    <p className="text-sm text-gray-600">Choose your preferred time after qualification</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  <div>
                    <strong>FREE Expert Consultation</strong>
                    <p className="text-sm text-gray-600">Get personalized advice from our grant experts</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceedToScheduling}
              disabled={isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  Start FREE Consultation Process
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            {/* Security Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              <Shield className="h-3 w-3 inline-block mr-1" />
              Completely FREE - No payment required
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The FREE consultation was invaluable! Giuseppe helped us understand the Mini PIA grant process and we secured €450K for our B&B project."
              </p>
              <p className="font-semibold">Marco R., Switzerland</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Professional, knowledgeable, and completely FREE! The roadmap they provided saved us months of research."
              </p>
              <p className="font-semibold">Sarah L., United Kingdom</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookConsultationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <BookConsultationContent />
    </Suspense>
  );
}