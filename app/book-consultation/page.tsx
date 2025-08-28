'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Clock, Euro, Calendar, CheckCircle, ArrowRight, Shield, Star, Users, Tag, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function BookConsultationPage() {
  const searchParams = useSearchParams();
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const source = searchParams.get('source') || 'website';
  const campaign = searchParams.get('campaign') || 'direct';

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
        'Property investment evaluation',
        'Detailed Mini PIA application strategy',
        'ROI projections and timeline',
        'Personalized action plan',
        'Follow-up email summary'
      ],
      stripeUrl: process.env.NEXT_PUBLIC_STRIPE_CONSULTATION_60_URL || 'https://buy.stripe.com/bJe3cxcgId8c0zs9kS08g08',
      calendlyUrl: 'https://calendly.com/investinpuglia/60min'
    }
  ];

  const selectedOption = consultationOptions.find(opt => opt.duration === selectedDuration);

  // Apply coupon discount
  const getDiscountedPrice = (originalPrice: number) => {
    if (couponApplied && couponCode === 'MINIPIA50') {
      return originalPrice * 0.5; // 50% off
    }
    return originalPrice;
  };

  const applyCoupon = () => {
    setCouponError('');
    
    if (couponCode.toUpperCase() === 'MINIPIA50') {
      setCouponApplied(true);
      setCouponCode('MINIPIA50');
    } else if (couponCode) {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponApplied(false);
    setCouponError('');
  };

  const handleBooking = async () => {
    if (!selectedOption) return;
    
    setIsProcessing(true);
    
    // If Stripe payment links are configured, use them
    if (selectedOption.stripeUrl && !selectedOption.stripeUrl.includes('your-')) {
      // Use pre-configured payment link
      const successUrl = `${window.location.origin}/consultation-success?duration=${selectedDuration}&calendly=${encodeURIComponent(selectedOption.calendlyUrl)}`;
      const cancelUrl = `${window.location.origin}/book-consultation`;
      
      const stripeUrl = new URL(selectedOption.stripeUrl);
      stripeUrl.searchParams.set('success_url', successUrl);
      stripeUrl.searchParams.set('cancel_url', cancelUrl);
      stripeUrl.searchParams.set('client_reference_id', `consultation_${selectedDuration}_${Date.now()}`);
      
      window.location.href = stripeUrl.toString();
    } else {
      // Use API to create Stripe checkout session
      try {
        const response = await fetch('/api/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            duration: selectedDuration,
            couponCode: couponApplied ? couponCode : null
          })
        });
        
        const data = await response.json();
        
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          alert('Error creating checkout session. Please try again.');
          setIsProcessing(false);
        }
      } catch (error) {
        console.error('Checkout error:', error);
        alert('Error processing payment. Please try again.');
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to InvestInPuglia
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-6 py-3 inline-flex items-center gap-2 mb-6 animate-pulse">
            <Tag className="h-5 w-5" />
            <span className="font-bold">LIMITED OFFER: First 50 bookings get 50% OFF with code MINIPIA50</span>
            <Tag className="h-5 w-5" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Professional Consultation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get expert guidance from Giuseppe Funaro - 30+ years of EU grant expertise
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-700">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">€50M+ Grants Secured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Options */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {consultationOptions.map((option) => (
              <div
                key={option.duration}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${
                  selectedDuration === option.duration 
                    ? 'ring-4 ring-blue-600 transform scale-105' 
                    : 'hover:shadow-xl'
                }`}
              >
                {option.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    MOST POPULAR
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-green-600" />
                Have a promo code?
              </h3>
              
              {!couponApplied ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g., MINIPIA50)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-semibold">
                        50% OFF Applied - You save €{selectedOption?.price ? selectedOption.price / 2 : 30}!
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 hover:text-red-800 text-sm underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              
              {couponError && (
                <div className="mt-2 text-red-600 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {couponError}
                </div>
              )}
              
              {!couponApplied && !couponError && (
                <p className="mt-2 text-sm text-gray-600">
                  💡 Try <strong>MINIPIA50</strong> for 50% off (first 50 bookings only!)
                </p>
              )}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Euro className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Investment Returns 100x
                </h3>
                <p className="mt-1 text-gray-700">
                  Most clients save €10,000+ through proper grant applications. Our consultation fee is less than 1% 
                  of the average grant amount secured (€200,000+). This small investment in expert guidance can save 
                  you months of time and thousands in missed opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Urgency Notice */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Mini PIA Ends in 2027 - First Come, First Served
                </h3>
                <p className="mt-1 text-gray-700">
                  Limited funds remaining. Each month of delay means more competition for fewer grants. 
                  Book your consultation now to secure your place in the queue.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleBooking}
              disabled={isProcessing}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="ml-3 h-5 w-5" />
                </>
              )}
            </button>
            
            <p className="mt-4 text-sm text-gray-600">
              You'll be redirected to secure payment, then to Calendly for scheduling
            </p>
          </div>

          {/* Trust & Security */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Payments processed securely via Stripe • 256-bit SSL encryption • No credit card info stored
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}