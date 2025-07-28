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
      validation: (Rule: any) => Rule.max(65).warning('Longer titles may be truncated in search results'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (max 155 characters)',
      validation: (Rule: any) => Rule.max(155).warning('Longer descriptions may be truncated'),
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
