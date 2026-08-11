import { Button } from '@/components/ui/button'
import { ABOUT_URL, CONTACT_URL, EVENTS_URL } from '@/config/routes'
import { ArrowRight, Clock, Heart, MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const serviceTimes = [
  { label: 'Sunday Mornings', time: '7:00 & 10:00 AM' },
  { label: 'EFAC Prayer', time: 'Tuesdays 5:00 PM' },
  { label: 'Wednesday Prayer', time: '10:00 AM & 5:00 PM' },
  { label: 'Bible Study Group', time: 'Fridays 5:00 PM' },
]

export const Welcome: React.FC = () => {
  return (
    <section id="welcome-section" className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-24">
          <p className="section-eyebrow mb-4">Welcome</p>
          <h2 className="text-3xl md:text-4xl mb-6">A community of faith</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            St. Paul&apos;s Anglican Church is a welcoming community rooted in the rich traditions of
            the Anglican faith. We are a place where people can grow in their relationship with Jesus
            Christ, participate in meaningful worship, and find fellowship in a supportive,
            Christ-centered community. At St. Paul&apos;s, we believe in creating sacred space for
            reverent worship, spiritual formation, and service, where individuals can discover and
            use their God-given gifts for His glory and the good of His Church.
          </p>
          <div className="brand-rule mb-10" />
          <Link href={ABOUT_URL}>
            <Button size="lg" className="cursor-pointer">
              Learn More About Us
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14 lg:gap-16">
          <article className="border-t-2 border-primary pt-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-primary shrink-0" size={20} />
              <h3 className="text-xl mb-0">Service Times</h3>
            </div>
            <ul className="space-y-5">
              {serviceTimes.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className="border-t-2 border-primary pt-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-primary shrink-0" size={20} />
              <h3 className="text-xl mb-0">Visit Us</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
              7 Koyejo Street, Oke Bola
              <br />
              Ibadan, Oyo State, Nigeria
            </p>
            <Link
              href={CONTACT_URL}
              className="inline-flex items-center gap-2 text-sm font-montserrat tracking-wide text-primary hover:text-gold-deep transition-colors group"
            >
              Get Directions
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </article>

          <article className="border-t-2 border-primary pt-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-primary shrink-0" size={20} />
              <h3 className="text-xl mb-0">Get Connected</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
              Join one of our small groups and ministries to grow in faith and build lasting
              relationships.
            </p>
            <Link
              href={EVENTS_URL}
              className="inline-flex items-center gap-2 text-sm font-montserrat tracking-wide text-primary hover:text-gold-deep transition-colors group"
            >
              Find Your Place
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
