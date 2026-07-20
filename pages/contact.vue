<script setup lang="ts">
usePageSeo({
  title: 'Contact Maulana Yusup Abdullah — Hire a Full Stack Developer',
  description:
    'Get in touch with Maulana Yusup Abdullah for your web app, tool, or game project. Available for freelance work, long-term contracts, and consulting. Based in Bandung, Indonesia.',
  path: '/contact',
  keywords:
    'contact Maulana Yusup Abdullah, hire developer, freelance web developer, hire Vue.js developer, hire Nuxt developer, hire Laravel developer, Bandung developer',
})

useJsonLd([
  breadcrumbSchema('Contact', '/contact'),
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Maulana Yusup Abdullah',
    description: 'Get in touch with Maulana Yusup Abdullah for web development projects',
    url: `${SITE_URL}/contact`,
    mainEntity: personSchema,
  },
])

useScrollReveal()

const channels = [
  {
    label: 'Email',
    value: 'maulanayusupp@gmail.com',
    href: 'mailto:maulanayusupp@gmail.com',
    accent: 'indigo',
    path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    stroke: true,
  },
  {
    label: 'Phone / WhatsApp',
    value: '+62 878-2276-6333',
    href: 'tel:6287822766333',
    accent: 'emerald',
    path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    stroke: true,
  },
  {
    label: 'LinkedIn',
    value: 'Maulana Yusup Abdullah',
    href: 'https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/',
    accent: 'blue',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    value: 'github.com/maulanayusupp',
    href: 'https://github.com/maulanayusupp',
    accent: 'slate',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
]

const availability = [
  { text: 'Available for remote work worldwide' },
  { text: 'Open for long-term contracts' },
  { text: 'Fast response within 24 hours' },
]
</script>

<template>
  <section class="contact section">
    <div class="container contact__grid">
      <div class="contact__intro reveal">
        <p class="contact__eyebrow">
          <span class="contact__eyebrow-dot" />
          Ready to collaborate
        </p>
        <h1 class="contact__title">So, let's <span class="gradient-text">talk</span></h1>
        <p class="contact__lead">
          Whether it's a product, an internal tool, or a game — I'd love to help. Reach out and
          let's discuss how we can build something that meets your needs.
        </p>

        <div class="contact__channels">
          <a
            v-for="c in channels"
            :key="c.label"
            :href="c.href"
            :target="c.href.startsWith('http') ? '_blank' : undefined"
            :rel="c.href.startsWith('http') ? 'noopener' : undefined"
            class="channel"
            :class="`channel--${c.accent}`"
          >
            <span class="channel__icon">
              <svg
                viewBox="0 0 24 24"
                :fill="c.stroke ? 'none' : 'currentColor'"
                :stroke="c.stroke ? 'currentColor' : undefined"
              >
                <path :d="c.path" :stroke-width="c.stroke ? 2 : undefined" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span class="channel__body">
              <span class="channel__label">{{ c.label }}</span>
              <span class="channel__value">{{ c.value }}</span>
            </span>
          </a>
        </div>
      </div>

      <aside class="contact__aside reveal reveal-delay-2">
        <div class="location">
          <span class="location__pin">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <h2 class="location__title">Based in Bandung</h2>
          <p class="location__country">Indonesia</p>

          <ul class="location__list">
            <li v-for="item in availability" :key="item.text">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" stroke-width="2" />
              </svg>
              <span>{{ item.text }}</span>
            </li>
          </ul>

          <BaseButton href="mailto:maulanayusupp@gmail.com" variant="primary" size="lg">
            Send an Email
          </BaseButton>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.contact {
  &__grid {
    display: grid;
    gap: $space-12;
    align-items: start;

    @include respond-to('lg') {
      grid-template-columns: 3fr 2fr;
      gap: $space-16;
    }
  }

  &__eyebrow {
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
  }

  &__eyebrow-dot {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    background: $color-emerald;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  &__title {
    font-size: $fs-5xl;

    @include respond-to('md') {
      font-size: $fs-6xl;
    }
  }

  &__lead {
    margin-top: $space-5;
    max-width: 34rem;
    color: $color-text-muted;
    font-size: $fs-lg;
  }

  &__channels {
    display: grid;
    gap: $space-4;
    margin-top: $space-10;

    @include respond-to('sm') {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.channel {
  --accent: #{$color-indigo};

  display: flex;
  align-items: center;
  gap: $space-4;
  padding: $space-5;
  border-radius: $radius-lg;
  @include glass;
  transition: transform $transition, border-color $transition;

  &--indigo { --accent: #{$color-indigo}; }
  &--emerald { --accent: #{$color-emerald}; }
  &--blue { --accent: #38bdf8; }
  &--slate { --accent: #{$color-text-muted}; }

  &:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);

    .channel__value { color: $color-white; }
  }

  &__icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    border-radius: $radius-md;

    svg { width: 1.4rem; height: 1.4rem; }
  }

  &__body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__label {
    font-size: $fs-xs;
    color: $color-text-faint;
  }

  &__value {
    font-weight: 600;
    color: $color-text;
    transition: color $transition;
    @include line-clamp(1);
  }
}

.location {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-3;
  padding: $space-12 $space-8;
  text-align: center;
  border-radius: $radius-2xl;
  @include glass;

  &__pin {
    display: grid;
    place-items: center;
    width: 4.5rem;
    height: 4.5rem;
    margin-bottom: $space-2;
    color: $color-indigo-light;
    background: color-mix(in srgb, $color-indigo 12%, transparent);
    border-radius: $radius-full;

    svg { width: 2.25rem; height: 2.25rem; }
  }

  &__title { font-size: $fs-2xl; }
  &__country { color: $color-text-muted; }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    width: 100%;
    margin: $space-6 0 $space-8;
    text-align: left;

    li {
      display: flex;
      align-items: center;
      gap: $space-3;
      color: $color-text-muted;
      font-size: $fs-sm;

      svg {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
        color: $color-emerald;
      }
    }
  }
}
</style>
