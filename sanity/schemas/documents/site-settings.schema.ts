import { Schema } from 'sanity-typescript'

/**
 * Site Settings singleton - global website settings
 */
export const siteSettings = Schema.documentType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  singleton: true,

  fields: [
    {
      name: 'logo',
      type: 'image',
      title: 'Main Logo',
      description: 'The main logo displayed throughout the website',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'alternativeLogo',
      type: 'image',
      title: 'Alternative Logo',
      description: 'The alternative logo (e.g., for dark mode or header variations)',
    },
    {
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description: 'The favicon file for the website',
    },
    {
      name: 'contactEmail',
      type: 'string',
      title: 'Contact Email',
      description: 'The contact email address',
      validation: Rule => Rule.required().email(),
    },
    {
      name: 'contactPhone',
      type: 'string',
      title: 'Contact Phone',
      description: 'The contact phone number',
    },
    {
      name: 'address',
      type: 'text',
      title: 'Address',
      description: 'The studio\'s physical address',
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      description: 'Links to social media profiles',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              description: 'Social media platform (e.g., "LINKEDIN", "INSTAGRAM", "BEHANCE")',
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              type: 'string',
              title: 'Profile URL',
              description: 'The profile URL',
              validation: Rule => Rule.uri(),
            },
          ],
        },
      ],
    },
    initialValue: [
      { platform: 'LINKEDIN', url: 'https://linkedin.com' },
      { platform: 'INSTAGRAM', url: 'https://instagram.com' },
      { platform: 'BEHANCE', url: 'https://behance.net' },
    ],
    validation: Rule => Rule.min(1),
    },
    {
      name: 'footerDescription',
      type: 'text',
      title: 'Footer Description',
      description: 'The text displayed in the footer',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
      description: 'The copyright text displayed in the footer',
      validation: Rule => Rule.required().min(10),
    },
    {
      name: 'globalCtaTitle',
      type: 'string',
      title: 'Global CTA Title',
      description: 'The title for the global CTA section',
    },
    {
      name: 'globalCtaText',
      type: 'string',
      title: 'Global CTA Text',
      description: 'The text for the global CTA button',
    },
    {
      name: 'globalCtaUrl',
      type: 'string',
      title: 'Global CTA URL',
      description: 'The URL the global CTA button links to',
      validation: Rule => Rule.uri(),
    },
  ],

  preview: {
    select: {
      title: 'copyrightText',
    },
    prepare: ({ title }) => ({
      title: `Site Settings`,
    }),
  },

  __experimental_actions: ['create', 'update', 'delete'],
})