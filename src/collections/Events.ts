import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'featured', '_status', 'updatedAt'],
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'other',
      options: [
        { label: 'Sunday Service', value: 'sunday_service' },
        { label: 'Bible Study', value: 'bible_study' },
        { label: 'Prayer Meeting', value: 'prayer_meeting' },
        { label: 'Youth Program', value: 'youth_program' },
        { label: "Women's Fellowship", value: 'womens_fellowship' },
        { label: "Men's Fellowship", value: 'mens_fellowship' },
        { label: 'Special Event', value: 'special_event' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'displayDate',
      type: 'text',
      admin: {
        description: 'Optional display label (e.g. "Every Sunday", "Last Sunday").',
      },
    },
    {
      name: 'displayTime',
      type: 'text',
      admin: {
        description: 'Optional display time (e.g. "9:00 AM & 11:00 AM").',
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'virtualLink',
      type: 'text',
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
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    slugField(),
  ],
  timestamps: true,
}
