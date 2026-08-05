<script setup lang="ts">
const { t } = useLocale()
const { theme } = useTheme()

const container = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)

type State = 'idle' | 'playing' | 'over'
const state = ref<State>('idle')
const score = ref(0)
const best = ref(0)
const lives = ref(3)

interface Item { x: number; y: number; r: number; vy: number; bad: boolean }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; bad: boolean }

let ctx: CanvasRenderingContext2D | null = null
let W = 0
let H = 0
let dpr = 1
let raf = 0
let last = 0
let spawnAcc = 0
let items: Item[] = []
let sparks: Spark[] = []
let px = 0 // player x (center)
let targetX = 0
let pw = 72 // player width
const keys = { left: false, right: false }

function colors() {
  const light = theme.value === 'light'
  return {
    orb: light ? '#6d5cf0' : '#a78bfa',
    orb2: light ? '#c026d3' : '#e879f9',
    bad: '#ef4444',
    player: light ? '#4f46e5' : '#818cf8',
    player2: light ? '#7c3aed' : '#c084fc',
    spark: light ? '#4f46e5' : '#c4b5fd',
  }
}

function resize() {
  const el = container.value
  const cv = canvasEl.value
  if (!el || !cv || !ctx) return
  W = el.clientWidth
  H = el.clientHeight
  if (!W || !H) return
  cv.width = Math.round(W * dpr)
  cv.height = Math.round(H * dpr)
  cv.style.width = `${W}px`
  cv.style.height = `${H}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  pw = Math.max(56, Math.min(96, W * 0.22))
  if (state.value !== 'playing') {
    px = W / 2
    targetX = W / 2
  }
}

function reset() {
  score.value = 0
  lives.value = 3
  items = []
  sparks = []
  spawnAcc = 0
  px = W / 2
  targetX = W / 2
}

function play() {
  reset()
  state.value = 'playing'
  last = performance.now()
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(loop)
}

function gameOver() {
  state.value = 'over'
  cancelAnimationFrame(raf)
  if (score.value > best.value) {
    best.value = score.value
    if (import.meta.client) localStorage.setItem('hero-game-best', String(best.value))
  }
}

function spawn() {
  const r = Math.max(9, Math.min(16, W * 0.032))
  const bad = Math.random() < 0.24
  const speed = 150 + Math.min(260, score.value * 5)
  items.push({ x: r + Math.random() * (W - 2 * r), y: -r, r, vy: speed * (0.85 + Math.random() * 0.4), bad })
}

function burst(x: number, y: number, bad: boolean) {
  for (let i = 0; i < 10; i++) {
    const a = Math.random() * Math.PI * 2
    const s = 40 + Math.random() * 120
    sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, bad })
  }
}

function update(dt: number) {
  // player
  if (keys.left) targetX -= 520 * dt
  if (keys.right) targetX += 520 * dt
  targetX = Math.max(pw / 2, Math.min(W - pw / 2, targetX))
  px += (targetX - px) * Math.min(1, dt * 16)

  // spawn
  spawnAcc += dt * 1000
  const interval = Math.max(420, 900 - score.value * 14)
  if (spawnAcc >= interval) {
    spawnAcc = 0
    spawn()
  }

  const playerY = H - 26
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i]
    it.y += it.vy * dt
    const hitY = it.y + it.r >= playerY - 8 && it.y - it.r <= playerY + 14
    const hitX = Math.abs(it.x - px) < pw / 2 + it.r * 0.7
    if (hitY && hitX) {
      burst(it.x, playerY, it.bad)
      items.splice(i, 1)
      if (it.bad) {
        lives.value -= 1
        if (lives.value <= 0) return gameOver()
      } else {
        score.value += 1
      }
      continue
    }
    if (it.y - it.r > H) items.splice(i, 1)
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i]
    s.x += s.vx * dt
    s.y += s.vy * dt
    s.vy += 300 * dt
    s.life -= dt * 2
    if (s.life <= 0) sparks.splice(i, 1)
  }
}

function draw() {
  if (!ctx) return
  const c = colors()
  ctx.clearRect(0, 0, W, H)

  // items
  for (const it of items) {
    ctx.beginPath()
    ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2)
    if (it.bad) {
      ctx.fillStyle = c.bad
      ctx.shadowColor = c.bad
    } else {
      const g = ctx.createLinearGradient(it.x - it.r, it.y - it.r, it.x + it.r, it.y + it.r)
      g.addColorStop(0, c.orb)
      g.addColorStop(1, c.orb2)
      ctx.fillStyle = g
      ctx.shadowColor = c.orb
    }
    ctx.shadowBlur = 14
    ctx.fill()
    ctx.shadowBlur = 0
  }

  // sparks
  for (const s of sparks) {
    ctx.globalAlpha = Math.max(0, s.life)
    ctx.fillStyle = s.bad ? c.bad : c.spark
    ctx.beginPath()
    ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // player paddle
  const py = H - 22
  const g = ctx.createLinearGradient(px - pw / 2, 0, px + pw / 2, 0)
  g.addColorStop(0, c.player)
  g.addColorStop(1, c.player2)
  ctx.fillStyle = g
  ctx.shadowColor = c.player
  ctx.shadowBlur = 16
  const h = 12
  const x = px - pw / 2
  const rr = h / 2
  ctx.beginPath()
  ctx.moveTo(x + rr, py)
  ctx.arcTo(x + pw, py, x + pw, py + h, rr)
  ctx.arcTo(x + pw, py + h, x, py + h, rr)
  ctx.arcTo(x, py + h, x, py, rr)
  ctx.arcTo(x, py, x + pw, py, rr)
  ctx.fill()
  ctx.shadowBlur = 0
}

function loop(now: number) {
  raf = requestAnimationFrame(loop)
  if (state.value !== 'playing') return
  if (document.hidden) {
    last = now
    return
  }
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  update(dt)
  draw()
}

// input
function pointerMove(e: PointerEvent) {
  const cv = canvasEl.value
  if (!cv) return
  const rect = cv.getBoundingClientRect()
  targetX = e.clientX - rect.left
}
function keyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true
}
function keyUp(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false
}

onMounted(() => {
  const cv = canvasEl.value
  if (!cv) return
  ctx = cv.getContext('2d')
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  best.value = Number(localStorage.getItem('hero-game-best') || 0)
  resize()
  draw()

  const ro = new ResizeObserver(resize)
  if (container.value) ro.observe(container.value)
  cv.addEventListener('pointermove', pointerMove)
  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    cv.removeEventListener('pointermove', pointerMove)
    window.removeEventListener('keydown', keyDown)
    window.removeEventListener('keyup', keyUp)
  })
})

watch(theme, () => {
  if (state.value !== 'playing') draw()
})
</script>

<template>
  <div ref="container" class="game">
    <canvas ref="canvasEl" class="game__canvas" />

    <!-- HUD -->
    <div v-if="state === 'playing'" class="game__hud">
      <span class="game__chip">{{ t('game.score') }} <b>{{ score }}</b></span>
      <span class="game__lives" :aria-label="`lives: ${lives}`">
        <span v-for="i in 3" :key="i" class="game__life" :class="{ 'is-off': i > lives }" />
      </span>
    </div>

    <!-- Idle / Over overlay -->
    <div v-if="state !== 'playing'" class="game__overlay">
      <p class="game__title">{{ state === 'over' ? t('game.over') : t('game.title') }}</p>
      <p v-if="state === 'over'" class="game__result">
        {{ t('game.score') }} <b>{{ score }}</b> · {{ t('game.best') }} <b>{{ best }}</b>
      </p>
      <p v-else class="game__tagline">{{ t('game.tagline') }}</p>
      <button class="game__btn" @click="play">{{ state === 'over' ? t('game.again') : t('game.play') }}</button>
      <p class="game__hint">{{ t('game.hint') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.game {
  position: relative;
  width: 100%;
  max-width: 26rem;
  margin-inline: auto;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: $radius-2xl;
  @include glass;
  background:
    radial-gradient(60% 50% at 50% 0%, rgba(99, 102, 241, 0.14), transparent 70%),
    $color-surface;

  &__canvas {
    width: 100%;
    height: 100%;
    touch-action: none;
    cursor: crosshair;
  }

  &__hud {
    position: absolute;
    top: $space-3;
    left: $space-3;
    right: $space-3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
  }

  &__chip {
    padding: $space-1 $space-3;
    font-size: $fs-xs;
    color: $color-text;
    background: rgba(2, 6, 23, 0.4);
    border: 1px solid $color-border;
    border-radius: $radius-full;
    b { color: $color-white; }
  }

  &__lives {
    display: inline-flex;
    gap: 5px;
  }
  &__life {
    width: 9px;
    height: 9px;
    border-radius: $radius-full;
    background: $color-emerald;
    box-shadow: 0 0 8px 0 $color-emerald;
    &.is-off { background: $color-border-strong; box-shadow: none; }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-3;
    padding: $space-6;
    text-align: center;
    background: rgba(2, 6, 23, 0.35);
    backdrop-filter: blur(2px);
  }

  &__title {
    font-family: $font-display;
    font-weight: 700;
    font-size: $fs-2xl;
    color: $color-white;
  }
  &__tagline,
  &__result {
    color: $color-text-muted;
    font-size: $fs-sm;
    b { color: $color-white; }
  }

  &__btn {
    margin-top: $space-2;
    padding: $space-3 $space-8;
    font-weight: 600;
    color: $color-on-accent;
    background: $gradient-brand-vivid;
    border-radius: $radius-md;
    box-shadow: 0 12px 30px -12px rgba(99, 102, 241, 0.7);
    transition: transform $transition;
    &:hover { transform: translateY(-2px); }
  }

  &__hint {
    font-size: $fs-xs;
    color: $color-text-faint;
  }
}
</style>
