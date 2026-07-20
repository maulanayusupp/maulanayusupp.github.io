<script setup lang="ts">
const { t } = useLocale()
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="cta reveal">
        <div class="cta__glow" />
        <div class="cta__content">
          <h2 class="cta__title">{{ t('cta.titlePre') }}<br><span class="gradient-text">{{ t('cta.titleHighlight') }}</span></h2>
          <p class="cta__text">{{ t('cta.text') }}</p>
          <div class="cta__actions">
            <BaseButton to="/contact" variant="primary" size="lg">{{ t('cta.primary') }}</BaseButton>
            <BaseButton href="mailto:maulanayusupp@gmail.com" variant="secondary" size="lg">
              {{ t('cta.secondary') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.cta {
  position: relative;
  overflow: hidden;
  padding: $space-16 $space-6;
  text-align: center;
  border-radius: $radius-2xl;
  @include glass;

  @include respond-to('md') {
    padding: $space-24 $space-8;
  }

  &__glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(40rem 20rem at 20% 0%, rgba(99, 102, 241, 0.25), transparent 60%),
      radial-gradient(40rem 20rem at 80% 100%, rgba(217, 70, 239, 0.2), transparent 60%);
    pointer-events: none;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-6;
  }

  &__title {
    font-size: $fs-3xl;

    @include respond-to('md') {
      font-size: $fs-5xl;
    }
  }

  &__text {
    max-width: 34rem;
    color: $color-text-muted;
    font-size: $fs-lg;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-4;
  }
}
</style>
