<script setup lang="ts">
import type { Project } from '~/services/projects'

const props = defineProps<{ project: Project }>()

const monogram = computed(() => props.project.title.charAt(0).toUpperCase())

const hostname = computed(() => {
  if (!props.project.url) return ''
  try {
    return new URL(props.project.url).hostname.replace(/^www\./, '')
  } catch {
    return props.project.url
  }
})

const emoji = computed(() =>
  props.project.preview.kind === 'placeholder' ? props.project.preview.emoji : '',
)
</script>

<template>
  <div class="preview" :class="`preview--${project.category}`">
    <!-- Real screenshot (client work) -->
    <img
      v-if="project.preview.kind === 'image'"
      :src="project.preview.src"
      :alt="`${project.title} screenshot`"
      class="preview__image"
      loading="lazy"
    />

    <!-- Clean branded tile for hosted / non-embeddable projects -->
    <div v-else class="brand">
      <span v-if="project.url" class="brand__badge">
        <span class="brand__badge-dot" /> Live
      </span>

      <div class="brand__tile">
        <span v-if="emoji" class="brand__emoji">{{ emoji }}</span>
        <span v-else>{{ monogram }}</span>
      </div>

      <span class="brand__host">{{ hostname || project.title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.preview {
  --accent: #{$color-indigo-light};
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: $color-bg-elevated;

  &--client { --accent: #{$cat-client}; }
  &--game { --accent: #{$cat-game}; }
  &--education { --accent: #{$cat-education}; }
  &--webapp { --accent: #{$cat-webapp}; }
  &--tools { --accent: #{$cat-tools}; }
}

.preview__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s $ease-out;
}

// ---- Branded tile ----------------------------------------------------------
.brand {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-4;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%),
    linear-gradient(160deg, rgba(148, 163, 184, 0.08), rgba(148, 163, 184, 0.02));

  // subtle dotted texture
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(148, 163, 184, 0.14) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: radial-gradient(80% 80% at 50% 45%, #000, transparent 75%);
    -webkit-mask-image: radial-gradient(80% 80% at 50% 45%, #000, transparent 75%);
  }

  &__badge {
    position: absolute;
    top: $space-4;
    right: $space-4;
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-1 $space-3;
    font-size: $fs-xs;
    font-weight: 600;
    color: $color-on-accent;
    background: rgba(2, 6, 23, 0.55);
    border: 1px solid rgba(248, 250, 252, 0.25);
    border-radius: $radius-full;
    backdrop-filter: blur(6px);
  }

  &__badge-dot {
    width: 7px;
    height: 7px;
    border-radius: $radius-full;
    background: $color-emerald;
    box-shadow: 0 0 8px 0 $color-emerald;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  &__tile {
    position: relative;
    display: grid;
    place-items: center;
    width: 5rem;
    height: 5rem;
    font-family: $font-display;
    font-weight: 700;
    font-size: 2.5rem;
    color: $color-on-accent;
    border-radius: $radius-lg;
    background: linear-gradient(150deg, color-mix(in srgb, var(--accent) 90%, white), var(--accent));
    box-shadow: 0 12px 34px -10px color-mix(in srgb, var(--accent) 70%, transparent);
    transition: transform 0.5s $ease-out;
  }

  &__emoji {
    font-size: 2.75rem;
    line-height: 1;
  }

  &__host {
    position: relative;
    font-size: $fs-sm;
    font-weight: 500;
    color: $color-text-muted;
    letter-spacing: 0.02em;
  }
}
</style>
