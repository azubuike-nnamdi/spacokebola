import { AboutStoryProps } from '@/lib/type-declaration'
import { RichText } from '@/components/RichText'
import type { RichTextData } from '@/utilities/churchContent'
import Image from 'next/image'

type Props = {
  title: string
  desc1: string | RichTextData | null
  desc2: string | RichTextData | null
  img: string
}

function isRichText(value: string | RichTextData | null): value is RichTextData {
  return typeof value === 'object' && value !== null && 'root' in value
}

export default function AboutStory({ title, desc1, desc2, img }: Readonly<Props>) {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
              <div className="text-muted-foreground mb-4">
                {isRichText(desc1) ? (
                  <RichText data={desc1} className="prose-p:text-muted-foreground" />
                ) : (
                  <p>{desc1}</p>
                )}
              </div>
              <div className="text-muted-foreground mb-4">
                {isRichText(desc2) ? (
                  <RichText data={desc2} className="prose-p:text-muted-foreground" />
                ) : (
                  <p>{desc2}</p>
                )}
              </div>
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={img}
                alt="Historic church building"
                className="w-full h-full object-cover"
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Keep type export compatibility for static About page strings
export type { AboutStoryProps }
