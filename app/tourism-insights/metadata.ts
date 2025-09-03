import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tourism Insights | Puglia Investment Data | InvestInPuglia.eu',
  description: 'Access real-time tourism data and analytics for Puglia. Comprehensive insights on visitor statistics, seasonal trends, and economic impact from the official Puglia DMS Observatory.',
  keywords: 'Puglia tourism data, visitor statistics, tourism analytics, DMS Observatory, investment opportunities, travel trends, Puglia tourism insights, real-time data',
  openGraph: {
    title: 'Tourism Insights - Puglia Investment Data',
    description: 'Real-time tourism analytics and investment insights for the Puglia region',
    type: 'website',
    url: 'https://investinpuglia.eu/tourism-insights',
    images: [
      {
        url: 'https://investinpuglia.eu/images/tourism-insights-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Puglia Tourism Data Dashboard'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tourism Insights - Puglia Investment Data',
    description: 'Real-time tourism analytics for smart investment decisions in Puglia',
    images: ['https://investinpuglia.eu/images/tourism-insights-twitter.jpg']
  }
};