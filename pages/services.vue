<template>
  <div class="pt-28 pb-20">
    <!-- Page Header -->
    <section class="relative py-20 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-stb-blue/5 to-stb-cyan/5"
      />
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div class="tag mb-6 inline-flex">
          <Layers class="w-3 h-3 me-1.5" />
          {{ $t("services.title") }}
        </div>
        <h1 class="section-title mb-4">
          <span class="gradient-text">{{ $t("services.title") }}</span>
        </h1>
        <div class="section-divider" />
        <p class="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto text-lg">
          {{ $t("services.subtitle") }}
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, i) in services"
          :key="i"
          class="gradient-border p-8 card-hover reveal group"
          :style="`animation-delay:${i * 0.05}s`"
        >
          <div class="service-icon-wrap w-16 h-16 mb-5">
            <component :is="service.icon" class="w-8 h-8 text-stb-cyan" />
          </div>
          <h3 class="text-xl font-bold text-[var(--text-primary)] mb-3">
            {{ $t(service.titleKey) }}
          </h3>
          <p
            class="text-[var(--text-secondary)] leading-relaxed mb-5 text-sm min-h-[40px]"
          >
            {{ $t(service.descKey) }}
          </p>

          <!-- Features List -->
          <ul class="space-y-2 mb-6">
            <li
              v-for="(feat, j) in service.features[$i18n.locale]"
              :key="j"
              class="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
            >
              <CheckCircle
                class="w-3.5 h-3.5 text-stb-cyan flex-shrink-0 mt-0.5"
              />
              <span>{{ feat }}</span>
            </li>
          </ul>

          <NuxtLink
            :to="localePath('/contact')"
            class="btn-primary text-sm inline-flex items-center gap-2 w-full justify-center"
          >
            {{ $i18n.locale === "ar" ? "استفسر الآن" : "Enquire Now" }}
            <ArrowRight
              class="w-4 h-4"
              :class="$i18n.locale === 'ar' ? 'rotate-180' : ''"
            />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-14 reveal">
        <h2 class="section-title mb-2">
          <span class="gradient-text">{{
            $i18n.locale === "ar" ? "كيف نعمل؟" : "How We Work"
          }}</span>
        </h2>
        <div class="section-divider" />
      </div>
      <div class="grid md:grid-cols-4 gap-6">
        <div
          v-for="(step, i) in process"
          :key="i"
          class="text-center reveal"
          :style="`animation-delay:${i * 0.15}s`"
        >
          <div class="relative mb-6 inline-flex">
            <div
              class="w-16 h-16 rounded-2xl glass border border-stb-cyan/20 flex items-center justify-center"
            >
              <component :is="step.icon" class="w-7 h-7 text-stb-cyan" />
            </div>
            <div
              class="absolute -top-2 -end-2 w-6 h-6 rounded-full bg-gradient-to-br from-stb-blue to-stb-cyan flex items-center justify-center text-xs font-black text-white"
            >
              {{ i + 1 }}
            </div>
          </div>
          <h3 class="font-bold text-[var(--text-primary)] mb-2">
            {{ step.title[$i18n.locale] }}
          </h3>
          <p class="text-sm text-[var(--text-secondary)]">
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
