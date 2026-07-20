// Shared SEO constants & JSON-LD builders. Files in `utils/` are auto-imported.
import { projects } from '~/services/projects'

export const SITE_URL = 'https://maulanayusupp.github.io'
export const OG_IMAGE = `${SITE_URL}/img/about.jpg`

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
  description:
    'Full Stack Web Developer with 10+ years of experience specializing in Vue.js, Laravel, and Node.js',
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
    ...(p.url ? { url: p.url } : {}),
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

/** Build a BreadcrumbList for a subpage. */
export function breadcrumbSchema(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  }
}

/** Apply title + meta description + OG/Twitter + canonical in one call. */
export function usePageSeo(opts: {
  title: string
  description: string
  path: string
  keywords?: string
  ogType?: string
}) {
  const url = `${SITE_URL}${opts.path}`
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
    ogImage: OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: 'Maulana Yusup Abdullah',
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    twitterImage: OG_IMAGE,
  })
}
