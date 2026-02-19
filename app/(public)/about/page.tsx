import AboutBelieve from "@/components/about/about-believe";
import AboutCTA from "@/components/about/about-cta";
import AboutHero from "@/components/about/about-hero";
import AboutLeadership from "@/components/about/about-leadership";
import AboutStory from "@/components/about/about-story";
import AboutValue from "@/components/about/about-value";
import { PageTransition } from "@/components/ui/page-transition";
import { Metadata } from "next";
import { spacbuildingImage } from "@/config/images";

export const metadata: Metadata = {
  title: "About The Church",
  description: "Learn more about our church and our mission",
}

export default function About() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <AboutHero title={"About SPAC OKE BOLA"} description="A community of faith, hope, and love in the city of Ibadan since 1936." />

      {/* Our Story Section */}
      <AboutStory
        title="Our Story"
        desc1="As early as 1936 there were Igbos who worshipped with the Yoruba Congregation at St James&apos; Cathedral, Oke Bola, Ibadan. Due to an appeal made to Rev. Williams, they were allowed to worship in a Classroom at St. James Primary School as the Igbo section of the Cathedral. Church services were conducted by Volunteers."
        desc2="This arrangement lasted til 1940 when the igbo congregation moved to a new Church in Ekoledo (Emmanuel Church) to worship, where the congregation was largely Sierra Leonians led by Mr. Lumpkin (of blessed memory). Later that year (1940) the Igbo Congregation reconvened at the classroom of St. James&apos; Primary School Oke-Bola under the leadership of Messrs Ben, Ifekwuna and V.O.Onyewotu, both of them were civil In 1942, they were variously affected by transfers out of Ibadan, therefore, Messis Chinedu Ukaonu and L.O. Ogbonna succeeded them as leaders. In 1952 Mr. S.0 Okolo was posted to the Church as the first Catechist, under a special arrangement with Diocese on the Niger."
        img={spacbuildingImage}
      />

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