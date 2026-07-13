import AboutBelieve from '@/components/site/about/about-believe'
import AboutCTA from '@/components/site/about/about-cta'
import AboutHero from '@/components/site/about/about-hero'
import AboutLeadership from '@/components/site/about/about-leadership'
import AboutPriest from '@/components/site/about/about-priest'
import AboutStory from '@/components/site/about/about-story'
import AboutValue from '@/components/site/about/about-value'
import { PageTransition } from '@/components/ui/page-transition'
import { getBranchBySlug, getLeadership } from '@/utilities/churchContent'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const branch = await getBranchBySlug(slug)
  if (!branch) return { title: 'Branch Not Found' }
  return {
    title: branch.name,
    description: branch.tagline,
  }
}

export default async function BranchPage({ params }: Args) {
  const { slug } = await params
  const [branch, leadershipTeam] = await Promise.all([
    getBranchBySlug(slug),
    getLeadership(),
  ])

  if (!branch) notFound()

  return (
    <PageTransition>
      <AboutHero title={branch.name} description={branch.tagline} />

      <AboutStory
        title={branch.story.title}
        desc1={branch.story.desc1}
        desc2={branch.story.desc2}
        img={branch.story.img}
      />

      <AboutValue />

      <AboutPriest
        name={branch.priestInCharge.name}
        role={branch.priestInCharge.role}
        bio={branch.priestInCharge.bio}
        image={branch.priestInCharge.image}
      />

      <AboutLeadership leadershipTeam={leadershipTeam} />

      <AboutBelieve />

      <AboutCTA />
    </PageTransition>
  )
}
