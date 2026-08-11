import { RichText } from '@/components/RichText'
import type { RichTextData } from '@/utilities/churchContent'
import Image from 'next/image'

type Props = {
  title: string
  desc1: RichTextData | null
  desc2: RichTextData | null
  image: string
}

export default function AboutStoryWithPriest({ title, desc1, desc2, image }: Readonly<Props>) {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="section-eyebrow mb-4">Heritage</p>
            <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
            {desc1 ? (
              <div className="text-muted-foreground mb-4">
                <RichText data={desc1} />
              </div>
            ) : null}
            {desc2 ? (
              <div className="text-muted-foreground mb-4">
                <RichText data={desc2} />
              </div>
            ) : null}
          </div>

          {image ? (
            <div className="order-1 md:order-2 overflow-hidden">
              <Image
                src={image}
                alt={title}
                className="w-full h-64 md:h-[520px] object-cover"
                width={900}
                height={900}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
