// app/layout.tsx - SEO-optimized metadata with Google Analytics and EmailJS

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://investinpuglia.eu'),
  title: {
    default: 'Property Investment in Puglia - EU Grants up to €2.25M | Invest in Puglia',
    template: '%s | Property Investment Puglia - Invest in Puglia'
  },
  description: 'Expert property investment advisory in Puglia, Italy. Secure up to €2.25M in EU grants. Free grant calculator, property surveys, and professional guidance for foreign investors.',
  keywords: [
    'property investment puglia',
    'puglia real estate investment',
    'invest in puglia property',
    'puglia property grants',
    'EU grants puglia property',
    'foreign property investment italy',
    'puglia real estate advisor',
    'mini pia puglia',
    'property investment apulia',
    'buy property puglia grants',
    'puglia property market',
    'italian property investment grants',
    'invest in puglia',
    'investinpuglia',
    'giuseppe funaro property advisor'
  ],
  authors: [{ name: 'Invest in Puglia' }],
  creator: 'Invest in Puglia',
  publisher: 'Invest in Puglia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Property Investment in Puglia - Secure €2.25M in EU Grants',
    description: 'Expert advisory for property investment in Puglia. Free grant calculator, professional surveys, and proven strategies for foreign investors.',
    url: 'https://investinpuglia.eu',
    siteName: 'Invest in Puglia - EU Property Grants & Investment',
    images: [
      {
        url: '/images/puglia-property-investment.jpg',
        width: 1200,
        height: 630,
        alt: 'Property Investment Opportunities in Puglia, Italy',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Investment in Puglia - EU Grants Available',
    description: 'Secure up to €2.25M in grants for your Puglia property investment. Expert advisory services.',
    images: ['/images/puglia-property-investment.jpg'],
    creator: '@investinpuglia'
  },
  alternates: {
    canonical: 'https://investinpuglia.eu',
    languages: {
      'en-US': 'https://en.investinpuglia.eu',
      'ar': 'https://ar.investinpuglia.eu',
      'zh': 'https://zh.investinpuglia.eu',
    }
  },
  verification: {
    google: 'G-LPJCZYGWWG', // Your existing Google verification
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LPJCZYGWWG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LPJCZYGWWG');
          `}
        </Script>

        {/* EmailJS SDK */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="afterInteractive"
        />
        <Script id="emailjs-init" strategy="afterInteractive">
          {`
            (function(){
              if (typeof window !== 'undefined' && window.emailjs) {
                window.emailjs.init("wKn1_xMCtZssdZzpb");
              }
            })();
          `}
        </Script>

       {/* Favicons - Updated to match actual files */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Invest in Puglia" />
        <meta name="application-name" content="Invest in Puglia" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Schema.org JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Invest in Puglia",
              "description": "Expert property investment advisory in Puglia, Italy. EU grants up to €2.25M.",
              "url": "https://investinpuglia.eu",
              "telephone": "+39 351 400 1402",
              "email": "info@investinpuglia.eu",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bari",
                "addressRegion": "Puglia",
                "addressCountry": "IT"
              },
              "areaServed": {
                "@type": "Place",
                "name": "Puglia, Italy"
              },
              "knowsAbout": ["Property Investment", "EU Grants", "Italian Real Estate", "Mini PIA Turismo"]
            })
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
