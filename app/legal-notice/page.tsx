// PATH: app/legal-notice/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Notice & Disclaimer | InvestInPuglia - Important Legal Information',
  description: 'Read important legal information, disclaimers, and regulatory notices about InvestInPuglia investment advisory services. Understand the legal framework of our services.',
  keywords: 'legal notice, disclaimer, InvestInPuglia legal, investment disclaimer, regulatory information, legal information Italy',
  openGraph: {
    title: 'Legal Notice & Disclaimer - InvestInPuglia',
    description: 'Important legal information and disclaimers about our investment advisory services in Puglia, Italy.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'it_IT',
    siteName: 'InvestInPuglia',
  },
  alternates: {
    canonical: 'https://investinpuglia.com/legal-notice'
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

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                Legal Notice &amp; Disclaimer
              </h1>
              <p className="text-stone-600">
                Last updated: December 1, 2024
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-stone max-w-none">
            
            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">1. Legal Information</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">1.1 Company Details</h3>
              <div className="bg-stone-50 rounded-lg p-4 mb-4">
                <p className="text-stone-700">
                  <strong>Company Name:</strong> 1402 Celsius Ltd trading as InvestInPuglia<br/>
                  <strong>Registered Address:</strong> 20-22 Wenlock Road, N1 7GU, London, United Kingdom<br/>
                  <strong>Company Registration Number:</strong> 124 75013<br/>
                  <strong>VAT Number:</strong> GB 343 1702 32<br/>
                  <strong>Email:</strong> <a href="mailto:info@investinpuglia.com" className="text-terracotta hover:text-terracotta-dark">info@investinpuglia.com</a><br/>
                  <strong>Phone:</strong> +44 20 7946 0958
                </p>
              </div>

              <h3 className="font-semibold text-stone-800 mb-3">1.2 Regulatory Status</h3>
              <p className="text-stone-700 mb-4">
                1402 Celsius Ltd is a registered company in England and Wales. We provide investment consultancy and advisory services. We are not authorized or regulated by the Financial Conduct Authority (FCA) to conduct regulated investment activities. Our services are limited to non-regulated investment advice and consultancy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">2. Website Disclaimer</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">2.1 Information Accuracy</h3>
              <p className="text-stone-700 mb-4">
                While we strive to ensure that the information on this website is accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">2.2 No Professional Advice</h3>
              <p className="text-stone-700 mb-4">
                The information provided on this website is for general informational purposes only and does not constitute professional advice. You should not rely solely on this information for making investment decisions. Always seek independent professional advice tailored to your specific circumstances.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">2.3 External Links</h3>
              <p className="text-stone-700 mb-4">
                This website may contain links to external websites. We have no control over the content and nature of these sites and are not responsible for their content or privacy practices. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">3. Investment Disclaimer</h2>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <h3 className="font-semibold text-red-800 mb-2">Important Investment Warning</h3>
                <p className="text-red-700 text-sm">
                  All investments carry risk. The value of investments can go down as well as up, and you may not get back the amount you originally invested. Past performance is not a reliable indicator of future results.
                </p>
              </div>

              <h3 className="font-semibold text-stone-800 mb-3">3.1 No Investment Advice</h3>
              <p className="text-stone-700 mb-4">
                Nothing on this website constitutes investment, financial, legal, tax, or other professional advice. We do not provide regulated investment services or personalized investment recommendations. Our role is limited to providing general consultancy and facilitating connections with professionals.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">3.2 Risk Acknowledgment</h3>
              <p className="text-stone-700 mb-4">
                By using our services, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Property investments are illiquid and may be difficult to sell</li>
                <li>International investments carry additional risks including currency fluctuation</li>
                <li>Italian property markets may be subject to different regulations and market conditions</li>
                <li>Business investments may result in total loss of capital</li>
                <li>Tax implications vary by jurisdiction and personal circumstances</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">3.3 Due Diligence Responsibility</h3>
              <p className="text-stone-700 mb-4">
                You are solely responsible for conducting your own due diligence on any investment opportunity. This includes obtaining independent legal, financial, tax, and technical advice as appropriate.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">4. Limitation of Liability</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">4.1 General Limitation</h3>
              <p className="text-stone-700 mb-4">
                To the maximum extent permitted by law, we exclude all liability for any direct, indirect, or consequential loss or damage incurred by any user in connection with our website or services, including without limitation:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Loss of profits, sales, business, or revenue</li>
                <li>Business interruption</li>
                <li>Loss of anticipated savings</li>
                <li>Loss of business opportunity, goodwill, or reputation</li>
                <li>Any indirect or consequential loss or damage</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">4.2 Investment Losses</h3>
              <p className="text-stone-700 mb-4">
                We are not liable for any losses arising from investment decisions made based on information provided through our website or services. Investment decisions are made at your own risk.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">4.3 Third-Party Services</h3>
              <p className="text-stone-700 mb-4">
                We are not responsible for the actions, omissions, or insolvency of any third-party professionals or service providers we may introduce you to. Any contractual relationship is directly between you and the third party.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">5. Intellectual Property</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">5.1 Copyright</h3>
              <p className="text-stone-700 mb-4">
                Unless otherwise stated, we own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this material for your personal use subject to restrictions set in these terms.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">5.2 Restrictions</h3>
              <p className="text-stone-700 mb-4">
                You must not:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Republish material from this website without attribution</li>
                <li>Sell, rent, or sub-license material from the website</li>
                <li>Reproduce, duplicate, or copy material for commercial purposes</li>
                <li>Redistribute content unless expressly permitted</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">5.3 Trademarks</h3>
              <p className="text-stone-700 mb-4">
                &quot;InvestInPuglia&quot; and our logo are trademarks of 1402 Celsius Ltd. Unauthorized use of these marks is strictly prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">6. Privacy and Data Protection</h2>
              <p className="text-stone-700 mb-4">
                We are committed to protecting your privacy and complying with applicable data protection laws including the General Data Protection Regulation (GDPR). For detailed information about how we collect, use, and protect your personal data, please refer to our <a href="/privacy" className="text-terracotta hover:text-terracotta-dark">Privacy Policy</a>.
              </p>
              <p className="text-stone-700 mb-4">
                By using this website, you consent to the processing of your personal data as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">7. Jurisdiction and Applicable Law</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">7.1 Governing Law</h3>
              <p className="text-stone-700 mb-4">
                These terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of England and Wales.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">7.2 Jurisdiction</h3>
              <p className="text-stone-700 mb-4">
                The courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these terms or the use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">8. Anti-Money Laundering</h2>
              <p className="text-stone-700 mb-4">
                We are committed to complying with all applicable anti-money laundering (AML) laws and regulations. We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Request proof of identity and source of funds</li>
                <li>Refuse to provide services where AML concerns arise</li>
                <li>Report suspicious activities to relevant authorities</li>
                <li>Terminate relationships where legal obligations require</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">9. Complaints Procedure</h2>
              <p className="text-stone-700 mb-4">
                If you have a complaint about our services, please contact us in writing at:
              </p>
              <div className="bg-stone-50 rounded-lg p-4 mb-4">
                <p className="text-stone-700">
                  <strong>Email:</strong> <a href="mailto:complaints@investinpuglia.com" className="text-terracotta hover:text-terracotta-dark">complaints@investinpuglia.com</a><br/>
                  <strong>Mail:</strong> Complaints Department, 1402 Celsius Ltd, 20-22 Wenlock Road, N1 7GU, London, UK
                </p>
              </div>
              <p className="text-stone-700 mb-4">
                We will acknowledge your complaint within 5 business days and aim to provide a full response within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">10. Changes to Legal Notice</h2>
              <p className="text-stone-700 mb-4">
                We reserve the right to update this legal notice at any time. Changes will be posted on this page with an updated revision date. We encourage you to review this page periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">11. Contact Information</h2>
              <p className="text-stone-700 mb-4">
                For any questions regarding this legal notice or our services:
              </p>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-stone-700">
                  <strong>General Inquiries:</strong> <a href="mailto:info@investinpuglia.com" className="text-terracotta hover:text-terracotta-dark">info@investinpuglia.com</a><br/>
                  <strong>Legal Department:</strong> <a href="mailto:legal@investinpuglia.com" className="text-terracotta hover:text-terracotta-dark">legal@investinpuglia.com</a><br/>
                  <strong>Phone:</strong> +44 20 7946 0958<br/>
                  <strong>Business Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM GMT
                </p>
              </div>
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

