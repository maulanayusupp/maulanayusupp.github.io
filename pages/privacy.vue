<script setup lang="ts">
const { t, tl } = useLocale()

usePageSeo({
  title: 'Privacy Policy — Maulana Yusup Abdullah',
  description:
    'Privacy policy for maulanayusupp.github.io — a static personal portfolio that does not track visitors.',
  path: '/privacy',
})

useJsonLd([breadcrumbSchema('Privacy', '/privacy')])

const sections = computed(() => tl<{ heading: string; body: string }>('privacy.sections'))
</script>

<template>
  <section class="section--tight">
    <div class="container privacy">
      <p class="privacy__eyebrow">{{ t('privacy.eyebrow') }}</p>
      <h1 class="privacy__title">{{ t('privacy.title') }}</h1>
      <p class="privacy__updated">{{ t('privacy.updated') }}</p>
      <p class="privacy__intro">{{ t('privacy.intro') }}</p>

      <div class="privacy__sections">
        <section v-for="(s, i) in sections" :key="i" class="privacy__block">
          <h2 class="privacy__heading">{{ s.heading }}</h2>
          <p class="privacy__body">{{ s.body }}</p>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.privacy {
  max-width: 46rem;
  padding-top: $space-8;

  &__eyebrow {
    font-size: $fs-sm;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $color-indigo-light;
    margin-bottom: $space-4;
  }

  &__title {
    font-size: $fs-4xl;

    @include respond-to('md') {
      font-size: $fs-5xl;
    }
  }

  &__updated {
    margin-top: $space-3;
    font-size: $fs-sm;
    color: $color-text-faint;
  }

  &__intro {
    margin-top: $space-6;
    font-size: $fs-lg;
    color: $color-text-muted;
  }

  &__sections {
    display: flex;
    flex-direction: column;
    gap: $space-8;
    margin-top: $space-12;
  }

  &__heading {
    font-size: $fs-xl;
    margin-bottom: $space-3;
  }

  &__body {
    color: $color-text-muted;
  }
}
</style>
