import {
  categories,
  projects,
  type CategoryId,
  type Project,
} from '~/services/projects'

export type Filter = CategoryId | 'all'

// Search + category filtering over the single project source of truth.
// Nothing here is hardcoded — categories and projects come from services/.
export function useProjectSearch() {
  const query = ref('')
  const activeCategory = ref<Filter>('all')

  const normalized = computed(() => query.value.trim().toLowerCase())

  function matchesQuery(p: Project): boolean {
    if (!normalized.value) return true
    const haystack = [
      p.title,
      p.description,
      p.longDescription ?? '',
      p.category,
      ...p.tags,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(normalized.value)
  }

  // Query matches ignoring the active category — used for chip counts.
  const queryMatches = computed(() => projects.filter(matchesQuery))

  const results = computed(() =>
    queryMatches.value.filter(
      (p) => activeCategory.value === 'all' || p.category === activeCategory.value,
    ),
  )

  // Results grouped by category (for the compact index / list view).
  const grouped = computed(() =>
    categories
      .map((category) => ({
        category,
        items: results.value.filter((p) => p.category === category.id),
      }))
      .filter((g) => g.items.length > 0),
  )

  const filters = computed(() => [
    { id: 'all' as Filter, label: 'All', count: queryMatches.value.length },
    ...categories.map((c) => ({
      id: c.id as Filter,
      label: c.label,
      count: queryMatches.value.filter((p) => p.category === c.id).length,
    })),
  ])

  function reset() {
    query.value = ''
    activeCategory.value = 'all'
  }

  return { query, activeCategory, results, grouped, filters, reset, total: projects.length }
}
