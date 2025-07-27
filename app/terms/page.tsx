// PATH: app/terms/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | InvestInPuglia - Investment Advisory Agreement',
  description: 'Read our terms of service for investment advisory and consultancy services in Puglia, Italy. Clear terms for property investment and business development services.',
  keywords: 'terms of service, investment advisory terms, consultancy agreement, InvestInPuglia terms, service agreement Italy',
  openGraph: {
    title: 'Terms of Service - InvestInPuglia',
    description: 'Terms and conditions for our investment advisory and consultancy services in Puglia, Italy.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'it_IT',
    siteName: 'InvestInPuglia',
  },
  alternates: {
    canonical: 'https://investinpuglia.com/terms',
    languages: {
      'en': 'https://investinpuglia.com/en/terms',
      'it': 'https://investinpuglia.com/it/terms',
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

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                Terms of Service
              </h1>
              <p className="text-stone-600">
                Effective Date: December 1, 2024
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-stone max-w-none">
            
            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">1. Agreement to Terms</h2>
              <p className="text-stone-700 mb-4">
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and 1402 Celsius Ltd (&quot;InvestInPuglia&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) governing your use of our investment advisory and consultancy services for property and business investments in Puglia, Italy.
              </p>
              <div className="bg-stone-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-stone-800 mb-2">Service Provider Information:</h3>
                <p className="text-stone-700 text-sm">
                  1402 Celsius Ltd trading as InvestInPuglia<br/>
                  20-22 Wenlock Road<br/>
                  N1 7GU, London<br/>
                  United Kingdom<br/>
                  Company Registration: 124 75013<br/>
                  VAT Number: GB 343 1702 32
                </p>
              </div>
              <p className="text-stone-700 mb-4">
                By engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">2. Services Description</h2>
              <p className="text-stone-700 mb-4">
                InvestInPuglia provides professional investment advisory and consultancy services including:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Property investment advisory and market analysis</li>
                <li>Business development consultancy and project management</li>
                <li>Investment opportunity identification and due diligence</li>
                <li>Strategic planning for market entry and expansion</li>
                <li>Coordination with local professionals and authorities</li>
                <li>Transaction support and negotiation assistance</li>
                <li>Post-investment management and oversight</li>
              </ul>
              <p className="text-stone-700 mb-4">
                Our services are advisory in nature. We do not provide legal, tax, or financial advice. Clients should consult appropriate professionals for such specialized advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">3. Client Engagement</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">3.1 Eligibility</h3>
              <p className="text-stone-700 mb-4">
                Our services are available to individuals aged 18 or older and entities legally capable of entering binding contracts. By engaging our services, you represent that you meet these eligibility requirements.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">3.2 Client Information</h3>
              <p className="text-stone-700 mb-4">
                You agree to provide accurate, complete, and current information necessary for us to provide our services. This includes:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Identity verification documents</li>
                <li>Financial capacity information</li>
                <li>Investment objectives and preferences</li>
                <li>Any material information affecting investment decisions</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">3.3 Know Your Customer (KYC)</h3>
              <p className="text-stone-700 mb-4">
                We are required to conduct KYC procedures in compliance with anti-money laundering regulations. You agree to cooperate fully with these requirements and provide requested documentation promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">4. Service Delivery</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">4.1 Scope of Services</h3>
              <p className="text-stone-700 mb-4">
                The specific services to be provided will be outlined in a separate engagement letter or service agreement. Services may include:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Initial consultation and needs assessment</li>
                <li>Market research and opportunity analysis</li>
                <li>Property or business evaluation</li>
                <li>Investment strategy development</li>
                <li>Implementation support and coordination</li>
                <li>Ongoing advisory and monitoring</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">4.2 Service Standards</h3>
              <p className="text-stone-700 mb-4">
                We commit to providing services with professional competence and due care. However, we do not guarantee investment outcomes or returns. All investments carry risk, and past performance does not guarantee future results.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">4.3 Client Responsibilities</h3>
              <p className="text-stone-700 mb-4">
                Successful engagement requires your active participation. You agree to:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Respond promptly to information requests</li>
                <li>Make timely decisions when required</li>
                <li>Provide accurate and complete information</li>
                <li>Review and approve recommendations before implementation</li>
                <li>Notify us of any changes to your circumstances</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">5. Fees and Payment</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">5.1 Fee Structure</h3>
              <p className="text-stone-700 mb-4">
                Our fees are structured based on the services provided:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li><strong>Hourly Consultancy:</strong> €250-500 per hour depending on complexity</li>
                <li><strong>Project-Based Fees:</strong> Fixed fees for defined projects</li>
                <li><strong>Success Fees:</strong> Performance-based fees for completed transactions</li>
                <li><strong>Retainer Services:</strong> Monthly retainers for ongoing advisory</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">5.2 Payment Terms</h3>
              <p className="text-stone-700 mb-4">
                Unless otherwise agreed in writing:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Initial consultation fees are due upon booking</li>
                <li>Project fees require 50% advance payment</li>
                <li>Success fees are due upon transaction completion</li>
                <li>All fees are exclusive of VAT where applicable</li>
                <li>Payment is due within 14 days of invoice</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">5.3 Expenses</h3>
              <p className="text-stone-700 mb-4">
                Client is responsible for all third-party expenses incurred on their behalf, including travel, due diligence reports, legal fees, and government charges. Such expenses will be communicated and approved in advance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">6. Confidentiality</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">6.1 Confidential Information</h3>
              <p className="text-stone-700 mb-4">
                We maintain strict confidentiality regarding all client information, investment strategies, and business plans. We will not disclose confidential information except:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>With your explicit written consent</li>
                <li>As required by law or regulation</li>
                <li>To professional advisors bound by confidentiality</li>
                <li>To protect our legal rights</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">6.2 Data Protection</h3>
              <p className="text-stone-700 mb-4">
                We handle personal data in accordance with GDPR and our Privacy Policy. You have rights regarding your personal data as outlined in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">7. Intellectual Property</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">7.1 Our Intellectual Property</h3>
              <p className="text-stone-700 mb-4">
                All reports, analyses, strategies, and other materials we create remain our intellectual property unless explicitly transferred in writing. You receive a license to use these materials for the intended purpose only.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">7.2 Client Information</h3>
              <p className="text-stone-700 mb-4">
                You retain ownership of all information you provide to us. You grant us a license to use this information solely for providing our services to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">8. Disclaimers and Risk Acknowledgment</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">8.1 Investment Risks</h3>
              <p className="text-stone-700 mb-4">
                You acknowledge and accept that:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>All investments carry inherent risks</li>
                <li>Property values can decrease as well as increase</li>
                <li>Past performance does not indicate future results</li>
                <li>Currency fluctuations may affect international investments</li>
                <li>Regulatory changes may impact investment returns</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">8.2 No Guarantees</h3>
              <p className="text-stone-700 mb-4">
                We do not guarantee any specific investment outcomes, returns, or success. Our role is to provide professional advice based on available information and our expertise.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">8.3 Independent Advice</h3>
              <p className="text-stone-700 mb-4">
                We strongly recommend obtaining independent legal, tax, and financial advice before making investment decisions. Our services do not replace the need for such specialized professional advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">9. Limitation of Liability</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">9.1 Liability Cap</h3>
              <p className="text-stone-700 mb-4">
                Our total liability for any claim arising from our services shall not exceed the fees paid by you for the specific service giving rise to the claim in the 12 months preceding the event.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">9.2 Exclusions</h3>
              <p className="text-stone-700 mb-4">
                We shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Indirect, consequential, or punitive damages</li>
                <li>Loss of profits or anticipated savings</li>
                <li>Damages arising from your investment decisions</li>
                <li>Third-party actions or omissions</li>
                <li>Force majeure events</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">9.3 Indemnification</h3>
              <p className="text-stone-700 mb-4">
                You agree to indemnify us against any claims arising from your breach of these Terms, provision of false information, or illegal activities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">10. Termination</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">10.1 Termination by Either Party</h3>
              <p className="text-stone-700 mb-4">
                Either party may terminate the engagement with 30 days written notice. Fees for work completed or committed remain payable.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">10.2 Immediate Termination</h3>
              <p className="text-stone-700 mb-4">
                We may terminate immediately if you:
              </p>
              <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                <li>Breach these Terms materially</li>
                <li>Provide false or misleading information</li>
                <li>Fail to pay fees when due</li>
                <li>Engage in illegal activities</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mb-3">10.3 Effect of Termination</h3>
              <p className="text-stone-700 mb-4">
                Upon termination, confidentiality obligations and any accrued rights survive. We will provide reasonable transition assistance at our standard rates.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">11. Governing Law and Disputes</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">11.1 Governing Law</h3>
              <p className="text-stone-700 mb-4">
                These Terms are governed by the laws of England and Wales. The courts of England have exclusive jurisdiction over any disputes.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">11.2 Dispute Resolution</h3>
              <p className="text-stone-700 mb-4">
                Before commencing legal proceedings, parties agree to attempt good faith negotiation. If unsuccessful, disputes will be resolved through the courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">12. General Provisions</h2>
              
              <h3 className="font-semibold text-stone-800 mb-3">12.1 Entire Agreement</h3>
              <p className="text-stone-700 mb-4">
                These Terms, together with any engagement letter, constitute the entire agreement between us regarding our services.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">12.2 Amendments</h3>
              <p className="text-stone-700 mb-4">
                We may update these Terms periodically. Material changes will be communicated to active clients. Continued use of services after changes constitutes acceptance.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">12.3 Severability</h3>
              <p className="text-stone-700 mb-4">
                If any provision is found invalid, the remaining provisions continue in full force.
              </p>

              <h3 className="font-semibold text-stone-800 mb-3">12.4 Non-Waiver</h3>
              <p className="text-stone-700 mb-4">
                Failure to enforce any right does not constitute waiver of that right.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">13. Contact Information</h2>
              <p className="text-stone-700 mb-4">
                For questions about these Terms or our services:
              </p>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-stone-700">
                  <strong>Email:</strong> <a href="mailto:legal@investinpuglia.com" className="text-terracotta hover:text-terracotta-dark">legal@investinpuglia.com</a><br/>
                  <strong>Phone:</strong> +44 20 7946 0958<br/>
                  <strong>Mail:</strong> 1402 Celsius Ltd, 20-22 Wenlock Road, N1 7GU, London, United Kingdom<br/>
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
