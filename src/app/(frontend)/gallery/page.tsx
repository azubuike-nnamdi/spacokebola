import GalleryDashboard from '@/components/site/gallery/gallery-dashboard'
import { getGallery } from '@/utilities/churchContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Moments of worship, fellowship, and community service',
}

export default async function GalleryPage() {
  const galleryItems = await getGallery()
  return <GalleryDashboard galleryItems={galleryItems} />
}
