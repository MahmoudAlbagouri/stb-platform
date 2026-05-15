<template>
  <div class="gradient-border p-6 card-hover cursor-pointer group">
    <div class="service-icon-wrap">
      <component :is="icon" class="w-7 h-7 text-stb-cyan" />
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
    <div class="flex items-center gap-1.5 text-stb-cyan text-sm font-semibold group/link">
      <span>{{ learnMore }}</span>
      <ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, ArrowRight } from 'lucide-vue-next'

defineProps({
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: Array, default: () => [] },
  learnMore: { type: String, default: 'Learn More' }
})
</script>
