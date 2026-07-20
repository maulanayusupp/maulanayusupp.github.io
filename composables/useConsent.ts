export type Consent = 'accepted' | 'rejected'

// Cookie/analytics consent, persisted in localStorage. Gate any future
// non-essential scripts (e.g. analytics) on `analyticsAllowed`.
export function useConsent() {
  const consent = useState<Consent | null>('cookie-consent', () => null)

  function set(value: Consent) {
    consent.value = value
    if (import.meta.client) localStorage.setItem('cookie-consent', value)
  }

  const decided = computed(() => consent.value !== null)
  const analyticsAllowed = computed(() => consent.value === 'accepted')

  return {
    consent,
    decided,
    analyticsAllowed,
    accept: () => set('accepted'),
    reject: () => set('rejected'),
  }
}
