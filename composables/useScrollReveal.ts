// Adds `.is-visible` to every `.reveal` element as it scrolls into view.
// Call once from a page's setup(). Client-side only.
export function useScrollReveal() {
  onMounted(() => {
    const reveal = () =>
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'))

    if (!('IntersectionObserver' in window)) {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    nextTick(() => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
        .forEach((el) => observer.observe(el))
    })
  })
}
