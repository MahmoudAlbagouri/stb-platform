<template>
  <header
    class="nav-root"
    :class="{ 'is-scrolled': scrolled, 'is-hidden': hidden }"
  >
    <!-- Reading progress -->
    <div ref="progressBar" class="nav-progress" aria-hidden="true" />

    <nav class="nav-shell" aria-label="Main">
      <div class="flex items-center justify-between gap-3">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group shrink-0">
          <div class="logo-container relative">
            <img
              src="/logo.png"
              alt="STB Logo"
              width="335"
              height="314"
              class="h-11 w-11 object-contain transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
            />
            <div class="logo-glow" />
          </div>
          <div class="leading-tight">
            <div class="text-xl font-black tracking-wider gradient-text font-syne">STB</div>
            <div class="hidden sm:block text-[13px] text-stb-cyan opacity-80 font-cairo">
              التقنية الذكية للاعمال
            </div>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-1 nav-links">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="localePath(item.path)"
            class="nav-link"
            :class="{ 'nav-link-active': isActive(item.path) }"
          >
            <component :is="item.icon" class="w-4 h-4 opacity-70" />
            <span>{{ $t(item.key) }}</span>
          </NuxtLink>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <NuxtLink
            v-magnetic="0.25"
            :to="localePath('/quote')"
            class="btn-primary hidden lg:inline-flex text-sm gap-2 !py-2.5 !px-5"
          >
            <FileText class="w-4 h-4" />
            {{ $t("nav.quote") }}
          </NuxtLink>

          <button
            class="icon-btn px-3 gap-1.5 text-sm font-bold"
            :aria-label="$i18n.locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'"
            @click="toggleLang"
          >
            <Globe class="w-4 h-4" />
            <span>{{ $i18n.locale === "ar" ? "EN" : "عربي" }}</span>
          </button>

          <button
            class="icon-btn w-10"
            :aria-label="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
            @click="toggleColorMode"
          >
            <Transition name="icon-swap" mode="out-in">
              <Sun v-if="colorMode.value === 'dark'" key="sun" class="w-5 h-5" />
              <Moon v-else key="moon" class="w-5 h-5" />
            </Transition>
          </button>

          <button
            class="lg:hidden icon-btn w-10"
            :aria-expanded="mobileOpen"
            aria-label="Menu"
            @click="mobileOpen = !mobileOpen"
          >
            <Transition name="icon-swap" mode="out-in">
              <Menu v-if="!mobileOpen" key="menu" class="w-5 h-5" />
              <X v-else key="x" class="w-5 h-5" />
            </Transition>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="lg:hidden mt-3">
          <div class="mobile-panel">
            <NuxtLink
              v-for="(item, i) in navItems"
              :key="item.key"
              :to="localePath(item.path)"
              class="mobile-link"
              :class="{ 'is-active': isActive(item.path) }"
              :style="{ '--i': i }"
            >
              <span class="mobile-link__index">0{{ i + 1 }}</span>
              <component :is="item.icon" class="w-5 h-5 text-stb-cyan" />
              <span>{{ $t(item.key) }}</span>
            </NuxtLink>
            <NuxtLink
              :to="localePath('/quote')"
              class="btn-primary w-full text-sm mt-2 gap-2 mobile-link-cta"
              :style="{ '--i': navItems.length }"
            >
              <FileText class="w-4 h-4" />
              {{ $t("nav.quote") }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
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
const hidden = ref(false);
const mobileOpen = ref(false);
const progressBar = ref(null);

const navItems = [
  { key: "nav.home", path: "/", icon: Home },
  { key: "nav.services", path: "/services", icon: Layers },
  { key: "nav.blog", path: "/blog", icon: BookOpen },
  { key: "nav.contact", path: "/contact", icon: Mail },
];

const isActive = (path) => {
  const target = localePath(path);
  if (path === "/") return route.path === target || route.path === `${target}/`;
  return route.path.startsWith(target);
};

const toggleLang = () => setLocale(locale.value === "ar" ? "en" : "ar");

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
);

let lastY = 0;
let ticking = false;
const update = () => {
  ticking = false;
  const y = window.scrollY;
  scrolled.value = y > 40;
  hidden.value = y > 360 && y > lastY + 2 && !mobileOpen.value;
  if (y < lastY - 2) hidden.value = false;
  lastY = y;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar.value) {
    progressBar.value.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  }
};
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
};

onMounted(() => {
  lastY = window.scrollY;
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.nav-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 14px 16px 0;
  transition:
    transform 0.5s var(--ease-out),
    padding 0.4s var(--ease-out);
}

.nav-root.is-hidden {
  transform: translateY(-120%);
}

.nav-shell {
  max-width: 80rem;
  margin: 0 auto;
  padding: 10px 16px;
  border-radius: 22px;
  border: 1px solid transparent;
  transition:
    background-color 0.4s ease,
    border-color 0.4s ease,
    box-shadow 0.4s ease,
    max-width 0.6s var(--ease-out),
    padding 0.4s var(--ease-out);
}

.is-scrolled .nav-shell {
  max-width: 72rem;
  padding: 8px 12px 8px 16px;
  background: var(--nav-bg);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border-color: rgba(0, 212, 255, 0.14);
  box-shadow:
    0 20px 50px -20px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.nav-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--stb-blue-bright), var(--stb-cyan));
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.7);
  transform: scaleX(0);
  transform-origin: left center;
  z-index: 60;
  pointer-events: none;
}

[dir="rtl"] .nav-progress {
  transform-origin: right center;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition:
    color 0.25s ease,
    background-color 0.25s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 3px;
  left: 50%;
  width: 18px;
  height: 2px;
  margin-left: -9px;
  border-radius: 2px;
  background: var(--stb-cyan);
  box-shadow: 0 0 8px var(--stb-cyan);
  transform: scaleX(0);
  transition: transform 0.35s var(--ease-out);
}

.nav-link:hover,
.nav-link-active {
  color: var(--stb-cyan);
  background: rgba(0, 212, 255, 0.08);
}

.nav-link-active::after,
.nav-link:hover::after {
  transform: scaleX(1);
}

.icon-btn {
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease,
    transform 0.3s var(--ease-spring);
}

.icon-btn:hover {
  color: var(--stb-cyan);
  border-color: var(--stb-cyan);
  transform: translateY(-2px);
}

.logo-glow {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.35), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.group:hover .logo-glow {
  opacity: 1;
}

/* Mobile */
.mobile-panel {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 20px;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 212, 255, 0.14);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  font-weight: 700;
  color: var(--text-primary);
  transition: background-color 0.25s ease;
  animation: menu-item-in 0.5s var(--ease-out) both;
  animation-delay: calc(var(--i) * 0.05s + 0.05s);
}

.mobile-link-cta {
  animation: menu-item-in 0.5s var(--ease-out) both;
  animation-delay: calc(var(--i) * 0.05s + 0.05s);
}

.mobile-link.is-active,
.mobile-link:hover {
  background: rgba(0, 212, 255, 0.08);
}

.mobile-link__index {
  font-family: "Space Mono", monospace;
  font-size: 0.7rem;
  color: var(--text-secondary);
  opacity: 0.7;
}

@keyframes menu-item-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.4s var(--ease-out);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.3s var(--ease-out);
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>
