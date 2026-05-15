<template>
  <div ref="el" class="stat-card glass rounded-2xl p-6 text-center card-hover">
    <div class="text-3xl font-black gradient-text font-syne mb-1">
      {{ prefix }}{{ displayValue }}{{ suffix }}
    </div>
    <div class="text-sm text-[var(--text-secondary)]">{{ label }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '+' },
  prefix: { type: String, default: '' },
  label: { type: String, required: true },
  duration: { type: Number, default: 2000 }
})

const el = ref(null)
const displayValue = ref(0)
let animated = false

const animate = () => {
  if (animated) return
  animated = true
  const start = Date.now()
  const tick = () => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(eased * props.value)
    if (progress < 1) requestAnimationFrame(tick)
  }
  tick()
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) animate() },
    { threshold: 0.5 }
  )
  if (el.value) observer.observe(el.value)
  onUnmounted(() => observer.disconnect())
})
</script>
