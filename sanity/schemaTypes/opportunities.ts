import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'opportunity',
  title: 'Opportunity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Internship', 'PhD', 'Research', 'Engineer', 'Education', 'Hackathon', 'Mentorship']
      }
    }),
    defineField({
      name: 'link',
      title: 'Application Link',
      type: 'url',
    }),
    defineField({
      name: 'deadline',
      title: 'Application Deadline',
      type: 'date',
      description: 'Leave blank if rolling/unknown.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date Discovered',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'fingerprint',
      title: 'Fingerprint',
      type: 'string',
      readOnly: true, 
    }),
    defineField({
      name: 'isLive',
      title: 'Is Live?',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'logo',
      title: 'Logo URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
    }
  }
})