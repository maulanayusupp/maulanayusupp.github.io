<script setup lang="ts">
import { LOCALES } from '~/composables/useLocale'
const { locale, setLocale } = useLocale()
</script>

<template>
  <div class="lang" role="group" aria-label="Language">
    <button
      v-for="l in LOCALES"
      :key="l.code"
      class="lang__btn"
      :class="{ 'is-active': locale === l.code }"
      :aria-pressed="locale === l.code"
      @click="setLocale(l.code)"
    >
      {{ l.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.lang {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;

  &__btn {
    padding: $space-1 $space-2;
    font-size: $fs-xs;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: $color-text-faint;
    border-radius: calc(#{$radius-md} - 3px);
    transition: color $transition, background $transition;

    &:hover { color: $color-text; }
    &.is-active {
      color: $color-white;
      background: $color-surface-2;
    }
  }
}
</style>
