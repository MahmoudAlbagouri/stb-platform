<template>
  <footer class="relative mt-20 border-t border-stb-navy/50">
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-stb-dark/30 to-stb-deep/80 pointer-events-none"
    />

    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <img src="/logo.png" alt="STB" class="h-14 w-14 object-contain" />
            <div>
              <div class="text-2xl font-black gradient-text font-syne">STB</div>
              <div
                class="text-xs text-stb-cyan opacity-70 tracking-widest uppercase font-mono"
              >
                Smart Technology & Business
              </div>
            </div>
          </div>
          <p
            class="text-[var(--text-secondary)] leading-relaxed text-sm max-w-sm mb-6"
          >
            {{
              $i18n.locale === "ar"
                ? "نبني حلولاً تكنولوجية متكاملة تحول أعمالك وتحقق رؤيتك الرقمية بأعلى معايير الجودة."
                : "We build integrated technology solutions that transform your business and achieve your digital vision with the highest quality standards."
            }}
          </p>
          <!-- Social Links -->
          <div class="flex gap-3 flex-wrap">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="social-link"
              :title="social.name"
            >
              <component :is="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3
            class="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <span class="w-1 h-4 bg-stb-cyan rounded inline-block" />
            {{ $i18n.locale === "ar" ? "روابط سريعة" : "Quick Links" }}
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.key">
              <NuxtLink
                :to="localePath(link.path)"
                class="text-sm text-[var(--text-secondary)] hover:text-stb-cyan transition-colors duration-200 flex items-center gap-2 group"
              >
                <ChevronRight
                  class="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
                  :class="$i18n.locale === 'ar' ? 'rotate-180' : ''"
                />
                {{ $t(link.key) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3
            class="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"
          >
            <span class="w-1 h-4 bg-stb-cyan rounded inline-block" />
            {{ $i18n.locale === "ar" ? "تواصل معنا" : "Contact" }}
          </h3>
          <ul class="space-y-3">
            <li
              class="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
            >
              <MapPin class="w-4 h-4 text-stb-cyan mt-0.5 flex-shrink-0" />
              <span>{{ $t("contact.address") }}</span>
            </li>
            <li
              class="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
            >
              <Mail class="w-4 h-4 text-stb-cyan flex-shrink-0" />
              <a
                href="mailto:info@stb-tech.com"
                class="hover:text-stb-cyan transition-colors"
                >{{ $t("contact.emailLabel") }}</a
              >
            </li>
            <li
              class="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
            >
              <Phone class="w-4 h-4 text-stb-cyan flex-shrink-0" />
              <a
                href="tel:+201000000000"
                class="hover:text-stb-cyan transition-colors"
                >{{ $t("contact.phoneLabel") }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="border-t border-stb-navy/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-xs text-[var(--text-secondary)]">
          © {{ new Date().getFullYear() }} {{ $t("footer.company") }}.
          {{ $t("footer.rights") }}.
        </p>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span class="text-xs text-green-400">{{
            $i18n.locale === "ar"
              ? "الأنظمة تعمل بشكل طبيعي"
              : "All Systems Operational"
          }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  // تم إضافة الأيقونات الجديدة هنا
  Music2, // TikTok Icon in Lucide
  Ghost, // Snapchat Icon in Lucide
} from "lucide-vue-next";

const localePath = useLocalePath();

const socials = [
  { name: "Facebook", url: "#", icon: Facebook },
  { name: "Twitter/X", url: "#", icon: Twitter },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/stbtech/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/stb.systems?igsh=MW56ZmVzdWxhNHQ5eA%3D%3D&utm_source=qr",
    icon: Instagram,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@STB.systems",
    icon: Youtube,
  },
  // تمت إضافة المنصات الجديدة هنا
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@stb.systems?_r=1&_t=ZS-95jE1XRR6na",
    icon: Music2,
  },
  { name: "Snapchat", url: "https://snapchat.com/t/Cvx39jae", icon: Ghost },
];

const quickLinks = [
  { key: "nav.home", path: "/" },
  { key: "nav.services", path: "/services" },
  { key: "nav.blog", path: "/blog" },
  { key: "nav.contact", path: "/contact" },
  { key: "nav.quote", path: "/quote" },
];
</script>

<style scoped>
/* تأكد من وجود ستايل social-link في ملف CSS العام أو هنا إذا لم يكن موجوداً */
.social-link {
  @apply w-9 h-9 rounded-lg bg-stb-navy/50 border border-stb-navy flex items-center justify-center text-[var(--text-secondary)] hover:bg-stb-cyan hover:text-white hover:border-stb-cyan transition-all duration-300;
}
</style>
