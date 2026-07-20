<script setup lang="ts">
import { getCategory, projects } from '~/services/projects'

const { isOpen, open, close, toggle } = useCommandPalette()

const query = ref('')
const activeIndex = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

interface Item {
  type: 'page' | 'project'
  label: string
  hint: string
  to: string
}

const pages: Item[] = [
  { type: 'page', label: 'Home', hint: 'Page', to: '/' },
  { type: 'page', label: 'Portfolio', hint: 'Page', to: '/projects' },
  { type: 'page', label: 'About', hint: 'Page', to: '/about' },
  { type: 'page', label: 'Contact', hint: 'Page', to: '/contact' },
]

const projectItems: Item[] = projects.map((p) => ({
  type: 'project',
  label: p.title,
  hint: getCategory(p.category)?.label ?? 'Project',
  to: `/projects/${p.id}`,
}))

const q = computed(() => query.value.trim().toLowerCase())

function match(item: Item, extra = '') {
  if (!q.value) return true
  return `${item.label} ${item.hint} ${extra}`.toLowerCase().includes(q.value)
}

const filteredPages = computed(() => pages.filter((i) => match(i)))
const filteredProjects = computed(() =>
  projectItems.filter((i, idx) => match(i, projects[idx].tags.join(' '))),
)
// Flat list drives keyboard navigation (pages first, then projects).
const flat = computed<Item[]>(() => [...filteredPages.value, ...filteredProjects.value])

watch(isOpen, async (v) => {
  if (v) {
    query.value = ''
    activeIndex.value = 0
    document.body.style.overflow = 'hidden'
    await nextTick()
    inputEl.value?.focus()
  } else {
    document.body.style.overflow = ''
  }
})

watch(q, () => (activeIndex.value = 0))

function go(item?: Item) {
  const target = item ?? flat.value[activeIndex.value]
  if (!target) return
  close()
  navigateTo(target.to)
}

function move(delta: number) {
  const n = flat.value.length
  if (!n) return
  activeIndex.value = (activeIndex.value + delta + n) % n
}

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    toggle()
  } else if (e.key === 'Escape' && isOpen.value) {
    close()
  }
}

function onInputKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    move(1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    move(-1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    go()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  document.body.style.overflow = ''
})

// index of an item within the flat list (for highlighting)
function flatIndex(item: Item) {
  return flat.value.indexOf(item)
}
</script>

<template>
  <ClientOnly>
    <Transition name="cmdk">
      <div v-if="isOpen" class="cmdk" @click.self="close">
        <div class="cmdk__panel" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="cmdk__search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke-width="2" />
              <path stroke-linecap="round" stroke-width="2" d="M21 21l-4.3-4.3" />
            </svg>
            <input
              ref="inputEl"
              v-model="query"
              type="text"
              class="cmdk__input"
              placeholder="Search projects and pages…"
              autocomplete="off"
              spellcheck="false"
              @keydown="onInputKeydown"
            />
            <kbd class="cmdk__esc">ESC</kbd>
          </div>

          <div class="cmdk__results">
            <template v-if="flat.length">
              <div v-if="filteredPages.length" class="cmdk__section">
                <p class="cmdk__label">Pages</p>
                <button
                  v-for="item in filteredPages"
                  :key="item.to"
                  class="cmdk__item"
                  :class="{ 'is-active': flatIndex(item) === activeIndex }"
                  @click="go(item)"
                  @mousemove="activeIndex = flatIndex(item)"
                >
                  <span class="cmdk__item-label">{{ item.label }}</span>
                  <span class="cmdk__item-hint">{{ item.hint }}</span>
                </button>
              </div>

              <div v-if="filteredProjects.length" class="cmdk__section">
                <p class="cmdk__label">Projects</p>
                <button
                  v-for="item in filteredProjects"
                  :key="item.to"
                  class="cmdk__item"
                  :class="{ 'is-active': flatIndex(item) === activeIndex }"
                  @click="go(item)"
                  @mousemove="activeIndex = flatIndex(item)"
                >
                  <span class="cmdk__item-label">{{ item.label }}</span>
                  <span class="cmdk__item-hint">{{ item.hint }}</span>
                </button>
              </div>
            </template>

            <p v-else class="cmdk__empty">No results for “{{ query }}”.</p>
          </div>

          <div class="cmdk__footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> open</span>
          </div>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.cmdk {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: $space-16 $space-4 $space-4;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(6px);

  &__panel {
    width: 100%;
    max-width: 36rem;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.98);
    border: 1px solid $color-border-strong;
    border-radius: $radius-xl;
    box-shadow: $shadow-lg;
  }

  &__search {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-4 $space-5;
    border-bottom: 1px solid $color-border;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: $color-text-faint;
      flex-shrink: 0;
    }
  }

  &__input {
    flex: 1;
    font-size: $fs-lg;
    color: $color-text;
    background: none;
    border: none;
    &:focus { outline: none; }
    &::placeholder { color: $color-text-faint; }
  }

  &__esc {
    font-size: $fs-xs;
    color: $color-text-faint;
    padding: 2px $space-2;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
  }

  &__results {
    max-height: 22rem;
    overflow-y: auto;
    padding: $space-3;
  }

  &__section + &__section { margin-top: $space-3; }

  &__label {
    padding: $space-2 $space-3;
    font-size: $fs-xs;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $color-text-faint;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;
    width: 100%;
    padding: $space-3;
    text-align: left;
    border-radius: $radius-md;
    transition: background $transition;

    &.is-active {
      background: $color-surface-2;
    }
  }

  &__item-label { font-weight: 500; color: $color-text; }
  &__item-hint { font-size: $fs-xs; color: $color-text-faint; }

  &__empty {
    padding: $space-8;
    text-align: center;
    color: $color-text-muted;
  }

  &__footer {
    display: flex;
    gap: $space-5;
    padding: $space-3 $space-5;
    border-top: 1px solid $color-border;
    font-size: $fs-xs;
    color: $color-text-faint;

    kbd {
      padding: 1px 5px;
      margin-right: 2px;
      border: 1px solid $color-border;
      border-radius: $radius-sm;
    }
  }
}

.cmdk-enter-active,
.cmdk-leave-active { transition: opacity 0.2s $ease-out; }
.cmdk-enter-from,
.cmdk-leave-to { opacity: 0; }
.cmdk-enter-active .cmdk__panel { transition: transform 0.2s $ease-out; }
.cmdk-enter-from .cmdk__panel { transform: translateY(-8px); }
</style>
