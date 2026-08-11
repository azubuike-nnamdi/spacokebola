import AboutBelieve from '@/components/site/about/about-believe'
import AboutCTA from '@/components/site/about/about-cta'
import AboutHero from '@/components/site/about/about-hero'
import AboutLeadership from '@/components/site/about/about-leadership'
import AboutPriest from '@/components/site/about/about-priest'
import AboutStoryWithPriest from '@/components/site/about/about-story-with-priest'
import AboutValue from '@/components/site/about/about-value'
import { PageTransition } from '@/components/ui/page-transition'
import { getAboutPage, getLeadership } from '@/utilities/churchContent'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage()
  return {
    title: about.hero.title || 'About',
    description: about.hero.description || undefined,
  }
}

export default async function About() {
  const [about, leadershipTeam] = await Promise.all([getAboutPage(), getLeadership()])

  const showStory = Boolean(about.story.title || about.story.desc1 || about.story.desc2)
  const showBeliefs = Boolean(
    about.beliefs.title || about.beliefs.introduction || about.beliefs.items.length > 0,
  )
  const showCta = Boolean(about.cta.title || about.cta.description || about.cta.primaryUrl)

  return (
    <PageTransition>
      <AboutHero
        title={about.hero.title}
        description={about.hero.description}
        image={about.hero.image}
      />

      {showStory ? (
        <AboutStoryWithPriest
          title={about.story.title}
          desc1={about.story.desc1}
          desc2={about.story.desc2}
          image={about.story.image}
        />
      ) : null}

      {about.values.items.length > 0 ? (
        <AboutValue
          eyebrow={about.values.eyebrow}
          title={about.values.title}
          description={about.values.description}
          items={about.values.items}
        />
      ) : null}

      {about.priest.name ? (
        <AboutPriest
          eyebrow={about.priest.eyebrow}
          sectionTitle={about.priest.sectionTitle}
          sectionDescription={about.priest.sectionDescription}
          name={about.priest.name}
          role={about.priest.role}
          bio={about.priest.bio}
          image={about.priest.image}
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

      {showBeliefs ? (
        <AboutBelieve
          title={about.beliefs.title}
          introduction={about.beliefs.introduction}
          items={about.beliefs.items}
          ctaLabel={about.beliefs.ctaLabel}
          ctaUrl={about.beliefs.ctaUrl}
          image={about.beliefs.image}
        />
      ) : null}

      {showCta ? (
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
