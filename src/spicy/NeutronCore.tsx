import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type NeutronCoreProps = {
  scale: number;
  color: string;
  dimmed: boolean;
};

function buildParticleGeometry(count: number, radius: number): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // 구 표면 근처에 고르게 분포시켜 "입자 구름"처럼 보이게 한다
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.85 + Math.random() * 0.3);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

// 압축된 에너지 입자 구름처럼 보이는 중성자별 스타일 행성 코어.
export function NeutronCore({ scale, color, dimmed }: NeutronCoreProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [geometry] = useState(() => buildParticleGeometry(260, 1));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.6;
      particlesRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.08;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group scale={scale}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#e8f4ff" transparent opacity={dimmed ? 0.2 : 1} />
      </mesh>
      <points ref={particlesRef} geometry={geometry}>
        <pointsMaterial
          size={0.06}
          color={color}
          transparent
          opacity={dimmed ? 0.15 : 0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
