"use client";

import { Book, Heart, Home, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function AboutValue() {
  return (
    <section className="py-20 bg-secondary/30 transition-colors duration-500 dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-white">
            Our Values
          </h2>
          <p className="text-muted-foreground dark:text-gray-400 text-base md:text-lg">
            These core values guide everything we do as a church family.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard
            icon={<Book className="h-8 w-8 text-primary" />}
            title="Biblical Teaching"
            desc="We are committed to the authority of Scripture and teaching the whole counsel of God."
          />
          <ValueCard
            icon={<Users className="h-8 w-8 text-primary" />}
            title="Authentic Community"
            desc="We foster genuine relationships where people can be known, loved, and supported."
          />
          <ValueCard
            icon={<Heart className="h-8 w-8 text-primary" />}
            title="Compassionate Service"
            desc="We actively seek ways to demonstrate God’s love through serving our community and world."
          />
          <ValueCard
            icon={<Home className="h-8 w-8 text-primary" />}
            title="Welcoming Environment"
            desc="We strive to create a place where everyone feels welcome, regardless of background or life stage."
          />
        </div>
      </div>
    </section>
  );
}

// Reusable Value Card component
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function ValueCard({ icon, title, desc }: ValueCardProps) {
  return (
    <Card className="border border-border/50 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-background dark:bg-gray-900">
      <CardContent className="pt-10 px-6 pb-8">
        <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground dark:text-white">
          {title}
        </h3>
        <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed">
          {desc}
        </p>
      </CardContent>
    </Card>
  );
}
