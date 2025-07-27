// PATH: app/privacy/page.tsx
import { Metadata } from 'next'
import Icon from '@/lib/iconMappings'

export const metadata: Metadata = {
  title: 'Privacy Policy | InvestInPuglia - Data Protection & GDPR Compliance',
  description: 'Read our comprehensive privacy policy. Learn how InvestInPuglia protects your personal data, ensures GDPR compliance, and maintains the highest standards of data security.',
  keywords: 'privacy policy, GDPR compliance, data protection, InvestInPuglia privacy, personal data security, Italian privacy law',
  openGraph: {
    title: 'Privacy Policy - InvestInPuglia',
    description: 'Our commitment to protecting your privacy and personal data in compliance with GDPR and Italian data protection laws.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'it_IT',
    siteName: 'InvestInPuglia',
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/privacy'
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-stone-800 mb-2">
                Privacy Policy
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
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">1. Introduction</h2>
                  <p className="text-stone-700 mb-4">
                    Welcome to InvestInPuglia, operated by 1402 Celsius Ltd (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our investment advisory and consultancy services for property and business investments in Puglia, Italy.
                  </p>
                  <div className="bg-stone-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-stone-800 mb-2">Data Controller Information:</h3>
                    <p className="text-stone-700 text-sm">
                      1402 Celsius Ltd<br/>
                      20-22 Wenlock Road<br/>
                      N1 7GU, London<br/>
                      United Kingdom<br/>
                      Registration Number: 124 75013<br/>
                      VAT Number: GB 343 1702 32<br/>
                      Email: privacy@investinpuglia.eu
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">2. Information We Collect</h2>
                  
                  <h3 className="font-semibold text-stone-800 mb-3">2.1 Personal Information</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Full name, email address, and phone number</li>
                    <li>Nationality, residency status, and preferred language</li>
                    <li>Investment preferences, financial capacity, and objectives</li>
                    <li>Business information for corporate clients</li>
                    <li>Communication preferences and consultation history</li>
                    <li>Financial information relevant to investment planning</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">2.2 Investment Information</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Property preferences and investment criteria</li>
                    <li>Business sector interests and investment timeline</li>
                    <li>Budget ranges and financing requirements</li>
                    <li>Risk tolerance and investment experience</li>
                    <li>Documents related to investment projects</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">2.3 Technical Information</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>IP addresses and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Website usage patterns and page interactions</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Analytics data about service usage</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">3. Legal Basis for Processing</h2>
                  <p className="text-stone-700 mb-4">
                    We process your personal data under the following legal bases:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li><strong>Contract Performance:</strong> To provide our advisory and consultancy services</li>
                    <li><strong>Legitimate Interests:</strong> To improve our services and protect our business</li>
                    <li><strong>Legal Obligations:</strong> To comply with anti-money laundering and other regulations</li>
                    <li><strong>Consent:</strong> For marketing communications and certain data processing activities</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">4. How We Use Your Information</h2>
                  
                  <h3 className="font-semibold text-stone-800 mb-3">4.1 Service Delivery</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Provide investment advisory and consultancy services</li>
                    <li>Analyze investment opportunities and prepare recommendations</li>
                    <li>Manage investment projects and business development initiatives</li>
                    <li>Facilitate communications with partners and service providers</li>
                    <li>Process payments and maintain service records</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">4.2 Business Operations</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Improve and personalize our advisory services</li>
                    <li>Conduct market research and investment analysis</li>
                    <li>Ensure security and prevent fraud</li>
                    <li>Maintain client relationships and provide support</li>
                    <li>Send relevant investment opportunities and updates</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">4.3 Compliance and Legal</h3>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Comply with anti-money laundering (AML) requirements</li>
                    <li>Meet know-your-customer (KYC) obligations</li>
                    <li>Respond to legal requests and regulatory inquiries</li>
                    <li>Protect our legal rights and interests</li>
                    <li>Maintain required business records</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">5. Information Sharing</h2>
                  
                  <h3 className="font-semibold text-stone-800 mb-3">5.1 Service Partners</h3>
                  <p className="text-stone-700 mb-4">
                    We may share your information with trusted partners to facilitate investments, including:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Legal professionals and notaries</li>
                    <li>Property developers and real estate agents</li>
                    <li>Financial institutions and lenders</li>
                    <li>Due diligence and valuation experts</li>
                    <li>Italian government agencies as required</li>
                  </ul>

                  <h3 className="font-semibold text-stone-800 mb-3">5.2 Professional Advisors</h3>
                  <p className="text-stone-700 mb-4">
                    We work with professional service providers including accountants, lawyers, and consultants who are bound by confidentiality obligations.
                  </p>

                  <h3 className="font-semibold text-stone-800 mb-3">5.3 Legal Disclosure</h3>
                  <p className="text-stone-700 mb-4">
                    We may disclose information when required by law, court order, or regulatory authority, or to protect our rights and the safety of our clients.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">6. Data Security</h2>
                  <p className="text-stone-700 mb-4">
                    We implement robust security measures to protect your personal and financial information:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>End-to-end encryption for sensitive data transmission</li>
                    <li>Secure data storage with access controls</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Employee training on data protection and confidentiality</li>
                    <li>Incident response procedures for data breaches</li>
                    <li>Physical security for document storage</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">7. Your Rights (GDPR)</h2>
                  <p className="text-stone-700 mb-4">
                    Under the General Data Protection Regulation (GDPR), you have the following rights:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Right to Restriction:</strong> Limit how we process your data</li>
                    <li><strong>Right to Portability:</strong> Receive your data in a structured format</li>
                    <li><strong>Right to Object:</strong> Object to certain types of processing</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                  </ul>
                  <p className="text-stone-700 mb-4">
                    To exercise these rights, contact us at <a href="mailto:privacy@investinpuglia.eu" className="text-terracotta hover:text-terracotta-dark">privacy@investinpuglia.eu</a>
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">8. Cookies and Tracking</h2>
                  <p className="text-stone-700 mb-4">
                    We use cookies and similar technologies to enhance your experience:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
                    <li><strong>Performance Cookies:</strong> Improve website performance</li>
                    <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements</li>
                  </ul>
                  <p className="text-stone-700 mb-4">
                    You can manage cookie preferences through your browser settings. For detailed information, see our <a href="/cookies" className="text-terracotta hover:text-terracotta-dark">Cookie Policy</a>.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">9. Data Retention</h2>
                  <p className="text-stone-700 mb-4">
                    We retain your personal information based on legal and business requirements:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Client records: 10 years after last transaction (legal requirement)</li>
                    <li>Investment documentation: 10 years for tax and regulatory purposes</li>
                    <li>Marketing lists: Until you unsubscribe or 3 years of inactivity</li>
                    <li>Website analytics: 26 months</li>
                    <li>Communication records: 7 years</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">10. International Transfers</h2>
                  <p className="text-stone-700 mb-4">
                    As we operate between the UK and Italy, your data may be transferred internationally. We ensure appropriate safeguards are in place:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Standard Contractual Clauses for transfers outside the EEA</li>
                    <li>Adequacy decisions where applicable</li>
                    <li>Encryption for all data transfers</li>
                    <li>Agreements with processors ensuring GDPR compliance</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">11. Children&apos;s Privacy</h2>
                  <p className="text-stone-700 mb-4">
                    Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will promptly delete the information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">12. Changes to This Policy</h2>
                  <p className="text-stone-700 mb-4">
                    We may update this Privacy Policy periodically. We will notify you of material changes by:
                  </p>
                  <ul className="list-disc list-inside text-stone-700 mb-4 space-y-2">
                    <li>Posting the updated policy on our website</li>
                    <li>Updating the &quot;Last updated&quot; date</li>
                    <li>Sending email notifications for significant changes</li>
                  </ul>
                  <p className="text-stone-700 mb-4">
                    Continued use of our services after changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-4">13. Contact Information</h2>
                  <p className="text-stone-700 mb-4">
                    For privacy-related questions or to exercise your rights, contact us:
                  </p>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <p className="text-stone-700">
                      <strong>Data Protection Officer:</strong><br/>
                      Email: <a href="mailto:privacy@investinpuglia.eu" className="text-terracotta hover:text-terracotta-dark">privacy@investinpuglia.eu</a><br/>
                      Phone: +44 20 7946 0958<br/>
                      Mail: 1402 Celsius Ltd, 20-22 Wenlock Road, N1 7GU, London, UK<br/><br/>
                      <strong>Supervisory Authority:</strong><br/>
                      UK: Information Commissioner&apos;s Office (ICO)<br/>
                      Italy: Garante per la protezione dei dati personali
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




