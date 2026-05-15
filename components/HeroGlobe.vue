<template>
  <div class="hero-globe-wrap">
    <!-- Outer rings -->
    <div class="orbit-ring r1"><div class="orbit-dot" /></div>
    <div class="orbit-ring r2"><div class="orbit-dot sm" /></div>
    <div class="orbit-ring r3"><div class="orbit-dot lg" /></div>

    <!-- Core -->
    <div class="globe-core animate-pulse-glow">
      <img src="/logo.png" alt="STB" class="w-28 h-28 object-contain drop-shadow-xl" />
    </div>

    <!-- Tech Labels floating around -->
    <div class="tech-float tf1 glass">
      <span class="text-green-400">●</span>
      <span class="text-xs font-bold">{{ locale === 'ar' ? 'مشروع مكتمل' : 'Project Done' }}</span>
    </div>
    <div class="tech-float tf2 glass">
      <span class="text-stb-cyan">↑</span>
      <span class="text-xs font-bold">+200%</span>
    </div>
    <div class="tech-float tf3 glass">
      <span class="text-yellow-400">★</span>
      <span class="text-xs font-bold">4.9 / 5</span>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
</script>

<style scoped>
.hero-globe-wrap {
  position: relative;
  width: 420px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.globe-core {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(30,111,217,0.4), rgba(6,13,26,0.9));
  border: 1px solid rgba(0,212,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.orbit-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(0,212,255,0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate-slow linear infinite;
}
.r1 { width: 240px; height: 240px; animation-duration: 12s; }
.r2 { width: 320px; height: 320px; animation-duration: 18s; animation-direction: reverse; }
.r3 { width: 410px; height: 410px; animation-duration: 28s; }

.orbit-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--stb-cyan);
  border-radius: 50%;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 12px var(--stb-cyan);
}
.orbit-dot.sm { width: 7px; height: 7px; top: -3.5px; opacity: 0.6; }
.orbit-dot.lg { width: 13px; height: 13px; top: -6.5px; background: var(--stb-blue-bright); box-shadow: 0 0 20px var(--stb-blue-bright); }

.tech-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 12px;
  color: var(--text-primary);
  animation: float 5s ease-in-out infinite;
  white-space: nowrap;
  z-index: 10;
}
.tf1 { top: 8%; right: 0; animation-delay: 0s; }
.tf2 { bottom: 16%; right: -8px; animation-delay: -1.8s; }
.tf3 { top: 46%; left: -8px; animation-delay: -3.3s; }
</style>
