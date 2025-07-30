// PATH: app/[locale]/locations/page.tsx

import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Investment Locations in Puglia | 50+ Cities with EU Grants up to €2.25M',
  description: 'Explore 50+ prime investment locations across Puglia. From Bari\'s €27,000 GDP/capita to Lecce\'s tourism boom. Each city offers unique grants, incentives & opportunities.',
  keywords: ['puglia investment locations', 'bari investment', 'lecce business opportunities', 'taranto incentives', 'puglia cities', 'italian investment zones'],
  openGraph: {
    title: '50+ Investment Locations in Puglia | EU Grants Available',
    description: 'Discover the best cities for investment in Puglia. Compare opportunities in Bari, Lecce, Taranto & more. Up to €2.25M in EU grants available.',
    url: 'https://investinpuglia.eu/en/locations',
    siteName: 'Invest in Puglia',
    images: [
      {
        url: 'https://investinpuglia.eu/Logo_InvestInPuglia_Morph.png',
        width: 1200,
        height: 630,
        alt: 'Investment Map of Puglia - 50+ Cities & Towns',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '50+ Investment Locations in Puglia',
    description: 'Find your perfect investment location in Puglia. Compare cities, incentives, and opportunities.',
    images: ['https://investinpuglia.eu/Logo_InvestInPuglia_Morph.png'],
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/en/locations',
    languages: {
      'en': 'https://investinpuglia.eu/en/locations',
      'it': 'https://investinpuglia.eu/it/locations',
    }
  }
};

// Define the params type
type PageProps = {
  params: {
    locale: string;
  };
};

// Define location type
type Location = {
  _id: string;
  city: string;
  province: string;
  slug: {
    current: string;
  };
  population?: number;
  mainIndustries?: string[];
  gdpPerCapita?: number;
  keyStatistics?: any;
};

export default async function LocationsIndex({ params }: PageProps) {
  const locations = await client.fetch<Location[]>(`
    *[_type == "locationPage"] | order(population desc) {
      _id,
      city,
      province,
      slug,
      population,
      mainIndustries,
      gdpPerCapita,
      keyStatistics
    }
  `);

  // Group locations by province
  const locationsByProvince = locations.reduce((acc: Record<string, Location[]>, location) => {
    if (!acc[location.province]) {
      acc[location.province] = [];
    }
    acc[location.province].push(location);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Investment Locations in Puglia</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover investment opportunities across 50+ cities in Puglia. Each location offers unique advantages, 
            incentives, and strategic benefits for your business.
          </p>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Investment Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.slice(0, 4).map((location) => (
              <Link
                key={location._id}
                href={`/${params.locale}/locations/${location.slug.current}`}
                className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition group"
              >
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">
                  {location.city}
                </h3>
                <p className="text-gray-600 mb-2">{location.province} Province</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Population:</span> {location.population?.toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">GDP/Capita:</span> €{location.gdpPerCapita?.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-blue-600 mt-3 group-hover:underline">
                  Explore opportunities →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Locations by Province */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">All Investment Locations by Province</h2>
          
          {Object.entries(locationsByProvince).map(([province, provinceCities]) => (
            <div key={province} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-blue-800">{province} Province</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {provinceCities.map((location) => (
                  <Link
                    key={location._id}
                    href={`/${params.locale}/locations/${location.slug.current}`}
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                  >
                    <h4 className="text-lg font-semibold mb-1 hover:text-blue-600">
                      {location.city}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Pop: {location.population?.toLocaleString()}
                    </p>
                    {location.mainIndustries && location.mainIndustries.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {location.mainIndustries.slice(0, 2).join(', ')}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Invest in Puglia's Cities?</h2>
            <div className="prose prose-lg">
              <p>
                Puglia offers diverse investment opportunities across its 50+ cities and towns. From the bustling 
                economic hub of Bari to the tourism-rich coastal cities of Lecce and Monopoli, each location 
                provides unique advantages for international investors.
              </p>
              <h3 className="text-2xl font-semibold mt-8 mb-4">Strategic Advantages Across All Locations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>EU funding and regional incentives up to 65% of investment</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Strategic location connecting Europe, Africa, and the Middle East</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Growing sectors: renewable energy, aerospace, ICT, and agri-food</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Skilled workforce and competitive operational costs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Your Perfect Investment Location</h2>
          <p className="text-xl mb-8">Our team can help you identify the best location for your specific needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Location Advice
            </a>
            <a href="/calculator" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Calculate Incentives
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
