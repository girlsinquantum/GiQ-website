import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'reaction',
  title: 'Reaction',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      type: 'string',
    }),
    defineField({
      name: 'userName',
      type: 'string',
    }),
    defineField({
      name: 'type',
      type: 'string', 
    }),
    defineField({
      name: 'postSlug',
      type: 'string',
    }),
    defineField({
      name: 'timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})