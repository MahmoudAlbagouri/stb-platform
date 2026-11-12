<template>
  <div class="pt-24 pb-20">
    <PageHeader
      :icon="Mail"
      :tag-text="$t('nav.contact')"
      :title="$t('contact.title')"
      :subtitle="$t('contact.subtitle')"
      variant="contact"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-3 gap-8 lg:gap-10">
        <!-- Contact Info -->
        <div class="space-y-5">
          <div
            v-for="(info, i) in contactInfo"
            :key="i"
            v-reveal:start="i * 0.08"
          >
            <component
              :is="info.href ? 'a' : 'div'"
              :href="info.href"
              v-tilt="6"
              class="gradient-border card-3d p-6 block group"
            >
              <div class="flex items-start gap-4">
                <div class="info-icon">
                  <component :is="info.icon" class="w-5 h-5 text-stb-cyan" />
                </div>
                <div class="min-w-0">
                  <div class="text-xs text-[var(--text-secondary)] mb-1 font-mono uppercase tracking-widest">
                    {{ info.label[$i18n.locale] }}
                  </div>
                  <div
                    class="font-semibold text-[var(--text-primary)] break-words group-hover:text-stb-cyan transition-colors"
                    :dir="info.ltr ? 'ltr' : undefined"
                  >
                    {{ info.value[$i18n.locale] }}
                  </div>
                </div>
              </div>
            </component>
          </div>

          <!-- Social Media -->
          <div v-reveal:start="0.25" class="gradient-border p-6">
            <h3 class="font-bold text-[var(--text-primary)] mb-4">
              {{ isAr ? "تابعنا على" : "Follow Us On" }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="s in socials"
                :key="s.name"
                :href="s.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                :title="s.name"
                :aria-label="s.name"
              >
                <component :is="s.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Map -->
          <div v-reveal:start="0.32" class="gradient-border overflow-hidden">
            <div class="h-44 w-full relative rounded-[20px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14841.520977239106!2d39.1822348!3d21.6128916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d0cf270b7863%3A0x79f15edcaedcadf7!2z2K3ZiiDYp9mE2LHYqNmI2Kkg2KzYr9ip!5e0!3m2!1sar!2ssa!4v1715764000000!5m2!1sar!2ssa"
                class="absolute inset-0 w-full h-full border-0 map-frame"
                allowfullscreen=""
                loading="lazy"
                title="STB location map"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <div class="absolute bottom-0 left-0 right-0 bg-stb-navy/80 backdrop-blur-sm py-1.5 text-center">
                <div class="text-[10px] text-stb-cyan font-mono uppercase tracking-wider">
                  {{ $t("contact.address") }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div v-reveal:end="0.1" class="lg:col-span-2">
          <div class="gradient-border p-6 sm:p-10 form-card">
            <div class="form-card__glow" aria-hidden="true" />
            <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-3">
              <span class="info-icon !w-10 !h-10"><MessageSquare class="w-5 h-5 text-stb-cyan" /></span>
              {{ isAr ? "أرسل رسالتك" : "Send Your Message" }}
            </h2>
            <p class="text-sm text-[var(--text-secondary)] mb-8">
              {{ isAr ? "نرد عادةً خلال 24 ساعة عمل." : "We usually reply within one business day." }}
            </p>

            <form class="space-y-5" @submit.prevent="sendMessage">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="c-name" class="field-label">{{ $t("contact.name") }}</label>
                  <input
                    id="c-name"
                    v-model="form.name"
                    type="text"
                    class="stb-input"
                    autocomplete="name"
                    :placeholder="$t('contact.name')"
                    required
                  />
                </div>
                <div>
                  <label for="c-email" class="field-label">{{ $t("contact.email") }}</label>
                  <input
                    id="c-email"
                    v-model="form.email"
                    type="email"
                    class="stb-input"
                    autocomplete="email"
                    :placeholder="$t('contact.email')"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="c-phone" class="field-label">{{ $t("contact.phone") }}</label>
                <input
                  id="c-phone"
                  v-model="form.phone"
                  type="tel"
                  class="stb-input"
                  autocomplete="tel"
                  :placeholder="$t('contact.phone')"
                />
              </div>

              <!-- Subject -->
              <div>
                <span class="field-label">{{ isAr ? "الموضوع" : "Subject" }}</span>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" role="radiogroup">
                  <button
                    v-for="s in subjects"
                    :key="s.key"
                    type="button"
                    role="radio"
                    :aria-checked="form.subject === s.key"
                    class="choice-btn"
                    :class="{ 'is-selected': form.subject === s.key }"
                    @click="form.subject = s.key"
                  >
                    {{ s.label[$i18n.locale] }}
                  </button>
                </div>
              </div>

              <div>
                <label for="c-message" class="field-label">{{ $t("contact.message") }}</label>
                <textarea
                  id="c-message"
                  v-model="form.message"
                  rows="5"
                  class="stb-input resize-none"
                  :placeholder="$t('contact.message')"
                  required
                />
              </div>

              <button
                type="submit"
                class="btn-primary w-full gap-2 !py-4 text-base"
                :disabled="sending"
              >
                <Loader v-if="sending" class="w-5 h-5 animate-spin" />
                <Send v-else class="w-5 h-5" :class="isAr ? '-scale-x-100' : ''" />
                {{ sending ? (isAr ? "جاري الإرسال..." : "Sending...") : $t("contact.send") }}
              </button>

              <Transition name="fade">
                <div
                  v-if="sent"
                  class="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                  role="status"
                >
                  <CheckCircle class="w-5 h-5 flex-shrink-0" />
                  {{
                    isAr
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
  Music2, // TikTok
  Ghost, // Snapchat
} from "lucide-vue-next";

const { locale } = useI18n();
const isAr = computed(() => locale.value === "ar");

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
    value: {
      ar: "حي الربوة - جدة - السعودية",
      en: "Ar Rabwah Dist., Jeddah, Saudi Arabia",
    },
  },
  {
    icon: Mail,
    href: "mailto:info.stb.systems@gmail.com",
    ltr: true,
    label: { ar: "البريد الإلكتروني", en: "Email" },
    value: {
      ar: "info.stb.systems@gmail.com",
      en: "info.stb.systems@gmail.com",
    },
  },
  {
    icon: Phone,
    href: "tel:+966555688143",
    ltr: true,
    label: { ar: "الهاتف", en: "Phone" },
    value: {
      ar: "+966 55 568 8143",
      en: "+966 55 568 8143",
    },
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
</script>

<style scoped>
.info-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(30, 111, 217, 0.2), rgba(0, 212, 255, 0.2));
  border: 1px solid rgba(0, 212, 255, 0.22);
  transition: transform 0.5s var(--ease-spring);
}

.group:hover .info-icon {
  transform: rotate(-8deg) scale(1.08);
}

.form-card {
  overflow: hidden;
}

.form-card__glow {
  position: absolute;
  top: -40%;
  inset-inline-end: -20%;
  width: 70%;
  height: 80%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.12), transparent 70%);
  pointer-events: none;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.choice-btn {
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    background-color 0.25s ease,
    transform 0.3s var(--ease-spring);
}

.choice-btn:hover {
  border-color: rgba(0, 212, 255, 0.5);
  transform: translateY(-2px);
}

.choice-btn.is-selected {
  border-color: var(--stb-cyan);
  background: rgba(0, 212, 255, 0.1);
  color: var(--stb-cyan);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.08);
}

.dark .map-frame {
  filter: invert(0.9) hue-rotate(180deg) saturate(0.7) brightness(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s var(--ease-out);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
