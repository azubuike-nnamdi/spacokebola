import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const valueIconOptions = [
  { label: 'Book', value: 'book' },
  { label: 'Users', value: 'users' },
  { label: 'Heart', value: 'heart' },
  { label: 'Home', value: 'home' },
  { label: 'Cross', value: 'cross' },
  { label: 'Hands', value: 'hands' },
]

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Site Content',
    description: 'Manage the public /about page content.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
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
              ],
            },
          ],
        },
        {
          label: 'Our Story',
          fields: [
            {
              name: 'story',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'desc1',
                  type: 'richText',
                  required: true,
                },
                {
                  name: 'desc2',
                  type: 'richText',
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
              ],
            },
          ],
        },
        {
          label: 'Values',
          fields: [
            {
              name: 'values',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                },
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
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Value', plural: 'Values' },
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      defaultValue: 'book',
                      options: valueIconOptions,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Priest in Charge',
          fields: [
            {
              name: 'priest',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                },
                {
                  name: 'sectionTitle',
                  type: 'text',
                },
                {
                  name: 'sectionDescription',
                  type: 'textarea',
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'role',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'bio',
                  type: 'richText',
                  required: true,
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
              ],
            },
          ],
        },
        {
          label: 'Leadership',
          fields: [
            {
              name: 'leadership',
              type: 'group',
              admin: {
                description:
                  'Section headings only. Team members are managed in the Leadership collection.',
              },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          label: 'What We Believe',
          fields: [
            {
              name: 'beliefs',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'introduction',
                  type: 'richText',
                  required: true,
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Belief', plural: 'Beliefs' },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  admin: {
                    description: 'Optional link for the beliefs CTA button.',
                  },
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
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'primaryLabel',
                  type: 'text',
                },
                {
                  name: 'primaryUrl',
                  type: 'text',
                },
                {
                  name: 'secondaryLabel',
                  type: 'text',
                },
                {
                  name: 'secondaryUrl',
                  type: 'text',
                },
                {
                  name: 'backgroundImageUrl',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
