type AboutHeroProps = {
  title: string
  description: string
  image?: string
}

export default function AboutHero({ title, description, image }: Readonly<AboutHeroProps>) {
  return (
    <div>
      <section className="relative pt-20 pb-20 overflow-hidden">
        {image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-ink/75" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-ink" aria-hidden="true" />
        )}

        <div className="container relative z-10 text-center">
          <p className="section-eyebrow mb-4">About</p>
          {title ? <h1 className="text-white mb-6">{title}</h1> : null}
          {description ? (
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">{description}</p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
