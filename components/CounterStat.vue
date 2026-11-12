<template>
  <div ref="el" v-tilt="6" class="stat-card glass card-3d rounded-3xl p-6 text-center">
    <div class="stat-card__value font-syne" dir="ltr">
      <span class="gradient-text">{{ prefix }}{{ displayValue }}{{ suffix }}</span>
    </div>
    <div class="text-sm text-[var(--text-secondary)] mt-1">{{ label }}</div>
    <div class="stat-card__bar" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<script setup>
const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: "+" },
  prefix: { type: String, default: "" },
  label: { type: String, required: true },
  duration: { type: Number, default: 2000 },
});

const el = ref(null);
const displayValue = ref(0);
const progress = ref(0);
let observer;
let raf = 0;

const animate = () => {
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / props.duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    displayValue.value = Math.round(eased * props.value);
    progress.value = eased;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    displayValue.value = props.value;
    progress.value = 1;
    return;
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animate();
    },
    { threshold: 0.5 },
  );
  if (el.value) observer.observe(el.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  cancelAnimationFrame(raf);
});
</script>

<style scoped>
.stat-card {
  overflow: hidden;
}

.stat-card__value {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.stat-card__bar {
  position: absolute;
  bottom: 0;
  left: 15%;
  right: 15%;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--stb-cyan), transparent);
  transform-origin: center;
}
</style>
