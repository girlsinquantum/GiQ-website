import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hackathon',
  title: 'Hackathon Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Is Hackathon Live?',
      type: 'boolean',
      description: 'Check this on Feb 23 to switch the page to Live Mode'
    }),
    defineField({
      name: 'announcements',
      title: 'Live Announcements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule Events',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'time', type: 'datetime' },
          { name: 'type', type: 'string', options: { list: ['Workshop', 'Hacking', 'Keynote', 'Social'] } },
          { name: 'speaker', type: 'string' }
        ]
      }]
    })
  ]
})