// Page-header 3D composition: a main hologram solid on the "end" side and a
// smaller companion on the "start" side, framed around the centered title.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DodecahedronGeometry,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  OctahedronGeometry,
  Points,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
} from "three";
import { createStage } from "./stage";
import {
  BRAND,
  clamp01,
  createHoloMaterial,
  createPointsMaterial,
  easeOutBack,
  themeColors,
} from "./materials";

export type ShapeVariant = "services" | "blog" | "contact" | "quote";

export interface ShapeScene {
  setTheme: (dark: boolean) => void;
  dispose: () => void;
}

const buildGeometries = (variant: ShapeVariant): [BufferGeometry, BufferGeometry] => {
  switch (variant) {
    case "services":
      return [new TorusKnotGeometry(0.78, 0.25, 140, 18), new IcosahedronGeometry(0.55, 0)];
    case "blog":
      return [new OctahedronGeometry(1.05, 0), new TorusGeometry(0.42, 0.13, 12, 36)];
    case "contact":
      return [new IcosahedronGeometry(1.05, 1), new OctahedronGeometry(0.5, 0)];
    case "quote":
    default:
      return [new DodecahedronGeometry(1.0, 0), new TetrahedronGeometry(0.6, 0)];
  }
};

export function createShapeScene(
  container: HTMLElement,
  opts: { dark: boolean; variant: ShapeVariant; rtl: boolean },
): ShapeScene {
  const stage = createStage(container, { fov: 35, z: 7, maxDpr: 1.5, antialias: true });
  const { scene, camera, pointer, isMobile } = stage;
  let dark = opts.dark;
  const c0 = themeColors(dark);

  const holoMat = createHoloMaterial({ dark, opacity: 0.9 });
  const edgeMat = new LineBasicMaterial({
    color: new Color(c0.line),
    transparent: true,
    opacity: 0.75,
    blending: c0.blending,
    depthWrite: false,
  });
  const pointsMat = createPointsMaterial({
    size: 3,
    dark,
    opacity: 0.8,
    pixelRatio: stage.renderer.getPixelRatio(),
  });

  const nodeMats: ReturnType<typeof createPointsMaterial>[] = [];
  const makeSolid = (geo: BufferGeometry, withNodes: boolean) => {
    const g = new Group();
    g.add(new Mesh(geo, holoMat));
    g.add(new LineSegments(new EdgesGeometry(geo, 15), edgeMat));
    if (withNodes) {
      const src = geo.getAttribute("position");
      const seen = new Set<string>();
      const pos: number[] = [];
      const rnd: number[] = [];
      for (let i = 0; i < src.count; i++) {
        const key = `${src.getX(i).toFixed(3)},${src.getY(i).toFixed(3)},${src.getZ(i).toFixed(3)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        pos.push(src.getX(i), src.getY(i), src.getZ(i));
        rnd.push(0.9, Math.random(), Math.random());
      }
      const ng = new BufferGeometry();
      ng.setAttribute("position", new BufferAttribute(new Float32Array(pos), 3));
      ng.setAttribute("aRand", new BufferAttribute(new Float32Array(rnd), 3));
      const nm = createPointsMaterial({ size: 10, dark, pixelRatio: stage.renderer.getPixelRatio() });
      nodeMats.push(nm);
      g.add(new Points(ng, nm));
    }
    return g;
  };

  const [mainGeo, sideGeo] = buildGeometries(opts.variant);
  const main = makeSolid(mainGeo, opts.variant === "contact");
  const side = makeSolid(sideGeo, false);
  scene.add(main, side);

  // Sparse dust
  const count = isMobile ? 90 : 200;
  const pos = new Float32Array(count * 3);
  const rnd = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos.set([(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4], i * 3);
    rnd.set([Math.random(), Math.random(), Math.random()], i * 3);
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute("position", new BufferAttribute(pos, 3));
  dustGeo.setAttribute("aRand", new BufferAttribute(rnd, 3));
  const dust = new Points(dustGeo, pointsMat);
  scene.add(dust);

  const dir = opts.rtl ? -1 : 1;
  const layout = { mainX: 0, mainY: 0, sideX: 0, mainS: 1, sideS: 1, sideVisible: true };
  stage.onResize((w, h) => {
    const aspect = w / h;
    const hw = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * aspect;
    if (aspect < 1.4) {
      // Narrow screens: tuck a smaller shape into the top "end" corner.
      layout.mainX = dir * hw * 0.62;
      layout.mainY = 1.25;
      layout.mainS = 0.55;
      layout.sideVisible = false;
    } else {
      // Wide screens: frame the centered title from both edges.
      layout.mainX = dir * Math.max(hw * 0.8, hw - 1.6);
      layout.mainY = 0;
      layout.sideX = -dir * Math.max(hw * 0.84, hw - 1.1);
      layout.mainS = aspect > 2.6 ? 0.9 : 0.75;
      layout.sideS = 1;
      layout.sideVisible = true;
    }
    side.visible = layout.sideVisible;
  });

  let scrollY = window.scrollY;
  const onScroll = () => {
    scrollY = window.scrollY;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  stage.onFrame((t, dt) => {
    const sp = clamp01(scrollY / 500);
    const inMain = easeOutBack(clamp01(t / 1.3));
    const inSide = easeOutBack(clamp01((t - 0.3) / 1.2));

    main.scale.setScalar(Math.max(0.001, inMain * layout.mainS));
    main.position.set(
      layout.mainX + pointer.x * 0.25,
      layout.mainY + Math.sin(t * 0.8) * 0.12 + sp * 0.8,
      0,
    );
    main.rotation.x += dt * (0.18 + sp * 0.8);
    main.rotation.y += dt * (0.26 + pointer.velocity * 0.6);

    side.scale.setScalar(Math.max(0.001, inSide * layout.sideS));
    side.position.set(
      layout.sideX - pointer.x * 0.2,
      -0.35 + Math.sin(t * 0.9 + 2) * 0.15 + sp * 1.2,
      -0.5,
    );
    side.rotation.x -= dt * 0.3;
    side.rotation.z += dt * 0.22;

    dust.rotation.y = pointer.x * 0.08;
    dust.position.y = sp * 0.6;

    holoMat.uniforms.uTime.value = t;
    pointsMat.uniforms.uTime.value = t;
    for (const nm of nodeMats) nm.uniforms.uTime.value = t;
    camera.position.x = pointer.x * 0.3;
    camera.position.y = pointer.y * 0.2;
    camera.lookAt(0, 0, 0);
  });

  stage.start();

  return {
    setTheme(next: boolean) {
      dark = next;
      const c = themeColors(dark);
      edgeMat.color.set(c.line);
      edgeMat.blending = c.blending;
      edgeMat.needsUpdate = true;
      holoMat.blending = c.blending;
      holoMat.uniforms.uRim.value.set(c.a);
      holoMat.uniforms.uColor.value.set(dark ? BRAND.blue : BRAND.bright);
      holoMat.needsUpdate = true;
      scene.traverse((o: any) => {
        if (o.isPoints) {
          o.material.blending = c.blending;
          o.material.uniforms.uColorA.value.set(c.a);
          o.material.uniforms.uColorB.value.set(c.b);
          o.material.needsUpdate = true;
        }
      });
      stage.invalidate();
    },
    dispose() {
      window.removeEventListener("scroll", onScroll);
      stage.dispose();
    },
  };
}
