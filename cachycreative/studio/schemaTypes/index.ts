// Document schema types for Cachi Creative Studio portfolio site

// Portfolio projects
export const projects = {
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'image', title: 'Featured Image', type: 'image' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'challenge', title: 'Challenge', type: 'textarea' },
    { name: 'insight', title: 'Insight', type: 'textarea' },
    { name: 'solution', title: 'Solution', type: 'textarea' },
    { name: 'deliverables', title: 'Deliverables', type: 'array', of: [{ type: 'string' }] },
    { name: 'outcome', title: 'Outcome', type: 'textarea' },
    { name: 'concept', title: 'Concept Work', type: 'boolean', initialValue: false },
  ],
}

// Services
export const services = {
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    { name: 'number', title: 'Number', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'blurb', title: 'Blurb', type: 'textarea' },
    { name: 'involves', title: 'Involves', type: 'textarea' },
    { name: 'solves', title: 'Solves', type: 'textarea' },
    { name: 'receive', title: 'What Clients Receive', type: 'textarea' },
    { name: 'deliverables', title: 'Deliverables', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
  ],
}

// Testimonials
export const testimonials = {
  name: 'testimonials',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'clientName', title: 'Client Name', type: 'string' },
    { name: 'clientRole', title: 'Client Role', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'testimonialText', title: 'Testimonial Text', type: 'textarea' },
    { name: 'image', title: 'Client Photograph', type: 'image' },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
  ],
}

// Site Settings (singleton)
export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  singleton: true,
  fields: [
    { name: 'logo', title: 'Main Logo', type: 'image' },
    { name: 'contactEmail', title: 'Contact Email', type: 'string', validation: (Rule: any) => Rule.required().email() },
    { name: 'contactPhone', title: 'Contact Phone', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'object', fields: [{ name: 'platform', type: 'string' }, { name: 'url', type: 'string' }] }] },
    { name: 'footerDescription', title: 'Footer Description', type: 'text' },
    { name: 'copyrightText', title: 'Copyright Text', type: 'string', validation: (Rule: any) => Rule.required().min(10) },
  ],
}