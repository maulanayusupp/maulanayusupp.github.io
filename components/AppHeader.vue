<script setup lang="ts">
const route = useRoute()
const { open: openSearch } = useCommandPalette()
const { t } = useLocale()
const scrolled = ref(false)
const mobileOpen = ref(false)

// `prefix` links stay active on nested routes (e.g. /projects/:id).
const links = [
  { to: '/', key: 'nav.home' },
  { to: '/projects', key: 'nav.portfolio', prefix: true },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(() => route.path, () => (mobileOpen.value = false))
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="header__inner container">
      <NuxtLink to="/" class="header__logo" aria-label="Home">
        <span class="header__logo-mark">M</span>
        <span class="header__logo-text">Maulana<span class="header__logo-accent">.</span></span>
      </NuxtLink>

      <nav class="header__nav">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="header__link"
          :active-class="link.prefix ? 'is-active' : ''"
          :exact-active-class="link.prefix ? '' : 'is-active'"
        >
          {{ t(link.key) }}
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <button class="header__search" :aria-label="t('actions.search')" @click="openSearch">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke-width="2" />
            <path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3" />
          </svg>
          <span>{{ t('actions.search') }}</span>
          <kbd>⌘K</kbd>
        </button>
        <ThemeToggle />
        <LangSwitch />
        <BaseButton to="/contact" size="md">{{ t('actions.getInTouch') }}</BaseButton>
      </div>

      <button class="header__search-icon" aria-label="Search" @click="openSearch">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke-width="2" />
          <path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3" />
        </svg>
      </button>

      <button
        class="header__burger"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span :class="{ 'is-open': mobileOpen }" />
      </button>
    </div>

    <Transition name="slide">
      <nav v-show="mobileOpen" class="header__mobile">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="header__mobile-link"
          :active-class="link.prefix ? 'is-active' : ''"
          :exact-active-class="link.prefix ? '' : 'is-active'"
        >
          {{ t(link.key) }}
        </NuxtLink>
        <div class="header__mobile-row">
          <ThemeToggle />
          <LangSwitch />
        </div>
        <BaseButton to="/contact" size="md">{{ t('actions.getInTouch') }}</BaseButton>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: $z-header;
  transition: background $transition, border-color $transition, backdrop-filter $transition;
  border-bottom: 1px solid transparent;

  &--scrolled {
    background: color-mix(in srgb, $color-bg 80%, transparent);
    backdrop-filter: blur(16px);
    border-bottom-color: $color-border;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-height;
  }

  &__logo {
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    font-family: $font-display;
    font-weight: 700;
  }

  &__logo-mark {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    font-size: $fs-base;
    color: $color-on-accent;
    background: $gradient-brand-vivid;
    border-radius: $radius-sm;
  }

  &__logo-text {
    color: $color-white;
  }
  &__logo-accent {
    color: $color-indigo-light;
  }

  &__nav {
    display: none;
    align-items: center;
    gap: $space-8;

    @include respond-to('md') {
      display: flex;
    }
  }

  &__link {
    position: relative;
    font-size: $fs-sm;
    font-weight: 500;
    color: $color-text-muted;
    transition: color $transition;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0;
      height: 2px;
      background: $gradient-brand-vivid;
      transition: width $transition;
    }

    &:hover,
    &.is-active {
      color: $color-white;
    }
    &.is-active::after {
      width: 100%;
    }
  }

  &__actions {
    display: none;

    @include respond-to('md') {
      display: flex;
      align-items: center;
      gap: $space-4;
    }
  }

  &__search {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-3;
    font-size: $fs-sm;
    color: $color-text-muted;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    transition: color $transition, border-color $transition;

    &:hover {
      color: $color-text;
      border-color: $color-border-strong;
    }

    svg { width: 1rem; height: 1rem; }

    kbd {
      padding: 1px 5px;
      font-size: $fs-xs;
      color: $color-text-faint;
      border: 1px solid $color-border;
      border-radius: $radius-sm;
    }
  }

  &__search-icon {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    color: $color-text-muted;
    transition: color $transition;
    &:hover { color: $color-white; }
    svg { width: 1.35rem; height: 1.35rem; }

    @include respond-to('md') {
      display: none;
    }
  }

  &__burger {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;

    @include respond-to('md') {
      display: none;
    }

    span,
    span::before,
    span::after {
      content: '';
      display: block;
      width: 22px;
      height: 2px;
      background: $color-text;
      border-radius: 2px;
      transition: transform $transition, opacity $transition;
    }
    span {
      position: relative;
      &::before { position: absolute; top: -7px; }
      &::after { position: absolute; top: 7px; }

      &.is-open {
        background: transparent;
        &::before { transform: translateY(7px) rotate(45deg); }
        &::after { transform: translateY(-7px) rotate(-45deg); }
      }
    }
  }

  &__mobile {
    display: flex;
    flex-direction: column;
    gap: $space-4;
    padding: $space-6 $space-5 $space-8;
    background: color-mix(in srgb, $color-bg 96%, transparent);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid $color-border;

    @include respond-to('md') {
      display: none;
    }
  }

  &__mobile-link {
    font-size: $fs-lg;
    font-weight: 500;
    color: $color-text-muted;

    &.is-active {
      color: $color-white;
    }
  }

  &__mobile-row {
    display: flex;
    align-items: center;
    gap: $space-3;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity $transition, transform $transition;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
