<script setup lang="ts">
import { categories, projects, type CategoryId } from '~/services/projects'
import experience from '~/services/data/experience.json'
import skills from '~/services/data/skills.json'

// Standalone, on-brand résumé document — no site chrome.
definePageMeta({ layout: false })

usePageSeo({
  title: 'CV — Maulana Yusup Abdullah | Full Stack Developer & Software Engineer',
  description:
    'Résumé of Maulana Yusup Abdullah — Full Stack Developer & Software Engineer with 10+ years of experience. Vue.js, Nuxt, Laravel, Node.js.',
  path: '/cv',
})

// Everything below is derived from the single-source data files.
const projectCount = projects.length
const techCount = new Set(skills.flatMap((g) => g.items)).size

const stats = [
  { value: '10+', label: 'Years experience' },
  { value: `${projectCount}`, label: 'Projects shipped' },
  { value: '13+', label: 'Happy clients' },
  { value: `${techCount}+`, label: 'Technologies' },
]

const grouped = categories
  .map((category) => ({ category, items: projects.filter((p) => p.category === category.id) }))
  .filter((g) => g.items.length > 0)

const contacts = [
  { label: 'maulanayusupp@gmail.com', href: 'mailto:maulanayusupp@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: '+62 878-2276-6333', href: 'tel:6287822766333', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { label: 'maulanayusupp.github.io', href: 'https://maulanayusupp.github.io', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18' },
  { label: 'github.com/maulanayusupp', href: 'https://github.com/maulanayusupp', icon: 'M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/', icon: 'M4.98 3.5A2.5 2.5 0 002.5 6 2.5 2.5 0 005 6a2.5 2.5 0 00-.02-2.5zM3 8.98h4V21H3zM9 8.98h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9z' },
]

function printCv() {
  if (import.meta.client) window.print()
}
</script>

<template>
  <div class="cv-page">
    <div class="cv-toolbar">
      <NuxtLink to="/about" class="cv-toolbar__back">← Back to site</NuxtLink>
      <button class="cv-toolbar__print" @click="printCv">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
        </svg>
        Download PDF
      </button>
    </div>

    <article class="cv">
      <div class="cv__glow" />

      <!-- Hero -->
      <header class="cv__hero">
        <div class="cv__id">
          <div class="cv__avatar">
            <img src="/img/about.jpg" alt="Maulana Yusup Abdullah" width="140" height="140" />
          </div>
          <div class="cv__idtext">
            <h1 class="cv__name">Maulana Yusup Abdullah</h1>
            <p class="cv__role">Full Stack Developer &amp; Software Engineer</p>
            <p class="cv__loc">
              <span class="cv__avail" /> Bandung, Indonesia · Available for work
            </p>
          </div>
        </div>

        <p class="cv__pitch">{{ experience.summary }}</p>

        <div class="cv__links">
          <a v-for="c in contacts" :key="c.label" :href="c.href || undefined" :target="c.href && c.href.startsWith('http') ? '_blank' : undefined" rel="noopener" class="cv__chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="c.icon" />
            </svg>
            {{ c.label }}
          </a>
        </div>
      </header>

      <!-- Stats -->
      <div class="cv__stats">
        <div v-for="s in stats" :key="s.label" class="cv__stat">
          <span class="cv__stat-value">{{ s.value }}</span>
          <span class="cv__stat-label">{{ s.label }}</span>
        </div>
      </div>

      <div class="cv__grid">
        <main class="cv__main">
          <!-- Experience -->
          <section class="cv__section">
            <h2 class="cv__heading">Experience</h2>
            <ol class="cv__timeline">
              <li v-for="e in experience.timeline" :key="e.period + e.role" class="cv__tl-item">
                <span class="cv__tl-dot" :class="{ 'is-current': e.current }" />
                <div class="cv__tl-head">
                  <span class="cv__tl-role">{{ e.role }}</span>
                  <span class="cv__tl-period">{{ e.period }}</span>
                </div>
                <p class="cv__tl-org">{{ e.org }}</p>
                <p class="cv__tl-desc">{{ e.description }}</p>
              </li>
            </ol>
          </section>

          <!-- All projects -->
          <section class="cv__section">
            <h2 class="cv__heading">Projects <span class="cv__count">{{ projectCount }}</span></h2>
            <div v-for="group in grouped" :key="group.category.id" class="cv__pgroup" :class="`cv__pgroup--${group.category.id}`">
              <h3 class="cv__pgroup-title">
                <span class="cv__pgroup-dot" /> {{ group.category.label }}
                <span class="cv__pgroup-count">{{ group.items.length }}</span>
              </h3>
              <ul class="cv__plist">
                <li v-for="p in group.items" :key="p.id" class="cv__pitem">
                  <div class="cv__pitem-head">
                    <span class="cv__pitem-title">{{ p.title }}</span>
                    <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="cv__pitem-link">{{ p.tags[0] }} ↗</a>
                    <span v-else class="cv__pitem-tag">{{ p.tags[0] }}</span>
                  </div>
                  <p class="cv__pitem-desc">{{ p.description }}</p>
                </li>
              </ul>
            </div>
          </section>
        </main>

        <aside class="cv__aside">
          <section class="cv__section">
            <h2 class="cv__heading">Skills</h2>
            <div v-for="group in skills" :key="group.title" class="cv__skill">
              <span class="cv__skill-title">{{ group.title }}</span>
              <div class="cv__skill-tags">
                <span v-for="item in group.items" :key="item">{{ item }}</span>
              </div>
            </div>
          </section>

          <section class="cv__section cv__cta">
            <h2 class="cv__heading">Let's talk</h2>
            <p>Open for full-time roles, long-term contracts, and freelance projects.</p>
            <a href="mailto:maulanayusupp@gmail.com" class="cv__cta-btn">Get in touch</a>
          </section>
        </aside>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.cv-page {
  min-height: 100vh;
  padding: $space-6 $space-4 $space-16;
  background: $color-bg;
}

.cv-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 60rem;
  margin: 0 auto $space-6;

  &__back {
    color: $color-text-muted;
    font-size: $fs-sm;
    font-weight: 500;
    &:hover { color: $color-white; }
  }

  &__print {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-5;
    font-weight: 600;
    font-size: $fs-sm;
    color: #fff;
    background: $gradient-brand-vivid;
    border-radius: $radius-md;
    box-shadow: 0 10px 26px -12px rgba(99, 102, 241, 0.7);
    svg { width: 1rem; height: 1rem; }
  }
}

.cv {
  position: relative;
  max-width: 60rem;
  margin: 0 auto;
  padding: $space-12;
  overflow: hidden;
  color: $color-text;
  background: linear-gradient(180deg, #0f172a, #0b1120);
  border: 1px solid $color-border;
  border-radius: $radius-2xl;
  box-shadow: $shadow-lg;

  @include respond-to('md') { padding: $space-16; }

  &__glow {
    position: absolute;
    inset: 0 0 auto 0;
    height: 340px;
    background:
      radial-gradient(60rem 22rem at 12% -10%, rgba(99, 102, 241, 0.28), transparent 60%),
      radial-gradient(50rem 20rem at 100% -5%, rgba(217, 70, 239, 0.2), transparent 60%);
    pointer-events: none;
  }

  // ---- Hero ----------------------------------------------------------------
  &__hero { position: relative; }

  &__id {
    display: flex;
    align-items: center;
    gap: $space-6;
  }

  &__avatar {
    flex-shrink: 0;
    padding: 3px;
    background: $gradient-brand-vivid;
    border-radius: $radius-xl;
    box-shadow: $shadow-glow;

    img {
      width: 6.5rem;
      height: 6.5rem;
      object-fit: cover;
      border-radius: calc(#{$radius-xl} - 3px);
    }
  }

  &__name {
    font-size: $fs-4xl;
    line-height: 1.05;
    @include gradient-text($gradient-brand);

    @include respond-to('md') { font-size: $fs-5xl; }
  }

  &__role {
    margin-top: $space-1;
    font-size: $fs-lg;
    font-weight: 600;
    color: $color-indigo-light;
  }

  &__loc {
    display: flex;
    align-items: center;
    gap: $space-2;
    margin-top: $space-2;
    font-size: $fs-sm;
    color: $color-text-muted;
  }

  &__avail {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    background: $color-emerald;
    box-shadow: 0 0 10px 0 $color-emerald;
  }

  &__pitch {
    margin-top: $space-8;
    max-width: 46rem;
    font-size: $fs-lg;
    color: $color-text-muted;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
    margin-top: $space-6;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-3;
    font-size: $fs-sm;
    color: $color-text;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    transition: border-color $transition, color $transition;

    &:hover { border-color: $color-indigo; color: $color-white; }
    svg { width: 0.95rem; height: 0.95rem; color: $color-indigo-light; }
  }

  // ---- Stats ---------------------------------------------------------------
  &__stats {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-4;
    margin-top: $space-10;
    padding: $space-6;
    border: 1px solid $color-border;
    border-radius: $radius-xl;
    background: $color-surface;

    @include respond-to('sm') { grid-template-columns: repeat(4, 1fr); }
  }

  &__stat { text-align: center; }

  &__stat-value {
    display: block;
    font-family: $font-display;
    font-weight: 800;
    font-size: $fs-4xl;
    @include gradient-text($gradient-brand);
  }

  &__stat-label {
    font-size: $fs-xs;
    color: $color-text-faint;
  }

  // ---- Grid ----------------------------------------------------------------
  &__grid {
    position: relative;
    display: grid;
    gap: $space-12;
    margin-top: $space-12;

    @include respond-to('lg') { grid-template-columns: 1.7fr 1fr; }
  }

  &__section + &__section { margin-top: $space-10; }

  &__heading {
    display: flex;
    align-items: center;
    gap: $space-3;
    font-size: $fs-sm;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $color-indigo-light;
    padding-bottom: $space-3;
    margin-bottom: $space-6;
    border-bottom: 1px solid $color-border;
  }

  &__count {
    padding: 1px 8px;
    font-size: $fs-xs;
    color: $color-text-muted;
    background: $color-surface-2;
    border-radius: $radius-full;
  }

  // ---- Timeline ------------------------------------------------------------
  &__timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $space-6;
    padding-left: $space-6;

    &::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 6px;
      bottom: 6px;
      width: 2px;
      background: linear-gradient(to bottom, $color-indigo, transparent);
    }
  }

  &__tl-item { position: relative; break-inside: avoid; }

  &__tl-dot {
    position: absolute;
    left: calc(-#{$space-6} + 1px);
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: $radius-full;
    background: $color-bg-elevated;
    border: 2px solid $color-border-strong;
    &.is-current { background: $color-indigo; border-color: $color-indigo; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.25); }
  }

  &__tl-head { display: flex; justify-content: space-between; align-items: baseline; gap: $space-4; }
  &__tl-role { font-weight: 700; color: $color-white; }
  &__tl-period { font-size: $fs-xs; color: $color-text-faint; white-space: nowrap; }
  &__tl-org { color: $color-indigo-light; font-size: $fs-sm; font-weight: 500; }
  &__tl-desc { margin-top: $space-2; color: $color-text-muted; font-size: $fs-sm; }

  // ---- Projects ------------------------------------------------------------
  &__pgroup {
    --accent: #{$color-indigo-light};
    margin-bottom: $space-8;
    break-inside: avoid;

    &--client { --accent: #{$cat-client}; }
    &--game { --accent: #{$cat-game}; }
    &--education { --accent: #{$cat-education}; }
    &--webapp { --accent: #{$cat-webapp}; }
  }

  &__pgroup-title {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $fs-sm;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: $space-4;
  }

  &__pgroup-dot { width: 8px; height: 8px; border-radius: $radius-full; background: var(--accent); box-shadow: 0 0 8px 0 var(--accent); }
  &__pgroup-count { margin-left: auto; font-size: $fs-xs; color: $color-text-faint; }

  &__plist { display: flex; flex-direction: column; gap: $space-4; }

  &__pitem {
    padding-left: $space-4;
    border-left: 2px solid $color-border;
    break-inside: avoid;
  }

  &__pitem-head { display: flex; justify-content: space-between; align-items: baseline; gap: $space-3; }
  &__pitem-title { font-weight: 600; color: $color-white; }
  &__pitem-link { font-size: $fs-xs; color: var(--accent); white-space: nowrap; }
  &__pitem-tag { font-size: $fs-xs; color: $color-text-faint; white-space: nowrap; }
  &__pitem-desc { margin-top: 2px; color: $color-text-muted; font-size: $fs-sm; }

  // ---- Skills / aside ------------------------------------------------------
  &__skill { margin-bottom: $space-5; break-inside: avoid; }
  &__skill-title { display: block; font-weight: 700; color: $color-white; font-size: $fs-sm; margin-bottom: $space-2; }
  &__skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    span {
      padding: 2px $space-3;
      font-size: $fs-xs;
      color: $color-text-muted;
      background: $color-surface-2;
      border: 1px solid $color-border;
      border-radius: $radius-full;
    }
  }

  &__cta {
    padding: $space-6;
    border: 1px solid $color-border;
    border-radius: $radius-xl;
    background: $color-surface;
    p { color: $color-text-muted; font-size: $fs-sm; }
  }

  &__cta-btn {
    display: inline-block;
    margin-top: $space-4;
    padding: $space-3 $space-5;
    font-weight: 600;
    font-size: $fs-sm;
    color: #fff;
    background: $gradient-brand-vivid;
    border-radius: $radius-md;
  }
}

// ---- Print -----------------------------------------------------------------
@media print {
  .cv-page { padding: 0; background: #0b1120; }
  .cv-toolbar { display: none; }
  .cv {
    max-width: none;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 24px 28px;
  }
  .cv__grid { grid-template-columns: 1.7fr 1fr; }
  .cv__section, .cv__pgroup, .cv__tl-item, .cv__pitem, .cv__skill { break-inside: avoid; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>

<style>
@media print {
  html, body { background: #0b1120 !important; }
  body::before { display: none !important; }
}
</style>
