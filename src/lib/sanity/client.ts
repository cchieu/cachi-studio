/**
 * Sanity Client Configuration
 *
 * This module creates a Sanity client instance that is used throughout
 * the frontend application to retrieve published content from Sanity.
 *
 * The client is configured using environment variables:
 * - VITE_SANITY_PROJECT_ID: Your Sanity project ID
 * - VITE_SANITY_DATASET: The dataset name (usually 'production')
 *
 * Important: Never commit private write tokens to the repository.
 * The frontend client only has read access to published content.
 */
import { createClient } from '@sanity/client'

// Sanity client configuration
export const sanityClient = createClient({
  // Project ID from Sanity project settings
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  
  // Dataset name (usually 'production' or 'development')
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  
  // Use the CDN for faster content delivery (published content only)
  // Do not use perspective: 'preview' in production as it requires write tokens
  useCdn: true,
  
  // API version fix - use a stable date format
  // This ensures consistent queries across deployments
  apiVersion: '2024-01-01',
  
  // Project ID and dataset are fetched from environment variables
  // to keep them out of the source code and enable different values per environment
})

// Export type-safe GroQ query functions
export type { Project, Service, Homepage, Testimonial, TeamMember, Navigation, SiteSettings } from './types'