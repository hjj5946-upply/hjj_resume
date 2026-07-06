import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { getGlowTexture } from "./textures";

// 태양계 중심의 "태양" - 나를 나타내는 요소. 은은하게 맥동하며 전체 장면의 주 광원 역할도 겸한다.
export function Sun() {
  const coreRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Sprite>(null);
  const glowTexture = getGlowTexture();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.0018;
    }
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(t * 0.8) * 0.06;
      coronaRef.current.scale.setScalar(6.5 * pulse);
    }
  });

  return (
    <group>
      <pointLight position={[0, 0, 0]} intensity={2.6} color="#ffdca8" distance={70} decay={1.3} />

      <mesh ref={coreRef}>
        <sphereGeometry args={[1.7, 48, 48]} />
        <meshBasicMaterial color="#ffce6b" />
      </mesh>

      <sprite ref={coronaRef} scale={6.5}>
        <spriteMaterial
          map={glowTexture}
          color="#f5ba3b"
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <Html position={[0, -2.6, 0]} center distanceFactor={16} style={{ pointerEvents: "none" }}>
        <div className="text-center">
          <p className="text-sm font-semibold text-white [text-shadow:0_0_10px_rgba(245,186,59,0.9)]">
            Hong JeongJun
          </p>
          <p className="text-[10px] text-amber-200/80">BackEnd Software Engineer</p>
        </div>
      </Html>
    </group>
  );
}
