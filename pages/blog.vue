<template>
  <div class="pt-28 pb-20">
    <!-- Header -->
    <section class="py-20 text-center relative overflow-hidden">
      <div class="absolute inset-0 hex-pattern pointer-events-none" />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="tag mb-6 inline-flex">
          <BookOpen class="w-3 h-3 me-1.5" />
          {{ $t('blog.title') }}
        </div>
        <h1 class="section-title mb-4">
          <span class="gradient-text">{{ $t('blog.title') }}</span>
        </h1>
        <div class="section-divider" />
        <p class="text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">{{ $t('blog.subtitle') }}</p>
      </div>
    </section>

    <!-- Filter Tags -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
          :class="activeCategory === cat.key
            ? 'bg-gradient-to-r from-stb-blue to-stb-cyan text-white shadow-lg shadow-stb-cyan/20'
            : 'glass text-[var(--text-secondary)] hover:text-stb-cyan hover:border-stb-cyan/30'"
          @click="activeCategory = cat.key"
        >
          {{ cat.label[$i18n.locale] }}
        </button>
      </div>
    </section>

    <!-- Featured Post -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="gradient-border overflow-hidden reveal">
        <div class="grid lg:grid-cols-2">
          <div class="h-64 lg:h-auto bg-gradient-to-br from-stb-navy via-stb-mid to-stb-deep flex items-center justify-center relative">
            <div class="text-8xl animate-float">🚀</div>
            <div class="absolute top-4 start-4">
              <span class="tag">{{ $i18n.locale === 'ar' ? 'مقال مميز' : 'Featured' }}</span>
            </div>
          </div>
          <div class="p-10 flex flex-col justify-center">
            <div class="flex items-center gap-3 mb-4">
              <span class="tag text-xs">{{ $i18n.locale === 'ar' ? 'تطوير الويب' : 'Web Dev' }}</span>
              <span class="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                <Calendar class="w-3 h-3" /> 2025-01-15
              </span>
            </div>
            <h2 class="text-2xl font-black text-[var(--text-primary)] mb-4">{{ $t('blog.post1.title') }}</h2>
            <p class="text-[var(--text-secondary)] mb-6 leading-relaxed">{{ $t('blog.post1.excerpt') }}</p>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-stb-blue to-stb-cyan flex items-center justify-center text-xs font-bold text-white">أ</div>
                <span class="text-sm font-semibold text-[var(--text-primary)]">{{ $i18n.locale === 'ar' ? 'فريق STB' : 'STB Team' }}</span>
              </div>
              <span class="text-[var(--text-secondary)] text-xs flex items-center gap-1">
                <Clock class="w-3 h-3" /> {{ $i18n.locale === 'ar' ? '5 دقائق' : '5 min read' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(post, i) in filteredPosts"
          :key="i"
          class="gradient-border overflow-hidden card-hover group cursor-pointer reveal"
          :style="`animation-delay:${i * 0.1}s`"
        >
          <div class="h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden"
            :class="post.bgClass">
            <div class="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">{{ post.emoji }}</div>
            <div class="absolute inset-0 bg-gradient-to-t from-stb-mid/90 to-transparent" />
            <div class="absolute top-3 start-3 flex gap-2">
              <span class="tag text-[10px]">{{ post.category[$i18n.locale] }}</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3 text-xs text-[var(--text-secondary)]">
              <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> {{ post.date }}</span>
              <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ post.readTime[$i18n.locale] }}</span>
              <span class="flex items-center gap-1"><Eye class="w-3 h-3" /> {{ post.views }}</span>
            </div>
            <h3 class="font-bold text-[var(--text-primary)] mb-2 group-hover:text-stb-cyan transition-colors line-clamp-2">
              {{ post.title[$i18n.locale] }}
            </h3>
            <p class="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">{{ post.excerpt[$i18n.locale] }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-stb-blue to-stb-cyan flex items-center justify-center text-xs font-bold text-white">
                  {{ post.authorInitial }}
                </div>
                <span class="text-xs text-[var(--text-secondary)]">{{ post.author[$i18n.locale] }}</span>
              </div>
              <button class="text-stb-cyan text-xs font-semibold flex items-center gap-1 group/btn">
                {{ $t('blog.readMore') }}
                <ArrowRight class="w-3 h-3 transition-transform group-hover/btn:translate-x-1" :class="$i18n.locale === 'ar' ? 'rotate-180' : ''" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 reveal">
      <div class="glass rounded-3xl p-10 text-center">
        <div class="text-4xl mb-4">📬</div>
        <h2 class="text-2xl font-black text-[var(--text-primary)] mb-2">
          {{ $i18n.locale === 'ar' ? 'اشترك في النشرة البريدية' : 'Subscribe to Newsletter' }}
        </h2>
        <p class="text-[var(--text-secondary)] mb-6 text-sm">
          {{ $i18n.locale === 'ar' ? 'احصل على أحدث المقالات والأخبار التقنية مباشرة في بريدك' : 'Get the latest articles and tech news directly in your inbox' }}
        </p>
        <div class="flex gap-3 max-w-sm mx-auto">
          <input
            type="email"
            class="stb-input flex-1"
            :placeholder="$i18n.locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email'"
          />
          <button class="btn-primary px-5 flex-shrink-0">
            <Send class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { BookOpen, Calendar, Clock, Eye, ArrowRight, Send } from 'lucide-vue-next'
const localePath = useLocalePath()

const activeCategory = ref('all')

const categories = [
  { key: 'all', label: { ar: 'الكل', en: 'All' } },
  { key: 'web', label: { ar: 'تطوير الويب', en: 'Web Dev' } },
  { key: 'ai', label: { ar: 'ذكاء اصطناعي', en: 'AI' } },
  { key: 'security', label: { ar: 'أمن المعلومات', en: 'Security' } },
  { key: 'cloud', label: { ar: 'الحوسبة السحابية', en: 'Cloud' } },
]

const allPosts = [
  {
    emoji: '🌐', bgClass: 'from-blue-900 via-stb-mid to-stb-deep', category: { ar: 'تطوير الويب', en: 'Web Dev' }, catKey: 'web',
    date: '2025-01-15', readTime: { ar: '5 دقائق', en: '5 min' }, views: '1.2K',
    title: { ar: 'مستقبل تطوير الويب في 2025', en: 'Future of Web Development in 2025' },
    excerpt: { ar: 'استكشاف أحدث التقنيات والاتجاهات التي ستشكل مستقبل تطوير الويب', en: 'Exploring latest technologies shaping the future of web development' },
    author: { ar: 'أحمد محمود', en: 'Ahmed Mahmoud' }, authorInitial: 'أ'
  },
  {
    emoji: '🤖', bgClass: 'from-purple-900 via-stb-mid to-stb-deep', category: { ar: 'ذكاء اصطناعي', en: 'AI' }, catKey: 'ai',
    date: '2025-01-10', readTime: { ar: '7 دقائق', en: '7 min' }, views: '2.1K',
    title: { ar: 'الذكاء الاصطناعي في خدمة الأعمال', en: 'AI in Business Services' },
    excerpt: { ar: 'كيف يمكن للذكاء الاصطناعي أن يحول عمليات شركتك ويضاعف كفاءتها', en: 'How AI can transform your company operations and multiply efficiency' },
    author: { ar: 'سارة أحمد', en: 'Sara Ahmed' }, authorInitial: 'س'
  },
  {
    emoji: '🔒', bgClass: 'from-red-900 via-stb-mid to-stb-deep', category: { ar: 'أمن المعلومات', en: 'Security' }, catKey: 'security',
    date: '2025-01-05', readTime: { ar: '6 دقائق', en: '6 min' }, views: '987',
    title: { ar: 'أمان السحابة: دليل شامل', en: 'Cloud Security: A Complete Guide' },
    excerpt: { ar: 'أفضل الممارسات لحماية بياناتك في البيئات السحابية الحديثة', en: 'Best practices for protecting your data in modern cloud environments' },
    author: { ar: 'محمد علي', en: 'Mohamed Ali' }, authorInitial: 'م'
  },
  {
    emoji: '☁️', bgClass: 'from-cyan-900 via-stb-mid to-stb-deep', category: { ar: 'الحوسبة السحابية', en: 'Cloud' }, catKey: 'cloud',
    date: '2024-12-28', readTime: { ar: '8 دقائق', en: '8 min' }, views: '756',
    title: { ar: 'مقارنة AWS vs Azure vs GCP', en: 'AWS vs Azure vs GCP Comparison' },
    excerpt: { ar: 'دليل شامل لاختيار أفضل مزود سحابي لمشروعك', en: 'Comprehensive guide to choosing the best cloud provider for your project' },
    author: { ar: 'خالد حسن', en: 'Khaled Hassan' }, authorInitial: 'خ'
  },
  {
    emoji: '⚡', bgClass: 'from-yellow-900 via-stb-mid to-stb-deep', category: { ar: 'تطوير الويب', en: 'Web Dev' }, catKey: 'web',
    date: '2024-12-20', readTime: { ar: '4 دقائق', en: '4 min' }, views: '1.5K',
    title: { ar: 'Nuxt 4 الميزات الجديدة', en: 'Nuxt 4 New Features' },
    excerpt: { ar: 'استعراض أبرز الميزات الجديدة في إصدار Nuxt.js 4', en: 'Overview of the most notable new features in Nuxt.js 4 release' },
    author: { ar: 'يوسف صالح', en: 'Yousef Saleh' }, authorInitial: 'ي'
  },
  {
    emoji: '🧠', bgClass: 'from-green-900 via-stb-mid to-stb-deep', category: { ar: 'ذكاء اصطناعي', en: 'AI' }, catKey: 'ai',
    date: '2024-12-15', readTime: { ar: '9 دقائق', en: '9 min' }, views: '3.2K',
    title: { ar: 'بناء نماذج LLM مخصصة', en: 'Building Custom LLM Models' },
    excerpt: { ar: 'كيفية تدريب وضبط نماذج اللغة الكبيرة لاحتياجاتك الخاصة', en: 'How to train and fine-tune large language models for your specific needs' },
    author: { ar: 'نور إبراهيم', en: 'Nour Ibrahim' }, authorInitial: 'ن'
  },
]

const filteredPosts = computed(() =>
  activeCategory.value === 'all' ? allPosts : allPosts.filter(p => p.catKey === activeCategory.value)
)

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>
