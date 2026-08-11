'use client'

import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/ui/page-transition'
import { ANNOUNCEMENTS_URL, CONTACT_URL } from '@/config/routes'
import { transitionEaseOut } from '@/lib/animation'
import type { AnnouncementCard } from '@/utilities/churchContent'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, CalendarIcon, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  announcements: AnnouncementCard[]
}

function monthKey(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'Recent'
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

export default function AnnouncementLanding({ announcements }: Props) {
  const [activeCategory, setActiveCategory] = React.useState('All')
  const [searchQuery, setSearchQuery] = React.useState('')

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(announcements.map((a) => a.category).filter(Boolean)))
    return ['All', ...unique.sort()]
  }, [announcements])

  const filtered = announcements.filter((announcement) => {
    const matchesCategory =
      activeCategory === 'All' || announcement.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      announcement.title.toLowerCase().includes(q) ||
      announcement.excerptPlain.toLowerCase().includes(q) ||
      announcement.contentPlain.toLowerCase().includes(q) ||
      announcement.category.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const featured =
    filtered.find((a) => a.category === 'Urgent') ?? filtered[0] ?? null
  const listItems = filtered.filter((a) => a.id !== featured?.id)

  const grouped = listItems.reduce<Record<string, AnnouncementCard[]>>((acc, item) => {
    const key = monthKey(item.publishedAtISO)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
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
              "url('https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=2400&q=80')",
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
            Stay connected
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base md:text-lg text-white/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.4 }}
          >
            News, updates, and notices from our church family — so you never miss what matters.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.52 }}
          >
            <a
              href="#latest"
              className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-primary/70 pb-1 hover:border-primary transition-colors"
            >
              Browse announcements
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
                    {featured.category === 'Urgent' ? 'Urgent' : 'Latest'} · {featured.category}
                  </p>
                  <h2 className="font-montserrat text-white text-3xl md:text-5xl max-w-3xl mb-4">
                    {featured.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarIcon size={14} />
                      {featured.date}
                    </span>
                    <Link
                      href={`${ANNOUNCEMENTS_URL}/${featured.slug || featured.id}`}
                      className="inline-flex items-center gap-2 border-b border-primary/70 pb-0.5 hover:border-primary transition-colors"
                    >
                      Read full announcement
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {featured.excerpt ? (
            <div className="container py-10 md:py-14">
              <div className="max-w-2xl text-muted-foreground">
                <RichText data={featured.excerpt} />
              </div>
            </div>
          ) : null}
        </section>
      )}

      <section id="latest" className="section scroll-mt-24">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <div>
              <p className="font-montserrat text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">
                Updates
              </p>
              <h2 className="font-montserrat text-3xl md:text-4xl">All announcements</h2>
            </div>
            <label className="relative w-full lg:w-80">
              <span className="sr-only">Search announcements</span>
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                placeholder="Search by title or topic…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-transparent border-0 border-b border-border focus:border-foreground outline-none transition-colors"
              />
            </label>
          </div>

          {categories.length > 1 && (
            <div className="flex gap-6 overflow-x-auto pb-4 mb-10 border-b border-border/70">
              {categories.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap pb-3 text-sm font-montserrat tracking-wide transition-colors border-b-2 -mb-px ${
                      isActive
                        ? 'border-foreground text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          )}

          {!announcements.length ? (
            <p className="text-muted-foreground py-12">
              No published announcements yet. Add some in the admin panel.
            </p>
          ) : null}

          {announcements.length > 0 && filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg mb-2">No matching announcements</p>
              <p className="text-muted-foreground mb-6">
                Try a different search or category.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory('All')
                  setSearchQuery('')
                }}
              >
                Reset filters
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
                  {grouped[month].map((announcement, index) => {
                    const { day, weekday } = dayParts(
                      announcement.publishedAtISO,
                      announcement.date,
                    )
                    const href = `${ANNOUNCEMENTS_URL}/${announcement.slug || announcement.id}`
                    return (
                      <motion.li
                        key={announcement.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          ...transitionEaseOut,
                          delay: Math.min(index * 0.05, 0.25),
                        }}
                      >
                        <Link
                          href={href}
                          className="py-6 md:py-8 grid grid-cols-[4.5rem_1fr] md:grid-cols-[5.5rem_1fr_auto] gap-4 md:gap-8 items-start group"
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
                              {announcement.category}
                            </p>
                            <h4 className="text-xl md:text-2xl font-montserrat group-hover:opacity-80 transition-opacity">
                              {announcement.title}
                            </h4>
                            {announcement.excerptPlain ? (
                              <p className="mt-3 text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                                {announcement.excerptPlain}
                              </p>
                            ) : null}
                          </div>
                          <span className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground pt-2 group-hover:text-foreground transition-colors">
                            Read
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </Link>
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=2400&q=80')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />
        <motion.div
          className="container relative z-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={transitionEaseOut}
        >
          <p className="section-eyebrow mb-4">Connect</p>
          <h2 className="font-montserrat text-white text-3xl md:text-4xl mb-4">
            Have a question?
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Reach out to the church office — we are here to help you stay informed and connected.
          </p>
          <Button
            asChild
            size="lg"
          >
            <Link href={CONTACT_URL}>Contact us</Link>
          </Button>
        </motion.div>
      </section>
    </PageTransition>
  )
}
