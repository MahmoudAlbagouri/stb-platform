<template>
  <div ref="el" class="shape-scene" :class="{ 'is-ready': ready }" aria-hidden="true" />
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "services",
    validator: (v) => ["services", "blog", "contact", "quote"].includes(v),
  },
});

const { locale } = useI18n();
const el = ref(null);

const { ready } = useThreeScene(el, async (node, dark) => {
  const { createShapeScene } = await import("~/lib/three/shape");
  return createShapeScene(node, {
    dark,
    variant: props.variant,
    rtl: locale.value === "ar",
  });
});
</script>

<style scoped>
.shape-scene {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.shape-scene.is-ready {
  opacity: 1;
}
</style>
