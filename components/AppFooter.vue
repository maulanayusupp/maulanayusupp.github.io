<script setup lang="ts">
const year = new Date().getFullYear()
const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/cv', label: 'CV / Résumé' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        <NuxtLink to="/" class="footer__logo">
          <span class="footer__logo-mark">M</span>
          Maulana Yusup Abdullah
        </NuxtLink>
        <p class="footer__tagline">
          Full Stack Web Developer — building web apps, tools, and interactive experiences.
        </p>
        <SocialLinks />
      </div>

      <nav class="footer__nav" aria-label="Footer">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="footer__link">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>

    <div class="footer__bar container">
      <span>&copy; {{ year }} Maulana Yusup Abdullah. All rights reserved.</span>
      <span>Based in Bandung, Indonesia</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.footer {
  border-top: 1px solid $color-border;
  padding-top: $space-16;
  margin-top: $space-16;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: $space-8;
    padding-bottom: $space-12;

    @include respond-to('md') {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    max-width: 26rem;
  }

  &__logo {
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    font-family: $font-display;
    font-weight: 700;
    color: $color-white;
  }

  &__logo-mark {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    font-size: $fs-sm;
    color: $color-white;
    background: $gradient-brand-vivid;
    border-radius: $radius-sm;
  }

  &__tagline {
    color: $color-text-muted;
    font-size: $fs-sm;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__link {
    color: $color-text-muted;
    font-size: $fs-sm;
    transition: color $transition;
    &:hover { color: $color-white; }
  }

  &__bar {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding-block: $space-6;
    border-top: 1px solid $color-border;
    color: $color-text-faint;
    font-size: $fs-xs;

    @include respond-to('sm') {
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
