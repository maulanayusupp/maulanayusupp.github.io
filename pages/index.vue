<script setup lang="ts">
import { projects, featuredProjects } from '~/services/projects'

const { t } = useLocale()

usePageSeo({
  title: 'Maulana Yusup Abdullah — Full Stack Developer & Software Engineer',
  description: `Full Stack Web Developer & Software Engineer with ${yearsOfExperience()}+ years of experience. I build web apps, developer tools, and interactive experiences with Vue.js, Nuxt, Laravel, and Node.js.`,
  path: '/',
  keywords:
    'Maulana Yusup Abdullah, full stack developer, software engineer, Vue.js, Nuxt, Laravel, Node.js, web developer, Bandung, Indonesia, portfolio',
})

useJsonLd([
  personSchema,
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Maulana Yusup Abdullah — Portfolio',
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}/#person` },
  },
  projectsSchema,
])

useScrollReveal()

const projectCount = projects.length
const years = yearsOfExperience()
const stats = [
  { n: years, suffix: '+', key: 'hero.statYears' },
  { n: projectCount, suffix: '+', key: 'hero.statProjects' },
  { n: 13, suffix: '+', key: 'hero.statClients' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero__orb hero__orb--1" />
      <div class="hero__orb hero__orb--2" />
      <div class="container hero__inner">
        <h1 class="hero__title reveal">
          {{ t('hero.titlePre') }} <span class="gradient-text">{{ t('hero.titleHighlight') }}</span>
          {{ t('hero.titlePost') }}
        </h1>
        <p class="hero__lead reveal reveal-delay-2">
          {{ t('hero.leadPre') }} <strong>Maulana Yusup Abdullah</strong> {{ t('hero.leadPost', { years }) }}
        </p>
        <div class="hero__actions reveal reveal-delay-3">
          <BaseButton href="#work" variant="primary" size="lg">{{ t('actions.viewWork') }}</BaseButton>
          <BaseButton to="/contact" variant="secondary" size="lg">{{ t('actions.letsWork') }}</BaseButton>
          <BaseButton to="/cv" variant="ghost" size="lg">{{ t('actions.downloadCv') }}</BaseButton>
        </div>

        <dl class="hero__stats reveal reveal-delay-4">
          <div v-for="stat in stats" :key="stat.key" class="hero__stat">
            <dt class="hero__stat-value"><StatNumber :value="stat.n" :suffix="stat.suffix" /></dt>
            <dd class="hero__stat-label">{{ t(stat.key) }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="section">
      <div class="container">
        <SectionHeading
          :eyebrow="t('work.eyebrow')"
          :title="t('work.title')"
          :subtitle="t('work.subtitle')"
          class="reveal"
        />
        <div class="work__grid reveal">
          <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
        </div>
        <div class="work__more reveal">
          <BaseButton to="/projects" variant="secondary" size="lg">
            {{ t('actions.viewAll', { count: projectCount }) }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Tech -->
    <section class="section section-divider">
      <div class="container">
        <SectionHeading
          :eyebrow="t('tech.eyebrow')"
          :title="t('tech.title')"
          :subtitle="t('tech.subtitle')"
          class="reveal"
        />
        <div class="tech reveal">
          <TechMarquee />
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.hero {
  position: relative;
  overflow: hidden;
  padding-block: $space-24 $space-16;

  @include respond-to('md') {
    padding-block: $space-32 $space-24;
  }

  &__orb {
    position: absolute;
    border-radius: $radius-full;
    filter: blur(80px);
    pointer-events: none;

    &--1 {
      top: 2rem;
      right: -4rem;
      width: 22rem;
      height: 22rem;
      background: rgba(99, 102, 241, 0.18);
      animation: float 7s ease-in-out infinite;
    }
    &--2 {
      bottom: -6rem;
      left: -4rem;
      width: 26rem;
      height: 26rem;
      background: rgba(217, 70, 239, 0.12);
      animation: float 9s ease-in-out infinite reverse;
    }
  }

  &__inner {
    position: relative;
    max-width: 52rem;
  }

  &__title {
    font-size: $fs-4xl;
    line-height: 1.1;

    @include respond-to('md') {
      font-size: $fs-6xl;
    }
  }

  &__lead {
    margin-top: $space-6;
    max-width: 40rem;
    color: $color-text-muted;
    font-size: $fs-lg;

    strong {
      color: $color-text;
      font-weight: 600;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    margin-top: $space-8;
  }

  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: $space-8;
    margin-top: $space-16;

    @include respond-to('sm') {
      gap: $space-12;
    }
  }

  &__stat-value {
    font-family: $font-display;
    font-weight: 700;
    font-size: $fs-4xl;
    color: $color-white;
  }

  &__stat-label {
    margin-top: $space-1;
    font-size: $fs-sm;
    color: $color-text-faint;
  }
}

.work__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-6;
  margin-top: $space-12;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.work__more {
  display: flex;
  justify-content: center;
  margin-top: $space-12;
}

.tech {
  margin-top: $space-12;
}
</style>
