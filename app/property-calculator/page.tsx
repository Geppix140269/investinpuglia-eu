import { Metadata } from 'next';
import PropertyCalculatorWithRegistration from '@/components/PropertyCalculatorWithRegistration';

export const metadata: Metadata = {
  title: 'Italy Property Costs Calculator | Complete Foreign Buyer Guide - InvestInPuglia.eu',
  description: 'Comprehensive calculator for all costs when buying property in Italy as a foreigner. Includes taxes, notary fees, agency costs, legal fees, and annual expenses. Get accurate estimates for your Italian property investment.',
  keywords: [
    'Italy property calculator',
    'buying property in Italy costs',
    'Italian real estate taxes',
    'foreign buyer Italy',
    'property purchase calculator',
    'Italian property investment',
    'registration tax Italy',
    'notary fees Italy',
    'property costs breakdown',
    'Italian real estate guide'
  ],
  openGraph: {
    title: 'Italy Property Costs Calculator - Complete Foreign Buyer Guide',
    description: 'Calculate all costs for buying property in Italy as a foreigner. Accurate estimates for taxes, fees, and annual expenses.',
    url: 'https://investinpuglia.eu/property-calculator',
    siteName: 'InvestInPuglia.eu',
    images: [
      {
        url: 'https://investinpuglia.eu/og-images/property-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Italy Property Costs Calculator'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Italy Property Costs Calculator - Foreign Buyer Guide',
    description: 'Calculate all costs for buying property in Italy. Complete breakdown for foreign investors.',
    images: ['https://investinpuglia.eu/og-images/property-calculator.png']
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/property-calculator'
  }
};

export default function PropertyCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Italy Property Costs Calculator
            </h1>
            <p className="text-xl mb-6 text-blue-100">
              Complete breakdown of all costs for foreign buyers purchasing property in Italy
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <span>✓</span> Registration & Cadastral Taxes
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <span>✓</span> Notary & Legal Fees
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <span>✓</span> Agency & Professional Costs
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <span>✓</span> Annual Property Taxes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyCalculatorWithRegistration />
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Understanding Italian Property Purchase Costs
              </h2>
              <div className="prose text-gray-600">
                <p>
                  Buying property in Italy involves several mandatory costs that foreign buyers must consider. 
                  The total cost typically ranges from 10% to 15% of the property value, depending on various factors.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Key Cost Categories:</h3>
                <ul className="space-y-2">
                  <li><strong>Registration Tax:</strong> 2% for first home (EU residents), 9% for others</li>
                  <li><strong>Notary Fees:</strong> 2-3% of property value for legal processing</li>
                  <li><strong>Agency Fees:</strong> 3% + VAT if using a real estate agent</li>
                  <li><strong>Legal Fees:</strong> €2,000-€3,500 for foreign buyers</li>
                  <li><strong>Annual Taxes:</strong> IMU and TASI taxes for ongoing ownership</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Special Considerations for Foreign Buyers
              </h2>
              <div className="prose text-gray-600">
                <p>
                  Non-EU buyers face additional requirements and costs when purchasing Italian property, 
                  including higher legal fees and translation requirements.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Foreign Buyer Benefits:</h3>
                <ul className="space-y-2">
                  <li><strong>No Restrictions:</strong> Foreigners can freely buy most Italian properties</li>
                  <li><strong>Tax Treaties:</strong> Many countries have agreements to avoid double taxation</li>
                  <li><strong>Renovation Grants:</strong> Access to EU and Italian renovation incentives</li>
                  <li><strong>Rental Income:</strong> Ability to rent out property for income</li>
                  <li><strong>Residency Path:</strong> Property ownership can support residence applications</li>
                </ul>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Need Expert Guidance?</h4>
                  <p className="text-blue-800 text-sm">
                    Giuseppe Funaro and the InvestInPuglia team specialize in guiding foreign buyers 
                    through the Italian property purchase process, including accessing EU grants and navigating legal requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                What is the registration tax rate for foreign buyers?
              </h3>
              <p className="text-gray-600">
                EU residents pay 2% for their first home in Italy, while non-EU residents and second homes 
                are subject to 9% registration tax. Luxury properties (&gt;€750k) are always taxed at 9%.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Do I need a lawyer when buying property in Italy?
              </h3>
              <p className="text-gray-600">
                While not legally mandatory, it's highly recommended, especially for foreign buyers. 
                A lawyer ensures all legal requirements are met and protects your interests during the purchase process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can foreigners get mortgages in Italy?
              </h3>
              <p className="text-gray-600">
                Yes, but requirements are stricter for non-EU residents. Italian banks typically require 
                higher down payments (30-40%) and proof of stable income. EU residents have easier access to financing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                What are the ongoing costs of owning property in Italy?
              </h3>
              <p className="text-gray-600">
                Annual costs include IMU tax (0.4-0.76% for second homes), TASI tax (~0.25%), insurance, 
                condominium fees (if applicable), and maintenance. First homes are often exempt from IMU tax.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}