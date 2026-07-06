import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { PLANETS, DEFAULT_CAMERA_POSITION, type PlanetId } from "./planets.config";
import { Planet } from "./Planet";
import { Sun } from "./Sun";
import { CosmicBackdrop } from "./CosmicBackdrop";
import { PlanetDetailPanel } from "./PlanetDetailPanel";

type SpicyUniverseProps = {
  sectionContent: Record<PlanetId, ReactNode>;
};

// 스크롤 가능한 높이를 줘서 "무한한 우주를 비행하는" 느낌을 준다.
// 안쪽 캔버스는 sticky로 뷰포트에 고정되고, 스크롤량만 카메라 전진 거리로 변환한다.
const SCROLL_HEIGHT = "260vh";

export function SpicyUniverse({ sectionContent }: SpicyUniverseProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selected, setSelected] = useState<PlanetId | null>(null);
  const [frozenPosition, setFrozenPosition] = useState<[number, number, number] | null>(null);

  const selectedPlanet = PLANETS.find((p) => p.id === selected) ?? null;

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;

      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }

      const rect = el.getBoundingClientRect();
      const scrolled = Math.min(scrollable, Math.max(0, -rect.top));
      setScrollProgress(scrolled / scrollable);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelect = (id: PlanetId, position: [number, number, number]) => {
    setSelected(id);
    setFrozenPosition(position);
  };

  const handleClose = () => {
    setSelected(null);
    setFrozenPosition(null);
  };

  return (
    <div ref={wrapperRef} className="relative" style={{ height: SCROLL_HEIGHT }}>
      <div className="sticky top-14 z-0 h-[calc(100vh-3.5rem)] overflow-hidden">
        <Canvas camera={{ position: DEFAULT_CAMERA_POSITION, fov: 52 }}>
          <color attach="background" args={["#05040f"]} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.25} />
            <CosmicBackdrop />
            <Sun />
            <CameraRig selectedPosition={frozenPosition} scrollProgress={scrollProgress} />
            {PLANETS.map((planet) => (
              <Planet
                key={planet.id}
                config={planet}
                dimmed={selected !== null && selected !== planet.id}
                showLabel={selected === null}
                frozenPosition={selected === planet.id ? frozenPosition : null}
                onSelect={(position) => handleSelect(planet.id, position)}
              />
            ))}
          </Suspense>
        </Canvas>

        <PlanetDetailPanel planet={selectedPlanet} onClose={handleClose}>
          {selectedPlanet ? sectionContent[selectedPlanet.id] : null}
        </PlanetDetailPanel>

        {!selectedPlanet && (
          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-slate-300/70">
            스크롤하고 행성을 클릭해서 탐험해보세요 🌌
          </p>
        )}
      </div>
    </div>
  );
}

type CameraRigProps = {
  selectedPosition: [number, number, number] | null;
  scrollProgress: number;
};

function CameraRig({ selectedPosition, scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimatingRef = useRef(false);

  useFrame(() => {
    camera.lookAt(lookTarget.current);

    if (!selectedPosition && !isAnimatingRef.current) {
      const targetZ = DEFAULT_CAMERA_POSITION[2] - scrollProgress * 15;
      const targetY = DEFAULT_CAMERA_POSITION[1] + scrollProgress * 3;
      // react-three-fiber 표준 패턴: three.js 객체(camera)는 리렌더 없이 useFrame에서
      // 매 프레임 직접 mutate하는 것이 정석이라 react-hooks/immutability는 여기서 오탐이다.
      // eslint-disable-next-line react-hooks/immutability
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.x += (0 - camera.position.x) * 0.05;
    }
  });

  useEffect(() => {
    const look = lookTarget.current;
    isAnimatingRef.current = true;

    const destination = selectedPosition
      ? {
          x: selectedPosition[0] * 0.55,
          y: selectedPosition[1] * 0.55 + 0.6,
          z: selectedPosition[2] + 3.6,
        }
      : { x: 0, y: DEFAULT_CAMERA_POSITION[1], z: DEFAULT_CAMERA_POSITION[2] };

    gsap.to(camera.position, {
      ...destination,
      duration: 1.5,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    gsap.to(look, {
      x: selectedPosition ? selectedPosition[0] : 0,
      y: selectedPosition ? selectedPosition[1] : 0,
      z: selectedPosition ? selectedPosition[2] : 0,
      duration: 1.5,
      ease: "power3.inOut",
    });

    return () => {
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(look);
    };
  }, [selectedPosition, camera]);

  return null;
}
