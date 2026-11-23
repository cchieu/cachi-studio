// GROQ queries for fetching content from Sanity
// These queries are type-safe and use the interfaces defined in types.ts

import type {
  Homepage,
  Projects,
  Service,
  Testimonial,
  TeamMember,
  Navigation,
  SiteSettings,
} from '../lib/sanity/types'

// ============================================================
// Homepage Queries
// ============================================================

/**
 * Fetches the homepage singleton document
 * Uses * to retrieve all fields, then we type it as Homepage
 */
export const getHomepage = (): Promise<Homepage> => {
  // In a real implementation, this would use the sanityClient
  // For now, we define the query structure
  return sanityClient.fetch<Homepage>(`
    *[_type == "homepage"][0]
  `)
}

// ============================================================
// Projects Queries
// ============================================================

/**
 * Fetches all published projects, sorted by order
 */
export const getProjects = (): Promise<Projects[]> => {
  return sanityClient.fetch<Projects[]>(`
    *[_type == "projects" && defined(slug.current) && !(_id in path('drafts.*'))]
    | order(number asc)
  `)
}

/**
 * Fetches a single project by slug
 */
export const getProjectBySlug = (slug: string): Promise<Projects> => {
  return sanityClient.fetch<Projects>(`
    *[_type == "projects" && slug.current == $slug][0]
  `, { slug })
}

// ============================================================
// Services Queries
// ============================================================

/**
 * Fetches all services, ordered by number
 */
export const getServices = (): Promise<Service[]> => {
  return sanityClient.fetch<Service[]>(`
    *[_type == "services" && defined(number)]
    | order(number asc)
  `)
}

/**
 * Fetches a single service by number
 */
export const getServiceByNumber = (number: string): Promise<Service> => {
  return sanityClient.fetch<Service>(
    `*[_type == "services" && number == $number][0]`,
    { number }
  )
}

// ============================================================
// Testimonials Queries
// ============================================================

/**
 * Fetches all testimonials, ordered by featured status then creation
 */
export const getTestimonials = (): Promise<Testimonial[]> => {
  return sanityClient.fetch<Testimonial[]>(`
    *[_type == "testimonials" && defined(clientName)]
    | order(featured desc, _createdAt asc)
  `)
}

/**
 * Fetches featured testimonials
 */
export const getFeaturedTestimonials = (): Promise<Testimonial[]> => {
  return sanityClient.fetch<Testimonial[]>(`
    *[_type == "testimonials" && featured == true && defined(clientName)]
    | order(_createdAt asc)
  `)
}

// ============================================================
// Team Members Queries
// ============================================================

/**
 * Fetches all team members
 */
export const getTeamMembers = (): Promise<TeamMember[]> => {
  return sanityClient.fetch<TeamMember[]>(`
    *[_type == "teamMembers" && defined(fullName)]
    | order(fullName asc)
  `)
}

// ============================================================
// Navigation Queries
// ============================================================

/**
 * Fetches navigation configuration
 */
export const getNavigation = (): Promise<Navigation> => {
  return sanityClient.fetch<Navigation>(`
    *[_type == "navigation"][0]
  `)
}

// ============================================================
// Site Settings Queries
// ============================================================

/**
 * Fetches the site settings singleton
 */
export const getSiteSettings = (): Promise<SiteSettings> => {
  return sanityClient.fetch<SiteSettings>(`
    *[_type == "siteSettings"][0]
  `)
}

// ============================================================
// Count Queries (for pagination/states)
// ============================================================

/**
 * Counts total projects
 */
export const countProjects = (): Promise<number> => {
  return sanityClient.fetch<number>(`
    count(*[_type == "projects"])
  `)
}

/**
 * Counts total services
 */
export const countServices = (): Promise<number> => {
  return sanityClient.fetch<number>(`
    count(*[_type == "services"])
  `)
}

/**
 * Counts total testimonials
 */
export const countTestimonials = (): Promise<number> => {
  return sanityClient.fetch<number>(`
    count(*[_type == "testimonials"])
  `)
}

/**
 * Counts total team members
 */
export const countTeamMembers = (): Promise<number> => {
  return sanityClient.fetch<number>(`
    count(*[_type == "teamMembers"])
  `)
}