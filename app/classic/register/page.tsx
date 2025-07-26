'use client'

import { useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

export default function ClassicRegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const data = {
      fullName: formData.get('full-name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      experience: formData.get('experience') as string,
      terms: formData.get('terms') === 'on',
      marketing: formData.get('marketing') === 'on'
    }

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.role || !data.terms) {
      setError('Please fill in all required fields and accept the terms.')
      setLoading(false)
      return
    }

    try {
      // Wait for Supabase to be ready
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate access token
      const accessToken = Date.now().toString(36) + Math.random().toString(36).substr(2)
      
      // Store access credentials
      localStorage.setItem('investiscope_access_token', accessToken)
      localStorage.setItem('investiscope_user_email', data.email)
      localStorage.setItem('investiscope_user_data', JSON.stringify({
        ...data,
        access_token: accessToken
      }))
      
      // Show success message
      setSuccess('Registration successful! Redirecting to InvestiScope Classic...')
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/classic')
      }, 2000)
      
    } catch (err) {
      console.error('Registration error:', err)
      setError('Registration failed. Please try again or contact support.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" 
        strategy="beforeInteractive"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-4">
        <div className="registration-container max-w-[500px] w-full bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden">
          <div className="header bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-10 px-8 text-center">
            <div className="text-4xl font-light mb-2">
              InvestiScope<strong className="font-bold">™</strong>
            </div>
            <div className="text-lg opacity-90">Professional Property Analysis</div>
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mt-4">
              CLASSIC VERSION
            </div>
          </div>
          
          <div className="content p-10">
            <div className="value-props mb-8">
              <h3 className="text-xl font-bold mb-5 text-gray-800">Get Access to Advanced Features:</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm">
                    📊
                  </div>
                  <span className="text-gray-700">Advanced financial modeling & scenarios</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm">
                    📈
                  </div>
                  <span className="text-gray-700">Detailed market analysis & comparables</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm">
                    💰
                  </div>
                  <span className="text-gray-700">Comprehensive grant calculations</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm">
                    📄
                  </div>
                  <span className="text-gray-700">Professional PDF reports</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm">
                    🔗
                  </div>
                  <span className="text-gray-700">API integration capabilities</span>
                </div>
              </div>
            </div>
            
            <form id="registration-form" onSubmit={handleRegistration}>
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Full Name *</label>
                  <input 
                    type="text" 
                    name="full-name"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#667eea] focus:outline-none transition-colors" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#667eea] focus:outline-none transition-colors" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#667eea] focus:outline-none transition-colors" 
                    placeholder="+39 XXX XXX XXXX" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Company/Organization</label>
                  <input 
                    type="text" 
                    name="company"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#667eea] focus:outline-none transition-colors" 
                    placeholder="Optional" 
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Your Role *</label>
                  <select 
                    name="role"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#667eea] focus:outline-none transition-colors bg-white cursor-pointer" 
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="investor">Property Investor</option>
                    <option value="developer">Property Developer</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="advisor">Financial Advisor</option>
                    <option value="consultant">Property Consultant</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Investment Experience</label>
                  <select 
                    name="experience"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#667eea] focus:outline-none transition-colors bg-white cursor-pointer"
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">First-time investor</option>
                    <option value="intermediate">1-5 properties</option>
                    <option value="experienced">5+ properties</option>
                    <option value="professional">Professional investor/developer</option>
                  </select>
                </div>
                
                <div className="flex items-start gap-3 mt-5">
                  <input 
                    type="checkbox" 
                    name="terms"
                    id="terms" 
                    className="mt-1 w-4 h-4 cursor-pointer" 
                    required 
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-[#667eea] hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-[#667eea] hover:underline">Privacy Policy</a>. I consent to receive 
                    email communications about property investment opportunities.
                  </label>
                </div>
                
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    name="marketing"
                    id="marketing" 
                    className="mt-1 w-4 h-4 cursor-pointer" 
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    I would like to receive updates about new features, market insights, 
                    and exclusive investment opportunities via email and WhatsApp.
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Get Access to InvestiScope Classic'
                  )}
                </button>
                
                {error && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-100 text-green-700 p-4 rounded-lg text-sm">
                    {success}
                  </div>
                )}
              </div>
            </form>
            
            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-2">
                Want to try our basic version first?
              </p>
              <a 
                href="https://investiscopeeasy.netlify.app/app.html" 
                className="text-[#667eea] hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try InvestiScope Light (Free, No Registration)
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Initialize Supabase after component mounts */}
      <Script id="supabase-init" strategy="afterInteractive">{`
        // Registration Gate System
        class RegistrationGate {
          constructor() {
            this.supabase = window.supabase.createClient(
              'https://kjyobkrjcmiuusijvrme.supabase.co',
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqeW9ia3JqY21pdXVzaWp2cm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDM5NzMsImV4cCI6MjA2NjUxOTk3M30.2GxAUtXPal7ufxg7KgWMO7h15RXJOolBWt0-NPygj2I'
            );
          }
          
          async saveRegistration(formData) {
            try {
              // Generate access token
              const accessToken = Date.now().toString(36) + Math.random().toString(36).substr(2);
              
              // Check if user already exists
              const { data: existingUser } = await this.supabase
                .from('investiscope_users')
                .select('*')
                .eq('email', formData.email)
                .single();
              
              if (existingUser) {
                // Update existing user
                await this.supabase
                  .from('investiscope_users')
                  .update({
                    full_name: formData.fullName,
                    phone: formData.phone,
                    company: formData.company,
                    role: formData.role,
                    experience: formData.experience,
                    marketing_consent: formData.marketing,
                    access_token: accessToken,
                    status: 'active',
                    last_login: new Date().toISOString()
                  })
                  .eq('email', formData.email);
              } else {
                // Create new user
                await this.supabase
                  .from('investiscope_users')
                  .insert([{
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    role: formData.role,
                    experience: formData.experience,
                    marketing_consent: formData.marketing,
                    access_token: accessToken,
                    status: 'active',
                    registration_date: new Date().toISOString(),
                    last_login: new Date().toISOString()
                  }]);
              }
              
              return { success: true, accessToken };
            } catch (error) {
              console.error('Supabase error:', error);
              return { success: false, error };
            }
          }
        }
        
        // Make it available globally
        window.RegistrationGate = RegistrationGate;
      `}</Script>
    </>
  )
}
