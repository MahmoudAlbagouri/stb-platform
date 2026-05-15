<template>
  <article class="gradient-border overflow-hidden card-hover group cursor-pointer">
    <!-- Thumbnail -->
    <div
      class="h-48 flex items-center justify-center relative overflow-hidden"
      :class="bgGradient"
    >
      <div class="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">{{ emoji }}</div>
      <div class="absolute inset-0 bg-gradient-to-t from-stb-mid/80 to-transparent" />
      <div class="absolute top-3 start-3">
        <span class="tag text-[10px]">{{ category }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6">
      <div class="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-3">
        <span class="flex items-center gap-1">
          <Calendar class="w-3 h-3" /> {{ date }}
        </span>
        <span class="flex items-center gap-1">
          <Clock class="w-3 h-3" /> {{ readTime }}
        </span>
        <span v-if="views" class="flex items-center gap-1">
          <Eye class="w-3 h-3" /> {{ views }}
        </span>
      </div>

      <h3 class="font-bold text-[var(--text-primary)] mb-2 group-hover:text-stb-cyan transition-colors line-clamp-2">
        {{ title }}
      </h3>
      <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
        {{ excerpt }}
      </p>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-stb-blue to-stb-cyan flex items-center justify-center text-xs font-bold text-white">
            {{ authorInitial }}
          </div>
          <span class="text-xs text-[var(--text-secondary)]">{{ author }}</span>
        </div>
        <span class="text-stb-cyan text-xs font-semibold flex items-center gap-1">
          {{ readMoreText }}
          <ArrowRight class="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-vue-next'

defineProps({
  emoji: String,
  bgGradient: { type: String, default: 'from-stb-navy via-stb-mid to-stb-deep bg-gradient-to-br' },
  category: String,
  date: String,
  readTime: String,
  views: String,
  title: String,
  excerpt: String,
  author: String,
  authorInitial: String,
  readMoreText: { type: String, default: 'Read More' }
})
</script>
