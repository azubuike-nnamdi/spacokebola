'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/ui/page-transition";
import { eventsData } from "@/data";
import { Calendar, Clock, MapPin } from "lucide-react";
import React from "react";
export default function EventDashboard() {

  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredEvents = eventsData.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);
  return (
    <PageTransition>
      <section className="section pt-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="mb-4">Upcoming Events</h1>
            <p className="text-muted-foreground">
              Join us for worship services, community gatherings, and special events at Grace Church.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-16">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {featuredEvents.length > 0 && (
            <>
              <h2 className="text-2xl mb-8">Featured Events</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden border border-border/50 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5">
                        <div className="h-48 md:h-full bg-muted">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="p-6 md:w-3/5">
                        <h3 className="text-xl mb-3">{event.title}</h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar size={16} className="mr-2 text-primary/70" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock size={16} className="mr-2 text-primary/70" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin size={16} className="mr-2 text-primary/70" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button>Learn More</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          <h2 className="text-2xl mb-8">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map(event => (
              <Card key={event.id} className="overflow-hidden border border-border/50 hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="mr-2 text-primary/70" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock size={16} className="mr-2 text-primary/70" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="mr-2 text-primary/70" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}