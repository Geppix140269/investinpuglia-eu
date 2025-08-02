// Path: app/register-professional/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function RegisterProfessionalContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    description: '',
    specialties: '',
    languages: 'English',
    type: 'lawyer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');

  useEffect(() => {
    if (token) {
      // Fetch registration data
      fetchRegistrationData(token);
    }
  }, [token]);

  const fetchRegistrationData = async (token: string) => {
    try {
      const response = await fetch(`/api/professional-registration?token=${token}`);
      const data = await response.json();
      
      if (data.registration) {
        setRegistrationData(data.registration);
        setFormData(prev => ({
          ...prev,
          email: data.registration.email || '',
          name: data.registration.name || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching registration:', error);
      // If the API fails, at least allow manual entry
      setRegistrationData(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, complete the registration
      const response = await fetch('/api/professional-registration/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...formData,
          subscription_type: selectedPlan
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (selectedPlan === 'premium') {
        // Redirect to Stripe checkout
        const checkoutResponse = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            professionalId: data.professionalId,
            email: formData.email,
            name: formData.name,
            registrationToken: token
          })
        });

        const checkoutData = await checkoutResponse.json();

        if (checkoutData.url) {
          // Redirect to Stripe
          window.location.href = checkoutData.url;
        } else {
          // Use Stripe.js for embedded checkout
          const stripe = await stripePromise;
          if (stripe && checkoutData.sessionId) {
            const { error } = await stripe.redirectToCheckout({
              sessionId: checkoutData.sessionId
            });
            if (error) {
              throw error;
            }
          }
        }
      } else {
        // Free plan - show success
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Registration Link</h2>
          <p className="text-gray-600">
            This registration link is invalid or has expired. Please request a new invitation.
          </p>
        </div>
      </div>
    );
  }

  if (success && selectedPlan === 'free') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Complete!</h2>
          <p className="text-gray-600">
            Welcome to the InvestInPuglia Professional Directory. Your free listing is now active.
          </p>
          <a 
            href="/professionals" 
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            View Directory
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Complete Your Professional Registration
          </h1>
          <p className="text-gray-600 mb-8">
            Join the InvestInPuglia Professional Directory and connect with international investors
          </p>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div 
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                selectedPlan === 'free' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan('free')}
            >
              <h3 className="text-xl font-bold mb-2">Free Listing</h3>
              <p className="text-3xl font-bold mb-4">€0<span className="text-sm font-normal">/month</span></p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic profile listing
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Contact information
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2">✗</span>
                  Priority placement
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2">✗</span>
                  Analytics dashboard
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2">✗</span>
                  Direct lead notifications
                </li>
              </ul>
            </div>

            <div 
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all relative ${
                selectedPlan === 'premium' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan('premium')}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Listing</h3>
              <p className="text-3xl font-bold mb-4">€39<span className="text-sm font-normal">/month</span></p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Free
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority placement
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Analytics dashboard
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Direct lead notifications
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Enhanced profile features
                </li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  readOnly={!!registrationData && !!formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    registrationData && formData.email ? 'bg-gray-50' : ''
                  }`}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+39 123 456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://... (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="lawyer">Lawyer</option>
                  <option value="accountant">Accountant</option>
                  <option value="architect">Architect</option>
                  <option value="engineer">Engineer</option>
                  <option value="real_estate_agent">Real Estate Agent</option>
                  <option value="notary">Notary</option>
                  <option value="consultant">Business Consultant</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="City, Province"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({...formData, languages: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="English, Italian, ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties
                </label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Real estate, Immigration, ..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Tell potential clients about your services and experience..."
              />
            </div>

            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  selectedPlan === 'premium'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50`}
              >
                {loading ? 'Processing...' : (
                  selectedPlan === 'premium' 
                    ? 'Complete Registration & Pay €39/month' 
                    : 'Complete Free Registration'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            By registering, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterProfessionalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterProfessionalContent />
    </Suspense>
  );
}
