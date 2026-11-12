// Site-wide ambient 3D background: a deep field of drifting, twinkling
// particles plus a few huge wireframe solids floating far behind the content.
// Reacts to the pointer (camera parallax) and to page scroll (depth parallax).
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  OctahedronGeometry,
  Points,
  ShaderMaterial,
  DodecahedronGeometry,
} from "three";
import { createStage } from "./stage";
import { themeColors } from "./materials";

export interface BackgroundScene {
  setTheme: (dark: boolean) => void;
  dispose: () => void;
}

const FIELD_H = 26; // vertical size of the particle field (wraps around)

export function createBackground(
  container: HTMLElement,
  opts: { dark: boolean },
): BackgroundScene {
  const lowPower = (navigator.hardwareConcurrency || 4) <= 4;
  const stage = createStage(container, {
    fov: 60,
    z: 10,
    maxDpr: 1.25,
    frameSkip: lowPower ? 2 : 1,
  });
  const { scene, camera, pointer, isMobile } = stage;
  let dark = opts.dark;

  // ---------- Particle field ----------
  const count = isMobile ? 450 : lowPower ? 800 : 1300;
  const positions = new Float32Array(count * 3);
  const rand = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 44;
    positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_H;
    positions[i * 3 + 2] = -18 + Math.random() * 22;
    rand[i * 3] = Math.random();
    rand[i * 3 + 1] = Math.random();
    rand[i * 3 + 2] = Math.random();
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  geo.setAttribute("aRand", new BufferAttribute(rand, 3));

  const c0 = themeColors(dark);
  const pointsMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: c0.blending,
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: stage.renderer.getPixelRatio() },
      uOpacity: { value: dark ? 0.9 : 0.55 },
      uColorA: { value: new Color(c0.a) },
      uColorB: { value: new Color(c0.b) },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aRand;
      uniform float uTime;
      uniform float uScroll;
      uniform float uPixelRatio;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vec3 p = position;
        float depth = clamp((p.z + 18.0) / 22.0, 0.0, 1.0);
        p.x += sin(uTime * 0.12 * (0.5 + aRand.z) + aRand.y * 6.2831) * 0.8;
        p.y += uTime * 0.12 * (0.3 + aRand.z) + uScroll * (0.35 + depth * 1.4);
        p.y = mod(p.y + ${FIELD_H / 2}.0, ${FIELD_H}.0) - ${FIELD_H / 2}.0;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.2 + aRand.x * 3.2) * uPixelRatio * (12.0 / -mv.z);
        float twinkle = 0.5 + 0.5 * sin(uTime * (0.6 + aRand.z * 1.8) + aRand.y * 40.0);
        vAlpha = twinkle * (0.25 + depth * 0.75);
        vMix = aRand.y;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uOpacity;
      varying float vAlpha;
      varying float vMix;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = pow(smoothstep(0.5, 0.0, d), 1.6);
        gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha * uOpacity);
        #include <colorspace_fragment>
      }
    `,
  });
  const field = new Points(geo, pointsMat);
  field.frustumCulled = false;
  scene.add(field);

  // ---------- Giant wireframe solids ----------
  const lineMat = new LineBasicMaterial({
    color: new Color(c0.line),
    transparent: true,
    opacity: dark ? 0.09 : 0.12,
    blending: c0.blending,
    depthWrite: false,
  });
  const shapes = new Group();
  const defs = [
    { geo: new IcosahedronGeometry(3.2, 1), pos: [-11, 4, -12], speed: 0.05 },
    { geo: new OctahedronGeometry(2.4, 0), pos: [12, -5, -10], speed: -0.07 },
    { geo: new DodecahedronGeometry(2.6, 0), pos: [14, 8, -16], speed: 0.04 },
  ];
  const solids = defs.map((d) => {
    const mesh = new LineSegments(new EdgesGeometry(d.geo, 1), lineMat);
    d.geo.dispose();
    mesh.position.set(d.pos[0], d.pos[1], d.pos[2]);
    shapes.add(mesh);
    return { mesh, base: d.pos[1], speed: d.speed };
  });
  if (isMobile) solids[2].mesh.visible = false;
  scene.add(shapes);

  // ---------- Scroll ----------
  let scrollTarget = window.scrollY;
  let scroll = scrollTarget;
  const onScroll = () => {
    scrollTarget = window.scrollY;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  stage.onFrame((t, dt) => {
    scroll += (scrollTarget - scroll) * Math.min(1, dt * 5);
    const s = scroll * 0.0035;
    pointsMat.uniforms.uTime.value = t;
    pointsMat.uniforms.uScroll.value = s;

    camera.position.x = pointer.x * 0.8;
    camera.position.y = pointer.y * 0.5;
    camera.lookAt(0, 0, -4);

    for (const sld of solids) {
      sld.mesh.rotation.x += dt * sld.speed;
      sld.mesh.rotation.y += dt * sld.speed * 1.3;
      sld.mesh.position.y = sld.base + Math.sin(t * 0.2 + sld.base) * 0.6 + s * 1.2;
    }
  });

  stage.start();

  return {
    setTheme(next: boolean) {
      dark = next;
      const c = themeColors(dark);
      pointsMat.blending = c.blending;
      pointsMat.uniforms.uColorA.value.set(c.a);
      pointsMat.uniforms.uColorB.value.set(c.b);
      pointsMat.uniforms.uOpacity.value = dark ? 0.9 : 0.55;
      pointsMat.needsUpdate = true;
      lineMat.color.set(c.line);
      lineMat.blending = c.blending;
      lineMat.opacity = dark ? 0.09 : 0.12;
      lineMat.needsUpdate = true;
      stage.invalidate();
    },
    dispose() {
      window.removeEventListener("scroll", onScroll);
      stage.dispose();
    },
  };
}
