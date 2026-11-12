<template>
  <section class="page-header relative overflow-hidden">
    <div class="absolute inset-0 hex-pattern pointer-events-none opacity-60 page-header__pattern" />
    <ShapeScene v-if="variant" :variant="variant" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div class="tag mb-6 inline-flex animate-slide-up">
        <component :is="icon" class="w-3 h-3 me-1.5" />
        {{ tagText }}
      </div>

      <h1 class="section-title page-header__title mb-4">
        <template v-for="(word, i) in words" :key="`${word}-${i}`"
          ><span class="word"
            ><span class="gradient-text" :style="{ animationDelay: `${0.12 + i * 0.08}s` }">{{
              word
            }}</span></span
          >{{ i < words.length - 1 ? " " : "" }}</template
        >
      </h1>

      <div class="section-divider page-header__divider" />

      <p
        v-if="subtitle"
        class="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto text-lg animate-slide-up"
        style="animation-delay: 0.35s"
      >
        {{ subtitle }}
      </p>
      <slot />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  icon: { type: [Object, Function], required: true },
  tagText: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  /** 3D shape composition: services | blog | contact | quote */
  variant: { type: String, default: "" },
});

const words = computed(() => props.title.split(/\s+/).filter(Boolean));
</script>

<style scoped>
.page-header {
  padding: 5rem 0 4.5rem;
  min-height: 360px;
  display: flex;
  align-items: center;
}

.page-header__pattern {
  -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
  mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
}

.page-header__title {
  font-size: clamp(2.4rem, 6vw, 4.4rem);
  line-height: 1.15;
}

.page-header__divider {
  animation: draw-line 1s var(--ease-out) 0.4s both;
}
</style>
