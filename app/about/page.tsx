import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";
import { Separator } from "@/components/ui/separator";
import { CONTACT_URL, EVENTS_URL } from "@/config/routes";
import { leadershipTeam } from "@/data";
import { Book, Heart, Home, Users } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495996797143-9fc04e79e304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-primary/50 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 text-center">
          <h1 className="text-white mb-6">About Our Church</h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            A community of faith, hope, and love in the heart of Faithville since 1952.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Grace Church was founded in 1952 by a small group of families with a vision to create a place of worship that would serve the growing community of Faithville.
              </p>
              <p className="text-muted-foreground mb-4">
                Over the decades, we've grown from a small congregation meeting in a renovated storefront to a thriving church family with multiple ministries and outreach programs serving our community and beyond.
              </p>
              <p className="text-muted-foreground mb-6">
                While much has changed over the years, our commitment to sharing the love of Christ, building meaningful relationships, and making a positive impact in our world remains the same.
              </p>
              <Link href={CONTACT_URL}>
                <Button className="rounded-full">Connect With Us</Button>
              </Link>
            </div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Historic church building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6">Our Values</h2>
            <p className="text-muted-foreground">
              These core values guide everything we do as a church family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardAction className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Book className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Biblical Teaching</h3>
                <p className="text-muted-foreground">
                  We are committed to the authority of Scripture and teaching the whole counsel of God.
                </p>
              </CardContent>
            </CardAction>

            <Card className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Authentic Community</h3>
                <p className="text-muted-foreground">
                  We foster genuine relationships where people can be known, loved, and supported.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Compassionate Service</h3>
                <p className="text-muted-foreground">
                  We actively seek ways to demonstrate God's love through serving our community and world.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50 text-center">
              <CardContent className="pt-8 px-6 pb-6">
                <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-4">Welcoming Environment</h3>
                <p className="text-muted-foreground">
                  We strive to create a place where everyone feels welcome, regardless of background or life stage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6">Our Leadership Team</h2>
            <p className="text-muted-foreground">
              Meet the dedicated people who serve and lead our church community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader) => (
              <Card key={leader.id} className="border border-border/50 overflow-hidden">
                <div className="aspect-square bg-muted">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl mb-1">{leader.name}</h3>
                  <p className="text-primary/80 mb-4">{leader.role}</p>
                  <p className="text-muted-foreground text-sm">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="section bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl mb-6">What We Believe</h2>
              <p className="text-muted-foreground mb-4">
                At Grace Church, we affirm the historic Christian faith as revealed in Scripture. Our beliefs are centered on the gospel—the good news that God saves sinners through the life, death, and resurrection of Jesus Christ.
              </p>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">The Bible</h4>
                  <p className="text-muted-foreground text-sm">We believe the Bible is God's Word, divinely inspired and without error, the final authority for all matters of faith and conduct.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">God</h4>
                  <p className="text-muted-foreground text-sm">We believe in one God who exists eternally in three persons: Father, Son, and Holy Spirit.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Salvation</h4>
                  <p className="text-muted-foreground text-sm">We believe salvation is by grace alone, through faith alone, in Christ alone.</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-full">Read Our Full Statement of Faith</Button>
            </div>
            <div className="aspect-video lg:aspect-square bg-muted rounded-lg overflow-hidden order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Open Bible"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
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
            We'd love to welcome you this Sunday. Experience the difference a church family can make in your life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={EVENTS_URL}>
              <Button size="lg" className="rounded-full bg-white dark:bg-black text-primary hover:bg-white/90 dark:hover:bg-black/90">
                Join Us Sunday
              </Button>
            </Link>
            <Link href={CONTACT_URL}>
              <Button size="lg" variant="outline" className="rounded-full text-white dark:text-black border-white dark:border-black hover:bg-white/10 dark:hover:bg-black/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}