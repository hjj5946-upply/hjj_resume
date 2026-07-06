import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "./textures";
import { useLazyRef } from "./useLazyRef";

function randomFlashPosition(): THREE.Vector3 {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 80,
    (Math.random() - 0.5) * 45,
    -40 - Math.random() * 45
  );
}

// 아주 가끔 배경 어딘가에서 터지는 초신성 플래시.
export function SupernovaFlash() {
  const { clock } = useThree();
  const spriteRef = useRef<THREE.Sprite>(null);
  const glowTexture = getGlowTexture();
  const stateRef = useLazyRef(() => ({
    running: false,
    startTime: 0,
    duration: 2.4,
    nextAt: 6 + Math.random() * 14,
  }));

  useFrame(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;
    const t = clock.getElapsedTime();
    const s = stateRef.current;

    if (!s.running) {
      sprite.visible = false;
      if (t >= s.nextAt) {
        s.running = true;
        s.startTime = t;
        sprite.position.copy(randomFlashPosition());
      }
      return;
    }

    const progress = (t - s.startTime) / s.duration;
    if (progress >= 1) {
      s.running = false;
      s.nextAt = t + 18 + Math.random() * 24;
      sprite.visible = false;
      return;
    }

    sprite.visible = true;
    const brightness =
      progress < 0.12 ? progress / 0.12 : 1 - (progress - 0.12) / 0.88;
    sprite.scale.setScalar(THREE.MathUtils.lerp(1, 11, Math.min(1, progress * 2.5)));
    (sprite.material as THREE.SpriteMaterial).opacity = Math.max(0, brightness);
  });

  return (
    <sprite ref={spriteRef} visible={false}>
      <spriteMaterial
        map={glowTexture}
        color="#fff4d6"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}
