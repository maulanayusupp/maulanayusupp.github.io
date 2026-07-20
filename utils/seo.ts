// Shared SEO constants & JSON-LD builders. Files in `utils/` are auto-imported.

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
    'Vue.js', 'Laravel', 'Node.js', 'AdonisJs', 'PHP', 'JavaScript',
    'MySQL', 'MongoDB', 'Redis', 'Socket.io', 'REST API', 'VPS Deployment',
  ],
  sameAs: [
    'https://github.com/maulanayusupp',
    'https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/',
  ],
}

/** Helper to register one or more JSON-LD blocks via useHead. */
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  }
}
