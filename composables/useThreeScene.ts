import type { Ref } from "vue";

interface SceneHandle {
  setTheme?: (dark: boolean) => void;
  dispose: () => void;
}

let webglSupport: boolean | null = null;
const supportsWebGL2 = () => {
  if (webglSupport !== null) return webglSupport;
  try {
    const c = document.createElement("canvas");
    webglSupport = !!c.getContext("webgl2");
  } catch {
    webglSupport = false;
  }
  return webglSupport;
};

/**
 * Mounts a Three.js scene into `target` on the client only.
 * The scene module is loaded with a dynamic import, so three.js never lands
 * in the initial bundle, and (optionally) only once the browser is idle.
 * Keeps the scene in sync with the color mode and disposes it on unmount.
 */
export function useThreeScene<T extends SceneHandle>(
  target: Ref<HTMLElement | null>,
  factory: (el: HTMLElement, dark: boolean) => Promise<T>,
  opts: { idle?: boolean } = {},
) {
  const colorMode = useColorMode();
  const instance = shallowRef<T | null>(null);
  const ready = ref(false);
  let disposed = false;

  const isDark = () => colorMode.value !== "light";

  onMounted(() => {
    const start = async () => {
      if (disposed || !target.value || !supportsWebGL2()) return;
      try {
        const scene = await factory(target.value, isDark());
        if (disposed) {
          scene.dispose();
          return;
        }
        instance.value = scene;
        requestAnimationFrame(() => (ready.value = true));
      } catch (err) {
        console.warn("[stb-3d] scene failed to start", err);
      }
    };
    if (opts.idle && "requestIdleCallback" in window) {
      window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      start();
    }
  });

  watch(
    () => colorMode.value,
    () => instance.value?.setTheme?.(isDark()),
  );

  onBeforeUnmount(() => {
    disposed = true;
    instance.value?.dispose();
    instance.value = null;
  });

  return { instance, ready };
}
