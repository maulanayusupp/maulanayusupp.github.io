// =============================================================================
// Portfolio data service.
// Project data lives in per-category JSON files under `services/data/`.
// Add a project = add an entry to the relevant category JSON.
// =============================================================================
import webappData from './data/webapp.json'
import gameData from './data/game.json'
import educationData from './data/education.json'
import clientData from './data/client.json'

export type CategoryId = 'client' | 'game' | 'education' | 'webapp'

export interface Category {
  id: CategoryId
  label: string
  description: string
  /** Accent color (hex) used for badges/highlights. */
  accent: string
}

/** How a project's preview is rendered on a card. */
export type Preview =
  /** Live, embeddable site shown in a lazy-loaded iframe. */
  | { kind: 'live' }
  /** A screenshot image (for client work or non-embeddable sites). */
  | { kind: 'image'; src: string }
  /** A styled fallback for not-yet-hosted or unembeddable projects. */
  | { kind: 'placeholder'; emoji: string }

export interface Project {
  id: string
  title: string
  /** Short one-liner used on cards. */
  description: string
  /** Richer paragraph shown on the project detail page. */
  longDescription?: string
  /** Key feature bullets shown on the detail page. */
  highlights?: string[]
  category: CategoryId
  tags: string[]
  /** Live URL, if the project is hosted. */
  url?: string
  preview: Preview
  /** Featured projects can be highlighted (e.g. ordered first). */
  featured?: boolean
  year?: string
}

/** A project entry as stored in JSON — category is implied by the file. */
type RawProject = Omit<Project, 'category'>

export const categories: Category[] = [
  {
    id: 'webapp',
    label: 'Web Apps & Tools',
    description: 'Products and developer tools built for real-world use.',
    accent: '#818cf8',
  },
  {
    id: 'game',
    label: 'Games',
    description: 'Browser games — arcade, puzzle, and board games.',
    accent: '#f472b6',
  },
  {
    id: 'education',
    label: 'Educational',
    description: 'Interactive learning and 3D exploration experiences.',
    accent: '#34d399',
  },
  {
    id: 'client',
    label: 'Client Work',
    description: 'Enterprise and client projects delivered over the years.',
    accent: '#22d3ee',
  },
]

function withCategory(list: RawProject[], category: CategoryId): Project[] {
  return list.map((p) => ({ ...p, category }))
}

// Ordered to match the category display order (grouped, tidy "All" view).
export const projects: Project[] = [
  ...withCategory(webappData as unknown as RawProject[], 'webapp'),
  ...withCategory(gameData as unknown as RawProject[], 'game'),
  ...withCategory(educationData as unknown as RawProject[], 'education'),
  ...withCategory(clientData as unknown as RawProject[], 'client'),
]

// ---- Helpers ---------------------------------------------------------------

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function projectsByCategory(id: CategoryId | 'all'): Project[] {
  if (id === 'all') return projects
  return projects.filter((p) => p.category === id)
}

export function countByCategory(id: CategoryId): number {
  return projects.filter((p) => p.category === id).length
}

export const featuredProjects = projects.filter((p) => p.featured)
