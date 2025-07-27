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
          <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
            Cookie Policy
          </h1>
          <p className="text-stone-600">
            Last updated: December 1, 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-stone max-w-none">
            
            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">1. Introduction</h2>
              <p className="text-stone-700 mb-4">
                This Cookie Policy explains how InvestInPuglia (operated by 1402 Celsius Ltd) uses cookies and similar tracking technologies on our website. This policy provides detailed information about why we use cookies, the types of cookies we use, and how you can control them.
              </p>
              <p className="text-stone-700 mb-4">
                By using our website, you consent to the use of cookies in accordance with this policy. If you do not agree to our use of cookies, you can disable them through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">2. What Are Cookies?</h2>
              <p className="text-stone-700 mb-4">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They help the website remember your actions and preferences over time, improving your browsing experience.
              </p>
              <p className="text-stone-700 mb-4">
                Cookies may be set by the website you are visiting (first-party cookies) or by third parties, such as analytics providers or advertising networks (third-party cookies).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">3.1 Essential Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>session_id:</strong> Maintains user session (Session)</li>
                <li><strong>security_token:</strong> CSRF protection (Session)</li>
                <li><strong>cookie_consent:</strong> Stores cookie preferences (1 year)</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">3.2 Analytics Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>_ga (Google Analytics):</strong> Distinguishes users (2 years)</li>
                <li><strong>_gid (Google Analytics):</strong> Distinguishes users (24 hours)</li>
                <li><strong>_gat (Google Analytics):</strong> Throttles request rate (1 minute)</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">3.3 Functional Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering your language preference or region.
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>language_preference:</strong> Stores language choice (1 year)</li>
                <li><strong>timezone:</strong> Stores timezone preference (1 year)</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">3.4 Marketing Cookies</h3>
              <p className="text-stone-700 mb-4">
                These cookies track your online activity to help advertisers deliver more relevant advertising or limit how many times you see an ad.
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>_fbp (Facebook):</strong> Advertising targeting (3 months)</li>
                <li><strong>_gcl_au (Google Ads):</strong> Conversion tracking (3 months)</li>
                <li><strong>li_sugr (LinkedIn):</strong> User identification (3 months)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">4. How We Use Cookies</h2>
              <p className="text-stone-700 mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Authentication:</strong> To identify you when you visit our website and as you navigate our pages</li>
                <li><strong>Security:</strong> To support security measures and help detect malicious activity</li>
                <li><strong>Preferences:</strong> To remember information about your preferences and settings</li>
                <li><strong>Analytics:</strong> To help us understand how our website is being used and improve user experience</li>
                <li><strong>Marketing:</strong> To deliver relevant advertisements and measure their effectiveness</li>
                <li><strong>Performance:</strong> To monitor website performance and optimize loading times</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">5. Third-Party Cookies</h2>
              <p className="text-stone-700 mb-4">
                Some cookies on our website are placed by third-party services that appear on our pages. We do not control these cookies, and you should refer to the third party&apos;s privacy policy for more information.
              </p>
              <p className="text-stone-700 mb-4">
                Third parties we work with include:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics - <a href="https://policies.google.com/privacy" className="text-terracotta hover:text-terracotta-dark">Privacy Policy</a></li>
                <li><strong>Facebook Pixel:</strong> For advertising - <a href="https://www.facebook.com/privacy/explanation" className="text-terracotta hover:text-terracotta-dark">Privacy Policy</a></li>
                <li><strong>LinkedIn Insight:</strong> For B2B marketing - <a href="https://www.linkedin.com/legal/privacy-policy" className="text-terracotta hover:text-terracotta-dark">Privacy Policy</a></li>
                <li><strong>YouTube:</strong> For embedded videos - <a href="https://policies.google.com/privacy" className="text-terracotta hover:text-terracotta-dark">Privacy Policy</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">6. Managing Cookies</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">6.1 Browser Settings</h3>
              <p className="text-stone-700 mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>View what cookies are stored on your device</li>
                <li>Delete some or all cookies</li>
                <li>Block all cookies or specific types</li>
                <li>Set preferences for specific websites</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">6.2 Browser Instructions</h3>
              <p className="text-stone-700 mb-4">
                For information on managing cookies in popular browsers:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-terracotta hover:text-terracotta-dark">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-terracotta hover:text-terracotta-dark">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-terracotta hover:text-terracotta-dark">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/4027947" className="text-terracotta hover:text-terracotta-dark">Microsoft Edge</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">7. Impact of Disabling Cookies</h2>
              <p className="text-stone-700 mb-4">
                Please note that disabling cookies may impact your experience on our website:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Essential cookies:</strong> Cannot be disabled as they are necessary for the website to function</li>
                <li><strong>Functional cookies:</strong> Disabling may result in loss of personalization features</li>
                <li><strong>Analytics cookies:</strong> We won&apos;t be able to improve our services based on usage data</li>
                <li><strong>Marketing cookies:</strong> You may still see ads, but they won&apos;t be personalized</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">8. Changes to This Policy</h2>
              <p className="text-stone-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Updating the &quot;Last updated&quot; date at the top of this policy</li>
                <li>Displaying a notice on our website</li>
                <li>Requesting fresh consent where required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">9. Contact Us</h2>
              <p className="text-stone-700 mb-4">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-stone-700">
                  <strong>Email:</strong> <a href="mailto:privacy@investinpuglia.com" className="text-terracotta hover:text-terracotta-dark">privacy@investinpuglia.com</a><br/>
                  <strong>Phone:</strong> +44 20 7946 0958<br/>
                  <strong>Mail:</strong> 1402 Celsius Ltd, 20-22 Wenlock Road, N1 7GU, London, United Kingdom<br/>
                  <strong>Data Protection Officer:</strong> <a href="mailto:dpo@investinpuglia.com" className="text-terracotta hover:text-terracotta-dark">dpo@investinpuglia.com</a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">10. More Information About Cookies</h2>
              <p className="text-stone-700 mb-4">
                For more general information about cookies and how to manage them:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><a href="https://www.allaboutcookies.org" className="text-terracotta hover:text-terracotta-dark">All About Cookies</a> - Independent information about cookies</li>
                <li><a href="https://www.youronlinechoices.com" className="text-terracotta hover:text-terracotta-dark">Your Online Choices</a> - Control online behavioral advertising</li>
                <li><a href="https://ico.org.uk/for-the-public/online/cookies/" className="text-terracotta hover:text-terracotta-dark">ICO Guide</a> - UK Information Commissioner&apos;s Office guidance</li>
              </ul>
            </section>
              
          </div>
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
