<script setup lang="ts">
import { projects } from '~/services/projects'

usePageSeo({
  title: 'Maulana Yusup Abdullah — Full Stack Developer | Web Apps, Tools & Games',
  description:
    'Full Stack Web Developer with 10+ years of experience. I build web apps, developer tools, browser games, and interactive 3D experiences with Vue.js, Nuxt, Laravel, and Node.js.',
  path: '/',
  keywords:
    'Maulana Yusup Abdullah, full stack developer, Vue.js, Nuxt, Laravel, Node.js, web developer, game developer, Bandung, Indonesia, portfolio, hire developer',
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
const stats = [
  { value: '10+', label: 'Years experience' },
  { value: `${projectCount}+`, label: 'Projects built' },
  { value: '13+', label: 'Happy clients' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero__orb hero__orb--1" />
      <div class="hero__orb hero__orb--2" />
      <div class="container hero__inner">
        <p class="hero__badge reveal">
          <span class="hero__badge-dot" />
          Available for new projects
        </p>
        <h1 class="hero__title reveal reveal-delay-1">
          I build <span class="gradient-text">web apps, tools &amp; games</span>
          that people actually use.
        </h1>
        <p class="hero__lead reveal reveal-delay-2">
          I'm <strong>Maulana Yusup Abdullah</strong> — a Full Stack Developer with 10+ years of
          experience. From enterprise platforms to browser games and interactive 3D, I ship
          reliable products with Vue.js, Nuxt, Laravel, and Node.js.
        </p>
        <div class="hero__actions reveal reveal-delay-3">
          <BaseButton href="#work" variant="primary" size="lg">View my work</BaseButton>
          <BaseButton to="/contact" variant="secondary" size="lg">Let's work together</BaseButton>
        </div>

        <dl class="hero__stats reveal reveal-delay-4">
          <div v-for="stat in stats" :key="stat.label" class="hero__stat">
            <dt class="hero__stat-value">{{ stat.value }}</dt>
            <dd class="hero__stat-label">{{ stat.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work, by category"
          subtitle="A mix of client projects, products, developer tools, games, and interactive experiences — filter to explore."
          class="reveal"
        />
        <div class="work__showcase reveal">
          <ProjectShowcase />
        </div>
      </div>
    </section>

    <!-- Tech -->
    <section class="section section-divider">
      <div class="container">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I build with"
          subtitle="A pragmatic, battle-tested stack across frontend, backend, real-time, and infrastructure."
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

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    margin-bottom: $space-6;
    font-size: $fs-sm;
    font-weight: 500;
    color: $color-indigo-light;
    border: 1px solid color-mix(in srgb, $color-indigo 30%, transparent);
    border-radius: $radius-full;
    background: color-mix(in srgb, $color-indigo 10%, transparent);
  }

  &__badge-dot {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    background: $color-emerald;
    animation: pulse-dot 2s ease-in-out infinite;
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

.work__showcase,
.tech {
  margin-top: $space-12;
}
</style>
