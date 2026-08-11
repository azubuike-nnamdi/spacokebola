import { links } from '@/data'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white">
      <div className="h-1 w-full bg-linear-to-r from-gold-deep via-primary to-gold-deep" />
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Image
              src="/assets/img/spac-logo.png"
              alt="Oke Bola Archdeaconry"
              width={88}
              height={88}
            />
            <p className="font-montserrat text-sm uppercase tracking-[0.18em] text-primary mb-2">
              Oke Bola Archdeaconry
            </p>
            <p className="text-white/65 mb-5 max-w-xs text-sm leading-relaxed">
              The Action Place of the Holy Spirit
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-white/55 hover:text-primary transition-colors"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-white/55 hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-white/55 hover:text-primary transition-colors"
              >
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-montserrat text-sm uppercase tracking-[0.18em] text-primary mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className="text-white/65 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-montserrat text-sm uppercase tracking-[0.18em] text-primary mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3 justify-center sm:justify-start">
                <MapPin
                  size={16}
                  className="text-primary mb-1 sm:mb-0 mx-auto sm:mx-0 flex-shrink-0 mt-0.5"
                />
                <span className="text-white/65">No 7, Koyejo Street, Oke Bola, Ibadan</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:gap-3 justify-center sm:justify-start">
                <Phone
                  size={16}
                  className="text-primary mb-1 sm:mb-0 mx-auto sm:mx-0 flex-shrink-0"
                />
                <span className="text-white/65">+234 800 000 0000</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center sm:gap-3 justify-center sm:justify-start">
                <Mail
                  size={16}
                  className="text-primary mb-1 sm:mb-0 mx-auto sm:mx-0 flex-shrink-0"
                />
                <span className="text-white/65">info@spacokebola.org</span>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-montserrat text-sm uppercase tracking-[0.18em] text-primary mb-5">
              Service Times
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-white/65">
                <span className="block font-medium text-primary mb-0.5">Sunday Services</span>
                9:00 AM & 11:00 AM
              </li>
              <li className="text-white/65">
                <span className="block font-medium text-primary mb-0.5">Wednesday Bible Study</span>
                7:00 PM
              </li>
              <li className="text-white/65">
                <span className="block font-medium text-primary mb-0.5">Youth Group</span>
                Fridays at 6:30 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-white/45">
          <p>&copy; {currentYear} Oke Bola Archdeaconry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
