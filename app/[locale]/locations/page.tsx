// PATH: app/[locale]/locations/page.tsx
// Replace your existing metadata export with this enhanced version

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
        url: 'https://investinpuglia.eu/images/puglia-locations-map.jpg',
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
    images: ['https://investinpuglia.eu/images/puglia-locations-map.jpg'],
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/en/locations',
    languages: {
      'en': 'https://investinpuglia.eu/en/locations',
      'it': 'https://investinpuglia.eu/it/locations',
    }
  }
};
