# TODO — Next Features

Planned improvements for the portfolio site. Move items to "Done" as they ship.
Keep changes incremental — one logical change per commit/push.

## Portfolio & content
- [ ] Add remaining not-yet-hosted projects as `image` (screenshot) or `placeholder` entries
- [ ] Per-project screenshot gallery on the detail page (multiple images / carousel)
- [ ] Add `role` and `stack` fields to projects and surface them on the detail page
- [ ] Fill in real career history + upload CV PDF (`experience.json` → `resumeUrl`)
- [ ] Sort projects by year or "featured first" on the Portfolio page

## Platform / tooling
- [ ] Auto-generate `sitemap.xml` from routes at build (drop the manual list)
- [ ] Self-host the Inter/Sora fonts (remove Google Fonts request; faster + privacy)
- [ ] Light/dark theme toggle (currently dark-only)

## Engagement
- [ ] Contact form (via a form service, e.g. Formspree — GitHub Pages has no backend)
- [ ] Privacy-friendly analytics (e.g. Plausible / Umami)
- [ ] Writing / blog section

## Quality
- [ ] Accessibility pass (focus order, ARIA, color contrast audit)
- [ ] Lighthouse budget check in CI
- [ ] Unit tests for the projects service + a smoke test for prerendered routes

## Done
- [x] Nuxt 3 SSG migration + GitHub Actions deploy
- [x] SCSS design system (no Tailwind, no inline CSS)
- [x] Categorized portfolio (JSON per category) + filter
- [x] Per-project detail pages with live embed
- [x] Dedicated `/projects` Portfolio page + nav menu
- [x] Branded card previews
- [x] Project search + compact index (Grid/List toggle) on the Portfolio page
- [x] Global command palette (⌘K / Ctrl+K) search over pages + projects
- [x] Dynamic Open Graph image per project (generated at build with satori + resvg)
- [x] Career timeline on About + Download-CV hook (`experience.json`)
- [x] Print-friendly `/cv` résumé page (Save as PDF) from single-source data
- [x] i18n — English / Bahasa Indonesia (UI + data, with language switcher)
