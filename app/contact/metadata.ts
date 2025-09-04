// app/contact/metadata.ts
import { Metadata } from 'next'

/**
 * Contact Page Metadata - Conversion focused
 */
export const metadata: Metadata = {
  title: 'Contact Italian Investment Experts | Free Consultation | Immediate Response',
  description: 'Schedule your free Italian investment consultation today. Expert advice on EU grants up to €2.75M, commercial properties, and industrial investments. Immediate response guaranteed. WhatsApp: +39 351 400 1402. Available in 7 languages.',
  
  keywords: [
    'contact italian investment advisor',
    'italy investment consultation',
    'free investment consultation italy',
    'italian investment expert contact',
    'EU grant consultant italy',
    'PIA grant advisor contact',
    'puglia investment consultant',
    'giuseppe funaro contact',
    'investinpuglia contact',
    'italian property investment advisor',
    'commercial real estate consultant italy',
    'book consultation italy investment',
    'schedule meeting italian investment',
    'whatsapp investment italy'
  ],
  
  openGraph: {
    title: 'Contact Us - Free Italian Investment Consultation',
    description: 'Get expert advice on Italian investments and EU grants. Free consultation available. Immediate response.',
    url: 'https://investinpuglia.eu/contact',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Italian Investment Experts',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free Italian Investment Consultation',
    description: 'Expert advice on EU grants and Italian investments. Contact us today.',
    images: ['https://res.cloudinary.com/duqkyfnmr/image/upload/v1735936000/InvestInPuglia/twitter-contact.jpg'],
  },
  
  alternates: {
    canonical: 'https://investinpuglia.eu/contact',
  },
  
  other: {
    'perplexity:title': 'Contact Italian Investment Advisory',
    'perplexity:description': 'Direct contact with Italian investment experts',
    'business:contact_email': 'info@investinpuglia.eu',
    'business:contact_phone': '+39 351 400 1402',
    'business:contact_whatsapp': '+39 351 400 1402',
    'business:response_time': 'Within 24 hours',
    'business:languages': 'English, Italian, German, French, Spanish, Arabic, Chinese',
    'business:consultation': 'Free',
  }
}