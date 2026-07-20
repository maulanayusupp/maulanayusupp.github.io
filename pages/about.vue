<script setup lang="ts">
const title =
  'About Maulana Yusup Abdullah - Skills, Experience & Services | Full Stack Developer'
const description =
  "Learn about Maulana Yusup Abdullah's expertise in Vue.js, Laravel, Node.js, and more. 10+ years of experience, 31+ projects completed. Skilled in SPA development, API integration, server setup, and real-time systems."

useHead({
  title,
  meta: [
    { name: 'title', content: title },
    {
      name: 'keywords',
      content:
        'Maulana Yusup Abdullah, about, skills, experience, Vue.js, Vuex, Vuetify, Laravel, AdonisJs, Node.js, PHP, MySQL, MongoDB, Redis, Socket.io, full stack developer, Bandung developer',
    },
  ],
  link: [{ rel: 'canonical', href: `${SITE_URL}/about` }],
})

useSeoMeta({
  ogType: 'profile',
  ogUrl: `${SITE_URL}/about`,
  ogTitle: 'About Maulana Yusup Abdullah - Skills, Experience & Services',
  ogDescription:
    'Full Stack Web Developer with expertise in Vue.js, Laravel, Node.js. 10+ years experience, 31+ projects, 13+ happy clients.',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Maulana Yusup Abdullah - Full Stack Web Developer',
  ogSiteName: 'Maulana Yusup Abdullah',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About Maulana Yusup Abdullah - Skills & Experience',
  twitterDescription:
    'Full Stack Web Developer with expertise in Vue.js, Laravel, Node.js. 10+ years experience, 31+ projects delivered.',
  twitterImage: OG_IMAGE,
})

useHead({
  meta: [
    { property: 'profile:first_name', content: 'Maulana Yusup' },
    { property: 'profile:last_name', content: 'Abdullah' },
  ],
})

useJsonLd([
  breadcrumbSchema('About', '/about'),
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maulana Yusup Abdullah',
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    jobTitle: 'Full Stack Web Developer',
    worksFor: { '@type': 'Organization', name: 'Freelance' },
    description:
      'Full Stack Web Developer with 10+ years of experience specializing in Vue.js, Laravel, Node.js, and AdonisJs. Based in Bandung, Indonesia.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bandung',
      addressRegion: 'West Java',
      addressCountry: 'ID',
    },
    email: 'maulanayusupp@gmail.com',
    telephone: '+62-878-2276-6333',
    knowsAbout: [
      'JavaScript', 'Vue.js', 'Vuex', 'Vuetify', 'jQuery',
      'PHP', 'Laravel', 'Lumen', 'Laravel Echo Server',
      'Node.js', 'AdonisJs',
      'HTML5', 'CSS3', 'SCSS', 'SASS', 'BEM',
      'MySQL', 'MongoDB', 'Redis',
      'Socket.io', 'PeerJS', 'WebRTC',
      'Apache', 'Nginx', 'Digital Ocean VPS',
      'REST API', 'WhatsApp API',
      'Git', 'SSH', 'Unix/Linux',
    ],
    sameAs: [
      'https://github.com/maulanayusupp',
      'https://www.linkedin.com/in/maulana-yusup-abdullah-750aa47a/',
    ],
  },
])

useScrollReveal('.glass-card')

const traits = [
  'Open for long-term projects and partnerships',
  'Highly responsible — available ASAP when you need me',
  'Git-based workflow & task management for organized collaboration',
  'CSS/SCSS development using BEM/BEVM methodology',
]

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '31+', label: 'Projects Completed' },
  { value: '13+', label: 'Happy Clients' },
  { value: '10+', label: 'Technologies' },
]
</script>

<template>
  <div>
    <!-- About Hero -->
    <section class="relative pt-32 pb-20 hero-gradient about-hero overflow-hidden">
      <div class="absolute top-20 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-10 left-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-float delay-200" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-3 animate-fade-in-up opacity-0">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              About Me
            </span>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Full Stack Web Developer
            </h1>
            <p class="mt-2 text-xl text-indigo-400 font-medium">Vue.js &middot; Laravel &middot; AdonisJs</p>

            <p class="mt-8 text-lg text-slate-300 leading-relaxed">
              Hello! I'm <span class="text-white font-semibold">Maulana Yusup Abdullah</span>, currently living in Bandung, Indonesia. I have more than 10 years of experience in software development and have delivered many projects for individuals and large companies alike.
            </p>

            <!-- Traits -->
            <div class="mt-8 space-y-3">
              <div v-for="trait in traits" :key="trait" class="flex items-start gap-3">
                <span class="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span class="text-slate-300">{{ trait }}</span>
              </div>
            </div>
          </div>

          <!-- Photo -->
          <div class="lg:col-span-2 flex justify-center animate-fade-in-up opacity-0 delay-200">
            <div class="photo-frame rounded-2xl">
              <img src="/img/about.jpg" alt="Maulana Yusup Abdullah" class="rounded-2xl w-full max-w-sm object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 border-t border-slate-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Expertise</h2>
          <p class="text-3xl sm:text-4xl font-bold text-white">Skills & Technologies</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- JavaScript Frameworks -->
          <div class="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-5 group-hover:bg-yellow-500/20 transition-colors">
              <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3">JavaScript Frameworks</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in ['jQuery', 'Vue.js', 'Vuex', 'Vuetify', 'AdonisJs', 'Node.js']" :key="s" class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{{ s }}</span>
            </div>
          </div>

          <!-- Frontend -->
          <div class="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3">Frontend</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in ['HTML5', 'CSS3', 'SCSS', 'SASS', 'BEM/BEVM']" :key="s" class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{{ s }}</span>
            </div>
          </div>

          <!-- Backend -->
          <div class="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-5 group-hover:bg-red-500/20 transition-colors">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3">Backend & Frameworks</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in ['PHP', 'Laravel', 'Lumen', 'Laravel Echo']" :key="s" class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{{ s }}</span>
            </div>
          </div>

          <!-- Database -->
          <div class="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-5 group-hover:bg-green-500/20 transition-colors">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3">Databases</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in ['MySQL', 'MongoDB', 'Redis']" :key="s" class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{{ s }}</span>
            </div>
          </div>

          <!-- DevOps -->
          <div class="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 group-hover:bg-cyan-500/20 transition-colors">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3">DevOps & Server</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in ['VPS Setup', 'Apache', 'Nginx', 'Digital Ocean', 'SSH']" :key="s" class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{{ s }}</span>
            </div>
          </div>

          <!-- Realtime & API -->
          <div class="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group">
            <div class="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-5 group-hover:bg-violet-500/20 transition-colors">
              <svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3">Real-time & APIs</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in ['Socket.io', 'PeerJS', 'REST API', 'WhatsApp API', 'Turn Server']" :key="s" class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="py-24 border-t border-slate-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">What I Do</h2>
          <p class="text-3xl sm:text-4xl font-bold text-white">Services & Experience</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="glass-card rounded-2xl p-8 flex gap-5 hover:border-indigo-500/40 transition-all">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold mb-1">UI to HTML Slicing</h3>
              <p class="text-slate-400 text-sm">Converting mockup/UI designs into pixel-perfect, responsive HTML pages.</p>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-8 flex gap-5 hover:border-indigo-500/40 transition-all">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold mb-1">SPA Development</h3>
              <p class="text-slate-400 text-sm">Building Single Page Applications with Vue.js, optimizing components and Vuex store.</p>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-8 flex gap-5 hover:border-indigo-500/40 transition-all">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold mb-1">API Integration</h3>
              <p class="text-slate-400 text-sm">Integration with 3rd party APIs including WhatsApp API (woo-wa, waboxapp, wanotif).</p>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-8 flex gap-5 hover:border-indigo-500/40 transition-all">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" /></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold mb-1">Server Setup & Deploy</h3>
              <p class="text-slate-400 text-sm">Complete VPS setup on Digital Ocean with Apache/Nginx, Redis, and deployment pipelines.</p>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-8 flex gap-5 hover:border-indigo-500/40 transition-all">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold mb-1">Real-time Systems</h3>
              <p class="text-slate-400 text-sm">Broadcasting with Socket.io, video conferencing with PeerJS and Turn Server setup.</p>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-8 flex gap-5 hover:border-indigo-500/40 transition-all">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold mb-1">Performance Optimization</h3>
              <p class="text-slate-400 text-sm">Redis caching, Vue.js component optimization, and efficient state management.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 border-t border-slate-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card rounded-3xl p-12 sm:p-16">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div v-for="stat in stats" :key="stat.label">
              <div class="text-4xl sm:text-5xl font-bold text-white">{{ stat.value }}</div>
              <div class="text-slate-400 mt-2">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection text="I am eager to provide reliable, consistent, and high-level solutions for you and your business." />
  </div>
</template>

<style scoped>
/* About page uses a two-point hero gradient (overrides the global default). */
.about-hero {
  background: radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}
</style>
