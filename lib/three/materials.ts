// Shared shaders / materials for the STB 3D scenes.
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  DoubleSide,
  NormalBlending,
  ShaderMaterial,
  SRGBColorSpace,
} from "three";

export const BRAND = {
  cyan: "#00d4ff",
  blue: "#1e6fd9",
  bright: "#2196f3",
  navy: "#1a3a6b",
  deep: "#060d1a",
  silver: "#c8d8f0",
};

/** Colors that adapt to the current theme (additive glow only reads on dark). */
export const themeColors = (dark: boolean) =>
  dark
    ? { a: BRAND.cyan, b: BRAND.bright, line: BRAND.cyan, blending: AdditiveBlending }
    : { a: BRAND.blue, b: BRAND.navy, line: BRAND.blue, blending: NormalBlending };

// Simplex 3D noise — Ian McEwan, Ashima Arts (MIT License).
export const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/**
 * Soft glowing, twinkling points. Geometry needs `position` + `aRand` (vec3).
 */
export const createPointsMaterial = (opts: {
  size: number;
  dark: boolean;
  opacity?: number;
  pixelRatio: number;
}) => {
  const c = themeColors(opts.dark);
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: c.blending,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: opts.size },
      uPixelRatio: { value: opts.pixelRatio },
      uOpacity: { value: opts.opacity ?? 1 },
      uColorA: { value: new Color(c.a) },
      uColorB: { value: new Color(c.b) },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aRand;
      uniform float uTime;
      uniform float uSize;
      uniform float uPixelRatio;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (0.35 + aRand.x) * uPixelRatio * (6.0 / -mv.z);
        vAlpha = 0.45 + 0.55 * sin(uTime * (0.8 + aRand.z * 1.6) + aRand.y * 30.0);
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
        float a = pow(smoothstep(0.5, 0.0, d), 1.8);
        gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha * uOpacity);
        #include <colorspace_fragment>
      }
    `,
  });
};

/** Faceted "hologram" glass material with fresnel rim and moving scan line. */
export const createHoloMaterial = (opts: {
  dark: boolean;
  opacity?: number;
}) => {
  const c = themeColors(opts.dark);
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    blending: c.blending,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: opts.opacity ?? 1 },
      uColor: { value: new Color(opts.dark ? BRAND.blue : BRAND.bright) },
      uRim: { value: new Color(c.a) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vViewPos;
      varying vec3 vWorldPos;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vec4 mv = viewMatrix * world;
        vViewPos = mv.xyz;
        vWorldPos = world.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform vec3 uRim;
      uniform float uOpacity;
      uniform float uTime;
      varying vec3 vViewPos;
      varying vec3 vWorldPos;
      void main() {
        vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
        vec3 v = normalize(-vViewPos);
        float ndv = abs(dot(n, v));
        float fres = pow(1.0 - ndv, 2.2);
        float scan = smoothstep(0.9, 1.0, sin(vWorldPos.y * 22.0 - uTime * 2.2) * 0.5 + 0.5);
        vec3 col = uColor * (0.25 + 0.6 * ndv) + uRim * (fres * 1.1 + scan * 0.3);
        float a = clamp(0.16 + fres * 0.8 + scan * 0.18, 0.0, 1.0) * uOpacity;
        gl_FragColor = vec4(col, a);
        #include <colorspace_fragment>
      }
    `,
  });
};

/** Soft radial sprite used for glowing satellites. */
export const createGlowTexture = () => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  return tex;
};

/** Random points in a spherical shell, with per-point random attributes. */
export const shellPoints = (count: number, rMin: number, rMax: number) => {
  const positions = new Float32Array(count * 3);
  const rand = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const r = rMin + (rMax - rMin) * Math.pow(Math.random(), 0.7);
    const s = Math.sqrt(1 - u * u);
    positions.set([r * s * Math.cos(phi), r * u, r * s * Math.sin(phi)], i * 3);
    rand.set([Math.random(), Math.random(), Math.random()], i * 3);
  }
  return { positions, rand };
};

export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
