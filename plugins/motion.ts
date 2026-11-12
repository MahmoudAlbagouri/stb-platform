// Lightweight motion directives shared by the whole site.
//
//   v-reveal            fade/slide in when scrolled into view (one shared observer)
//   v-reveal:start      variants: up (default) | start | end | zoom | fade
//   v-reveal="0.15"     delay in seconds (for staggering lists)
//   v-tilt              3D tilt + cursor spotlight on cards (fine pointers only)
//   v-magnetic          buttons that lean toward the cursor
//
// Reveal uses the Web Animations API on the independent `translate`/`scale`
// properties, so it never fights with an element's own hover `transform`
// transitions, and only data-attributes are touched (safe with Vue patches).
import type { Directive } from "vue";

type RevealVariant = "up" | "start" | "end" | "zoom" | "fade";
interface RevealConfig {
  variant: RevealVariant;
  delay: number;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const configs = new WeakMap<Element, RevealConfig>();
let observer: IntersectionObserver | null = null;

const revealFrames = (variant: RevealVariant): Keyframe[] => {
  const rtl = document.documentElement.dir === "rtl";
  const side = (sign: number) => `${sign * (rtl ? -1 : 1) * 64}px 0`;
  switch (variant) {
    case "start":
      return [{ opacity: 0, translate: side(-1) }, { opacity: 1, translate: "0 0" }];
    case "end":
      return [{ opacity: 0, translate: side(1) }, { opacity: 1, translate: "0 0" }];
    case "zoom":
      return [
        { opacity: 0, scale: "0.9", translate: "0 24px" },
        { opacity: 1, scale: "1", translate: "0 0" },
      ];
    case "fade":
      return [{ opacity: 0 }, { opacity: 1 }];
    default:
      return [{ opacity: 0, translate: "0 48px" }, { opacity: 1, translate: "0 0" }];
  }
};

const reveal = (el: HTMLElement) => {
  const cfg = configs.get(el) ?? { variant: "up", delay: 0 };
  if (!prefersReducedMotion() && typeof el.animate === "function") {
    el.animate(revealFrames(cfg.variant), {
      duration: 900,
      delay: cfg.delay * 1000,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "backwards",
    });
  }
  el.setAttribute("data-revealed", "");
};

const getObserver = () => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer!.unobserve(entry.target);
          reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
  }
  return observer;
};

const revealDirective: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({ "data-reveal": "" }),
  mounted(el, binding) {
    el.setAttribute("data-reveal", "");
    configs.set(el, {
      variant: (binding.arg as RevealVariant) || "up",
      delay: Number(binding.value) || 0,
    });
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-revealed", "");
      return;
    }
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
    configs.delete(el);
  },
};

// ---------- Tilt + spotlight ----------
type Cleanup = () => void;
const cleanups = new WeakMap<HTMLElement, Cleanup>();

const tiltDirective: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, binding) {
    if (!finePointer() || prefersReducedMotion()) return;
    const max = binding.value ?? 8;
    let rect: DOMRect | null = null;
    let raf = 0;
    let px = 0.5;
    let py = 0.5;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    };
    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.setAttribute("data-tilting", "");
    };
    const onMove = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      px = (e.clientX - rect.left) / rect.width;
      py = (e.clientY - rect.top) / rect.height;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      rect = null;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.removeAttribute("data-tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    cleanups.set(el, () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    });
  },
  unmounted(el) {
    cleanups.get(el)?.();
    cleanups.delete(el);
  },
};

// ---------- Magnetic buttons ----------
const magneticCleanups = new WeakMap<HTMLElement, Cleanup>();

const magneticDirective: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, binding) {
    if (!finePointer() || prefersReducedMotion()) return;
    const strength = binding.value ?? 0.3;
    let raf = 0;
    let dx = 0;
    let dy = 0;
    const apply = () => {
      raf = 0;
      el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      dx = (e.clientX - (r.left + r.width / 2)) * strength;
      dy = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.style.translate = "";
    };
    el.setAttribute("data-magnetic", "");
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    magneticCleanups.set(el, () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    });
  },
  unmounted(el) {
    magneticCleanups.get(el)?.();
    magneticCleanups.delete(el);
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", revealDirective);
  nuxtApp.vueApp.directive("tilt", tiltDirective);
  nuxtApp.vueApp.directive("magnetic", magneticDirective);
});
