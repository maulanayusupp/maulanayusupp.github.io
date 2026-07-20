<script setup lang="ts">
const { t } = useLocale()
const { decided, accept, reject } = useConsent()
</script>

<template>
  <ClientOnly>
    <Transition name="consent">
      <div v-if="!decided" class="consent" role="dialog" aria-live="polite" aria-label="Cookie notice">
        <p class="consent__text">
          {{ t('consent.message') }}
          <NuxtLink to="/privacy" class="consent__link">{{ t('consent.learnMore') }}</NuxtLink>
        </p>
        <div class="consent__actions">
          <button class="consent__btn consent__btn--ghost" @click="reject">{{ t('consent.reject') }}</button>
          <button class="consent__btn consent__btn--primary" @click="accept">{{ t('consent.accept') }}</button>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.consent {
  position: fixed;
  z-index: $z-overlay;
  left: $space-4;
  right: $space-4;
  bottom: $space-4;
  display: flex;
  flex-direction: column;
  gap: $space-4;
  max-width: 40rem;
  margin-inline: auto;
  padding: $space-5 $space-6;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid $color-border-strong;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;

  @include respond-to('sm') {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: calc(100% - #{$space-8});
  }

  &__text {
    font-size: $fs-sm;
    color: $color-text-muted;
    line-height: 1.5;
  }

  &__link {
    color: $color-indigo-light;
    text-decoration: underline;
    white-space: nowrap;
    &:hover { color: $color-white; }
  }

  &__actions {
    display: flex;
    gap: $space-3;
    flex-shrink: 0;
  }

  &__btn {
    padding: $space-2 $space-4;
    font-size: $fs-sm;
    font-weight: 600;
    border-radius: $radius-md;
    white-space: nowrap;
    transition: background $transition, border-color $transition, color $transition;

    &--ghost {
      color: $color-text-muted;
      border: 1px solid $color-border-strong;
      &:hover { color: $color-white; border-color: $color-text-faint; }
    }

    &--primary {
      color: #fff;
      background: $gradient-brand-vivid;
      &:hover { filter: brightness(1.08); }
    }
  }
}

.consent-enter-active,
.consent-leave-active {
  transition: opacity 0.3s $ease-out, transform 0.3s $ease-out;
}
.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
@include respond-to('sm') {
  .consent-enter-from,
  .consent-leave-to {
    transform: translate(-50%, 12px);
  }
}
</style>
