<script setup lang="ts">
const { theme } = useTheme()

const container = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const enabled = ref(false)

let disposeFn: (() => void) | null = null
let setColors: (() => void) | null = null

// Brand palette per theme (rgb 0..1). Base is the page background.
function palette(t: string) {
  return t === 'light'
    ? {
        base: [0.965, 0.973, 0.988],
        c1: [0.62, 0.66, 0.98],
        c2: [0.74, 0.62, 0.98],
        c3: [0.93, 0.66, 0.96],
      }
    : {
        base: [0.043, 0.067, 0.125],
        c1: [0.39, 0.4, 0.95],
        c2: [0.545, 0.361, 0.965],
        c3: [0.851, 0.275, 0.937],
      }
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec3 uBase;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;

  // Ashima simplex noise 2D
  vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= uRes.x / uRes.y; // aspect-correct
    float t = uTime * 0.04;

    // domain-warped noise fields
    float n1 = snoise(p * 1.4 + vec2(t, -t * 0.6));
    float n2 = snoise(p * 1.9 + vec2(-t * 0.7, t * 0.5) + n1 * 0.6);
    float n3 = snoise(p * 1.1 + vec2(t * 0.3, t * 0.8) + n2 * 0.4);

    vec3 col = uBase;
    col = mix(col, uC1, smoothstep(0.15, 0.95, n1 * 0.5 + 0.5) * 0.55);
    col = mix(col, uC2, smoothstep(0.25, 0.95, n2 * 0.5 + 0.5) * 0.45);
    col = mix(col, uC3, smoothstep(0.35, 1.0,  n3 * 0.5 + 0.5) * 0.40);

    // soft radial fade so it melts into the page
    float d = distance(uv, vec2(0.5));
    col = mix(col, uBase, smoothstep(0.35, 0.95, d));

    gl_FragColor = vec4(col, 1.0);
  }
`

onMounted(async () => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!webglAvailable() || !canvas.value || !container.value) return

  const { Renderer, Program, Mesh, Triangle } = await import('ogl')
  const el = container.value
  const cv = canvas.value

  const renderer = new Renderer({ canvas: cv, alpha: false, dpr: Math.min(window.devicePixelRatio || 1, 2) })
  const gl = renderer.gl

  const pal = palette(theme.value)
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      uRes: { value: [1, 1] },
      uBase: { value: pal.base },
      uC1: { value: pal.c1 },
      uC2: { value: pal.c2 },
      uC3: { value: pal.c3 },
    },
  })
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

  const resize = () => {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h)
    program.uniforms.uRes.value = [w, h]
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  setColors = () => {
    const p = palette(theme.value)
    program.uniforms.uBase.value = p.base
    program.uniforms.uC1.value = p.c1
    program.uniforms.uC2.value = p.c2
    program.uniforms.uC3.value = p.c3
    if (reduce) renderer.render({ scene: mesh })
  }

  let visible = true
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
  io.observe(el)

  enabled.value = true

  if (reduce) {
    // Static single frame — no animation.
    renderer.render({ scene: mesh })
  } else {
    let raf = 0
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      program.uniforms.uTime.value = time * 0.001
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(loop)
    disposeFn = () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      const ext = gl.getExtension('WEBGL_lose_context')
      ext?.loseContext()
    }
    return
  }

  disposeFn = () => {
    ro.disconnect()
    io.disconnect()
  }
})

watch(theme, () => setColors?.())
onBeforeUnmount(() => disposeFn?.())
</script>

<template>
  <div ref="container" class="gradient" aria-hidden="true">
    <canvas ref="canvas" class="gradient__canvas" :class="{ 'is-on': enabled }" />
  </div>
</template>

<style scoped lang="scss">
@use 'abstracts' as *;

.gradient {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  &__canvas {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.8s ease;

    &.is-on {
      opacity: 1;
    }
  }
}
</style>
