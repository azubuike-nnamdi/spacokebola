import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  eyebrow: string
  title: string
  description: string
  primaryLabel: string
  primaryUrl: string
  secondaryLabel: string
  secondaryUrl: string
  backgroundImageUrl: string
}

export default function AboutCTA({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  backgroundImageUrl,
}: Readonly<Props>) {
  return (
    <section className="relative py-24 overflow-hidden">
      {backgroundImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-ink" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />

      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        {eyebrow ? <p className="section-eyebrow mb-4">{eyebrow}</p> : null}
        {title ? <h2 className="text-white text-3xl md:text-4xl mb-5">{title}</h2> : null}
        {description ? <p className="text-white/75 text-lg mb-8">{description}</p> : null}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {primaryUrl && primaryLabel ? (
            <Button asChild size="lg">
              <Link href={primaryUrl}>{primaryLabel}</Link>
            </Button>
          ) : null}
          {secondaryUrl && secondaryLabel ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:border-primary hover:text-primary bg-transparent"
            >
              <Link href={secondaryUrl}>{secondaryLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
