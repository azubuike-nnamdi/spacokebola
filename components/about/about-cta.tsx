import { Button } from "@/components/ui/button";
import { CONTACT_URL, EVENTS_URL } from "@/config/routes";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-white dark:text-black text-3xl md:text-4xl mb-6">Join Our Community</h2>
          <p className="text-white/90 dark:text-black/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            We&apos;d love to welcome you this Sunday. Experience the difference a church family can make in your life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={EVENTS_URL}>
              <Button size="lg" className="rounded-full bg-white dark:bg-black text-primary hover:bg-white/90 dark:hover:bg-black/90 cursor-pointer">
                Join Us Sunday
              </Button>
            </Link>
            <Link href={CONTACT_URL}>
              <Button size="lg" variant="outline" className="rounded-full text-primary dark:text-black border-white dark:border-black hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}