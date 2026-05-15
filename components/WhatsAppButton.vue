<template>
  <div class="whatsapp-wrap">
    <!-- Tooltip -->
    <Transition name="tooltip">
      <div v-if="showTooltip" class="wa-tooltip glass">
        <span class="text-xs font-semibold">
          {{
            $i18n.locale === "ar" ? "تحدث معنا على واتساب" : "Chat on WhatsApp"
          }}
        </span>
      </div>
    </Transition>

    <a
      href="https://wa.me/+966555688143"
      target="_blank"
      rel="noopener noreferrer"
      class="wa-btn"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <!-- WhatsApp Icon SVG -->
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </svg>

      <!-- Pulse ring -->
      <span class="wa-pulse" />
    </a>
  </div>
</template>

<script setup>
const showTooltip = ref(false);
</script>

<style scoped>
.whatsapp-wrap {
  position: fixed;
  bottom: 28px;
  left: 28px;
  z-index: 999;
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

[dir="rtl"] .whatsapp-wrap {
  left: auto;
  right: 28px;
}

.wa-btn {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25d366, #128c7e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  text-decoration: none;
}

.wa-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 35px rgba(37, 211, 102, 0.5);
}

.wa-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(37, 211, 102, 0.5);
  animation: wa-ring 2s ease-out infinite;
}

@keyframes wa-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.wa-tooltip {
  position: absolute;
  right: 80px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 12px;
  color: var(--text-primary);
  white-space: nowrap;
  pointer-events: none;
  margin-bottom: 8px;
}

/* Tooltip transition */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
[dir="rtl"] .tooltip-enter-from,
[dir="rtl"] .tooltip-leave-to {
  transform: translateX(8px);
}
</style>
