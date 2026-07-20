<script setup lang="ts">
import type { Project } from '~/services/projects'

defineProps<{ project: Project }>()
const { t, localize } = useLocale()
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.id}`"
    class="project-card"
    :class="`project-card--${project.category}`"
  >
    <div class="project-card__media">
      <ProjectPreview :project="project" />
      <div class="project-card__overlay">
        <span class="project-card__action">
          {{ t('actions.viewProject') }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>

    <div class="project-card__body">
      <div class="project-card__meta">
        <span class="project-card__category">
          <span class="project-card__dot" />
          {{ t(`categories.${project.category}`) }}
        </span>
        <span v-if="project.year" class="project-card__year">{{ project.year }}</span>
      </div>

      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__desc">{{ localize(project, 'description') }}</p>

      <ul class="project-card__tags">
        <li v-for="tag in project.tags" :key="tag" class="project-card__tag">{{ tag }}</li>
      </ul>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.project-card {
  --accent: #{$color-indigo-light};

  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  text-align: left;
  border-radius: $radius-xl;
  @include glass;
  transition: transform $transition, border-color $transition, box-shadow $transition;

  &:hover {
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow: $shadow-lg;

    .project-card__overlay {
      opacity: 1;
    }

    :deep(.preview__image) {
      transform: scale(1.05);
    }

    :deep(.brand__tile) {
      transform: scale(1.08) rotate(-3deg);
    }
  }

  // Category accents (kept in SCSS — no inline styles).
  &--client { --accent: #{$cat-client}; }
  &--game { --accent: #{$cat-game}; }
  &--education { --accent: #{$cat-education}; }
  &--webapp { --accent: #{$cat-webapp}; }

  &__media {
    position: relative;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--accent) 30%, rgba(2, 6, 23, 0.7)),
      rgba(2, 6, 23, 0.15)
    );
    opacity: 0;
    transition: opacity $transition;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-3 $space-5;
    font-weight: 600;
    font-size: $fs-sm;
    color: $color-white;
    background: rgba(2, 6, 23, 0.6);
    border: 1px solid rgba(248, 250, 252, 0.25);
    border-radius: $radius-full;
    backdrop-filter: blur(6px);

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: $space-3;
    padding: $space-6;
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
  }

  &__category {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-size: $fs-xs;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--accent);
  }

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: $radius-full;
    background: var(--accent);
    box-shadow: 0 0 10px 0 var(--accent);
  }

  &__year {
    font-size: $fs-xs;
    color: $color-text-faint;
  }

  &__title {
    font-size: $fs-xl;
  }

  &__desc {
    color: $color-text-muted;
    font-size: $fs-sm;
    @include line-clamp(3);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    margin-top: auto;
    padding-top: $space-2;
  }

  &__tag {
    padding: $space-1 $space-3;
    font-size: $fs-xs;
    color: $color-text-muted;
    background: $color-surface-2;
    border: 1px solid $color-border;
    border-radius: $radius-full;
  }
}
</style>
