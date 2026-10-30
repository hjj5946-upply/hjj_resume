import { useEffect, useState } from "react";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { ScrollToTopButton } from "./components/ScrollToTopButton.tsx";
import { CERTIFICATIONS, EDUCATION, LANGUAGES, PROFILE, TRAININGS } from "./data/resume.ts";
import { applyThemeClass, readStoredTheme, storeTheme, type Theme } from "./lib/theme.ts";
import { CredentialsSection } from "./sections/CredentialsSection.tsx";
import { EducationSection } from "./sections/EducationSection.tsx";
import { ExperienceSection } from "./sections/ExperienceSection.tsx";
import { HighlightsSection } from "./sections/HighlightsSection.tsx";
import { PortfolioSection } from "./sections/PortfolioSection.tsx";
import { ProfileSection } from "./sections/ProfileSection.tsx";
import { ProjectsSection } from "./sections/ProjectsSection.tsx";
import { SkillsSection } from "./sections/SkillsSection.tsx";
import { SummarySection } from "./sections/SummarySection.tsx";
import { TrainingSection } from "./sections/TrainingSection.tsx";

// 브라우저의 "PDF로 저장"은 document.title을 기본 파일명으로 쓴다.
const PDF_FILE_NAME = `${PROFILE.nameKo}_이력서`;

function App() {
  // index.html의 인라인 스크립트가 같은 규칙으로 <html>에 dark 클래스를 선반영해두므로,
  // 여기서도 첫 렌더부터 같은 값을 읽어야 깜빡임이 생기지 않는다.
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  // Ctrl+P로 인쇄해도 같게 동작하도록 버튼이 아니라 인쇄 이벤트에서 처리한다.
  // PDF는 다크 모드에서 뽑아도 항상 라이트 색상으로 나와야 하므로 인쇄 동안 dark 클래스를 뗀다.
  useEffect(() => {
    let originalTitle = document.title;
    const handleBeforePrint = () => {
      originalTitle = document.title;
      document.title = PDF_FILE_NAME;
      applyThemeClass("light");
    };
    const handleAfterPrint = () => {
      document.title = originalTitle;
      applyThemeClass(readStoredTheme());
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  // 사용자가 직접 고른 경우에만 저장한다 (자동 감지값을 저장해버리면 이후 기본값 변경이 반영되지 않음)
  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    storeTheme(next);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#242526] dark:text-slate-50 print:bg-white">
      <Header
        theme={theme}
        onHome={() => window.scrollTo({ top: 0 })}
        onToggleTheme={toggleTheme}
        onDownloadPdf={() => window.print()}
      />

      {/* 인쇄 시에는 화면용 여백을 걷어내 @page 여백만 남긴다. */}
      <main className="mx-auto max-w-[210mm] px-4 pt-10 print:max-w-none print:p-0">
        <article className="space-y-7">
          <ProfileSection />

          <HighlightsSection />

          <section id="summary">
            <SummarySection />
          </section>

          <section id="skills">
            <SkillsSection />
          </section>

          {/* 데이터가 비어 있는 섹션은 제목만 남지 않도록 통째로 렌더링하지 않는다. */}
          {EDUCATION.length > 0 && (
            <section id="education">
              <EducationSection />
            </section>
          )}

          <section id="experience">
            <ExperienceSection />
          </section>

          <section id="projects">
            <ProjectsSection />
          </section>

          <section id="portfolio">
            <PortfolioSection />
          </section>

          {(CERTIFICATIONS.length > 0 || LANGUAGES.length > 0) && (
            <section id="credentials">
              <CredentialsSection />
            </section>
          )}

          {TRAININGS.length > 0 && (
            <section id="training">
              <TrainingSection />
            </section>
          )}
        </article>
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;
