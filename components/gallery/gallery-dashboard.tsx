'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";
import { galleryItems } from "@/data";
import React from "react";

export default function GalleryDashboard() {
  const [activeCategory, setActiveCategory] = React.useState<number | null>(null);
  return (
    <PageTransition>
      <section className="section pt-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="mb-4">Our Gallery</h1>
            <p className="text-muted-foreground">
              Capturing moments of worship, fellowship, and community service at Grace Church.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => setActiveCategory(null)}
              className="rounded-full"
            >
              All Categories
            </Button>
            {galleryItems.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full"
              >
                {category.category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems
              .filter(category => activeCategory === null || category.id === activeCategory)
              .flatMap(category =>
                category.images.map((image, index) => (
                  <Card key={`${category.id}-${index}`} className="overflow-hidden border border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-video relative group cursor-pointer">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <h3 className="text-white text-lg mb-1">{category.category}</h3>
                            <p className="text-white/80 text-sm">{image.alt}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}