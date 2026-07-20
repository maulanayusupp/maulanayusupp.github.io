<script setup lang="ts">
import type { Project } from '~/services/projects'

const props = defineProps<{ project: Project }>()

// Live previews render the real site at a desktop resolution, then scale it
// down to fit the card — like a live thumbnail.
const BASE_W = 1280

// Only mount the iframe once the card nears the viewport (perf).
const { target, isInView } = useInView({ rootMargin: '300px' })

const viewport = ref<HTMLElement | null>(null)
const scale = ref(0.32)
const loaded = ref(false)
let ro: ResizeObserver | undefined

onMounted(() => {
  if (props.project.preview.kind !== 'live' || !viewport.value) return
  if (!('ResizeObserver' in window)) return
  ro = new ResizeObserver(() => {
    if (viewport.value) scale.value = viewport.value.clientWidth / BASE_W
  })
  ro.observe(viewport.value)
})

onBeforeUnmount(() => ro?.disconnect())

const hostname = computed(() => {
  if (!props.project.url) return ''
  try {
    return new URL(props.project.url).hostname.replace(/^www\./, '')
  } catch {
    return props.project.url
  }
})
</script>

<template>
  <div ref="target" class="preview">
    <!-- Live embeddable site -->
    <div v-if="project.preview.kind === 'live'" class="browser">
      <div class="browser__bar">
        <span class="browser__dot" />
        <span class="browser__dot" />
        <span class="browser__dot" />
        <span class="browser__url">{{ hostname }}</span>
      </div>
      <div ref="viewport" class="browser__viewport">
        <iframe
          v-if="isInView"
          :src="project.url"
          :title="`${project.title} live preview`"
          class="browser__frame"
          :class="{ 'is-loaded': loaded }"
          :style="{ transform: `scale(${scale})` }"
          loading="lazy"
          scrolling="no"
          tabindex="-1"
          aria-hidden="true"
          referrerpolicy="no-referrer"
          @load="loaded = true"
        />
        <div v-if="!loaded" class="browser__skeleton" />
      </div>
    </div>

    <!-- Screenshot -->
    <img
      v-else-if="project.preview.kind === 'image'"
      :src="project.preview.src"
      :alt="`${project.title} screenshot`"
      class="preview__image"
      loading="lazy"
    />

    <!-- Placeholder fallback -->
    <div v-else class="placeholder">
      <span class="placeholder__emoji">{{ project.preview.emoji }}</span>
      <span class="placeholder__label">{{ project.title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.preview {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: $color-bg-elevated;
}

.preview__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s $ease-out;
}

// ---- Live browser mockup ---------------------------------------------------
.browser {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #0a0f1e;

  &__bar {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-3;
    background: rgba(148, 163, 184, 0.08);
    border-bottom: 1px solid $color-border;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    background: $color-border-strong;
  }

  &__url {
    margin-left: $space-2;
    font-size: $fs-xs;
    color: $color-text-faint;
    @include line-clamp(1);
  }

  &__viewport {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  &__frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 1280px;
    height: 800px;
    border: 0;
    transform-origin: top left;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s $ease-out;

    &.is-loaded {
      opacity: 1;
    }
  }

  &__skeleton {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      rgba(148, 163, 184, 0.04) 30%,
      rgba(148, 163, 184, 0.12) 50%,
      rgba(148, 163, 184, 0.04) 70%
    );
    background-size: 220% 100%;
    animation: shimmer 1.4s infinite;
  }
}

@keyframes shimmer {
  from { background-position: 220% 0; }
  to   { background-position: -20% 0; }
}

// ---- Placeholder -----------------------------------------------------------
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-3;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.25), transparent 60%),
    $color-bg-elevated;

  &__emoji {
    font-size: 3.5rem;
    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4));
  }

  &__label {
    font-family: $font-display;
    font-weight: 600;
    color: $color-text-muted;
  }
}
</style>
