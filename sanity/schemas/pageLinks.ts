import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageLinks',
  title: 'Page Internal Links',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'home' },
          { title: 'Services', value: 'services' },
          { title: 'Properties', value: 'properties' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
          { title: 'Mini PIA Guide', value: 'miniPiaGuide' },
          { title: 'Book Consultation', value: 'bookConsultation' },
          { title: 'Tools', value: 'tools' },
          { title: 'Investment Process', value: 'investmentProcess' },
          { title: 'Locations', value: 'locations' },
          { title: 'Industries', value: 'industries' },
          { title: 'Portfolio', value: 'portfolio' },
          { title: 'Blog', value: 'blog' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedLinks',
      title: 'Related Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Internal link path (e.g., /services, /properties)',
            },
            {
              name: 'description',
              title: 'Description (optional)',
              type: 'string',
              description: 'Brief description for SEO',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Section Title',
      type: 'string',
      description: 'Title for the related links section',
      initialValue: 'Explore More Resources',
    }),
  ],
  preview: {
    select: {
      title: 'page',
      links: 'relatedLinks',
    },
    prepare(selection) {
      const { title, links } = selection
      return {
        title: title || 'Untitled',
        subtitle: `${links?.length || 0} related links`,
      }
    },
  },
})