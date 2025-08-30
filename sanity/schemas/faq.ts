import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Grants', value: 'grants' },
          { title: 'Properties', value: 'properties' },
          { title: 'Services', value: 'services' },
          { title: 'Legal', value: 'legal' },
          { title: 'Process', value: 'process' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pages',
      title: 'Display on Pages',
      type: 'array',
      of: [
        {
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
              { title: 'All Pages', value: 'all' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      pages: 'pages',
    },
    prepare(selection) {
      const { title, subtitle, pages } = selection
      return {
        title,
        subtitle: `${subtitle} • ${pages?.length || 0} pages`,
      }
    },
  },
})