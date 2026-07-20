// Reveals elements matching `selector` as they scroll into view.
// Mirrors the original IntersectionObserver behaviour; runs client-side only.
export function useScrollReveal(selector: string) {
  onMounted(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector))

    // Progressive enhancement: if IO is unavailable, leave everything visible.
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            ;(entry.target as HTMLElement).style.opacity = '1'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    els.forEach((el) => {
      el.style.opacity = '0'
      observer.observe(el)
    })
  })
}
