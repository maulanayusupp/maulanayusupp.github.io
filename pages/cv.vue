<script setup lang="ts">
import { categories, projects } from '~/services/projects'
import experience from '~/services/data/experience.json'
import skills from '~/services/data/skills.json'

// Standalone, on-brand résumé document — no site chrome.
definePageMeta({ layout: false })

usePageSeo({
  title: 'CV — Maulana Yusup Abdullah | Full Stack Developer & Software Engineer',
  description:
    `Résumé of Maulana Yusup Abdullah — Full Stack Developer & Software Engineer with ${yearsOfExperience()}+ years of experience. Vue.js, Nuxt, Laravel, Node.js.`,
  path: '/cv',
})

const { t, localize } = useLocale()

// Everything below is derived from the single-source data files.
const projectCount = projects.length
const techCount = new Set(skills.flatMap((g) => g.items)).size

const years = yearsOfExperience()
const stats = [
  { value: `${years}+`, key: 'cv.statYears' },
  { value: `${projectCount}`, key: 'cv.statProjects' },
  { value: '13+', key: 'cv.statClients' },
  { value: `${techCount}+`, key: 'cv.statTech' },
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
      <NuxtLink to="/about" class="cv-toolbar__back">{{ t('cv.back') }}</NuxtLink>
      <div class="cv-toolbar__actions">
        <span class="cv-toolbar__hint">{{ t('cv.hint') }}</span>
        <button class="cv-toolbar__print" @click="printCv">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
          </svg>
          {{ t('cv.download') }}
        </button>
      </div>
    </div>

    <article class="cv">
      <!-- Hero -->
      <header class="cv__hero">
        <h1 class="cv__name">Maulana Yusup Abdullah</h1>
        <p class="cv__role">Full Stack Developer &amp; Software Engineer</p>
        <p class="cv__loc">{{ t('cv.available') }}</p>

        <p class="cv__pitch">{{ localize(experience, 'summary').replace('{years}', String(years)) }}</p>

        <div class="cv__links">
          <a
            v-for="c in contacts"
            :key="c.label"
            :href="c.href"
            :target="c.href.startsWith('http') ? '_blank' : undefined"
            rel="noopener"
            class="cv__chip"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="c.icon" />
            </svg>
            {{ c.label }}
          </a>
        </div>
      </header>

      <!-- Stats -->
      <div class="cv__stats">
        <div v-for="s in stats" :key="s.key" class="cv__stat">
          <span class="cv__stat-value">{{ s.value }}</span>
          <span class="cv__stat-label">{{ t(s.key) }}</span>
        </div>
      </div>

      <!-- Experience -->
      <section class="cv__section">
        <h2 class="cv__heading">{{ t('cv.experience') }}</h2>
        <ol class="cv__timeline">
          <li v-for="e in experience.timeline" :key="e.period + e.role" class="cv__tl-item">
            <span class="cv__tl-dot" :class="{ 'is-current': e.current }" />
            <div class="cv__tl-head">
              <span class="cv__tl-role">{{ localize(e, 'role') }}</span>
              <span class="cv__tl-period">{{ e.period }}</span>
            </div>
            <p class="cv__tl-org">{{ localize(e, 'org') }}</p>
            <p class="cv__tl-desc">{{ localize(e, 'description') }}</p>
          </li>
        </ol>
      </section>

      <!-- Skills -->
      <section class="cv__section">
        <h2 class="cv__heading">{{ t('cv.skills') }}</h2>
        <div class="cv__skills">
          <div v-for="group in skills" :key="group.title" class="cv__skill">
            <span class="cv__skill-title">{{ group.title }}</span>
            <div class="cv__skill-tags">
              <span v-for="item in group.items" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- All projects -->
      <section class="cv__section">
        <h2 class="cv__heading">{{ t('cv.projects') }} <span class="cv__count">{{ projectCount }}</span></h2>
        <div v-for="group in grouped" :key="group.category.id" class="cv__pgroup" :class="`cv__pgroup--${group.category.id}`">
          <h3 class="cv__pgroup-title">
            <span class="cv__pgroup-dot" /> {{ t(`categories.${group.category.id}`) }}
            <span class="cv__pgroup-count">{{ group.items.length }}</span>
          </h3>
          <ul class="cv__plist">
            <li v-for="p in group.items" :key="p.id" class="cv__pitem">
              <div class="cv__pitem-head">
                <span class="cv__pitem-title">{{ p.title }}</span>
                <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="cv__pitem-link">{{ p.tags[0] }} ↗</a>
                <span v-else class="cv__pitem-tag">{{ p.tags[0] }}</span>
              </div>
              <p class="cv__pitem-desc">{{ localize(p, 'description') }}</p>
            </li>
          </ul>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.cv-page {
  // The résumé is always dark on screen, independent of the site theme.
  // (Print overrides below flip it to a white document.)
  --c-bg: #0b1120;
  --c-bg-elevated: #0f172a;
  --c-surface: rgba(148, 163, 184, 0.06);
  --c-surface-2: rgba(148, 163, 184, 0.1);
  --c-border: rgba(148, 163, 184, 0.12);
  --c-border-strong: rgba(148, 163, 184, 0.22);
  --c-text: #e2e8f0;
  --c-text-muted: #94a3b8;
  --c-text-faint: #64748b;
  --c-strong: #f8fafc;
  --cat-client: #22d3ee;
  --cat-game: #f472b6;
  --cat-education: #34d399;
  --cat-webapp: #818cf8;
  --cat-tools: #fb923c;

  min-height: 100vh;
  padding: $space-6 $space-4 $space-16;
  background: $color-bg;
}

.cv-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 52rem;
  margin: 0 auto $space-6;

  &__back {
    color: $color-text-muted;
    font-size: $fs-sm;
    font-weight: 500;
    &:hover { color: $color-white; }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-4;
  }

  &__hint {
    display: none;
    font-size: $fs-xs;
    color: $color-text-faint;

    @include respond-to('md') { display: inline; }
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
  max-width: 52rem;
  margin: 0 auto;
  padding: $space-12;
  color: $color-text;
  background: #0e1729;
  border: 1px solid $color-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;

  // ---- Hero ----------------------------------------------------------------
  &__name {
    font-size: $fs-4xl;
    line-height: 1.05;
    @include gradient-text($gradient-brand);
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
    margin-top: $space-5;
    font-size: $fs-base;
    color: $color-text-muted;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    margin-top: $space-5;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-1 $space-3;
    font-size: $fs-sm;
    color: $color-text;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    svg { width: 0.9rem; height: 0.9rem; color: $color-indigo-light; }
  }

  // ---- Stats ---------------------------------------------------------------
  &__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-3;
    margin-top: $space-8;
    padding: $space-5;
    border: 1px solid $color-border;
    border-radius: $radius-lg;
    background: $color-surface;
  }

  &__stat { text-align: center; }

  &__stat-value {
    display: block;
    font-family: $font-display;
    font-weight: 800;
    font-size: $fs-3xl;
    @include gradient-text($gradient-brand);
  }

  &__stat-label {
    font-size: $fs-xs;
    color: $color-text-faint;
  }

  // ---- Sections ------------------------------------------------------------
  &__section { margin-top: $space-10; }

  &__heading {
    display: flex;
    align-items: center;
    gap: $space-3;
    font-size: $fs-sm;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $color-indigo-light;
    padding-bottom: $space-2;
    margin-bottom: $space-5;
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
    gap: $space-5;
    padding-left: $space-6;

    &::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 6px;
      bottom: 6px;
      width: 2px;
      background: $color-border-strong;
    }
  }

  &__tl-item { position: relative; }

  &__tl-dot {
    position: absolute;
    left: calc(-#{$space-6} + 1px);
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: $radius-full;
    background: $color-bg-elevated;
    border: 2px solid $color-border-strong;
    &.is-current { background: $color-indigo; border-color: $color-indigo; }
  }

  &__tl-head { display: flex; justify-content: space-between; align-items: baseline; gap: $space-4; }
  &__tl-role { font-weight: 700; color: $color-white; }
  &__tl-period { font-size: $fs-xs; color: $color-text-faint; white-space: nowrap; }
  &__tl-org { color: $color-indigo-light; font-size: $fs-sm; font-weight: 500; }
  &__tl-desc { margin-top: $space-2; color: $color-text-muted; font-size: $fs-sm; }

  // ---- Skills --------------------------------------------------------------
  &__skills {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;

    @include respond-to('sm') { grid-template-columns: repeat(2, 1fr); }
    @include respond-to('md') { grid-template-columns: repeat(3, 1fr); }
  }

  &__skill { break-inside: avoid; }
  &__skill-title { display: block; font-weight: 700; color: $color-white; font-size: $fs-sm; margin-bottom: $space-2; }
  &__skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    span {
      padding: 2px $space-2;
      font-size: $fs-xs;
      color: $color-text-muted;
      background: $color-surface-2;
      border: 1px solid $color-border;
      border-radius: $radius-full;
    }
  }

  // ---- Projects ------------------------------------------------------------
  &__pgroup {
    --accent: #{$color-indigo-light};
    margin-bottom: $space-6;
    break-inside: avoid;

    &--client { --accent: #{$cat-client}; }
    &--game { --accent: #{$cat-game}; }
    &--education { --accent: #{$cat-education}; }
    &--webapp { --accent: #{$cat-webapp}; }
    &--tools { --accent: #{$cat-tools}; }
  }

  &__pgroup-title {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $fs-xs;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: $space-3;
  }

  &__pgroup-dot { width: 7px; height: 7px; border-radius: $radius-full; background: var(--accent); }
  &__pgroup-count { margin-left: auto; font-size: $fs-xs; color: $color-text-faint; }

  &__plist { display: flex; flex-direction: column; gap: $space-3; }

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
}

// ---- Print: clean white A4/Letter document ---------------------------------
@media print {
  @page { size: A4; margin: 12mm; }

  .cv-page { min-height: 0; padding: 0; background: #fff; }
  .cv-toolbar { display: none; }
  .cv {
    max-width: none;
    padding: 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: #fff;
    color: #1e293b;
  }

  // Text → dark on white
  .cv__name {
    color: #0f172a !important;
    -webkit-text-fill-color: #0f172a !important;
    background: none !important;
  }
  .cv__role { color: #4f46e5; }
  .cv__loc,
  .cv__pitch,
  .cv__tl-desc,
  .cv__pitem-desc,
  .cv__stat-label,
  .cv__tl-period,
  .cv__pgroup-count,
  .cv__pitem-tag { color: #475569; }
  .cv__tl-role,
  .cv__pitem-title,
  .cv__skill-title { color: #0f172a; }
  .cv__tl-org { color: #4f46e5; }
  .cv__pgroup-title,
  .cv__pitem-link { color: #4f46e5; }

  .cv__heading { color: #4f46e5; border-color: #e2e8f0; }

  // Surfaces → light
  .cv__stats { background: #f8fafc; border-color: #e2e8f0; }
  .cv__stat-value {
    color: #4f46e5 !important;
    -webkit-text-fill-color: #4f46e5 !important;
    background: none !important;
  }
  .cv__chip { background: #f1f5f9; border-color: #e2e8f0; color: #1e293b; }
  .cv__chip svg { color: #4f46e5; }
  .cv__count,
  .cv__skill-tags span { background: #f1f5f9; border-color: #e2e8f0; color: #475569; }
  .cv__timeline::before { background: #e2e8f0; }
  .cv__tl-dot { background: #fff; border-color: #cbd5e1; }
  .cv__tl-dot.is-current { background: #4f46e5; border-color: #4f46e5; }
  .cv__pitem { border-left-color: #e2e8f0; }

  // Keep blocks from splitting across pages
  .cv__hero,
  .cv__stats,
  .cv__heading,
  .cv__tl-item,
  .cv__skill,
  .cv__pgroup,
  .cv__pitem { break-inside: avoid; }
  .cv__heading { break-after: avoid; }

  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>

<style>
@media print {
  html, body { background: #ffffff !important; }
  body::before { display: none !important; }
}
</style>
