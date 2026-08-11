import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import config from '@payload-config'

import { richTextToPlainText } from '@/utilities/lexical'

type MediaLike = { url?: string | null } | number | null | undefined

export function mediaURL(media: MediaLike, fallback?: string | null): string {
  if (media && typeof media === 'object' && 'url' in media && media.url) {
    return media.url
  }
  if (fallback) return fallback
  return ''
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

export type RichTextData = DefaultTypedEditorState

export type AnnouncementCard = {
  id: string
  title: string
  date: string
  publishedAtISO: string
  category: string
  image: string
  excerpt: RichTextData | null
  excerptPlain: string
  content: RichTextData | null
  contentPlain: string
  slug?: string | null
}

export type EventCard = {
  id: string
  title: string
  description: RichTextData | null
  descriptionPlain: string
  date: string
  time: string
  location: string
  image: string
  category: string
  categoryLabel: string
  startDateISO: string
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
  bio: RichTextData | null
  image: string
}

export type BranchView = {
  id: string
  slug: string
  name: string
  tagline: string
  story: {
    title: string
    desc1: RichTextData | null
    desc2: RichTextData | null
    img: string
  }
  priestInCharge: {
    name: string
    role: string
    bio: RichTextData | null
    image: string
  }
}

export type AboutValueIcon = 'book' | 'users' | 'heart' | 'home' | 'cross' | 'hands'

export type AboutPageView = {
  hero: {
    title: string
    description: string
    image: string
  }
  story: {
    title: string
    desc1: RichTextData | null
    desc2: RichTextData | null
    image: string
  }
  values: {
    eyebrow: string
    title: string
    description: string
    items: { icon: AboutValueIcon; title: string; description: string }[]
  }
  priest: {
    eyebrow: string
    sectionTitle: string
    sectionDescription: string
    name: string
    role: string
    bio: RichTextData | null
    image: string
  }
  leadership: {
    eyebrow: string
    title: string
    description: string
  }
  beliefs: {
    title: string
    introduction: RichTextData | null
    items: { title: string; description: string }[]
    ctaLabel: string
    ctaUrl: string
    image: string
  }
  cta: {
    eyebrow: string
    title: string
    description: string
    primaryLabel: string
    primaryUrl: string
    secondaryLabel: string
    secondaryUrl: string
    backgroundImageUrl: string
  }
}

type AnnouncementDoc = {
  id: string | number
  title: string
  publishedAt?: string | null
  category: string
  image?: MediaLike
  imageUrl?: string | null
  excerpt?: RichTextData | null
  content?: RichTextData | null
  slug?: string | null
}

type EventDoc = {
  id: string | number
  title: string
  description?: RichTextData | null
  category?: string | null
  startDate: string
  displayDate?: string | null
  displayTime?: string | null
  location?: string | null
  image?: MediaLike
  imageUrl?: string | null
  featured?: boolean | null
  slug?: string | null
}

const EVENT_CATEGORY_LABELS: Record<string, string> = {
  sunday_service: 'Sunday Service',
  bible_study: 'Bible Study',
  prayer_meeting: 'Prayer Meeting',
  youth_program: 'Youth Program',
  womens_fellowship: "Women's Fellowship",
  mens_fellowship: "Men's Fellowship",
  special_event: 'Special Event',
  other: 'Other',
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
  bio?: RichTextData | null
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
    desc1?: RichTextData | null
    desc2?: RichTextData | null
    image?: MediaLike
    imageUrl?: string | null
  }
  priestInCharge: {
    name: string
    role: string
    bio?: RichTextData | null
    image?: MediaLike
    imageUrl?: string | null
  }
}

function mapAnnouncement(doc: AnnouncementDoc): AnnouncementCard {
  return {
    id: String(doc.id),
    title: doc.title,
    date: formatDisplayDate(doc.publishedAt, null),
    publishedAtISO: doc.publishedAt || '',
    category: doc.category,
    image: mediaURL(doc.image, doc.imageUrl),
    excerpt: doc.excerpt ?? null,
    excerptPlain: richTextToPlainText(doc.excerpt),
    content: doc.content ?? null,
    contentPlain: richTextToPlainText(doc.content),
    slug: doc.slug,
  }
}

function mapEvent(doc: EventDoc): EventCard {
  const category = doc.category || 'other'
  return {
    id: String(doc.id),
    title: doc.title,
    description: doc.description ?? null,
    descriptionPlain: richTextToPlainText(doc.description),
    date: formatDisplayDate(doc.startDate, doc.displayDate),
    time: formatDisplayTime(doc.startDate, doc.displayTime),
    location: doc.location || '',
    image: mediaURL(doc.image, doc.imageUrl),
    category,
    categoryLabel: EVENT_CATEGORY_LABELS[category] || 'Other',
    startDateISO: doc.startDate,
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
    bio: doc.bio ?? null,
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
      desc1: doc.story.desc1 ?? null,
      desc2: doc.story.desc2 ?? null,
      img: mediaURL(doc.story.image, doc.story.imageUrl),
    },
    priestInCharge: {
      name: doc.priestInCharge.name,
      role: doc.priestInCharge.role,
      bio: doc.priestInCharge.bio ?? null,
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

type AboutGlobalDoc = {
  hero?: {
    title?: string | null
    description?: string | null
    image?: MediaLike
    imageUrl?: string | null
  } | null
  story?: {
    title?: string | null
    desc1?: RichTextData | null
    desc2?: RichTextData | null
    image?: MediaLike
    imageUrl?: string | null
  } | null
  values?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    items?:
      | {
          icon?: string | null
          title: string
          description: string
          id?: string | null
        }[]
      | null
  } | null
  priest?: {
    eyebrow?: string | null
    sectionTitle?: string | null
    sectionDescription?: string | null
    name?: string | null
    role?: string | null
    bio?: RichTextData | null
    image?: MediaLike
    imageUrl?: string | null
  } | null
  leadership?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
  } | null
  beliefs?: {
    title?: string | null
    introduction?: RichTextData | null
    items?: { title: string; description: string; id?: string | null }[] | null
    ctaLabel?: string | null
    ctaUrl?: string | null
    image?: MediaLike
    imageUrl?: string | null
  } | null
  cta?: {
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    primaryLabel?: string | null
    primaryUrl?: string | null
    secondaryLabel?: string | null
    secondaryUrl?: string | null
    backgroundImageUrl?: string | null
  } | null
}

function asValueIcon(value?: string | null): AboutValueIcon {
  const allowed: AboutValueIcon[] = ['book', 'users', 'heart', 'home', 'cross', 'hands']
  if (value && allowed.includes(value as AboutValueIcon)) {
    return value as AboutValueIcon
  }
  return 'book'
}

export async function getAboutPage(): Promise<AboutPageView> {
  const payload = await getPayload({ config })
  const doc = (await payload.findGlobal({
    slug: 'about',
    depth: 1,
  })) as AboutGlobalDoc

  return {
    hero: {
      title: doc.hero?.title || '',
      description: doc.hero?.description || '',
      image: mediaURL(doc.hero?.image, doc.hero?.imageUrl),
    },
    story: {
      title: doc.story?.title || '',
      desc1: doc.story?.desc1 ?? null,
      desc2: doc.story?.desc2 ?? null,
      image: mediaURL(doc.story?.image, doc.story?.imageUrl),
    },
    values: {
      eyebrow: doc.values?.eyebrow || '',
      title: doc.values?.title || '',
      description: doc.values?.description || '',
      items: (doc.values?.items || []).map((item) => ({
        icon: asValueIcon(item.icon),
        title: item.title,
        description: item.description,
      })),
    },
    priest: {
      eyebrow: doc.priest?.eyebrow || '',
      sectionTitle: doc.priest?.sectionTitle || '',
      sectionDescription: doc.priest?.sectionDescription || '',
      name: doc.priest?.name || '',
      role: doc.priest?.role || '',
      bio: doc.priest?.bio ?? null,
      image: mediaURL(doc.priest?.image, doc.priest?.imageUrl),
    },
    leadership: {
      eyebrow: doc.leadership?.eyebrow || '',
      title: doc.leadership?.title || '',
      description: doc.leadership?.description || '',
    },
    beliefs: {
      title: doc.beliefs?.title || '',
      introduction: doc.beliefs?.introduction ?? null,
      items: (doc.beliefs?.items || []).map((item) => ({
        title: item.title,
        description: item.description,
      })),
      ctaLabel: doc.beliefs?.ctaLabel || '',
      ctaUrl: doc.beliefs?.ctaUrl || '',
      image: mediaURL(doc.beliefs?.image, doc.beliefs?.imageUrl),
    },
    cta: {
      eyebrow: doc.cta?.eyebrow || '',
      title: doc.cta?.title || '',
      description: doc.cta?.description || '',
      primaryLabel: doc.cta?.primaryLabel || '',
      primaryUrl: doc.cta?.primaryUrl || '',
      secondaryLabel: doc.cta?.secondaryLabel || '',
      secondaryUrl: doc.cta?.secondaryUrl || '',
      backgroundImageUrl: doc.cta?.backgroundImageUrl || '',
    },
  }
}
