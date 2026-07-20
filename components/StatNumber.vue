<script setup lang="ts">
const props = withDefaults(
  defineProps<{ value: number; suffix?: string; duration?: number }>(),
  { suffix: '', duration: 1200 },
)

// SSR/no-JS render the real number (good for SEO); the client counts up once.
const display = ref(props.value)
const el = ref<HTMLElement | null>(null)

function animate() {
  const start = performance.now()
  const to = props.value
  display.value = 0
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
    display.value = Math.round(to * eased)
    if (t < 1) requestAnimationFrame(step)
    else display.value = to
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window) || !el.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect()
        animate()
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(el.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <span ref="el">{{ display }}{{ suffix }}</span>
</template>
