// Restore the saved language on the client and keep <html lang> in sync.
export default defineNuxtPlugin(() => {
  const { locale } = useLocale()
  const saved = localStorage.getItem('locale')
  if (saved === 'id' || saved === 'en') locale.value = saved
  document.documentElement.lang = locale.value

  watch(locale, (l) => {
    document.documentElement.lang = l
  })
})
