<template>
  <div class="pt-28 pb-20">
    <!-- Header -->
    <section class="py-16 text-center relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="tag mb-6 inline-flex">
          <Mail class="w-3 h-3 me-1.5" />
          {{ $t("nav.contact") }}
        </div>
        <h1 class="section-title mb-4">
          <span class="gradient-text">{{ $t("contact.title") }}</span>
        </h1>
        <div class="section-divider" />
        <p class="text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
          {{ $t("contact.subtitle") }}
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-3 gap-10">
        <!-- Contact Info -->
        <div class="space-y-6 reveal">
          <!-- Info Cards -->
          <div
            v-for="(info, i) in contactInfo"
            :key="i"
            class="gradient-border p-6 card-hover"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-stb-blue/20 to-stb-cyan/20 border border-stb-cyan/20 flex items-center justify-center flex-shrink-0"
              >
                <component :is="info.icon" class="w-5 h-5 text-stb-cyan" />
              </div>
              <div>
                <div
                  class="text-xs text-[var(--text-secondary)] mb-1 font-mono uppercase tracking-widest"
                >
                  {{ info.label[$i18n.locale] }}
                </div>
                <div class="font-semibold text-[var(--text-primary)]">
                  {{ info.value[$i18n.locale] }}
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="gradient-border p-6">
            <h3 class="font-bold text-[var(--text-primary)] mb-4">
              {{ $i18n.locale === "ar" ? "تابعنا على" : "Follow Us On" }}
            </h3>
            <div class="grid grid-cols-5 gap-2">
              <a
                v-for="s in socials"
                :key="s.name"
                :href="s.url"
                target="_blank"
                class="social-link"
                :title="s.name"
              >
                <component :is="s.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="gradient-border overflow-hidden rounded-2xl">
            <div
              class="h-40 bg-gradient-to-br from-stb-navy to-stb-mid flex items-center justify-center relative"
            >
              <MapPin class="w-10 h-10 text-stb-cyan animate-bounce" />
              <div class="absolute inset-0 opacity-10">
                <div class="grid-lines w-full h-full" />
              </div>
              <div class="absolute bottom-3 text-xs text-stb-cyan font-mono">
                {{ $t("contact.address") }}
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2 reveal" style="animation-delay: 0.2s">
          <div class="gradient-border p-8">
            <h2
              class="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2"
            >
              <MessageSquare class="w-5 h-5 text-stb-cyan" />
              {{ $i18n.locale === "ar" ? "أرسل رسالتك" : "Send Your Message" }}
            </h2>

            <form class="space-y-5" @submit.prevent="sendMessage">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    class="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                    >{{ $t("contact.name") }}</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="stb-input"
                    :placeholder="$t('contact.name')"
                    required
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                    >{{ $t("contact.email") }}</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    class="stb-input"
                    :placeholder="$t('contact.email')"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                  >{{ $t("contact.phone") }}</label
                >
                <input
                  v-model="form.phone"
                  type="tel"
                  class="stb-input"
                  :placeholder="$t('contact.phone')"
                />
              </div>

              <!-- Subject -->
              <div>
                <label
                  class="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                >
                  {{ $i18n.locale === "ar" ? "الموضوع" : "Subject" }}
                </label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    v-for="s in subjects"
                    :key="s.key"
                    type="button"
                    class="py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-200"
                    :class="
                      form.subject === s.key
                        ? 'border-stb-cyan bg-stb-cyan/10 text-stb-cyan'
                        : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-stb-cyan/50'
                    "
                    @click="form.subject = s.key"
                  >
                    {{ s.label[$i18n.locale] }}
                  </button>
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-semibold text-[var(--text-primary)] mb-2"
                  >{{ $t("contact.message") }}</label
                >
                <textarea
                  v-model="form.message"
                  rows="5"
                  class="stb-input resize-none"
                  :placeholder="$t('contact.message')"
                  required
                />
              </div>

              <button
                type="submit"
                class="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base"
                :disabled="sending"
              >
                <Loader v-if="sending" class="w-5 h-5 animate-spin" />
                <Send v-else class="w-5 h-5" />
                {{
                  sending
                    ? $i18n.locale === "ar"
                      ? "جاري الإرسال..."
                      : "Sending..."
                    : $t("contact.send")
                }}
              </button>

              <!-- Success message -->
              <Transition name="fade">
                <div
                  v-if="sent"
                  class="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                >
                  <CheckCircle class="w-5 h-5 flex-shrink-0" />
                  {{
                    $i18n.locale === "ar"
                      ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
                      : "Your message was sent successfully! We will contact you soon."
                  }}
                </div>
              </Transition>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Loader,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Music2, // TikTok Icon in Lucide
  Ghost, // Snapchat Icon in Lucide
} from "lucide-vue-next";

const form = ref({
  name: "",
  email: "",
  phone: "",
  subject: "general",
  message: "",
});
const sending = ref(false);
const sent = ref(false);

const contactInfo = [
  {
    icon: MapPin,
    label: { ar: "العنوان", en: "Address" },
    value: { ar: "القاهرة، مصر", en: "Cairo, Egypt" },
  },
  {
    icon: Mail,
    label: { ar: "البريد الإلكتروني", en: "Email" },
    value: { ar: "info@stb-tech.com", en: "info@stb-tech.com" },
  },
  {
    icon: Phone,
    label: { ar: "الهاتف", en: "Phone" },
    value: { ar: "+20 100 000 0000", en: "+20 100 000 0000" },
  },
];

const subjects = [
  { key: "general", label: { ar: "عام", en: "General" } },
  { key: "project", label: { ar: "مشروع", en: "Project" } },
  { key: "support", label: { ar: "دعم", en: "Support" } },
  { key: "partnership", label: { ar: "شراكة", en: "Partnership" } },
];

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
const sendMessage = async () => {
  sending.value = true;
  await new Promise((r) => setTimeout(r, 2000));
  sending.value = false;
  sent.value = true;
  form.value = {
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  };
  setTimeout(() => {
    sent.value = false;
  }, 5000);
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
