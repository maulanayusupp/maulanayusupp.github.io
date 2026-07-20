// =============================================================================
// Portfolio data service — the single source of truth for all projects.
// Add a new project by appending to `projects`. Add a screenshot-only or
// not-yet-hosted project with `preview: { kind: 'image' | 'placeholder' }`.
// =============================================================================

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
  description: string
  category: CategoryId
  tags: string[]
  /** Live URL, if the project is hosted. */
  url?: string
  preview: Preview
  /** Featured projects get a larger, prominent card. */
  featured?: boolean
  year?: string
}

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

export const projects: Project[] = [
  // ---- Web Apps & Tools -----------------------------------------------------
  {
    id: 'dibiku',
    title: 'Dibiku',
    description:
      'A fast database client with a built-in SSH terminal & SQL editor. Connect to MySQL, PostgreSQL, Redis, and SQLite from one blazing-fast app.',
    category: 'webapp',
    tags: ['Database Client', 'SSH', 'SQL Editor'],
    url: 'https://dibiku-web.vercel.app/',
    preview: { kind: 'live' },
    featured: true,
    year: '2025',
  },
  {
    id: 'temanisikecil',
    title: 'Temanisikecil',
    description:
      'Educational worksheets for children aged 2–5 and coding worksheets for 5+. Learn while playing — motor skills, creativity, and logic.',
    category: 'education',
    tags: ['Kids Education', 'Worksheets', 'Product'],
    url: 'https://www.temanisikecil.com/',
    preview: { kind: 'live' },
    featured: true,
    year: '2025',
  },
  {
    id: 'pride',
    title: 'PRIDE Community',
    description:
      'Official site for PRIDE — a motorcycle riders community in Cimahi built around brotherhood, safety, and respect. "More Than A Ride."',
    category: 'webapp',
    tags: ['Community', 'Landing Page', 'Branding'],
    url: 'https://pride-riders.vercel.app/',
    preview: { kind: 'live' },
    year: '2025',
  },

  // ---- Educational & Interactive -------------------------------------------
  {
    id: 'planetarium',
    title: 'Planetarium Razan',
    description:
      'An interactive 3D solar system and 28 constellations, with a cinematic tour, voice narration, and orchestral score — right in the browser.',
    category: 'education',
    tags: ['3D Simulation', 'WebGL', 'Astronomy'],
    url: 'https://planetarium-razan.vercel.app/',
    preview: { kind: 'live' },
    featured: true,
    year: '2025',
  },
  {
    id: 'simulasi-sejarah',
    title: 'Simulasi Sejarah Dunia',
    description:
      'An interactive 3D globe that maps world history events across time and place — explore the past spatially.',
    category: 'education',
    tags: ['3D Globe', 'History', 'Interactive'],
    url: 'https://simulasi-sejarah.vercel.app/',
    preview: { kind: 'live' },
    year: '2025',
  },
  {
    id: 'belajar-membaca',
    title: 'Belajar Membaca',
    description:
      'A reading app for Indonesian kids across 4 stages — letters, syllables, words, sentences — with Indonesian voice-over and playful animations.',
    category: 'education',
    tags: ['Kids', 'Reading', 'Bahasa Indonesia'],
    url: 'https://belajar-membaca-nine.vercel.app/',
    preview: { kind: 'live' },
    year: '2025',
  },
  {
    id: 'godzilla-types',
    title: 'Godzilla Types',
    description:
      'An encyclopedia of 12 Godzilla incarnations across the Showa, Heisei, Millennium, Reiwa, and MonsterVerse eras — height, weight, abilities, and films.',
    category: 'education',
    tags: ['Encyclopedia', 'Interactive', 'Fan Project'],
    url: 'https://godzilla-types.vercel.app/',
    preview: { kind: 'live' },
    year: '2025',
  },

  // ---- Games ----------------------------------------------------------------
  {
    id: 'iron-vanguard',
    title: 'Iron Vanguard',
    description:
      'An endless tower-defense game: command 16 turrets and 18 heroes, unleash skills, and hold the line against 35 monster types across 2000 levels.',
    category: 'game',
    tags: ['Tower Defense', 'Browser Game', 'Arcade'],
    url: 'https://iron-vanguard.vercel.app/',
    preview: { kind: 'live' },
    featured: true,
    year: '2025',
  },
  {
    id: 'bladerush',
    title: 'Blade Rush',
    description:
      'A fast arcade survivor game — spin a growing ring of blades, crush endless hordes, and out-duel rival warlords.',
    category: 'game',
    tags: ['Arcade', 'Survivor', 'Browser Game'],
    url: 'https://bladerush.vercel.app/',
    preview: { kind: 'live' },
    year: '2025',
  },
  {
    id: 'reconcile',
    title: 'Reconcile',
    description:
      'A payment-ops puzzle game about reconciling transactions across Payment Gateway, Internal DB, and Bank Settlement — spot duplicates, refunds, and chargebacks.',
    category: 'game',
    tags: ['Puzzle Game', 'Fintech', 'Payments'],
    url: 'https://reconcile-game.vercel.app/',
    preview: { kind: 'live' },
    year: '2025',
  },
  {
    id: 'ular-tangga',
    title: 'Snakes & Ladders',
    description:
      'The classic board game online for 1–4 players — single-player vs bot or pass-and-play, with modern animations and realistic sound.',
    category: 'game',
    tags: ['Board Game', 'Multiplayer', 'Browser Game'],
    url: 'https://ular-tangga-sigma.vercel.app/',
    preview: { kind: 'live' },
    year: '2025',
  },
  {
    id: 'prize-gacha',
    title: 'Prize Gacha',
    description:
      'An online gacha luck game — spin the gachapon, win prizes across Common to Mythic rarities, and share your wins. Plays right in the browser.',
    category: 'game',
    tags: ['Gacha', 'Browser Game', 'Casual'],
    url: 'https://prize-gacha.vercel.app/',
    preview: { kind: 'placeholder', emoji: '🎰' },
    year: '2025',
  },

  // ---- Client Work (screenshots) -------------------------------------------
  {
    id: 'honda',
    title: 'Honda Indonesia',
    description:
      'An enterprise-grade web platform built for Honda Indonesia — full-stack development with a modern, scalable stack.',
    category: 'client',
    tags: ['Enterprise', 'Vue.js', 'Laravel'],
    preview: { kind: 'image', src: '/img/portfolio/honda_center.jpg' },
    featured: true,
  },
  {
    id: 'bpom',
    title: 'Pusat Informasi Pasar Aman',
    description:
      'A market-safety information system for BPOM (Indonesian FDA) — a comprehensive data-management platform.',
    category: 'client',
    tags: ['Government', 'Data Platform', 'Laravel'],
    preview: { kind: 'image', src: '/img/portfolio/bpom_center.jpg' },
  },
  {
    id: 'scoresheets',
    title: 'Scoresheets System',
    description:
      'A dynamic scoring and evaluation system with real-time updates and comprehensive reporting.',
    category: 'client',
    tags: ['Real-time', 'Vue.js', 'Scoring'],
    preview: { kind: 'image', src: '/img/portfolio/scoresheets_center.jpg' },
  },
  {
    id: 'mymeet',
    title: 'MyMeet',
    description:
      'A real-time meeting and collaboration platform with video conferencing, built with PeerJS and Socket.io.',
    category: 'client',
    tags: ['WebRTC', 'Socket.io', 'Video'],
    preview: { kind: 'image', src: '/img/portfolio/mymeet_center.jpg' },
  },
  {
    id: 'dapur-ilmu',
    title: 'Dapur Ilmu',
    description:
      'An interactive e-learning platform with courses, progress tracking, and a full learning-management system.',
    category: 'client',
    tags: ['E-learning', 'LMS', 'Vue.js'],
    preview: { kind: 'image', src: '/img/portfolio/dapurilmu_center.jpg' },
  },
]

// ---- Helpers ---------------------------------------------------------------

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function projectsByCategory(id: CategoryId | 'all'): Project[] {
  if (id === 'all') return projects
  return projects.filter((p) => p.category === id)
}

export function countByCategory(id: CategoryId): number {
  return projects.filter((p) => p.category === id).length
}

export const featuredProjects = projects.filter((p) => p.featured)
