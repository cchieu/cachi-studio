import { schema } from '@tinacms/schema-tools'

export const projects = schema({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  columns: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'concept', title: 'Concept Work', type: 'boolean' },
    { name: 'image', title: 'Image', type: 'string' },
    { name: 'description', title: 'Description', type: 'textarea' },
    { name: 'challenge', title: 'Challenge', type: 'textarea' },
    { name: 'insight', title: 'Insight', type: 'textarea' },
    { name: 'solution', title: 'Solution', type: 'textarea' },
    { name: 'exploration', title: 'Exploration', type: 'textarea' },
    {
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'outcome', title: 'Outcome', type: 'textarea' },
  ],
  awayFromEdit: ['deliverables', 'image'],
})