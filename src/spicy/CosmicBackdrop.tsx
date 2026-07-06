import { useState } from "react";
import * as THREE from "three";
import { Stars, Sparkles } from "@react-three/drei";
import { getGlowTexture } from "./textures";
import { Meteor } from "./Meteor";
import { SupernovaFlash } from "./SupernovaFlash";

type GlowSpec = {
  position: [number, number, number];
  scale: number;
  color: string;
  rotation: number;
};

const NEBULA_PALETTE = ["#7c3aed", "#2dd4bf", "#f472b6", "#f5ba3b", "#38bdf8"];

function randomNebulaField(count: number): GlowSpec[] {
  return Array.from({ length: count }).map(() => ({
    position: [
      (Math.random() - 0.5) * 90,
      (Math.random() - 0.5) * 50,
      -35 - Math.random() * 55,
    ],
    scale: 16 + Math.random() * 22,
    color: NEBULA_PALETTE[Math.floor(Math.random() * NEBULA_PALETTE.length)],
    rotation: Math.random() * Math.PI,
  }));
}

function randomGalaxy(): GlowSpec {
  return {
    position: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 30, -70 - Math.random() * 30],
    scale: 26 + Math.random() * 10,
    color: "#c7d2fe",
    rotation: Math.random() * Math.PI,
  };
}

const METEOR_COLORS = ["#fef3c7", "#bae6fd", "#fecdd3"];

// 성운, 별무리, 은하, 유성, 초신성 등 랜덤 우주 효과를 한데 모은 배경.
// 매 마운트(=매운맛 진입)마다 새로 배치되어 매번 조금씩 다른 우주를 보여준다.
export function CosmicBackdrop() {
  const glowTexture = getGlowTexture();
  const [nebulae] = useState(() => randomNebulaField(5));
  const [galaxy] = useState(randomGalaxy);

  return (
    <>
      {/* 원경 별 + 근경 별무리로 깊이감 */}
      <Stars radius={90} depth={60} count={5000} factor={3.2} saturation={0} fade speed={0.5} />
      <Stars radius={40} depth={20} count={1500} factor={1.6} saturation={0} fade speed={0.3} />
      <Sparkles count={120} scale={[60, 30, 60]} size={2} speed={0.25} opacity={0.5} color="#ffe9c4" />

      {nebulae.map((n, i) => (
        <sprite key={i} position={n.position} scale={n.scale}>
          <spriteMaterial
            map={glowTexture}
            color={n.color}
            rotation={n.rotation}
            transparent
            opacity={0.22}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}

      <sprite position={galaxy.position} scale={[galaxy.scale, galaxy.scale * 0.35, 1]}>
        <spriteMaterial
          map={glowTexture}
          color={galaxy.color}
          rotation={galaxy.rotation}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {METEOR_COLORS.map((color, i) => (
        <Meteor key={color} seedOffset={i * 4} color={color} />
      ))}

      <SupernovaFlash />
    </>
  );
}
