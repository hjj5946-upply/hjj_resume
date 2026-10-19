import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiX } from "react-icons/fi";
import type { PlanetConfig, PlanetId } from "./planets.config";

type PlanetDetailPanelProps = {
  planet: PlanetConfig | null;
  content: Record<PlanetId, ReactNode>;
  onClose: () => void;
};

export function PlanetDetailPanel({ planet, content, onClose }: PlanetDetailPanelProps) {
  const isOpen = planet !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 닫힐 때도 페이드아웃이 보이도록 마지막으로 열렸던 행성 내용을 유지한다.
  // (렌더 중 이전 값과 비교해 state를 맞추는 React 권장 패턴)
  const [shownPlanet, setShownPlanet] = useState(planet);
  if (planet && planet !== shownPlanet) {
    setShownPlanet(planet);
  }

  useEffect(() => {
    if (!isOpen) return;

    // 키보드 사용자가 바로 닫기/스크롤할 수 있도록 패널로 포커스를 옮기고, 닫히면 원래 위치로 돌려준다.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-4 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      {shownPlanet && (
        <div
          role="dialog"
          aria-label={shownPlanet.label}
          className={`max-h-[75vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b16]/85 p-6 text-slate-100 shadow-[0_0_60px_-10px_rgba(245,186,59,0.35)] backdrop-blur-xl ${
            isOpen ? "pointer-events-auto" : "invisible pointer-events-none"
          }`}
          // 페이드아웃이 끝난 뒤에야 invisible로 바뀌도록 visibility 전환을 지연시킨다.
          style={{ transition: isOpen ? undefined : "visibility 0s linear 500ms" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span
              className="rounded-full border px-3 py-1 text-xs font-semibold tracking-wide"
              style={{ borderColor: shownPlanet.color, color: shownPlanet.color }}
            >
              {shownPlanet.label}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="닫기 (Esc)"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/40 hover:text-white"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
          {content[shownPlanet.id]}
        </div>
      )}
    </div>
  );
}
