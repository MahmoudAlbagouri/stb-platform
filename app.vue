<template>
  <div :class="colorMode.value" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <!-- Particles Background -->
    <div class="particles-bg">
      <div
        v-for="i in 20"
        :key="i"
        class="particle"
        :style="{
          left: `${(i * 5.1) % 100}%`,
          animationDuration: `${8 + (i % 7)}s`,
          animationDelay: `${-i * 0.5}s`,
          width: `${1 + (i % 3)}px`,
          height: `${1 + (i % 3)}px`,
          opacity: 0.3 + (i % 5) * 0.1
        }"
      />
    </div>

    <!-- Grid Background -->
    <div class="fixed inset-0 grid-lines pointer-events-none z-0" />

    <!-- App Content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
</script>
