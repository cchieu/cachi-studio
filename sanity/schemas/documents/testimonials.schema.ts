import { Schema } from 'sanity-typescript'

/**
 * Testimonial document type - client testimonials
 */
export const testimonials = Schema.documentType({
  name: 'testimonials',
  title: 'Testimonial',
  type: 'document',
  singleton: false,

  fields: [
    {
      name: 'clientName',
      type: 'string',
      title: 'Client Name',
      description: 'The name of the client or person giving the testimonial',
      validation: Rule => Rule.required(),
    },
    {
      name: 'clientRole',
      type: 'string',
      title: 'Client Role',
      description: 'The role or title of the client',
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company',
      description: 'The client company or organization',
    },
    {
      name: 'testimonialText',
      type: 'text',
      title: 'Testimonial Text',
      description: 'The actual testimonial text',
      validation: Rule => Rule.required().min(20),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Client Photograph',
      description: 'The client photograph or logo',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Whether this testimonial is featured prominently',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      name: 'clientName',
    },
    prepare: ({ name }) => ({
      title: `Testimonial from ${name}`,
    }),
  },

  __experimental_actions: ['create', 'update', 'delete'],
})