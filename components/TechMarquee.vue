<script setup lang="ts">
const rowA = [
  'Vue.js', 'Nuxt', 'TypeScript', 'Node.js', 'AdonisJs', 'Laravel', 'PHP', 'Vite', 'SCSS',
]
const rowB = [
  'MySQL', 'MongoDB', 'Redis', 'Socket.io', 'WebGL', 'Three.js', 'REST API', 'Nginx', 'Digital Ocean',
]
</script>

<template>
  <div class="marquee">
    <div class="marquee__row">
      <div class="marquee__track">
        <span v-for="(t, i) in [...rowA, ...rowA]" :key="`a-${i}`" class="marquee__chip">
          {{ t }}
        </span>
      </div>
    </div>
    <div class="marquee__row">
      <div class="marquee__track marquee__track--reverse">
        <span v-for="(t, i) in [...rowB, ...rowB]" :key="`b-${i}`" class="marquee__chip">
          {{ t }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.marquee {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  // Fade edges.
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);

  &__row {
    overflow: hidden;
  }

  &__track {
    display: flex;
    gap: $space-3;
    width: max-content;
    animation: marquee 32s linear infinite;

    &--reverse {
      animation-direction: reverse;
    }
  }

  &:hover .marquee__track {
    animation-play-state: paused;
  }

  &__chip {
    padding: $space-3 $space-5;
    font-family: $font-display;
    font-weight: 600;
    font-size: $fs-sm;
    white-space: nowrap;
    color: $color-text;
    border-radius: $radius-full;
    @include glass;
  }
}
</style>
