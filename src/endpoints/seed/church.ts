import type { Payload } from 'payload'

import { announcements2, branches, eventsData, galleryItems, leadershipTeam } from '@/data'
import { lexicalFromText } from '@/utilities/lexical'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function seedChurchContent(payload: Payload): Promise<void> {
  payload.logger.info('Seeding SPAC Oke Bola content...')

  for (const leader of leadershipTeam) {
    await payload.create({
      collection: 'leadership',
      data: {
        name: leader.name,
        role: leader.role,
        bio: lexicalFromText(leader.bio),
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
          desc1: lexicalFromText(branch.story.desc1),
          desc2: lexicalFromText(branch.story.desc2),
          imageUrl: branch.story.img,
        },
        priestInCharge: {
          name: branch.priestInCharge.name,
          role: branch.priestInCharge.role,
          bio: lexicalFromText(branch.priestInCharge.bio),
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
        excerpt: lexicalFromText(announcement.excerpt),
        content: lexicalFromText(announcement.content),
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

    const categoryByTitle: Record<
      string,
      | 'sunday_service'
      | 'bible_study'
      | 'prayer_meeting'
      | 'youth_program'
      | 'special_event'
      | 'other'
    > = {
      'Sunday Worship Service': 'sunday_service',
      'Bible Study Group': 'bible_study',
      'Fall Festival': 'special_event',
      'Youth Group Meeting': 'youth_program',
      'Prayer Meeting': 'prayer_meeting',
      'Community Service Day': 'special_event',
    }

    await payload.create({
      collection: 'events',
      data: {
        title: event.title,
        description: lexicalFromText(event.description),
        category: categoryByTitle[event.title] || 'other',
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

  await payload.updateGlobal({
    slug: 'about',
    data: {
      hero: {
        title: 'About SPAC Oke Bola',
        description:
          'A community of faith, hope, and love in the city of Ibadan since 1936.',
        imageUrl:
          'https://images.unsplash.com/photo-1495996797143-9fc04e79e304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      },
      story: {
        title: 'Our Story',
        desc1: lexicalFromText(
          "As early as 1936 there were Igbos who worshipped with the Yoruba Congregation at St James' Cathedral, Oke Bola, Ibadan. Due to an appeal made to Rev. Williams, they were allowed to worship in a Classroom at St. James Primary School as the Igbo section of the Cathedral. Church services were conducted by Volunteers.",
        ),
        desc2: lexicalFromText(
          "This arrangement lasted til 1940 when the Igbo congregation moved to a new Church in Ekoledo (Emmanuel Church) to worship, where the congregation was largely Sierra Leonians led by Mr. Lumpkin (of blessed memory). Later that year (1940) the Igbo Congregation reconvened at the classroom of St. James' Primary School Oke-Bola under the leadership of Messrs Ben, Ifekwuna and V.O.Onyewotu. In 1952 Mr. S.O Okolo was posted to the Church as the first Catechist, under a special arrangement with Diocese on the Niger.",
        ),
        imageUrl: '/assets/img/spac-building.png',
      },
      values: {
        eyebrow: 'Our Values',
        title: 'What guides us',
        description: 'These core values guide everything we do as a church family.',
        items: [
          {
            icon: 'book',
            title: 'Biblical Teaching',
            description:
              'We are committed to the authority of Scripture and teaching the whole counsel of God.',
          },
          {
            icon: 'users',
            title: 'Authentic Community',
            description:
              'We foster genuine relationships where people can be known, loved, and supported.',
          },
          {
            icon: 'heart',
            title: 'Compassionate Service',
            description:
              "We actively seek ways to demonstrate God's love through serving our community and world.",
          },
          {
            icon: 'home',
            title: 'Welcoming Environment',
            description:
              'We strive to create a place where everyone feels welcome, regardless of background or life stage.',
          },
        ],
      },
      priest: {
        eyebrow: 'Clergy',
        sectionTitle: 'Priest in charge',
        sectionDescription:
          'Meet the priest leading our spiritual community with dedication and faith.',
        name: 'Ven. Sunday D. Ezeike',
        role: 'Venerable/Archdeacon - Priest in Charge',
        bio: lexicalFromText(
          'Ven. Sunday D. Ezeike is a wise and compassionate spiritual leader dedicated to serving our church community. With deep commitment to the Anglican tradition, he leads our congregations with wisdom, pastoral care, and unwavering faith in Christ.',
        ),
        imageUrl: '/assets/img/vicar.png',
      },
      leadership: {
        eyebrow: 'Leadership',
        title: 'Our leadership team',
        description: 'Meet the dedicated people who serve and lead our church community.',
      },
      beliefs: {
        title: 'What We Believe',
        introduction: lexicalFromText(
          'At SPAC Oke Bola, we affirm the historic Christian faith as revealed in Scripture. Our beliefs are centered on the gospel—the good news that God saves sinners through the life, death, and resurrection of Jesus Christ.',
        ),
        items: [
          {
            title: 'The Bible',
            description:
              "We believe the Bible is God's Word, divinely inspired and without error, the final authority for all matters of faith and conduct.",
          },
          {
            title: 'God',
            description:
              'We believe in one God who exists eternally in three persons: Father, Son, and Holy Spirit.',
          },
          {
            title: 'Salvation',
            description:
              'We believe salvation is by grace alone, through faith alone, in Christ alone.',
          },
        ],
        ctaLabel: 'Read Our Full Statement of Faith',
        ctaUrl: '/contact',
        imageUrl: '/assets/img/bible.png',
      },
      cta: {
        eyebrow: 'Belong',
        title: 'Join Our Community',
        description:
          "We'd love to welcome you this Sunday. Experience the difference a church family can make in your life.",
        primaryLabel: 'Join Us Sunday',
        primaryUrl: '/events',
        secondaryLabel: 'Contact Us',
        secondaryUrl: '/contact',
        backgroundImageUrl:
          'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      },
    },
  })

  payload.logger.info('Seed complete.')
}
