<script setup lang="ts">
import skills from '~/services/data/skills.json'

const { theme } = useTheme()

// The tech shown in the sphere IS the skills data (single source of truth).
const tags = [...new Set(skills.flatMap((g) => g.items))]

const container = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const useFallback = ref(false)

let disposeFn: (() => void) | null = null
let applyTheme: (() => void) | null = null

function themeColors(t: string) {
  return t === 'light'
    ? { text: '#334155', accent: '#4f46e5' }
    : { text: '#cbd5e1', accent: '#818cf8' }
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

onMounted(async () => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce || !webglAvailable() || !canvas.value || !container.value) {
    useFallback.value = true
    return
  }

  const THREE = await import('three')
  const el = container.value
  const cv = canvas.value
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true })
  renderer.setPixelRatio(dpr)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
  camera.position.z = 5

  const group = new THREE.Group()
  scene.add(group)

  const RADIUS = 2.35
  const BASE = 0.52
  const sprites: any[] = []
  const tmp = new THREE.Vector3()

  function label(text: string, color: string) {
    const font = 600
    const size = 46
    const pad = 14
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')!
    ctx.font = `${font} ${size}px Inter, system-ui, sans-serif`
    const w = Math.ceil(ctx.measureText(text).width) + pad * 2
    const h = size + pad * 2
    c.width = w * dpr
    c.height = h * dpr
    ctx.scale(dpr, dpr)
    ctx.font = `${font} ${size}px Inter, system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = color
    ctx.fillText(text, w / 2, h / 2)
    const tex = new THREE.CanvasTexture(c)
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
    tex.colorSpace = THREE.SRGBColorSpace
    return { tex, aspect: w / h }
  }

  // Distribute tags on a sphere (fibonacci).
  const n = tags.length
  const { text, accent } = themeColors(theme.value)
  tags.forEach((tag, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(Math.max(0, 1 - y * y))
    const phi = i * Math.PI * (3 - Math.sqrt(5))
    const { tex, aspect } = label(tag, i % 4 === 0 ? accent : text)
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false })
    const sp = new THREE.Sprite(mat)
    sp.position.set(Math.cos(phi) * rad * RADIUS, y * RADIUS, Math.sin(phi) * rad * RADIUS)
    sp.scale.set(BASE * aspect, BASE, 1)
    sp.userData = { aspect }
    group.add(sp)
    sprites.push(sp)
  })

  applyTheme = () => {
    const c = themeColors(theme.value)
    sprites.forEach((sp, i) => {
      const { tex, aspect } = label(tags[i], i % 4 === 0 ? c.accent : c.text)
      sp.material.map?.dispose()
      sp.material.map = tex
      sp.userData.aspect = aspect
    })
  }

  // Interaction
  let velX = 0
  let velY = 0.0018
  let dragging = false
  let lastX = 0
  let lastY = 0

  const down = (e: PointerEvent) => {
    dragging = true
    lastX = e.clientX
    lastY = e.clientY
    cv.setPointerCapture?.(e.pointerId)
  }
  const move = (e: PointerEvent) => {
    if (!dragging) return
    velY = (e.clientX - lastX) * 0.005
    velX = (e.clientY - lastY) * 0.005
    group.rotation.y += velY
    group.rotation.x += velX
    lastX = e.clientX
    lastY = e.clientY
  }
  const up = () => { dragging = false }
  cv.addEventListener('pointerdown', down)
  cv.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)

  // Resize
  const resize = () => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  // Pause when off-screen
  let visible = true
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
  io.observe(el)

  let raf = 0
  const loop = () => {
    raf = requestAnimationFrame(loop)
    if (!visible || document.hidden) return
    if (!dragging) {
      group.rotation.y += 0.0018 + velY
      group.rotation.x += velX
      velY *= 0.94
      velX *= 0.94
    }
    // depth cue: front tags brighter & bigger
    for (const sp of sprites) {
      sp.getWorldPosition(tmp)
      const d = (tmp.z + RADIUS) / (2 * RADIUS)
      sp.material.opacity = 0.3 + d * 0.7
      const s = 0.85 + d * 0.3
      sp.scale.set(BASE * sp.userData.aspect * s, BASE * s, 1)
    }
    renderer.render(scene, camera)
  }
  loop()

  disposeFn = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    cv.removeEventListener('pointerdown', down)
    cv.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
    sprites.forEach((sp) => {
      sp.material.map?.dispose()
      sp.material.dispose()
    })
    renderer.dispose()
  }
})

watch(theme, () => applyTheme?.())
onBeforeUnmount(() => disposeFn?.())
</script>

<template>
  <div
    ref="container"
    class="sphere"
    role="img"
    aria-label="Interactive 3D cloud of the technologies I work with"
  >
    <canvas v-show="!useFallback" ref="canvas" class="sphere__canvas" />
    <ul v-if="useFallback" class="sphere__fallback" aria-hidden="true">
      <li v-for="tag in tags" :key="tag">{{ tag }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.sphere {
  position: relative;
  width: 100%;
  max-width: 30rem;
  margin-inline: auto;
  aspect-ratio: 1 / 1;

  &__canvas {
    width: 100%;
    height: 100%;
    cursor: grab;
    touch-action: none;

    &:active {
      cursor: grabbing;
    }
  }

  // Fallback (no WebGL / reduced motion): a soft tag cloud.
  &__fallback {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: $space-2;
    width: 100%;
    height: 100%;

    li {
      padding: $space-1 $space-3;
      font-size: $fs-sm;
      color: $color-text-muted;
      background: $color-surface;
      border: 1px solid $color-border;
      border-radius: $radius-full;
    }
  }
}
</style>
