'use client'

import { RichText } from '@/components/RichText'
import type { RichTextData } from '@/utilities/churchContent'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface AboutPriestProps {
  eyebrow: string
  sectionTitle: string
  sectionDescription: string
  name: string
  role: string
  bio: RichTextData | null
  image: string
}

export default function AboutPriest({
  eyebrow,
  sectionTitle,
  sectionDescription,
  name,
  role,
  bio,
  image,
}: AboutPriestProps) {
  return (
    <section className="section bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <p className="section-eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl mb-5">{sectionTitle}</h2>
          <p className="text-muted-foreground">{sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 order-1 shadow-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted shadow-none rounded-none">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  quality={100}
                  className="object-cover shadow-none"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="md:col-span-7 order-2 border-t-2 border-primary pt-8 md:border-t-0 md:pt-0 md:border-l-2 md:border-primary md:pl-12 shadow-none"
          >
            <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-primary mb-4">
              {role}
            </p>
            <h3 className="text-3xl md:text-4xl mb-6">{name}</h3>
            {bio ? (
              <div className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                <RichText data={bio} className="prose-p:text-muted-foreground" />
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
