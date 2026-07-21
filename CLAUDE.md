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
  index.vue           - Home: hero, FEATURED teaser grid + "View all" link, tech marquee, CTA
  projects/index.vue  - Portfolio: full filterable ProjectShowcase + hero + CTA
  projects/[id].vue   - Project detail: title, long description, highlights, live embed / image,
                        related projects. Prerendered per project via crawlLinks.
  about.vue           - About: bio, photo, career timeline, skills, services, stats, CTA
  contact.vue         - Contact: contact channels, location/availability card
  cv.vue              - Standalone on-brand résumé (layout:false, dark, print/Save-as-PDF):
                        stat highlights, timeline, skills, ALL projects grouped by category
                        (no photo). Data from experience.json + skills.json + projects.
  privacy.vue         - Bilingual privacy policy (static, no-tracking notice)

services/
  projects.ts         - Typed Project model, categories, and helpers (getProject,
                        projectsByCategory, countByCategory, featuredProjects).
  data/categories.json- Category metadata (id, label, description, accent) — single source
  data/{webapp,tools,game,education,client}.json - SINGLE SOURCE OF TRUTH for projects.
                        Add a project here (category implied by filename). To add a new
                        category: new data file + entry in categories.json + CategoryId +
                        the withCategory() list + og.mjs/sitemap.mjs file lists + a --<id>
                        accent modifier in the card/preview/showcase/detail/cv SCSS.
  data/archive.json    - "Past & client work" — older projects with no live demo/image
                        (title, summary, role, stack, client country). Rendered as a compact
                        list on /projects via PastWork.vue; NOT cards, no detail routes.
  data/experience.json- Career timeline + `summary` + `resumeUrl`. If `resumeUrl` is set to a
                        /public PDF, the About "Download CV" button links to it; otherwise it
                        links to the /cv page. Dates are editable seeds.
  data/skills.json    - Skill groups, shared by the About page and /cv (single source).

scripts/
  og.mjs              - Build-time OG image generator (satori + resvg) → /og/<id>.png
  sitemap.mjs         - Build-time sitemap generator (static routes + project ids)
                        Both run automatically inside `pnpm run generate`.
assets/fonts/         - Inter .woff files used by the OG generator (satori)
public/fonts/         - Self-hosted Inter + Sora .woff2 for the site (@font-face)

components/
  ProjectShowcase.vue - Search + category filters + Grid/List(compact index) toggle + empty state
  ProjectCard.vue     - One project card (branded preview + badge + tags); links to /projects/:id
  ProjectPreview.vue  - Card visual: branded tile (live/placeholder) or real screenshot (image)
  AppHeader.vue       - Fixed navbar, scroll state, mobile menu
  AppFooter.vue       - Footer with brand, nav, socials
  SectionHeading.vue  - Reusable eyebrow + title + subtitle
  BaseButton.vue      - Polymorphic button (NuxtLink / <a> / <button>), variants
  CtaSection.vue      - "Let's build" CTA (text prop)
  SocialLinks.vue     - GitHub/LinkedIn/Email/Phone icon row
  TechMarquee.vue     - Infinite-scroll tech chips
  ExperienceTimeline.vue - Vertical career timeline (entries prop)
  CommandPalette.vue  - Global ⌘K/Ctrl+K search over pages + projects (rendered once in layout)
  CookieConsent.vue   - Client-only consent banner (gates future analytics via useConsent)

composables/
  useScrollReveal.ts  - Adds .is-visible to .reveal elements on scroll
  useProjectSearch.ts - Search + category filtering over services/ (query, results, grouped, filters)
  useCommandPalette.ts- Shared open/close state for the ⌘K palette
  useLocale.ts        - i18n: t(key), tl(key) for arrays, localize(obj, field) for data
  useConsent.ts       - Cookie/analytics consent state (localStorage); analyticsAllowed
  useTheme.ts         - Light/dark theme state + toggle (localStorage, data-theme)

i18n/
  en.json, id.json    - UI string dictionaries (English + Indonesian)
plugins/
  locale.client.ts    - Restores saved locale (localStorage) + syncs <html lang>
  consent.client.ts   - Restores saved cookie-consent choice
  theme.client.ts     - Syncs reactive theme state with <html data-theme>

utils/
  seo.ts              - SITE_URL, personSchema, projectsSchema, usePageSeo(), useJsonLd(),
                        breadcrumbSchema()

assets/scss/          - Design system (see below)
public/               - Served at root: favicon.svg, site.webmanifest, img/, icons/,
                        robots.txt, sitemap.xml
.github/workflows/deploy.yml - CI: pnpm install + generate + deploy to GitHub Pages
```

Routes are clean URLs: `/`, `/projects`, `/projects/:id`, `/about`, `/contact`, `/cv`. Nav (header +
footer) links Home · Portfolio · About · Contact; "Portfolio" stays active on `/projects/:id`.

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

**Theming (light/dark):** neutral tokens (`$color-bg`, `$color-surface`, `$color-text`,
`$color-white` = strongest fg, …) map to CSS custom properties (`--c-*`) defined in
`_base.scss` under `:root` (dark) and `:root[data-theme='light']`. Accent colors and gradients
are fixed across themes. Text placed on an accent/gradient fill must use `$color-on-accent`
(always white), NOT `$color-white` (which flips dark in light mode). An inline head script sets
`data-theme` pre-paint (no flash); `useTheme()` toggles it. The `/cv` screen view pins the dark
palette regardless of theme.

### Internationalization (EN / ID)

Lightweight, dependency-free i18n. `LangSwitch` in the header toggles locale
(persisted in localStorage; default English). SSG prerenders English; switching
to Indonesian happens client-side.

- **UI strings** live in `i18n/en.json` + `i18n/id.json`. Read them with
  `const { t } = useLocale()` → `t('nav.home')`, arrays via `tl('about.traits')`.
- **Data strings** (project/experience content in `services/data/*.json`) are
  translated inline with optional `<field>_id` keys (e.g. `description_id`,
  `highlights_id`, `summary_id`). Render with `localize(obj, 'description')` —
  it returns the `_id` value in Indonesian, else falls back to English.
- **RULE: every time you add or change user-facing text, update BOTH languages** —
  add the key to `en.json` AND `id.json` (and the `_id` field for data). Missing
  Indonesian falls back to English, so nothing breaks, but keep them in sync.

### Adding a project

Add an entry to the matching `services/data/<category>.json` file. Fields: `id`, `title`,
`description` (card one-liner), `longDescription` + `highlights[]` (detail page), `tags[]`,
optional `url`, `preview`, optional `featured`, `year`.

- Hosted + embeddable → `"preview": { "kind": "live" }` + `url` (branded card, live embed on detail)
- Screenshot → `"preview": { "kind": "image", "src": "/img/..." }`
- Not-yet-hosted / blocks embedding (e.g. X-Frame-Options) → `"preview": { "kind": "placeholder", "emoji": "🎮" }`

`featured: true` surfaces the project in the home teaser grid. The detail page, OG image
(`/og/<id>.png`, generated by `scripts/og.mjs`), and search entry are picked up automatically
on the next build. Then add the URL to `public/sitemap.xml`.

## SEO

Per-page SEO is set in each page's `<script setup>` via `useHead` / `useSeoMeta`, and JSON-LD via the `useJsonLd()` helper:
- Unique title tags and meta descriptions per page
- Open Graph and Twitter Card meta tags
- JSON-LD structured data: Person, WebSite, ItemList, BreadcrumbList (3-level on detail),
  ContactPage, ProfilePage (About), and a category-specific type per project
  (SoftwareApplication / WebApplication / VideoGame / LearningResource / CreativeWork,
  with a free `offers` for hosted apps/games)
- Image sitemap: each URL in `sitemap.xml` carries its OG/screenshot image (`scripts/sitemap.mjs`)
- Canonical URLs pointing to `https://maulanayusupp.github.io/...`
- Per-project Open Graph images generated at build (`scripts/og.mjs` → `/og/<id>.png`);
  other pages use `/og/default.png`. `usePageSeo({ ogImage })` overrides it.
- Shared favicons, theme-color, and font links live in `nuxt.config.ts` (`app.head`)
- `public/robots.txt` and `public/sitemap.xml`

## Key Content Facts

- Name: Maulana Yusup Abdullah
- Role: Full Stack Web Developer
- Experience: **computed from `CAREER_START_YEAR = 2016`** (`utils/experience.ts` → `yearsOfExperience()`); never hardcode the number. Use `{years}` in i18n/data strings and pass the value.
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
- Social/external links use `target="_blank" rel="noopener"`; in-page/mailto/tel links do NOT
- Internal navigation uses `<NuxtLink>` (never hardcoded `.html` links)
- **Never show tech-stack / "Built with …" credits on the site** (no "Powered by", framework
  names, etc. in visible page content)
- **Ship changes incrementally**: one logical change per commit, and push each stage separately
  — do not batch multiple unrelated changes into one push
- **Track next features in `TODO.md`** (repo root); move items here as they're planned
- **All user-facing text is bilingual**: update `i18n/en.json` + `i18n/id.json` (and data `_id` fields) together — never hardcode visible strings in components
- Verify every change with `pnpm run generate` before pushing
