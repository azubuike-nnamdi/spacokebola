import AboutBelieve from '@/components/site/about/about-believe'
import AboutCTA from '@/components/site/about/about-cta'
import AboutHero from '@/components/site/about/about-hero'
import AboutLeadership from '@/components/site/about/about-leadership'
import AboutPriest from '@/components/site/about/about-priest'
import AboutStory from '@/components/site/about/about-story'
import AboutValue from '@/components/site/about/about-value'
import { PageTransition } from '@/components/ui/page-transition'
import { getAboutPage, getBranchBySlug, getLeadership } from '@/utilities/churchContent'
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
  const [branch, leadershipTeam, about] = await Promise.all([
    getBranchBySlug(slug),
    getLeadership(),
    getAboutPage(),
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

      {about.values.items.length > 0 ? (
        <AboutValue
          eyebrow={about.values.eyebrow}
          title={about.values.title}
          description={about.values.description}
          items={about.values.items}
        />
      ) : null}

      {branch.priestInCharge.name ? (
        <AboutPriest
          eyebrow={about.priest.eyebrow || 'Clergy'}
          sectionTitle={about.priest.sectionTitle || 'Priest in charge'}
          sectionDescription={
            about.priest.sectionDescription ||
            'Meet the priest leading this congregation with dedication and faith.'
          }
          name={branch.priestInCharge.name}
          role={branch.priestInCharge.role}
          bio={branch.priestInCharge.bio}
          image={branch.priestInCharge.image}
        />
      ) : null}

      {leadershipTeam.length > 0 ? (
        <AboutLeadership
          eyebrow={about.leadership.eyebrow}
          title={about.leadership.title}
          description={about.leadership.description}
          leadershipTeam={leadershipTeam}
        />
      ) : null}

      {about.beliefs.title || about.beliefs.items.length > 0 ? (
        <AboutBelieve
          title={about.beliefs.title}
          introduction={about.beliefs.introduction}
          items={about.beliefs.items}
          ctaLabel={about.beliefs.ctaLabel}
          ctaUrl={about.beliefs.ctaUrl}
          image={about.beliefs.image}
        />
      ) : null}

      {about.cta.title || about.cta.primaryUrl ? (
        <AboutCTA
          eyebrow={about.cta.eyebrow}
          title={about.cta.title}
          description={about.cta.description}
          primaryLabel={about.cta.primaryLabel}
          primaryUrl={about.cta.primaryUrl}
          secondaryLabel={about.cta.secondaryLabel}
          secondaryUrl={about.cta.secondaryUrl}
          backgroundImageUrl={about.cta.backgroundImageUrl}
        />
      ) : null}
    </PageTransition>
  )
}
