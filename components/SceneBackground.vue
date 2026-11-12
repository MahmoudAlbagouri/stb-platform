<template>
  <div class="scene-bg" aria-hidden="true">
    <div class="scene-bg__aurora" />
    <div class="scene-bg__grid grid-lines" />
    <div ref="el" class="scene-bg__canvas" :class="{ 'is-ready': ready }" />
    <div class="scene-bg__vignette" />
  </div>
</template>

<script setup>
const el = ref(null);

const { ready } = useThreeScene(
  el,
  async (node, dark) => {
    const { createBackground } = await import("~/lib/three/background");
    return createBackground(node, { dark });
  },
  { idle: true },
);
</script>

<style scoped>
.scene-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* lvh avoids canvas re-allocation when mobile URL bars show/hide */
  height: 100vh;
  height: 100lvh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.scene-bg__aurora {
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(40% 35% at 85% 10%, rgba(30, 111, 217, 0.22), transparent 70%),
    radial-gradient(35% 30% at 10% 85%, rgba(0, 212, 255, 0.14), transparent 70%),
    radial-gradient(30% 25% at 50% 50%, rgba(33, 150, 243, 0.06), transparent 70%);
}

.light .scene-bg__aurora {
  opacity: 0.6;
}

.scene-bg__grid {
  position: absolute;
  inset: 0;
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 85%);
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 85%);
}

.scene-bg__canvas {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.6s ease;
}

.scene-bg__canvas.is-ready {
  opacity: 1;
}

.scene-bg__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 55%, var(--bg-primary) 120%);
}
</style>
