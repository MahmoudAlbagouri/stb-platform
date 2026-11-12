<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="hero relative flex items-center overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-4 items-center">
          <!-- Copy -->
          <div class="hero-content order-2 lg:order-1">
            <div class="tag mb-7 animate-slide-up" style="animation-delay: 0.05s">
              <span class="relative flex h-2 w-2 me-2">
                <span class="absolute inline-flex h-full w-full rounded-full bg-stb-cyan opacity-70 animate-ping" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-stb-cyan" />
              </span>
              {{ $t("hero.badge") }}
            </div>

            <h1 class="hero-title mb-6">
              <span class="block">
                <template v-for="(word, i) in titleWords" :key="`t1-${i}`"
                  ><span class="word"
                    ><span :style="{ animationDelay: `${0.15 + i * 0.09}s` }">{{ word }}</span></span
                  >{{ " " }}</template
                >
              </span>
              <span class="block">
                <template v-for="(word, i) in title2Words" :key="`t2-${i}`"
                  ><span class="word"
                    ><span :style="{ animationDelay: `${0.35 + i * 0.09}s` }"
                      ><span class="inline-block gradient-text gradient-text-animated">{{
                        word
                      }}</span></span
                    ></span
                  >{{ " " }}</template
                >
              </span>
            </h1>

            <p
              class="text-lg text-[var(--text-secondary)] leading-relaxed mb-9 max-w-lg animate-slide-up"
              style="animation-delay: 0.5s"
            >
              {{ $t("hero.subtitle") }}
            </p>

            <div class="flex flex-wrap gap-4 mb-8 animate-slide-up" style="animation-delay: 0.6s">
              <NuxtLink v-magnetic :to="localePath('/quote')" class="btn-primary gap-2 text-base">
                <Rocket class="w-5 h-5" />
                {{ $t("hero.cta") }}
              </NuxtLink>
              <NuxtLink v-magnetic :to="localePath('/services')" class="btn-outline gap-2 text-base">
                <Play class="w-5 h-5" />
                {{ $t("hero.cta2") }}
              </NuxtLink>
            </div>

            <button
              class="download-btn group animate-slide-up mb-10"
              style="animation-delay: 0.7s"
              @click="downloadStaticProfile"
            >
              <span class="download-icon-wrap">
                <Download class="w-4 h-4 text-stb-cyan transition-transform duration-500 group-hover:translate-y-0.5" />
              </span>
              <span class="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                {{ $t("hero.download") }}
              </span>
              <ArrowRight
                class="w-4 h-4 text-stb-cyan transition-transform duration-300"
                :class="isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'"
              />
            </button>

            <div class="trusted-section animate-slide-up pt-6" style="animation-delay: 0.8s">
              <div class="mb-4">
                <span class="section-eyebrow !text-[var(--text-secondary)]">
                  {{ isAr ? "شريك تكنولوجي موثوق لـ" : "Trusted Technology Partner For" }}
                </span>
              </div>
              <div
                class="trusted-card group relative inline-flex items-center justify-center p-3 rounded-2xl bg-white w-full max-w-[260px]"
              >
                <img
                  src="/company.png"
                  alt="Trusted Company"
                  width="449"
                  height="312"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 relative z-10"
                />
              </div>
            </div>
          </div>

          <!-- 3D scene -->
          <div class="order-1 lg:order-2 relative">
            <HeroScene />
          </div>
        </div>
      </div>

      <div class="scroll-cue hidden md:flex" aria-hidden="true">
        <span class="scroll-cue__mouse"><span class="scroll-cue__wheel" /></span>
        <span class="scroll-cue__label text-[10px] uppercase text-[var(--text-secondary)]">
          {{ isAr ? "مرر للأسفل" : "Scroll" }}
        </span>
      </div>
    </section>

    <!-- ================= TECH MARQUEE ================= -->
    <section class="marquee-band" aria-label="Technologies">
      <div class="marquee" dir="ltr">
        <div class="marquee__track">
          <template v-for="n in 2" :key="n">
            <span
              v-for="(tech, i) in techStack"
              :key="`${n}-${tech.name}`"
              class="marquee__item"
              :class="{ 'text-outline': i % 2 === 1 }"
              :aria-hidden="n === 2"
            >
              {{ tech.name }}
              <Sparkles class="marquee__star" />
            </span>
          </template>
        </div>
      </div>
    </section>

    <!-- ================= STATS ================= -->
    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(stat, i) in stats" :key="stat.label" v-reveal:zoom="i * 0.08">
            <CounterStat :value="stat.value" :label="$t(stat.label)" />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SERVICES ================= -->
    <section id="services" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-reveal class="text-center mb-14">
          <span class="section-eyebrow mb-4">{{ isAr ? "ماذا نقدم" : "What we do" }}</span>
          <h2 class="section-title mt-3 mb-4">
            <span class="gradient-text">{{ $t("services.title") }}</span>
          </h2>
          <div class="section-divider" />
          <p class="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            {{ $t("services.subtitle") }}
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(service, i) in services"
            :key="service.titleKey"
            v-reveal="(i % 3) * 0.08"
            :to="localePath('/services')"
            class="block"
          >
            <ServiceCard
              :icon="service.icon"
              :title="$t(service.titleKey)"
              :description="$t(service.descKey)"
              :index="String(i + 1).padStart(2, '0')"
              :learn-more="isAr ? 'اعرف المزيد' : 'Learn More'"
              :rtl="isAr"
            />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= WHY US ================= -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-stb-blue/5 to-stb-cyan/5 pointer-events-none" />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div v-reveal:start>
              <span class="section-eyebrow">{{ isAr ? "لماذا نحن؟" : "Why Us?" }}</span>
              <h2 class="section-title mt-4 mb-6">
                {{ isAr ? "شريكك نحو التحول" : "We Are Your" }}
                <br />
                <span class="gradient-text">{{ isAr ? "الرقمي" : "Success Partners" }}</span>
              </h2>
              <div class="section-divider !mx-0 mb-10" />
            </div>

            <ol class="why-list">
              <li
                v-for="(item, i) in whyUs"
                :key="i"
                v-reveal:start="0.1 + i * 0.1"
                class="why-item group"
              >
                <div class="why-item__icon">
                  <component :is="item.icon" class="w-5 h-5 text-stb-cyan" />
                </div>
                <div class="flex-1">
                  <div class="flex items-baseline gap-3 mb-1">
                    <span class="font-mono text-xs text-stb-cyan opacity-70">0{{ i + 1 }}</span>
                    <h4 class="font-bold text-[var(--text-primary)]">{{ item.title[$i18n.locale] }}</h4>
                  </div>
                  <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {{ item.desc[$i18n.locale] }}
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div class="tech-grid">
            <div
              v-for="(tech, i) in techStack"
              :key="tech.name"
              v-reveal:zoom="(i % 3) * 0.08 + Math.floor(i / 3) * 0.08"
            >
              <div v-tilt="14" class="tech-item glass card-3d">
                <component :is="tech.icon" class="tech-item__icon" stroke-width="1.5" />
                <div class="text-xs font-bold text-[var(--text-primary)] mt-3">{{ tech.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= BLOG ================= -->
    <section class="py-20 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-reveal class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span class="section-eyebrow">{{ isAr ? "من المدونة" : "From the blog" }}</span>
            <h2 class="section-title mt-3">
              <span class="gradient-text">{{ $t("blog.title") }}</span>
            </h2>
            <p class="text-[var(--text-secondary)] mt-3">{{ $t("blog.subtitle") }}</p>
          </div>
          <NuxtLink v-magnetic="0.2" :to="localePath('/blog')" class="btn-outline gap-2 self-start md:self-auto">
            <BookOpen class="w-4 h-4" />
            {{ isAr ? "عرض جميع المقالات" : "View All Articles" }}
          </NuxtLink>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(post, i) in blogPosts" :key="post.titleKey" v-reveal="i * 0.12">
            <BlogCard
              class="h-full"
              :to="localePath('/blog')"
              :icon="post.icon"
              :accent="post.accent"
              :category="post.category[$i18n.locale]"
              :date="post.date"
              :read-time="post.readTime[$i18n.locale]"
              :title="$t(post.titleKey)"
              :excerpt="$t(post.excerptKey)"
              :read-more-text="$t('blog.readMore')"
              :rtl="isAr"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="py-20 relative">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-reveal:zoom class="conic-frame">
          <div class="cta-card">
            <div class="cta-card__glow" aria-hidden="true" />
            <div class="relative z-10 text-center">
              <div class="cta-card__icon">
                <Rocket class="w-8 h-8 text-white" />
              </div>
              <h2 class="section-title mb-4">
                <span class="gradient-text">{{ isAr ? "جاهز لبدء مشروعك؟" : "Ready to Start?" }}</span>
              </h2>
              <p class="text-[var(--text-secondary)] mb-9 max-w-xl mx-auto">
                {{
                  isAr
                    ? "تواصل معنا اليوم واحصل على استشارة مجانية وعرض سعر مخصص لمشروعك"
                    : "Contact us today and get a free consultation and customized quote for your project"
                }}
              </p>
              <div class="flex flex-wrap justify-center gap-4">
                <NuxtLink v-magnetic :to="localePath('/quote')" class="btn-primary gap-2">
                  <FileText class="w-5 h-5" />
                  {{ $t("nav.quote") }}
                </NuxtLink>
                <NuxtLink v-magnetic :to="localePath('/contact')" class="btn-outline gap-2">
                  <Mail class="w-5 h-5" />
                  {{ $t("nav.contact") }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  Rocket,
  Play,
  Download,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Code2,
  Smartphone,
  Cloud,
  Brain,
  Lock,
  MessageCircle,
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
  Sparkles,
  Zap,
  Server,
  Container,
  ShieldCheck,
  BarChart3,
  GitBranch,
  Globe,
} from "lucide-vue-next";

const localePath = useLocalePath();
const { t, locale } = useI18n();

const isAr = computed(() => locale.value === "ar");
const splitWords = (s) => s.split(/\s+/).filter(Boolean);
const titleWords = computed(() => splitWords(t("hero.title")));
const title2Words = computed(() => splitWords(t("hero.title2")));

const stats = [
  { value: 200, label: "stats.projects" },
  { value: 150, label: "stats.clients" },
  { value: 8, label: "stats.years" },
  { value: 15, label: "stats.countries" },
];

const services = [
  { icon: Code2, titleKey: "services.web.title", descKey: "services.web.desc" },
  { icon: Smartphone, titleKey: "services.mobile.title", descKey: "services.mobile.desc" },
  { icon: Database, titleKey: "services.erp.title", descKey: "services.erp.desc" },
  { icon: Fingerprint, titleKey: "services.hr_biometric.title", descKey: "services.hr_biometric.desc" },
  { icon: GraduationCap, titleKey: "services.education.title", descKey: "services.education.desc" },
  { icon: Newspaper, titleKey: "services.news.title", descKey: "services.news.desc" },
  { icon: Truck, titleKey: "services.logistics.title", descKey: "services.logistics.desc" },
  { icon: Users, titleKey: "services.social.title", descKey: "services.social.desc" },
  { icon: Briefcase, titleKey: "services.b2b.title", descKey: "services.b2b.desc" },
  { icon: Plane, titleKey: "services.tourism.title", descKey: "services.tourism.desc" },
  { icon: Home, titleKey: "services.real_estate.title", descKey: "services.real_estate.desc" },
  { icon: Cloud, titleKey: "services.cloud.title", descKey: "services.cloud.desc" },
  { icon: Brain, titleKey: "services.ai.title", descKey: "services.ai.desc" },
  { icon: Lock, titleKey: "services.security.title", descKey: "services.security.desc" },
  { icon: MessageCircle, titleKey: "services.consulting.title", descKey: "services.consulting.desc" },
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
  { icon: Zap, name: "Nuxt.js" },
  { icon: Server, name: "NestJS" },
  { icon: Container, name: "Docker" },
  { icon: Cloud, name: "AWS" },
  { icon: Brain, name: "AI/ML" },
  { icon: Smartphone, name: "Flutter" },
  { icon: ShieldCheck, name: "Security" },
  { icon: BarChart3, name: "Analytics" },
  { icon: GitBranch, name: "DevOps" },
];

const blogPosts = [
  {
    icon: Globe,
    accent: "#1e6fd9",
    category: { ar: "تطوير الويب", en: "Web Dev" },
    date: "2025-01-15",
    readTime: { ar: "5 دقائق", en: "5 min read" },
    titleKey: "blog.post1.title",
    excerptKey: "blog.post1.excerpt",
  },
  {
    icon: Brain,
    accent: "#7c3aed",
    category: { ar: "ذكاء اصطناعي", en: "AI" },
    date: "2025-01-10",
    readTime: { ar: "7 دقائق", en: "7 min read" },
    titleKey: "blog.post2.title",
    excerptKey: "blog.post2.excerpt",
  },
  {
    icon: ShieldCheck,
    accent: "#0891b2",
    category: { ar: "أمن المعلومات", en: "Security" },
    date: "2025-01-05",
    readTime: { ar: "6 دقائق", en: "6 min read" },
    titleKey: "blog.post3.title",
    excerptKey: "blog.post3.excerpt",
  },
];

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
/* ---------- Hero ---------- */
.hero {
  min-height: 100vh;
  min-height: 100svh;
  padding: 7rem 0 4rem;
}

.hero-title {
  font-size: clamp(2.7rem, 6.4vw, 5.4rem);
  font-weight: 900;
  line-height: 1.12;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

[dir="ltr"] .hero-title {
  font-family: "Syne", "Cairo", sans-serif;
  letter-spacing: -0.03em;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  font-family: inherit;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
}

.download-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.22);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.download-btn:hover .download-icon-wrap {
  background: rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.35);
}

.trusted-section {
  border-top: 1px solid rgba(0, 212, 255, 0.1);
}

.trusted-card {
  box-shadow: 0 20px 40px -18px rgba(0, 212, 255, 0.45);
  animation: float 6s ease-in-out infinite;
}

/* Scroll cue */
.scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: fade-in 1s ease 1.6s both;
}

.scroll-cue__label {
  letter-spacing: 0.3em;
}

[dir="rtl"] .scroll-cue__label {
  letter-spacing: 0;
  font-size: 0.75rem;
}

.scroll-cue__mouse {
  width: 22px;
  height: 34px;
  border-radius: 12px;
  border: 1.5px solid rgba(0, 212, 255, 0.5);
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-cue__wheel {
  width: 3px;
  height: 7px;
  border-radius: 2px;
  background: var(--stb-cyan);
  animation: wheel 1.8s var(--ease-in-out) infinite;
}

@keyframes wheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

/* ---------- Marquee ---------- */
.marquee-band {
  position: relative;
  padding: 1.6rem 0;
  border-block: 1px solid rgba(0, 212, 255, 0.1);
  background: linear-gradient(90deg, rgba(0, 212, 255, 0.03), rgba(30, 111, 217, 0.06), rgba(0, 212, 255, 0.03));
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 2.2rem;
  padding-inline-end: 2.2rem;
  font-family: "Syne", sans-serif;
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 800;
  white-space: nowrap;
  color: var(--text-primary);
  opacity: 0.85;
}

.marquee__star {
  width: 22px;
  height: 22px;
  color: var(--stb-cyan);
  -webkit-text-stroke: 0;
}

/* ---------- Why us ---------- */
.why-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
}

.why-list::before {
  content: "";
  position: absolute;
  top: 20px;
  bottom: 20px;
  inset-inline-start: 21px;
  width: 1px;
  background: linear-gradient(var(--stb-cyan), transparent);
  opacity: 0.35;
}

.why-item {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
}

.why-item__icon {
  position: relative;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--bg-card);
  border: 1px solid rgba(0, 212, 255, 0.25);
  transition:
    transform 0.5s var(--ease-spring),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.why-item:hover .why-item__icon {
  transform: scale(1.1) rotate(-8deg);
  border-color: var(--stb-cyan);
  box-shadow: 0 0 24px rgba(0, 212, 255, 0.35);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border-radius: 22px;
  text-align: center;
}

.tech-item__icon {
  width: 34px;
  height: 34px;
  color: var(--stb-cyan);
  filter: drop-shadow(0 0 12px rgba(0, 212, 255, calc(0.5 * var(--glow-strength))));
  transition: transform 0.6s var(--ease-spring);
}

.tech-item:hover .tech-item__icon {
  transform: translateY(-4px) scale(1.15);
}

/* ---------- CTA ---------- */
.cta-card {
  position: relative;
  overflow: hidden;
  border-radius: 31px;
  padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem);
  background: var(--bg-card);
}

.cta-card__glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 80% at 50% 0%, rgba(0, 212, 255, 0.16), transparent 70%),
    radial-gradient(50% 60% at 100% 100%, rgba(30, 111, 217, 0.18), transparent 70%);
}

.cta-card__icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 1.5rem;
  border-radius: 22px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--stb-blue-bright), var(--stb-cyan));
  box-shadow: 0 20px 40px -12px rgba(0, 212, 255, 0.6);
  animation: float 5s ease-in-out infinite;
}

@media (max-width: 1023px) {
  .hero {
    padding-top: 6rem;
  }
  .hero-content {
    text-align: center;
  }
  .hero-content :deep(.flex) {
    justify-content: center;
  }
  .hero-content .max-w-lg {
    margin-inline: auto;
  }
}
</style>
