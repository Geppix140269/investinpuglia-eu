import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, TrendingUp, Euro, Calendar, FileCheck, Users, Award, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'EU Grants 2024: Complete €2.25M Funding Guide for Puglia Tourism | InvestInPuglia',
  description: 'Unlock 35-50% non-repayable EU grants up to €2.25M for Puglia tourism investments. Complete 2024 guide with eligibility, application process, and success strategies.',
  keywords: 'EU grants Italy 2024, Puglia tourism grants, EU funding Italy, PNRR grants, tourism investment grants, non-repayable grants Italy, EU subsidies tourism, Italian grants 2024',
  openGraph: {
    title: 'EU Grants 2024: Get €2.25M for Puglia Tourism Investment',
    description: 'Complete guide to securing 35-50% non-repayable EU grants for tourism projects in Puglia.',
    url: 'https://investinpuglia.eu/blog/eu-grants-2024-guide',
    type: 'article',
    images: [{
      url: 'https://investinpuglia.eu/og-eu-grants.jpg',
      width: 1200,
      height: 630,
      alt: 'EU Grants 2024 Guide'
    }]
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/blog/eu-grants-2024-guide'
  }
}

export default function EUGrants2024Guide() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "EU Grants 2024: Complete €2.25M Funding Guide for Puglia Tourism",
    "description": "Comprehensive guide to securing EU grants for tourism investments in Puglia, Italy",
    "datePublished": "2024-01-26",
    "dateModified": "2024-01-26",
    "author": {
      "@type": "Organization",
      "name": "InvestInPuglia"
    },
    "publisher": {
      "@type": "Organization",
      "name": "InvestInPuglia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://investinpuglia.eu/logo.png"
      }
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How much EU grant funding can I get for Puglia tourism investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can receive 35-50% non-repayable grants up to €2.25 million for tourism accommodation projects in Puglia. The exact percentage depends on project size, location, and sustainability features."
      }
    }, {
      "@type": "Question",
      "name": "What are the eligibility requirements for EU grants in 2024?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Requirements include: tourism accommodation project in Puglia, minimum 5% sustainability component, valid business plan, proper permits, and commitment to maintain the investment for at least 5 years."
      }
    }, {
      "@type": "Question",
      "name": "How long does the EU grant application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The typical timeline is 3-6 months from application to approval. This includes 4-6 weeks for preparation, 2-3 months for evaluation, and 2-4 weeks for final approval and fund disbursement."
      }
    }]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <Navbar />
      
      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold mb-4">
                2024 FUNDING AVAILABLE NOW
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                EU Grants 2024: Your Complete €2.25M Funding Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Unlock 35-50% Non-Repayable Grants for Puglia Tourism Investment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculator"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all"
                >
                  Calculate Your Grant →
                </Link>
                <Link
                  href="/book-consultation"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">€2.25M</div>
                <div className="text-sm text-gray-600 mt-2">Maximum Grant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">35-50%</div>
                <div className="text-sm text-gray-600 mt-2">Non-Repayable</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600 mt-2">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2024</div>
                <div className="text-sm text-gray-600 mt-2">Apply Now</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">What Are EU Tourism Grants?</h2>
            <p className="text-gray-700 mb-6">
              The European Union, through Italy's National Recovery and Resilience Plan (PNRR), has allocated billions 
              of euros to transform Southern Italy's tourism sector. For 2024, Puglia stands as one of the most attractive 
              regions for international investors, offering unprecedented grant opportunities that can cover up to 50% of 
              your total investment - money you never have to repay.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
              <h3 className="text-xl font-semibold mb-3">2024 Key Update:</h3>
              <p className="text-gray-700">
                The Italian government has streamlined the application process and increased funding availability for 
                sustainable tourism projects. Applications are now processed 40% faster than in 2023, with dedicated 
                support for foreign investors.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Grant Amounts and Percentages</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Investment Size</th>
                    <th className="text-left py-3">Grant %</th>
                    <th className="text-left py-3">Max Grant</th>
                    <th className="text-left py-3">Your Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">€200K - €500K</td>
                    <td className="py-3 font-semibold text-green-600">50%</td>
                    <td className="py-3">€250K</td>
                    <td className="py-3">€100K - €250K</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">€500K - €2M</td>
                    <td className="py-3 font-semibold text-green-600">45%</td>
                    <td className="py-3">€900K</td>
                    <td className="py-3">€275K - €1.1M</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">€2M - €5M</td>
                    <td className="py-3 font-semibold text-green-600">40%</td>
                    <td className="py-3">€2M</td>
                    <td className="py-3">€1.2M - €3M</td>
                  </tr>
                  <tr>
                    <td className="py-3">€5M+</td>
                    <td className="py-3 font-semibold text-green-600">35%</td>
                    <td className="py-3">€2.25M</td>
                    <td className="py-3">€3.25M+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Eligibility Requirements for 2024</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Tourism Accommodation Project</h4>
                  <p className="text-gray-600">Hotels, B&Bs, resorts, agriturismos, or vacation rentals in Puglia</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Minimum 5% Sustainability Component</h4>
                  <p className="text-gray-600">Solar panels, water conservation, energy efficiency measures</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Business Plan & Financial Projections</h4>
                  <p className="text-gray-600">3-year forecast showing job creation and economic impact</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Property Ownership or Long-term Lease</h4>
                  <p className="text-gray-600">Minimum 10-year lease or property purchase agreement</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Application Process Timeline</h2>
            
            <div className="space-y-6">
              <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Phase 1: Preparation (4-6 weeks)</h4>
                <p className="text-gray-600 mt-2">Property selection, business plan development, documentation gathering</p>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Phase 2: Application Submission (1-2 weeks)</h4>
                <p className="text-gray-600 mt-2">Online submission through INVITALIA portal with all supporting documents</p>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Phase 3: Evaluation (2-3 months)</h4>
                <p className="text-gray-600 mt-2">Technical review, site inspection, financial assessment</p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Phase 4: Approval & Funding (2-4 weeks)</h4>
                <p className="text-gray-600 mt-2">Grant agreement signing, first disbursement (usually 40% upfront)</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Why Puglia? The Strategic Advantage</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-semibold mb-2">300% Tourism Growth</h4>
                <p className="text-gray-600">International arrivals to Puglia have tripled since 2019</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <Euro className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-semibold mb-2">7% Flat Tax Rate</h4>
                <p className="text-gray-600">Foreign investors enjoy Italy's special tax regime</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                <Award className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold mb-2">UNESCO Heritage Sites</h4>
                <p className="text-gray-600">3 UNESCO sites driving year-round premium tourism</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
                <Users className="h-8 w-8 text-yellow-600 mb-3" />
                <h4 className="font-semibold mb-2">Government Support</h4>
                <p className="text-gray-600">Dedicated foreign investor assistance programs</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Mistakes to Avoid</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
              <h4 className="font-semibold text-red-900 mb-4">❌ Top 5 Application Killers:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Submitting incomplete documentation (causes 40% of rejections)</li>
                <li>Underestimating sustainability requirements</li>
                <li>Unrealistic financial projections</li>
                <li>Missing application deadlines</li>
                <li>Not using professional advisory services</li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Success Story: €1.2M Grant Secured</h2>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 my-8">
              <p className="text-lg mb-4">
                "InvestInPuglia helped us secure €1.2M in EU grants for our boutique hotel in Ostuni. 
                What would have cost us €3M ended up costing just €1.8M. The ROI is incredible!"
              </p>
              <p className="font-semibold">- Michael Chen, Singapore Investor</p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: Can foreign investors apply for EU grants?</h4>
                <p className="text-gray-600">
                  Yes! EU grants are available to all investors regardless of nationality. Foreign investors 
                  actually receive priority processing in many cases.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: Do I need to speak Italian?</h4>
                <p className="text-gray-600">
                  No. While applications must be submitted in Italian, professional advisory services like 
                  InvestInPuglia handle all translations and communications with authorities.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: When do I receive the grant money?</h4>
                <p className="text-gray-600">
                  Typically 40% upon approval, 40% at project midpoint, and 20% upon completion. Bridge 
                  financing is available for the interim periods.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: What if my application is rejected?</h4>
                <p className="text-gray-600">
                  You can reapply in the next funding round with improvements. Our 95% success rate comes 
                  from thorough preparation and addressing all requirements upfront.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Secure Your EU Grant?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't miss out on 2024 funding. Our team has a 95% grant approval success rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all inline-flex items-center"
              >
                Book Your Free Grant Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/calculator"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-all"
              >
                Calculate Your Grant Amount
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-90">
              Or call directly: +39 351 400 1402
            </p>
          </div>
        </section>
      </article>
      
      <Footer />
    </>
  )
}