import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ABOUT_URL, CONTACT_URL, EVENTS_URL } from '@/config/routes';
import { Clock, Heart, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Welcome: React.FC = () => {
  return (
    <section id="welcome-section" className="section">
      <div className="container">
        {/* Welcome Message */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl mb-6">Welcome to Our Community of Faith</h2>
          <p className="text-muted-foreground mb-8">
            St. Paul&apos;s Anglican Church is a welcoming community rooted in the rich traditions of the Anglican faith.
            We are a place where people can grow in their relationship with Jesus Christ, participate in meaningful worship, and find fellowship in a supportive, Christ-centered community. At St. Paul&apos;s, we believe in creating sacred space for reverent worship, spiritual formation, and service, where individuals can discover and use their God-given gifts for His glory and the good of His Church.
          </p>
          <Separator className="max-w-xs mx-auto my-8" />
          <Link href={ABOUT_URL}>
            <Button size="lg" className="rounded-full cursor-pointer">Learn More About Us</Button>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Times */}
          <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl text-center mb-4">Service Times</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Sunday Mornings</span>
                  <span>7:00 & 10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Wednesday</span>
                  <span>10:00 AM & 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Bible Study Group</span>
                  <span>Fridays 5:00 PM</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl text-center mb-4">Visit Us</h3>
              <p className="text-center mb-4">
                7 Koyejo Street, Oke Bola<br />
                Ibadan, Oyo State, Nigeria
              </p>

              <div className="mt-4 text-center">
                <Link href={CONTACT_URL}>
                  <Button variant="outline" size="sm">Get Directions</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl text-center mb-4">Get Connected</h3>
              <p className="text-center mb-4">
                Join one of our many small groups and ministries to grow in faith and build lasting relationships.
              </p>
              <div className="mt-4 text-center">
                <Link href={EVENTS_URL}>
                  <Button variant="outline" size="sm">Find Your Place</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};