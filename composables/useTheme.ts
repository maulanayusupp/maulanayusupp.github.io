export type Theme = 'dark' | 'light'

// Light/dark theme state. The actual <html data-theme> is set pre-paint by an
// inline script (see nuxt.config) to avoid a flash; this keeps it reactive.
export function useTheme() {
  const theme = useState<Theme>('theme', () => 'dark')

  function setTheme(value: Theme) {
    theme.value = value
    if (import.meta.client) {
      document.documentElement.dataset.theme = value
      localStorage.setItem('theme', value)
    }
  }

  function toggle() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggle }
}
