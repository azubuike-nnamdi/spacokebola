import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

import { seedChurchContent } from '@/endpoints/seed/church'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)
    await seedChurchContent(payload)
    payloadReq.payload.logger.info('Church content seeded')
    return Response.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error({ err: error }, 'Seed failed')
    return Response.json({ error: message }, { status: 500 })
  }
}
