export default function AboutHero() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495996797143-9fc04e79e304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-primary/50 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 text-center">
          <h1 className="text-white mb-6">About The Church</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            A community of faith, hope, and love in the city of Ibadan since 1936.
          </p>
        </div>
      </section>
    </div>
  )
}