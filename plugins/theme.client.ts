// Sync the reactive theme state with the <html data-theme> the inline
// head script already applied (see nuxt.config app.head.script).
export default defineNuxtPlugin(() => {
  const { theme } = useTheme()
  const current = document.documentElement.dataset.theme
  theme.value = current === 'light' ? 'light' : 'dark'
})
