import { RichText } from '@/components/RichText'
import { Hero } from '@/components/site/homepage/hero'
import { Welcome } from '@/components/site/homepage/welcome'
import { Button } from '@/components/ui/button'
import { ANNOUNCEMENTS_URL, EVENTS_URL } from '@/config/routes'
import { getPublishedAnnouncements, getPublishedEvents } from '@/utilities/churchContent'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const [announcements, events] = await Promise.all([
    getPublishedAnnouncements(3),
    getPublishedEvents(3),
  ])

  return (
    <>
      <Hero />
      <Welcome />

      <section className="section bg-secondary/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <p className="section-eyebrow mb-3">Stay Updated</p>
              <h2 className="text-3xl md:text-4xl">Latest Announcements</h2>
            </div>
            <Link href={ANNOUNCEMENTS_URL} className="mt-4 md:mt-0">
              <Button variant="ghost" className="group text-primary">
                View All
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {announcements.length === 0 && (
              <p className="text-muted-foreground col-span-full">
                No published announcements yet. Add some in the admin panel.
              </p>
            )}
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="border-t-2 border-primary/80 bg-card pt-8 pb-2 px-1 md:px-2"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-5">
                  {announcement.date}
                </p>
                <h3 className="text-xl mb-5 leading-snug">{announcement.title}</h3>
                <div className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                  <RichText data={announcement.excerpt} className="prose-sm" />
                </div>
                <Link href={`${ANNOUNCEMENTS_URL}/${announcement.slug || announcement.id}`}>
                  <Button variant="link" className="px-0">
                    Read More
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <p className="section-eyebrow mb-3">Join Us</p>
              <h2 className="text-3xl md:text-4xl">Upcoming Events</h2>
            </div>
            <Link href={EVENTS_URL} className="mt-4 md:mt-0">
              <Button variant="ghost" className="group text-primary">
                View All Events
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
            {events.length === 0 && (
              <p className="text-muted-foreground col-span-full">
                No published events yet. Add some in the admin panel.
              </p>
            )}
            {events.map((event) => (
              <article
                key={event.id}
                className="py-6 border-b border-border first:pt-0 md:border-b-0 md:border-l md:border-border md:pl-8 md:first:border-l-0 md:first:pl-0"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-primary mb-3">
                  {event.date}
                </p>
                <h3 className="text-xl mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm">{event.time}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />

        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <p className="section-eyebrow mb-4">This Sunday</p>
          <h2 className="text-white text-3xl md:text-4xl mb-5">
            Join Us This Sunday
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Experience uplifting worship, meaningful messages, and a welcoming community.
          </p>
          <Button asChild size="lg">
            <Link href={EVENTS_URL}>Plan Your Visit</Link>
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <p className="section-eyebrow mb-3">Grow Your Faith</p>
              <h2 className="text-3xl md:text-4xl">Latest Message</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <div className="aspect-video overflow-hidden bg-muted">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1574185649768-3a4a13c38f6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary text-ink rounded-full flex items-center justify-center cursor-pointer hover:bg-gold-deep transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M6.66669 4.16667V15.8333L15.8334 10L6.66669 4.16667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl mb-4">Faith in Uncertain Times</h3>
              <p className="text-muted-foreground mb-6">
                Explore how we can maintain and grow our faith even in the midst of life&apos;s
                uncertainties and challenges.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="cursor-pointer">Watch Now</Button>
                <Button className="cursor-pointer" variant="outline">
                  All Messages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
