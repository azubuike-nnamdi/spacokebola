'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageTransition } from '@/components/ui/page-transition'
import { Textarea } from '@/components/ui/textarea'
import { EVENTS_URL } from '@/config/routes'
import { transitionEaseOut } from '@/lib/animation'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const OFFICE_EMAIL = 'info@spacokebola.org'
const OFFICE_PHONE = '+234 800 000 0000'
const OFFICE_ADDRESS = 'No 7, Koyejo Street, Oke Bola, Ibadan, Oyo State, Nigeria'
const MAP_QUERY = encodeURIComponent('St Paul Anglican Church Oke Bola Ibadan')

const fieldClass =
  'h-12 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary'

type FormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function ContactLanding() {
  const [form, setForm] = React.useState<FormState>(initialForm)
  const [submitted, setSubmitted] = React.useState(false)
  const [isSending, setIsSending] = React.useState(false)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSending(true)

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')

    const mailto = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(
      form.subject || 'Website enquiry',
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    window.setTimeout(() => {
      setIsSending(false)
      setSubmitted(true)
      setForm(initialForm)
    }, 400)
  }

  return (
    <PageTransition>
      <section className="relative min-h-[72vh] flex items-end overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=2400&q=80')",
          }}
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/35"
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
            We would love to hear from you
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base md:text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.4 }}
          >
            Visit the church office, send a message, or join us in worship this Sunday.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionEaseOut, delay: 0.52 }}
          >
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-primary/70 pb-1 hover:border-primary transition-colors"
            >
              Send a message
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={transitionEaseOut}
            >
              <p className="section-eyebrow mb-3">Reach us</p>
              <h2 className="text-3xl md:text-4xl mb-8">Church office</h2>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <MapPin className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Address
                    </p>
                    <p className="text-foreground leading-relaxed">{OFFICE_ADDRESS}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Phone
                    </p>
                    <a
                      href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {OFFICE_PHONE}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${OFFICE_EMAIL}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {OFFICE_EMAIL}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Service times
                    </p>
                    <ul className="space-y-2 text-foreground">
                      <li>
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="mx-2 text-primary">·</span>
                        9:00 AM & 11:00 AM
                      </li>
                      <li>
                        <span className="text-muted-foreground">Wednesday</span>
                        <span className="mx-2 text-primary">·</span>
                        Bible Study 7:00 PM
                      </li>
                      <li>
                        <span className="text-muted-foreground">Friday</span>
                        <span className="mx-2 text-primary">·</span>
                        Youth Group 6:30 PM
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              id="contact-form"
              className="lg:col-span-7 scroll-mt-28"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...transitionEaseOut, delay: 0.1 }}
            >
              <p className="section-eyebrow mb-3">Message</p>
              <h2 className="text-3xl md:text-4xl mb-3">Send us a note</h2>
              <p className="text-muted-foreground mb-10 max-w-lg">
                Prayer requests, visit planning, or general enquiries — the church office will get
                back to you.
              </p>

              {submitted ? (
                <div className="border-t-2 border-primary pt-8">
                  <CheckCircle2 className="text-primary mb-4" size={32} />
                  <h3 className="text-2xl mb-3">Thank you</h3>
                  <p className="text-muted-foreground mb-8 max-w-md">
                    Your email client should open with your message. If it did not, write to us
                    directly at{' '}
                    <a href={`mailto:${OFFICE_EMAIL}`} className="text-primary hover:underline">
                      {OFFICE_EMAIL}
                    </a>
                    .
                  </p>
                  <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 border-t-2 border-primary pt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-montserrat text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Full name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={fieldClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-montserrat text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={fieldClass}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-montserrat text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Phone <span className="normal-case tracking-normal">(optional)</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={fieldClass}
                        placeholder="+234 …"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-montserrat text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        className={fieldClass}
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-montserrat text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className={`${fieldClass} min-h-32 resize-y`}
                      placeholder="Write your message…"
                    />
                  </div>

                  <Button type="submit" size="lg" isLoading={isSending} loadingText="Opening…">
                    Send message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-0">
        <div className="container mb-10 md:mb-14">
          <p className="section-eyebrow mb-3">Find us</p>
          <h2 className="text-3xl md:text-4xl">On the map</h2>
        </div>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-muted">
          <iframe
            title="Map to Oke Bola Archdeaconry"
            src={`https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="absolute inset-0 h-full w-full border-0 grayscale-[30%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=2400&q=80')",
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
          <p className="section-eyebrow mb-4">Worship</p>
          <h2 className="font-montserrat text-white text-3xl md:text-4xl mb-4">
            Join us this Sunday
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Come as you are. We would be glad to welcome you to Oke Bola Archdeaconry.
          </p>
          <Button asChild size="lg">
            <Link href={EVENTS_URL}>See upcoming services</Link>
          </Button>
        </motion.div>
      </section>
    </PageTransition>
  )
}
