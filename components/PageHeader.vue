<template>
  <section class="relative py-20 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-stb-blue/5 to-stb-cyan/5 pointer-events-none" />
    <div class="absolute inset-0 hex-pattern pointer-events-none opacity-50" />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div class="tag mb-6 inline-flex animate-slide-up" style="animation-fill-mode:both">
        <component :is="icon" class="w-3 h-3 me-1.5" />
        {{ tagText }}
      </div>
      <h1 class="section-title mb-4 animate-slide-up" style="animation-delay:0.1s;animation-fill-mode:both">
        <span class="gradient-text">{{ title }}</span>
      </h1>
      <div class="section-divider" />
      <p v-if="subtitle" class="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto text-lg animate-slide-up" style="animation-delay:0.2s;animation-fill-mode:both">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  icon: { type: [Object, Function], required: true },
  tagText: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>
