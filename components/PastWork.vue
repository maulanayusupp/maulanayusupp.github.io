<script setup lang="ts">
import archive from '~/services/data/archive.json'

const { t, localize } = useLocale()

const FLAGS: Record<string, string> = {
  Norway: '🇳🇴',
  Brazil: '🇧🇷',
  Singapore: '🇸🇬',
  Australia: '🇦🇺',
  'United States': '🇺🇸',
  Indonesia: '🇮🇩',
}
</script>

<template>
  <section class="section section-divider">
    <div class="container">
      <SectionHeading
        :eyebrow="t('pastwork.eyebrow')"
        :title="t('pastwork.title')"
        :subtitle="t('pastwork.subtitle')"
        class="reveal"
      />

      <ul class="pastwork reveal">
        <li v-for="item in archive" :key="item.id" class="pastwork__item">
          <div class="pastwork__head">
            <h3 class="pastwork__title">{{ item.title }}</h3>
            <span class="pastwork__client">
              <span aria-hidden="true">{{ FLAGS[item.client] }}</span> {{ item.client }}
            </span>
          </div>
          <p class="pastwork__summary">{{ localize(item, 'summary') }}</p>
          <div class="pastwork__meta">
            <span class="pastwork__role">{{ item.role }}</span>
            <ul class="pastwork__tech">
              <li v-for="tech in item.stack" :key="tech">{{ tech }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.pastwork {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-4;
  margin-top: $space-12;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: $space-2;
    padding: $space-5;
    border-radius: $radius-lg;
    @include glass;
    transition: border-color $transition, transform $transition;

    &:hover {
      transform: translateY(-3px);
      border-color: $color-border-strong;
    }
  }

  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: $space-3;
  }

  &__title {
    font-size: $fs-lg;
    color: $color-white;
  }

  &__client {
    flex-shrink: 0;
    font-size: $fs-xs;
    color: $color-text-faint;
    white-space: nowrap;
  }

  &__summary {
    color: $color-text-muted;
    font-size: $fs-sm;
  }

  &__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $space-2;
    margin-top: $space-2;
  }

  &__role {
    padding: 2px $space-2;
    font-size: $fs-xs;
    font-weight: 600;
    color: $color-indigo-light;
    background: color-mix(in srgb, $color-indigo 12%, transparent);
    border-radius: $radius-full;
  }

  &__tech {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;

    li {
      padding: 2px $space-2;
      font-size: $fs-xs;
      color: $color-text-faint;
      background: $color-surface-2;
      border: 1px solid $color-border;
      border-radius: $radius-full;
    }
  }
}
</style>
