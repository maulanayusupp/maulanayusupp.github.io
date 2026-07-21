// Build-time sitemap generator (with image sitemap extension). Writes
// public/sitemap.xml from static routes + every project id in services/data/*.json.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'))

const BASE = 'https://maulanayusupp.github.io'
const today = new Date().toISOString().slice(0, 10)

const projects = ['webapp', 'tools', 'game', 'education', 'client'].flatMap((cat) =>
  read(`services/data/${cat}.json`),
)

const routes = [
  { path: '/', priority: '1.0', freq: 'monthly', image: '/og/default.png' },
  { path: '/projects', priority: '0.9', freq: 'weekly' },
  { path: '/about', priority: '0.7', freq: 'monthly', image: '/img/about.jpg' },
  { path: '/contact', priority: '0.7', freq: 'monthly' },
  { path: '/cv', priority: '0.6', freq: 'monthly' },
  { path: '/privacy', priority: '0.3', freq: 'yearly' },
  ...projects.map((p) => ({
    path: `/projects/${p.id}`,
    priority: '0.6',
    freq: 'monthly',
    image: `/og/${p.id}.png`,
  })),
]

const urls = routes
  .map((r) => {
    const img = r.image
      ? `<image:image><image:loc>${BASE}${r.image}</image:loc></image:image>`
      : ''
    return `\t<url><loc>${BASE}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.freq}</changefreq><priority>${r.priority}</priority>${img}</url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`[sitemap] wrote ${routes.length} URLs (with images) → public/sitemap.xml`)
