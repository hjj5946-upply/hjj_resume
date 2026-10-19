import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
const SCROLL_HEIGHT = "260svh";

export function SpicyUniverse({ sectionContent }: SpicyUniverseProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 스크롤 진행도는 CameraRig의 useFrame에서만 읽으므로 state가 아닌 ref로 둬서
  // 스크롤할 때마다 3D 씬 전체가 리렌더되지 않게 한다.
  const scrollProgressRef = useRef(0);
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
        scrollProgressRef.current = 0;
        return;
      }

      const rect = el.getBoundingClientRect();
      const scrolled = Math.min(scrollable, Math.max(0, -rect.top));
      scrollProgressRef.current = scrolled / scrollable;
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

  const handleSelect = useCallback((id: PlanetId, position: [number, number, number]) => {
    setSelected(id);
    setFrozenPosition(position);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
    setFrozenPosition(null);
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: SCROLL_HEIGHT }}>
      {/* 모바일 주소창이 접히고 펴질 때마다 캔버스가 리사이즈되지 않도록 svh(작은 뷰포트 기준)를 쓴다 */}
      <div className="sticky top-14 z-0 h-[calc(100svh-3.5rem)] overflow-hidden">
        {/* 고해상도 모바일에서 2배 해상도로 그리지 않도록 dpr 상한을 둔다 */}
        <Canvas
          camera={{ position: DEFAULT_CAMERA_POSITION, fov: 52 }}
          dpr={[1, 1.5]}
          // 행성이 아닌 빈 공간을 클릭하면 상세 패널을 닫는다
          onPointerMissed={handleClose}
        >
          <color attach="background" args={["#05040f"]} />
          <Suspense fallback={null}>
            <ambientLight intensity={0.25} />
            <CosmicBackdrop />
            <Sun />
            <CameraRig selectedPosition={frozenPosition} scrollProgressRef={scrollProgressRef} />
            {PLANETS.map((planet) => (
              <Planet
                key={planet.id}
                config={planet}
                dimmed={selected !== null && selected !== planet.id}
                showLabel={selected === null}
                frozenPosition={selected === planet.id ? frozenPosition : null}
                onSelect={handleSelect}
              />
            ))}
          </Suspense>
        </Canvas>

        <PlanetDetailPanel planet={selectedPlanet} content={sectionContent} onClose={handleClose} />

        {!selectedPlanet && (
          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-slate-300/70">
            스크롤하고 행성을 클릭해서 탐험해보세요 🌌
          </p>
        )}
      </div>
    </div>
  );
}

// 프레임레이트와 무관하게 일정한 속도로 목표에 수렴하는 지수 감쇠 계수.
// 3이면 60fps 기준 프레임당 약 5%씩 다가가며 약 1.5초 안에 거의 도달한다.
const CAMERA_DAMPING = 3;

type CameraRigProps = {
  selectedPosition: [number, number, number] | null;
  scrollProgressRef: RefObject<number>;
};

function CameraRig({ selectedPosition, scrollProgressRef }: CameraRigProps) {
  const [lookTarget] = useState(() => new THREE.Vector3());
  const [positionGoal] = useState(() => new THREE.Vector3());
  const [lookGoal] = useState(() => new THREE.Vector3());

  // 선택된 행성이 있으면 그 행성을 비스듬히 바라보는 위치로, 없으면 스크롤 진행도만큼 전진한 위치로
  // 매 프레임 부드럽게 수렴시킨다. (트윈 라이브러리 없이 선택/해제/스크롤 전환이 모두 자연스럽게 이어짐)
  useFrame(({ camera }, delta) => {
    if (selectedPosition) {
      const [x, y, z] = selectedPosition;
      positionGoal.set(x * 0.55, y * 0.55 + 0.6, z + 3.6);
      lookGoal.set(x, y, z);
    } else {
      const progress = scrollProgressRef.current;
      positionGoal.set(
        0,
        DEFAULT_CAMERA_POSITION[1] + progress * 3,
        DEFAULT_CAMERA_POSITION[2] - progress * 15
      );
      lookGoal.set(0, 0, 0);
    }

    const alpha = 1 - Math.exp(-CAMERA_DAMPING * delta);
    camera.position.lerp(positionGoal, alpha);
    lookTarget.lerp(lookGoal, alpha);
    camera.lookAt(lookTarget);
  });

  return null;
}
