# CLAUDE.md

## Project Overview

Personal portfolio website for **Maulana Yusup Abdullah** - Full Stack Web Developer with 10+ years of experience. Hosted on GitHub Pages at `https://maulanayusupp.github.io/`.

## Tech Stack

- **Nuxt 3** (Vue 3) — static-site generation (SSG), no server runtime
- **SCSS design system** (no Tailwind, no inline CSS) — centralized tokens/mixins in
  `assets/scss/`, component styles in scoped `<style lang="scss">`
- **Vue composition API** + typed data services — no extra state/UI libraries
- **Google Fonts** — Sora (display) + Inter (body), loaded in `nuxt.config.ts`
- **Design** — dark theme (`#0b1120`), indigo→violet→fuchsia accents, glass-morphism
- Deployed as static files to GitHub Pages via GitHub Actions (pnpm)

## Site Structure

```
nuxt.config.ts        - Nuxt config: github-pages preset, SCSS loadPaths, head (favicons, fonts)
app.vue               - Root: <NuxtLayout><NuxtPage/></NuxtLayout>
layouts/default.vue   - Shared shell: AppHeader + <slot/> + AppFooter

pages/
  index.vue           - Home: hero, categorized ProjectShowcase, tech marquee, CTA
  about.vue           - About: bio, photo, skills, services, stats, CTA
  contact.vue         - Contact: contact channels, location/availability card

services/
  projects.ts         - SINGLE SOURCE OF TRUTH for the portfolio. Typed Project model,
                        categories, and helpers. Add a project = one array entry.
                        preview.kind: 'live' (iframe) | 'image' (screenshot) | 'placeholder'.

components/
  ProjectShowcase.vue - Category filter tabs + responsive grid + screenshot lightbox
  ProjectCard.vue     - One project: preview + category badge + tags; links out or opens lightbox
  ProjectPreview.vue  - Renders the preview: lazy-loaded scaled live iframe / image / placeholder
  AppHeader.vue       - Fixed navbar, scroll state, mobile menu
  AppFooter.vue       - Footer with brand, nav, socials
  SectionHeading.vue  - Reusable eyebrow + title + subtitle
  BaseButton.vue      - Polymorphic button (NuxtLink / <a> / <button>), variants
  CtaSection.vue      - "Let's build" CTA (text prop)
  SocialLinks.vue     - GitHub/LinkedIn/Email/Phone icon row
  TechMarquee.vue     - Infinite-scroll tech chips

composables/
  useScrollReveal.ts  - Adds .is-visible to .reveal elements on scroll
  useInView.ts        - Generic "entered viewport once" (used to lazy-load iframes)

utils/
  seo.ts              - SITE_URL, personSchema, projectsSchema, usePageSeo(), useJsonLd(),
                        breadcrumbSchema()

assets/scss/          - Design system (see below)
public/               - Served at root: favicon.svg, site.webmanifest, img/, icons/,
                        robots.txt, sitemap.xml
.github/workflows/deploy.yml - CI: pnpm install + generate + deploy to GitHub Pages
```

Routes are clean URLs: `/`, `/about`, `/contact`.

### SCSS design system (`assets/scss/`)

```
_tokens.scss     - Design tokens: colors, spacing, typography, radius, shadows, breakpoints
_mixins.scss     - respond-to(), container, glass, gradient-text, focus-ring, line-clamp
_abstracts.scss  - @forward tokens + mixins (the shared entry)
_base.scss       - Reset, base typography, background glow, scrollbar
_animations.scss - Keyframes + .reveal scroll-in utility (+ reduced-motion)
_utilities.scss  - .container, .section, .gradient-text, .visually-hidden
main.scss        - Global entry (loaded in nuxt.config.ts)
```

Components consume the system with `@use 'abstracts' as *;` — resolvable anywhere via the
`loadPaths` set in `nuxt.config.ts`. **No inline CSS**; the only `style="..."` in output is
Vue's own `v-show` toggle.

### Adding a project

Append to `projects` in `services/projects.ts`. For a hosted, embeddable site use
`preview: { kind: 'live' }` + `url`. For a screenshot use `{ kind: 'image', src: '/img/...' }`.
For not-yet-hosted or non-embeddable (e.g. X-Frame-Options) use `{ kind: 'placeholder', emoji }`.

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

Package manager is **pnpm** (via corepack). npm is intentionally not used —
its optional-dependencies bug (npm/cli#4828) drops the platform-native
`oxc-parser` binary in CI. `package-lock.json` is globally gitignored on the
author's machine; do not reintroduce it.

```bash
corepack enable pnpm   # one-time: make pnpm available
pnpm install           # install dependencies
pnpm run dev           # local dev server (http://localhost:3000)
pnpm run generate      # build static site into .output/public
pnpm run preview       # preview the generated static build
```

## Deployment

Push to `master` → GitHub Actions (`.github/workflows/deploy.yml`) installs with pnpm, runs `pnpm run generate`, and deploys `.output/public` to GitHub Pages.

**One-time setup:** in the repo's GitHub settings, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** (not "Deploy from a branch").

The `github-pages` Nitro preset auto-emits `.nojekyll` (so `_nuxt/` assets are served) and a `404.html` fallback.

## Conventions

- All pages share the same navigation (AppHeader), footer (AppFooter), and shell via `layouts/default.vue`
- Styling is SCSS only — tokens/mixins from `@use 'abstracts'`, BEM-style class names, scoped per component. No inline CSS, no utility-class soup.
- SVG icons are inlined (no icon library dependency)
- Social/external links use `target="_blank" rel="noopener"`
- Internal navigation uses `<NuxtLink>` (never hardcoded `.html` links)
