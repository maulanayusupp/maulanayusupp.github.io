<script setup lang="ts">
interface Props {
  /** Internal route → renders <NuxtLink>. */
  to?: string
  /** External URL → renders <a target=_blank>. */
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    // Only open external http(s) links in a new tab; in-page/mailto/tel stay in place.
    const external = /^https?:\/\//.test(props.href)
    return external
      ? { href: props.href, target: '_blank', rel: 'noopener' }
      : { href: props.href }
  }
  return {}
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`]"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  font-family: $font-body;
  font-weight: 600;
  white-space: nowrap;
  border-radius: $radius-md;
  transition: transform $transition, box-shadow $transition, background $transition,
    border-color $transition, color $transition;

  &--md {
    padding: $space-3 $space-5;
    font-size: $fs-sm;
  }

  &--lg {
    padding: $space-4 $space-8;
    font-size: $fs-base;
  }

  &--primary {
    color: $color-on-accent;
    background: $gradient-brand-vivid;
    box-shadow: 0 12px 30px -12px rgba(99, 102, 241, 0.7);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 18px 40px -12px rgba(139, 92, 246, 0.8);
    }
  }

  &--secondary {
    color: $color-text;
    background: $color-surface-2;
    border: 1px solid $color-border-strong;

    &:hover {
      transform: translateY(-2px);
      border-color: $color-indigo;
      color: $color-white;
    }
  }

  &--ghost {
    color: $color-text-muted;

    &:hover {
      color: $color-white;
    }
  }
}
</style>
