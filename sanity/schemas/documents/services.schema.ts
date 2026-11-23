import { Schema } from 'sanity-typescript'

/**
 * Service document type - service capabilities
 */
export const services = Schema.documentType({
  name: 'services',
  title: 'Service',
  type: 'document',
  singleton: false,

  fields: [
    {
      name: 'number',
      type: 'string',
      title: 'Service Number',
      description: 'The service number (e.g., "01", "02", "03", "04")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Service Title',
      description: 'The service title (e.g., "BRAND & IDENTITY")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'blurb',
      type: 'text',
      title: 'Blurb',
      description: 'A brief description of the service',
      validation: Rule => Rule.required().min(10),
    },
    {
      name: 'involves',
      type: 'text',
      title: 'Involves',
      description: 'What the service involves',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'solves',
      type: 'text',
      title: 'Solves',
      description: 'The problems this service solves',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'receive',
      type: 'text',
      title: 'What Clients Receive',
      description: 'What clients receive from this service',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'deliverables',
      type: 'array',
      title: 'Deliverables',
      description: 'List of deliverables for this service',
      of: [{ type: 'string' }],
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Whether this service is featured prominently',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      number: 'number',
      title: 'title',
    },
    prepare: ({ number, title }) => ({
      title: `Service ${number}: ${title}`,
    }),
  },

  __experimental_actions: ['create', 'update', 'delete'],
})