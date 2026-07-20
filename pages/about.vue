<script setup lang="ts">
import { projects } from '~/services/projects'
import experience from '~/services/data/experience.json'
import skills from '~/services/data/skills.json'

const { t, tl } = useLocale()
const cvHref = experience.resumeUrl || '/cv'
const years = yearsOfExperience()
const techCount = new Set(skills.flatMap((g) => g.items)).size

usePageSeo({
  title: 'About Maulana Yusup Abdullah — Skills, Experience & Services',
  description: `Learn about Maulana Yusup Abdullah's expertise in Vue.js, Nuxt, Laravel, and Node.js. ${years}+ years of experience across SPA development, APIs, real-time systems, and scalable software architecture.`,
  path: '/about',
  keywords:
    'Maulana Yusup Abdullah, about, skills, Vue.js, Nuxt, Laravel, AdonisJs, Node.js, MySQL, MongoDB, Redis, Socket.io, full stack developer, Bandung',
  ogType: 'profile',
})

useJsonLd([
  breadcrumbSchema('About', '/about'),
  personSchema,
])

useScrollReveal()

const traits = computed(() => tl<string>('about.traits'))
const services = computed(() => tl<{ title: string; desc: string }>('about.services'))

const stats = [
  { n: years, suffix: '+', key: 'about.statYears' },
  { n: projects.length, suffix: '+', key: 'about.statProjects' },
  { n: 13, suffix: '+', key: 'about.statClients' },
  { n: techCount, suffix: '+', key: 'about.statTech' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="about-hero section--tight">
      <div class="container about-hero__grid">
        <div class="about-hero__text reveal">
          <p class="about-hero__eyebrow">{{ t('about.eyebrow') }}</p>
          <h1 class="about-hero__title">{{ t('about.titlePre') }}<br><span class="gradient-text">{{ t('about.titleHighlight') }}</span></h1>
          <p class="about-hero__lead">
            {{ t('about.leadPre') }} <strong>Maulana Yusup Abdullah</strong> {{ t('about.leadPost', { years }) }}
          </p>
          <ul class="about-hero__traits">
            <li v-for="trait in traits" :key="trait" class="about-hero__trait">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ trait }}</span>
            </li>
          </ul>

          <div class="about-hero__actions">
            <BaseButton
              :to="experience.resumeUrl ? undefined : '/cv'"
              :href="experience.resumeUrl || undefined"
              variant="primary"
              size="lg"
            >
              {{ t('actions.downloadCv') }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
            </BaseButton>
            <BaseButton to="/contact" variant="secondary" size="lg">{{ t('actions.getInTouch') }}</BaseButton>
          </div>
        </div>
        <div class="about-hero__photo reveal reveal-delay-2">
          <div class="about-hero__frame">
            <img src="/img/about.jpg" alt="Maulana Yusup Abdullah" width="420" height="520" />
          </div>
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section class="section section-divider">
      <div class="container">
        <SectionHeading :eyebrow="t('about.expEyebrow')" :title="t('about.expTitle')" align="left" class="reveal" />
        <div class="about-experience">
          <ExperienceTimeline :entries="experience.timeline" />
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="section section-divider">
      <div class="container">
        <SectionHeading :eyebrow="t('about.skillsEyebrow')" :title="t('about.skillsTitle')" class="reveal" />
        <div class="grid-cards">
          <article v-for="group in skills" :key="group.title" class="skill-card reveal">
            <h3 class="skill-card__title">{{ group.title }}</h3>
            <ul class="skill-card__tags">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section section-divider">
      <div class="container">
        <SectionHeading :eyebrow="t('about.servicesEyebrow')" :title="t('about.servicesTitle')" class="reveal" />
        <div class="grid-cards grid-cards--2">
          <article v-for="service in services" :key="service.title" class="service-card reveal">
            <h3 class="service-card__title">{{ service.title }}</h3>
            <p class="service-card__desc">{{ service.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section--tight section-divider">
      <div class="container">
        <div class="stats reveal">
          <div v-for="stat in stats" :key="stat.key" class="stats__item">
            <div class="stats__value"><StatNumber :value="stat.n" :suffix="stat.suffix" /></div>
            <div class="stats__label">{{ t(stat.key) }}</div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.about-hero {
  padding-top: $space-16;

  &__grid {
    display: grid;
    gap: $space-12;
    align-items: center;

    @include respond-to('lg') {
      grid-template-columns: 3fr 2fr;
      gap: $space-16;
    }
  }

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
      font-size: $fs-5xl;
    }
  }

  &__lead {
    margin-top: $space-6;
    color: $color-text-muted;
    font-size: $fs-lg;

    strong { color: $color-text; font-weight: 600; }
  }

  &__traits {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    margin-top: $space-8;
  }

  &__trait {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    color: $color-text;

    svg {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      padding: 3px;
      color: $color-emerald;
      background: color-mix(in srgb, $color-emerald 15%, transparent);
      border-radius: $radius-full;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    margin-top: $space-8;
  }

  &__photo {
    display: flex;
    justify-content: center;
  }

  &__frame {
    padding: 4px;
    background: $gradient-brand-vivid;
    border-radius: $radius-2xl;
    box-shadow: $shadow-glow;

    img {
      width: 100%;
      max-width: 24rem;
      border-radius: calc(#{$radius-2xl} - 4px);
      object-fit: cover;
    }
  }
}

.about-experience {
  margin-top: $space-12;
}

.grid-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-6;
  margin-top: $space-12;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }

  &--2 {
    @include respond-to('lg') {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.skill-card {
  padding: $space-8;
  border-radius: $radius-xl;
  @include glass;
  transition: border-color $transition, transform $transition;

  &:hover {
    transform: translateY(-4px);
    border-color: $color-border-strong;
  }

  &__title {
    font-size: $fs-lg;
    margin-bottom: $space-4;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;

    li {
      padding: $space-1 $space-3;
      font-size: $fs-sm;
      color: $color-text-muted;
      background: $color-surface-2;
      border: 1px solid $color-border;
      border-radius: $radius-full;
    }
  }
}

.service-card {
  padding: $space-8;
  border-radius: $radius-xl;
  @include glass;
  transition: border-color $transition, transform $transition;

  &:hover {
    transform: translateY(-4px);
    border-color: $color-border-strong;
  }

  &__title {
    font-size: $fs-lg;
    margin-bottom: $space-2;
  }
  &__desc {
    color: $color-text-muted;
    font-size: $fs-sm;
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-8;
  padding: $space-12 $space-8;
  border-radius: $radius-2xl;
  @include glass;

  @include respond-to('md') {
    grid-template-columns: repeat(4, 1fr);
  }

  &__item { text-align: center; }

  &__value {
    font-family: $font-display;
    font-weight: 700;
    font-size: $fs-4xl;
    @include gradient-text;
  }

  &__label {
    margin-top: $space-2;
    color: $color-text-muted;
    font-size: $fs-sm;
  }
}
</style>
