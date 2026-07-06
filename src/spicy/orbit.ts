export type OrbitConfig = {
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  tilt: number;
  bob: number;
};

export function getOrbitPosition(cfg: OrbitConfig, t: number): [number, number, number] {
  const angle = cfg.phase + t * cfg.orbitSpeed;
  const planar = Math.sin(angle) * cfg.orbitRadius;

  const x = Math.cos(angle) * cfg.orbitRadius;
  const z = planar * Math.cos(cfg.tilt);
  const y = planar * Math.sin(cfg.tilt) + Math.sin(t * 0.6 + cfg.phase) * cfg.bob;

  return [x, y, z];
}
