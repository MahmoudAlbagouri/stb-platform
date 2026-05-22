<template>
  <div>
    <section
      class="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />

      <div
        class="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden"
      >
        <div class="ring-container me-[-10%] opacity-20">
          <div class="ring ring-1-el" />
          <div class="ring ring-2-el" />
          <div class="ring ring-3-el" />
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="hero-content">
            <div
              class="tag mb-6 animate-slide-up"
              style="animation-delay: 0.1s; animation-fill-mode: both"
            >
              <Zap class="w-3 h-3 me-1.5 text-stb-cyan" />
              {{ $t("hero.badge") }}
            </div>

            <h1
              class="section-title mb-4 animate-slide-up"
              style="animation-delay: 0.2s; animation-fill-mode: both"
            >
              {{ $t("hero.title") }}
              <br />
              <span class="gradient-text glow-text">{{
                $t("hero.title2")
              }}</span>
            </h1>

            <p
              class="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg animate-slide-up"
              style="animation-delay: 0.3s; animation-fill-mode: both"
            >
              {{ $t("hero.subtitle") }}
            </p>

            <div
              class="flex flex-wrap gap-4 mb-10 animate-slide-up"
              style="animation-delay: 0.4s; animation-fill-mode: both"
            >
              <NuxtLink
                :to="localePath('/quote')"
                class="btn-primary flex items-center gap-2 text-base"
              >
                <Rocket class="w-5 h-5" />
                {{ $t("hero.cta") }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/services')"
                class="btn-outline flex items-center gap-2 text-base"
              >
                <Play class="w-5 h-5" />
                {{ $t("hero.cta2") }}
              </NuxtLink>
            </div>

            <button
              class="download-btn flex items-center gap-3 text-sm animate-slide-up mb-12"
              style="animation-delay: 0.5s; animation-fill-mode: both"
              @click="downloadStaticProfile"
            >
              <div class="download-icon-wrap">
                <Download class="w-4 h-4 text-stb-cyan" />
              </div>
              <span class="text-[var(--text-secondary)]">{{
                $t("hero.download")
              }}</span>
              <ArrowRight
                class="w-4 h-4 text-stb-cyan"
                :class="$i18n.locale === 'ar' ? 'rotate-180' : ''"
              />
            </button>

            <div
              class="trusted-section animate-slide-up border-t border-white/5 pt-6"
              style="animation-delay: 0.6s; animation-fill-mode: both"
            >
              <p
                class="text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase mb-4 opacity-85"
              >
                {{
                  $i18n.locale === "ar"
                    ? "شريك تكنولوجي موثوق لـ"
                    : "Trusted Technology Partner For"
                }}
              </p>
              <div class="flex items-center gap-6">
                <div
                  class="group relative flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 bg-white shadow-xl animate-infinite-float max-w-[240px]"
                >
                  <div
                    class="absolute inset-0 bg-stb-cyan/5 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                  />

                  <img
                    src="/company.png"
                    alt="Trusted Company"
                    class="h-full w-auto object-contain opacity-100 transition-transform duration-300 group-hover:scale-105 relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="hidden lg:flex items-center justify-center relative animate-fade-in"
            style="animation-delay: 0.6s; animation-fill-mode: both"
          >
            <div class="hero-globe">
              <div class="globe-core animate-pulse-glow">
                <img
                  src="/logo.png"
                  alt="STB"
                  class="w-28 h-28 object-contain"
                />
              </div>
              <div class="orbit-ring orbit-1">
                <div class="orbit-dot" />
              </div>
              <div class="orbit-ring orbit-2">
                <div class="orbit-dot orbit-dot-sm" />
              </div>
              <div class="orbit-ring orbit-3">
                <div class="orbit-dot orbit-dot-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
      >
        <span
          class="text-xs text-[var(--text-secondary)] tracking-widest uppercase"
          >{{ $i18n.locale === "ar" ? "مرر للأسفل" : "Scroll Down" }}</span
        >
        <ChevronDown class="w-5 h-5 text-stb-cyan" />
      </div>
    </section>

    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="stat-card glass rounded-2xl p-6 text-center card-hover reveal"
            :style="`animation-delay:${i * 0.1}s`"
          >
            <div class="text-3xl font-black gradient-text font-syne mb-1">
              {{ stat.value }}
            </div>
            <div class="text-sm text-[var(--text-secondary)]">
              {{ $t(stat.label) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 relative" id="services">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14 reveal">
          <div class="tag mb-4 inline-flex">
            <Layers class="w-3 h-3 me-1.5" />
            {{ $t("services.title") }}
          </div>
          <h2 class="section-title mb-4">
            <span class="gradient-text">{{ $t("services.title") }}</span>
          </h2>
          <div class="section-divider" />
          <p class="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            {{ $t("services.subtitle") }}
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(service, i) in services"
            :key="i"
            class="gradient-border p-6 card-hover cursor-pointer reveal"
            :style="`animation-delay:${i * 0.1}s`"
            @mouseenter="activeService = i"
            @mouseleave="activeService = null"
          >
            <div class="service-icon-wrap">
              <component :is="service.icon" class="w-7 h-7 text-stb-cyan" />
            </div>
            <h3 class="text-lg font-bold text-[var(--text-primary)] mb-2">
              {{ $t(service.titleKey) }}
            </h3>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
              {{ $t(service.descKey) }}
            </p>
            <div
              class="mt-4 flex items-center gap-2 text-stb-cyan text-sm font-semibold group/link cursor-pointer"
            >
              <span>{{
                $i18n.locale === "ar" ? "اعرف المزيد" : "Learn More"
              }}</span>
              <ArrowRight
                class="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                :class="$i18n.locale === 'ar' ? 'rotate-180' : ''"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-stb-blue/5 to-stb-cyan/5 pointer-events-none"
      />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="reveal">
            <div class="tag mb-4 inline-flex">
              <Shield class="w-3 h-3 me-1.5" />
              {{ $i18n.locale === "ar" ? "لماذا نحن؟" : "Why Us?" }}
            </div>
            <h2 class="section-title mb-6">
              {{ $i18n.locale === "ar" ? "شريكك نحو التحول" : "We Are Your" }}
              <br /><span class="gradient-text">{{
                $i18n.locale === "ar" ? "الرقمي" : "Success Partners"
              }}</span>
            </h2>
            <div class="section-divider mb-8" style="margin: 0 0 2rem 0" />
            <div class="space-y-5">
              <div
                v-for="(item, i) in whyUs"
                :key="i"
                class="flex items-start gap-4 reveal"
                :style="`animation-delay:${i * 0.15}s`"
              >
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-stb-blue/20 to-stb-cyan/20 border border-stb-cyan/20 flex items-center justify-center"
                >
                  <component :is="item.icon" class="w-5 h-5 text-stb-cyan" />
                </div>
                <div>
                  <h4 class="font-bold text-[var(--text-primary)] mb-1">
                    {{ item.title[$i18n.locale] }}
                  </h4>
                  <p class="text-sm text-[var(--text-secondary)]">
                    {{ item.desc[$i18n.locale] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="reveal">
            <div class="tech-grid">
              <div
                v-for="(tech, i) in techStack"
                :key="i"
                class="tech-item glass rounded-2xl p-5 card-hover text-center"
                :style="`animation-delay:${i * 0.08}s`"
              >
                <div class="text-3xl mb-2">{{ tech.emoji }}</div>
                <div class="text-xs font-bold text-[var(--text-primary)]">
                  {{ tech.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14 reveal">
          <div class="tag mb-4 inline-flex">
            <BookOpen class="w-3 h-3 me-1.5" />
            {{ $t("blog.title") }}
          </div>
          <h2 class="section-title mb-2">
            <span class="gradient-text">{{ $t("blog.title") }}</span>
          </h2>
          <div class="section-divider" />
          <p class="text-[var(--text-secondary)] mt-4">
            {{ $t("blog.subtitle") }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <article
            v-for="(post, i) in blogPosts"
            :key="i"
            class="gradient-border overflow-hidden card-hover group reveal cursor-pointer"
            :style="`animation-delay:${i * 0.15}s`"
          >
            <div
              class="h-48 relative overflow-hidden bg-gradient-to-br from-stb-navy to-stb-mid flex items-center justify-center"
            >
              <div class="text-6xl opacity-30">{{ post.emoji }}</div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-stb-mid/80 to-transparent"
              />
              <div class="absolute top-3 start-3">
                <span class="tag text-[10px]">{{
                  post.category[$i18n.locale]
                }}</span>
              </div>
            </div>
            <div class="p-6">
              <div
                class="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-3"
              >
                <Calendar class="w-3 h-3" />
                <span>{{ post.date }}</span>
                <span>·</span>
                <Clock class="w-3 h-3" />
                <span>{{ post.readTime[$i18n.locale] }}</span>
              </div>
              <h3
                class="font-bold text-[var(--text-primary)] mb-2 group-hover:text-stb-cyan transition-colors"
              >
                {{ $t(post.titleKey) }}
              </h3>
              <p
                class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4"
              >
                {{ $t(post.excerptKey) }}
              </p>
              <NuxtLink
                :to="localePath('/blog')"
                class="flex items-center gap-2 text-stb-cyan text-sm font-semibold"
              >
                {{ $t("blog.readMore") }}
                <ArrowRight
                  class="w-4 h-4 transition-transform group-hover:translate-x-1"
                  :class="$i18n.locale === 'ar' ? 'rotate-180' : ''"
                />
              </NuxtLink>
            </div>
          </article>
        </div>

        <div class="text-center mt-10 reveal">
          <NuxtLink
            :to="localePath('/blog')"
            class="btn-outline inline-flex items-center gap-2"
          >
            <BookOpen class="w-4 h-4" />
            {{
              $i18n.locale === "ar" ? "عرض جميع المقالات" : "View All Articles"
            }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-20 relative">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <div class="glass rounded-3xl p-12 relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-br from-stb-blue/10 to-stb-cyan/10"
          />
          <div class="relative z-10">
            <div class="text-5xl mb-6">🚀</div>
            <h2 class="section-title mb-4">
              <span class="gradient-text">{{
                $i18n.locale === "ar" ? "جاهز لبدء مشروعك؟" : "Ready to Start?"
              }}</span>
            </h2>
            <p class="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              {{
                $i18n.locale === "ar"
                  ? "تواصل معنا اليوم واحصل على استشارة مجانية وعرض سعر مخصص لمشروعك"
                  : "Contact us today and get a free consultation and customized quote for your project"
              }}
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <NuxtLink
                :to="localePath('/quote')"
                class="btn-primary flex items-center gap-2"
              >
                <FileText class="w-5 h-5" />
                {{ $t("nav.quote") }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/contact')"
                class="btn-outline flex items-center gap-2"
              >
                <Mail class="w-5 h-5" />
                {{ $t("nav.contact") }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  Zap,
  Rocket,
  Play,
  Download,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Layers,
  Shield,
  BookOpen,
  Code2,
  Smartphone,
  Cloud,
  Brain,
  Lock,
  MessageCircle,
  Calendar,
  Clock,
  Mail,
  FileText,
  Target,
  Award,
  Headphones,
  Database,
  Fingerprint,
  GraduationCap,
  Newspaper,
  Truck,
  Users,
  Briefcase,
  Plane,
  Home,
} from "lucide-vue-next";

const localePath = useLocalePath();
const { t } = useI18n();

const activeService = ref(null);

const stats = [
  { value: "200+", label: "stats.projects" },
  { value: "150+", label: "stats.clients" },
  { value: "8+", label: "stats.years" },
  { value: "15+", label: "stats.countries" },
];

const services = [
  { icon: Code2, titleKey: "services.web.title", descKey: "services.web.desc" },
  {
    icon: Smartphone,
    titleKey: "services.mobile.title",
    descKey: "services.mobile.desc",
  },
  {
    icon: Database,
    titleKey: "services.erp.title",
    descKey: "services.erp.desc",
  },
  {
    icon: Fingerprint,
    titleKey: "services.hr_biometric.title",
    descKey: "services.hr_biometric.desc",
  },
  {
    icon: GraduationCap,
    titleKey: "services.education.title",
    descKey: "services.education.desc",
  },
  {
    icon: Newspaper,
    titleKey: "services.news.title",
    descKey: "services.news.desc",
  },
  {
    icon: Truck,
    titleKey: "services.logistics.title",
    descKey: "services.logistics.desc",
  },
  {
    icon: Users,
    titleKey: "services.social.title",
    descKey: "services.social.desc",
  },
  {
    icon: Briefcase,
    titleKey: "services.b2b.title",
    descKey: "services.b2b.desc",
  },
  {
    icon: Plane,
    titleKey: "services.tourism.title",
    descKey: "services.tourism.desc",
  },
  {
    icon: Home,
    titleKey: "services.real_estate.title",
    descKey: "services.real_estate.desc",
  },
  {
    icon: Cloud,
    titleKey: "services.cloud.title",
    descKey: "services.cloud.desc",
  },
  { icon: Brain, titleKey: "services.ai.title", descKey: "services.ai.desc" },
  {
    icon: Lock,
    titleKey: "services.security.title",
    descKey: "services.security.desc",
  },
  {
    icon: MessageCircle,
    titleKey: "services.consulting.title",
    descKey: "services.consulting.desc",
  },
];

const whyUs = [
  {
    icon: Target,
    title: { ar: "دقة في التنفيذ", en: "Precision Execution" },
    desc: {
      ar: "نلتزم بكل تفاصيل مشروعك لضمان أعلى جودة ممكنة",
      en: "We commit to every detail of your project to ensure the highest possible quality",
    },
  },
  {
    icon: Award,
    title: { ar: "خبرة موثوقة", en: "Proven Expertise" },
    desc: {
      ar: "فريق من المتخصصين بخبرة تتجاوز 8 سنوات في التكنولوجيا",
      en: "A team of specialists with over 8 years of technology expertise",
    },
  },
  {
    icon: Headphones,
    title: { ar: "دعم على مدار الساعة", en: "24/7 Support" },
    desc: {
      ar: "نحن معك في كل خطوة، من الفكرة إلى الإطلاق وما بعده",
      en: "We're with you every step, from idea to launch and beyond",
    },
  },
  {
    icon: TrendingUp,
    title: { ar: "نتائج قابلة للقياس", en: "Measurable Results" },
    desc: {
      ar: "نركز على تحقيق أهداف واضحة وقابلة للقياس تدفع نمو أعمالك",
      en: "We focus on achieving clear, measurable goals that drive your business growth",
    },
  },
];

const techStack = [
  { emoji: "⚡", name: "Nuxt.js" },
  { emoji: "🟢", name: "NestJS" },
  { emoji: "🐋", name: "Docker" },
  { emoji: "☁️", name: "AWS" },
  { emoji: "🤖", name: "AI/ML" },
  { emoji: "📱", name: "Flutter" },
  { emoji: "🔒", name: "Security" },
  { emoji: "📊", name: "Analytics" },
  { emoji: "🔄", name: "DevOps" },
];

const blogPosts = [
  {
    emoji: "🌐",
    category: { ar: "تطوير الويب", en: "Web Dev" },
    date: "2025-01-15",
    readTime: { ar: "5 دقائق", en: "5 min read" },
    titleKey: "blog.post1.title",
    excerptKey: "blog.post1.excerpt",
  },
  {
    emoji: "🤖",
    category: { ar: "ذكاء اصطناعي", en: "AI" },
    date: "2025-01-10",
    readTime: { ar: "7 دقائق", en: "7 min read" },
    titleKey: "blog.post2.title",
    excerptKey: "blog.post2.excerpt",
  },
  {
    emoji: "🔒",
    category: { ar: "أمن المعلومات", en: "Security" },
    date: "2025-01-05",
    readTime: { ar: "6 دقائق", en: "6 min read" },
    titleKey: "blog.post3.title",
    excerptKey: "blog.post3.excerpt",
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

const downloadStaticProfile = () => {
  const fileName = "STB-Profile.pdf";
  const link = document.createElement("a");
  link.href = `/${fileName}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
/* Permanent Floating Animation for the Company Logo Wrapper */
.animate-infinite-float {
  animation: floatCompany 5s ease-in-out infinite;
}

@keyframes floatCompany {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Hero Globe */
.hero-globe {
  position: relative;
  width: 420px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.globe-core {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(30, 111, 217, 0.4),
    rgba(6, 13, 26, 0.8)
  );
  border: 1px solid rgba(0, 212, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.orbit-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(0, 212, 255, 0.25);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate-slow linear infinite;
}

.orbit-1 {
  width: 240px;
  height: 240px;
  animation-duration: 12s;
}
.orbit-2 {
  width: 320px;
  height: 320px;
  animation-duration: 18s;
  animation-direction: reverse;
}
.orbit-3 {
  width: 400px;
  height: 400px;
  animation-duration: 25s;
}

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

.orbit-dot-sm {
  width: 7px;
  height: 7px;
  top: -3.5px;
}
.orbit-dot-lg {
  width: 14px;
  height: 14px;
  top: -7px;
  background: var(--stb-blue-bright);
  box-shadow: 0 0 20px var(--stb-blue-bright);
}

/* Ring decorations */
.ring-container {
  position: relative;
  width: 600px;
  height: 600px;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(0, 212, 255, 0.06);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ring-1-el {
  width: 300px;
  height: 300px;
}
.ring-2-el {
  width: 450px;
  height: 450px;
}
.ring-3-el {
  width: 600px;
  height: 600px;
}

/* Tech Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.tech-item {
  transition: all 0.3s ease;
}

/* Download button */
.download-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
}

.download-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-btn:hover .download-icon-wrap {
  background: rgba(0, 212, 255, 0.2);
}
</style>
