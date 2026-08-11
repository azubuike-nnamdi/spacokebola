import type { AboutValueIcon } from '@/utilities/churchContent'
import { Book, Cross, HandHeart, Heart, Home, Users, type LucideIcon } from 'lucide-react'

const iconMap: Record<AboutValueIcon, LucideIcon> = {
  book: Book,
  users: Users,
  heart: Heart,
  home: Home,
  cross: Cross,
  hands: HandHeart,
}

type ValueItem = {
  icon: AboutValueIcon
  title: string
  description: string
}

type Props = {
  eyebrow: string
  title: string
  description: string
  items: ValueItem[]
}

export default function AboutValue({ eyebrow, title, description, items }: Readonly<Props>) {
  return (
    <section className="section bg-secondary/40">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <p className="section-eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl mb-5">{title}</h2>
          <p className="text-muted-foreground text-base md:text-lg">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || Book
            return (
              <article key={item.title} className="border-t-2 border-primary pt-8">
                <Icon className="text-primary mb-6" size={22} />
                <h3 className="text-xl mb-4 leading-snug">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
