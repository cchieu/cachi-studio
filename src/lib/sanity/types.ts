// TypeScript interfaces for Sanity document types
// These types are generated based on the Sanity schema definitions

export interface Image {
  _id: string
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
  }
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  logo?: Image
  alternativeLogo?: Image
  favicon?: Image
  contactEmail: string
  contactPhone?: string
  address?: string
  socialLinks: SocialLink[]
  footerDescription?: string
  copyrightText: string
  globalCtaTitle?: string
  globalCtaText?: string
  globalCtaUrl?: string
}

export interface SocialLink {
  _id: string
  _type: 'socialLink'
  platform: string
  url: string
}

export interface Homepage {
  _id: string
  _type: 'homepage'
  heroTagline: string
  heroSubtitle: string
  aboutDescription: string
  pillars: Pillar[]
  finalCtaTitle: string
  finalCtaSubtitle: string
  contactEmail: string
  contactWhatsApp: string
  primaryMenu: MenuItem[]
  copyrightText: string
  socialLinks: SocialLink[]
  marqueeItems: string[]
}

export interface Pillar {
  _id: string
  _type: 'pillar'
  title: string
  copy: string
}

export interface MenuItem {
  _id: string
  _type: 'menuItem'
  label: string
  href: string
  isExternal?: boolean
  order: number
}

export interface Projects {
  _id: string
  _type: 'projects'
  title: string
  slug: { current: string }
  category: string
  year?: string
  image: Image
  description: string
  challenge?: string
  insight?: string
  solution?: string
  deliverables: string[]
  outcome: string
  concept?: boolean
}

export interface Service {
  _id: string
  _type: 'services'
  number: string
  title: string
  blurb: string
  involves?: string
  solves?: string
  receive?: string
  deliverables: string[]
  featured?: boolean
}

export interface Testimonial {
  _id: string
  _type: 'testimonials'
  clientName: string
  clientRole?: string
  company?: string
  testimonialText: string
  image?: Image
  featured?: boolean
}

export interface TeamMember {
  _id: string
  _type: 'teamMembers'
  fullName: string
  position?: string
  biography?: string
  image?: Image
  socialLinks: SocialLink[]
  featured?: boolean
}

export interface Navigation {
  _id: string
  _type: 'navigation'
  headerMenu: MenuItem[]
  footerMenu: MenuItem[]
}