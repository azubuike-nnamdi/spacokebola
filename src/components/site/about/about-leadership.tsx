'use client'

import { Card, CardContent } from '@/components/ui/card'
import type { LeadershipCard } from '@/utilities/churchContent'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  leadershipTeam: LeadershipCard[]
}

export default function AboutLeadership({ leadershipTeam }: Props) {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 font-bold">Our Leadership Team</h2>
            <p className="text-muted-foreground">
              Meet the dedicated people who serve and lead our church community.
            </p>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((leader, idx) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: idx * 0.15, duration: 0.6, type: 'spring' }}
                  className="h-full"
                >
                  <Card className="border border-border/40 shadow-lg rounded-2xl overflow-hidden h-full flex flex-col p-0">
                    <motion.div
                      className="relative aspect-[4/3] bg-muted flex items-center justify-center p-0 m-0"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        className="object-cover w-full h-full rounded-t-2xl"
                        width={600}
                        height={450}
                      />
                    </motion.div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                      <p className="text-primary/80 text-sm mb-3">{leader.role}</p>
                      <p className="text-muted-foreground text-sm">{leader.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
