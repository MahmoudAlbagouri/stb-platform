<template>
  <div class="pt-24 pb-20">
    <PageHeader
      :icon="BookOpen"
      :tag-text="$t('blog.title')"
      :title="$t('blog.title')"
      :subtitle="$t('blog.subtitle')"
      variant="blog"
    />

    <!-- Filter Tags -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div v-reveal class="flex justify-center">
        <div class="filter-bar glass">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="filter-btn"
            :class="{ 'is-active': activeCategory === cat.key }"
            :aria-pressed="activeCategory === cat.key"
            @click="activeCategory = cat.key"
          >
            {{ cat.label[$i18n.locale] }}
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Post -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <div v-reveal:zoom>
        <div v-tilt="3" class="gradient-border card-3d overflow-hidden group">
          <div class="grid lg:grid-cols-2">
            <div class="featured-visual">
              <div class="featured-visual__rings" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div class="featured-visual__icon">
                <Rocket class="w-14 h-14 text-white" stroke-width="1.5" />
              </div>
              <div class="absolute top-4 start-4">
                <span class="tag">{{ isAr ? "مقال مميز" : "Featured" }}</span>
              </div>
            </div>
            <div class="p-8 md:p-12 flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-4">
                <span class="tag text-xs">{{ isAr ? "تطوير الويب" : "Web Dev" }}</span>
                <span class="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                  <Calendar class="w-3 h-3" /> 2025-01-15
                </span>
              </div>
              <h2
                class="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-4 group-hover:text-stb-cyan transition-colors duration-300"
              >
                {{ $t("blog.post1.title") }}
              </h2>
              <p class="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {{ $t("blog.post1.excerpt") }}
              </p>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-gradient-to-br from-stb-blue to-stb-cyan flex items-center justify-center text-xs font-bold text-white"
                  >
                    أ
                  </div>
                  <span class="text-sm font-semibold text-[var(--text-primary)]">{{
                    isAr ? "فريق STB" : "STB Team"
                  }}</span>
                </div>
                <span class="text-[var(--text-secondary)] text-xs flex items-center gap-1">
                  <Clock class="w-3 h-3" /> {{ isAr ? "5 دقائق" : "5 min read" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TransitionGroup
        name="grid"
        tag="div"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        @before-leave="pinLeaving"
      >
        <div
          v-for="(post, i) in filteredPosts"
          :key="post.title.en"
          class="grid-item"
          :style="{ '--i': i }"
        >
          <BlogCard
            class="h-full"
            :icon="post.icon"
            :accent="post.accent"
            :category="post.category[$i18n.locale]"
            :date="post.date"
            :read-time="post.readTime[$i18n.locale]"
            :views="post.views"
            :title="post.title[$i18n.locale]"
            :excerpt="post.excerpt[$i18n.locale]"
            :author="post.author[$i18n.locale]"
            :author-initial="post.authorInitial"
            :read-more-text="$t('blog.readMore')"
            :rtl="isAr"
          />
        </div>
      </TransitionGroup>
    </section>

    <!-- Newsletter -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div v-reveal:zoom class="conic-frame">
        <div class="newsletter">
          <div class="newsletter__icon"><Send class="w-7 h-7 text-white" /></div>
          <h2 class="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-2">
            {{ isAr ? "اشترك في النشرة البريدية" : "Subscribe to Newsletter" }}
          </h2>
          <p class="text-[var(--text-secondary)] mb-7 text-sm">
            {{
              isAr
                ? "احصل على أحدث المقالات والأخبار التقنية مباشرة في بريدك"
                : "Get the latest articles and tech news directly in your inbox"
            }}
          </p>
          <form class="flex gap-3 max-w-md mx-auto" @submit.prevent="subscribe">
            <input
              v-model="newsletterEmail"
              type="email"
              required
              class="stb-input flex-1"
              :placeholder="isAr ? 'بريدك الإلكتروني' : 'Your email'"
              :aria-label="isAr ? 'بريدك الإلكتروني' : 'Your email'"
            />
            <button
              type="submit"
              class="btn-primary !px-5 flex-shrink-0"
              :aria-label="isAr ? 'اشترك' : 'Subscribe'"
            >
              <Send class="w-4 h-4" :class="isAr ? '-scale-x-100' : ''" />
            </button>
          </form>
          <Transition name="pop">
            <p
              v-if="subscribed"
              class="mt-4 text-sm text-green-400 flex items-center justify-center gap-2"
            >
              <CheckCircle class="w-4 h-4" />
              {{ isAr ? "تم الاشتراك بنجاح!" : "Subscribed successfully!" }}
            </p>
          </Transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  BookOpen,
  Calendar,
  Clock,
  Send,
  Globe,
  Brain,
  ShieldCheck,
  Cloud,
  Zap,
  Cpu,
  Rocket,
  CheckCircle,
} from "lucide-vue-next";

const { locale } = useI18n();
const isAr = computed(() => locale.value === "ar");

const activeCategory = ref("all");

const newsletterEmail = ref("");
const subscribed = ref(false);
const subscribe = () => {
  if (!newsletterEmail.value) return;
  subscribed.value = true;
  newsletterEmail.value = "";
  setTimeout(() => (subscribed.value = false), 4000);
};

const categories = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "web", label: { ar: "تطوير الويب", en: "Web Dev" } },
  { key: "ai", label: { ar: "ذكاء اصطناعي", en: "AI" } },
  { key: "security", label: { ar: "أمن المعلومات", en: "Security" } },
  { key: "cloud", label: { ar: "الحوسبة السحابية", en: "Cloud" } },
];

const allPosts = [
  {
    icon: Globe, accent: "#1e6fd9", category: { ar: "تطوير الويب", en: "Web Dev" }, catKey: "web",
    date: "2025-01-15", readTime: { ar: "5 دقائق", en: "5 min" }, views: "1.2K",
    title: { ar: "مستقبل تطوير الويب في 2025", en: "Future of Web Development in 2025" },
    excerpt: { ar: "استكشاف أحدث التقنيات والاتجاهات التي ستشكل مستقبل تطوير الويب", en: "Exploring latest technologies shaping the future of web development" },
    author: { ar: "أحمد محمود", en: "Ahmed Mahmoud" }, authorInitial: "أ",
  },
  {
    icon: Brain, accent: "#7c3aed", category: { ar: "ذكاء اصطناعي", en: "AI" }, catKey: "ai",
    date: "2025-01-10", readTime: { ar: "7 دقائق", en: "7 min" }, views: "2.1K",
    title: { ar: "الذكاء الاصطناعي في خدمة الأعمال", en: "AI in Business Services" },
    excerpt: { ar: "كيف يمكن للذكاء الاصطناعي أن يحول عمليات شركتك ويضاعف كفاءتها", en: "How AI can transform your company operations and multiply efficiency" },
    author: { ar: "سارة أحمد", en: "Sara Ahmed" }, authorInitial: "س",
  },
  {
    icon: ShieldCheck, accent: "#e11d48", category: { ar: "أمن المعلومات", en: "Security" }, catKey: "security",
    date: "2025-01-05", readTime: { ar: "6 دقائق", en: "6 min" }, views: "987",
    title: { ar: "أمان السحابة: دليل شامل", en: "Cloud Security: A Complete Guide" },
    excerpt: { ar: "أفضل الممارسات لحماية بياناتك في البيئات السحابية الحديثة", en: "Best practices for protecting your data in modern cloud environments" },
    author: { ar: "محمد علي", en: "Mohamed Ali" }, authorInitial: "م",
  },
  {
    icon: Cloud, accent: "#0891b2", category: { ar: "الحوسبة السحابية", en: "Cloud" }, catKey: "cloud",
    date: "2024-12-28", readTime: { ar: "8 دقائق", en: "8 min" }, views: "756",
    title: { ar: "مقارنة AWS vs Azure vs GCP", en: "AWS vs Azure vs GCP Comparison" },
    excerpt: { ar: "دليل شامل لاختيار أفضل مزود سحابي لمشروعك", en: "Comprehensive guide to choosing the best cloud provider for your project" },
    author: { ar: "خالد حسن", en: "Khaled Hassan" }, authorInitial: "خ",
  },
  {
    icon: Zap, accent: "#ca8a04", category: { ar: "تطوير الويب", en: "Web Dev" }, catKey: "web",
    date: "2024-12-20", readTime: { ar: "4 دقائق", en: "4 min" }, views: "1.5K",
    title: { ar: "Nuxt 4 الميزات الجديدة", en: "Nuxt 4 New Features" },
    excerpt: { ar: "استعراض أبرز الميزات الجديدة في إصدار Nuxt.js 4", en: "Overview of the most notable new features in Nuxt.js 4 release" },
    author: { ar: "يوسف صالح", en: "Yousef Saleh" }, authorInitial: "ي",
  },
  {
    icon: Cpu, accent: "#16a34a", category: { ar: "ذكاء اصطناعي", en: "AI" }, catKey: "ai",
    date: "2024-12-15", readTime: { ar: "9 دقائق", en: "9 min" }, views: "3.2K",
    title: { ar: "بناء نماذج LLM مخصصة", en: "Building Custom LLM Models" },
    excerpt: { ar: "كيفية تدريب وضبط نماذج اللغة الكبيرة لاحتياجاتك الخاصة", en: "How to train and fine-tune large language models for your specific needs" },
    author: { ar: "نور إبراهيم", en: "Nour Ibrahim" }, authorInitial: "ن",
  },
];

// Keep leaving cards exactly where they were while the grid re-flows.
const pinLeaving = (el) => {
  el.style.top = `${el.offsetTop}px`;
  el.style.left = `${el.offsetLeft}px`;
  el.style.width = `${el.offsetWidth}px`;
};

const filteredPosts = computed(() =>
  activeCategory.value === "all"
    ? allPosts
    : allPosts.filter((p) => p.catKey === activeCategory.value),
);
</script>

<style scoped>
.filter-bar {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  padding: 6px;
  border-radius: 28px;
}

.filter-btn {
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition:
    color 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s var(--ease-spring);
}

.filter-btn:hover {
  color: var(--stb-cyan);
}

.filter-btn.is-active {
  color: #fff;
  background: linear-gradient(135deg, var(--stb-blue-bright), var(--stb-cyan));
  box-shadow: 0 8px 24px -8px rgba(0, 212, 255, 0.6);
}

.filter-btn:active {
  transform: scale(0.95);
}

.featured-visual {
  position: relative;
  min-height: 280px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(60% 60% at 50% 50%, rgba(0, 212, 255, 0.25), transparent 70%),
    linear-gradient(160deg, #1a3a6b, #0d1f3c 50%, #060d1a);
}

.featured-visual__rings span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 140px;
  margin: -70px 0 0 -70px;
  border-radius: 50%;
  border: 1px solid rgba(0, 212, 255, 0.35);
  animation: ripple 4s var(--ease-out) infinite;
}

.featured-visual__rings span:nth-child(2) {
  animation-delay: 1.33s;
}

.featured-visual__rings span:nth-child(3) {
  animation-delay: 2.66s;
}

@keyframes ripple {
  from {
    transform: scale(0.6);
    opacity: 1;
  }
  to {
    transform: scale(2.6);
    opacity: 0;
  }
}

.featured-visual__icon {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 32px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--stb-blue-bright), var(--stb-cyan));
  box-shadow: 0 30px 60px -15px rgba(0, 212, 255, 0.6);
  transition: transform 0.8s var(--ease-spring);
}

.group:hover .featured-visual__icon {
  transform: translateY(-8px) rotate(-8deg) scale(1.05);
}

/* Filter grid transitions */
.grid-enter-active {
  transition:
    opacity 0.5s var(--ease-out),
    transform 0.6s var(--ease-out);
  transition-delay: calc(var(--i) * 0.06s);
}
.grid-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.3s ease;
  position: absolute;
}
.grid-move {
  transition: transform 0.6s var(--ease-out);
}
.grid-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.96);
}
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}


.newsletter {
  position: relative;
  border-radius: 31px;
  padding: 3rem 2rem;
  text-align: center;
  background:
    radial-gradient(60% 80% at 50% 0%, rgba(0, 212, 255, 0.14), transparent 70%),
    var(--bg-card);
}

.newsletter__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.25rem;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--stb-blue-bright), var(--stb-cyan));
  box-shadow: 0 20px 40px -12px rgba(0, 212, 255, 0.6);
  animation: float 5s ease-in-out infinite;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.4s var(--ease-spring);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
