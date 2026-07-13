import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery Category',
    plural: 'Gallery',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'updatedAt'],
  },
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageUrl',
          type: 'text',
          admin: {
            description: 'Optional external image URL if no Media upload is set.',
          },
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
