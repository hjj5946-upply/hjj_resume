import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "./textures";

type GlowingCoreProps = {
  scale: number;
  color: string;
  dimmed: boolean;
};

const RAY_ANGLES_DEG = [0, 45, 90, 135];

// 강하게 빛나는 비콘 스타일 행성 - 밝은 코어 + 겹친 후광 + 별빛처럼 뻗는 광선.
export function GlowingCore({ scale, color, dimmed }: GlowingCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const glowTexture = getGlowTexture();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.6) * 0.12;
    if (coreRef.current) coreRef.current.scale.setScalar(pulse);
    if (glowRef.current) glowRef.current.scale.setScalar(3.2 * pulse);
  });

  return (
    <group scale={scale}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#fff6d8" transparent opacity={dimmed ? 0.3 : 1} />
      </mesh>

      <sprite ref={glowRef} scale={3.2}>
        <spriteMaterial
          map={glowTexture}
          color={color}
          transparent
          opacity={dimmed ? 0.15 : 0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {!dimmed &&
        RAY_ANGLES_DEG.map((deg) => (
          <sprite key={deg} scale={[2.6, 0.14, 1]}>
            <spriteMaterial
              map={glowTexture}
              color={color}
              rotation={THREE.MathUtils.degToRad(deg)}
              transparent
              opacity={0.4}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        ))}
    </group>
  );
}
