<template>
  <div class="pt-28 pb-20">
    <!-- Header -->
    <section class="py-16 text-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="tag mb-6 inline-flex">
          <FileText class="w-3 h-3 me-1.5" />
          {{ $t("nav.quote") }}
        </div>
        <h1 class="section-title mb-4">
          <span class="gradient-text">{{ $t("quote.title") }}</span>
        </h1>
        <div class="section-divider" />
        <p class="text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
          {{ $t("quote.subtitle") }}
        </p>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-12">
        <div class="flex items-center gap-2">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="flex items-center gap-2"
          >
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300"
              :class="
                currentStep > i
                  ? 'bg-gradient-to-br from-stb-blue to-stb-cyan text-white'
                  : currentStep === i
                    ? 'bg-gradient-to-br from-stb-blue to-stb-cyan text-white shadow-lg shadow-stb-cyan/30'
                    : 'glass text-[var(--text-secondary)]'
              "
            >
              <CheckCircle v-if="currentStep > i" class="w-4 h-4" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span
              class="hidden sm:block text-xs font-semibold"
              :class="
                currentStep >= i
                  ? 'text-stb-cyan'
                  : 'text-[var(--text-secondary)]'
              "
            >
              {{ step[$i18n.locale] }}
            </span>
            <div
              v-if="i < steps.length - 1"
              class="w-8 sm:w-16 h-px mx-2"
              :class="
                currentStep > i ? 'bg-stb-cyan' : 'bg-[var(--border-color)]'
              "
            />
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="gradient-border p-8 reveal">
        <!-- Step 1: Client Info & Project Type -->
        <div v-if="currentStep === 0">
          <h2
            class="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2"
          >
            <User class="w-5 h-5 text-stb-cyan" />
            {{
              $i18n.locale === "ar"
                ? "بيانات العميل ونوع المشروع"
                : "Client Info & Project Type"
            }}
          </h2>
          <div class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="label-style">{{ $t("quote.clientName") }}</label>
                <input
                  v-model="quoteData.clientName"
                  type="text"
                  class="stb-input"
                  :placeholder="$t('quote.clientName')"
                />
              </div>
              <div>
                <label class="label-style">{{ $t("quote.clientEmail") }}</label>
                <input
                  v-model="quoteData.clientEmail"
                  type="email"
                  class="stb-input"
                  :placeholder="$t('quote.clientEmail')"
                />
              </div>
            </div>
            <div>
              <label class="label-style">{{ $t("quote.clientPhone") }}</label>
              <input
                v-model="quoteData.clientPhone"
                type="tel"
                class="stb-input"
                :placeholder="$t('quote.clientPhone')"
              />
            </div>

            <!-- Project Types Grid -->
            <div>
              <label class="label-style">{{ $t("quote.projectType") }}</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <button
                  v-for="(type, key) in projectTypes"
                  :key="key"
                  type="button"
                  class="p-3 rounded-xl border text-sm font-semibold transition-all duration-200 text-start flex flex-col items-start gap-2"
                  :class="
                    quoteData.projectType === key
                      ? 'border-stb-cyan bg-stb-cyan/10 text-stb-cyan'
                      : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-stb-cyan/40'
                  "
                  @click="quoteData.projectType = key"
                >
                  <span class="text-2xl block leading-none">{{
                    type.emoji
                  }}</span>
                  <span class="text-xs">{{ $t(`quote.types.${key}`) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Project Details -->
        <div v-if="currentStep === 1">
          <h2
            class="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2"
          >
            <Layers class="w-5 h-5 text-stb-cyan" />
            {{ $i18n.locale === "ar" ? "تفاصيل المشروع" : "Project Details" }}
          </h2>
          <div class="space-y-5">
            <div>
              <label class="label-style">{{ $t("quote.budget") }}</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="(_, key) in budgetOptions"
                  :key="key"
                  type="button"
                  class="p-3 rounded-xl border text-sm font-semibold transition-all duration-200"
                  :class="
                    quoteData.budget === key
                      ? 'border-stb-cyan bg-stb-cyan/10 text-stb-cyan'
                      : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-stb-cyan/40'
                  "
                  @click="quoteData.budget = key"
                >
                  {{ $t(`quote.budgets.${key}`) }}
                </button>
              </div>
            </div>
            <div>
              <label class="label-style">{{ $t("quote.timeline") }}</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="(_, key) in timelineOptions"
                  :key="key"
                  type="button"
                  class="p-3 rounded-xl border text-sm font-semibold transition-all duration-200"
                  :class="
                    quoteData.timeline === key
                      ? 'border-stb-cyan bg-stb-cyan/10 text-stb-cyan'
                      : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-stb-cyan/40'
                  "
                  @click="quoteData.timeline = key"
                >
                  {{ $t(`quote.timelines.${key}`) }}
                </button>
              </div>
            </div>
            <div>
              <label class="label-style">{{ $t("quote.requirements") }}</label>
              <textarea
                v-model="quoteData.requirements"
                rows="4"
                class="stb-input resize-none"
                :placeholder="
                  $i18n.locale === 'ar'
                    ? 'اشرح متطلبات مشروعك بالتفصيل...'
                    : 'Describe your project requirements in detail...'
                "
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Features & Notes -->
        <div v-if="currentStep === 2">
          <h2
            class="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2"
          >
            <CheckSquare class="w-5 h-5 text-stb-cyan" />
            {{
              $i18n.locale === "ar" ? "الميزات والملاحظات" : "Features & Notes"
            }}
          </h2>
          <div class="space-y-6">
            <div>
              <label class="label-style mb-3">{{ $t("quote.features") }}</label>
              <div class="grid sm:grid-cols-2 gap-3">
                <label
                  v-for="feat in featuresList"
                  :key="feat.key"
                  class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200"
                  :class="
                    quoteData.features.includes(feat.key)
                      ? 'border-stb-cyan bg-stb-cyan/8'
                      : 'border-[var(--border-color)] hover:border-stb-cyan/30'
                  "
                >
                  <input
                    type="checkbox"
                    :value="feat.key"
                    v-model="quoteData.features"
                    class="hidden"
                  />
                  <div
                    class="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    :class="
                      quoteData.features.includes(feat.key)
                        ? 'border-stb-cyan bg-stb-cyan'
                        : 'border-[var(--border-color)]'
                    "
                  >
                    <Check
                      v-if="quoteData.features.includes(feat.key)"
                      class="w-3 h-3 text-white"
                    />
                  </div>
                  <span
                    class="text-sm"
                    :class="
                      quoteData.features.includes(feat.key)
                        ? 'text-stb-cyan font-semibold'
                        : 'text-[var(--text-secondary)]'
                    "
                  >
                    {{ feat.label[$i18n.locale] }}
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label class="label-style">{{ $t("quote.notes") }}</label>
              <textarea
                v-model="quoteData.notes"
                rows="4"
                class="stb-input resize-none"
                :placeholder="
                  $i18n.locale === 'ar'
                    ? 'أي ملاحظات إضافية أو تفاصيل أخرى...'
                    : 'Any additional notes or details...'
                "
              />
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div
          class="flex justify-between mt-8 pt-6 border-t border-[var(--border-color)]"
        >
          <button
            v-if="currentStep > 0"
            class="btn-outline flex items-center gap-2"
            @click="currentStep--"
          >
            <ChevronRight
              class="w-4 h-4"
              :class="$i18n.locale === 'en' ? 'rotate-180' : ''"
            />
            {{ $i18n.locale === "ar" ? "السابق" : "Previous" }}
          </button>
          <div v-else />

          <button
            v-if="currentStep < steps.length - 1"
            class="btn-primary flex items-center gap-2"
            @click="nextStep"
          >
            {{ $i18n.locale === "ar" ? "التالي" : "Next" }}
            <ChevronRight
              class="w-4 h-4"
              :class="$i18n.locale === 'ar' ? 'rotate-180' : ''"
            />
          </button>

          <button
            v-else
            class="btn-primary flex items-center gap-2"
            :disabled="generating"
            @click="generatePDF"
          >
            <Loader v-if="generating" class="w-4 h-4 animate-spin" />
            <Download v-else class="w-4 h-4" />
            {{
              generating
                ? $i18n.locale === "ar"
                  ? "جاري الإنشاء..."
                  : "Generating..."
                : $t("quote.generate")
            }}
          </button>
        </div>
      </div>

      <!-- Success -->
      <Transition name="fade">
        <div
          v-if="generated"
          class="mt-6 glass rounded-2xl p-8 text-center reveal"
        >
          <div class="text-5xl mb-4">🎉</div>
          <h3 class="text-xl font-bold text-[var(--text-primary)] mb-2">
            {{
              $i18n.locale === "ar" ? "تم إنشاء عرض السعر!" : "Quote Generated!"
            }}
          </h3>
          <p class="text-[var(--text-secondary)] mb-6 text-sm">
            {{
              $i18n.locale === "ar"
                ? "تم تحميل ملف PDF بنجاح. سيتواصل معك فريقنا خلال 24 ساعة."
                : "PDF file downloaded successfully. Our team will contact you within 24 hours."
            }}
          </p>
          <button
            class="btn-primary flex items-center gap-2 mx-auto"
            @click="resetForm"
          >
            <Plus class="w-4 h-4" />
            {{ $i18n.locale === "ar" ? "طلب جديد" : "New Request" }}
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import {
  FileText,
  User,
  Layers,
  CheckSquare,
  CheckCircle,
  Check,
  ChevronRight,
  Download,
  Loader,
  Plus,
} from "lucide-vue-next";
const { locale } = useI18n();
const { generateQuotePDF } = usePDF();

const currentStep = ref(0);
const generating = ref(false);
const generated = ref(false);

const steps = [
  { ar: "بيانات العميل", en: "Client Info" },
  { ar: "تفاصيل المشروع", en: "Project Details" },
  { ar: "الميزات والملاحظات", en: "Features & Notes" },
];

const quoteData = ref({
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  projectType: "",
  budget: "",
  timeline: "",
  requirements: "",
  features: [],
  notes: "",
});

// تم تحديث أنواع المشاريع لتشمل جميع الخدمات الجديدة
const projectTypes = {
  web: { emoji: "🌐" },
  mobile: { emoji: "📱" },
  erp: { emoji: "🏢" },
  hr_biometric: { emoji: "👆" },
  education: { emoji: "🎓" },
  news: { emoji: "📰" },
  logistics: { emoji: "🚚" },
  social: { emoji: "👥" },
  b2b: { emoji: "💼" },
  tourism: { emoji: "✈️" },
  real_estate: { emoji: "🏠" },
  ai: { emoji: "🤖" },
  other: { emoji: "✨" },
};

const budgetOptions = { small: 1, medium: 2, large: 3, enterprise: 4 };
const timelineOptions = { urgent: 1, short: 2, medium: 3, long: 4 };

// تم تحديث قائمة الميزات لتكون شاملة وتقنية
const featuresList = [
  {
    key: "multilang",
    label: {
      ar: "دعم متعدد اللغات (RTL/LTR)",
      en: "Multi-language Support (RTL/LTR)",
    },
  },
  {
    key: "dashboard",
    label: { ar: "لوحة تحكم إدارية متقدمة", en: "Advanced Admin Dashboard" },
  },
  {
    key: "payment",
    label: { ar: "بوابة دفع إلكتروني", en: "Payment Gateway Integration" },
  },
  {
    key: "api",
    label: { ar: "ربط API خارجي", en: "External API Integration" },
  },
  {
    key: "notifications",
    label: { ar: "إشعارات فورية (Push/SMS)", en: "Push/SMS Notifications" },
  },
  {
    key: "analytics",
    label: { ar: "تحليلات وتقارير بيانية", en: "Analytics & Reports" },
  },
  {
    key: "seo",
    label: { ar: "تحسين محركات البحث SEO", en: "SEO Optimization" },
  },
  {
    key: "darkmode",
    label: { ar: "الوضع الليلي (Dark Mode)", en: "Dark Mode Support" },
  },
  {
    key: "security",
    label: { ar: "حماية وتشفير البيانات", en: "Data Security & Encryption" },
  },
  {
    key: "cloud",
    label: { ar: "استضافة سحابية قابلة للتوسع", en: "Scalable Cloud Hosting" },
  },
  {
    key: "mobile_responsive",
    label: { ar: "تصميم متجاوب للجوال", en: "Mobile Responsive Design" },
  },
  {
    key: "chat",
    label: { ar: "دردشة مباشرة (Live Chat)", en: "Live Chat Support" },
  },
];

const nextStep = () => {
  // يمكن إضافة تحقق بسيط هنا قبل الانتقال
  if (currentStep.value === 0 && !quoteData.value.projectType) {
    // تنبيه بسيط أو منع الانتقال إذا لم يتم اختيار نوع المشروع
    // لكن للتبسيط سنسمح بالانتقال
  }
  currentStep.value++;
};

const generatePDF = async () => {
  generating.value = true;
  try {
    await generateQuotePDF({
      clientName: quoteData.value.clientName,
      clientEmail: quoteData.value.clientEmail,
      clientPhone: quoteData.value.clientPhone,
      projectType: quoteData.value.projectType,
      budget: quoteData.value.budget,
      timeline: quoteData.value.timeline,
      requirements: quoteData.value.requirements,
      features: quoteData.value.features,
      notes: quoteData.value.notes,
    });
    generated.value = true;
  } catch (e) {
    console.error(e);
  } finally {
    generating.value = false;
  }
};

const resetForm = () => {
  currentStep.value = 0;
  generated.value = false;
  quoteData.value = {
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectType: "",
    budget: "",
    timeline: "",
    requirements: "",
    features: [],
    notes: "",
  };
};

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
</script>

<style scoped>
.label-style {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
