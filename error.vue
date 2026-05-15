<template>
  <div class="min-h-screen flex items-center justify-center px-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="text-center max-w-lg">
      <!-- Glitch Number -->
      <div class="glitch-404 mb-6" data-text="404">404</div>

      <div class="tag mb-6 inline-flex">
        <AlertTriangle class="w-3 h-3 me-1.5" />
        {{ $i18n.locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found' }}
      </div>

      <h1 class="text-2xl font-black text-[var(--text-primary)] mb-4">
        {{ $i18n.locale === 'ar' ? 'عذراً، لم نجد هذه الصفحة!' : 'Oops! Page not found.' }}
      </h1>

      <p class="text-[var(--text-secondary)] mb-8 leading-relaxed">
        {{ $i18n.locale === 'ar'
          ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تحقق من الرابط أو عد للصفحة الرئيسية.'
          : 'The page you are looking for does not exist or has been moved. Check the URL or return to the homepage.'
        }}
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink :to="localePath('/')" class="btn-primary flex items-center gap-2">
          <Home class="w-4 h-4" />
          {{ $i18n.locale === 'ar' ? 'الصفحة الرئيسية' : 'Go Home' }}
        </NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="btn-outline flex items-center gap-2">
          <Mail class="w-4 h-4" />
          {{ $i18n.locale === 'ar' ? 'تواصل معنا' : 'Contact Us' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle, Home, Mail } from 'lucide-vue-next'
const localePath = useLocalePath()

defineProps({ error: Object })
</script>

<style scoped>
.glitch-404 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--stb-cyan), var(--stb-blue-bright));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  animation: pulse-glow 3s ease-in-out infinite;
}

.glitch-404::before,
.glitch-404::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, var(--stb-cyan), var(--stb-blue-bright));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glitch-404::before {
  animation: glitch1 3s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

.glitch-404::after {
  animation: glitch2 3s infinite;
  clip-path: polygon(0 66%, 100% 66%, 100% 100%, 0 100%);
}

@keyframes glitch1 {
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-3px, 1px); }
  94% { transform: translate(3px, -1px); }
}

@keyframes glitch2 {
  0%, 85%, 100% { transform: translate(0); }
  87% { transform: translate(3px, 2px); }
  89% { transform: translate(-3px, -2px); }
}
</style>
