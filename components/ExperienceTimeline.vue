<script setup lang="ts">
interface Entry {
  period: string
  role: string
  org: string
  description: string
  current?: boolean
}

defineProps<{ entries: Entry[] }>()
const { t } = useLocale()
</script>

<template>
  <ol class="timeline">
    <li v-for="entry in entries" :key="entry.period + entry.role" class="timeline__item reveal">
      <span class="timeline__marker" :class="{ 'is-current': entry.current }" />
      <div class="timeline__body">
        <div class="timeline__head">
          <span class="timeline__period">{{ entry.period }}</span>
          <span v-if="entry.current" class="timeline__badge">{{ t('common.current') }}</span>
        </div>
        <h3 class="timeline__role">{{ entry.role }}</h3>
        <p class="timeline__org">{{ entry.org }}</p>
        <p class="timeline__desc">{{ entry.description }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: $space-8;
  padding-left: $space-8;

  // vertical line
  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: linear-gradient(to bottom, $color-indigo, transparent);
  }

  &__item {
    position: relative;
  }

  &__marker {
    position: absolute;
    left: calc(-#{$space-8} + 1px);
    top: 6px;
    width: 16px;
    height: 16px;
    border-radius: $radius-full;
    background: $color-bg-elevated;
    border: 2px solid $color-border-strong;

    &.is-current {
      background: $color-indigo;
      border-color: $color-indigo;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
    }
  }

  &__head {
    display: flex;
    align-items: center;
    gap: $space-3;
    margin-bottom: $space-2;
  }

  &__period {
    font-size: $fs-sm;
    font-weight: 600;
    color: $color-indigo-light;
  }

  &__badge {
    padding: 1px $space-2;
    font-size: $fs-xs;
    font-weight: 600;
    color: $color-emerald;
    background: color-mix(in srgb, $color-emerald 14%, transparent);
    border-radius: $radius-full;
  }

  &__role {
    font-size: $fs-lg;
  }

  &__org {
    margin-top: 2px;
    color: $color-text-muted;
    font-size: $fs-sm;
    font-weight: 500;
  }

  &__desc {
    margin-top: $space-3;
    color: $color-text-muted;
    max-width: 46rem;
  }
}
</style>
