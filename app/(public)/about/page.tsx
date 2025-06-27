import AboutBelieve from "@/components/about/about-believe";
import AboutCTA from "@/components/about/about-cta";
import AboutHero from "@/components/about/about-hero";
import AboutLeadership from "@/components/about/about-leadership";
import AboutStory from "@/components/about/about-story";
import AboutValue from "@/components/about/about-value";
import { PageTransition } from "@/components/ui/page-transition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Church",
  description: "Learn more about our church and our mission",
}

export default function About() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <AboutHero />

      {/* Our Story Section */}
      <AboutStory />

      {/* Our Values Section */}
      <AboutValue />

      {/* Leadership Team Section */}
      <AboutLeadership />

      {/* What We Believe Section */}
      <AboutBelieve />

      {/* Join Us CTA */}
      <AboutCTA />
    </PageTransition>
  )
}