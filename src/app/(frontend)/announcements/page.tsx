import AnnouncementLanding from '@/components/site/announcement/announcement-landing'
import { getPublishedAnnouncements } from '@/utilities/churchContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Announcements',
  description: 'Stay informed about what is happening in our church community',
}

export default async function AnnouncementsPage() {
  const announcements = await getPublishedAnnouncements()
  return <AnnouncementLanding announcements={announcements} />
}
