<script setup lang="ts">
const { query, activeCategory, results, grouped, filters, reset } = useProjectSearch()
const { t, localize } = useLocale()

type View = 'grid' | 'list'
const view = ref<View>('grid')
</script>

<template>
  <div class="showcase">
    <!-- Toolbar: search + view toggle -->
    <div class="showcase__toolbar">
      <label class="search">
        <span class="visually-hidden">{{ t('actions.search') }}</span>
        <svg class="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke-width="2" />
          <path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3" />
        </svg>
        <input
          v-model="query"
          type="search"
          class="search__input"
          :placeholder="t('showcase.searchPlaceholder')"
          autocomplete="off"
        />
        <button v-if="query" class="search__clear" aria-label="Clear search" @click="query = ''">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </label>

      <div class="viewtoggle" role="group" aria-label="View mode">
        <button
          class="viewtoggle__btn"
          :class="{ 'is-active': view === 'grid' }"
          :aria-pressed="view === 'grid'"
          aria-label="Grid view"
          @click="view = 'grid'"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" />
            <rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" />
          </svg>
        </button>
        <button
          class="viewtoggle__btn"
          :class="{ 'is-active': view === 'list' }"
          :aria-pressed="view === 'list'"
          aria-label="Compact list view"
          @click="view = 'list'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Category filters -->
    <div class="showcase__filters" role="tablist" aria-label="Project categories">
      <button
        v-for="f in filters"
        :key="f.id"
        class="showcase__filter"
        :class="{ 'is-active': activeCategory === f.id }"
        role="tab"
        :aria-selected="activeCategory === f.id"
        @click="activeCategory = f.id"
      >
        {{ f.id === 'all' ? t('showcase.all') : t(`categories.${f.id}`) }}
        <span class="showcase__count">{{ f.count }}</span>
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="!results.length" class="showcase__empty">
      <p>{{ t('showcase.empty', { q: query }) }}</p>
      <button class="showcase__reset" @click="reset">{{ t('showcase.clear') }}</button>
    </div>

    <!-- Grid view -->
    <TransitionGroup v-else-if="view === 'grid'" tag="div" name="grid" class="showcase__grid">
      <ProjectCard v-for="project in results" :key="project.id" :project="project" />
    </TransitionGroup>

    <!-- Compact index (list view) -->
    <div v-else class="index">
      <section
        v-for="group in grouped"
        :key="group.category.id"
        class="index__group"
        :class="`index__group--${group.category.id}`"
      >
        <header class="index__head">
          <span class="index__cat"><span class="index__dot" /> {{ t(`categories.${group.category.id}`) }}</span>
          <span class="index__count">{{ group.items.length }}</span>
        </header>
        <ul class="index__list">
          <li v-for="p in group.items" :key="p.id">
            <NuxtLink :to="`/projects/${p.id}`" class="row">
              <span class="row__title">{{ p.title }}</span>
              <span class="row__desc">{{ localize(p, 'description') }}</span>
              <span class="row__tag">{{ p.tags[0] }}</span>
              <svg class="row__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6l6 6-6 6" />
              </svg>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.showcase {
  display: flex;
  flex-direction: column;
  gap: $space-8;

  &__toolbar {
    display: flex;
    flex-direction: column;
    gap: $space-4;

    @include respond-to('sm') {
      flex-direction: row;
      align-items: center;
    }
  }

  // ---- Filters -------------------------------------------------------------
  &__filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-3;
  }

  &__filter {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    font-size: $fs-sm;
    font-weight: 600;
    color: $color-text-muted;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    transition: color $transition, border-color $transition, background $transition;

    &:hover {
      color: $color-white;
      border-color: $color-border-strong;
    }
    &.is-active {
      color: $color-white;
      background: $gradient-brand-vivid;
      border-color: transparent;
    }
  }

  &__count {
    font-size: $fs-xs;
    opacity: 0.7;
  }

  // ---- Grid ----------------------------------------------------------------
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include respond-to('md') { grid-template-columns: repeat(2, 1fr); }
    @include respond-to('lg') { grid-template-columns: repeat(3, 1fr); }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
    padding: $space-16 0;
    color: $color-text-muted;
  }

  &__reset {
    padding: $space-2 $space-4;
    font-weight: 600;
    font-size: $fs-sm;
    color: $color-white;
    border: 1px solid $color-border-strong;
    border-radius: $radius-full;
    transition: border-color $transition;
    &:hover { border-color: $color-indigo; }
  }
}

// ---- Search ----------------------------------------------------------------
.search {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;

  &__icon {
    position: absolute;
    left: $space-4;
    width: 1.15rem;
    height: 1.15rem;
    color: $color-text-faint;
    pointer-events: none;
  }

  &__input {
    width: 100%;
    padding: $space-3 $space-10;
    font-size: $fs-base;
    color: $color-text;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    transition: border-color $transition, background $transition;

    &::placeholder { color: $color-text-faint; }
    &:focus {
      outline: none;
      border-color: $color-indigo;
      background: $color-surface-2;
    }
    // hide native search clear (we provide our own)
    &::-webkit-search-cancel-button { -webkit-appearance: none; }
  }

  &__clear {
    position: absolute;
    right: $space-3;
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    color: $color-text-muted;
    border-radius: $radius-full;
    &:hover { color: $color-white; background: $color-surface-2; }
    svg { width: 1rem; height: 1rem; }
  }
}

// ---- View toggle -----------------------------------------------------------
.viewtoggle {
  display: inline-flex;
  gap: $space-1;
  padding: $space-1;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  align-self: flex-start;

  &__btn {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    color: $color-text-faint;
    border-radius: $radius-sm;
    transition: color $transition, background $transition;

    &:hover { color: $color-text; }
    &.is-active {
      color: $color-white;
      background: $color-surface-2;
    }
    svg { width: 1.15rem; height: 1.15rem; }
  }
}

// ---- Compact index (list view) --------------------------------------------
.index {
  display: flex;
  flex-direction: column;
  gap: $space-8;

  &__group {
    --accent: #{$color-indigo-light};

    &--client { --accent: #{$cat-client}; }
    &--game { --accent: #{$cat-game}; }
    &--education { --accent: #{$cat-education}; }
    &--webapp { --accent: #{$cat-webapp}; }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: $space-3;
    margin-bottom: $space-2;
    border-bottom: 1px solid $color-border;
  }

  &__cat {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-display;
    font-weight: 600;
    font-size: $fs-sm;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--accent);
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    background: var(--accent);
    box-shadow: 0 0 10px 0 var(--accent);
  }

  &__count {
    font-size: $fs-xs;
    color: $color-text-faint;
  }
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: $space-2 $space-4;
  padding: $space-3 $space-4;
  border-radius: $radius-md;
  transition: background $transition;

  @include respond-to('md') {
    grid-template-columns: 14rem 1fr auto auto;
  }

  &:hover {
    background: $color-surface;
    .row__arrow { transform: translateX(3px); color: var(--accent); }
  }

  &__title {
    font-weight: 600;
    color: $color-text;
  }

  &__desc {
    display: none;
    color: $color-text-muted;
    font-size: $fs-sm;
    @include line-clamp(1);

    @include respond-to('md') { display: block; }
  }

  &__tag {
    justify-self: start;
    padding: 2px $space-2;
    font-size: $fs-xs;
    color: $color-text-muted;
    background: $color-surface-2;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    white-space: nowrap;
  }

  &__arrow {
    width: 1.1rem;
    height: 1.1rem;
    color: $color-text-faint;
    transition: transform $transition, color $transition;
  }
}

// Grid transitions
.grid-enter-active,
.grid-leave-active { transition: opacity 0.4s $ease-out, transform 0.4s $ease-out; }
.grid-enter-from,
.grid-leave-to { opacity: 0; transform: translateY(20px) scale(0.98); }
.grid-leave-active { position: absolute; }
.grid-move { transition: transform 0.4s $ease-out; }
</style>
