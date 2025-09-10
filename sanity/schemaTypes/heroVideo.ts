import { defineType, defineField } from 'sanity'

export const heroVideoType = defineType({
  name: 'heroVideo',
  title: 'Hero Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'name',
      title: 'Display Name',
      type: 'string',
      description: 'Short name shown in video indicator (e.g., "Beach Club Aperitivo")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      description: 'Fallback image shown before video loads',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which videos appear in rotation (lower numbers first)',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this video should be included in the rotation',
      initialValue: true
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Internal description for content management'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'poster',
      order: 'order',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, media, order, isActive } = selection
      return {
        title: `${title}${!isActive ? ' (Inactive)' : ''}`,
        subtitle: `Order: ${order} | ${subtitle}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})

export default heroVideoType