// Update only the generateMetadata function in app/[locale]/locations/[slug]/page.tsx

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
          url: 'https://investinpuglia.eu/Logo_InvestInPuglia_Morph.png', // Using your logo!
          width: 1200,
          height: 630,
          alt: 'Invest in Puglia - EU Property Grants'
        }
      ],
      locale: params.locale === 'it' ? 'it_IT' : 'en_US',
      siteName: 'Invest in Puglia',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.city} Investment | Pop: ${population} | GDP: ${gdp}`,
      description: `${topIndustries} hub in ${location.province}. Grants up to ${incentiveRate}% available.`,
      images: ['https://investinpuglia.eu/Logo_InvestInPuglia_Morph.png'],
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
