import { TinaProvider } from 'tinacms'
import { projects } from './schemas/projects.schema'
import { services } from './schemas/services.schema'
import { siteContent } from './schemas/site-content.schema'

export default {
  clientId: '{{tinaClientId}}', // Set via environment or Tina dashboard
  studio: {
    name: 'Cachi Studio',
    url: 'https://cachi-studio.vercel.app',
  },
  db: {
    collections: [projects, services, siteContent],
  },
}