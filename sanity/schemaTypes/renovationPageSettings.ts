import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'renovationPageSettings',
  title: 'Renovation Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Renovation Page Settings',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          rows: 2,
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }
      ]
    }),
    defineField({
      name: 'statistics',
      title: 'Key Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon (emoji or text)',
              type: 'string',
            }
          ]
        }
      ],
      validation: Rule => Rule.max(4),
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon (emoji)',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            }
          ]
        }
      ],
      validation: Rule => Rule.max(6),
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'blockContent',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }
      ]
    }),
    defineField({
      name: 'investmentPerformance',
      title: 'Investment Performance Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
            }
          ]
        }
      ],
      validation: Rule => Rule.max(4),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'CTA Subtitle',
          type: 'string',
        },
        {
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            {name: 'text', type: 'string', title: 'Button Text'},
            {name: 'link', type: 'string', title: 'Button Link'},
          ]
        },
        {
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            {name: 'text', type: 'string', title: 'Button Text'},
            {name: 'link', type: 'string', title: 'Button Link'},
          ]
        }
      ]
    }),
    defineField({
      name: 'currentOpportunities',
      title: 'Current Investment Opportunities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Opportunity Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'investment',
              title: 'Investment Amount',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Learn More Link',
              type: 'string',
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
        }
      ]
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Renovation Page Settings',
      }
    },
  },
})