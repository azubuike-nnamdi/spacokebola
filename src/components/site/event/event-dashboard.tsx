'use client'

import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/ui/page-transition'
import { CONTACT_URL } from '@/config/routes'
import { transitionEaseOut } from '@/lib/animation'
import type { EventCard } from '@/utilities/churchContent'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Calendar, Clock, MapPin, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  events: EventCard[]
}

function monthKey(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'Upcoming'
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function dayParts(iso: string, fallbackDate: string): { day: string; weekday: string } {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) {
    return { day: fallbackDate.slice(0, 6) || '—', weekday: '' }
  }
  return {
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
  }
}

export default function EventDashboard({ events }: Props) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [openId, setOpenId] = React.useState<string | null>(null)

  const filteredEvents = events.filter((event) => {
    const q = searchTerm.toLowerCase()
    if (!q) return true
    return (
      event.title.toLowerCase().includes(q) ||
      event.descriptionPlain.toLowerCase().includes(q) ||
      event.location.toLowerCase().includes(q) ||
      event.categoryLabel.toLowerCase().includes(q)
    )
  })

  const featured = filteredEvents.find((event) => event.featured) ?? null
  const listEvents = filteredEvents.filter((event) => event.id !== featured?.id)

  const grouped = listEvents.reduce<Record<string, EventCard[]>>((acc, event) => {
    const key = monthKey(event.startDateISO)
    if (!acc[key]) acc[key] = []
    acc[key].push(event)
    return acc
  }, {})

  const monthOrder = Object.keys(grouped)

  return (
    <PageTransition>
      <section className="relative min-h-[78vh] flex items-end overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=2400&q=80')",
          }}
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/30"
          aria-hidden="true"
        />

        <div className="container relative z-10 pb-16 pt-28 md:pb-20">
          <motion.p
            className="font-montserrat text-xs md:text-sm uppercase tracking-[0.28em] text-primary mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.15 }}
          >
            Oke Bola Archdeaconry
          </motion.p>
          <motion.h1
            className="font-montserrat text-white text-4xl md:text-6xl lg:text-7xl max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.28 }}
          >
            Gather with us
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base md:text-lg text-white/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.4 }}
          >
            Worship services, fellowship nights, and special gatherings across our church family.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.52 }}
          >
            <a
              href="#upcoming"
              className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-primary/70 pb-1 hover:border-primary transition-colors"
            >
              See upcoming events
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {featured && (
        <section className="relative">
          <div className="relative min-h-[50vh] md:min-h-[60vh]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              quality={100}
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="container pb-10 md:pb-14 pt-24">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={transitionEaseOut}
                >
                  <p className="font-montserrat text-xs uppercase tracking-[0.24em] text-white/80 mb-3">
                    Featured · {featured.categoryLabel}
                  </p>
                  <h2 className="font-montserrat text-white text-3xl md:text-5xl max-w-3xl mb-4">
                    {featured.title}
                  </h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {featured.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} />
                      {featured.time}
                    </span>
                    {featured.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} />
                        {featured.location}
                      </span>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {featured.description ? (
            <div className="container py-10 md:py-14">
              <div className="max-w-2xl text-muted-foreground">
                <RichText data={featured.description} />
              </div>
            </div>
          ) : null}
        </section>
      )}

      <section id="upcoming" className="section scroll-mt-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="font-montserrat text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">
                Calendar
              </p>
              <h2 className="font-montserrat text-3xl md:text-4xl">Upcoming events</h2>
            </div>
            <label className="relative w-full md:w-80">
              <span className="sr-only">Search events</span>
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                placeholder="Search by title, place, or type…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-transparent border-0 border-b border-border focus:border-foreground outline-none transition-colors"
              />
            </label>
          </div>

          {!events.length ? (
            <p className="text-muted-foreground py-12">
              No published events yet. Add some in the admin panel.
            </p>
          ) : null}

          {events.length > 0 && filteredEvents.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg mb-2">No matching events</p>
              <p className="text-muted-foreground mb-6">Try a different search term.</p>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear search
              </Button>
            </div>
          ) : null}

          <div className="space-y-14">
            {monthOrder.map((month) => (
              <div key={month}>
                <h3 className="font-montserrat text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
                  {month}
                </h3>
                <ul className="divide-y divide-border/70 border-y border-border/70">
                  {grouped[month].map((event, index) => {
                    const { day, weekday } = dayParts(event.startDateISO, event.date)
                    const isOpen = openId === event.id
                    return (
                      <motion.li
                        key={event.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ ...transitionEaseOut, delay: Math.min(index * 0.05, 0.25) }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : event.id)}
                          className="w-full text-left py-6 md:py-8 grid grid-cols-[4.5rem_1fr] md:grid-cols-[5.5rem_1fr_auto] gap-4 md:gap-8 items-start group"
                          aria-expanded={isOpen}
                        >
                          <div className="pt-1">
                            <p className="font-montserrat text-3xl md:text-4xl leading-none tracking-tight">
                              {day}
                            </p>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                              {weekday}
                            </p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
                              {event.categoryLabel}
                            </p>
                            <h4 className="text-xl md:text-2xl font-montserrat group-hover:opacity-80 transition-opacity">
                              {event.title}
                            </h4>
                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <Clock size={14} />
                                {event.time}
                              </span>
                              {event.location ? (
                                <span className="inline-flex items-center gap-1.5">
                                  <MapPin size={14} />
                                  {event.location}
                                </span>
                              ) : null}
                            </div>
                            <AnimatePresence initial={false}>
                              {isOpen && event.description ? (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 text-muted-foreground max-w-2xl">
                                    <RichText data={event.description} className="prose-sm" />
                                  </div>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                          <span className="hidden md:inline text-sm text-muted-foreground pt-2 group-hover:text-foreground transition-colors">
                            {isOpen ? 'Hide details' : 'Details'}
                          </span>
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          quality={100}
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />
        <motion.div
          className="container relative z-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={transitionEaseOut}
        >
          <p className="section-eyebrow mb-4">Visit</p>
          <h2 className="font-montserrat text-white text-3xl md:text-4xl mb-4">
            Plan your visit
          </h2>
          <p className="text-white/75 text-lg mb-8">
            New to Oke Bola Archdeaconry? We would love to welcome you this Sunday.
          </p>
          <Button
            asChild
            size="lg"
          >
            <Link href={CONTACT_URL}>Get in touch</Link>
          </Button>
        </motion.div>
      </section>
    </PageTransition>
  )
}
