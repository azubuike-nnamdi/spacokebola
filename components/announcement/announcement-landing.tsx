'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/data";
import { useGetAnnouncements } from "@/hooks/query/useGetAnnouncement";
import { Announcement } from "@/lib/type-declaration";
import { Bell, CalendarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { AnnouncementCardSkeleton } from "./announcement-card-skeleton";

export default function AnnouncementLanding() {

  const { data: announcements, isPending: isLoadingAnnouncements, error: announcementsError } = useGetAnnouncements();

  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter announcements based on category and search query
  const filteredAnnouncements = (announcements ?? []).filter((announcement: Announcement) => {
    const matchesCategory = activeCategory === "All" || announcement.category === activeCategory;
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function getGridContent() {
    if (announcementsError) {
      return (
        <div className="col-span-full text-center py-16 text-red-600 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-2xl mb-4">Error loading announcements</h3>
          <p className="text-muted-foreground mb-6">{announcementsError.message}</p>
        </div>
      );
    }
    if (isLoadingAnnouncements) {
      return Array.from({ length: 6 }).map((_, i) => <AnnouncementCardSkeleton key={i} />);
    }
    if (filteredAnnouncements?.length > 0) {
      return filteredAnnouncements.map((announcement: Announcement) => (
        <Card key={announcement.id} className="overflow-hidden border border-border/50 shadow-md rounded-lg hover:shadow-lg transition-shadow">
          <div className="aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src={announcement.image}
              alt={announcement.title}
              className="w-full h-full object-cover rounded-t-lg transition-transform hover:scale-105 duration-300"
              width={800}
              height={450}
              style={{ aspectRatio: "16/9" }}
            />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarIcon size={14} />
                {announcement.date}
              </span>
              <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                {announcement.category}
              </span>
            </div>
            <h3 className="text-xl mb-3">{announcement.title}</h3>
            <p className="text-muted-foreground mb-4">{announcement.content}</p>
            <Separator className="my-4" />
            <div className="mt-4">
              <Button variant="link" className="px-0">
                Read Full Announcement
              </Button>
            </div>
          </CardContent>
        </Card>
      ));
    }
    return (
      <div className="col-span-full text-center py-16">
        <h3 className="text-2xl mb-4">No announcements found</h3>
        <p className="text-muted-foreground mb-6">
          No announcements match your current search or filter criteria.
        </p>
        <Button onClick={() => { setActiveCategory("All"); setSearchQuery("") }}>
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-primary/50 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell className="text-white" size={24} />
            <h1 className="text-white">Announcements</h1>
          </div>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Stay informed about what&apos;s happening in our church community
          </p>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="section">
        <div className="container">
          {/* Filter and Search */}
          <div className="flex flex-col md:flex-row gap-6 justify-between mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search announcements..."
                  className="w-full px-4 py-2 border border-border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getGridContent()}
          </div>
        </div>
      </section>
    </div>
  )
}