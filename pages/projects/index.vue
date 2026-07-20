<script setup lang="ts">
import { projects } from '~/services/projects'

const { t } = useLocale()

usePageSeo({
  title: 'Portfolio — Web Apps, Tools, Games & Client Work | Maulana Yusup Abdullah',
  description:
    'Browse the full portfolio of Maulana Yusup Abdullah — web apps, developer tools, games, interactive experiences, and enterprise client work. Filter by category.',
  path: '/projects',
  keywords:
    'Maulana Yusup Abdullah portfolio, projects, web apps, developer tools, games, client work, Vue.js, Nuxt, Laravel',
})

useJsonLd([breadcrumbSchema('Portfolio', '/projects'), projectsSchema])

useScrollReveal()

const projectCount = projects.length
</script>

<template>
  <div>
    <section class="portfolio-hero section--tight">
      <div class="container">
        <p class="portfolio-hero__eyebrow reveal">{{ t('portfolio.eyebrow') }}</p>
        <h1 class="portfolio-hero__title reveal reveal-delay-1">
          {{ t('portfolio.titlePre') }} <span class="gradient-text">{{ t('portfolio.titleHighlight') }}</span>
        </h1>
        <p class="portfolio-hero__lead reveal reveal-delay-2">
          {{ t('portfolio.lead', { count: projectCount }) }}
        </p>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <ProjectShowcase />
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.portfolio-hero {
  padding-top: $space-12;

  &__eyebrow {
    font-size: $fs-sm;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $color-indigo-light;
    margin-bottom: $space-4;
  }

  &__title {
    font-size: $fs-4xl;

    @include respond-to('md') {
      font-size: $fs-6xl;
    }
  }

  &__lead {
    margin-top: $space-5;
    max-width: 42rem;
    color: $color-text-muted;
    font-size: $fs-lg;
  }
}
</style>
