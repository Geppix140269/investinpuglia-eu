import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

// Fetch renovation page settings
export async function getRenovationPageSettings() {
  const query = groq`
    *[_type == "renovationPageSettings"][0] {
      hero {
        title,
        subtitle,
        "backgroundImage": backgroundImage.asset->url
      },
      statistics[] {
        value,
        label,
        icon
      },
      expertise[] {
        icon,
        title,
        description
      },
      aboutSection {
        title,
        content,
        "image": image.asset->url
      },
      investmentPerformance[] {
        value,
        label
      },
      cta {
        title,
        subtitle,
        primaryButton {
          text,
          link
        },
        secondaryButton {
          text,
          link
        }
      },
      currentOpportunities[] {
        title,
        description,
        investment,
        link
      },
      seo {
        metaTitle,
        metaDescription,
        keywords,
        "ogImage": ogImage.asset->url
      }
    }
  `
  
  return client.fetch(query)
}

// Fetch featured renovation projects
export async function getFeaturedRenovationProjects() {
  const query = groq`
    *[_type == "renovationProject" && featured == true] | order(order asc, publishedAt desc) [0...4] {
      _id,
      title,
      slug,
      category,
      status,
      location,
      description,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      investment {
        amount,
        roi,
        timeline,
        completionYear
      },
      metrics {
        size,
        rooms,
        capacity,
        occupancyRate,
        eventsPerYear
      },
      features
    }
  `
  
  return client.fetch(query)
}

// Fetch all renovation projects
export async function getAllRenovationProjects() {
  const query = groq`
    *[_type == "renovationProject"] | order(order asc, publishedAt desc) {
      _id,
      title,
      slug,
      category,
      status,
      location,
      description,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      investment {
        amount,
        roi,
        timeline,
        completionYear
      },
      metrics,
      features,
      architect,
      publishedAt
    }
  `
  
  return client.fetch(query)
}

// Fetch single renovation project by slug
export async function getRenovationProject(slug: string) {
  const query = groq`
    *[_type == "renovationProject" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      status,
      location,
      description,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      "gallery": gallery[]{
        "url": asset->url,
        alt,
        caption
      },
      beforeAfter {
        "beforeImage": beforeImage.asset->url,
        "afterImage": afterImage.asset->url,
        caption
      },
      investment,
      metrics,
      features,
      architect,
      details,
      testimonial,
      seo {
        metaTitle,
        metaDescription,
        keywords
      },
      publishedAt
    }
  `
  
  return client.fetch(query, { slug })
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Get category display name
export function getCategoryDisplayName(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'eco-resort': 'Eco-Resort Development',
    'luxury-hotel': '5-Star Hotel',
    'beach-resort': 'Beach Resort',
    'event-venue': 'Event Venue',
    'historic-restoration': 'Historic Restoration',
    'residential': 'Residential Conversion',
    'commercial': 'Commercial Development',
  }
  return categoryMap[category] || category
}