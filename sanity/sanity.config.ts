/** @type {import('sanity').Config} */
export default {
  title: 'Cachi Studio',
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  formActions: {
    submit: {
      lazy: true,
    },
  },
  // Base path for the studio, relative to the Sanity project root
  basePath: '/studio',

  // Plugins
  plugins: [],

  // Vision tool for preview (optional, configure as needed)
  // vision: *SanityVision() => {},

  // CORS configuration for the frontend
  // See: https://docs.sanity.io/cors
  // CORS origins should include your production domain and preview origins
  // cors: () => ['https://cachi-studio.vercel.app'],

  // Define document types here or import from ./schemas
  // types: importMeta.env.SANITY_TYPES
  types: {},
}