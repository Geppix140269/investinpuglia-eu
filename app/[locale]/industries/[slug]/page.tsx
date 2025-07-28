// app/[locale]/industries/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity/client'

interface IndustryPageProps {
  params: {
    locale: string
    slug: string
  }
}

async function getIndustryData(slug: string) {
  const query = `*[_type == "industryPage" && slug.current == $slug][0] {
    industry,
    slug,
    seo,
    heroTitle,
    heroDescription,
    marketSize,
    growthRate,
    keyAdvantages,
    availableGrants,
    majorPlayers,
    investmentOpportunities,
    statistics,
    "relatedLocations": relatedLocations[]-> {
      city,
      slug
    }
  }`
  
  return sanityClient.fetch(query, { slug })
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = await getIndustryData(params.slug)
  
  if (!industry) return {}
  
  return {
    title: industry.seo?.metaTitle || industry.heroTitle,
    description: industry.seo?.metaDescription,
    keywords: industry.seo?.keywords,
  }
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const industry = await getIndustryData(params.slug)
  
  if (!industry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {industry.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {industry.heroDescription}
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Market Size</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{industry.marketSize}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Growth Rate</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">{industry.growthRate}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Businesses</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{industry.statistics?.businesses || 'N/A'}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Employees</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{industry.statistics?.employees?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Invest in {industry.industry} in Puglia?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.keyAdvantages?.map((advantage: string, index: number) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="ml-3 text-gray-700">{advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Grants */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Grants & Incentives for {industry.industry}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {industry.availableGrants?.map((grant: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{grant.grantName}</h3>
                <p className="text-2xl font-bold text-green-600 mb-3">{grant.amount}</p>
                <p className="text-gray-600">{grant.description}</p>
              </div>
            ))}
          </div>
          
          {/* CTA to Calculator */}
          <div className="mt-12 text-center">
            <a 
              href={`/${params.locale}/calculator`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate Your Grants →
            </a>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Current Investment Opportunities
          </h2>
          <div className="space-y-6">
            {industry.investmentOpportunities?.map((opp: any, index: number) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="md:flex md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{opp.type}</h3>
                    <p className="text-gray-600 mb-3">{opp.description}</p>
                  </div>
                  <div className="md:ml-8 mt-4 md:mt-0">
                    <p className="text-sm text-gray-500">Investment Range</p>
                    <p className="text-lg font-semibold text-blue-600">{opp.investmentRange}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Players */}
      {industry.majorPlayers && industry.majorPlayers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Success Stories in Puglia's {industry.industry} Sector
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.majorPlayers.map((player: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-700">{player}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Locations */}
      {industry.relatedLocations && industry.relatedLocations.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Top Locations for {industry.industry} Investment
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {industry.relatedLocations.map((location: any) => (
                <a
                  key={location.slug.current}
                  href={`/${params.locale}/locations/${location.slug.current}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700">
                    {location.city}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Explore {industry.industry.toLowerCase()} opportunities in {location.city}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Invest in Puglia's {industry.industry} Sector?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get personalized advice and discover the perfect investment opportunity for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${params.locale}/contact`}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Our Experts
            </a>
            <a
              href={`/${params.locale}/calculator`}
              className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Calculate Your Incentives
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
