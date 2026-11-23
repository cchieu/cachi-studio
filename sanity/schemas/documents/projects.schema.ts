import { Schema } from 'sanity-typescript'

/**
 * Project document type - portfolio projects
 */
export const projects = Schema.documentType({
  name: 'projects',
  title: 'Project',
  type: 'document',
  // Singleton is false - we can have multiple projects
  singleton: false,

  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Project Title',
      description: 'The title of the project',
      validation: Rule => Rule.required().min(3),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Project Slug',
      description: 'The URL slug for the project page (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'The category/ies for this project (e.g., "Brand & Identity", "Digital Experiences")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'year',
      type: 'string',
      title: 'Year',
      description: 'The year the project was completed',
      validation: Rule => Rule.min(4).max(4),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Featured Image',
      description: 'The main image displayed for this project',
      options: {
        hotspot: true, // Allow cropping/focal point
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'A brief description of the project',
      validation: Rule => Rule.required().min(10),
    },
    {
      name: 'challenge',
      type: 'text',
      title: 'Challenge',
      description: 'The business challenge this project addressed',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'insight',
      type: 'text',
      title: 'Creative Insight',
      description: 'The key creative insight discovered',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'solution',
      type: 'text',
      title: 'Proposed Solution',
      description: 'The proposed solution for the project',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'deliverables',
      type: 'array',
      title: 'Deliverables',
      description: 'List of deliverables for this project',
      of: [{ type: 'string' }],
    },
    {
      name: 'outcome',
      type: 'text',
      title: 'Outcome',
      description: 'The outcome/result of the project',
      validation: Rule => Rule.min(10),
    },
    {
      name: 'concept',
      type: 'boolean',
      title: 'Concept Work',
      description: 'Whether this is concept work vs. client client project',
      initialValue: false,
    },
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
    },
    prepare: ({ title, category, year }) => ({
      title: `${title} — Case Study`,
      subtitle: `${category} · ${year}`,
    }),
  },

  // Studio actions
  __experimental_actions: ['create', 'update', 'delete'],
})