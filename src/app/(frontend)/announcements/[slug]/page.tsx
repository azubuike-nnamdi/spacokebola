import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { getPublishedAnnouncements } from '@/utilities/churchContent'
import { ANNOUNCEMENTS_URL } from '@/config/routes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function AnnouncementDetailPage({ params }: Args) {
  const { slug } = await params
  const announcements = await getPublishedAnnouncements()
  const announcement =
    announcements.find((item) => item.slug === slug) ||
    announcements.find((item) => item.id === slug)

  if (!announcement) notFound()

  return (
    <section className="section pt-12">
      <div className="container max-w-3xl">
        <p className="text-sm text-muted-foreground mb-2">{announcement.date}</p>
        <h1 className="mb-4">{announcement.title}</h1>
        <p className="text-sm mb-6">
          <span className="bg-secondary px-2 py-1 rounded-full">{announcement.category}</span>
        </p>
        <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg bg-muted">
          <Image
            src={announcement.image}
            alt={announcement.title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-lg text-muted-foreground mb-6">
          <RichText data={announcement.excerpt} />
        </div>
        <RichText data={announcement.content} />
        <div className="mt-10">
          <Button asChild variant="outline">
            <Link href={ANNOUNCEMENTS_URL}>Back to Announcements</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
