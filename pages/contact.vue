<script setup lang="ts">
const title =
  'Contact Maulana Yusup Abdullah - Hire a Full Stack Developer | Get in Touch'
const description =
  'Get in touch with Maulana Yusup Abdullah for your web development project. Available for freelance work, long-term contracts, and consulting. Based in Bandung, Indonesia. Email: maulanayusupp@gmail.com'

useHead({
  title,
  meta: [
    { name: 'title', content: title },
    {
      name: 'keywords',
      content:
        'contact Maulana Yusup Abdullah, hire developer, freelance web developer, hire Vue.js developer, hire Laravel developer, web development services, Bandung developer for hire',
    },
  ],
  link: [{ rel: 'canonical', href: `${SITE_URL}/contact` }],
})

useSeoMeta({
  ogType: 'website',
  ogUrl: `${SITE_URL}/contact`,
  ogTitle: 'Contact Maulana Yusup Abdullah - Hire a Full Stack Developer',
  ogDescription:
    'Get in touch for your web development project. Available for freelance work and long-term contracts. Based in Bandung, Indonesia.',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Contact Maulana Yusup Abdullah',
  ogSiteName: 'Maulana Yusup Abdullah',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Contact Maulana Yusup Abdullah - Hire a Full Stack Developer',
  twitterDescription:
    'Get in touch for your web development project. Available for freelance work and long-term contracts.',
  twitterImage: OG_IMAGE,
})

useJsonLd([
  breadcrumbSchema('Contact', '/contact'),
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Maulana Yusup Abdullah',
    description: 'Get in touch with Maulana Yusup Abdullah for web development projects',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: 'Maulana Yusup Abdullah',
      email: 'maulanayusupp@gmail.com',
      telephone: '+62-878-2276-6333',
      url: `${SITE_URL}/`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bandung',
        addressRegion: 'West Java',
        addressCountry: 'ID',
      },
      sameAs: [
        'https://github.com/maulanayusupp',
        'https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/',
      ],
    },
  },
])

const availability = [
  { text: 'Available for remote work worldwide', path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { text: 'Open for long-term contracts', path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { text: 'Fast response within 24 hours', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
]
</script>

<template>
  <div>
    <!-- Contact Hero -->
    <section class="relative min-h-screen flex items-center hero-gradient contact-hero overflow-hidden">
      <div class="absolute top-20 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-20 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float delay-200" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Left: Text -->
          <div>
            <div class="animate-fade-in-up opacity-0">
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Ready to collaborate
              </span>
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up opacity-0 delay-100">
              So, let's <span class="gradient-text">talk</span>
            </h1>

            <p class="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg animate-fade-in-up opacity-0 delay-200">
              I am eager to work with you, to provide reliable, consistent, and high-level solutions for you and your business. Let's discuss how we can work together to fully meet your business needs!
            </p>

            <!-- Contact Cards -->
            <div class="mt-12 space-y-4 animate-fade-in-up opacity-0 delay-300">
              <a href="mailto:maulanayusupp@gmail.com" class="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-indigo-500/40 transition-all group block">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div class="text-sm text-slate-500 mb-1">Email</div>
                  <div class="text-white font-medium group-hover:text-indigo-400 transition-colors">maulanayusupp@gmail.com</div>
                </div>
              </a>

              <a href="tel:6287822766333" class="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-indigo-500/40 transition-all group block">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div class="text-sm text-slate-500 mb-1">Phone / WhatsApp</div>
                  <div class="text-white font-medium group-hover:text-emerald-400 transition-colors">+62 878-2276-6333</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/" target="_blank" rel="noopener" class="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-indigo-500/40 transition-all group block">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </div>
                <div>
                  <div class="text-sm text-slate-500 mb-1">LinkedIn</div>
                  <div class="text-white font-medium group-hover:text-blue-400 transition-colors">Maulana Yusup Abdullah</div>
                </div>
              </a>

              <a href="https://github.com/maulanayusupp" target="_blank" rel="noopener" class="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-indigo-500/40 transition-all group block">
                <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-500/10 flex items-center justify-center group-hover:bg-slate-500/20 transition-colors">
                  <svg class="w-6 h-6 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </div>
                <div>
                  <div class="text-sm text-slate-500 mb-1">GitHub</div>
                  <div class="text-white font-medium group-hover:text-slate-300 transition-colors">github.com/maulanayusupp</div>
                </div>
              </a>
            </div>
          </div>

          <!-- Right: Location card -->
          <div class="hidden lg:flex flex-col items-center justify-center animate-fade-in-up opacity-0 delay-400">
            <div class="glass-card rounded-3xl p-12 text-center max-w-md w-full">
              <div class="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Based in Bandung</h3>
              <p class="text-slate-400 mb-8">Indonesia</p>

              <div class="w-full h-px bg-slate-800 mb-8" />

              <div class="space-y-4 text-left">
                <div v-for="item in availability" :key="item.text" class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.path" /></svg>
                  <span class="text-slate-300 text-sm">{{ item.text }}</span>
                </div>
              </div>

              <div class="mt-10">
                <a href="mailto:maulanayusupp@gmail.com" class="inline-block w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 text-center">
                  Send an Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Contact page hero gradient (overrides the global default). */
.contact-hero {
  background: radial-gradient(ellipse at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}
</style>
