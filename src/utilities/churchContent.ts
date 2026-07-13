import { getPayload } from 'payload'
import config from '@payload-config'

type MediaLike = { url?: string | null } | number | null | undefined

export function mediaURL(media: MediaLike, fallback?: string | null): string {
  if (fallback) return fallback
  if (media && typeof media === 'object' && 'url' in media && media.url) {
    return media.url
  }
  return '/assets/img/spac-building.png'
}

export function formatDisplayDate(iso?: string | null, fallback?: string | null): string {
  if (fallback) return fallback
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDisplayTime(iso?: string | null, fallback?: string | null): string {
  if (fallback) return fallback
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export type AnnouncementCard = {
  id: string
  title: string
  date: string
  category: string
  image: string
  excerpt: string
  content: string
  slug?: string | null
}

export type EventCard = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  featured?: boolean | null
  slug?: string | null
}

export type GalleryCategoryView = {
  id: string
  category: string
  images: { url: string; alt: string }[]
}

export type LeadershipCard = {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export type BranchView = {
  id: string
  slug: string
  name: string
  tagline: string
  story: {
    title: string
    desc1: string
    desc2: string
    img: string
  }
  priestInCharge: {
    name: string
    role: string
    bio: string
    image: string
  }
}

type AnnouncementDoc = {
  id: string | number
  title: string
  publishedAt?: string | null
  category: string
  image?: MediaLike
  imageUrl?: string | null
  excerpt: string
  content: string
  slug?: string | null
}

type EventDoc = {
  id: string | number
  title: string
  description?: string | null
  startDate: string
  displayDate?: string | null
  displayTime?: string | null
  location?: string | null
  image?: MediaLike
  imageUrl?: string | null
  featured?: boolean | null
  slug?: string | null
}

type GalleryDoc = {
  id: string | number
  category: string
  images?: {
    image?: MediaLike
    imageUrl?: string | null
    alt: string
  }[]
}

type LeadershipDoc = {
  id: string | number
  name: string
  role: string
  bio: string
  image?: MediaLike
  imageUrl?: string | null
}

type BranchDoc = {
  id: string | number
  slug?: string | null
  name: string
  tagline: string
  story: {
    title: string
    desc1: string
    desc2: string
    image?: MediaLike
    imageUrl?: string | null
  }
  priestInCharge: {
    name: string
    role: string
    bio: string
    image?: MediaLike
    imageUrl?: string | null
  }
}

function mapAnnouncement(doc: AnnouncementDoc): AnnouncementCard {
  return {
    id: String(doc.id),
    title: doc.title,
    date: formatDisplayDate(doc.publishedAt, null),
    category: doc.category,
    image: mediaURL(doc.image, doc.imageUrl),
    excerpt: doc.excerpt,
    content: doc.content,
    slug: doc.slug,
  }
}

function mapEvent(doc: EventDoc): EventCard {
  return {
    id: String(doc.id),
    title: doc.title,
    description: doc.description || '',
    date: formatDisplayDate(doc.startDate, doc.displayDate),
    time: formatDisplayTime(doc.startDate, doc.displayTime),
    location: doc.location || '',
    image: mediaURL(doc.image, doc.imageUrl),
    featured: doc.featured,
    slug: doc.slug,
  }
}

function mapGallery(doc: GalleryDoc): GalleryCategoryView {
  return {
    id: String(doc.id),
    category: doc.category,
    images: (doc.images || []).map((item) => ({
      url: mediaURL(item.image, item.imageUrl),
      alt: item.alt,
    })),
  }
}

function mapLeadership(doc: LeadershipDoc): LeadershipCard {
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    bio: doc.bio,
    image: mediaURL(doc.image, doc.imageUrl),
  }
}

function mapBranch(doc: BranchDoc): BranchView {
  return {
    id: String(doc.id),
    slug: doc.slug || '',
    name: doc.name,
    tagline: doc.tagline,
    story: {
      title: doc.story.title,
      desc1: doc.story.desc1,
      desc2: doc.story.desc2,
      img: mediaURL(doc.story.image, doc.story.imageUrl),
    },
    priestInCharge: {
      name: doc.priestInCharge.name,
      role: doc.priestInCharge.role,
      bio: doc.priestInCharge.bio,
      image: mediaURL(doc.priestInCharge.image, doc.priestInCharge.imageUrl),
    },
  }
}

export async function getPublishedAnnouncements(limit = 100): Promise<AnnouncementCard[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'announcements',
    depth: 1,
    limit,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })
  return (docs as AnnouncementDoc[]).map(mapAnnouncement)
}

export async function getPublishedEvents(limit = 100): Promise<EventCard[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'events',
    depth: 1,
    limit,
    sort: 'startDate',
    where: {
      _status: { equals: 'published' },
    },
  })
  return (docs as EventDoc[]).map(mapEvent)
}

export async function getGallery(): Promise<GalleryCategoryView[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'gallery',
    depth: 1,
    limit: 50,
    sort: 'category',
  })
  return (docs as GalleryDoc[]).map(mapGallery)
}

export async function getLeadership(): Promise<LeadershipCard[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'leadership',
    depth: 1,
    limit: 50,
    sort: 'order',
  })
  return (docs as LeadershipDoc[]).map(mapLeadership)
}

export async function getBranches(): Promise<BranchView[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'branches',
    depth: 1,
    limit: 50,
    sort: 'name',
  })
  return (docs as BranchDoc[]).map(mapBranch)
}

export async function getBranchBySlug(slug: string): Promise<BranchView | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'branches',
    depth: 1,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  })
  return docs[0] ? mapBranch(docs[0] as BranchDoc) : null
}
