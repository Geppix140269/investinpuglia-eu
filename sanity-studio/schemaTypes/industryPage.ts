// sanity-studio/schemaTypes/industryPage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'industryPage',
  title: 'Industry Investment Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'industry',
      title: 'Industry Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'industry',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'marketSize',
      title: 'Market Size (€)',
      type: 'string',
    }),
    defineField({
      name: 'growthRate',
      title: 'Annual Growth Rate (%)',
      type: 'string',
    }),
    defineField({
      name: 'keyAdvantages',
      title: 'Key Advantages',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'availableGrants',
      title: 'Available Grants & Incentives',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'grantName', type: 'string', title: 'Grant Name' },
          { name: 'amount', type: 'string', title: 'Amount/Percentage' },
          { name: 'description', type: 'text', title: 'Description' },
        ]
      }],
    }),
    defineField({
      name: 'majorPlayers',
      title: 'Major Players/Success Stories',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'investmentOpportunities',
      title: 'Current Investment Opportunities',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'type', type: 'string', title: 'Opportunity Type' },
          { name: 'description', type: 'text', title: 'Description' },
          { name: 'investmentRange', type: 'string', title: 'Investment Range' },
        ]
      }],
    }),
    defineField({
      name: 'relatedLocations',
      title: 'Related Cities/Locations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'locationPage' }] }],
    }),
    defineField({
      name: 'statistics',
      title: 'Industry Statistics',
      type: 'object',
      fields: [
        { name: 'businesses', type: 'number', title: 'Number of Businesses' },
        { name: 'employees', type: 'number', title: 'Total Employees' },
        { name: 'exports', type: 'string', title: 'Annual Exports (€)' },
        { name: 'contribution', type: 'string', title: 'GDP Contribution (%)' },
      ]
    }),
  ],
  preview: {
    select: {
      title: 'industry',
      subtitle: 'slug.current',
    },
  },
})
