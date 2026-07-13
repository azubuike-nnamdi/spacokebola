import { Hero } from '@/components/site/homepage/hero'
import { Welcome } from '@/components/site/homepage/welcome'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ANNOUNCEMENTS_URL, EVENTS_URL } from '@/config/routes'
import { getPublishedAnnouncements, getPublishedEvents } from '@/utilities/churchContent'
import { ArrowRight, Bell, BookOpen, Calendar } from 'lucide-react'
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

      <section className="section bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bell size={20} className="text-primary/80" />
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground">
                  Stay Updated
                </h4>
              </div>
              <h2 className="text-3xl">Latest Announcements</h2>
            </div>
            <Link href={ANNOUNCEMENTS_URL} className="mt-4 md:mt-0">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.length === 0 && (
              <p className="text-muted-foreground col-span-full">
                No published announcements yet. Add some in the admin panel.
              </p>
            )}
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border border-border/50 overflow-hidden">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{announcement.date}</p>
                  <h3 className="text-xl mb-3">{announcement.title}</h3>
                  <p className="text-muted-foreground mb-4">{announcement.excerpt}</p>
                  <Link href={`${ANNOUNCEMENTS_URL}/${announcement.slug || announcement.id}`}>
                    <Button variant="link" className="px-0">
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={20} className="text-primary/80" />
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground">Join Us</h4>
              </div>
              <h2 className="text-3xl">Upcoming Events</h2>
            </div>
            <Link href={EVENTS_URL} className="mt-4 md:mt-0">
              <Button variant="ghost" className="group">
                View All Events
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.length === 0 && (
              <p className="text-muted-foreground col-span-full">
                No published events yet. Add some in the admin panel.
              </p>
            )}
            {events.map((event) => (
              <Card key={event.id} className="border border-border/50 overflow-hidden">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                  <h3 className="text-xl mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-white dark:text-black text-3xl md:text-4xl mb-6">
            Join Us This Sunday
          </h2>
          <p className="text-white/90 dark:text-black/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Experience uplifting worship, meaningful messages, and a welcoming community.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-white text-primary dark:text-black hover:bg-white/90"
          >
            Plan Your Visit
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={20} className="text-primary/80" />
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground">
                  Grow Your Faith
                </h4>
              </div>
              <h2 className="text-3xl">Latest Message</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="aspect-video bg-muted rounded-md overflow-hidden">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1574185649768-3a4a13c38f6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
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
              <p className="text-muted-foreground mb-4">
                Explore how we can maintain and grow our faith even in the midst of life&apos;s
                uncertainties and challenges.
              </p>
              <div className="flex flex-wrap gap-4">
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
