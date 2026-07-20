<script setup lang="ts">
withDefaults(
  defineProps<{ text?: string }>(),
  {
    text: "Have a project in mind? I'd love to help you build something amazing. Let's discuss your ideas.",
  },
)
</script>

<template>
  <section class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="relative glass-card rounded-3xl p-12 sm:p-20 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-violet-600/20" />
        <div class="relative">
          <h2 class="text-3xl sm:text-5xl font-bold text-white mb-6">Let's work together</h2>
          <p class="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            {{ text }}
          </p>
          <NuxtLink
            to="/contact"
            class="inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 text-lg"
          >
            Get in Touch
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
