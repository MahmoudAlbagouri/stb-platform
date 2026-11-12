<template>
  <div class="pt-24 pb-20">
    <PageHeader
      :icon="Layers"
      :tag-text="$t('services.title')"
      :title="$t('services.title')"
      :subtitle="$t('services.subtitle')"
      variant="services"
    />

    <!-- Services Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <div
          v-for="(service, i) in services"
          :key="service.titleKey"
          v-reveal="(i % 3) * 0.08"
        >
          <div v-tilt="6" class="gradient-border card-3d p-8 group h-full flex flex-col">
            <div class="flex items-start justify-between">
              <div class="service-icon-wrap w-16 h-16 mb-5">
                <component :is="service.icon" class="w-8 h-8 text-stb-cyan" />
              </div>
              <span class="font-mono text-xs tracking-widest text-[var(--text-secondary)] opacity-50 group-hover:opacity-100 group-hover:text-stb-cyan transition">
                {{ String(i + 1).padStart(2, "0") }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-[var(--text-primary)] mb-3">
              {{ $t(service.titleKey) }}
            </h3>
            <p class="text-[var(--text-secondary)] leading-relaxed mb-5 text-sm min-h-[40px]">
              {{ $t(service.descKey) }}
            </p>

            <ul class="space-y-2.5 mb-7">
              <li
                v-for="(feat, j) in service.features[$i18n.locale]"
                :key="j"
                class="feature-item flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                :style="{ '--d': `${j * 0.05}s` }"
              >
                <CheckCircle class="w-3.5 h-3.5 text-stb-cyan flex-shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>

            <NuxtLink
              :to="localePath('/contact')"
              class="btn-primary mt-auto text-sm gap-2 w-full"
            >
              {{ isAr ? "استفسر الآن" : "Enquire Now" }}
              <ArrowRight class="w-4 h-4" :class="isAr ? 'rotate-180' : ''" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div v-reveal class="text-center mb-16">
        <span class="section-eyebrow">{{ isAr ? "منهجيتنا" : "Our process" }}</span>
        <h2 class="section-title mt-3 mb-2">
          <span class="gradient-text">{{ isAr ? "كيف نعمل؟" : "How We Work" }}</span>
        </h2>
        <div class="section-divider" />
      </div>

      <div class="process relative grid md:grid-cols-4 gap-10 md:gap-6">
        <div v-reveal:fade class="process__line hidden md:block" aria-hidden="true" />
        <div
          v-for="(step, i) in process"
          :key="i"
          v-reveal="0.15 + i * 0.15"
          class="text-center group relative"
        >
          <div class="relative mb-6 inline-flex">
            <div class="process__icon glass">
              <component :is="step.icon" class="w-7 h-7 text-stb-cyan" />
            </div>
            <div
              class="absolute -top-2 -end-2 w-7 h-7 rounded-full bg-gradient-to-br from-stb-blue to-stb-cyan flex items-center justify-center text-xs font-black text-white shadow-lg shadow-stb-cyan/30"
            >
              {{ i + 1 }}
            </div>
          </div>
          <h3 class="font-bold text-lg text-[var(--text-primary)] mb-2">
            {{ step.title[$i18n.locale] }}
          </h3>
          <p class="text-sm text-[var(--text-secondary)] max-w-[220px] mx-auto">
            {{ step.desc[$i18n.locale] }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  Layers,
  Code2,
  Smartphone,
  Database,
  Fingerprint,
  GraduationCap,
  Newspaper,
  Truck,
  Users,
  Briefcase,
  Plane,
  Home,
  Cloud,
  Brain,
  Lock,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Search,
  PenTool,
  Cpu,
  Rocket,
} from "lucide-vue-next";

const localePath = useLocalePath();
const { locale } = useI18n();
const isAr = computed(() => locale.value === "ar");

// تم تحديث القائمة لتشمل جميع الخدمات الجديدة مع ميزاتها
const services = [
  {
    icon: Code2,
    titleKey: "services.web.title",
    descKey: "services.web.desc",
    features: {
      ar: [
        "تصميم UI/UX احترافي",
        "تطوير Full Stack (Nuxt/Nest)",
        "تحسين SEO والأداء",
        "دعم فني مستمر",
      ],
      en: [
        "Professional UI/UX Design",
        "Full Stack Dev (Nuxt/Nest)",
        "SEO & Performance Optimization",
        "Continuous Support",
      ],
    },
  },
  {
    icon: Smartphone,
    titleKey: "services.mobile.title",
    descKey: "services.mobile.desc",
    features: {
      ar: [
        "تطبيقات iOS & Android",
        "أداء عالي وسلس",
        "إشعارات فورية",
        "ربط مع الأنظمة الخلفية",
      ],
      en: [
        "iOS & Android Apps",
        "High Performance",
        "Push Notifications",
        "Backend Integration",
      ],
    },
  },
  {
    icon: Database,
    titleKey: "services.erp.title",
    descKey: "services.erp.desc",
    features: {
      ar: [
        "إدارة الموارد المتكاملة",
        "أتمتة العمليات",
        "تقارير وتحليلات",
        "ربط الأقسام ببعضها",
      ],
      en: [
        "Integrated Resource Mgmt",
        "Process Automation",
        "Analytics & Reporting",
        "Department Integration",
      ],
    },
  },
  {
    icon: Fingerprint,
    titleKey: "services.hr_biometric.title",
    descKey: "services.hr_biometric.desc",
    features: {
      ar: [
        "أنظمة البصمة المتقدمة",
        "إدارة الرواتب",
        "تتبع الحضور والانصراف",
        "ملفات الموظفين الرقمية",
      ],
      en: [
        "Advanced Biometric Systems",
        "Payroll Management",
        "Attendance Tracking",
        "Digital Employee Records",
      ],
    },
  },
  {
    icon: GraduationCap,
    titleKey: "services.education.title",
    descKey: "services.education.desc",
    features: {
      ar: [
        "فصول افتراضية تفاعلية",
        "اختبارات وشهادات",
        "لوحة تحكم للمعلمين",
        "تتبع تقدم الطلاب",
      ],
      en: [
        "Interactive Virtual Classes",
        "Exams & Certificates",
        "Teacher Dashboards",
        "Student Progress Tracking",
      ],
    },
  },
  {
    icon: Newspaper,
    titleKey: "services.news.title",
    descKey: "services.news.desc",
    features: {
      ar: [
        "نظام إدارة محتوى مرن",
        "سرعة تحميل عالية",
        "تصنيفات وأخبار عاجلة",
        "تحسين لمحركات البحث",
      ],
      en: [
        "Flexible CMS",
        "High Loading Speed",
        "Categories & Breaking News",
        "SEO Optimized",
      ],
    },
  },
  {
    icon: Truck,
    titleKey: "services.logistics.title",
    descKey: "services.logistics.desc",
    features: {
      ar: [
        "تتبع الشحنات لحظياً",
        "إدارة الأساطيل",
        "تطبيقات للسائقين",
        "حساب التكاليف تلقائياً",
      ],
      en: [
        "Real-time Shipment Tracking",
        "Fleet Management",
        "Driver Apps",
        "Auto Cost Calculation",
      ],
    },
  },
  {
    icon: Users,
    titleKey: "services.social.title",
    descKey: "services.social.desc",
    features: {
      ar: [
        "ملفات شخصية تفاعلية",
        "دردشة فورية",
        "مشاركة الوسائط",
        "خوارزميات تواصل ذكية",
      ],
      en: [
        "Interactive Profiles",
        "Instant Chat",
        "Media Sharing",
        "Smart Connection Algorithms",
      ],
    },
  },
  {
    icon: Briefcase,
    titleKey: "services.b2b.title",
    descKey: "services.b2b.desc",
    features: {
      ar: [
        "بوابات دفع آمنة",
        "إدارة الطلبات بالجملة",
        "نظام عروض أسعار",
        "لوحات تحكم للتجار",
      ],
      en: [
        "Secure Payment Gateways",
        "Wholesale Order Mgmt",
        "Quotation System",
        "Merchant Dashboards",
      ],
    },
  },
  {
    icon: Plane,
    titleKey: "services.tourism.title",
    descKey: "services.tourism.desc",
    features: {
      ar: [
        "حجوزات طيران وفنادق",
        "باقات سياحية ديناميكية",
        "بوابات دفع متعددة",
        "دعم متعدد العملات",
      ],
      en: [
        "Flight & Hotel Bookings",
        "Dynamic Packages",
        "Multi-payment Gateways",
        "Multi-currency Support",
      ],
    },
  },
  {
    icon: Home,
    titleKey: "services.real_estate.title",
    descKey: "services.real_estate.desc",
    features: {
      ar: [
        "بحث متقدم وفلاتر",
        "جولات افتراضية 360",
        "خرائط تفاعلية",
        "ربط مع الوكلاء",
      ],
      en: [
        "Advanced Search & Filters",
        "360 Virtual Tours",
        "Interactive Maps",
        "Agent Integration",
      ],
    },
  },
  {
    icon: Cloud,
    titleKey: "services.cloud.title",
    descKey: "services.cloud.desc",
    features: {
      ar: [
        "بنية تحتية مرنة",
        "نسخ احتياطي سحابي",
        "حماية البيانات",
        "توسع تلقائي",
      ],
      en: [
        "Flexible Infrastructure",
        "Cloud Backups",
        "Data Protection",
        "Auto Scaling",
      ],
    },
  },
  {
    icon: Brain,
    titleKey: "services.ai.title",
    descKey: "services.ai.desc",
    features: {
      ar: [
        "تحليل البيانات الضخمة",
        "Chatbots ذكية",
        "توقعات بالسوق",
        "أتمتة المهام",
      ],
      en: [
        "Big Data Analytics",
        "Smart Chatbots",
        "Market Predictions",
        "Task Automation",
      ],
    },
  },
  {
    icon: Lock,
    titleKey: "services.security.title",
    descKey: "services.security.desc",
    features: {
      ar: [
        "اختبار الاختراق",
        "تشفير متقدم",
        "جدران حماية",
        "مراقبة أمنية 24/7",
      ],
      en: [
        "Penetration Testing",
        "Advanced Encryption",
        "Firewalls",
        "24/7 Security Monitoring",
      ],
    },
  },
  {
    icon: MessageCircle,
    titleKey: "services.consulting.title",
    descKey: "services.consulting.desc",
    features: {
      ar: [
        "دراسة الجدوى التقنية",
        "التحول الرقمي",
        "استشارات الأمن السيبراني",
        "تحسين الأداء",
      ],
      en: [
        "Tech Feasibility Studies",
        "Digital Transformation",
        "Cybersecurity Consulting",
        "Performance Optimization",
      ],
    },
  },
];

const process = [
  {
    icon: Search,
    title: { ar: "الاستكشاف", en: "Discovery" },
    desc: {
      ar: "نفهم متطلباتك وأهدافك بعمق",
      en: "We deeply understand your requirements and goals",
    },
  },
  {
    icon: PenTool,
    title: { ar: "التصميم", en: "Design" },
    desc: {
      ar: "نصمم الحل المثالي لمشروعك",
      en: "We design the perfect solution for your project",
    },
  },
  {
    icon: Cpu,
    title: { ar: "التطوير", en: "Development" },
    desc: {
      ar: "ننفذ المشروع بأعلى معايير الجودة",
      en: "We execute the project with the highest quality standards",
    },
  },
  {
    icon: Rocket,
    title: { ar: "الإطلاق", en: "Launch" },
    desc: {
      ar: "نطلق مشروعك ونواصل دعمه",
      en: "We launch your project and continue supporting it",
    },
  },
];
</script>

<style scoped>
.feature-item {
  transition: transform 0.4s var(--ease-out), color 0.3s ease;
  transition-delay: var(--d);
}

.group:hover .feature-item {
  transform: translateX(4px);
  color: var(--text-primary);
}

[dir="rtl"] .group:hover .feature-item {
  transform: translateX(-4px);
}

.process__line {
  position: absolute;
  top: 32px;
  left: 12.5%;
  right: 12.5%;
  height: 1px;
  background: repeating-linear-gradient(90deg, rgba(0, 212, 255, 0.5) 0 8px, transparent 8px 16px);
}

.process__icon {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  border-color: rgba(0, 212, 255, 0.3);
  transition: transform 0.6s var(--ease-spring), box-shadow 0.3s ease;
}

.group:hover .process__icon {
  transform: translateY(-6px) rotate(-6deg) scale(1.08);
  box-shadow: 0 16px 40px -10px rgba(0, 212, 255, 0.45);
}
</style>
