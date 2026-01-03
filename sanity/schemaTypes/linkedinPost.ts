import { defineField, defineType } from 'sanity'

export const linkedinPost = defineType({
  name: 'linkedinPost',
  title: 'LinkedIn Highlight',
  type: 'document',
  fields: [
    defineField({
      name: 'postUrl',
      title: 'LinkedIn Post URL (Required)',
      type: 'url',
      description: 'Paste the full link to the post here.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Custom Title (Optional)',
      type: 'string',
      description: 'Leave empty to use a default "Latest Update" message.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Custom Image (Optional)',
      type: 'image',
      description: 'Leave empty to use a default cover image.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'postUrl',
      subtitle: 'title',
    },
  },
})