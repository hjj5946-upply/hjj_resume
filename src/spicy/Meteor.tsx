import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import { useLazyRef } from "./useLazyRef";

type MeteorPlan = {
  from: THREE.Vector3;
  to: THREE.Vector3;
  duration: number;
};

function randomMeteorPlan(): MeteorPlan {
  const side = Math.random() > 0.5 ? 1 : -1;
  return {
    from: new THREE.Vector3(side * 45, 18 + Math.random() * 12, -25 - Math.random() * 25),
    to: new THREE.Vector3(-side * 45, -22 - Math.random() * 12, -10 - Math.random() * 20),
    duration: 1.3 + Math.random() * 1.4,
  };
}

type MeteorProps = { seedOffset?: number; color: string };

// 배경에 랜덤하게 떨어지는 유성(별똥별). 화면 밖에서 등장해 대각선으로 스치듯 지나간다.
export function Meteor({ seedOffset = 0, color }: MeteorProps) {
  const { clock } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const planRef = useLazyRef(randomMeteorPlan);
  const stateRef = useLazyRef(() => ({
    running: false,
    startTime: 0,
    nextStart: 3 + Math.random() * 10 + seedOffset,
  }));

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    const s = stateRef.current;

    if (!s.running) {
      mesh.visible = false;
      if (t >= s.nextStart) {
        s.running = true;
        s.startTime = t;
        planRef.current = randomMeteorPlan();
      }
      return;
    }

    const progress = (t - s.startTime) / planRef.current.duration;
    if (progress >= 1) {
      s.running = false;
      s.nextStart = t + 6 + Math.random() * 14;
      mesh.visible = false;
      return;
    }

    mesh.visible = true;
    mesh.position.lerpVectors(planRef.current.from, planRef.current.to, progress);
  });

  return (
    <Trail width={2} length={6} color={color} decay={1.2} attenuation={(w) => w}>
      <mesh ref={meshRef} visible={false}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}
