// PATH: app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { AuthProvider } from '@/contexts/AuthContext'

// Lazy load the TrulloChatbot to avoid build errors if component doesn't exist yet
const TrulloChatbotWrapper = dynamic(
  () => import('@/components/TrulloChatbotWrapper').catch(() => {
    // Return empty component if file doesn't exist
    return { default: () => null }
  }),
  {
    ssr: false,
    loading: () => null
  }
)

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
    default: 'PIA & Mini PIA Grants Puglia - EU Co-Funded Non-Refundable Grants | Invest in Puglia',
    template: '%s | PIA & Mini PIA Grants Advisory - Invest in Puglia'
  },
  description: 'Expert advisory for PIA and Mini PIA non-refundable grants. EU co-funded Puglia Regional Development programmes offering up to 55% funding (max €2.75M) for international businesses. Tourism, manufacturing, technology, and agriculture sectors. Free assessment and 95% approval rate.',
  keywords: [
    'PIA grants puglia',
    'Mini PIA grants',
    'PIA Turismo',
    'non refundable grants italy',
    'EU co-funded puglia',
    'Puglia Regional Development programmes',
    'FESR puglia',
    'fondo perduto puglia',
    'PIA Medie Imprese',
    'PIA Piccole Imprese',
    'Mini PIA Turismo',
    'Mini PIA Manifatturiero',
    '55% non refundable grants',
    '€2.75M PIA funding',
    'Puglia Sviluppo',
    'Regione Puglia incentivi',
    'invest in puglia',
    'giuseppe funaro PIA consultant'
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
    title: 'PIA & Mini PIA Non-Refundable Grants - EU Co-Funded Puglia Regional Development',
    description: 'Access PIA and Mini PIA non-refundable grants through EU co-funded Puglia Regional Development programmes. Up to 55% funding (max €2.75M) for international businesses. Expert advisory with 95% approval success rate.',
    url: 'https://investinpuglia.eu',
    siteName: 'Invest in Puglia - PIA & Mini PIA Grant Advisory',
    images: [
      {
        url: 'https://investinpuglia.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PIA & Mini PIA Non-Refundable Grants - EU Co-Funded Puglia Regional Development Programmes',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIA & Mini PIA Non-Refundable Grants - Up to €2.75M',
    description: 'EU co-funded Puglia Regional Development programmes. Up to 55% non-refundable grants for international businesses. Expert PIA & Mini PIA advisory.',
    images: ['https://investinpuglia.eu/og-image.png'],
    creator: '@investinpuglia'
  },
  alternates: {
    canonical: 'https://investinpuglia.eu',
    languages: {
      'en-US': 'https://en.investinpuglia.eu',
      'it-IT': 'https://it.investinpuglia.eu',
      'es-ES': 'https://es.investinpuglia.eu',
      'fr-FR': 'https://fr.investinpuglia.eu',
      'de-DE': 'https://de.investinpuglia.eu',
      'ar': 'https://ar.investinpuglia.eu',
      'zh': 'https://zh.investinpuglia.eu',
    }
  },
  verification: {
    google: 'G-2369HHR8PF', // Your existing Google verification
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
          src="https://www.googletagmanager.com/gtag/js?id=G-2369HHR8PF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2369HHR8PF');
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
              "@type": "ProfessionalService",
              "name": "Invest in Puglia",
              "description": "Expert PIA and Mini PIA grant advisory. Specializing in EU co-funded Puglia Regional Development programmes with non-refundable grants up to €2.75M.",
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
              "knowsAbout": ["PIA Grants", "Mini PIA Programme", "EU Co-Funded Regional Development", "FESR Puglia", "PIA Turismo", "PIA Medie Imprese", "Non-Refundable Grants", "Puglia Sviluppo", "Fondo Perduto"]
            })
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <AuthProvider>
          <Navbar />

          <main className="pt-16">{children}</main>
          <Footer />
          <TrulloChatbotWrapper />
        </AuthProvider>
      </body>
    </html>
  )
}
