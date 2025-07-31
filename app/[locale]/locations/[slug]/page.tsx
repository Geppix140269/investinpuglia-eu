// PATH: app/[locale]/locations/[slug]/page.tsx

import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600;

const LOCATION_QUERY = `
  *[_type == "locationPage" && slug.current == $slug][0] {
    _id,
    city,
    province,
    seo,
    heroTitle,
    heroDescription,
    population,
    gdpPerCapita,
    mainIndustries,
    uniqueSellingPoints,
    investmentIncentives,
    keyStatistics,
    transportLinks
  }
`;

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }): Promise<Metadata> {
  const location = await client.fetch(LOCATION_QUERY, { slug: params.slug });
  if (!location) return {};

  // Create more specific, engaging metadata
  const population = location.population ? location.population.toLocaleString() : 'N/A';
  const gdp = location.gdpPerCapita ? `€${location.gdpPerCapita.toLocaleString()}` : 'N/A';
  const topIndustries = location.mainIndustries?.slice(0, 3).join(', ') || 'diverse sectors';
  const incentiveRate = location.investmentIncentives?.[0]?.percentage || '65';
  
  // Dynamic title that shows specific benefits
  const title = location.seo?.metaTitle || 
    `Invest in ${location.city} | Population ${population} | Up to ${incentiveRate}% Grants | ${location.province} Province`;
  
  // Rich description with actual data
  const description = location.seo?.metaDescription || 
    `${location.city} investment opportunities: ${gdp} GDP/capita, ${location.keyStatistics?.businessCount || '1000+'} businesses. Key sectors: ${topIndustries}. ${location.uniqueSellingPoints?.[0] || 'Strategic location in Puglia'}. EU grants up to ${incentiveRate}%.`;

  return {
    title,
    description,
    keywords: [
      `${location.city} investment`,
      `${location.city} business opportunities`,
      `${location.city} grants`,
      `${location.province} investment`,
      ...location.mainIndustries?.map((ind: string) => `${location.city} ${ind}`) || []
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      images: [
        {
          url: `https://investinpuglia.eu/og-images/locations/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${location.city} Investment Opportunities - ${location.province} Province, Puglia`
        }
      ],
      locale: params.locale === 'it' ? 'it_IT' : 'en_US',
      siteName: 'Invest in Puglia',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.city} Investment | Pop: ${population} | GDP: ${gdp}`,
      description: `${topIndustries} hub in ${location.province}. Grants up to ${incentiveRate}% available.`,
      images: [`https://investinpuglia.eu/og-images/locations/${params.slug}.jpg`],
    },
    alternates: {
      canonical: `https://investinpuglia.eu/${params.locale}/locations/${params.slug}`,
      languages: {
        'en': `https://investinpuglia.eu/en/locations/${params.slug}`,
        'it': `https://investinpuglia.eu/it/locations/${params.slug}`,
      }
    }
  };
}

export async function generateStaticParams() {
  const locations = await client.fetch(`
    *[_type == "locationPage"] { slug }
  `);
  return locations.map((loc: any) => ({ slug: loc.slug.current }));
}

export default async function LocationPage({ params }: { params: { slug: string, locale: string } }) {
  const location = await client.fetch(LOCATION_QUERY, { slug: params.slug });
  if (!location) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">{location.heroTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">{location.heroDescription}</p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700">Population</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {location.population?.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700">GDP Per Capita</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                €{location.gdpPerCapita?.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700">Businesses</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {location.keyStatistics?.businessCount?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700">Unemployment</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {location.keyStatistics?.unemploymentRate || 'N/A'}%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Industries */}
      {location.mainIndustries && location.mainIndustries.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Key Industries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {location.mainIndustries.map((industry: string, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold capitalize">{industry}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Investment Incentives */}
      {location.investmentIncentives && location.investmentIncentives.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Investment Incentives</h2>
            <div className="space-y-4">
              {location.investmentIncentives.map((incentive: any, i: number) => (
                <div key={i} className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{incentive.title}</h3>
                      <p className="text-gray-700">{incentive.description}</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600 ml-4">
                      {incentive.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Unique Selling Points */}
      {location.uniqueSellingPoints && location.uniqueSellingPoints.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Why Invest in {location.city}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {location.uniqueSellingPoints.map((point: string, i: number) => (
                <div key={i} className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Transport Links */}
      {location.transportLinks && location.transportLinks.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Strategic Location & Transport</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.transportLinks.map((link: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">{link.type}</h3>
                  <p className="text-gray-700">{link.description}</p>
                  {link.distance && (
                    <p className="text-sm text-blue-600 mt-2">{link.distance}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest in {location.city}?</h2>
          <p className="text-xl mb-8">Get personalized support for your investment project</p>
          <a href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Our Team
          </a>
        </div>
      </section>
    </div>
  );
}
