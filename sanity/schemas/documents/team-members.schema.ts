import { Schema } from 'sanity-typescript'

/**
 * Team Member document type
 */
export const teamMembers = Schema.documentType({
  name: 'teamMembers',
  title: 'Team Member',
  type: 'document',
  singleton: false,

  fields: [
    {
      name: 'fullName',
      type: 'string',
      title: 'Full Name',
      description: 'The team member\'s full name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'position',
      type: 'string',
      title: 'Position',
      description: 'The team member\'s position/title',
    },
    {
      name: 'biography',
      type: 'text',
      title: 'Biography',
      description: 'A short biography of the team member',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Profile Image',
      description: 'The team member\'s profile photograph',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      description: 'Links to the team member\'s social profiles',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              description: 'Social media platform',
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
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Whether this team member is featured',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      name: 'fullName',
    },
    prepare: ({ name }) => ({
      title: `Team Member: ${name}`,
    }),
  },

  __experimental_actions: ['create', 'update', 'delete'],
})