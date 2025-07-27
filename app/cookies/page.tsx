// PATH: app/cookies/page.tsx
import { Metadata } from 'next'
import Icon from '@/lib/iconMappings'

export const metadata: Metadata = {
  title: 'Cookie Policy | InvestInPuglia',
  description: 'Learn about how InvestInPuglia uses cookies and similar technologies.',
}

// Force dynamic rendering to avoid static generation timeout
export const dynamic = 'force-dynamic'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-8">
            Cookie Policy
          </h1>
          
          <div className="prose prose-stone max-w-none">
            <p className="text-stone-600 mb-6">Last updated: December 1, 2024</p>
            
            <p className="text-stone-700 mb-6">
              This Cookie Policy explains how InvestInPuglia uses cookies and similar tracking technologies on our website.
            </p>

            <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4 mt-8">
              What Are Cookies?
            </h2>
            <p className="text-stone-700 mb-6">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.
            </p>

            <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4 mt-8">
              How We Use Cookies
            </h2>
            <p className="text-stone-700 mb-6">
              We use cookies for essential website functionality, analytics, and to improve your user experience.
            </p>

            <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4 mt-8">
              Managing Cookies
            </h2>
            <p className="text-stone-700 mb-6">
              You can control cookies through your browser settings. Please note that disabling cookies may affect your experience on our website.
            </p>

            <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4 mt-8">
              Contact Us
            </h2>
            <p className="text-stone-700">
              If you have questions about our use of cookies, please contact us at privacy@investinpuglia.eu
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-flex items-center text-terracotta hover:text-terracotta-dark font-medium"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}




