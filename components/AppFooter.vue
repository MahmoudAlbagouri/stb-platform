<template>
  <footer class="footer relative mt-24 overflow-hidden">
    <div class="footer__line" aria-hidden="true" />
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-stb-dark/30 to-stb-deep/80 pointer-events-none"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div v-reveal class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-5">
            <img
              src="/logo.png"
              alt="STB"
              width="335"
              height="314"
              loading="lazy"
              decoding="async"
              class="h-14 w-14 object-contain"
            />
            <div>
              <div class="text-2xl font-black gradient-text font-syne">STB</div>
              <div class="text-xs text-stb-cyan opacity-70 tracking-widest uppercase font-mono">
                Smart Technology & Business
              </div>
            </div>
          </div>
          <p class="text-[var(--text-secondary)] leading-relaxed text-sm max-w-sm mb-6">
            {{
              $i18n.locale === "ar"
                ? "نبني حلولاً تكنولوجية متكاملة تحول أعمالك وتحقق رؤيتك الرقمية بأعلى معايير الجودة."
                : "We build integrated technology solutions that transform your business and achieve your digital vision with the highest quality standards."
            }}
          </p>
          <div class="flex gap-3 flex-wrap">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :title="social.name"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div v-reveal="0.1">
          <h3 class="footer__heading">
            {{ $i18n.locale === "ar" ? "روابط سريعة" : "Quick Links" }}
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.key">
              <NuxtLink :to="localePath(link.path)" class="footer__link group">
                <ChevronRight
                  class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                  :class="$i18n.locale === 'ar' ? 'rotate-180' : ''"
                />
                {{ $t(link.key) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div v-reveal="0.2">
          <h3 class="footer__heading">
            {{ $i18n.locale === "ar" ? "تواصل معنا" : "Contact" }}
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
              <MapPin class="w-4 h-4 text-stb-cyan mt-0.5 flex-shrink-0" />
              <span>{{ $t("contact.address") }}</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <Mail class="w-4 h-4 text-stb-cyan flex-shrink-0" />
              <a href="mailto:info.stb.systems@gmail.com" class="hover:text-stb-cyan transition-colors">{{
                $t("contact.emailLabel")
              }}</a>
            </li>
            <li class="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <Phone class="w-4 h-4 text-stb-cyan flex-shrink-0" />
              <a href="tel:+966555688143" class="hover:text-stb-cyan transition-colors" dir="ltr">{{
                $t("contact.phoneLabel")
              }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Giant outlined wordmark -->
      <div class="footer__wordmark font-syne text-outline select-none" aria-hidden="true" dir="ltr">
        STB
      </div>

      <!-- Bottom Bar -->
      <div
        class="border-t border-stb-navy/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-xs text-[var(--text-secondary)]">
          © {{ year }} {{ $t("footer.company") }}. {{ $t("footer.rights") }}.
        </p>
        <div class="flex items-center gap-2">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span class="text-xs text-green-400">{{
            $i18n.locale === "ar" ? "الأنظمة تعمل بشكل طبيعي" : "All Systems Operational"
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
  Music2, // TikTok
  Ghost, // Snapchat
} from "lucide-vue-next";

const localePath = useLocalePath();
const year = new Date().getFullYear();

const socials = [
  { name: "Facebook", url: "#", icon: Facebook },
  { name: "Twitter/X", url: "#", icon: Twitter },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/stbtech/", icon: Linkedin },
  {
    name: "Instagram",
    url: "https://www.instagram.com/stb.systems?igsh=MW56ZmVzdWxhNHQ5eA%3D%3D&utm_source=qr",
    icon: Instagram,
  },
  { name: "YouTube", url: "https://www.youtube.com/@STB.systems", icon: Youtube },
  { name: "TikTok", url: "https://www.tiktok.com/@stb.systems?_r=1&_t=ZS-95jE1XRR6na", icon: Music2 },
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
.footer__line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--stb-cyan), var(--stb-blue-bright), transparent);
  opacity: 0.6;
}

.footer__heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.footer__heading::before {
  content: "";
  width: 4px;
  height: 16px;
  border-radius: 4px;
  background: linear-gradient(var(--stb-cyan), var(--stb-blue-bright));
}

.footer__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: var(--stb-cyan);
}

.footer__wordmark {
  font-size: clamp(5rem, 22vw, 17rem);
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: -0.04em;
  text-align: center;
  margin: 1rem 0 2rem;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.12), transparent 85%);
  -webkit-background-clip: text;
  background-clip: text;
  transition: -webkit-text-stroke-color 0.4s ease;
}

.footer__wordmark:hover {
  -webkit-text-stroke-color: rgba(0, 212, 255, 0.9);
}
</style>
