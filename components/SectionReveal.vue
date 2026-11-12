<template>
  <div v-reveal:[variant]="delay">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  delay: { type: Number, default: 0 },
  /** up | start | end | zoom | fade */
  variant: { type: String, default: "up" },
});
</script>
