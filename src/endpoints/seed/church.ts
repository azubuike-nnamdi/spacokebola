import type { Payload } from 'payload'

import { announcements2, branches, eventsData, galleryItems, leadershipTeam } from '@/data'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function seedChurchContent(payload: Payload): Promise<void> {
  payload.logger.info('Seeding Oke Bola Archdeaconry content...')

  for (const leader of leadershipTeam) {
    await payload.create({
      collection: 'leadership',
      data: {
        name: leader.name,
        role: leader.role,
        bio: leader.bio,
        imageUrl: leader.image,
        order: leader.id,
      },
    })
  }

  for (const branch of branches) {
    await payload.create({
      collection: 'branches',
      data: {
        name: branch.name,
        tagline: branch.tagline,
        slug: branch.slug,
        story: {
          title: branch.story.title,
          desc1: branch.story.desc1,
          desc2: branch.story.desc2,
          imageUrl: branch.story.img,
        },
        priestInCharge: {
          name: branch.priestInCharge.name,
          role: branch.priestInCharge.role,
          bio: branch.priestInCharge.bio,
          imageUrl: branch.priestInCharge.image,
        },
      },
    })
  }

  for (const item of galleryItems) {
    await payload.create({
      collection: 'gallery',
      data: {
        category: item.category,
        images: item.images.map((image) => ({
          imageUrl: image.url,
          alt: image.alt,
        })),
      },
    })
  }

  for (const announcement of announcements2) {
    await payload.create({
      collection: 'announcements',
      data: {
        title: announcement.title,
        excerpt: announcement.excerpt,
        content: announcement.content,
        category: announcement.category as
          | 'General'
          | 'Worship'
          | 'Outreach'
          | 'Youth'
          | 'Children'
          | 'Groups'
          | 'Administration'
          | 'Urgent'
          | 'Community',
        imageUrl: announcement.image,
        publishedAt: new Date(announcement.date).toISOString(),
        slug: slugify(announcement.title),
        _status: 'published',
      },
      draft: false,
    })
  }

  for (const event of eventsData) {
    const startDate = Number.isNaN(Date.parse(event.date))
      ? new Date().toISOString()
      : new Date(event.date).toISOString()

    await payload.create({
      collection: 'events',
      data: {
        title: event.title,
        description: event.description,
        category: 'other',
        startDate,
        displayDate: event.date,
        displayTime: event.time,
        location: event.location,
        imageUrl: event.image,
        featured: Boolean(event.featured),
        slug: slugify(event.title),
        _status: 'published',
      },
      draft: false,
    })
  }

  payload.logger.info('Seed complete.')
}
