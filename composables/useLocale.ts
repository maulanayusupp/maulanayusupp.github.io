import en from '~/i18n/en.json'
import id from '~/i18n/id.json'

export type Locale = 'en' | 'id'

const dicts: Record<Locale, Record<string, unknown>> = { en, id }
export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
]

function lookup(dict: Record<string, unknown>, key: string): unknown {
  return key.split('.').reduce<unknown>((o, k) => (o == null ? o : (o as Record<string, unknown>)[k]), dict)
}

// Lightweight i18n over JSON dictionaries. `t()` is reactive because it reads
// the shared `locale` state during render.
export function useLocale() {
  const locale = useState<Locale>('locale', () => 'en')

  function setLocale(value: Locale) {
    locale.value = value
    if (import.meta.client) {
      localStorage.setItem('locale', value)
      document.documentElement.lang = value
    }
  }

  function t(key: string, params?: Record<string, string | number>): string {
    let value = lookup(dicts[locale.value], key)
    if (typeof value !== 'string') value = lookup(dicts.en, key) // fallback to English
    let out = typeof value === 'string' ? value : key
    if (params) {
      for (const [k, v] of Object.entries(params)) out = out.replace(`{${k}}`, String(v))
    }
    return out
  }

  // Returns an array value from the dictionary (e.g. lists of traits/services).
  function tl<T = unknown>(key: string): T[] {
    let value = lookup(dicts[locale.value], key)
    if (!Array.isArray(value)) value = lookup(dicts.en, key)
    return Array.isArray(value) ? (value as T[]) : []
  }

  // Pick a localized field from a data object: `field_<locale>` if present,
  // else the base `field`. Lets JSON carry optional `_id` translations.
  function localize<T = unknown>(obj: Record<string, unknown> | undefined, field: string): T {
    if (!obj) return undefined as T
    const localized = obj[`${field}_${locale.value}`]
    return (localized ?? obj[field]) as T
  }

  return { locale, setLocale, t, tl, localize }
}
