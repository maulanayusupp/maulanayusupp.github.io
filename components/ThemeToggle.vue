<script setup lang="ts">
const { theme, toggle } = useTheme()
</script>

<template>
  <ClientOnly>
    <button
      class="theme-toggle"
      :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="toggle"
    >
      <svg v-if="theme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke-width="2" />
        <path stroke-linecap="round" stroke-width="2" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4l1.4-1.4" />
      </svg>
    </button>
    <template #fallback>
      <span class="theme-toggle" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.theme-toggle {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: $color-text-muted;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  transition: color $transition, border-color $transition;

  &:hover {
    color: $color-text;
    border-color: $color-border-strong;
  }

  svg { width: 1.15rem; height: 1.15rem; }
}
</style>
