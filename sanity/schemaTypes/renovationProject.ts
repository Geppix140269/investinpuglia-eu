import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'renovationProject',
  title: 'Renovation Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          {title: 'Eco-Resort Development', value: 'eco-resort'},
          {title: '5-Star Hotel', value: 'luxury-hotel'},
          {title: 'Beach Resort', value: 'beach-resort'},
          {title: 'Event Venue', value: 'event-venue'},
          {title: 'Historic Restoration', value: 'historic-restoration'},
          {title: 'Residential Conversion', value: 'residential'},
          {title: 'Commercial Development', value: 'commercial'},
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planning', value: 'planning'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Delivered', value: 'delivered'},
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {name: 'city', type: 'string', title: 'City'},
        {name: 'province', type: 'string', title: 'Province'},
        {name: 'region', type: 'string', title: 'Region', initialValue: 'Puglia'},
      ],
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before/After Images',
      type: 'object',
      fields: [
        {
          name: 'beforeImage',
          title: 'Before Image',
          type: 'image',
          options: {hotspot: true},
        },
        {
          name: 'afterImage',
          title: 'After Image',
          type: 'image',
          options: {hotspot: true},
        },
        {
          name: 'caption',
          title: 'Transformation Caption',
          type: 'text',
          rows: 2,
        }
      ]
    }),
    defineField({
      name: 'investment',
      title: 'Investment Details',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Investment Amount (EUR)',
          type: 'number',
          validation: Rule => Rule.min(0),
        },
        {
          name: 'roi',
          title: 'ROI Percentage',
          type: 'number',
          validation: Rule => Rule.min(0).max(100),
        },
        {
          name: 'timeline',
          title: 'Project Timeline (months)',
          type: 'number',
        },
        {
          name: 'completionYear',
          title: 'Completion Year',
          type: 'number',
          validation: Rule => Rule.min(2000).max(2030),
        }
      ]
    }),
    defineField({
      name: 'metrics',
      title: 'Project Metrics',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Size (sqm or hectares)',
          type: 'string',
        },
        {
          name: 'rooms',
          title: 'Number of Rooms/Units',
          type: 'number',
        },
        {
          name: 'capacity',
          title: 'Guest Capacity',
          type: 'number',
        },
        {
          name: 'occupancyRate',
          title: 'Occupancy Rate (%)',
          type: 'number',
        },
        {
          name: 'eventsPerYear',
          title: 'Events Per Year',
          type: 'number',
        }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: Rule => Rule.max(100),
        }
      ]
    }),
    defineField({
      name: 'architect',
      title: 'Architect/Engineer',
      type: 'string',
      initialValue: 'Engineer Architect Cataldo Russo',
    }),
    defineField({
      name: 'details',
      title: 'Detailed Information',
      type: 'blockContent',
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', type: 'text', title: 'Quote'},
        {name: 'author', type: 'string', title: 'Author'},
        {name: 'role', type: 'string', title: 'Role/Company'},
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the main renovation page',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which projects appear (lower numbers first)',
      validation: Rule => Rule.min(0),
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
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      architect: 'architect',
      media: 'mainImage',
      category: 'category',
      status: 'status',
    },
    prepare(selection) {
      const {title, category, status} = selection
      return {
        title: title,
        subtitle: `${category} - ${status}`,
        media: selection.media,
      }
    },
  },
})