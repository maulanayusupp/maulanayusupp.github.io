// Build-time sitemap generator. Writes public/sitemap.xml from the static
// routes + every project id in services/data/*.json (single source).
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'))

const BASE = 'https://maulanayusupp.github.io'
const today = new Date().toISOString().slice(0, 10)

const projectIds = ['webapp', 'game', 'education', 'client'].flatMap((cat) =>
  read(`services/data/${cat}.json`).map((p) => p.id),
)

const routes = [
  { path: '/', priority: '1.0', freq: 'monthly' },
  { path: '/projects', priority: '0.9', freq: 'weekly' },
  { path: '/about', priority: '0.7', freq: 'monthly' },
  { path: '/contact', priority: '0.7', freq: 'monthly' },
  { path: '/cv', priority: '0.6', freq: 'monthly' },
  { path: '/privacy', priority: '0.3', freq: 'yearly' },
  ...projectIds.map((id) => ({ path: `/projects/${id}`, priority: '0.6', freq: 'monthly' })),
]

const urls = routes
  .map(
    (r) =>
      `\t<url><loc>${BASE}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.freq}</changefreq><priority>${r.priority}</priority></url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`[sitemap] wrote ${routes.length} URLs → public/sitemap.xml`)
