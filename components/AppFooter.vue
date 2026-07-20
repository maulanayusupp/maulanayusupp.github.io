<script setup lang="ts">
// Baked in at generate time; CI rebuilds keep it current.
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-800/50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-slate-500 text-sm">
          Copyright &copy; {{ year }} Maulana Yusup Abdullah. All rights reserved.
        </div>
        <SocialLinks />
      </div>
    </div>
  </footer>
</template>
