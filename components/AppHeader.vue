<script setup lang="ts">
const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function isActive(to: string) {
  return route.path === to
}

function onScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

// Close the mobile menu whenever the route changes.
watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>

<template>
  <header
    id="navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50' : ''"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors">
          MYA<span class="text-indigo-500">.</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="nav-link text-sm font-medium transition-colors"
            :class="isActive(link.to) ? 'text-white' : 'text-slate-400 hover:text-white'"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="ml-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Get in touch
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileOpen" class="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
      <div class="px-4 py-6 space-y-4">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block font-medium transition-colors"
          :class="isActive(link.to) ? 'text-white' : 'text-slate-400 hover:text-white'"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="inline-block mt-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all"
        >
          Get in touch
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
