// Migration Script: TinaCMS → Sanity CMS
// This script migrates existing TinaCMS content into Sanity documents.
// Run with: node scripts/migration/migrate-to-sanity.js
// Set SANITY_PROJECT_ID environment variable for actual migration.

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Configuration
const DRY_RUN = process.env.DRY_RUN === 'true' // If true, shows what would be migrated without creating
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || ''
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'

// Validate required environment
if (!SANITY_PROJECT_ID && !DRY_RUN) {
  console.error('❌ SANITY_PROJECT_ID environment variable is required for actual migration')
  process.exit(1)
}

// Create Sanity client (read-only for dry-run, write for actual)
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
}

// Existing TinaCMS content data
import { projects as tinaProjects } from '../src/data/projects.js'
import { services as tinaServices } from '../src/data/services.js'

// Helper: sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchCurrentSanityContent(type) {
  try {
    return await client.fetch(
      `*[_type == "$"][0]{_id, _type}`,
      { type }
    )
  } catch {
    return null
  }
}

async function main() {
  console.log('=== Cachi Studio: TinaCMS to Sanity Migration ===\n')
  console.log(`Mode: ${DRY_RUN ? 'DRY-RUN' : 'LIVE MIGRATION'}`)
  console.log(`Project ID: ${SANITY_PROJECT_ID || 'NOT SET (dry-run)'}`)
  console.log(`Dataset: ${SANITY_DATASET}\n`)

  let successCount = 0
  let errorCount = 0
  let warningCount = 0
  let skippedCount = 0

  // ============================================================
  // 1. Migrate Projects
  // ============================================================
  console.log(`Migrating ${tinaProjects.length} projects...`)

  for (const tinaProject of tinaProjects) {
    try {
      // Map TinaCMS fields to Sanity fields
      const sanityProject = {
        _type: 'projects',
        title: tinaProject.title,
        slug: {
          current: tinaProject.slug,
        },
        category: tinaProject.category,
        year: tinaProject.year,
        concept: tinaProject.concept !== undefined ? tinaProject.concept : false,
        image: {
          asset: {
            _ref: tinaProject.image.replace('/public/', '').replace('.svg', ''),
            _type: 'reference',
          },
          alt: `${tinaProject.title} — concept project`,
        },
        description: tinaProject.description,
        challenge: tinaProject.challenge,
        insight: tinaProject.insight,
        solution: tinaProject.solution,
        deliverables: tinaProject.deliverables,
        outcome: tinaProject.outcome,
      }

      // Check if project already exists (by slug)
      const existing = await client.fetch(
        `*[_type == "projects" && slug.current == "$"]{_id, title}`,
        { slug: tinaProject.slug }
      )

      if (existing.length > 0) {
        console.log(`⚠️  Project "${tinaProject.slug}" (${tinaProject.title}) already exists - skipping`)
        skippedCount++
        continue
      }

      if (DRY_RUN) {
        console.log(`   Would create: ${tinaProject.title} (${tinaProject.slug})`)
        successCount++
      } else {
        const result = await client.create(sanityProject)
        console.log(`✅ Created: ${tinaProject.title} (${tinaProject.slug})`)
        successCount++
      }

      await sleep(200)
    } catch (error) {
      console.error(`❌ Failed to migrate project "${tinaProject.title}":`, error.message)
      errorCount++
    }
  }

  // ============================================================
  // 2. Migrate Services
  // ============================================================
  console.log(`\nMigrating ${tinaServices.length} services...`)

  for (const tinaService of tinaServices) {
    try {
      const sanityService = {
        _type: 'services',
        number: tinaService.number,
        title: tinaService.title,
        blurb: tinaService.blurb,
        involves: tinaService.involves,
        solves: tinaService.solves,
        receive: tinaService.receive,
        deliverables: tinaService.deliverables,
        featured: false,
      }

      // Check if service already exists (by number)
      const existing = await client.fetch(
        `*[_type == "services" && number == "$"]{_id, title}`,
        { number: tinaService.number }
      )

      if (existing.length > 0) {
        console.log(`⚠️  Service "${tinaService.number}" already exists - skipping`)
        skippedCount++
        continue
      }

      if (DRY_RUN) {
        console.log(`   Would create: ${tinaService.title} (${tinaService.number})`)
        successCount++
      } else {
        const result = await client.create(sanityService)
        console.log(`✅ Created: ${tinaService.title} (${tinaService.number})`)
        successCount++
      }

      await sleep(200)
    } catch (error) {
      console.error(`❌ Failed to migrate service "${tinaService.title}":`, error.message)
      errorCount++
    }
  }

  // ============================================================
  // 3. Migrate Site Settings
  // ============================================================
  console.log('\nMigrating site settings...')

  const siteSettingsDoc = {
    _type: 'siteSettings',
    logo: {
      asset: {
        _ref: 'logo',
        _type: 'reference',
      },
    },
    alternativeLogo: {
      asset: {
        _ref: 'alternative-logo',
        _type: 'reference',
      },
    },
    favicon: {
      asset: {
        _ref: 'favicon',
        _type: 'reference',
      },
    },
    contactEmail: 'hello@cachi.studio',
    contactWhatsApp: '+00 000 000 000',
    footerDescription: 'Independent creative studio',
    copyrightText: '2025 Cachi Studio',
    globalCtaTitle: 'HAVE A CHALLENGE',
    globalCtaText: 'WORTH SOLVING?',
    globalCtaUrl: '/contact',
  }

  try {
    // Check if site settings already exists
    const existing = await fetchCurrentSanityContent('siteSettings')

    if (existing) {
      console.log('⚠️  Site settings already exists in Sanity - would update (dry-run) or update (live)')
      skippedCount++
      if (!DRY_RUN) {
        // Update existing document
        try {
          await client.patch(existing._id).set(siteSettingsDoc).commit()
          console.log('✅ Updated site settings')
          successCount++
        } catch (patchError) {
          console.error('❌ Failed to update site settings:', patchError.message)
          errorCount++
        }
      }
    } else if (DRY_RUN) {
      console.log('   Would create: siteSettings document')
      successCount++
    } else {
      const result = await client.create(siteSettingsDoc)
      console.log('✅ Created site settings')
      successCount++
    }
  } catch (error) {
    console.error('❌ Failed to migrate site settings:', error.message)
    errorCount++
  }

  // ============================================================
  // 4. Summary
  // ============================================================
  console.log('\n=== Migration Summary ===')
  console.log(`  ✅ Successful: ${successCount}`)
  console.log(`  ⚠️  Skipped (already exists): ${skippedCount}`)
  console.log(`  ❌ Errors: ${errorCount}`)
  console.log(`  📝 Dry-run: ${DRY_RUN}`)
  console.log('\n=== Migration Complete ===')

  // Note about next steps
  console.log('\n--- Next Steps ---')
  console.log('1. Review migrated content in Sanity Studio')
  console.log('2. Run: node scripts/migration/verify-migration.js')
  console.log('3. After verification: remove TinaCMS packages (Phase 7)')
  console.log('4. Update package.json build script (already done)')
  console.log('5. Deploy Sanity Studio (Phase 8)')

  // Process exit code
  if (errorCount === 0) {
    process.exit(0)
  } else {
    process.exit(1)
  }
}

// Run the migration
main().catch((error) => {
  console.error('Migration failed with uncaught error:', error)
  process.exit(1)
})