// Metadata provider component for all pages
import { generateMetadata, getPageMetadata } from '@/lib/page-metadata'
import { Metadata } from 'next'

// This function should be used in each page's layout.tsx or page.tsx
// Example usage in app/consultation/page.tsx:
// export const metadata = generatePageMetadata('/consultation')

export function generatePageMetadata(pathname: string): Metadata {
  const pageMetadata = generateMetadata(pathname)
  
  // Add any global metadata that should apply to all pages
  return {
    ...pageMetadata,
    metadataBase: new URL('https://investinpuglia.eu'),
    applicationName: 'InvestInPuglia',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'Giuseppe Funaro', url: 'https://investinpuglia.eu/about' }],
    creator: 'InvestInPuglia',
    publisher: 'InvestInPuglia',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
        },
      ],
    },
    manifest: '/manifest.json',
    category: 'Real Estate Investment',
  }
}

// Export for client components that need to access metadata
export { getPageMetadata }