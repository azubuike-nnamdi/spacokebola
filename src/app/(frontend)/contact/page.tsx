import ContactLanding from '@/components/site/contact/contact-landing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with SPAC Oke Bola — visit St. Paul’s Anglican Church, Oke Bola, Ibadan, or send a message to the church office.',
}

export default function ContactPage() {
  return <ContactLanding />
}
