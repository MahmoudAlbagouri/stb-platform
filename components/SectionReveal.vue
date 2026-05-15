<template>
  <div ref="el" class="reveal" :style="delayStyle">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  delay: { type: Number, default: 0 }
})

const el = ref(null)
const delayStyle = computed(() => props.delay ? `transition-delay: ${props.delay}s` : '')

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) el.value?.classList.add('visible') },
    { threshold: 0.1 }
  )
  if (el.value) observer.observe(el.value)
  onUnmounted(() => observer.disconnect())
})
</script>
