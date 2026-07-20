// Build-time Open Graph image generator.
// Renders one 1200x630 PNG per project (+ a site default) into public/og/.
// Data comes from services/data/*.json — the single source of truth.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'))

const categories = read('services/data/categories.json')
const files = ['webapp', 'game', 'education', 'client']
const projects = files.flatMap((cat) =>
  read(`services/data/${cat}.json`).map((p) => ({ ...p, category: cat })),
)
const accentOf = (id) => categories.find((c) => c.id === id)?.accent ?? '#818cf8'
const labelOf = (id) => categories.find((c) => c.id === id)?.label ?? 'Project'

const fonts = [
  { name: 'Inter', weight: 400, style: 'normal', data: readFileSync(resolve(root, 'assets/fonts/Inter-400.woff')) },
  { name: 'Inter', weight: 700, style: 'normal', data: readFileSync(resolve(root, 'assets/fonts/Inter-700.woff')) },
]

const W = 1200
const H = 630

// Minimal hyperscript for satori's element tree.
const el = (type, style, children) => ({ type, props: { style, ...(children !== undefined ? { children } : {}) } })

function card({ eyebrow, title, desc, footRight }) {
  const accent = card.accent
  return el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: '72px',
      color: '#e2e8f0',
      fontFamily: 'Inter',
      backgroundColor: '#0b1120',
      backgroundImage: `radial-gradient(900px 520px at 18% -8%, ${accent}33, transparent 60%), radial-gradient(700px 500px at 100% 110%, ${accent}22, transparent 60%)`,
    },
    [
      // top eyebrow
      el('div', { display: 'flex', alignItems: 'center', color: accent, fontSize: 28, fontWeight: 700, letterSpacing: 3 }, eyebrow.toUpperCase()),
      // middle: title + desc
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', { display: 'flex', fontSize: 70, fontWeight: 700, color: '#f8fafc', lineHeight: 1.08, letterSpacing: -1 }, title),
        desc
          ? el('div', { display: 'flex', marginTop: '24px', fontSize: 30, color: '#94a3b8', lineHeight: 1.4 }, desc)
          : el('div', {}, ''),
      ]),
      // footer
      el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
        el('div', { display: 'flex', alignItems: 'center' }, [
          el('div', {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, marginRight: '20px', borderRadius: 16,
            backgroundColor: accent, color: '#ffffff', fontSize: 36, fontWeight: 700,
          }, 'M'),
          el('div', { display: 'flex', flexDirection: 'column' }, [
            el('div', { display: 'flex', fontSize: 28, fontWeight: 700, color: '#f8fafc' }, 'Maulana Yusup Abdullah'),
            el('div', { display: 'flex', fontSize: 22, color: '#94a3b8' }, 'Full Stack Developer & Software Engineer'),
          ]),
        ]),
        footRight
          ? el('div', { display: 'flex', fontSize: 24, color: accent }, footRight)
          : el('div', {}, ''),
      ]),
    ],
  )
}

function truncate(s, n) {
  if (!s) return ''
  return s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s
}

function hostOf(url) {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

async function renderPng(node) {
  const svg = await satori(node, { width: W, height: H, fonts })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } })
  return resvg.render().asPng()
}

const outDir = resolve(root, 'public/og')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

let count = 0
for (const p of projects) {
  card.accent = accentOf(p.category)
  const node = card({
    eyebrow: labelOf(p.category),
    title: p.title,
    desc: truncate(p.description, 120),
    footRight: hostOf(p.url),
  })
  writeFileSync(resolve(outDir, `${p.id}.png`), await renderPng(node))
  count++
}

// Site default OG image.
card.accent = '#818cf8'
writeFileSync(
  resolve(outDir, 'default.png'),
  await renderPng(
    card({
      eyebrow: 'Portfolio',
      title: 'Web apps, tools & products that people actually use.',
      desc: 'Full Stack Developer & Software Engineer — 10+ years.',
      footRight: 'maulanayusupp.github.io',
    }),
  ),
)

console.log(`[og] generated ${count} project images + default.png → public/og/`)
