import { FiDownload, FiMoon, FiSun } from "react-icons/fi";
import type { Theme } from "../lib/theme.ts";

// public/ 폴더 파일은 import하면 해시된 사본이 하나 더 번들되므로 BASE_URL 경로로 직접 참조한다.
const LOGO_SRC = `${import.meta.env.BASE_URL}main_logo.svg`;

type HeaderProps = {
  theme: Theme;
  onHome: () => void;
  onToggleTheme: () => void;
  onDownloadPdf: () => void;
};

export function Header({ theme, onHome, onToggleTheme, onDownloadPdf }: HeaderProps) {
  const toggleLabel = theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환";

  return (
    <header className="sticky top-0 z-20 print:hidden border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-[#242526]/90">
      <div className="mx-auto flex max-w-[210mm] items-center justify-between px-4 h-14">
        <button
          type="button"
          onClick={onHome}
          aria-label="홈으로"
          className="flex items-center gap-2.5 cursor-pointer select-none text-left"
        >
          <span className="flex items-center justify-center hover:opacity-80 transition-opacity">
            <img src={LOGO_SRC} alt="Logo" width={36} height={36} className="h-9 w-9" />
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="flex h-8 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md dark:border-slate-600 dark:bg-[#383a3d] dark:text-slate-100"
          >
            <FiDownload className="h-3.5 w-3.5" />
            PDF 다운로드
          </button>

          {/* 라이트/다크 토글: 아이콘만 */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={toggleLabel}
            title={toggleLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600 dark:bg-[#383a3d] dark:text-slate-100"
          >
            {theme === "dark" ? (
              <FiSun className="h-4 w-4" />
            ) : (
              <FiMoon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
