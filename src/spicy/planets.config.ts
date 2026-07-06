import type { OrbitConfig } from "./orbit";

export type PlanetId = "summary" | "skills" | "experience" | "projects" | "contact";

export type PlanetVisualStyle = "cyber" | "neutron" | "react-orbit" | "glow" | "crystal";

export type PlanetConfig = OrbitConfig & {
  id: PlanetId;
  label: string;
  color: string;
  accentColor: string;
  size: number;
  hasRing?: boolean;
  textureSeed: number;
  visualStyle?: PlanetVisualStyle;
};

// 태양(나) 주위를 각기 다른 반지름/속도/기울기로 도는 5개 행성.
// 안쪽 행성일수록 빠르게, 바깥쪽일수록 느리게 - 실제 태양계 느낌에 가깝게.
export const PLANETS: PlanetConfig[] = [
  {
    id: "contact",
    label: "Contact",
    color: "#ffe08a",
    accentColor: "#8a6a1c",
    size: 0.55,
    orbitRadius: 3.2,
    orbitSpeed: 0.09,
    phase: 0,
    tilt: 0.12,
    bob: 0.12,
    textureSeed: 11,
    visualStyle: "glow",
  },
  {
    id: "summary",
    label: "Summary",
    color: "#f5ba3b",
    accentColor: "#b9781f",
    size: 0.75,
    orbitRadius: 5.5,
    orbitSpeed: 0.065,
    phase: 1.2,
    tilt: -0.2,
    bob: 0.18,
    textureSeed: 23,
  },
  {
    id: "skills",
    label: "Skills",
    color: "#61dafb",
    accentColor: "#1f6a8a",
    size: 1.0,
    orbitRadius: 7.8,
    orbitSpeed: 0.045,
    phase: 2.6,
    tilt: 0.25,
    bob: 0.22,
    textureSeed: 37,
    visualStyle: "react-orbit",
  },
  {
    id: "experience",
    label: "Experience",
    color: "#bcdcff",
    accentColor: "#7a2c10",
    size: 0.9,
    orbitRadius: 10,
    orbitSpeed: 0.032,
    phase: 4.0,
    tilt: -0.15,
    bob: 0.25,
    textureSeed: 49,
    visualStyle: "neutron",
  },
  {
    id: "projects",
    label: "Projects",
    color: "#f5ba3b",
    accentColor: "#8a5a1c",
    size: 1.25,
    orbitRadius: 12.5,
    orbitSpeed: 0.022,
    phase: 5.3,
    tilt: 0.18,
    bob: 0.3,
    hasRing: true,
    textureSeed: 61,
    visualStyle: "crystal",
  },
];

export const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 4, 20];
