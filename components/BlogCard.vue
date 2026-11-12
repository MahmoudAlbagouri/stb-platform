<template>
  <component
    :is="to ? NuxtLink : 'article'"
    :to="to || undefined"
    v-tilt="5"
    class="blog-card gradient-border card-3d overflow-hidden group cursor-pointer flex flex-col"
  >
    <!-- Generative thumbnail -->
    <div class="blog-card__thumb" :style="{ '--accent': accent }">
      <div class="blog-card__grid" />
      <div class="blog-card__orb" />
      <component
        :is="icon"
        v-if="icon"
        class="blog-card__icon"
        stroke-width="1.25"
      />
      <span v-else class="blog-card__emoji">{{ emoji }}</span>
      <div class="absolute top-3 start-3 z-10">
        <span class="tag text-[10px]">{{ category }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 flex flex-col flex-1">
      <div class="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)] mb-3">
        <span class="flex items-center gap-1"><Calendar class="w-3 h-3" /> {{ date }}</span>
        <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ readTime }}</span>
        <span v-if="views" class="flex items-center gap-1"><Eye class="w-3 h-3" /> {{ views }}</span>
      </div>

      <h3
        class="font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-stb-cyan transition-colors duration-300 line-clamp-2"
      >
        {{ title }}
      </h3>
      <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 line-clamp-2">
        {{ excerpt }}
      </p>

      <div class="flex items-center justify-between mt-auto">
        <div v-if="author" class="flex items-center gap-2">
          <div
            class="w-7 h-7 rounded-full bg-gradient-to-br from-stb-blue to-stb-cyan flex items-center justify-center text-xs font-bold text-white"
          >
            {{ authorInitial }}
          </div>
          <span class="text-xs text-[var(--text-secondary)]">{{ author }}</span>
        </div>
        <span v-else />
        <span class="text-stb-cyan text-xs font-semibold flex items-center gap-1.5">
          {{ readMoreText }}
          <span class="blog-card__arrow">
            <ArrowRight class="w-3.5 h-3.5" :class="rtl ? 'rotate-180' : ''" />
          </span>
        </span>
      </div>
    </div>
  </component>
</template>

<script setup>
import { Calendar, Clock, Eye, ArrowRight } from "lucide-vue-next";
import { NuxtLink } from "#components";

defineProps({
  to: { type: String, default: "" },
  icon: { type: [Object, Function], default: null },
  emoji: { type: String, default: "" },
  accent: { type: String, default: "#1e6fd9" },
  category: String,
  date: String,
  readTime: String,
  views: String,
  title: String,
  excerpt: String,
  author: String,
  authorInitial: String,
  readMoreText: { type: String, default: "Read More" },
  rtl: { type: Boolean, default: false },
});
</script>

<style scoped>
.blog-card__thumb {
  position: relative;
  height: 190px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(160deg, #0d1f3c, #060d1a);
  background:
    radial-gradient(120% 90% at 80% 0%, color-mix(in srgb, var(--accent) 55%, transparent), transparent 60%),
    linear-gradient(160deg, #0d1f3c, #060d1a);
}

.blog-card__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.08) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(circle at center, #000, transparent 75%);
  mask-image: radial-gradient(circle at center, #000, transparent 75%);
  transform: perspective(400px) rotateX(55deg) scale(1.6) translateY(10%);
  transform-origin: bottom;
  transition: transform 1.2s var(--ease-out);
}

.group:hover .blog-card__grid {
  transform: perspective(400px) rotateX(55deg) scale(1.6) translateY(4%);
}

.blog-card__orb {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.45;
  filter: blur(10px);
}

.blog-card__icon {
  position: relative;
  width: 64px;
  height: 64px;
  color: #e8f0ff;
  filter: drop-shadow(0 0 18px rgba(0, 212, 255, 0.6));
  transition: transform 0.7s var(--ease-spring);
}

.group:hover .blog-card__icon {
  transform: translateY(-6px) scale(1.12) rotate(-6deg);
}

.blog-card__emoji {
  position: relative;
  font-size: 3.5rem;
  transition: transform 0.7s var(--ease-spring);
}

.group:hover .blog-card__emoji {
  transform: scale(1.15);
}

.blog-card__arrow {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(0, 212, 255, 0.35);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.4s var(--ease-spring);
}

.group:hover .blog-card__arrow {
  background: var(--stb-cyan);
  color: #060d1a;
  transform: scale(1.1);
}
</style>
