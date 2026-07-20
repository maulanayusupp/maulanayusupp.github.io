# CLAUDE.md

## Project Overview

Personal portfolio website for **Maulana Yusup Abdullah** - Full Stack Web Developer with 10+ years of experience. Hosted on GitHub Pages at `https://maulanayusupp.github.io/`.

## Tech Stack

- **Nuxt 3** (Vue 3) — static-site generation (SSG), no server runtime
- **Tailwind CSS** via `@nuxtjs/tailwindcss` (build-time, not CDN)
- **Vanilla composition API** — no extra state/UI libraries
- **Google Fonts** - Inter (loaded via `<link>` in `nuxt.config.ts`)
- **Design** - Dark theme (slate-950), indigo/violet accents, glass-morphism cards
- Deployed as static files to GitHub Pages via GitHub Actions

## Site Structure

```
nuxt.config.ts        - Nuxt config: github-pages preset, global head (favicons, fonts, meta)
tailwind.config.js    - Tailwind theme (Inter font family)
app.vue               - Root: <NuxtLayout><NuxtPage/></NuxtLayout>
layouts/default.vue   - Shared shell: AppHeader + <slot/> + AppFooter
pages/
  index.vue           - Home: hero, portfolio grid + image modal, tech stack, CTA
  about.vue           - About: bio, photo, skills, services, stats, CTA
  contact.vue         - Contact: contact cards, location card
components/
  AppHeader.vue       - Fixed navbar with scroll effect + mobile menu (NuxtLink routing)
  AppFooter.vue       - Bottom footer bar (copyright + socials)
  CtaSection.vue      - "Let's work together" CTA (text prop); used by index & about
  SocialLinks.vue     - GitHub/LinkedIn/Email/Phone icon row
composables/
  useScrollReveal.ts  - IntersectionObserver fade-in for .glass-card / .portfolio-card
utils/
  seo.ts              - SITE_URL, personSchema, useJsonLd(), breadcrumbSchema()
assets/css/main.css   - Tailwind directives + keyframes/animations + custom classes
public/               - Static files served at root: img/, icons/, robots.txt, sitemap.xml
.github/workflows/deploy.yml - CI: build + deploy to GitHub Pages
```

Routes are clean URLs: `/`, `/about`, `/contact` (previously `index.html`, `about.html`, `contact.html`).

## SEO

Per-page SEO is set in each page's `<script setup>` via `useHead` / `useSeoMeta`, and JSON-LD via the `useJsonLd()` helper:
- Unique title tags and meta descriptions per page
- Open Graph and Twitter Card meta tags
- JSON-LD structured data (Person, WebSite, WebPage, BreadcrumbList, ContactPage, ItemList)
- Canonical URLs pointing to `https://maulanayusupp.github.io/...`
- Shared favicons, theme-color, and font links live in `nuxt.config.ts` (`app.head`)
- `public/robots.txt` and `public/sitemap.xml`

## Key Content Facts

- Name: Maulana Yusup Abdullah
- Role: Full Stack Web Developer
- Experience: **10+ years**
- Projects: 31+
- Clients: 13+
- Location: Bandung, Indonesia
- Email: maulanayusupp@gmail.com
- Phone: +62 878-2276-6333
- GitHub: https://github.com/maulanayusupp
- LinkedIn: https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/
- Core tech: Vue.js, Laravel, Node.js/AdonisJs, MySQL, MongoDB, Redis

## Development

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:3000)
npm run generate   # build static site into .output/public
npm run preview    # preview the generated static build
```

## Deployment

Push to `master` → GitHub Actions (`.github/workflows/deploy.yml`) runs `npm run generate` and deploys `.output/public` to GitHub Pages.

**One-time setup:** in the repo's GitHub settings, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** (not "Deploy from a branch").

The `github-pages` Nitro preset auto-emits `.nojekyll` (so `_nuxt/` assets are served) and a `404.html` fallback.

## Conventions

- All pages share the same navigation (AppHeader), footer (AppFooter), and color scheme via `layouts/default.vue`
- Tailwind classes are used inline; custom animations/utilities live in `assets/css/main.css`
- Per-page hero gradient variants use `<style scoped>` overrides in the page component
- SVG icons are inlined (no icon library dependency)
- Social/external links use `target="_blank" rel="noopener"`
- Internal navigation uses `<NuxtLink>` (never hardcoded `.html` links)
