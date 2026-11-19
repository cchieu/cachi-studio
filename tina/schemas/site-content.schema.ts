import { schema } from '@tinacms/schema-tools'

export const siteContent = schema({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  // Store key editable text sections from the website
  columns: [
    { name: 'heroTagline', title: 'Hero Tagline', type: 'string' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'textarea' },
    { name: 'aboutDescription', title: 'About Description', type: 'textarea' },
    { name: 'pillar1Title', title: 'Pillar 1 Title', type: 'string' },
    { name: 'pillar1Copy', title: 'Pillar 1 Copy', type: 'textarea' },
    { name: 'pillar2Title', title: 'Pillar 2 Title', type: 'string' },
    { name: 'pillar2Copy', title: 'Pillar 2 Copy', type: 'textarea' },
    { name: 'pillar3Title', title: 'Pillar 3 Title', type: 'string' },
    { name: 'pillar3Copy', title: 'Pillar 3 Copy', type: 'textarea' },
    { name: 'finalCtaTitle', title: 'Final CTA Title', type: 'string' },
    { name: 'finalCtaSubtitle', title: 'Final CTA Subtitle', type: 'textarea' },
    { name: 'contactEmail', title: 'Contact Email', type: 'string' },
    { name: 'contactWhatsApp', title: 'WhatsApp Number', type: 'string' },
    { name: 'formEndpoint', title: 'Form Endpoint', type: 'string' },
  ],
})