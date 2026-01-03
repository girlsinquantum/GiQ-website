import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date and Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Virtual via Zoom',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Main)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Event Gallery (For Past Events)',
      description: 'Upload photos from the event here.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'registrationLink',
      title: 'Link (Registration or Recording)',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Webinar', value: 'Webinar' },
          { title: 'Workshop', value: 'Workshop' },
          { title: 'Conference', value: 'Conference' },
          { title: 'Panel', value: 'Panel' },
          { title: 'Hackathon', value: 'Hackathon' },
          { title: 'Quantum Conversations', value: 'Quantum Conversations' },
          { title: 'Interview', value: 'Interview' },
          { title: 'Research Program', value: 'Research Program' },


        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, date, media } = selection
      return {
        title: title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media: media,
      }
    },
  },
})