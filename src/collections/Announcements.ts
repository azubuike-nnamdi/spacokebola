import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'richText',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'General',
      options: [
        { label: 'General', value: 'General' },
        { label: 'Worship', value: 'Worship' },
        { label: 'Outreach', value: 'Outreach' },
        { label: 'Youth', value: 'Youth' },
        { label: 'Children', value: 'Children' },
        { label: 'Groups', value: 'Groups' },
        { label: 'Administration', value: 'Administration' },
        { label: 'Urgent', value: 'Urgent' },
        { label: 'Community', value: 'Community' },
      ],
    },
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
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    },
    slugField(),
  ],
  timestamps: true,
}
