import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ReactOrbitCoreProps = {
  scale: number;
  color: string;
  dimmed: boolean;
};

// React 로고(atom) 모티프 - 중심 핵 주위로 3개의 궤도 고리가 도는 행성.
// 각 고리를 서로 다른 축으로 기울여야(Y축 회전) 어떤 카메라 각도에서 봐도
// 하나로 겹쳐 보이지 않고 뚜렷이 교차하는 3개의 타원으로 보인다.
const RING_Y_ROTATIONS = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

export function ReactOrbitCore({ scale, color, dimmed }: ReactOrbitCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.5;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.4) * 0.1;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group scale={scale}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <group ref={groupRef}>
        {RING_Y_ROTATIONS.map((ry) => (
          <mesh key={ry} rotation={[Math.PI / 3, ry, 0]}>
            <torusGeometry args={[0.85, 0.025, 12, 64]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={dimmed ? 0.15 : 0.85}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
