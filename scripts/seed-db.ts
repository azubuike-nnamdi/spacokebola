import 'dotenv/config'

import { getPayload } from 'payload'
import config from '@payload-config'

import { seedChurchContent } from '@/endpoints/seed/church'

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@okebola.org'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'password'
const ADMIN_NAME = process.env.SEED_ADMIN_NAME || 'Site Admin'

async function main(): Promise<void> {
  const payload = await getPayload({ config })

  const { totalDocs: userCount } = await payload.find({
    collection: 'users',
    limit: 0,
  })

  if (userCount === 0) {
    await payload.create({
      collection: 'users',
      data: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      },
    })
    payload.logger.info(`Admin user created: ${ADMIN_EMAIL}`)
  } else {
    payload.logger.info('Admin user already exists — skipping user creation')
  }

  await seedChurchContent(payload)

  const [announcements, events, branches, leadership, gallery] = await Promise.all([
    payload.find({ collection: 'announcements', limit: 0 }),
    payload.find({ collection: 'events', limit: 0 }),
    payload.find({ collection: 'branches', limit: 0 }),
    payload.find({ collection: 'leadership', limit: 0 }),
    payload.find({ collection: 'gallery', limit: 0 }),
  ])

  payload.logger.info(
    `Seeded: ${announcements.totalDocs} announcements, ${events.totalDocs} events, ${branches.totalDocs} branches, ${leadership.totalDocs} leaders, ${gallery.totalDocs} gallery categories`,
  )

  if (userCount === 0) {
    console.log('\nAdmin login:')
    console.log(`  Email:    ${ADMIN_EMAIL}`)
    console.log(`  Password: ${ADMIN_PASSWORD}`)
    console.log('  URL:      http://localhost:3000/admin\n')
  }

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
