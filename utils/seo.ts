// Shared SEO constants & JSON-LD builders. Files in `utils/` are auto-imported.
import { projects } from '~/services/projects'
import { yearsOfExperience } from '~/utils/experience'

export const SITE_URL = 'https://maulanayusupp.github.io'
export const OG_IMAGE = `${SITE_URL}/img/about.jpg` // photo, used for Person schema
export const DEFAULT_OG = `${SITE_URL}/og/default.png` // generated social card

/** Person schema reused across pages (Google Knowledge Panel). */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Maulana Yusup Abdullah',
  alternateName: 'Maulana Yusup',
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  jobTitle: 'Full Stack Web Developer',
  description: `Full Stack Web Developer with ${yearsOfExperience()}+ years of experience specializing in Vue.js, Laravel, and Node.js`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bandung',
    addressRegion: 'West Java',
    addressCountry: 'ID',
  },
  email: 'maulanayusupp@gmail.com',
  telephone: '+62-878-2276-6333',
  knowsAbout: [
    'Vue.js', 'Nuxt', 'Laravel', 'Node.js', 'AdonisJs', 'PHP', 'JavaScript',
    'TypeScript', 'MySQL', 'MongoDB', 'Redis', 'Socket.io', 'REST API',
    'Software Engineering', 'VPS Deployment',
  ],
  sameAs: [
    'https://github.com/maulanayusupp',
    'https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/',
  ],
}

/** ItemList of all portfolio projects (rich result eligible). */
export const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Portfolio Projects',
  description:
    'Web apps, developer tools, games, and interactive experiences by Maulana Yusup Abdullah.',
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    description: p.description,
    image: `${SITE_URL}/og/${p.id}.png`,
    url: p.url ?? `${SITE_URL}/projects/${p.id}`,
  })),
}

/** Register one or more JSON-LD blocks via useHead. */
export function useJsonLd(blocks: Record<string, unknown>[]) {
  useHead({
    script: blocks.map((block) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(block),
    })),
  })
}

/** Build a BreadcrumbList from a trail of crumbs (Home is prepended). */
export function breadcrumbTrail(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
}

/** Build a BreadcrumbList for a single subpage (Home > name). */
export function breadcrumbSchema(name: string, path: string) {
  return breadcrumbTrail([{ name, path }])
}

/** Apply title + meta description + OG/Twitter + canonical in one call. */
export function usePageSeo(opts: {
  title: string
  description: string
  path: string
  keywords?: string
  ogType?: string
  /** Absolute or root-relative OG image; defaults to the generated site card. */
  ogImage?: string
  /** Alt text for the OG/Twitter image. */
  ogImageAlt?: string
}) {
  const url = `${SITE_URL}${opts.path}`
  const image = opts.ogImage ?? DEFAULT_OG
  const imageAlt = opts.ogImageAlt ?? opts.title
  useHead({
    title: opts.title,
    meta: [
      { name: 'title', content: opts.title },
      ...(opts.keywords ? [{ name: 'keywords', content: opts.keywords }] : []),
    ],
    link: [{ rel: 'canonical', href: url }],
  })
  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogType: (opts.ogType as 'website') ?? 'website',
    ogUrl: url,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: imageAlt,
    ogImageType: 'image/png',
    ogSiteName: 'Maulana Yusup Abdullah',
    ogLocale: 'en_US',
    ogLocaleAlternate: ['id_ID'],
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
  })
}
