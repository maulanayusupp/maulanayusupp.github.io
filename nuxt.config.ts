import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  css: ['~/assets/scss/main.scss'],

  // Make the SCSS abstracts (tokens + mixins) resolvable as `@use 'abstracts'`
  // from any component's <style lang="scss"> without brittle relative paths.
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          loadPaths: [fileURLToPath(new URL('./assets/scss', import.meta.url))],
        },
      },
    },
  },

  // Static-site generation for GitHub Pages.
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'author', content: 'Maulana Yusup Abdullah' },
        {
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'msapplication-TileColor', content: '#0b1120' },
        { name: 'theme-color', content: '#0b1120' },
      ],
      link: [
        // Favicons — modern SVG first, PNG fallbacks for older browsers.
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // Fonts are self-hosted (see assets/scss/_fonts.scss) — no external requests.
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/inter-400.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/sora-700.woff2', crossorigin: '' },
      ],
      script: [
        {
          // Apply saved/preferred theme before paint (no flash of the wrong theme).
          innerHTML:
            ";(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();",
        },
      ],
    },
  },
})
