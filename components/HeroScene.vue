<template>
  <div class="hero-scene" :class="{ 'is-ready': ready }">
    <!-- Lightweight CSS placeholder shown until WebGL is up (and as a no-WebGL fallback) -->
    <div class="hero-fallback" aria-hidden="true">
      <div class="hero-fallback__ring" />
      <div class="hero-fallback__ring hero-fallback__ring--2" />
      <img
        src="/logo.png"
        alt=""
        width="335"
        height="314"
        fetchpriority="high"
        class="hero-fallback__logo"
      />
    </div>

    <div ref="el" class="hero-scene__canvas" />

    <!-- Floating glass chips -->
    <div class="chip chip--1 glass">
      <span class="chip__dot bg-green-400" />
      <span>{{ locale === "ar" ? "مشروع مكتمل" : "Project Done" }}</span>
    </div>
    <div class="chip chip--2 glass">
      <TrendingUp class="w-3.5 h-3.5 text-stb-cyan" />
      <span dir="ltr">+200%</span>
    </div>
    <div class="chip chip--3 glass">
      <Star class="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
      <span dir="ltr">4.9 / 5</span>
    </div>

    <p class="hero-scene__hint" aria-hidden="true">
      {{ locale === "ar" ? "حرّك الماوس • انقر لنبضة طاقة" : "Move • Click for a pulse" }}
    </p>
  </div>
</template>

<script setup>
import { TrendingUp, Star } from "lucide-vue-next";

const { locale } = useI18n();
const el = ref(null);

const { ready } = useThreeScene(el, async (node, dark) => {
  const { createHeroScene } = await import("~/lib/three/hero");
  return createHeroScene(node, { dark, logoUrl: "/logo.png" });
});
</script>

<style scoped>
.hero-scene {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 620px;
  margin-inline: auto;
  cursor: grab;
}

.hero-scene:active {
  cursor: grabbing;
}

.hero-scene__canvas {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(0.96);
  transition:
    opacity 1.2s ease,
    transform 1.4s var(--ease-out);
}

.is-ready .hero-scene__canvas {
  opacity: 1;
  transform: none;
}

/* ---------- Fallback ---------- */
.hero-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  transition: opacity 0.8s ease;
}

.is-ready .hero-fallback {
  opacity: 0;
  pointer-events: none;
}

.hero-fallback__logo {
  width: 34%;
  height: auto;
  filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.45));
  animation: float 6s ease-in-out infinite;
}

.hero-fallback__ring {
  position: absolute;
  width: 62%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px dashed rgba(0, 212, 255, 0.3);
  animation: rotate-slow 18s linear infinite;
}

.hero-fallback__ring--2 {
  width: 86%;
  animation-duration: 30s;
  animation-direction: reverse;
}

/* ---------- Chips ---------- */
.chip {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  border-radius: 14px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 12px 30px -12px rgba(0, 0, 0, 0.45);
  animation:
    chip-in 0.9s var(--ease-spring) both,
    float 6s ease-in-out infinite;
}

.chip__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
}

.chip--1 {
  top: 10%;
  inset-inline-end: 2%;
  animation-delay: 1.4s, 0s;
}
.chip--2 {
  bottom: 14%;
  inset-inline-end: 0;
  animation-delay: 1.6s, -2s;
}
.chip--3 {
  top: 48%;
  inset-inline-start: -2%;
  animation-delay: 1.8s, -4s;
}

@keyframes chip-in {
  from {
    opacity: 0;
    scale: 0.6;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}

.hero-scene__hint {
  position: absolute;
  bottom: -4px;
  inset-inline: 0;
  text-align: center;
  font-family: "Space Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-secondary);
  opacity: 0;
  transition: opacity 0.8s ease 2s;
}

[dir="rtl"] .hero-scene__hint {
  font-family: inherit;
  font-size: 0.78rem;
  letter-spacing: 0;
}

.is-ready .hero-scene__hint {
  opacity: 0.6;
}

@media (hover: none) {
  .hero-scene__hint {
    display: none;
  }
}

@media (max-width: 1023px) {
  .hero-scene {
    max-width: 420px;
  }
  .chip {
    font-size: 0.7rem;
    padding: 7px 12px;
  }
}
</style>
