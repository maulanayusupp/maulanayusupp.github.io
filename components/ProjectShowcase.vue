<script setup lang="ts">
import {
  categories,
  countByCategory,
  projectsByCategory,
  type CategoryId,
} from '~/services/projects'

type Filter = CategoryId | 'all'

const active = ref<Filter>('all')
const filtered = computed(() => projectsByCategory(active.value))

const filters = computed(() => [
  { id: 'all' as Filter, label: 'All', count: projectsByCategory('all').length },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.label, count: countByCategory(c.id) })),
])
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
      <ProjectCard v-for="project in filtered" :key="project.id" :project="project" />
    </TransitionGroup>
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
</style>
