// Reports when an element first enters the viewport, then stops observing.
// Used to lazy-load heavy content (e.g. live iframe previews).
export function useInView(options: IntersectionObserverInit = { rootMargin: '200px' }) {
  const target = ref<HTMLElement | null>(null)
  const isInView = ref(false)

  onMounted(() => {
    if (!target.value) return

    if (!('IntersectionObserver' in window)) {
      isInView.value = true
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        isInView.value = true
        observer.disconnect()
      }
    }, options)

    observer.observe(target.value)
    onBeforeUnmount(() => observer.disconnect())
  })

  return { target, isInView }
}
