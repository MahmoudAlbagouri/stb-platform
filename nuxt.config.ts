// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/color-mode",
      {
        classSuffix: "",
        preference: "dark",
        fallback: "dark",
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        locales: [
          {
            code: "ar",
            iso: "ar-EG",
            name: "العربية",
            dir: "rtl",
            file: "ar.json",
          },
          {
            code: "en",
            iso: "en-US",
            name: "English",
            dir: "ltr",
            file: "en.json",
          },
        ],
        defaultLocale: "ar",
        langDir: "locales/",
        strategy: "prefix_except_default",
      },
    ],
    "@vueuse/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "STB - Smart Technology & Business",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        {
          name: "description",
          content: "STB - منصة الخدمات التكنولوجية والأعمال الذكية",
        },
        { name: "theme-color", content: "#060d1a" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          // Only the weights actually used on the site (smaller font download).
          href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Syne:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap",
        },
      ],
      script: [
        // Marks JS as available before first paint so scroll-reveal elements
        // start hidden only when they can actually be revealed.
        { innerHTML: "document.documentElement.classList.add('js')", tagPosition: "head" },
      ],
    },
  },

  vite: {
    optimizeDeps: {
      include: ["three"],
    },
    build: {
      // three.js lives in its own lazily-loaded chunk.
      chunkSizeWarningLimit: 800,
    },
  },
});
