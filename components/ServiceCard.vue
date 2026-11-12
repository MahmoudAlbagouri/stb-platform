<template>
  <div v-tilt class="gradient-border card-3d p-7 group h-full flex flex-col">
    <div class="flex items-start justify-between mb-1">
      <div class="service-icon-wrap">
        <component :is="icon" class="w-7 h-7 text-stb-cyan" />
      </div>
      <span v-if="index" class="service-index font-mono">{{ index }}</span>
    </div>
    <h3 class="text-lg font-bold text-[var(--text-primary)] mb-2">{{ title }}</h3>
    <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{{ description }}</p>
    <div v-if="features && features.length" class="space-y-1.5 mb-4">
      <div
        v-for="f in features"
        :key="f"
        class="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
      >
        <CheckCircle class="w-3 h-3 text-stb-cyan flex-shrink-0" />
        {{ f }}
      </div>
    </div>
    <div class="mt-auto flex items-center gap-1.5 text-stb-cyan text-sm font-semibold">
      <span>{{ learnMore }}</span>
      <ArrowRight
        class="w-4 h-4 transition-transform duration-300"
        :class="rtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'"
      />
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, ArrowRight } from "lucide-vue-next";

defineProps({
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: Array, default: () => [] },
  learnMore: { type: String, default: "Learn More" },
  index: { type: String, default: "" },
  rtl: { type: Boolean, default: false },
});
</script>

<style scoped>
.service-index {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--text-secondary);
  opacity: 0.5;
  transition:
    opacity 0.3s ease,
    color 0.3s ease;
}

.group:hover .service-index {
  opacity: 1;
  color: var(--stb-cyan);
}
</style>
