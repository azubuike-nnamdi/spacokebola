import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { RichTextData } from '@/utilities/churchContent'
import Image from 'next/image'
import Link from 'next/link'

type BeliefItem = {
  title: string
  description: string
}

type Props = {
  title: string
  introduction: RichTextData | null
  items: BeliefItem[]
  ctaLabel: string
  ctaUrl: string
  image: string
}

export default function AboutBelieve({
  title,
  introduction,
  items,
  ctaLabel,
  ctaUrl,
  image,
}: Readonly<Props>) {
  return (
    <section className="section bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="section-eyebrow mb-4">Faith</p>
            <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
            {introduction ? (
              <div className="text-muted-foreground mb-6">
                <RichText data={introduction} />
              </div>
            ) : null}
            <div className="space-y-6 mb-8">
              {items.map((item, index) => (
                <div key={item.title}>
                  {index > 0 ? <div className="h-px bg-border mb-6" /> : null}
                  <h4 className="font-medium mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            {ctaUrl && ctaLabel ? (
              <Button asChild variant="outline">
                <Link href={ctaUrl}>{ctaLabel}</Link>
              </Button>
            ) : null}
          </div>
          <div className="aspect-video lg:aspect-square bg-muted overflow-hidden order-1 lg:order-2">
            {image ? (
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                width={800}
                height={800}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
