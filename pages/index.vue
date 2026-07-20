<script setup lang="ts">
const title =
  'Maulana Yusup Abdullah - Full Stack Software Engineer | Vue.js, Laravel, Node.js'
const description =
  'Experienced Full Stack Web Developer with 10+ years building scalable web applications. Specializing in Vue.js, Laravel, and Node.js. Based in Bandung, Indonesia. 31+ projects delivered for 13+ clients.'

useHead({
  title,
  meta: [
    { name: 'title', content: title },
    {
      name: 'keywords',
      content:
        'Maulana Yusup Abdullah, full stack developer, software engineer, web developer, Vue.js developer, Laravel developer, Node.js, AdonisJs, freelance developer, Bandung, Indonesia, hire developer',
    },
  ],
  link: [{ rel: 'canonical', href: `${SITE_URL}/` }],
})

useSeoMeta({
  ogType: 'website',
  ogUrl: `${SITE_URL}/`,
  ogTitle: 'Maulana Yusup Abdullah - Full Stack Software Engineer',
  ogDescription:
    'Experienced Full Stack Web Developer with 10+ years building scalable web applications. Specializing in Vue.js, Laravel, and Node.js. 31+ projects delivered.',
  ogImage: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Maulana Yusup Abdullah - Full Stack Software Engineer',
  ogSiteName: 'Maulana Yusup Abdullah',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Maulana Yusup Abdullah - Full Stack Software Engineer',
  twitterDescription:
    'Experienced Full Stack Web Developer with 10+ years building scalable web applications. Specializing in Vue.js, Laravel, and Node.js.',
  twitterImage: OG_IMAGE,
})

useJsonLd([
  personSchema,
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Maulana Yusup Abdullah - Portfolio',
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}/#person` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: 'Maulana Yusup Abdullah - Full Stack Software Engineer',
    description:
      'Portfolio and professional profile of Maulana Yusup Abdullah, a Full Stack Web Developer with 10+ years of experience.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Projects',
    description: 'Portfolio of web development projects by Maulana Yusup Abdullah',
    numberOfItems: 5,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Honda Indonesia', description: 'Enterprise-level web platform built for Honda Indonesia' },
      { '@type': 'ListItem', position: 2, name: 'Pusat Informasi Pasar Aman (BPOM)', description: 'Market safety information system for Indonesian FDA' },
      { '@type': 'ListItem', position: 3, name: 'Scoresheets System', description: 'Dynamic scoring and evaluation system with real-time updates' },
      { '@type': 'ListItem', position: 4, name: 'MyMeet - Meeting System', description: 'Real-time meeting and collaboration system with video conferencing' },
      { '@type': 'ListItem', position: 5, name: 'Dapur Ilmu', description: 'Interactive e-learning platform with progress tracking' },
    ],
  },
])

interface Project {
  img: string
  thumb: string
  category: string
  title: string
  cardText: string
  modalText: string
  wide?: boolean
}

const projects: Project[] = [
  {
    img: '/img/portfolio/honda.jpg',
    thumb: '/img/portfolio/honda_center.jpg',
    category: 'Web Development',
    title: 'Honda Indonesia',
    cardText: 'Enterprise-level web platform built for Honda Indonesia.',
    modalText:
      'Enterprise-level web platform built for Honda Indonesia. Full-stack development with modern technologies.',
    wide: true,
  },
  {
    img: '/img/portfolio/bpom.jpg',
    thumb: '/img/portfolio/bpom_center.jpg',
    category: 'Web Development',
    title: 'Pusat Informasi Pasar Aman',
    cardText: 'Market safety information system for BPOM.',
    modalText:
      'Market safety information system built for BPOM (Indonesian FDA). Comprehensive data management platform.',
  },
  {
    img: '/img/portfolio/scoresheets.jpg',
    thumb: '/img/portfolio/scoresheets_center.jpg',
    category: 'Web Development',
    title: 'Scoresheets System',
    cardText: 'Dynamic scoring and evaluation platform.',
    modalText:
      'Dynamic scoring and evaluation system with real-time updates and comprehensive reporting.',
  },
  {
    img: '/img/portfolio/mymeet.jpg',
    thumb: '/img/portfolio/mymeet_center.jpg',
    category: 'Web Development',
    title: 'MyMeet - Meeting System',
    cardText: 'Real-time meeting and collaboration platform.',
    modalText:
      'Real-time meeting and collaboration system with video conferencing, built with PeerJS and Socket.io.',
  },
  {
    img: '/img/portfolio/dapurilmu.jpg',
    thumb: '/img/portfolio/dapurilmu_center.jpg',
    category: 'Web Development',
    title: 'Dapur Ilmu',
    cardText: 'Interactive e-learning and course platform.',
    modalText:
      'E-learning platform with interactive courses, progress tracking, and a comprehensive learning management system.',
  },
]

const active = ref<Project | null>(null)

function openModal(project: Project) {
  active.value = project
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  active.value = null
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

useScrollReveal('.portfolio-card, .glass-card')

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '31+', label: 'Projects Completed' },
  { value: '13+', label: 'Happy Clients' },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      <div class="absolute top-20 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float delay-200" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-3xl" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="max-w-4xl">
          <div class="animate-fade-in-up opacity-0">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for new projects
            </span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight animate-fade-in-up opacity-0 delay-100">
            I'm a
            <span class="gradient-text"> Software Engineer</span>
            <br>
            <span class="text-slate-400 text-3xl sm:text-4xl md:text-5xl font-light">with 10+ years of experience</span>
          </h1>

          <p class="mt-8 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed animate-fade-in-up opacity-0 delay-200">
            Full Stack Developer specializing in <span class="text-white font-medium">Vue.js</span>, <span class="text-white font-medium">Laravel</span>, and <span class="text-white font-medium">Node.js</span>. Building reliable, scalable solutions from Bandung, Indonesia.
          </p>

          <div class="mt-10 flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-300">
            <NuxtLink to="/contact" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5">
              Let's Work Together
            </NuxtLink>
            <NuxtLink to="/about" class="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-0.5">
              Learn More
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div class="mt-16 flex gap-12 animate-fade-in-up opacity-0 delay-400">
            <template v-for="(stat, i) in stats" :key="stat.label">
              <div v-if="i > 0" class="w-px bg-slate-800" />
              <div>
                <div class="text-3xl sm:text-4xl font-bold text-white">{{ stat.value }}</div>
                <div class="text-sm text-slate-500 mt-1">{{ stat.label }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="py-24 sm:py-32 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Portfolio</h2>
          <p class="text-3xl sm:text-4xl font-bold text-white">Featured Projects</p>
          <p class="mt-4 text-slate-400 max-w-xl mx-auto">A selection of projects I've built for clients ranging from startups to large enterprises.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="project in projects"
            :key="project.title"
            class="portfolio-card group relative rounded-2xl overflow-hidden cursor-pointer"
            :class="project.wide ? 'md:col-span-2 h-[400px]' : 'h-[350px]'"
            @click="openModal(project)"
          >
            <img :src="project.thumb" :alt="project.title" class="w-full h-full object-cover transition-transform duration-700">
            <div class="portfolio-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-0 transition-opacity duration-500 flex items-end p-8">
              <div>
                <span class="text-indigo-400 text-sm font-medium uppercase tracking-wider">{{ project.category }}</span>
                <h3 class="font-bold text-white mt-2" :class="project.wide ? 'text-2xl' : 'text-xl'">{{ project.title }}</h3>
                <p class="text-slate-300 mt-2" :class="project.wide ? 'max-w-lg' : ''">{{ project.cardText }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-24 border-t border-slate-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Tech Stack</h2>
          <p class="text-3xl sm:text-4xl font-bold text-white">Tools & Technologies</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="glass-card rounded-xl p-6 text-center hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div class="text-3xl mb-3">
              <svg class="w-10 h-10 mx-auto text-green-400 group-hover:text-green-300 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21.98c0 .56.45 1.01 1.01 1.01H11V11H1v10.98zM13 23h9.99c.56 0 1.01-.45 1.01-1.01V11H13v12zm10.99-19.98H13V7h11V3.02c0-.56-.44-1-1.01-1zM1 7h10V3H2.01C1.45 3 1 3.45 1 4.01V7z" /></svg>
            </div>
            <span class="text-sm text-slate-300 font-medium">Vue.js</span>
          </div>
          <div class="glass-card rounded-xl p-6 text-center hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div class="text-3xl mb-3">
              <svg class="w-10 h-10 mx-auto text-red-400 group-hover:text-red-300 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
            </div>
            <span class="text-sm text-slate-300 font-medium">Laravel</span>
          </div>
          <div class="glass-card rounded-xl p-6 text-center hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div class="text-3xl mb-3">
              <svg class="w-10 h-10 mx-auto text-purple-400 group-hover:text-purple-300 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span class="text-sm text-slate-300 font-medium">Node.js</span>
          </div>
          <div class="glass-card rounded-xl p-6 text-center hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div class="text-3xl mb-3">
              <svg class="w-10 h-10 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10-4h2v2h-2zm-6 0h4v2h-4zm6 4h2v2h-2z" /></svg>
            </div>
            <span class="text-sm text-slate-300 font-medium">MySQL</span>
          </div>
          <div class="glass-card rounded-xl p-6 text-center hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div class="text-3xl mb-3">
              <svg class="w-10 h-10 mx-auto text-orange-400 group-hover:text-orange-300 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" /></svg>
            </div>
            <span class="text-sm text-slate-300 font-medium">REST API</span>
          </div>
          <div class="glass-card rounded-xl p-6 text-center hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div class="text-3xl mb-3">
              <svg class="w-10 h-10 mx-auto text-cyan-400 group-hover:text-cyan-300 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>
            </div>
            <span class="text-sm text-slate-300 font-medium">DevOps</span>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />

    <!-- Image Modal -->
    <Teleport to="body">
      <div
        v-if="active"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <button class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10" aria-label="Close" @click="closeModal">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div class="max-w-5xl max-h-[90vh] mx-4">
          <img :src="active.img" :alt="active.title" class="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain">
          <div class="mt-4 text-center">
            <h3 class="text-xl font-bold text-white">{{ active.title }}</h3>
            <p class="text-slate-400 mt-1">{{ active.modalText }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
