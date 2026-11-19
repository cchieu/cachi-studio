import { schema } from '@tinacms/schema-tools'

export const services = schema({
  name: 'services',
  title: 'Services',
  type: 'document',
  columns: [
    { name: 'id', title: 'ID', type: 'string', hidden: true },
    { name: 'number', title: 'Number', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'blurb', title: 'Blurb', type: 'textarea' },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'involves', title: 'Involves', type: 'textarea' },
    { name: 'solves', title: 'Solves', type: 'textarea' },
    { name: 'receive', title: 'Receive', type: 'textarea' },
    {
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
})