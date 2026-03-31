# CLAUDE.md

## Project Overview

Personal portfolio website for **Maulana Yusup Abdullah** - Full Stack Web Developer with 10+ years of experience. Hosted on GitHub Pages at `https://maulanayusupp.github.io/`.

## Tech Stack

- **HTML5** static pages (no build step, no framework)
- **Tailwind CSS** via CDN (`cdn.tailwindcss.com`)
- **Vanilla JavaScript** (no jQuery, no libraries)
- **Google Fonts** - Inter
- **Design** - Dark theme (slate-950), indigo/violet accents, glass-morphism cards

## Site Structure

```
index.html    - Home page: hero, portfolio grid, tech stack, CTA
about.html    - About page: bio, photo, skills, services, stats
contact.html  - Contact page: contact cards (email, phone, LinkedIn, GitHub), location info
sitemap.xml   - XML sitemap for search engines
robots.txt    - Crawler directives
img/          - Profile photo (about.jpg) and portfolio screenshots
icons/        - Favicons and app icons (various sizes)
css/          - Legacy CSS files (no longer referenced by HTML)
js/           - Legacy JS files (no longer referenced by HTML)
```

## SEO

All pages include:
- Unique title tags and meta descriptions per page
- Open Graph and Twitter Card meta tags
- JSON-LD structured data (Person, WebSite, WebPage, BreadcrumbList, ContactPage, ItemList)
- Canonical URLs pointing to `https://maulanayusupp.github.io/`
- `robots.txt` and `sitemap.xml`

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

No build process needed. Edit HTML files directly and push to `master` branch for GitHub Pages deployment. Open locally via XAMPP at `http://localhost/maulanayusupp.github.io/`.

## Conventions

- All pages share the same navigation, footer, and color scheme
- Tailwind classes are used inline (no custom CSS file)
- Custom animations defined in `<style>` blocks within each HTML file
- SVG icons are inlined (no icon library dependency)
- Social links use `target="_blank" rel="noopener"`
