// sanity-studio/schemaTypes/locationPage.ts

export const locationPageType = {
  name: 'locationPage',
  title: 'Location Page',
  type: 'document',
  fields: [
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'province',
      title: 'Province',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => `invest-in-${doc.city}-${doc.province}`.toLowerCase(),
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo', // Using the seo object type we created
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'population',
      title: 'Population',
      type: 'number',
    },
    {
      name: 'gdpPerCapita',
      title: 'GDP Per Capita (€)',
      type: 'number',
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
    },
    {
      name: 'mainIndustries',
      title: 'Main Industries',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'uniqueSellingPoints',
      title: 'Unique Selling Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'investmentIncentives',
      title: 'Investment Incentives',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'title', 
              type: 'string', 
              title: 'Incentive Title',
              validation: (Rule: any) => Rule.required(),
            },
            { 
              name: 'description', 
              type: 'text', 
              title: 'Description', 
              rows: 2 
            },
            { 
              name: 'percentage', 
              type: 'number', 
              title: 'Percentage/Amount' 
            },
          ],
        },
      ],
    },
    {
      name: 'keyStatistics',
      title: 'Key Statistics',
      type: 'object',
      fields: [
        { name: 'businessCount', type: 'number', title: 'Number of Businesses' },
        { name: 'unemploymentRate', type: 'number', title: 'Unemployment Rate %' },
        { name: 'averageRent', type: 'number', title: 'Average Commercial Rent €/m²' },
        { 
          name: 'skillsAvailability', 
          type: 'string', 
          title: 'Skills Availability', 
          options: {
            list: [
              { title: 'High', value: 'High' },
              { title: 'Medium', value: 'Medium' },
              { title: 'Low', value: 'Low' },
            ],
          }
        },
      ],
    },
    {
      name: 'transportLinks',
      title: 'Transport Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', type: 'string', title: 'Transport Type' },
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'distance', type: 'string', title: 'Distance' },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'province',
    },
    prepare({title, subtitle}: {title: string, subtitle: string}) {
      return {
        title: `${title}, ${subtitle}`,
        subtitle: 'Location Page',
      }
    },
  },
}
