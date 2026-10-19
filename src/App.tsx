import { Suspense, lazy, useEffect, useMemo, useState, type ReactNode } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { ScrollToTopButton } from "./components/ScrollToTopButton.tsx";
import {
  applyThemeClass,
  isWebGLAvailable,
  readStoredTheme,
  storeTheme,
  type Theme,
} from "./lib/theme.ts";
import { ContactSection } from "./sections/ContactSection.tsx";
import { ExperienceSection } from "./sections/ExperienceSection.tsx";
import { HeroSection } from "./sections/HeroSection.tsx";
import { ProjectsPage, ProjectsSection } from "./sections/ProjectsSection.tsx";
import { SkillsSection } from "./sections/SkillsSection.tsx";
import { SummarySection } from "./sections/SummarySection.tsx";
import type { PlanetId } from "./spicy/planets.config.ts";

type View = "home" | "projects";

// three.js 등 무거운 의존성은 매운맛 모드로 전환할 때만 필요하므로 별도 청크로 분리한다.
const SpicyUniverse = lazy(() =>
  import("./spicy/SpicyUniverse.tsx").then((m) => ({ default: m.SpicyUniverse }))
);

const SECTION_DIVIDER_CLASS = "mb-8 border-t border-slate-200 pt-6 dark:border-slate-700";

function SpicyUniverseFallback() {
  return (
    <div className="fixed inset-x-0 bottom-0 top-14 z-0 flex items-center justify-center bg-[#05040f] text-sm text-slate-300">
      우주로 이동하는 중...
    </div>
  );
}

function SpicyUniverseUnavailable({ onExit }: { onExit: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 top-14 z-0 flex flex-col items-center justify-center gap-3 bg-[#05040f] px-4 text-center text-sm text-slate-300">
      <p>이 브라우저/기기에서는 3D 우주를 불러올 수 없습니다.</p>
      <button
        type="button"
        onClick={onExit}
        className="rounded-full border border-accent-light/70 px-4 py-1.5 text-xs font-medium text-accent-light transition-colors hover:bg-accent-light/10"
      >
        순한맛으로 보기
      </button>
    </div>
  );
}

function App() {
  // index.html의 인라인 스크립트가 같은 규칙으로 <html>에 dark 클래스를 선반영해두므로,
  // 여기서도 첫 렌더부터 같은 값을 읽어야 깜빡임이 생기지 않는다.
  const [theme, setTheme] = useState<Theme>(readStoredTheme);
  const [view, setView] = useState<View>("home");
  const [webGLAvailable] = useState(isWebGLAvailable);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  // 사용자가 직접 고른 경우에만 저장한다 (자동 감지값을 저장해버리면 이후 기본값 변경이 반영되지 않음)
  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    storeTheme(next);
  };

  const goHome = () => {
    setView("home");
    window.scrollTo({ top: 0 });
  };

  // setView는 안정적인 참조라 한 번만 만들어 3D 패널에 넘긴다.
  const sectionContent = useMemo<Record<PlanetId, ReactNode>>(
    () => ({
      summary: <SummarySection />,
      skills: <SkillsSection />,
      experience: <ExperienceSection />,
      projects: <ProjectsSection onShowAll={() => setView("projects")} />,
      contact: <ContactSection />,
    }),
    []
  );

  const isSpicyUniverseActive = theme === "dark" && view === "home";

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#242526] dark:text-slate-50">
      <Header theme={theme} onHome={goHome} onToggleTheme={toggleTheme} />

      {view === "projects" ? (
        <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
          <ProjectsPage onBack={() => setView("home")} />
        </main>
      ) : isSpicyUniverseActive ? (
        <ErrorBoundary fallback={<SpicyUniverseUnavailable onExit={toggleTheme} />}>
          {webGLAvailable ? (
            <Suspense fallback={<SpicyUniverseFallback />}>
              <SpicyUniverse sectionContent={sectionContent} />
            </Suspense>
          ) : (
            <SpicyUniverseUnavailable onExit={toggleTheme} />
          )}
        </ErrorBoundary>
      ) : (
        <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
          <HeroSection />

          <section id="summary" className="mb-8">
            <SummarySection />
          </section>

          <section id="skills" className={SECTION_DIVIDER_CLASS}>
            <SkillsSection />
          </section>

          <section id="experience" className={SECTION_DIVIDER_CLASS}>
            <ExperienceSection />
          </section>

          <section id="projects" className={SECTION_DIVIDER_CLASS}>
            <ProjectsSection onShowAll={() => setView("projects")} />
          </section>

          <section id="contact" className="border-t border-slate-200 pt-6 dark:border-slate-700">
            <ContactSection />
          </section>
        </main>
      )}

      {!isSpicyUniverseActive && (
        <>
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
