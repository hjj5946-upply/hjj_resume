import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { PlanetConfig } from "./planets.config";
import { getOrbitPosition } from "./orbit";
import { createCyberSurfaceTexture } from "./textures";
import { NeutronCore } from "./NeutronCore";
import { ReactOrbitCore } from "./ReactOrbitCore";
import { GlowingCore } from "./GlowingCore";
import "./RimGlowMaterial";

type PlanetProps = {
  config: PlanetConfig;
  dimmed: boolean;
  showLabel: boolean;
  frozenPosition: [number, number, number] | null;
  onSelect: (position: [number, number, number]) => void;
};

export function Planet({ config, dimmed, showLabel, frozenPosition, onSelect }: PlanetProps) {
  const { clock } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const visualStyle = config.visualStyle ?? "cyber";
  const isNeutron = visualStyle === "neutron";
  const isReactOrbit = visualStyle === "react-orbit";
  const isGlow = visualStyle === "glow";
  const isCrystal = visualStyle === "crystal";
  const usesCustomCore = isNeutron || isReactOrbit || isGlow;

  const surfaceTexture = useMemo(
    () => createCyberSurfaceTexture(config.color, config.accentColor, config.textureSeed),
    [config.color, config.accentColor, config.textureSeed]
  );

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    if (frozenPosition) {
      group.position.set(...frozenPosition);
    } else {
      const t = clock.getElapsedTime();
      group.position.set(...getOrbitPosition(config, t));
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.004;
    }

    // 표면 위를 은은하게 흐르는 스캔라인. three.js 텍스처는 리렌더 없이
    // useFrame에서 offset을 직접 mutate하는 게 표준 애니메이션 방식이라 오탐이다.
    // eslint-disable-next-line react-hooks/immutability
    surfaceTexture.offset.y = (clock.getElapsedTime() * 0.03) % 1;
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const t = clock.getElapsedTime();
    onSelect(getOrbitPosition(config, t));
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  // 호버 도중 행성이 선택되어 사라지는 등 pointerOut이 못 불리는 경우를 대비한 안전장치
  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  const scale = hovered ? config.size * 1.12 : config.size;
  const glowColor = useMemo(() => new THREE.Color(config.color), [config.color]);

  return (
    <group ref={groupRef}>
      <mesh
        ref={sphereRef}
        scale={scale}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {isCrystal ? <icosahedronGeometry args={[1, 1]} /> : <sphereGeometry args={[1, 48, 48]} />}
        {usesCustomCore ? (
          // 커스텀 코어 스타일(중성자별/리액트 궤도/발광 비콘)은 별도 컴포넌트가 시각적으로
          // 그려주므로, 여기서는 클릭/호버 판정을 위한 투명한 히트 영역만 유지한다.
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        ) : isCrystal ? (
          <meshPhysicalMaterial
            color={dimmed ? "#555555" : config.color}
            emissive={config.color}
            emissiveIntensity={dimmed ? 0.1 : hovered ? 0.7 : 0.45}
            roughness={0.08}
            metalness={0.55}
            clearcoat={1}
            clearcoatRoughness={0.05}
            flatShading
            transparent
            opacity={dimmed ? 0.25 : 1}
          />
        ) : (
          <meshPhysicalMaterial
            map={surfaceTexture}
            color={dimmed ? "#555555" : "#ffffff"}
            emissive={config.color}
            emissiveIntensity={dimmed ? 0.08 : hovered ? 0.55 : 0.3}
            roughness={0.55}
            metalness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
            transparent
            opacity={dimmed ? 0.25 : 1}
          />
        )}
      </mesh>

      {isNeutron && <NeutronCore scale={scale} color={config.color} dimmed={dimmed} />}
      {isReactOrbit && <ReactOrbitCore scale={scale} color={config.color} dimmed={dimmed} />}
      {isGlow && <GlowingCore scale={scale} color={config.color} dimmed={dimmed} />}

      {/* 시야각에 따라 가장자리가 은은하게 빛나는 Fresnel 림글로우 - 자체 발광 비콘 스타일은 제외 */}
      {!isGlow && (
        <mesh scale={scale * (isNeutron ? 1.7 : isReactOrbit ? 1.35 : 1.28)}>
          <sphereGeometry args={[1, 32, 32]} />
          <rimGlowMaterial
            glowColor={glowColor}
            power={isNeutron || isReactOrbit ? 1.6 : 2.4}
            opacity={dimmed ? 0.06 : isNeutron || isReactOrbit ? 0.45 : 0.55}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {config.hasRing && !dimmed && (
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]} scale={scale}>
          <ringGeometry args={[1.6, 2.3, 64]} />
          <meshBasicMaterial
            color={config.accentColor}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {showLabel && !dimmed && (
        <Html
          position={[0, scale * 1.6, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none" }}
        >
          <div className="whitespace-nowrap rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {config.label}
          </div>
        </Html>
      )}
    </group>
  );
}
