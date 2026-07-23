<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; message?: string } }>()
const { t } = useLocale()

const code = computed(() => props.error?.statusCode ?? 404)

useHead({ title: `${code.value} — ${t('error.title')}` })
</script>

<template>
  <div class="errpage">
    <div class="errpage__orb errpage__orb--1" />
    <div class="errpage__orb errpage__orb--2" />

    <div class="errpage__inner">
      <NuxtLink to="/" class="errpage__logo" aria-label="Home">M</NuxtLink>
      <p class="errpage__code">{{ code }}</p>
      <h1 class="errpage__title">{{ t('error.title') }}</h1>
      <p class="errpage__msg">{{ t('error.message') }}</p>
      <div class="errpage__actions">
        <BaseButton to="/" variant="primary" size="lg">{{ t('error.home') }}</BaseButton>
        <BaseButton to="/projects" variant="secondary" size="lg">{{ t('error.portfolio') }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.errpage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: $space-8 $space-4;
  overflow: hidden;
  background: $color-bg;

  &__orb {
    position: absolute;
    border-radius: $radius-full;
    filter: blur(90px);
    pointer-events: none;

    &--1 {
      top: -6rem;
      right: -4rem;
      width: 24rem;
      height: 24rem;
      background: rgba(99, 102, 241, 0.18);
    }
    &--2 {
      bottom: -8rem;
      left: -6rem;
      width: 26rem;
      height: 26rem;
      background: rgba(217, 70, 239, 0.14);
    }
  }

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 34rem;
  }

  &__logo {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    margin-bottom: $space-8;
    font-family: $font-display;
    font-weight: 700;
    color: $color-on-accent;
    background: $gradient-brand-vivid;
    border-radius: $radius-md;
  }

  &__code {
    font-family: $font-display;
    font-weight: 800;
    font-size: 5rem;
    line-height: 1;
    @include gradient-text($gradient-brand);

    @include respond-to('md') {
      font-size: 7rem;
    }
  }

  &__title {
    margin-top: $space-4;
    font-size: $fs-2xl;

    @include respond-to('md') {
      font-size: $fs-3xl;
    }
  }

  &__msg {
    margin-top: $space-3;
    color: $color-text-muted;
    font-size: $fs-lg;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-4;
    margin-top: $space-8;
  }
}
</style>
