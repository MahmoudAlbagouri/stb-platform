<template>
  <div class="min-h-screen relative z-10">
    <!-- Navbar -->
    <AppNavbar />

    <!-- Page Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- WhatsApp Floating Button -->
    <WhatsAppButton />
  </div>
</template>
