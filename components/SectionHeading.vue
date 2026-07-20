<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
  }>(),
  { align: 'center' },
)
</script>

<template>
  <div class="heading" :class="`heading--${align}`">
    <p v-if="eyebrow" class="heading__eyebrow">{{ eyebrow }}</p>
    <h2 class="heading__title">{{ title }}</h2>
    <p v-if="subtitle" class="heading__subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.heading {
  display: flex;
  flex-direction: column;
  gap: $space-3;

  &--center {
    align-items: center;
    text-align: center;
  }

  &__eyebrow {
    font-size: $fs-sm;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $color-indigo-light;
  }

  &__title {
    font-size: $fs-3xl;

    @include respond-to('md') {
      font-size: $fs-4xl;
    }
  }

  &__subtitle {
    max-width: 40rem;
    color: $color-text-muted;
    font-size: $fs-lg;
  }
}
</style>
