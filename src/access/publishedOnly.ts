import type { Access } from 'payload'

/** Public read for draft-enabled collections: published docs only when unauthenticated. */
export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}
