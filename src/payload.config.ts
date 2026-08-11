import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Announcements } from './collections/Announcements'
import { Branches } from './collections/Branches'
import { Events } from './collections/Events'
import { Gallery } from './collections/Gallery'
import { Leadership } from './collections/Leadership'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { About } from './globals/About'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Keep current Node pg SSL behavior; avoid deprecation of sslmode=require as verify-full alias. */
function postgresConnectionString(url: string): string {
  if (!url) return url

  try {
    const parsed = new URL(url)
    const sslmode = parsed.searchParams.get('sslmode')

    if (sslmode === 'require' || sslmode === 'prefer' || sslmode === 'verify-ca') {
      parsed.searchParams.set('sslmode', 'verify-full')
    }

    return parsed.toString()
  } catch {
    return url
  }
}

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    meta: {
      titleSuffix: '— Oke Bola Archdeaconry',
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: postgresConnectionString(process.env.DATABASE_URL || ''),
    },
  }),
  collections: [Announcements, Events, Gallery, Branches, Leadership, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [About],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
