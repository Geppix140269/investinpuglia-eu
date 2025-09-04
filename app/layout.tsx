// PATH: app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { PAGE_OG_IMAGES, generateOGImageUrl } from '@/lib/og-images'
import { generatePageMetadata } from './layout-metadata'

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

// Lazy load the VisitorTracker
const VisitorTracker = dynamic(
  () => import('@/components/VisitorTracker'),
  {
    ssr: false,
    loading: () => null
  }
)

// Lazy load the MetadataProvider for client-side metadata updates
const MetadataProvider = dynamic(
  () => import('@/components/MetadataProvider'),
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
        url: generateOGImageUrl({
          imageId: PAGE_OG_IMAGES.home.imageId,
          title: PAGE_OG_IMAGES.home.title,
          description: PAGE_OG_IMAGES.home.description,
          watermark: true
        }),
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
    images: [generateOGImageUrl({
      imageId: PAGE_OG_IMAGES.home.imageId,
      title: PAGE_OG_IMAGES.home.title,
      description: PAGE_OG_IMAGES.home.description,
      watermark: true
    })],
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
    google: '', // Add your actual Google Search Console verification code here
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
        {/* Preconnect to critical domains for faster loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Defer Google Analytics to improve initial load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defer GA loading until after page load
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  // Load GA after 1 second delay
                  setTimeout(function() {
                    var script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-B6V5FJ4ECZ';
                    document.head.appendChild(script);
                    
                    script.onload = function() {
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-B6V5FJ4ECZ');
                    };
                  }, 1000);
                });
              }
            `
          }}
        />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://investinpuglia.eu/#organization",
                  "name": "Invest in Puglia",
                  "url": "https://investinpuglia.eu",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://investinpuglia.eu/Logo_InvestInPuglia_Morph.png"
                  },
                  "description": "Expert advisory for PIA and Mini PIA non-refundable grants in Puglia, Italy",
                  "founder": {
                    "@type": "Person",
                    "name": "Giuseppe Funaro",
                    "jobTitle": "Investment Consultant",
                    "description": "Leading investment consultant specializing in EU grants and Italian property investment"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+39-351-400-1402",
                    "contactType": "customer service",
                    "email": "info@investinpuglia.eu",
                    "availableLanguage": ["English", "Italian", "German", "French", "Spanish"]
                  },
                  "sameAs": [
                    "https://facebook.com/investinpuglia",
                    "https://linkedin.com/in/giuseppe-funaro",
                    "https://wa.me/393514001402"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://investinpuglia.eu/#localbusiness",
                  "name": "Invest in Puglia - EU Grants Advisory",
                  "description": "Specialized consultancy for PIA Turismo, Mini PIA, and EU co-funded grants up to €2.75M",
                  "address": {
                    "@type": "PostalAddress",
                    "addressRegion": "Puglia",
                    "addressCountry": "IT"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "40.7517",
                    "longitude": "17.5877"
                  },
                  "areaServed": [
                    {
                      "@type": "GeoCircle",
                      "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": "40.7517",
                        "longitude": "17.5877"
                      },
                      "geoRadius": "200000"
                    }
                  ],
                  "priceRange": "€€€",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "127"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://investinpuglia.eu/#website",
                  "url": "https://investinpuglia.eu",
                  "name": "Invest in Puglia",
                  "description": "PIA & Mini PIA Grants Advisory - EU Co-Funded Non-Refundable Grants",
                  "publisher": {
                    "@id": "https://investinpuglia.eu/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://investinpuglia.eu/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  },
                  "inLanguage": ["en", "it", "de", "fr", "es"]
                }
              ]
            })
          }}
        />

        {/* Defer EmailJS SDK - load only when needed */}
        <Script id="emailjs-loader" strategy="lazyOnload">
          {`
            // Load EmailJS only when user interacts with forms
            function loadEmailJS() {
              if (window.emailJSLoaded) return;
              
              var script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
              script.onload = function() {
                if (window.emailjs) {
                  window.emailjs.init("wKn1_xMCtZssdZzpb");
                  window.emailJSLoaded = true;
                }
              };
              document.head.appendChild(script);
            }
            
            // Load on first user interaction with any form
            document.addEventListener('DOMContentLoaded', function() {
              var forms = document.querySelectorAll('form, input, textarea');
              forms.forEach(function(el) {
                el.addEventListener('focus', loadEmailJS, { once: true });
                el.addEventListener('click', loadEmailJS, { once: true });
              });
            });
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
          <MetadataProvider />
          <Navbar />

          <main className="pt-16">{children}</main>
          <Footer />
          <TrulloChatbotWrapper />
          <Toaster position="top-right" />
          <VisitorTracker />
        </AuthProvider>
      </body>
    </html>
  )
}
