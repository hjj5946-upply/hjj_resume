import { FiHome } from "react-icons/fi";
import { TbRobotFace } from "react-icons/tb";
import type { Theme } from "../lib/theme.ts";

// public/ 폴더 파일은 import하면 해시된 사본이 하나 더 번들되므로 BASE_URL 경로로 직접 참조한다.
const LOGO_SRC = `${import.meta.env.BASE_URL}android-icon-192x192.png`;

type HeaderProps = {
  theme: Theme;
  onHome: () => void;
  onToggleTheme: () => void;
};

export function Header({ theme, onHome, onToggleTheme }: HeaderProps) {
  const toggleLabel = theme === "dark" ? "순한맛으로 전환" : "매운맛으로 전환";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-[#242526]/90">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 h-14">
        <button
          type="button"
          onClick={onHome}
          aria-label="홈으로"
          className="flex items-center cursor-pointer select-none text-left"
        >
          <span className="flex items-center justify-center rounded-md p-1 hover:opacity-80 transition-opacity">
            <img
              src={LOGO_SRC}
              alt="Logo"
              width={48}
              height={48}
              className="max-h-16 w-auto object-contain"
            />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Hong JeongJun
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              BackEnd Software Engineer
            </span>
          </span>
        </button>

        {/* 순한맛/매운맛 토글: 아이콘만 */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={toggleLabel}
          title={toggleLabel}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600 dark:bg-[#383a3d] dark:text-slate-100"
        >
          {theme === "dark" ? (
            <FiHome className="h-4 w-4" />
          ) : (
            <TbRobotFace className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
