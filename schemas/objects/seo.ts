// schemas/objects/seo.ts
// Reusable SEO object that can be added to any document type

export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (max 65 characters)',
      validation: Rule => Rule.max(65).warning('Longer titles may be truncated in search results'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (max 155 characters)',
      validation: Rule => Rule.max(155).warning('Longer descriptions may be truncated'),
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Primary keyword to target',
    },
    {
      name: 'keywords',
      title: 'Additional Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The canonical URL for this page (if different from default)',
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630 recommended)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Hide this page from search engines',
      initialValue: false,
    },
    {
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      description: 'Tell search engines not to follow links on this page',
      initialValue: false,
    },
  ],
};

// schemas/sectorPage.ts
// Example schema for programmatic sector pages

export default {
  name: 'sectorPage',
  title: 'Sector/Industry Page',
  type: 'document',
  fields: [
    {
      name: 'sectorName',
      title: 'Sector Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'sectorName',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo', // Using our reusable SEO object
    },
    {
      name: 'marketSize',
      title: 'Market Size (€)',
      type: 'number',
    },
    {
      name: 'growthRate',
      title: 'Annual Growth Rate (%)',
      type: 'number',
    },
    {
      name: 'keyPlayers',
      title: 'Key Players',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'companyName', type: 'string', title: 'Company Name'},
          {name: 'employees', type: 'number', title: 'Employees'},
          {name: 'revenue', type: 'number', title: 'Annual Revenue (€)'},
        ],
      }],
    },
    {
      name: 'incentives',
      title: 'Sector-Specific Incentives',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'incentive'}]}],
    },
    {
      name: 'successStories',
      title: 'Success Stories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
    },
    {
      name: 'content',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          fields: [
            {name: 'heading', type: 'string', title: 'Section Heading'},
            {name: 'content', type: 'portableText', title: 'Content'},
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'sectorName',
      subtitle: 'seo.focusKeyword',
    },
  },
};

// utils/generateSitemaps.ts
// Automated sitemap generation for all programmatic pages

import { client } from '@/lib/sanity/client';
import { MetadataRoute } from 'next';

export async function generateSitemaps(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://investinpuglia.eu';
  
  // Fetch all location pages
  const locations = await client.fetch(`
    *[_type == "locationPage"] {
      slug,
      _updatedAt
    }
  `);
  
  // Fetch all sector pages
  const sectors = await client.fetch(`
    *[_type == "sectorPage"] {
      slug,
      _updatedAt
    }
  `);
  
  // Fetch all blog posts
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug,
      _updatedAt
    }
  `);
  
  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Location pages
    ...locations.map((location) => ({
      url: `${baseUrl}/locations/${location.slug.current}`,
      lastModified: new Date(location._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Sector pages
    ...sectors.map((sector) => ({
      url: `${baseUrl}/sectors/${sector.slug.current}`,
      lastModified: new Date(sector._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Blog posts
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
  
  return sitemap;
}

// lib/structuredData.ts
// Generate structured data for better SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'InvestinPuglia',
    url: 'https://investinpuglia.eu',
    logo: 'https://investinpuglia.eu/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-080-123-4567',
      contactType: 'Investment Support',
      areaServed: 'IT',
      availableLanguage: ['English', 'Italian', 'German', 'French', 'Arabic', 'Chinese'],
    },
    sameAs: [
      'https://www.linkedin.com/company/investinpuglia',
      'https://twitter.com/investinpuglia',
    ],
  };
}

export function generateFAQSchema(faqs: Array<{question: string; answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
