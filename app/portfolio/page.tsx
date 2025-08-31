import { Metadata } from 'next'
import PortfolioClient from './PortfolioClientUpdated'
import { getAllRenovationProjects, getRenovationPageSettings } from '@/lib/sanity/renovation'
import { PAGE_OG_IMAGES, generateOGImageUrl } from '@/lib/og-images'

const ogImageUrl = generateOGImageUrl({
  imageId: PAGE_OG_IMAGES.portfolio.imageId,
  title: PAGE_OG_IMAGES.portfolio.title,
  description: PAGE_OG_IMAGES.portfolio.description,
  watermark: true
})

export const metadata: Metadata = {
  title: 'Investment Portfolio - 35+ Luxury Hotels & Resorts | InvestInPuglia',
  description: 'Discover our portfolio: 35+ successfully developed hotels & resorts in Puglia. €80M+ in projects, €20M grants secured. VOI Alimini, Masseria Muzza 5*, Le Cale d\'Otranto. 29 years of proven excellence.',
  keywords: 'Puglia hotel portfolio, luxury resort development, investment portfolio Italy, PIA Turismo grants, Titolo II funding, VOI Hotels Alpitour, Masseria restoration, Otranto hotels, tourism investment Puglia',
  openGraph: {
    title: 'Investment Portfolio - 35+ Luxury Hotels & Resorts in Puglia',
    description: 'View our impressive portfolio: €80M+ in successful projects, €20M grants secured. 29 years developing luxury tourism in Puglia.',
    url: 'https://investinpuglia.eu/portfolio',
    siteName: 'InvestInPuglia',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'InvestInPuglia Portfolio - Luxury Hotels & Resorts Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio: 35+ Hotels & Resorts Successfully Developed in Puglia',
    description: '€80M+ projects completed, €20M grants secured. 29 years of excellence in tourism development.',
    images: [ogImageUrl],
  },
  alternates: {
    canonical: 'https://investinpuglia.eu/portfolio',
  },
}

export default async function PortfolioPage() {
  // Fetch all renovation projects from Sanity
  const [projects, pageSettings] = await Promise.all([
    getAllRenovationProjects(),
    getRenovationPageSettings()
  ])

  // If no projects from Sanity, use default data
  const projectsToDisplay = projects?.length > 0 ? projects : getDefaultProjects()

  return <PortfolioClient projects={projectsToDisplay} pageSettings={pageSettings} />
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