<script setup lang="ts">
const { t } = useLocale()
</script>

<template>
  <div class="layout">
    <a href="#main" class="skip-link">{{ t('common.skip') }}</a>
    <AppHeader />
    <main id="main" class="layout__main">
      <slot />
    </main>
    <AppFooter />
    <CommandPalette />
    <CookieConsent />
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__main {
  flex: 1;
  padding-top: $header-height;
}

// Keyboard-only skip link: hidden until focused.
.skip-link {
  position: fixed;
  top: $space-3;
  left: $space-3;
  z-index: $z-modal;
  padding: $space-2 $space-4;
  font-size: $fs-sm;
  font-weight: 600;
  color: $color-on-accent;
  background: $gradient-brand-vivid;
  border-radius: $radius-md;
  transform: translateY(-150%);
  transition: transform $transition;

  &:focus {
    transform: translateY(0);
  }
}
</style>
