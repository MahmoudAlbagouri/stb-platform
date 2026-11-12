<template>
  <div class="pt-24 pb-20">
    <PageHeader
      :icon="FileText"
      :tag-text="$t('nav.quote')"
      :title="$t('quote.title')"
      :subtitle="$t('quote.subtitle')"
      variant="quote"
    />

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
              class="step-dot w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
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
              class="step-track w-8 sm:w-16 mx-2"
            >
              <span
                class="step-track__fill"
                :style="{ transform: `scaleX(${currentStep > i ? 1 : 0})` }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div v-reveal:zoom class="gradient-border p-6 sm:p-8 overflow-hidden">
        <Transition :name="stepTransition" mode="out-in">
        <!-- Step 1: Client Info & Project Type -->
        <div v-if="currentStep === 0" key="s0">
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
                  class="p-3 rounded-xl border text-sm font-semibold choice-anim text-start flex flex-col items-start gap-2"
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
        <div v-else-if="currentStep === 1" key="s1">
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
                  class="p-3 rounded-xl border text-sm font-semibold choice-anim"
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
                  class="p-3 rounded-xl border text-sm font-semibold choice-anim"
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
        <div v-else key="s2">
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
                  class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer choice-anim"
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
                    class="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 choice-anim"
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

        </Transition>

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
          class="mt-6 glass rounded-3xl p-8 text-center"
        >
          <div class="success-badge"><CheckCircle class="w-8 h-8 text-white" /></div>
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
const stepTransition = ref("step-next");
watch(currentStep, (next, prev) => {
  stepTransition.value = next > prev ? "step-next" : "step-prev";
});
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

</script>

<style scoped>
.label-style {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.choice-anim {
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.3s var(--ease-spring);
}
.choice-anim:hover {
  transform: translateY(-2px);
}

.step-dot {
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.4s var(--ease-spring);
}

.step-track {
  position: relative;
  height: 2px;
  border-radius: 2px;
  background: var(--border-color);
  overflow: hidden;
}
.step-track__fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--stb-blue-bright), var(--stb-cyan));
  transform-origin: left center;
  transition: transform 0.6s var(--ease-out);
}
[dir="rtl"] .step-track__fill {
  transform-origin: right center;
}

.success-badge {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  box-shadow: 0 16px 40px -10px rgba(34, 197, 94, 0.6);
  animation: badge-pop 0.7s var(--ease-spring) both;
}
@keyframes badge-pop {
  from {
    transform: scale(0) rotate(-45deg);
  }
}

/* Step switching (direction-aware, mirrored in RTL) */
.step-next-enter-active,
.step-next-leave-active,
.step-prev-enter-active,
.step-prev-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.4s var(--ease-out);
}
.step-next-enter-from,
.step-prev-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.step-next-leave-to,
.step-prev-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
[dir="rtl"] .step-next-enter-from,
[dir="rtl"] .step-prev-leave-to {
  transform: translateX(-40px);
}
[dir="rtl"] .step-next-leave-to,
[dir="rtl"] .step-prev-enter-from {
  transform: translateX(40px);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s var(--ease-out);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
