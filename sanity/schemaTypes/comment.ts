import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'text',
    }),
    defineField({
      name: 'postSlug',
      type: 'string',
      title: 'Post Slug (ID)'
    }),
    defineField({
      name: 'avatar',
      type: 'string',
    }),
    defineField({
      name: 'platform',
      type: 'string',
      initialValue: 'website'
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})