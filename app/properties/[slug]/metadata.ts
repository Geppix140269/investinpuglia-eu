import { Metadata } from 'next'
import { mockProperties } from '@/lib/properties/data'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const property = mockProperties.find(p => p.slug === params.slug)
  
  if (!property) {
    return {
      title: 'Property Not Found | Invest in Puglia',
      description: 'The requested property could not be found.'
    }
  }

  const title = `${property.title} - €${property.price.toLocaleString()} | Invest in Puglia`
  const description = `${property.description.short} ${property.location.city}, ${property.location.province}. ${property.investment.potentialReturn}. Eligible for Mini PIA grants.`
  const image = property.images[0]?.url || 'https://investinpuglia.eu/og-image.png'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://investinpuglia.eu/properties/${property.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: property.title
        }
      ],
      locale: 'en_US',
      siteName: 'Invest in Puglia'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    },
    alternates: {
      canonical: `https://investinpuglia.eu/properties/${property.slug}`
    },
    other: {
      'property:type': property.type,
      'property:price': `€${property.price.toLocaleString()}`,
      'property:location': `${property.location.city}, ${property.location.province}`,
      'property:size': `${property.details.squareMeters}m²`
    }
  }
}