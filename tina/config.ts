import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'master',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'master',

  studio: {
    name: 'Cachi Studio',
    url: 'https://cachi-studio.vercel.app',
  },

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public'
    }
  },

  schema: {
    collections: [
      {
        name: 'projects',
        path: 'content/projects',
        type: 'document',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'slug', type: 'string' },
          { name: 'category', type: 'string' },
          { name: 'year', type: 'string' },
          { name: 'concept', type: 'boolean' },
          { name: 'image', type: 'image' },
          { name: 'description', type: 'rich-text' },
          { name: 'challenge', type: 'rich-text' },
          { name: 'insight', type: 'rich-text' },
          { name: 'solution', type: 'rich-text' },
          { name: 'exploration', type: 'rich-text' },
          { name: 'outcome', type: 'rich-text' },
        ],
        preview: {
          select: {
            title: '{{title}}',
          },
        },
      },
      {
        name: 'services',
        path: 'content/services',
        type: 'document',
        fields: [
          { name: 'number', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'blurb', type: 'rich-text' },
          { name: 'receive', type: 'rich-text' },
        ],
        preview: {
          select: {
            title: '{{title}}',
          },
        },
      },
      {
        name: 'siteContent',
        path: 'content/site-content',
        type: 'document',
        fields: [
          { name: 'heroTagline', type: 'string' },
          { name: 'heroSubtitle', type: 'rich-text' },
          { name: 'aboutDescription', type: 'rich-text' },
          { name: 'pillar1Title', type: 'string' },
          { name: 'pillar1Copy', type: 'rich-text' },
          { name: 'pillar2Title', type: 'string' },
          { name: 'pillar2Copy', type: 'rich-text' },
          { name: 'pillar3Title', type: 'string' },
          { name: 'pillar3Copy', type: 'rich-text' },
          { name: 'finalCtaTitle', type: 'string' },
          { name: 'finalCtaSubtitle', type: 'rich-text' },
          { name: 'contactEmail', type: 'string' },
          { name: 'contactWhatsApp', type: 'string' },
          { name: 'formEndpoint', type: 'string' },
        ],
        preview: {
          select: {
            heroTagline: '{{heroTagline}}',
          },
        },
      },
    ],
  },

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
});