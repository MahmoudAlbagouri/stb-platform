<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[scrolled ? 'nav-scrolled py-2' : 'py-4']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group">
          <div class="logo-container relative">
            <img
              src="/logo.png"
              alt="STB Logo"
              class="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div class="logo-glow" />
          </div>
          <div>
            <div
              class="text-xl font-black tracking-wider gradient-text font-syne"
            >
              STB
            </div>
            <div
              class="text-[16px] text-stb-cyan opacity-70 tracking-widest uppercase font-cairo"
            >
              التقنية الذكية للاعمال
            </div>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="localePath(item.path)"
            class="nav-link px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="isActive(item.path) ? 'nav-link-active' : ''"
          >
            <component
              :is="item.icon"
              class="inline w-4 h-4 me-1.5 opacity-70"
            />
            {{ $t(item.key) }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/quote')"
            class="btn-primary ms-4 text-sm flex items-center gap-2"
          >
            <FileText class="w-4 h-4" />
            {{ $t("nav.quote") }}
          </NuxtLink>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Language -->
          <button
            class="lang-btn flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-300"
            @click="toggleLang"
          >
            <Globe class="w-4 h-4" />
            <span>{{ $i18n.locale === "ar" ? "EN" : "عربي" }}</span>
          </button>

          <!-- Dark/Light Toggle -->
          <button
            class="theme-btn p-2.5 rounded-xl transition-all duration-300"
            @click="toggleColorMode"
          >
            <Sun v-if="colorMode.value === 'dark'" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- Mobile Menu -->
          <button
            class="lg:hidden p-2.5 rounded-xl theme-btn transition-all duration-300"
            @click="mobileOpen = !mobileOpen"
          >
            <Menu v-if="!mobileOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="lg:hidden mt-4 pb-4">
          <div class="glass rounded-2xl p-4 flex flex-col gap-2">
            <NuxtLink
              v-for="item in navItems"
              :key="item.key"
              :to="localePath(item.path)"
              class="nav-link-mobile flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
              @click="mobileOpen = false"
            >
              <component :is="item.icon" class="w-4 h-4 text-stb-cyan" />
              {{ $t(item.key) }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/quote')"
              class="btn-primary text-center text-sm mt-2 flex items-center justify-center gap-2"
              @click="mobileOpen = false"
            >
              <FileText class="w-4 h-4" />
              {{ $t("nav.quote") }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Loading Line at bottom of nav -->
    <div class="loading-line absolute bottom-0 left-0 right-0 opacity-30" />
  </nav>
</template>

<script setup>
import {
  Home,
  Layers,
  BookOpen,
  Mail,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
} from "lucide-vue-next";

const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const colorMode = useColorMode();
const route = useRoute();
const scrolled = ref(false);
const mobileOpen = ref(false);

const navItems = [
  { key: "nav.home", path: "/", icon: Home },
  { key: "nav.services", path: "/services", icon: Layers },
  { key: "nav.blog", path: "/blog", icon: BookOpen },
  { key: "nav.contact", path: "/contact", icon: Mail },
];

const isActive = (path) => {
  if (path === "/") return route.path === "/" || route.path === "/en/";
  return route.path.includes(path);
};

const toggleLang = () => {
  setLocale(locale.value === "ar" ? "en" : "ar");
};

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 50;
  });
});
</script>

<style scoped>
.nav-scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.nav-link {
  color: var(--text-secondary);
  position: relative;
}

.nav-link:hover,
.nav-link-active {
  color: var(--stb-cyan);
  background: rgba(0, 212, 255, 0.08);
}

.nav-link-active::before {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--stb-cyan);
  border-radius: 1px;
}

.nav-link-mobile {
  color: var(--text-secondary);
}

.nav-link-mobile:hover {
  color: var(--stb-cyan);
  background: rgba(0, 212, 255, 0.08);
}

.lang-btn {
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}

.lang-btn:hover {
  color: var(--stb-cyan);
  border-color: var(--stb-cyan);
  background: rgba(0, 212, 255, 0.08);
}

.theme-btn {
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}

.theme-btn:hover {
  color: var(--stb-cyan);
  border-color: var(--stb-cyan);
}

.logo-container {
  position: relative;
}

.logo-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.group:hover .logo-glow {
  opacity: 1;
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
