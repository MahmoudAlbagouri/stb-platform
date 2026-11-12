// Home hero centerpiece: a living, noise-displaced energy core carrying the
// STB logo, wrapped in a wireframe shell, dashed orbit rings with glowing
// satellites, a twinkling particle halo and floating hologram solids.
// Pointer tilts the whole rig, fast pointer movement "energises" the core,
// clicking sends a pulse, and scrolling pushes the rig away.
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DodecahedronGeometry,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineDashedMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  Points,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TetrahedronGeometry,
  TextureLoader,
  TorusGeometry,
} from "three";
import { createStage } from "./stage";
import {
  BRAND,
  NOISE_GLSL,
  clamp01,
  createGlowTexture,
  createHoloMaterial,
  createPointsMaterial,
  easeOutBack,
  shellPoints,
  themeColors,
} from "./materials";

export interface HeroScene {
  setTheme: (dark: boolean) => void;
  dispose: () => void;
}

const FIT_RADIUS = 3.15;

export function createHeroScene(
  container: HTMLElement,
  opts: { dark: boolean; logoUrl: string },
): HeroScene {
  const stage = createStage(container, { fov: 38, z: 9, maxDpr: 1.75, antialias: true });
  const { scene, camera, pointer, isMobile } = stage;
  let dark = opts.dark;
  const c0 = themeColors(dark);

  const rig = new Group();
  scene.add(rig);

  // ---------- Energy core ----------
  const blobMat = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uFreq: { value: 1.35 },
      uPulse: { value: 0 },
      uDeep: { value: new Color("#071733") },
      uBlue: { value: new Color(BRAND.blue) },
      uCyan: { value: new Color(BRAND.cyan) },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uAmp;
      uniform float uFreq;
      varying vec3 vViewPos;
      varying float vDisp;
      ${NOISE_GLSL}
      void main() {
        vec3 n = normalize(position);
        float t = uTime * 0.35;
        float d = snoise(n * uFreq + vec3(t, t * 0.8, -t * 0.6));
        d += 0.45 * snoise(n * uFreq * 2.2 + vec3(-t * 1.2, t, t * 0.5));
        float disp = d * uAmp;
        vec4 mv = modelViewMatrix * vec4(position + n * disp, 1.0);
        vViewPos = mv.xyz;
        vDisp = disp;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uAmp;
      uniform float uPulse;
      uniform vec3 uDeep;
      uniform vec3 uBlue;
      uniform vec3 uCyan;
      varying vec3 vViewPos;
      varying float vDisp;
      void main() {
        vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
        vec3 v = normalize(-vViewPos);
        float fres = pow(1.0 - abs(dot(n, v)), 3.0);
        float h = clamp(vDisp / max(uAmp, 0.001) * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(uDeep, uBlue * 0.8, smoothstep(0.1, 1.0, h));
        float bands = smoothstep(0.8, 1.0, sin(h * 18.0 - uTime * 1.4) * 0.5 + 0.5);
        col += uCyan * bands * 0.22;
        vec3 L = normalize(vec3(-0.45, 0.7, 0.6));
        col += uBlue * max(dot(n, L), 0.0) * 0.5;
        float spec = pow(max(dot(reflect(-L, n), v), 0.0), 36.0);
        col += vec3(0.75, 0.95, 1.0) * spec * 0.8;
        col += uCyan * fres * (1.2 + uPulse * 1.5);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  const blob = new Mesh(new IcosahedronGeometry(1.08, isMobile ? 18 : 30), blobMat);
  const core = new Group();
  core.add(blob);
  rig.add(core);

  // ---------- Wireframe shell + glowing nodes ----------
  const shellGeo = new IcosahedronGeometry(1.72, 1);
  const lineMat = new LineBasicMaterial({
    color: new Color(c0.line),
    transparent: true,
    opacity: 0.3,
    blending: c0.blending,
    depthWrite: false,
  });
  const shell = new LineSegments(new EdgesGeometry(shellGeo), lineMat);

  const seen = new Set<string>();
  const nodePos: number[] = [];
  const nodeRand: number[] = [];
  const sp = shellGeo.getAttribute("position");
  for (let i = 0; i < sp.count; i++) {
    const x = sp.getX(i), y = sp.getY(i), z = sp.getZ(i);
    const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    nodePos.push(x, y, z);
    nodeRand.push(0.8 + Math.random() * 0.2, Math.random(), Math.random());
  }
  shellGeo.dispose();
  const nodeGeo = new BufferGeometry();
  nodeGeo.setAttribute("position", new BufferAttribute(new Float32Array(nodePos), 3));
  nodeGeo.setAttribute("aRand", new BufferAttribute(new Float32Array(nodeRand), 3));
  const nodeMat = createPointsMaterial({
    size: 9,
    dark,
    pixelRatio: stage.renderer.getPixelRatio(),
  });
  const nodes = new Points(nodeGeo, nodeMat);
  const shellGroup = new Group();
  shellGroup.add(shell, nodes);
  rig.add(shellGroup);

  // ---------- Orbit rings with satellites ----------
  const glowTex = createGlowTexture();
  const ringMat = new LineDashedMaterial({
    color: new Color(c0.line),
    dashSize: 0.09,
    gapSize: 0.07,
    transparent: true,
    opacity: 0,
    blending: c0.blending,
    depthWrite: false,
  });
  const satMat = new MeshBasicMaterial({ color: new Color(BRAND.cyan) });
  const satGlowMat = new SpriteMaterial({
    map: glowTex,
    color: new Color(BRAND.cyan),
    transparent: true,
    opacity: 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const satGeo = new SphereGeometry(0.045, 12, 12);
  const ringDefs = [
    { r: 2.05, tilt: [1.15, 0.25, 0], speed: 0.55, phase: 0 },
    { r: 2.45, tilt: [1.35, -0.45, 0.3], speed: -0.4, phase: 2.1 },
    { r: 2.85, tilt: [1.05, 0.6, -0.2], speed: 0.28, phase: 4.2 },
  ];
  const ringsGroup = new Group();
  const rings = ringDefs.map((d) => {
    const pts = new Float32Array(256 * 3);
    for (let i = 0; i < 256; i++) {
      const a = (i / 256) * Math.PI * 2;
      pts.set([Math.cos(a) * d.r, Math.sin(a) * d.r, 0], i * 3);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pts, 3));
    const loop = new LineLoop(g, ringMat);
    loop.computeLineDistances();

    const sat = new Mesh(satGeo, satMat);
    const glow = new Sprite(satGlowMat);
    glow.scale.setScalar(0.42);
    sat.add(glow);

    const holder = new Group();
    holder.rotation.set(d.tilt[0], d.tilt[1], d.tilt[2]);
    holder.add(loop, sat);
    ringsGroup.add(holder);
    return { ...d, sat };
  });
  rig.add(ringsGroup);

  // ---------- Particle halo ----------
  const halo = shellPoints(isMobile ? 320 : 700, 1.9, 3.7);
  const haloGeo = new BufferGeometry();
  haloGeo.setAttribute("position", new BufferAttribute(halo.positions, 3));
  haloGeo.setAttribute("aRand", new BufferAttribute(halo.rand, 3));
  const haloMat = createPointsMaterial({
    size: 3.2,
    dark,
    opacity: 0.85,
    pixelRatio: stage.renderer.getPixelRatio(),
  });
  const haloPoints = new Points(haloGeo, haloMat);
  rig.add(haloPoints);

  // ---------- Floating hologram solids ----------
  const holoMat = createHoloMaterial({ dark, opacity: 0.95 });
  const edgeMat = new LineBasicMaterial({
    color: new Color(c0.line),
    transparent: true,
    opacity: 0.7,
    blending: c0.blending,
    depthWrite: false,
  });
  const floatDefs: { geo: BufferGeometry; pos: [number, number, number] }[] = [
    { geo: new OctahedronGeometry(0.27), pos: [2.55, 1.45, 0.6] },
    { geo: new TetrahedronGeometry(0.26), pos: [-2.6, 1.25, -0.3] },
    { geo: new TorusGeometry(0.19, 0.065, 10, 28), pos: [-2.25, -1.65, 0.8] },
    { geo: new BoxGeometry(0.3, 0.3, 0.3), pos: [2.35, -1.6, -0.5] },
    { geo: new DodecahedronGeometry(0.22), pos: [0.55, 2.65, -0.9] },
    { geo: new IcosahedronGeometry(0.2), pos: [-0.75, -2.6, 0.5] },
  ];
  const floaters = floatDefs.map((d, i) => {
    const g = new Group();
    g.add(new Mesh(d.geo, holoMat));
    g.add(new LineSegments(new EdgesGeometry(d.geo, 20), edgeMat));
    g.position.set(...d.pos);
    g.scale.setScalar(0);
    rig.add(g);
    return {
      g,
      base: d.pos,
      rx: 0.3 + Math.random() * 0.5,
      ry: 0.4 + Math.random() * 0.6,
      i,
    };
  });

  // ---------- Logo sprite (always on top) ----------
  const logoMat = new SpriteMaterial({
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false,
  });
  const logo = new Sprite(logoMat);
  logo.renderOrder = 999;
  scene.add(logo);
  let logoReady = false;
  let logoAspect = 314 / 335;
  new TextureLoader().load(opts.logoUrl, (tex) => {
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 4;
    logoMat.map = tex;
    logoMat.needsUpdate = true;
    logoAspect = tex.image.height / tex.image.width;
    logoReady = true;
    stage.invalidate();
  });

  // ---------- Interaction ----------
  let pulse = 0;
  const onPointerDown = () => {
    pulse = 1;
  };
  container.addEventListener("pointerdown", onPointerDown);

  let scrollY = window.scrollY;
  const onScroll = () => {
    scrollY = window.scrollY;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  stage.onResize((w, h) => {
    const aspect = w / h;
    const fit = Math.tan((camera.fov * Math.PI) / 360) * Math.min(1, aspect);
    camera.position.z = FIT_RADIUS / fit;
  });

  let logoAlpha = 0;
  stage.onFrame((t, dt) => {
    const intro = clamp01(t / 1.6);
    const scrollP = clamp01(scrollY / window.innerHeight);
    pulse = Math.max(0, pulse - dt * 1.4);

    // Core
    core.scale.setScalar(Math.max(0.001, easeOutBack(intro)) * (1 + pulse * 0.08));
    core.rotation.y += dt * 0.12;
    blobMat.uniforms.uTime.value = t;
    blobMat.uniforms.uPulse.value = pulse;
    blobMat.uniforms.uAmp.value =
      0.15 + pointer.velocity * 0.12 + pulse * 0.22 + scrollP * 0.12;

    // Shell
    const shellIn = easeOutBack(clamp01((t - 0.25) / 1.4));
    shellGroup.scale.setScalar(Math.max(0.001, shellIn));
    shellGroup.rotation.y -= dt * 0.08;
    shellGroup.rotation.x += dt * 0.03;
    nodeMat.uniforms.uTime.value = t;

    // Rings
    const ringsIn = clamp01((t - 0.5) / 1.2);
    ringMat.opacity = ringsIn * (dark ? 0.45 : 0.6);
    satGlowMat.opacity = ringsIn * (dark ? 0.9 : 0.5);
    ringsGroup.rotation.z += dt * (0.04 + pulse * 0.6);
    for (const r of rings) {
      const a = t * r.speed * (1 + pulse * 2) + r.phase;
      r.sat.position.set(Math.cos(a) * r.r, Math.sin(a) * r.r, 0);
    }

    // Halo
    haloPoints.rotation.y += dt * 0.05;
    haloPoints.rotation.x = Math.sin(t * 0.1) * 0.15;
    haloMat.uniforms.uTime.value = t;
    haloMat.uniforms.uOpacity.value = clamp01((t - 0.3) / 1.5) * 0.85;

    // Floaters
    holoMat.uniforms.uTime.value = t;
    for (const f of floaters) {
      const s = easeOutBack(clamp01((t - 0.7 - f.i * 0.1) / 0.9));
      f.g.scale.setScalar(Math.max(0.001, s));
      f.g.rotation.x += dt * f.rx;
      f.g.rotation.y += dt * f.ry;
      f.g.position.y = f.base[1] + Math.sin(t * 0.9 + f.i * 1.3) * 0.14;
      f.g.position.x = f.base[0] + pointer.x * 0.12 * (f.base[2] + 1.5);
    }

    // Rig: pointer tilt + scroll push-back
    rig.rotation.x += (-pointer.y * 0.3 + scrollP * 0.5 - rig.rotation.x) * Math.min(1, dt * 3);
    rig.rotation.y += (pointer.x * 0.45 - rig.rotation.y) * Math.min(1, dt * 3);
    rig.position.y = scrollP * 0.9;
    rig.position.z = -scrollP * 2.5;

    // Logo
    if (logoReady) logoAlpha = Math.min(1, logoAlpha + dt * 1.2);
    logoMat.opacity = logoAlpha * clamp01((t - 0.4) / 0.8) * (1 - scrollP * 0.6);
    logo.position.set(pointer.x * 0.1, Math.sin(t * 1.1) * 0.04 + rig.position.y, 0.5);
    const ls = 1.3 * (1 + pulse * 0.06);
    logo.scale.set(ls, ls * logoAspect, 1);
  });

  stage.start();

  return {
    setTheme(next: boolean) {
      dark = next;
      const c = themeColors(dark);
      for (const m of [lineMat, ringMat, edgeMat]) {
        m.color.set(c.line);
        m.blending = c.blending;
        m.needsUpdate = true;
      }
      for (const m of [nodeMat, haloMat]) {
        m.blending = c.blending;
        m.uniforms.uColorA.value.set(c.a);
        m.uniforms.uColorB.value.set(c.b);
        m.needsUpdate = true;
      }
      holoMat.blending = c.blending;
      holoMat.uniforms.uRim.value.set(c.a);
      holoMat.uniforms.uColor.value.set(dark ? BRAND.blue : BRAND.bright);
      holoMat.needsUpdate = true;
      stage.invalidate();
    },
    dispose() {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      glowTex.dispose();
      stage.dispose();
    },
  };
}
