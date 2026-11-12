// Shared WebGL stage used by every 3D scene on the site.
// Handles: renderer setup, DPR capping, resize, pausing when the canvas is
// off-screen or the tab is hidden, smoothed pointer tracking, reduced motion
// and full GPU-resource disposal.
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  type Material,
  type Object3D,
  type Texture,
} from "three";

export interface StageOptions {
  fov?: number;
  z?: number;
  maxDpr?: number;
  antialias?: boolean;
  /** Render every Nth frame (2 = ~30fps on a 60Hz screen). */
  frameSkip?: number;
}

export type FrameCallback = (time: number, delta: number) => void;
export type ResizeCallback = (width: number, height: number) => void;

export interface Stage {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  /** Smoothed pointer position in [-1, 1] relative to the viewport. */
  pointer: { x: number; y: number; velocity: number };
  reducedMotion: boolean;
  isMobile: boolean;
  onFrame: (cb: FrameCallback) => void;
  onResize: (cb: ResizeCallback) => void;
  start: () => void;
  /** Redraw once when the loop is paused (e.g. after a theme change). */
  invalidate: () => void;
  dispose: () => void;
}

const disposeMaterial = (material: Material) => {
  for (const value of Object.values(material)) {
    if (value && (value as Texture).isTexture) (value as Texture).dispose();
  }
  const uniforms = (material as any).uniforms as
    | Record<string, { value: unknown }>
    | undefined;
  if (uniforms) {
    for (const u of Object.values(uniforms)) {
      if (u.value && (u.value as Texture).isTexture) (u.value as Texture).dispose();
    }
  }
  material.dispose();
};

export const disposeObject = (root: Object3D) => {
  root.traverse((obj: any) => {
    obj.geometry?.dispose?.();
    const m = obj.material;
    if (Array.isArray(m)) m.forEach(disposeMaterial);
    else if (m) disposeMaterial(m);
  });
};

export function createStage(
  container: HTMLElement,
  opts: StageOptions = {},
): Stage {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

  const renderer = new WebGLRenderer({
    antialias: opts.antialias ?? false,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, opts.maxDpr ?? 1.5),
  );

  const canvas = renderer.domElement;
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block;";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(opts.fov ?? 45, 1, 0.1, 100);
  camera.position.z = opts.z ?? 6;

  // ---------- Pointer ----------
  const pointer = { x: 0, y: 0, velocity: 0 };
  let targetX = 0;
  let targetY = 0;
  const onPointerMove = (e: PointerEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -((e.clientY / window.innerHeight) * 2 - 1);
    pointer.velocity = Math.min(
      pointer.velocity + Math.hypot(nx - targetX, ny - targetY) * 2,
      1.5,
    );
    targetX = nx;
    targetY = ny;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // ---------- Loop ----------
  const frameCbs: FrameCallback[] = [];
  const resizeCbs: ResizeCallback[] = [];
  const frameSkip = Math.max(1, opts.frameSkip ?? 1);
  let elapsed = 0;
  let last = 0;
  let frame = 0;
  let running = false;
  let started = false;

  const renderFrame = (delta: number) => {
    const k = Math.min(1, delta * 4);
    pointer.x += (targetX - pointer.x) * k;
    pointer.y += (targetY - pointer.y) * k;
    pointer.velocity *= Math.max(0, 1 - delta * 2.5);
    for (const cb of frameCbs) cb(elapsed, delta);
    renderer.render(scene, camera);
  };

  const tick = (now: number) => {
    frame++;
    if (frame % frameSkip !== 0) return;
    const delta = Math.min((now - last) / 1000, 0.1);
    last = now;
    elapsed += delta;
    renderFrame(delta);
  };

  // Reduced motion: draw a single settled frame instead of animating.
  const renderStatic = () => {
    elapsed = Math.max(elapsed, 4);
    renderFrame(1);
  };

  let inView = true;
  let pageVisible = !document.hidden;

  const update = () => {
    if (!started) return;
    if (reducedMotion) {
      renderStatic();
      return;
    }
    const should = inView && pageVisible;
    if (should && !running) {
      running = true;
      last = performance.now();
      renderer.setAnimationLoop(tick);
    } else if (!should && running) {
      running = false;
      renderer.setAnimationLoop(null);
    }
  };

  // ---------- Resize ----------
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    for (const cb of resizeCbs) cb(w, h);
    if (started && !running) renderStatic();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      update();
    },
    { rootMargin: "120px" },
  );
  io.observe(container);

  const onVisibility = () => {
    pageVisible = !document.hidden;
    update();
  };
  document.addEventListener("visibilitychange", onVisibility);

  return {
    renderer,
    scene,
    camera,
    pointer,
    reducedMotion,
    isMobile,
    onFrame: (cb) => frameCbs.push(cb),
    onResize: (cb) => resizeCbs.push(cb),
    start: () => {
      started = true;
      resize();
      update();
    },
    invalidate: () => {
      if (started && !running) renderStatic();
    },
    dispose: () => {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      disposeObject(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
