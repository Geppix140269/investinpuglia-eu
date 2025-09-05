import { Metadata } from 'next'
import Script from 'next/script'
import PortfolioClient from './PortfolioClientUpdated'
import { getAllRenovationProjects, getRenovationPageSettings } from '@/lib/sanity/renovation'
import { PAGE_OG_IMAGES, generateOGImageUrl } from '@/lib/og-images'
import { generateMetadata } from '@/lib/seo-metadata'

const ogImageUrl = generateOGImageUrl({
  imageId: PAGE_OG_IMAGES.portfolio.imageId,
  title: '30 Years of Excellence in Hospitality & Heritage',
  description: '€100M+ Projects, €25M Grants, 50+ Successful Developments',
  watermark: true
})

export const metadata: Metadata = {
  title: 'Portfolio - 30 Years of Hospitality & Heritage Excellence | Invest in Puglia',
  description: '€100M+ in projects managed, €25M in grants secured, 50+ successful developments. Explore our portfolio of luxury hotels, heritage restorations, and investment projects in Puglia.',
  keywords: 'puglia portfolio, hotel renovations italy, heritage restoration projects, luxury hotel development, investment portfolio puglia',
  openGraph: {
    title: '30 Years of Excellence in Hospitality & Heritage',
    description: '€100M+ Projects, €25M Grants, 50+ Successful Developments',
    url: 'https://investinpuglia.eu/portfolio',
    images: [ogImageUrl]
  }
}

export default async function PortfolioPage() {
  // Fetch all renovation projects from Sanity
  const [projects, pageSettings] = await Promise.all([
    getAllRenovationProjects(),
    getRenovationPageSettings()
  ])

  // If no projects from Sanity, use default data
  const projectsToDisplay = projects?.length > 0 ? projects : getDefaultProjects()

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio - Investment Projects in Puglia',
    description: 'Our portfolio of successful hotel renovations and heritage restoration projects',
    numberOfItems: projectsToDisplay.length,
    provider: {
      '@type': 'Organization',
      name: 'Invest in Puglia',
      url: 'https://investinpuglia.eu'
    }
  }

  return (
    <>
      <Script
        id="portfolio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioClient projects={projectsToDisplay} pageSettings={pageSettings} />
    </>
  )
}

// Default projects to show if Sanity has no data yet
function getDefaultProjects() {
  return [
    {
      _id: '2',
      title: 'Baglioni Hotel Masseria Muzza',
      slug: { current: 'baglioni-hotel' },
      category: 'luxury-hotel',
      status: 'completed',
      location: {
        city: 'Otranto',
        province: 'Lecce',
        region: 'Puglia'
      },
      description: 'Complete renovation of historic masseria into ultra-luxury hotel with 30 suites, Michelin-star restaurant potential, and world-class spa facilities.',
      mainImage: '/projects/baglioni-pool.jpg',
      investment: {
        completionYear: 2023
      },
      metrics: {
        size: '8,500 sqm',
        rooms: 30,
        capacity: 60
      },
      features: [
        'Luxury suites',
        'Michelin-star restaurant',
        'World-class spa',
        'Historic preservation'
      ],
      architect: 'Engineer Architect Cataldo Russo'
    },
    {
      _id: '3',
      title: 'Riva Marina Resort',
      slug: { current: 'riva-marina' },
      category: 'beach-resort',
      status: 'completed',
      location: {
        city: 'Carovigno',
        province: 'Brindisi',
        region: 'Puglia'
      },
      description: 'Transformation of coastal property into premier beach resort with 120 rooms, conference facilities, multiple restaurants, and private beach access.',
      mainImage: '/projects/riva-marina-exterior.jpg',
      investment: {
        completionYear: 2022
      },
      metrics: {
        size: '15,000 sqm',
        rooms: 120,
        capacity: 240,
        occupancyRate: 85
      },
      features: [
        'Private beach access',
        'Conference facilities',
        'Multiple restaurants',
        '4-star amenities'
      ],
      architect: 'Engineer Architect Cataldo Russo'
    },
    {
      _id: '4',
      title: 'Santa Lucia Estate',
      slug: { current: 'santa-lucia' },
      category: 'event-venue',
      status: 'completed',
      location: {
        city: 'Ostuni',
        province: 'Brindisi',
        region: 'Puglia'
      },
      description: 'Historic villa restoration creating exclusive wedding and event venue with accommodation for 50 guests, panoramic terraces, and traditional Puglian gardens.',
      mainImage: '/projects/santa-lucia-wedding.jpg',
      investment: {
        completionYear: 2021
      },
      metrics: {
        size: '5,000 sqm',
        capacity: 200,
        eventsPerYear: 150
      },
      features: [
        'Wedding venue',
        'Panoramic terraces',
        'Traditional gardens',
        'Guest accommodation'
      ],
      architect: 'Engineer Architect Cataldo Russo'
    },
    {
      _id: '5',
      title: 'B&B Blue Otranto',
      slug: { current: 'bb-blue-otranto' },
      category: 'residential',
      status: 'completed',
      location: {
        city: 'Otranto',
        province: 'Lecce',
        region: 'Puglia'
      },
      description: 'Boutique bed & breakfast with stunning sea views, modern amenities, and traditional Puglian architecture.',
      mainImage: '/projects/bb-blue-otranto-pool.jpg',
      investment: {
        completionYear: 2023
      },
      metrics: {
        size: '1,200 sqm',
        rooms: 8,
        capacity: 16
      },
      features: [
        'Sea view terraces',
        'Infinity pool',
        'Modern amenities',
        'Traditional architecture'
      ],
      architect: 'Engineer Architect Cataldo Russo'
    },
    {
      _id: '6',
      title: 'Donna Menga Resort',
      slug: { current: 'donna-menga' },
      category: 'luxury-hotel',
      status: 'completed',
      location: {
        city: 'Marina di Novaglie',
        province: 'Lecce',
        region: 'Puglia'
      },
      description: 'Cliffside luxury resort with breathtaking views of the Adriatic Sea and exclusive amenities.',
      mainImage: '/projects/donna-menga-exterior.jpg',
      investment: {
        completionYear: 2022
      },
      metrics: {
        size: '3,500 sqm',
        rooms: 25,
        capacity: 50
      },
      features: [
        'Cliffside location',
        'Luxury amenities',
        'Private beach access',
        'Gourmet restaurant'
      ],
      architect: 'Engineer Architect Cataldo Russo'
    }
  ]
}
