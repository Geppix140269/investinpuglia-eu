import { Metadata } from 'next'
import RenovationExpertiseClient from './RenovationExpertiseClient'
import { getRenovationPageSettings, getFeaturedRenovationProjects } from '@/lib/sanity/renovation'

// Generate metadata from Sanity
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getRenovationPageSettings()
  
  // Use Sanity SEO settings if available, otherwise use defaults
  const seo = settings?.seo || {}
  
  return {
    title: seo.metaTitle || 'Renovation & Restructuring Expertise | Engineer Architect Cataldo Russo | InvestInPuglia',
    description: seo.metaDescription || 'Discover our exceptional renovation and restructuring projects in Puglia. Engineer Architect Cataldo Russo\'s portfolio showcases luxury hotels, historic restorations, and premium real estate transformations with proven ROI.',
    keywords: seo.keywords?.join(', ') || 'Puglia renovation, restructuring projects Italy, restoration expertise, Cataldo Russo architect',
    openGraph: {
      title: seo.metaTitle || 'Puglia Renovation & Restructuring Excellence',
      description: seo.metaDescription || 'Transform your investment with Puglia\'s leading renovation experts. 50+ successful projects, €95M+ development value, 30% average ROI.',
      url: 'https://investinpuglia.eu/renovation-expertise',
      siteName: 'InvestInPuglia',
      images: [
        {
          url: seo.ogImage || 'https://investinpuglia.eu/projects/baglioni-pool.jpg',
          width: 1200,
          height: 630,
          alt: 'Luxury renovation projects in Puglia',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle || 'Puglia Renovation & Restructuring Excellence',
      description: seo.metaDescription || 'Transform your investment with Puglia\'s leading renovation experts.',
      images: [seo.ogImage || 'https://investinpuglia.eu/projects/baglioni-pool.jpg'],
    },
    alternates: {
      canonical: 'https://investinpuglia.eu/renovation-expertise',
    },
  }
}

export default async function RenovationExpertisePage() {
  // Fetch data from Sanity
  const [pageSettings, featuredProjects] = await Promise.all([
    getRenovationPageSettings(),
    getFeaturedRenovationProjects()
  ])

  // Pass the data to the client component
  return <RenovationExpertiseClient pageSettings={pageSettings} projects={featuredProjects} />
}