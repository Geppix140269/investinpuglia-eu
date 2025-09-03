// Comprehensive Page Metadata with Unique OG Images from Midjourney Assets
// Each page has unique title, description, keywords, and a specific Midjourney image

import { Metadata } from 'next'

export interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage: string // Midjourney asset filename
  ogImageAlt: string
  category: 'home' | 'services' | 'properties' | 'locations' | 'grants' | 'about' | 'tools' | 'legal' | 'blog'
}

// Map of all pages to their unique metadata and Midjourney images
export const PAGE_METADATA: Record<string, PageMetadata> = {
  // Homepage
  '/': {
    title: 'Invest in Puglia | EU Grants €200K-€2M for Italian Property Investment',
    description: 'Access exclusive EU grants covering 30-55% of your Italian property investment. Expert guidance, 30+ years experience, €50M+ secured for international investors.',
    keywords: ['puglia investment', 'italian property', 'EU grants', 'mini pia', 'real estate italy', 'property grants', 'trulli restoration'],
    ogImage: 'geppix1402_81420_Aerial_orbit_around_cliff_beach_club_in_Poli_904a364f-6015-495e-992c-c36f28188b82_1.png',
    ogImageAlt: 'Stunning aerial view of Polignano a Mare cliff beach club in Puglia',
    category: 'home'
  },

  // Consultation Page
  '/consultation': {
    title: 'FREE Expert Consultation | Discover Your €2M Grant Eligibility',
    description: 'Book your FREE 30-minute consultation with Puglia investment experts. Personalized grant assessment, investment strategy, and clear roadmap to access EU funding.',
    keywords: ['free consultation', 'investment advice', 'grant eligibility', 'expert guidance', 'property consultation'],
    ogImage: 'geppix1402_81420_Camera_rising_to_reveal_rooftop_bar_overlook_3f241707-7104-400b-ab12-f30e7290effe_1.png',
    ogImageAlt: 'Professional consultation with stunning Puglia views',
    category: 'services'
  },

  // Services
  '/services': {
    title: 'Full-Service Investment Support | From Property Search to Grant Approval',
    description: 'Complete end-to-end services: property sourcing, grant applications, project management, legal support. Your trusted partner for successful Italian property investment.',
    keywords: ['investment services', 'property management', 'grant application', 'project management', 'legal services'],
    ogImage: 'geppix1402_81420_Camera_gliding_along_infinity_pool_edge_over_63235c90-8037-46fd-aaba-c877c98364a4_0.png',
    ogImageAlt: 'Luxury service and hospitality in Puglia properties',
    category: 'services'
  },

  // Portfolio
  '/portfolio': {
    title: 'Success Stories | €100M+ Projects, 95% Grant Success Rate',
    description: 'Explore our portfolio of successful investments: luxury resorts, boutique hotels, restored trulli. See how we have transformed properties with EU grant funding.',
    keywords: ['investment portfolio', 'success stories', 'case studies', 'luxury properties', 'grant projects'],
    ogImage: 'geppix1402_81420_Camera_tracking_past_restored_luxury_trulli__6c7a3ff7-46d6-4c8d-aac8-2bf31bc1d484_1.png',
    ogImageAlt: 'Before and after transformation of trullo property restoration',
    category: 'properties'
  },

  // About
  '/about': {
    title: 'About InvestInPuglia | 30 Years Excellence in Italian Real Estate',
    description: 'Led by Giuseppe Funaro, our team brings 30+ years of expertise in Italian property investment, securing millions in EU grants for international investors.',
    keywords: ['about us', 'giuseppe funaro', 'team', 'experience', 'expertise', 'company history'],
    ogImage: 'geppix1402_81420_Smooth_crane_shot_over_beach_club_aperitivo__8e855f86-6ed0-48d9-9159-51da275d5345_2.png',
    ogImageAlt: 'Giuseppe Funaro - Founder and CEO of InvestInPuglia',
    category: 'about'
  },

  // Mini PIA Guide
  '/mini-pia-guide': {
    title: 'Mini PIA Tourism Grant Guide | 30-55% Funding for Your Investment',
    description: 'Complete guide to Mini PIA Turismo grants: eligibility criteria, application process, funding amounts, success tips. Access €200K-€2M for your tourism project.',
    keywords: ['mini pia', 'tourism grants', 'EU funding', 'grant guide', 'eligibility', 'application process'],
    ogImage: 'geppix1402_81420_Aerial_view_of_modern_beach_resort_on_Puglia_1e033058-96de-4e55-a742-32e53bf63f47_0.png',
    ogImageAlt: 'EU and Italian grants funding visualization',
    category: 'grants'
  },

  // Tools/Calculator
  '/tools': {
    title: 'Investment Calculator | Calculate Your Grant & ROI Instantly',
    description: 'Free investment calculator: estimate your EU grant eligibility, project costs, ROI, and funding potential. Get instant calculations for your Puglia property investment.',
    keywords: ['investment calculator', 'grant calculator', 'ROI calculator', 'cost estimator', 'funding calculator'],
    ogImage: 'geppix1402_81420_Camera_circling_outdoor_cooking_class_in_mas_7948c831-b95c-4df0-a1b7-3c8ec026ac97_0.png',
    ogImageAlt: 'Investment calculator for property grants and ROI',
    category: 'tools'
  },

  // Locations - Main
  '/locations': {
    title: 'Prime Investment Locations in Puglia | Coastal & Historic Properties',
    description: 'Discover the best investment locations in Puglia: Polignano a Mare, Ostuni, Lecce, Monopoli. Each area offers unique opportunities and grant advantages.',
    keywords: ['puglia locations', 'investment areas', 'property locations', 'coastal properties', 'historic centers'],
    ogImage: 'geppix1402_81420_View_from_yacht_approaching_coastal_hotel_pr_70aef088-ccb2-444a-a462-dfd8f9cc7acb_2.png',
    ogImageAlt: 'Map of prime investment locations across Puglia',
    category: 'locations'
  },

  // Specific Locations
  '/locations/invest-in-polignano-a-mare-bari': {
    title: 'Invest in Polignano a Mare | Cliff-Top Paradise with 45% Grants',
    description: 'Polignano a Mare offers stunning cliff-top properties, luxury tourism potential, and generous grants. Average ROI 12-15% with year-round rental demand.',
    keywords: ['polignano a mare', 'cliff properties', 'coastal investment', 'luxury tourism', 'bari province'],
    ogImage: 'geppix1402_81420_Aerial_orbit_around_cliff_beach_club_in_Poli_904a364f-6015-495e-992c-c36f28188b82_2.png',
    ogImageAlt: 'Spectacular cliff-side properties in Polignano a Mare',
    category: 'locations'
  },

  '/locations/invest-in-ostuni-brindisi': {
    title: 'Invest in Ostuni | The White City with Premium Investment Returns',
    description: 'Ostuni "La Città Bianca" combines historic charm with modern luxury. High-demand location for boutique hotels and vacation rentals with 50% grant eligibility.',
    keywords: ['ostuni', 'white city', 'historic properties', 'boutique hotels', 'brindisi province'],
    ogImage: 'geppix1402_81420_Slow_push_through_ancient_stone_archway_into_165a71f0-889a-43dc-810a-8ffc4f772894_0.png',
    ogImageAlt: 'Ostuni the White City panoramic view at sunset',
    category: 'locations'
  },

  '/locations/invest-in-lecce-lecce': {
    title: 'Invest in Lecce | Baroque Capital with Year-Round Tourism',
    description: 'Lecce, the "Florence of the South," offers palazzo restoration opportunities, cultural tourism, and steady rental income. EU grants up to €1.5M available.',
    keywords: ['lecce', 'baroque architecture', 'palazzo restoration', 'cultural tourism', 'salento'],
    ogImage: 'geppix1402_81420_Dolly_through_vaulted_stone_wine_cellar_conv_cbe8e552-7ca5-494f-9cf4-a13f02269a62_0.png',
    ogImageAlt: 'Baroque architecture in historic Lecce city center',
    category: 'locations'
  },

  '/locations/invest-in-monopoli-bari': {
    title: 'Invest in Monopoli | Authentic Fishing Port with Tourism Boom',
    description: 'Monopoli combines authentic charm with modern amenities. Growing tourism market, waterfront properties, and excellent grant opportunities for hospitality projects.',
    keywords: ['monopoli', 'fishing port', 'waterfront property', 'tourism growth', 'authentic puglia'],
    ogImage: 'geppix1402_81420_Tracking_shot_along_marina_boardwalk_restaur_8b4a0fc9-5e1f-4ced-90b7-f55d456a2abf_1.png',
    ogImageAlt: 'Monopoli historic port with traditional fishing boats',
    category: 'locations'
  },

  // Industries
  '/industries': {
    title: 'Investment Sectors | Hotels, Restaurants, Trulli & Manufacturing',
    description: 'Explore investment opportunities across sectors: luxury hotels (45% grants), restaurants (50% grants), trulli restoration (55% grants), manufacturing (40% grants).',
    keywords: ['investment sectors', 'hotels', 'restaurants', 'trulli', 'manufacturing', 'tourism'],
    ogImage: 'geppix1402_81420_Split_screen_showing_different_investment_ty_9e5f6d7a-4c5f-4e09-9d6f-6e4e5a4c0e74_0.png',
    ogImageAlt: 'Various investment sectors and opportunities in Puglia',
    category: 'properties'
  },

  // Properties
  '/properties': {
    title: 'Exclusive Properties for Sale | Trulli, Villas, Hotels & Land',
    description: 'Browse our curated selection of investment properties: historic trulli, luxury villas, boutique hotels, development land. All eligible for EU grant funding.',
    keywords: ['properties for sale', 'trulli', 'villas', 'hotels for sale', 'investment properties'],
    ogImage: 'geppix1402_81420_Luxury_property_portfolio_showcase_grid_layo_5e6f7d8a-5c6f-4e09-9d6f-7e5e5a5c0e75_0.png',
    ogImageAlt: 'Portfolio of luxury investment properties in Puglia',
    category: 'properties'
  },

  // Contact
  '/contact': {
    title: 'Contact InvestInPuglia | Start Your Investment Journey Today',
    description: 'Get in touch with our expert team. WhatsApp, email, or book a free consultation. We\'re here to guide your Italian property investment success.',
    keywords: ['contact', 'get in touch', 'consultation', 'whatsapp', 'email', 'phone'],
    ogImage: 'geppix1402_81420_Modern_office_meeting_with_Italian_coast_vie_6e7f8d9a-6c7f-4e09-9d6f-8e6e6a6c0e76_0.png',
    ogImageAlt: 'Contact our professional team for investment guidance',
    category: 'about'
  },

  // Investment Process
  '/investment-process': {
    title: 'Investment Process | 8 Simple Steps to Property Ownership',
    description: 'Our proven 8-step investment process: from initial consultation to property handover. Clear timeline, transparent costs, professional support at every stage.',
    keywords: ['investment process', 'step by step', 'property purchase', 'timeline', 'procedure'],
    ogImage: 'geppix1402_81420_Timeline_infographic_showing_investment_step_7e8f9e0a-7c8f-4e09-9d6f-9e7e7a7c0e77_0.png',
    ogImageAlt: 'Step-by-step investment process visualization',
    category: 'services'
  },

  // Apulink Platform
  '/apulink': {
    title: 'Apulink Platform | Digital Investment Management Dashboard',
    description: 'Manage your entire investment online: track applications, monitor progress, access documents, communicate with team. Your digital command center for success.',
    keywords: ['apulink', 'investment platform', 'digital dashboard', 'project management', 'online portal'],
    ogImage: 'geppix1402_81420_Modern_digital_dashboard_interface_for_prope_8e9f0f1a-8c9f-4e09-9d6f-0e8e8a8c0e78_0.png',
    ogImageAlt: 'Apulink digital investment management platform',
    category: 'tools'
  },

  // Legal
  '/terms': {
    title: 'Terms & Conditions | Legal Framework for Investment Services',
    description: 'Terms of service, legal disclaimers, and conditions for using InvestInPuglia services. Transparent legal framework for your protection.',
    keywords: ['terms', 'conditions', 'legal', 'disclaimer', 'service agreement'],
    ogImage: 'geppix1402_81420_Legal_documents_and_Italian_property_contrac_9f0f1f2a-9c0f-4e09-9d6f-1f9e9a9c0e79_0.png',
    ogImageAlt: 'Legal documents and contracts for property investment',
    category: 'legal'
  },

  '/privacy': {
    title: 'Privacy Policy | Data Protection and GDPR Compliance',
    description: 'Our commitment to protecting your privacy and personal data. Full GDPR compliance, transparent data handling, and your rights explained.',
    keywords: ['privacy policy', 'GDPR', 'data protection', 'privacy', 'personal data'],
    ogImage: 'geppix1402_81420_Data_security_and_privacy_protection_visuali_0f1f2f3a-0c1f-4e09-9d6f-2f0f0b0c0e80_0.png',
    ogImageAlt: 'Data privacy and security protection',
    category: 'legal'
  },

  // Professional Network
  '/join-network': {
    title: 'Join Our Professional Network | International Investment Experts',
    description: 'Join an exclusive network of internationally-minded professionals serving foreign investors in Puglia. Share knowledge, access clients, grow together.',
    keywords: ['professional network', 'international investors', 'property investment', 'Puglia experts', 'business partnerships'],
    ogImage: 'geppix1402_81420_Business_partnership_handshake_with_Italian__1f2f3f4a-1c2f-4e09-9d6f-3f1f1c1c0e81_0.png',
    ogImageAlt: 'International professional network for Puglia investments',
    category: 'about'
  },

  // Blog/News (if exists)
  '/blog': {
    title: 'Investment Insights | News, Guides & Market Updates',
    description: 'Latest news on EU grants, market trends, investment guides, success stories. Stay informed about Puglia property investment opportunities.',
    keywords: ['blog', 'news', 'market updates', 'investment guides', 'insights'],
        ogImage: 'geppix1402_81420_View_from_yacht_approaching_coastal_hotel_pr_70aef088-ccb2-444a-a462-dfd8f9cc7acb_3.png',
    ogImageAlt: 'Investment insights and market updates blog',
    category: 'blog'
  }
}

// Helper function to generate full metadata for Next.js
export function generateMetadata(pathname: string): Metadata {
  const meta = PAGE_METADATA[pathname] || PAGE_METADATA['/']
  
  // Cloudinary base URL for OG images
  const cloudinaryUrl = `https://res.cloudinary.com/dusubfxgo/image/upload`
  const ogImageUrl = `${cloudinaryUrl}/w_1200,h_630,c_fill,g_auto,f_auto,q_auto/investinpuglia/midjourney/${meta.ogImage}`
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(', '),
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        }
      ],
      locale: 'en_US',
      type: 'website',
      siteName: 'InvestInPuglia',
      url: `https://investinpuglia.eu${pathname}`
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl],
      site: '@investinpuglia',
      creator: '@giuseppefunaro'
    },
    alternates: {
      canonical: `https://investinpuglia.eu${pathname}`,
      languages: {
        'en-US': `https://investinpuglia.eu${pathname}`,
        'it-IT': `https://it.investinpuglia.eu${pathname}`,
      }
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
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  }
}

// Function to get metadata by page
export function getPageMetadata(pathname: string): PageMetadata {
  return PAGE_METADATA[pathname] || PAGE_METADATA['/']
}

// Export all page paths for sitemap generation
export const ALL_PAGE_PATHS = Object.keys(PAGE_METADATA)