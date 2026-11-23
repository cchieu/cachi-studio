import { Schema, array, attr } from 'sanity-typescript'

/**
 * Homepage singleton - manages all homepage sections
 * This is a singleton document type, meaning there should only be one
 * document of this type in the dataset.
 */
export const homepage = Schema.documentType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  // Singleton configuration - only one document of this type per dataset
  singleton: true,
  // Default CSS classes for the studio interface
  __experimental_actions: ['create', 'update', 'delete'],

  fields: [
    // Hero section
    {
      name: 'heroTagline',
      type: 'string',
      title: 'Hero Tagline',
      description: 'The short tagline displayed under the logo in the hero section',
      // Validation to ensure it's not empty
      validation: Rule => Rule.required().min(5),
    },
    {
      name: 'heroSubtitle',
      type: 'string',
      title: 'Hero Subtitle',
      description: 'The main headline displayed prominently in the hero section',
      validation: Rule => Rule.required().min(10),
    },

    // Intro section
    {
      name: 'aboutDescription',
      type: 'text',
      title: 'About Description',
      description: 'The paragraph text displayed in the introduction section below the hero',
      validation: Rule => Rule.required().min(20),
    },

    // Pillars section - array of 3 pillar objects
    {
      name: 'pillars',
      type: 'array',
      title: 'Pillars',
      description: 'The three main belief/pillars sections displayed on the homepage',
      of: [
        {
          type: 'object',
          name: 'pillar',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Pillar Title',
              description: 'The title of the pillar (e.g., "HUMAN THINKING")',
              validation: Rule => Rule.required(),
            },
            {
              name: 'copy',
              type: 'text',
              title: 'Pillar Copy',
              description: 'The descriptive text for this pillar',
              validation: Rule => Rule.required().min(10),
            },
          ],
          // Optional: customize how pills are displayed in the studio
          options: {
            richTextOptions: {
              // Editor options for the copy field
            },
          },
        },
      ],
      validation: Rule => Rule.min(3).max(3), // Must have exactly 3 pillars,
    },

    // Final CTA section
    {
      name: 'finalCtaTitle',
      type: 'string',
      title: 'Final CTA Title',
      description: 'The main title of the final CTA section (e.g., "HAVE A CHALLENGE")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'finalCtaSubtitle',
      type: 'string',
      title: 'Final CTA Subtitle',
      description: 'The subtitle of the final CTA section (e.g., "WORTH SOLVING?")',
      validation: Rule => Rule.required(),
    },

    // Contact section
    {
      name: 'contactEmail',
      type: 'string',
      title: 'Contact Email',
      description: 'The email address displayed in the footer and contact sections',
      validation: Rule => Rule.required().email(),
    },
    {
      name: 'contactWhatsApp',
      type: 'string',
      title: 'WhatsApp Number',
      description: 'The WhatsApp number displayed in the footer',
      validation: Rule => Rule.required(),
    },

    // Navigation
    {
      name: 'primaryMenu',
      type: 'array',
      title: 'Primary Menu',
      description: 'Navigation links displayed in the header',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Menu Label',
              description: 'The text displayed in the menu (e.g., "HOME", "WORK")',
              validation: Rule => Rule.required(),
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link URL',
              description: 'The URL the menu item links to',
              validation: Rule => Rule.uri(),
            },
            {
              name: 'isExternal',
              type: 'boolean',
              title: 'Is External',
              description: 'Whether this link opens in a new tab',
              initialValue: false,
            },
          ],
        },
      ],
    },

    // Footer/Global
    {
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
      description: 'The copyright text displayed in the footer',
      validation: Rule => Rule.required().min(10),
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

    // Marquee text
    {
      name: 'marqueeItems',
      type: 'array',
      title: 'Marquee Items',
      description: 'The text items that scroll in the top marquee',
      of: [
        {
          type: 'string',
        },
      ],
      initialValue: ['BEYOND THE BRIEF', 'BETTER QUESTIONS', 'BOLDER DESIGN'],
    },
  ],

  // Preview configuration for the studio
  preview: {
    select: {
      tagline: 'heroTagline',
      subtitle: 'heroSubtitle',
    },
    prepare: ({ tagline, subtitle }) => ({
      title: `Homepage - ${tagline}`,
      subtitle,
    }),
  },
})