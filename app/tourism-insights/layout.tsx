import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tourism Insights | Puglia Investment Data | InvestInPuglia.eu',
  description: 'Access real-time tourism data and analytics for Puglia. Comprehensive insights on visitor statistics, seasonal trends, and economic impact from the official Puglia DMS Observatory.',
  keywords: 'Puglia tourism data, visitor statistics, tourism analytics, DMS Observatory, investment opportunities, travel trends',
  openGraph: {
    title: 'Tourism Insights - Puglia Investment Data',
    description: 'Real-time tourism analytics and investment insights for the Puglia region',
    type: 'website',
    url: 'https://investinpuglia.eu/tourism-insights',
  },
};

export default function TourismInsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}