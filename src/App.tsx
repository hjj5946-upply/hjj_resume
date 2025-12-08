import { useEffect, useState } from "react";
import { SkillChart } from "./components/SkillChart.tsx";
import LogoImg from "/android-icon-192x192.png";

import {
  FiGithub,
  FiInstagram,
  FiMail,
  FiArrowUp,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { SiNotion } from "react-icons/si";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 초기 테마 로드
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme: Theme =
      stored ?? (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
  }, []);

  // html에 dark 클래스 적용 + localStorage 저장
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // 스크롤 위치에 따라 "위로 올리기" 버튼 표시
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth transition-colors dark:bg-[#242526] dark:text-slate-50">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-[#242526]/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 h-14">
    
          <div
            onClick={() => window.location.reload()}
            className="flex items-center cursor-pointer select-none"
          >
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center rounded-md p-1 hover:opacity-80 transition-opacity"
            >
              <img
                src={LogoImg}
                alt="Logo"
                className="max-h-16 w-auto object-contain" 
              />
            </button>

            <div className="flex flex-col leading-tight">
              <span className="text-s font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Hong JeongJun
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Full-Stack Software Engineer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 카테고리 네비게이션 - 일단 숨김 (추후 활성화) */}
            <nav className="hidden">
              <NavLink href="#summary" label="Summary" />
              <NavLink href="#skills" label="Skills" />
              <NavLink href="#experience" label="Experience" />
              <NavLink href="#projects" label="Projects" />
              <NavLink href="#contact" label="Contact" />
            </nav>

            {/* 다크모드 토글: 아이콘만 */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
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

        {/* 메인 컨테이너 */}
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
        {/* Hero / 이름 + 한줄소개 + 이미지 영역 */}
        <section className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-700">
          <div className="flex items-start gap-6">
            {/* 프로필 이미지 틀 */}
            <div className="h-32 w-32 flex-shrink-0 rounded-xl border border-slate-300 bg-slate-100 text-xs text-slate-500 dark:border-slate-600 dark:bg-[#383a3d] dark:text-slate-400 flex items-center justify-center">
              Image Here
            </div>

            <div className="flex-1">
              {/* <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Portfolio
              </p> */}

              <h2 className="font-inter text-2xl font-semibold tracking-tight">
                복잡함을 구조로 풀어내는 개발자, 준입니다.
              </h2>

              <p className="mt-3 text-s leading-relaxed text-slate-600 dark:text-slate-300">
                웹·모바일·백엔드를 넘나들며 문제의 본질을 찾고,
                서비스가 단순하게 작동하도록 만드는 데 집중합니다.
              </p>

              <p className="mt-2 text-s leading-relaxed text-slate-600 dark:text-slate-300">
                기술보다 흐름과 사용자 경험을 먼저 고민하며,
                제품이 실제로 가치로 이어지는 구조를 설계합니다.
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToProjects();
                }}
                className="inline-flex items-center rounded-full border border-accent/70 bg-accent/90 px-4 py-1.5 text-sm font-medium text-white transition-colors duration-300 ease-out hover:bg-accent dark:border-accent-light/70 dark:bg-accent-light/90 dark:hover:bg-accent-light"
              >
                프로젝트 보기
              </a>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section id="summary" className="mb-8">
          <SectionTitle>Summary</SectionTitle>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            복잡한 흐름을 단순한 구조로 정리하고, 실제로 작동하는 제품으로 연결하는 과정에 집중합니다.
            웹·모바일·백엔드를 넘나들며 필요한 것을 빠르게 실험하고 구현합니다.
            작은 디테일과 인터랙션이 만드는 사용자 경험을 중요하게 생각하며,
            더 나은 사용성을 향해 지속적으로 개선합니다.
          </p>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="mb-8 border-t border-slate-200 pt-6 dark:border-slate-700"
        >
          <SectionTitle>Skills</SectionTitle>

          <div className="mt-4 space-y-5 text-sm">
            <div className="mt-4 space-y-4 text-sm">
              <SkillRow
                label="Backend / API"
                items={[
                  "Java (Spring Boot)",
                  "Python (FastAPI)",
                  "C# (ASP.NET)",
                  "RabbitMQ",
                  "Kafka",
                ]}
              />
              <SkillRow
                label="Frontend / UI"
                items={[
                  "React",
                  "TypeScript",
                  "Vite",
                  "Tailwind CSS",
                  "GSAP",
                ]}
              />
              <SkillRow
                label="Mobile"
                items={["Android (Kotlin, Jetpack Compose)"]}
              />
              <SkillRow
                label="Infra / DevOps"
                items={[
                  "AWS (EC2, ECS, RDS)",
                  "Docker",
                  "Jenkins",
                  "CI/CD",
                ]}
              />
              <SkillRow
                label="Data / Storage"
                items={[
                  "PostgreSQL",
                  "MySQL",
                  "MSSQL",
                  "MariaDB",
                  "Redis",
                ]}
              />
            </div>

            {/* 아래: Tech 비중 차트 카드 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs shadow-sm dark:border-slate-600 dark:bg-[#383a3d]">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-slate-700 dark:text-slate-100">
                  Tech Proficiency Overview
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-300">
                  상대적인 비중 / 활용도 기준 (0–100)
                </p>
              </div>

              {/* 범례(카테고리) */}
              <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-500 dark:text-slate-300">
                <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-500">
                  Backend
                </span>
                <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-500">
                  Frontend
                </span>
                <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-500">
                  Mobile
                </span>
                <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-500">
                  Infra / DevOps
                </span>
              </div>

              {/* 차트 영역 */}
              <div className="mt-3 h-64">
                <SkillChart />
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="mb-8 border-t border-slate-200 pt-6 dark:border-slate-700"
        >
          <SectionTitle>Experience</SectionTitle>

          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            다년간 수행한 역할과 책임 중심으로 정리했습니다.
          </p>

          <div className="mt-4 space-y-5">
            <ExperienceItem
              period="2023 — 현재"
              role="EdTech 서비스 개발자"
              org="학원/교육 플랫폼"
              bullets={[
                "학원, 학부모, 학생을 연결하는 통합 서비스의 앱·웹·백엔드 개발 전반을 담당.",
                "Android(Kotlin, Jetpack Compose)와 FastAPI, PostgreSQL 기반의 서비스 설계 및 구현.",
                "실제 운영 환경에서 기능 개선, 성능 튜닝, 장애 대응 등을 경험.",
              ]}
            />
            <ExperienceItem
              period="이전"
              role="웹/백엔드 개발자"
              org="웹 서비스 및 내부 시스템"
              bullets={[
                "내부 운영 도구 및 웹 서비스 개발, 유지보수 경험.",
                "REST API 설계, 인증/인가, 간단한 배포 자동화 등 다양한 백엔드 실무를 수행.",
              ]}
            />
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="mb-8 border-t border-slate-200 pt-6 dark:border-slate-700"
        >
          <SectionTitle>Projects</SectionTitle>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ProjectCard
              name="PickStudy"
              description="학원/학생/학부모를 위한 통합 관리 서비스. 학원용 앱, 학부모용 앱, 관리 웹을 포함."
              techs={["Kotlin", "Jetpack Compose", "FastAPI", "PostgreSQL"]}
              link="#"
            />
            <ProjectCard
              name="J GameBox"
              description="웹 기반 미니 게임 포털. 주사위, 룰렛, 사다리 등 간단한 게임 모음."
              techs={["React", "TypeScript", "Vite", "Tailwind"]}
              link="https://example.com"
            />
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-slate-200 pt-6 dark:border-slate-700"
        >
          <SectionTitle>Contact</SectionTitle>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            협업 제안, 문의, 기타 연락은 아래 채널로 부탁드립니다.
          </p>
          <div className="mt-3 space-y-1 text-sm">
            <p>Email: hjj5946@gmail.com</p>
          </div>
        </section>
      </main>

      {/* 우측 하단 스크롤 위로 버튼 */}
      <ScrollToTopButton visible={showScrollTop} onClick={scrollToTop} />

      <Footer />
    </div>
  );
}

/* ───────── 컴포넌트들 ───────── */

type NavLinkProps = { href: string; label: string };

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a
      href={href}
      className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    >
      {label}
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="h-[4px] w-4 rounded-full bg-accent/80" />
      <h2 className="font-inter text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        {children}
      </h2>
    </div>
  );
}

type SkillRowProps = { label: string; items: string[] };

function SkillRow({ label, items }: SkillRowProps) {
  return (
    <div className="flex flex-col gap-1 text-sm md:flex-row md:items-baseline md:gap-4">
      <div className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-800 dark:border-slate-600 dark:bg-[#383a3d] dark:text-slate-50"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

type ExperienceItemProps = {
  period: string;
  role: string;
  org: string;
  bullets: string[];
};

function ExperienceItem({ period, role, org, bullets }: ExperienceItemProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm shadow-sm dark:border-slate-600 dark:bg-[#383a3d]">
      <p className="text-xs text-slate-500 dark:text-slate-300">{period}</p>
      <p className="mt-1 font-semibold text-slate-900 dark:text-slate-50">
        {role} · {org}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-700 dark:text-slate-200">
        {bullets.map((b, idx) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

type ProjectCardProps = {
  name: string;
  description: string;
  techs: string[];
  link?: string;
};

function ProjectCard({ name, description, techs, link }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm shadow-sm dark:border-slate-600 dark:bg-[#383a3d]">
      <h3 className="font-inter text-sm font-semibold text-slate-900 dark:text-slate-50">
        {name}
      </h3>
      <p className="mt-2 flex-1 text-slate-700 dark:text-slate-200">
        {description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {techs.map((t) => (
          <span
            key={t}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-800 dark:bg-[#4a4c50] dark:text-slate-50"
          >
            {t}
          </span>
        ))}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          className="mt-3 text-xs font-medium text-accent dark:text-accent-light hover:underline"
        >
          View project →
        </a>
      )}
    </article>
  );
}

type ScrollToTopButtonProps = {
  visible: boolean;
  onClick: () => void;
};

function ScrollToTopButton({
  visible,
  onClick,
}: ScrollToTopButtonProps) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      aria-label="Scroll to top"
      className="fixed bottom-5 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-accent-light/70 dark:bg-[#383a3d]/90 dark:text-slate-100 md:bottom-7 md:right-8"
    >
      <FiArrowUp className="h-4 w-4" />
    </button>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
      <div className="mb-3 flex justify-center gap-6 text-2xl">
        {/* GitHub */}
        <a
          href="https://github.com/hjj5946-upply"
          target="_blank"
          className="transition-colors duration-300 ease-out hover:text-accent dark:hover:text-accent-light"
        >
          <FiGithub />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/h_j_jjjjjjjjjj/"
          target="_blank"
          className="transition-colors duration-300 ease-out hover:text-accent dark:hover:text-accent-light"
        >
          <FiInstagram />
        </a>

        {/* Notion */}
        <a
          href="https://your-notion-url"
          target="_blank"
          className="transition-colors duration-300 ease-out hover:text-accent dark:hover:text-accent-light"
        >
          <SiNotion />
        </a>

        {/* Email */}
        <a
          href="mailto:hjj5946@gmail.com"
          className="transition-colors duration-300 ease-out hover:text-accent dark:hover:text-accent"
        >
          <FiMail />
        </a>
      </div>

      <p>© {year} Hong JeongJun.</p>
    </footer>


  );
}

const scrollToProjects = () => {
  const el = document.getElementById("projects");
  if (!el) return;

  const headerOffset = 72; // 대략 h-14 + 여유
  const rect = el.getBoundingClientRect();
  const offsetTop = rect.top + window.scrollY - headerOffset;

  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
};

export default App;
