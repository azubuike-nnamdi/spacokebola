'use client'

import { RichText } from '@/components/RichText'
import type { LeadershipCard } from '@/utilities/churchContent'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  eyebrow: string
  title: string
  description: string
  leadershipTeam: LeadershipCard[]
}

export default function AboutLeadership({
  eyebrow,
  title,
  description,
  leadershipTeam,
}: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <p className="section-eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl mb-5">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14">
          {leadershipTeam.map((leader, idx) => (
            <motion.article
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(idx * 0.08, 0.3), duration: 0.5 }}
              className="border-t-2 border-primary pt-8 shadow-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-7 shadow-none rounded-none">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  quality={100}
                  className="object-cover shadow-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="font-montserrat text-xs uppercase tracking-[0.18em] text-primary mb-3">
                {leader.role}
              </p>
              <h3 className="text-xl mb-4">{leader.name}</h3>
              <div className="text-muted-foreground text-sm leading-relaxed">
                <RichText
                  data={leader.bio}
                  className="prose-sm prose-p:text-muted-foreground"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
