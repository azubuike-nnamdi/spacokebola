"use client";
import AboutBelieve from "@/components/about/about-believe";
import AboutCTA from "@/components/about/about-cta";
import AboutHero from "@/components/about/about-hero";
import AboutLeadership from "@/components/about/about-leadership";
import AboutPriest from "@/components/about/about-priest";
import AboutStory from "@/components/about/about-story";
import AboutValue from "@/components/about/about-value";
import { PageTransition } from "@/components/ui/page-transition";
import { branches } from "@/data";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;

  const branch = branches.find((b) => b.slug === slug);

  if (!branch) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Branch Not Found</h1>
          <p className="text-muted-foreground">
            No branch found for &quot;{slug}&quot;. Please check the URL and try
            again.
          </p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <AboutHero title={branch.name} description={branch.tagline} />

      {/* Our Story Section */}
      <AboutStory
        title={branch.story.title}
        desc1={branch.story.desc1}
        desc2={branch.story.desc2}
        img={branch.story.img}
      />

      {/* Our Values Section */}
      <AboutValue />

      {/* Priest in Charge Section */}
      <AboutPriest
        name={branch.priestInCharge.name}
        role={branch.priestInCharge.role}
        bio={branch.priestInCharge.bio}
        image={branch.priestInCharge.image}
      />

      {/* Leadership Team Section */}
      <AboutLeadership />

      {/* What We Believe Section */}
      <AboutBelieve />

      {/* Join Us CTA */}
      <AboutCTA />
    </PageTransition>
  );
}
