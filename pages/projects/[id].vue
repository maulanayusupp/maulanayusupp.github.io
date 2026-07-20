<script setup lang="ts">
import { getCategory, getProject, projects } from '~/services/projects'

// Re-create the page when navigating between /projects/:id (param change).
definePageMeta({ key: (route) => route.fullPath })

const route = useRoute()
const id = computed(() => String(route.params.id))
const project = computed(() => getProject(id.value))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const p = project.value!
const category = getCategory(p.category)

const related = projects
  .filter((x) => x.category === p.category && x.id !== p.id)
  .slice(0, 3)

const hostname = computed(() => {
  if (!p.url) return ''
  try {
    return new URL(p.url).hostname.replace(/^www\./, '')
  } catch {
    return p.url
  }
})

usePageSeo({
  title: `${p.title} — ${category?.label} | Maulana Yusup Abdullah`,
  description: p.longDescription ?? p.description,
  path: `/projects/${p.id}`,
  ogImage: `${SITE_URL}/og/${p.id}.png`,
})

useJsonLd([
  breadcrumbSchema(p.title, `/projects/${p.id}`),
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.longDescription ?? p.description,
    ...(p.url ? { url: p.url } : {}),
    keywords: p.tags.join(', '),
    author: { '@id': `${SITE_URL}/#person` },
    ...(p.year ? { dateCreated: p.year } : {}),
  },
])
</script>

<template>
  <article class="detail section--tight" :class="`detail--${p.category}`">
    <div class="container">
      <NuxtLink to="/#work" class="detail__back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Back to work
      </NuxtLink>

      <header class="detail__header">
        <div class="detail__meta">
          <span class="detail__category">
            <span class="detail__dot" />
            {{ category?.label }}
          </span>
          <span v-if="p.year" class="detail__year">{{ p.year }}</span>
        </div>
        <h1 class="detail__title">{{ p.title }}</h1>
        <p class="detail__desc">{{ p.longDescription ?? p.description }}</p>
        <div v-if="p.url" class="detail__actions">
          <BaseButton :href="p.url" variant="primary" size="lg">
            Visit live site
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </BaseButton>
          <span class="detail__host">{{ hostname }}</span>
        </div>
      </header>

      <!-- Preview -->
      <div class="detail__preview">
        <div v-if="p.preview.kind === 'live'" class="embed">
          <div class="embed__bar">
            <span class="embed__dot" /><span class="embed__dot" /><span class="embed__dot" />
            <span class="embed__url">{{ hostname }}</span>
          </div>
          <iframe
            :src="p.url"
            :title="`${p.title} live`"
            class="embed__frame"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
        </div>

        <img
          v-else-if="p.preview.kind === 'image'"
          :src="p.preview.src"
          :alt="`${p.title} screenshot`"
          class="detail__image"
        />

        <div v-else class="detail__placeholder">
          <span class="detail__emoji">{{ p.preview.emoji }}</span>
          <p>This project can't be embedded here — open the live site to try it.</p>
          <BaseButton v-if="p.url" :href="p.url" variant="secondary" size="md">Open live site</BaseButton>
        </div>
      </div>

      <!-- Details grid -->
      <div class="detail__grid">
        <section v-if="p.highlights?.length" class="detail__highlights">
          <h2 class="detail__subtitle">Highlights</h2>
          <ul>
            <li v-for="h in p.highlights" :key="h">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ h }}</span>
            </li>
          </ul>
        </section>

        <aside class="detail__aside">
          <h2 class="detail__subtitle">Details</h2>
          <dl class="detail__facts">
            <div>
              <dt>Category</dt>
              <dd>{{ category?.label }}</dd>
            </div>
            <div v-if="p.year">
              <dt>Year</dt>
              <dd>{{ p.year }}</dd>
            </div>
            <div v-if="p.url">
              <dt>Link</dt>
              <dd><a :href="p.url" target="_blank" rel="noopener">{{ hostname }}</a></dd>
            </div>
          </dl>
          <div class="detail__tags">
            <span v-for="tag in p.tags" :key="tag">{{ tag }}</span>
          </div>
        </aside>
      </div>

      <!-- Related -->
      <section v-if="related.length" class="detail__related">
        <h2 class="detail__subtitle">More {{ category?.label }}</h2>
        <div class="detail__related-grid">
          <ProjectCard v-for="rp in related" :key="rp.id" :project="rp" />
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.detail {
  --accent: #{$color-indigo-light};
  padding-top: $space-10;

  &--client { --accent: #{$cat-client}; }
  &--game { --accent: #{$cat-game}; }
  &--education { --accent: #{$cat-education}; }
  &--webapp { --accent: #{$cat-webapp}; }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-size: $fs-sm;
    font-weight: 500;
    color: $color-text-muted;
    transition: color $transition;

    &:hover { color: $color-white; }

    svg { width: 1.1rem; height: 1.1rem; }
  }

  &__header {
    max-width: 46rem;
    margin-top: $space-8;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-bottom: $space-4;
  }

  &__category {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-size: $fs-xs;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    background: var(--accent);
    box-shadow: 0 0 12px 0 var(--accent);
  }

  &__year { font-size: $fs-sm; color: $color-text-faint; }

  &__title {
    font-size: $fs-4xl;

    @include respond-to('md') { font-size: $fs-5xl; }
  }

  &__desc {
    margin-top: $space-5;
    color: $color-text-muted;
    font-size: $fs-lg;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-top: $space-8;
  }

  &__host { color: $color-text-faint; font-size: $fs-sm; }

  // ---- Preview -------------------------------------------------------------
  &__preview {
    margin-top: $space-12;
  }

  &__image {
    width: 100%;
    border-radius: $radius-xl;
    border: 1px solid $color-border;
    box-shadow: $shadow-lg;
  }

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
    padding: $space-20 $space-8;
    text-align: center;
    border-radius: $radius-xl;
    @include glass;

    p { color: $color-text-muted; max-width: 28rem; }
  }

  &__emoji { font-size: 4rem; }

  // ---- Details grid --------------------------------------------------------
  &__grid {
    display: grid;
    gap: $space-10;
    margin-top: $space-16;

    @include respond-to('lg') {
      grid-template-columns: 2fr 1fr;
    }
  }

  &__subtitle {
    font-size: $fs-xl;
    margin-bottom: $space-6;
  }

  &__highlights {
    ul {
      display: flex;
      flex-direction: column;
      gap: $space-4;
    }
    li {
      display: flex;
      align-items: flex-start;
      gap: $space-3;
      color: $color-text;

      svg {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
        margin-top: 2px;
        color: var(--accent);
      }
    }
  }

  &__aside {
    padding: $space-8;
    border-radius: $radius-xl;
    @include glass;
    align-self: start;
  }

  &__facts {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    margin-bottom: $space-6;

    div {
      display: flex;
      justify-content: space-between;
      gap: $space-4;
      padding-bottom: $space-3;
      border-bottom: 1px solid $color-border;
    }
    dt { color: $color-text-faint; font-size: $fs-sm; }
    dd { color: $color-text; font-weight: 500; text-align: right; }
    a { color: var(--accent); }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;

    span {
      padding: $space-1 $space-3;
      font-size: $fs-xs;
      color: $color-text-muted;
      background: $color-surface-2;
      border: 1px solid $color-border;
      border-radius: $radius-full;
    }
  }

  // ---- Related -------------------------------------------------------------
  &__related {
    margin-top: $space-24;
  }

  &__related-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include respond-to('md') { grid-template-columns: repeat(2, 1fr); }
    @include respond-to('lg') { grid-template-columns: repeat(3, 1fr); }
  }
}

// ---- Live embed ------------------------------------------------------------
.embed {
  overflow: hidden;
  border-radius: $radius-xl;
  border: 1px solid $color-border;
  box-shadow: $shadow-lg;
  background: #0a0f1e;

  &__bar {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-3 $space-4;
    background: rgba(148, 163, 184, 0.08);
    border-bottom: 1px solid $color-border;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: $radius-full;
    background: $color-border-strong;
  }

  &__url {
    margin-left: $space-3;
    font-size: $fs-sm;
    color: $color-text-faint;
  }

  &__frame {
    width: 100%;
    height: 70vh;
    min-height: 26rem;
    border: 0;
    background: $color-bg;
  }
}
</style>
