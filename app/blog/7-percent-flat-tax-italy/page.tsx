import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Calculator, TrendingDown, Globe, Shield, Euro, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '7% Flat Tax Italy 2024: Complete Guide for Foreign Investors | InvestInPuglia',
  description: 'Save millions with Italy\'s 7% flat tax regime for foreign investors. Complete 2024 guide covering eligibility, savings calculations, and application process.',
  keywords: '7 percent tax Italy, Italian flat tax, foreign investor tax Italy, Italy tax regime 2024, pensioner tax Italy, expat tax Italy, Italian tax benefits, low tax Italy',
  openGraph: {
    title: '7% Flat Tax Italy: The Ultimate Tax Haven for Foreign Investors',
    description: 'Discover how to pay just 7% tax on foreign income in Italy. Complete guide for 2024.',
    url: 'https://investinpuglia.eu/blog/7-percent-flat-tax-italy',
    type: 'article',
    images: [{
      url: 'https://investinpuglia.eu/og-7-percent-tax.jpg',
      width: 1200,
      height: 630,
      alt: '7% Flat Tax Italy Guide'
    }]
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/blog/7-percent-flat-tax-italy'
  }
}

export default function SevenPercentTaxGuide() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "7% Flat Tax Italy 2024: Complete Guide for Foreign Investors",
    "description": "Comprehensive guide to Italy's 7% flat tax regime for foreign pensioners and investors",
    "datePublished": "2024-01-26",
    "dateModified": "2024-01-26",
    "author": {
      "@type": "Organization",
      "name": "InvestInPuglia"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Who qualifies for the 7% flat tax in Italy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Foreign retirees and pension recipients who haven't been Italian tax residents for at least 5 years qualify. You must move to a Southern Italian municipality with less than 20,000 inhabitants."
      }
    }, {
      "@type": "Question",
      "name": "How long does the 7% tax rate last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 7% flat tax rate applies for 10 years from when you become an Italian tax resident. After 10 years, standard progressive tax rates apply."
      }
    }, {
      "@type": "Question",
      "name": "What income is covered by the 7% flat tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All foreign-sourced income including pensions, investments, rental income, capital gains, and business income. Italian-sourced income is taxed at standard rates."
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
        <section className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold mb-4">
                TAX SAVINGS UP TO 93%
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Italy's 7% Flat Tax: The Best-Kept Secret for Foreign Investors
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Pay Just 7% Tax on All Foreign Income for 10 Years in Beautiful Puglia
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-consultation"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all"
                >
                  Check Your Eligibility →
                </Link>
                <a
                  href="#calculator"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-all"
                >
                  Calculate Your Savings
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Shocking Comparison */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Your Tax Rate Comparison</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold text-red-600">45%</div>
                <div className="text-sm text-gray-600 mt-2">UK Tax Rate</div>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold text-red-600">37%</div>
                <div className="text-sm text-gray-600 mt-2">US Tax Rate</div>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold text-red-600">45%</div>
                <div className="text-sm text-gray-600 mt-2">Germany Tax</div>
              </div>
              <div className="text-center bg-green-50 p-6 rounded-lg shadow-lg border-2 border-green-500">
                <div className="text-2xl font-bold text-green-600">7%</div>
                <div className="text-sm text-gray-600 mt-2">Italy (Puglia)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">What Is Italy's 7% Flat Tax Regime?</h2>
            <p className="text-gray-700 mb-6">
              In 2019, Italy introduced one of Europe's most attractive tax regimes specifically designed to attract 
              foreign retirees and investors to Southern Italy. This revolutionary program allows qualifying individuals 
              to pay just 7% tax on ALL foreign-sourced income for a full decade - making it one of the lowest tax 
              rates in the developed world.
            </p>

            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 my-8">
              <h3 className="text-xl font-semibold mb-3">💰 Real Example:</h3>
              <p className="text-gray-700">
                A UK pensioner with £100,000 annual pension income saves £38,000 per year in taxes. 
                Over 10 years, that's £380,000 in tax savings - enough to buy a luxury property in Puglia!
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Who Qualifies for the 7% Tax?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Foreign Pension Recipients</h4>
                  <p className="text-gray-600">Any type of pension: state, private, or occupational</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Not Italian Tax Resident for 5+ Years</h4>
                  <p className="text-gray-600">Must not have been tax resident in Italy in the previous 5 tax years</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Move to Southern Italy</h4>
                  <p className="text-gray-600">Puglia, Calabria, Campania, Sicily, Sardinia, Basilicata, Abruzzo, Molise</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Small Municipality (<20,000 residents)</h4>
                  <p className="text-gray-600">Must establish residence in a town with less than 20,000 inhabitants</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12" id="calculator">Calculate Your Tax Savings</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3">Annual Income</th>
                    <th className="text-left py-3">Your Country (avg 35%)</th>
                    <th className="text-left py-3">Italy (7%)</th>
                    <th className="text-left py-3 text-green-600">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">€50,000</td>
                    <td className="py-3">€17,500</td>
                    <td className="py-3 font-semibold">€3,500</td>
                    <td className="py-3 font-bold text-green-600">€14,000/year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">€100,000</td>
                    <td className="py-3">€35,000</td>
                    <td className="py-3 font-semibold">€7,000</td>
                    <td className="py-3 font-bold text-green-600">€28,000/year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">€200,000</td>
                    <td className="py-3">€70,000</td>
                    <td className="py-3 font-semibold">€14,000</td>
                    <td className="py-3 font-bold text-green-600">€56,000/year</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-3 font-semibold">€500,000</td>
                    <td className="py-3">€175,000</td>
                    <td className="py-3 font-semibold">€35,000</td>
                    <td className="py-3 font-bold text-green-600 text-xl">€140,000/year</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 mt-4">
                * Over 10 years, multiply savings by 10. A €200K income saves €560,000 in taxes!
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">What Income Is Covered?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">✅ Taxed at 7%:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Foreign pensions (all types)</li>
                  <li>• Investment income</li>
                  <li>• Rental income from abroad</li>
                  <li>• Capital gains</li>
                  <li>• Dividend income</li>
                  <li>• Foreign business income</li>
                  <li>• Royalties</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-3">❌ Standard Tax Rates:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Italian employment income</li>
                  <li>• Italian rental income</li>
                  <li>• Italian business income</li>
                  <li>• Italian capital gains</li>
                </ul>
                <p className="text-sm mt-3 text-gray-600">
                  Note: Most retirees have minimal Italian income
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Best Towns in Puglia for 7% Tax</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Ostuni (15,000 residents)</h4>
                <p className="text-gray-600">The "White City" - stunning hilltop town, 8km from beaches</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Monopoli (19,000 residents)</h4>
                <p className="text-gray-600">Charming coastal town with historic center and beaches</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Alberobello (10,000 residents)</h4>
                <p className="text-gray-600">UNESCO World Heritage site famous for trulli houses</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Cisternino (11,000 residents)</h4>
                <p className="text-gray-600">One of Italy's most beautiful villages, perfect for retirees</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Application Process</h2>
            
            <div className="space-y-6">
              <div className="relative pl-8 pb-6 border-l-2 border-emerald-200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Step 1: Choose Your Town</h4>
                <p className="text-gray-600 mt-2">Select a qualifying municipality in Puglia with <20,000 residents</p>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-emerald-200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Step 2: Establish Residency</h4>
                <p className="text-gray-600 mt-2">Register with the local Anagrafe (registry office)</p>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-emerald-200">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Step 3: Tax Registration</h4>
                <p className="text-gray-600 mt-2">Obtain Codice Fiscale and register with Agenzia delle Entrate</p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
                <h4 className="font-semibold text-lg">Step 4: Elect for 7% Regime</h4>
                <p className="text-gray-600 mt-2">File election in first tax return (deadline: April 30)</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
              <AlertCircle className="h-6 w-6 text-yellow-600 mb-3" />
              <h4 className="font-semibold text-yellow-900 mb-2">Important Timing:</h4>
              <p className="text-gray-700">
                You must elect for the 7% regime in your first Italian tax return. Missing this deadline 
                means waiting until the next tax year or potentially losing eligibility.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Combine with EU Grants for Maximum Benefit</h2>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 my-8">
              <h3 className="text-2xl font-bold mb-4">The Ultimate Combination:</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  <span>7% tax on all foreign income</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  <span>35-50% EU grants on property investment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  <span>No wealth tax in Italy</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  <span>No inheritance tax for EU residents</span>
                </div>
              </div>
              <p className="mt-4 text-lg">
                Result: Keep 93% of your income while getting half your investment paid by the EU!
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: Can I still visit my home country?</h4>
                <p className="text-gray-600">
                  Yes! You need to spend 183+ days per year in Italy to maintain tax residency, leaving 
                  182 days for travel.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: What happens after 10 years?</h4>
                <p className="text-gray-600">
                  After 10 years, standard Italian tax rates apply (23-43%). Many retirees structure their 
                  affairs to minimize taxable income at this point.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: Can my spouse also get 7% tax?</h4>
                <p className="text-gray-600">
                  Yes, if they independently qualify (receive pension and meet residency requirements). 
                  Each spouse applies separately.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Q: Do I need to buy property?</h4>
                <p className="text-gray-600">
                  No, you can rent. However, buying property (especially with EU grants) often makes 
                  financial sense given the tax savings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Saving 93% on Taxes Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team specializes in helping foreign investors maximize both tax benefits and EU grants. 
              Free consultation to calculate your exact savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-all inline-flex items-center"
              >
                Book Free Tax Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:+393514001402"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-900 transition-all"
              >
                Call: +39 351 400 1402
              </a>
            </div>
            <p className="mt-6 text-sm opacity-90">
              Join 500+ foreign investors already saving millions in Puglia
            </p>
          </div>
        </section>
      </article>
      
      <Footer />
    </>
  )
}