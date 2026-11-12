<template>
  <div class="curtain" :data-state="state" aria-hidden="true">
    <div class="curtain__panel curtain__panel--a" />
    <div class="curtain__panel curtain__panel--b">
      <img src="/logo.png" alt="" width="335" height="314" class="curtain__logo" />
    </div>
  </div>
</template>

<script setup>
// Two-layer curtain that sweeps over the screen between routes.
// The router waits for the cover to finish, the new page renders underneath,
// then the curtain lifts once Nuxt reports `page:finish`.
const COVER_MS = 400;

const state = ref("idle"); // idle | cover | reveal
const router = useRouter();
const nuxtApp = useNuxtApp();

let removeBefore;
let removeAfter;
let unhookFinish;
let fallbackTimer;
let idleTimer;

const reveal = () => {
  if (state.value !== "cover") return;
  clearTimeout(fallbackTimer);
  unhookFinish?.();
  unhookFinish = null;
  state.value = "reveal";
  idleTimer = setTimeout(() => (state.value = "idle"), 750);
};

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  removeBefore = router.beforeEach((to, from) => {
    if (to.path === from.path) return;
    clearTimeout(idleTimer);
    state.value = "cover";
    return new Promise((resolve) => setTimeout(resolve, COVER_MS));
  });

  removeAfter = router.afterEach((_to, _from, failure) => {
    if (state.value !== "cover") return;
    if (failure) {
      state.value = "idle";
      return;
    }
    unhookFinish?.();
    unhookFinish = nuxtApp.hook("page:finish", () =>
      requestAnimationFrame(() => requestAnimationFrame(reveal)),
    );
    fallbackTimer = setTimeout(reveal, 1500);
  });
});

onBeforeUnmount(() => {
  removeBefore?.();
  removeAfter?.();
  unhookFinish?.();
  clearTimeout(fallbackTimer);
  clearTimeout(idleTimer);
});
</script>
