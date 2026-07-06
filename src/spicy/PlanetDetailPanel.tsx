import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import type { PlanetConfig } from "./planets.config";

type PlanetDetailPanelProps = {
  planet: PlanetConfig | null;
  onClose: () => void;
  children?: ReactNode;
};

export function PlanetDetailPanel({ planet, onClose, children }: PlanetDetailPanelProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-4 transition-opacity duration-500 ${
        planet ? "opacity-100" : "opacity-0"
      }`}
    >
      {planet && (
        <div className="pointer-events-auto max-h-[75vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b16]/85 p-6 text-slate-100 shadow-[0_0_60px_-10px_rgba(245,186,59,0.35)] backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <span
              className="rounded-full border px-3 py-1 text-xs font-semibold tracking-wide"
              style={{ borderColor: planet.color, color: planet.color }}
            >
              {planet.label}
            </span>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/40 hover:text-white"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
