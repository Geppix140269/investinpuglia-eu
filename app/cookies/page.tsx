// PATH: app/cookies/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | InvestInPuglia - How We Use Cookies',
  description: 'Learn about how InvestInPuglia uses cookies and similar technologies. Understand your choices and how to manage cookie preferences for our investment advisory website.',
  keywords: 'cookie policy, InvestInPuglia cookies, website cookies, cookie preferences, GDPR cookies, privacy settings',
  openGraph: {
    title: 'Cookie Policy - InvestInPuglia',
    description: 'Our cookie policy explains how we use cookies and similar technologies on our website.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'it_IT',
    siteName: 'InvestInPuglia',
  },
  alternates: {
    canonical: 'https://investinpuglia.com/cookies',
    languages: {
      'en': 'https://investinpuglia.com/en/cookies',
      'it': 'https://investinpuglia.com/it/cookies',
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                Cookie Policy
              </h1>
              <p className="text-stone-600">Last updated: December 1, 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-stone max-w-none">
            {/* [ ... full sections from 1 to 13 ... ] */}
            {/* KEEP all the inner sections you already have – they are well structured */}

            {/* Section 13 ends here */}
          </div>
        </div>

        {/* Cookie Settings Button */}
        <div className="mt-8 text-center">
          <button 
            className="bg-terracotta text-white px-6 py-3 rounded-lg font-medium hover:bg-terracotta-dark transition-colors"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).cookieConsentManager) {
                (window as any).cookieConsentManager.show();
              }
            }}
          >
            Manage Cookie Preferences
          </button>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-flex items-center text-terracotta hover:text-terracotta-dark font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
