import AboutBelieve from '@/components/site/about/about-believe'
import AboutCTA from '@/components/site/about/about-cta'
import AboutHero from '@/components/site/about/about-hero'
import AboutLeadership from '@/components/site/about/about-leadership'
import AboutPriest from '@/components/site/about/about-priest'
import AboutStoryWithPriest from '@/components/site/about/about-story-with-priest'
import AboutValue from '@/components/site/about/about-value'
import { PageTransition } from '@/components/ui/page-transition'
import { spacbuildingImage, vicarImage } from '@/config/images'
import { getLeadership } from '@/utilities/churchContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About The Church',
  description: 'Learn more about our church and our mission',
}

export default async function About() {
  const leadershipTeam = await getLeadership()

  return (
    <PageTransition>
      <AboutHero
        title="About Oke Bola Archdeaconry"
        description="A community of faith, hope, and love in the city of Ibadan since 1936."
      />

      <AboutStoryWithPriest
        title="Our Story"
        desc1="As early as 1936 there were Igbos who worshipped with the Yoruba Congregation at St James' Cathedral, Oke Bola, Ibadan. Due to an appeal made to Rev. Williams, they were allowed to worship in a Classroom at St. James Primary School as the Igbo section of the Cathedral. Church services were conducted by Volunteers."
        desc2="This arrangement lasted til 1940 when the igbo congregation moved to a new Church in Ekoledo (Emmanuel Church) to worship, where the congregation was largely Sierra Leonians led by Mr. Lumpkin (of blessed memory). Later that year (1940) the Igbo Congregation reconvened at the classroom of St. James' Primary School Oke-Bola under the leadership of Messrs Ben, Ifekwuna and V.O.Onyewotu, both of them were civil In 1942, they were variously affected by transfers out of Ibadan, therefore, Messis Chinedu Ukaonu and L.O. Ogbonna succeeded them as leaders. In 1952 Mr. S.0 Okolo was posted to the Church as the first Catechist, under a special arrangement with Diocese on the Niger."
        img="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        priestImage={spacbuildingImage}
      />

      <AboutValue />

      <AboutPriest
        name="Ven. Sunday D. Ezeike"
        role="Venerable/Archdeacon - Priest in Charge"
        bio="Ven. Sunday D. Ezeike is a wise and compassionate spiritual leader dedicated to serving our church community. With deep commitment to the Anglican tradition, he leads our congregations with wisdom, pastoral care, and unwavering faith in Christ."
        image={vicarImage}
      />

      <AboutLeadership leadershipTeam={leadershipTeam} />

      <AboutBelieve />

      <AboutCTA />
    </PageTransition>
  )
}
