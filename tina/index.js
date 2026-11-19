import { TinaProvider } from 'tinacms'
import { projects } from './schemas/projects.schema'
import { services } from './schemas/services.schema'
import { siteContent } from './schemas/site-content.schema'

export default {
  clientId: 'aee415c0-c759-48b3-bd40-1e948df0b3d3',
  studio: {
    name: 'Cachi Studio',
    url: 'https://cachi-studio.vercel.app',
  },
  db: {
    collections: [projects, services, siteContent],
  },
}