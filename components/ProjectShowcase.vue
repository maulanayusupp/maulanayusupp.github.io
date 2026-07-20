<script setup lang="ts">
import {
  categories,
  countByCategory,
  projectsByCategory,
  type CategoryId,
  type Project,
} from '~/services/projects'

type Filter = CategoryId | 'all'

const active = ref<Filter>('all')
const filtered = computed(() => projectsByCategory(active.value))

const filters = computed(() => [
  { id: 'all' as Filter, label: 'All', count: projectsByCategory('all').length },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.label, count: countByCategory(c.id) })),
])

// Lightbox for screenshot-only (client) projects.
const lightbox = ref<Project | null>(null)

function openLightbox(project: Project) {
  lightbox.value = project
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightbox.value = null
  document.body.style.overflow = ''
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

const lightboxSrc = computed(() =>
  lightbox.value?.preview.kind === 'image' ? lightbox.value.preview.src : '',
)
</script>

<template>
  <div class="showcase">
    <div class="showcase__filters" role="tablist" aria-label="Project categories">
      <button
        v-for="f in filters"
        :key="f.id"
        class="showcase__filter"
        :class="{ 'is-active': active === f.id }"
        role="tab"
        :aria-selected="active === f.id"
        @click="active = f.id"
      >
        {{ f.label }}
        <span class="showcase__count">{{ f.count }}</span>
      </button>
    </div>

    <TransitionGroup tag="div" name="grid" class="showcase__grid">
      <ProjectCard
        v-for="project in filtered"
        :key="project.id"
        :project="project"
        @open="openLightbox"
      />
    </TransitionGroup>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightbox" class="lightbox" @click.self="closeLightbox">
          <button class="lightbox__close" aria-label="Close" @click="closeLightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <figure class="lightbox__inner">
            <img :src="lightboxSrc" :alt="lightbox.title" class="lightbox__image" />
            <figcaption class="lightbox__caption">
              <h3>{{ lightbox.title }}</h3>
              <p>{{ lightbox.description }}</p>
            </figcaption>
          </figure>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.showcase {
  display: flex;
  flex-direction: column;
  gap: $space-10;

  &__filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-3;
  }

  &__filter {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    font-size: $fs-sm;
    font-weight: 600;
    color: $color-text-muted;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    transition: color $transition, border-color $transition, background $transition;

    &:hover {
      color: $color-white;
      border-color: $color-border-strong;
    }

    &.is-active {
      color: $color-white;
      background: $gradient-brand-vivid;
      border-color: transparent;
    }
  }

  &__count {
    font-size: $fs-xs;
    opacity: 0.7;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-6;

    @include respond-to('md') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('lg') {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

// Grid enter/leave + reflow animation.
.grid-enter-active,
.grid-leave-active {
  transition: opacity 0.4s $ease-out, transform 0.4s $ease-out;
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.grid-leave-active {
  position: absolute;
}
.grid-move {
  transition: transform 0.4s $ease-out;
}

// ---- Lightbox --------------------------------------------------------------
.lightbox {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $space-6;
  background: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(8px);

  &__close {
    position: absolute;
    top: $space-6;
    right: $space-6;
    color: rgba(248, 250, 252, 0.7);
    transition: color $transition;

    &:hover { color: $color-white; }

    svg { width: 2rem; height: 2rem; }
  }

  &__inner {
    max-width: 64rem;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__image {
    max-height: 74vh;
    width: auto;
    margin-inline: auto;
    border-radius: $radius-xl;
    box-shadow: $shadow-lg;
    object-fit: contain;
  }

  &__caption {
    text-align: center;

    h3 { font-size: $fs-xl; }
    p { margin-top: $space-1; color: $color-text-muted; }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s $ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
