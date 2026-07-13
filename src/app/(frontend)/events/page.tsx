import EventDashboard from '@/components/site/event/event-dashboard'
import { getPublishedEvents } from '@/utilities/churchContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming worship services, gatherings, and special events',
}

export default async function EventsPage() {
  const events = await getPublishedEvents()
  return <EventDashboard events={events} />
}
