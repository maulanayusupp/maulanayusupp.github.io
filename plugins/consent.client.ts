// Restore the saved cookie-consent choice on the client.
export default defineNuxtPlugin(() => {
  const { consent } = useConsent()
  const saved = localStorage.getItem('cookie-consent')
  if (saved === 'accepted' || saved === 'rejected') consent.value = saved
})
