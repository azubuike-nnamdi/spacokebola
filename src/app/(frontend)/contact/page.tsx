import { PageTransition } from '@/components/ui/page-transition'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with SPAC Oke Bola Archdeaconry',
}

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="section pt-16">
        <div className="container max-w-3xl text-center">
          <h1 className="mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-8">
            We would love to hear from you. Visit us at St. Paul&apos;s Anglican Church, Oke Bola,
            Ibadan, or reach out through the church office.
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p>St. Paul&apos;s Anglican Church Oke Bola</p>
            <p>Ibadan, Oyo State, Nigeria</p>
            <p className="pt-4">Motto: The Action Place of the Holy Spirit</p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
