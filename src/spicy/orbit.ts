export type OrbitConfig = {
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  tilt: number;
  bob: number;
};

type Vec3Like = { set: (x: number, y: number, z: number) => unknown };

// 매 프레임 호출되므로 배열을 새로 만들지 않고 대상 벡터에 바로 써넣는다.
export function setOrbitPosition(cfg: OrbitConfig, t: number, target: Vec3Like) {
  const angle = cfg.phase + t * cfg.orbitSpeed;
  const planar = Math.sin(angle) * cfg.orbitRadius;

  const x = Math.cos(angle) * cfg.orbitRadius;
  const z = planar * Math.cos(cfg.tilt);
  const y = planar * Math.sin(cfg.tilt) + Math.sin(t * 0.6 + cfg.phase) * cfg.bob;

  target.set(x, y, z);
}

export function getOrbitPosition(cfg: OrbitConfig, t: number): [number, number, number] {
  const out: [number, number, number] = [0, 0, 0];
  setOrbitPosition(cfg, t, {
    set: (x, y, z) => {
      out[0] = x;
      out[1] = y;
      out[2] = z;
    },
  });
  return out;
}
