<template>
  <div class="min-h-screen relative">
    <!-- Ambient WebGL background (lazy, idle-loaded) -->
    <SceneBackground />

    <div class="relative z-10">
      <AppNavbar />

      <main>
        <slot />
      </main>

      <AppFooter />
    </div>

    <WhatsAppButton />
  </div>
</template>
