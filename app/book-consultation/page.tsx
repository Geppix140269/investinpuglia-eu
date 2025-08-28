'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Clock, Euro, Calendar, CheckCircle, ArrowRight, Shield, Star, Users, Tag, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function BookConsultationContent() {
  const searchParams = useSearchParams();
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const source = searchParams?.get('source') || 'website';
  const campaign = searchParams?.get('campaign') || 'direct';

  // Check for coupon in URL params on mount
  useEffect(() => {
    const urlCoupon = searchParams?.get('coupon');
    if (urlCoupon && urlCoupon.toUpperCase() === 'MINIPIA50') {
      setCouponCode('MINIPIA50');
      setCouponApplied(true);
    }
  }, [searchParams]);

  const consultationOptions = [
    {
      duration: '30',
      price: 60,
      title: '30-Minute Consultation',
      description: 'Perfect for initial assessment and grant eligibility check',
      popular: false,
      features: [
        'Grant eligibility assessment',
        'Investment strategy overview',
        'Q&A session',
        'Next steps roadmap'
      ],
      stripeUrl: process.env.NEXT_PUBLIC_STRIPE_CONSULTATION_30_URL || 'https://buy.stripe.com/bJe9AV0y03xCbe6cx408g07',
      calendlyUrl: 'https://calendly.com/investinpuglia/30min'
    },
    {
      duration: '60',
      price: 100,
      title: '1-Hour Deep Dive',
      description: 'Comprehensive consultation with detailed grant analysis',
      popular: true,
      features: [
        'Complete grant eligibility analysis',
        'Property investment opportunities',
        'Detailed Mini PIA grant strategy',
        'Personalized investment roadmap',
        'Follow-up email with resources'
      ],
      stripeUrl: process.env.NEXT_PUBLIC_STRIPE_CONSULTATION_60_URL || 'https://buy.stripe.com/bJedRb2GigAgci6afaoi',
      calendlyUrl: 'https://calendly.com/investinpuglia/60min'
    }
  ];

  const getDiscountedPrice = (originalPrice: number) => {
    return couponApplied ? 0 : originalPrice; // MINIPIA50 = FREE consultation
  };

  const applyCoupon = () => {
    setCouponError('');
    
    if (couponCode.toUpperCase() === 'MINIPIA50') {
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'WELCOME20') {
      setCouponError('This coupon code has expired. Try MINIPIA50 for a FREE consultation!');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  const handleProceedToPayment = () => {
    setIsProcessing(true);
    const selectedOption = consultationOptions.find(opt => opt.duration === selectedDuration);
    
    if (!selectedOption) return;

    if (couponApplied && couponCode.toUpperCase() === 'MINIPIA50') {
      // FREE consultation - skip payment, go directly to Calendly
      const calendlyUrl = `${selectedOption.calendlyUrl}?name=${encodeURIComponent('')}&email=${encodeURIComponent('')}`;
      
      // Redirect to success page which will then redirect to Calendly
      window.location.href = `/consultation-success?duration=${selectedDuration}&calendly=${encodeURIComponent(calendlyUrl)}&coupon=MINIPIA50`;
    } else {
      // Regular payment flow through Stripe
      const checkoutUrl = new URL(selectedOption.stripeUrl);
      
      // Add metadata to Stripe checkout
      checkoutUrl.searchParams.append('client_reference_id', `consultation_${selectedDuration}`);
      checkoutUrl.searchParams.append('prefilled_email', '');
      
      // Add UTM parameters for tracking
      if (source) checkoutUrl.searchParams.append('utm_source', source);
      if (campaign) checkoutUrl.searchParams.append('utm_campaign', campaign);
      
      window.location.href = checkoutUrl.toString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Expert Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance on accessing EU grants for your Italian property investment. 
            Our experts have secured over €50M in grants for international investors.
          </p>
        </div>

        {/* Special Offer Banner */}
        {couponApplied && (
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold">Special Offer Applied!</h3>
                    <p>Code MINIPIA50: Your consultation is completely FREE!</p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-white hover:text-gray-200 underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

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
          {/* Consultation Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Consultation</h2>
            
            {consultationOptions.map((option) => (
              <div 
                key={option.duration}
                className={`relative rounded-lg shadow-lg overflow-hidden transition-all ${
                  selectedDuration === option.duration ? 'ring-2 ring-blue-600' : ''
                }`}
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
                    {couponApplied ? (
                      <>
                        <span className="text-3xl text-gray-400 line-through mr-2">€{option.price}</span>
                        <span className="text-5xl font-bold text-green-600">€{getDiscountedPrice(option.price)}</span>
                        <span className="text-gray-500 ml-2">/ session</span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-gray-900">€{option.price}</span>
                        <span className="text-gray-500 ml-2">/ session</span>
                      </>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedDuration(option.duration)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      selectedDuration === option.duration
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedDuration === option.duration ? 'Selected' : 'Select This Option'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code Input */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Have a Coupon Code?</h3>
              {!couponApplied ? (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code (e.g., MINIPIA50)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <div className="mt-2 flex items-start text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1 mt-0.5" />
                      <span>{couponError}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tip: Email subscribers get FREE consultations with code MINIPIA50
                  </p>
                </div>
              ) : (
                <div className="text-green-600">
                  <CheckCircle className="h-6 w-6 inline-block mr-2" />
                  Coupon applied successfully!
                </div>
              )}
            </div>

            {/* What to Expect */}
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  <div>
                    <strong>Complete Booking</strong>
                    <p className="text-sm text-gray-600">{couponApplied ? 'Skip payment with your FREE coupon' : 'Secure payment via Stripe'}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  <div>
                    <strong>Schedule Your Call</strong>
                    <p className="text-sm text-gray-600">Choose your preferred time via Calendly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  <div>
                    <strong>Expert Consultation</strong>
                    <p className="text-sm text-gray-600">Get personalized advice from our grant experts</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceedToPayment}
              disabled={isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  {couponApplied ? 'Book FREE Consultation' : `Proceed to Payment (€${consultationOptions.find(opt => opt.duration === selectedDuration)?.price || 0})`}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            {/* Security Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              <Shield className="h-3 w-3 inline-block mr-1" />
              Secure payment processing by Stripe
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
                "The consultation was invaluable! Giuseppe helped us understand the Mini PIA grant process and we secured €450K for our B&B project."
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
                "Professional, knowledgeable, and worth every minute. The roadmap they provided saved us months of research."
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