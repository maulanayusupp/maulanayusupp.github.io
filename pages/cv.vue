<script setup lang="ts">
import { featuredProjects, getCategory } from '~/services/projects'
import experience from '~/services/data/experience.json'
import skills from '~/services/data/skills.json'

// Standalone, print-optimized document — no site chrome.
definePageMeta({ layout: false })

usePageSeo({
  title: 'CV — Maulana Yusup Abdullah | Full Stack Developer & Software Engineer',
  description:
    'Résumé of Maulana Yusup Abdullah — Full Stack Developer & Software Engineer with 10+ years of experience. Vue.js, Nuxt, Laravel, Node.js.',
  path: '/cv',
})

const contacts = [
  { label: 'maulanayusupp@gmail.com', href: 'mailto:maulanayusupp@gmail.com' },
  { label: '+62 878-2276-6333', href: 'tel:6287822766333' },
  { label: 'Bandung, Indonesia', href: null },
]
const links = [
  { label: 'maulanayusupp.github.io', href: 'https://maulanayusupp.github.io' },
  { label: 'github.com/maulanayusupp', href: 'https://github.com/maulanayusupp' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/' },
]

function printCv() {
  if (import.meta.client) window.print()
}
</script>

<template>
  <div class="cv-page">
    <div class="cv-toolbar">
      <NuxtLink to="/about" class="cv-toolbar__back">← Back to site</NuxtLink>
      <button class="cv-toolbar__print" @click="printCv">Print / Save as PDF</button>
    </div>

    <article class="cv">
      <header class="cv__header">
        <div>
          <h1 class="cv__name">Maulana Yusup Abdullah</h1>
          <p class="cv__role">Full Stack Developer &amp; Software Engineer</p>
        </div>
        <div class="cv__contact">
          <span v-for="c in contacts" :key="c.label">
            <a v-if="c.href" :href="c.href">{{ c.label }}</a>
            <template v-else>{{ c.label }}</template>
          </span>
          <span v-for="l in links" :key="l.label">
            <a :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
          </span>
        </div>
      </header>

      <section class="cv__section">
        <h2 class="cv__heading">Summary</h2>
        <p class="cv__summary">{{ experience.summary }}</p>
      </section>

      <section class="cv__section">
        <h2 class="cv__heading">Experience</h2>
        <div v-for="e in experience.timeline" :key="e.period + e.role" class="cv__entry">
          <div class="cv__entry-head">
            <span class="cv__entry-role">{{ e.role }}</span>
            <span class="cv__entry-period">{{ e.period }}</span>
          </div>
          <p class="cv__entry-org">{{ e.org }}</p>
          <p class="cv__entry-desc">{{ e.description }}</p>
        </div>
      </section>

      <section class="cv__section">
        <h2 class="cv__heading">Skills</h2>
        <div class="cv__skills">
          <div v-for="group in skills" :key="group.title" class="cv__skill">
            <span class="cv__skill-title">{{ group.title }}</span>
            <span class="cv__skill-items">{{ group.items.join(' · ') }}</span>
          </div>
        </div>
      </section>

      <section class="cv__section">
        <h2 class="cv__heading">Selected Projects</h2>
        <div v-for="p in featuredProjects" :key="p.id" class="cv__entry">
          <div class="cv__entry-head">
            <span class="cv__entry-role">{{ p.title }}</span>
            <span class="cv__entry-period">{{ getCategory(p.category)?.label }}</span>
          </div>
          <p class="cv__entry-desc">{{ p.description }}</p>
          <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="cv__entry-link">{{ p.url }}</a>
        </div>
        <p class="cv__more">More projects at maulanayusupp.github.io/projects</p>
      </section>
    </article>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

// A light, document-style page (prints cleanly regardless of site theme).
.cv-page {
  min-height: 100vh;
  background: #f1f5f9;
  padding: $space-8 $space-4;
}

.cv-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 52rem;
  margin: 0 auto $space-6;

  &__back {
    color: #475569;
    font-size: $fs-sm;
    font-weight: 500;
    &:hover { color: #0f172a; }
  }

  &__print {
    padding: $space-2 $space-5;
    font-weight: 600;
    font-size: $fs-sm;
    color: #fff;
    background: #4f46e5;
    border-radius: $radius-md;
    &:hover { background: #4338ca; }
  }
}

.cv {
  max-width: 52rem;
  margin: 0 auto;
  padding: $space-12;
  background: #fff;
  color: #1e293b;
  border-radius: $radius-md;
  box-shadow: 0 10px 40px -20px rgba(0, 0, 0, 0.3);
  font-size: 0.95rem;
  line-height: 1.5;

  &__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $space-4;
    padding-bottom: $space-6;
    border-bottom: 2px solid #e2e8f0;
  }

  &__name {
    font-size: 1.9rem;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  &__role {
    margin-top: 2px;
    color: #4f46e5;
    font-weight: 600;
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 0.82rem;
    color: #475569;
    text-align: right;

    a { color: #475569; }
    a:hover { color: #4f46e5; }
  }

  &__section { margin-top: $space-8; }

  &__heading {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4f46e5;
    padding-bottom: $space-2;
    margin-bottom: $space-4;
    border-bottom: 1px solid #e2e8f0;
  }

  &__summary { color: #334155; }

  &__entry {
    margin-bottom: $space-5;
    &:last-child { margin-bottom: 0; }
  }

  &__entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: $space-4;
  }

  &__entry-role { font-weight: 700; color: #0f172a; }
  &__entry-period { font-size: 0.82rem; color: #64748b; white-space: nowrap; }
  &__entry-org { color: #4f46e5; font-size: 0.85rem; font-weight: 500; }
  &__entry-desc { margin-top: 4px; color: #334155; }
  &__entry-link { font-size: 0.82rem; color: #6366f1; }

  &__skills {
    display: grid;
    gap: $space-3;

    @include respond-to('sm') { grid-template-columns: 1fr 1fr; }
  }

  &__skill { display: flex; flex-direction: column; }
  &__skill-title { font-weight: 700; color: #0f172a; font-size: 0.85rem; }
  &__skill-items { color: #475569; font-size: 0.85rem; }

  &__more { margin-top: $space-4; font-size: 0.82rem; color: #64748b; }
}

@media print {
  .cv-page { background: #fff; padding: 0; }
  .cv-toolbar { display: none; }
  .cv {
    max-width: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
  }
  a { color: #1e293b !important; text-decoration: none; }
}
</style>

<style>
/* Hide the global dark background glow on the CV document. */
@media print {
  body::before { display: none !important; }
}
</style>
