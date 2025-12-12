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
type View = "home" | "projects";

const PROJECTS = [
  {
    id: "jgamebox",
    name: "J GameBox",
    description:
      "웹 기반 미니 게임 포털. 주사위, 룰렛, 사다리 등 가벼운 게임을 빠르게 즐길 수 있는 PWA 스타일 서비스.",
    techs: ["React", "TypeScript", "Vite", "Tailwind", "Planck.js", "SaaS", "GitHub"],
    link: "https://jun-gamebox.com",
  },
  {
    id: "pickstudy",
    name: "PickStudy",
    description:
      "학원·학생·학부모를 연결하는 통합 관리 서비스. 학원용 앱, 학부모용 앱, 관리 웹을 포함한 풀스택 프로젝트.",
    techs: ["Kotlin", "Jetpack Compose", "FastAPI", "PostgreSQL", "Redis", "Kafka", "Jenkins"],
    link: "https://pick-study.edu",
  },
  {
    id: "toel",
    name: "Btorate",
    description:
      "해외 배송·구매대행·결제/정산·WMS/WCS/SCM를 통합한 B2B 웹 포털. 운영 실무를 위한 관리 콘솔 및 대시보드 구축.",
    techs: ["Java", "Spring Boot", "MySQL", "Redis", "RabbitMQ", "AWS"],
    link: undefined, // 외부에서 볼 수 없으면 undefined 그대로 두면 됨
  },
  {
    id: "wms",
    name: "WMS System",
    description:
      "개인 지출 패턴을 태그와 그래프로 시각화하는 웹 서비스. 카테고리별 분석과 정기 지출 관리 기능 제공.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    link: undefined,
  },
  {
    id: "wcs",
    name: "PAS/DAS",
    description:
      "개인 지출 패턴을 태그와 그래프로 시각화하는 웹 서비스. 카테고리별 분석과 정기 지출 관리 기능 제공.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    link: undefined,
  },
  {
    id: "account",
    name: "씀씀이 기록",
    description:
      "개인 지출 패턴을 태그와 그래프로 시각화하는 웹 서비스. 카테고리별 분석과 정기 지출 관리 기능 제공.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    link: "https://hjj5946-upply.github.io/actbook/lock",
  },
  {
    id: "covid19",
    name: "열화상 데이터",
    description:
      "개인 지출 패턴을 태그와 그래프로 시각화하는 웹 서비스. 카테고리별 분석과 정기 지출 관리 기능 제공.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    link: undefined,
  },
  {
    id: "elfin",
    name: "엘핀 쇼핑몰",
    description:
      "개인 지출 패턴을 태그와 그래프로 시각화하는 웹 서비스. 카테고리별 분석과 정기 지출 관리 기능 제공.",
    techs: ["ReactJS", "Fiber", "SaaS", "supabase", "GitHub"],
    link: undefined,
  },
];

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [view, setView] = useState<View>("home");

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
      setShowScrollTop(window.scrollY > 740);
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
      {view === "home" ? (
        <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
          {/* Hero / 이름 + 한줄소개 + 이미지 영역 */}
          <section className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-700">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              {/* 프로필 이미지 틀 */}
              <div className="w-40 aspect-square flex-shrink-0 rounded-xl border border-slate-300 bg-slate-100 text-xs text-slate-500 dark:border-slate-600 dark:bg-[#383a3d] dark:text-slate-400 flex items-center justify-center md:w-[25%]">
                Image Here
              </div>

              <div className="flex-1">
                {/* <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Portfolio
                </p> */}

                <h2 className="font-inter text-2xl font-semibold tracking-tight">
                  복잡함을 구조로 풀어내는 개발자, 준입니다.
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  복잡한 요구를 핵심만 남겨 재정리하고, 빠르게 실행해 실제로 작동하는 제품으로 만드는 일을 좋아합니다.
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  기술보다 방향과 사용자 경험을 먼저 고민하며, 팀과 제품이 더 잘 움직일 수 있는 구조를 만듭니다.
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
              문제를 기능 단위가 아닌 흐름과 구조 단위로 바라보고, 데이터 기반으로 가설을 검증합니다.
              빠른 프로토타이핑을 통해 리스크를 줄이고, 제품의 성장 단계에 맞춰 기술 스택과 구조를 최적화합니다.
              작은 인터랙션부터 시스템 안정성까지 사용자 경험을 구성하는 모든 요소를 균형 있게 다룹니다.
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
                    "AWS (EC2/RDS)",
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
                    "Supabase",
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
                period="2025-10 ~"
                role="Backend Engineer"
                org="WMS/WCS Core Automation Systems"
                bullets={[
                  "중장비 물류 환경을 위한 재고 관리 시스템 및 WCS 코어 제어 시스템 운영·관리",
                  "WCS 기반 설비 제어 로직 및 로봇 제어 시스템 유지보수 및 안정화",
                  "물류 자동화 설비와 연계된 내부 코어 시스템 관리 및 운영 지원"
                ]}
              />
              <ExperienceItem
                period="2022-01 ~ 2025-09"
                role="Backend Engineer"
                org="Game Embedded & Internal Core Systems"
                bullets={[
                  "게임 서비스 운영을 위한 사내 내부 코어 시스템 및 관리 도구 개발",
                  "게임 데이터 기반 정산 시스템 및 운영 지원 백엔드 로직 구현",
                  "사내 직원 관리 및 운영 편의를 위한 내부 프로그램 개발",
                  "서비스 운영에 필요한 관리 기능 및 업무 자동화 도구 구축"
                ]}
              />
              {/* <ExperienceItem
                period="2025-10 ~"
                role="Backend Engineer"
                org="Commercial Vehicle Service & Parts System"
                bullets={[
                  "벤츠트럭(BENZ Truck), MAN 트럭 등 상용차 제조사의 직영·대리점 서비스 정비센터를 위한 정비 시스템 구축 및 운영",
                  "차량 입고부터 PDI, 정비 이력 관리까지 정비 전 과정을 관리하는 백엔드 시스템 설계·구현",
                  "정비 시스템 내 SAP 연동을 통한 부품, 비용, 환율 기반 관리 로직 개발",
                  "차량 부품 WMS 시스템 구축 및 재고 흐름 관리 기능 구현",
                  "운영 중인 상용 시스템의 유지보수 및 안정화 작업 수행"
                ]}
              />
              <ExperienceItem
                period="2022-01 ~ 2025-09 (3년 8개월)"
                role="Backend Engineer / Full-Stack Engineer"
                org="Overseas Commerce & Logistics Platform"
                bullets={[
                  "해외 구매대행·배송대행·역구매대행 서비스를 제공하는 커머스/물류 플랫폼을 백지 상태에서 설계·구축",
                  "해외 결제 API, 배송사 API 연동을 포함한 주문·결제·배송 전체 흐름의 백엔드 시스템 개발",
                  "외부 쇼핑몰이 자사 API 버튼을 통해 구매대행 및 장바구니 기능을 사용할 수 있는 연동 구조 설계",
                  "내부 운영을 위한 경량 WMS 형태의 재고 관리 시스템 구축 및 운영",
                  "안드로이드 앱 개발에 직접 참여하여 서비스 기능 구현 및 운영 지원"
                ]}
              /> */}
              <ExperienceItem
                period="2017-06 ~ 2021-12 (4년 6개월)"
                role="Web / Backend Engineer"
                org="WMS/WCS Core Solution"
                bullets={[
                  "중소·대기업 및 화주사 물류센터에 납품되는 WMS 솔루션 설계·개발 및 유지보수",
                  "PAS/DAS/DPS 등 WCS 피킹·분배 시스템 구현 및 설비 제어 로직 개발, 현장 연동 및 안정화",
                  "AGV, 로봇팔 등 자동화 설비와 연계된 물류 프로세스 구축 및 운영 지원",
                  "ERP·SAP 등 외부 시스템과의 데이터 연동 및 인터페이스 개발",
                  "내부 SCM 물류 포털 및 MES 시스템 개발·운영"
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
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              최근에 집중해서 만들었던 프로젝트 몇 가지를 정리했습니다.
            </p>

            {/* 상위 4개만 노출 */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {PROJECTS.slice(0, 4).map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  techs={project.techs}
                  link={project.link}
                />
              ))}
            </div>

            {/* 전체 보기 버튼 */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setView("projects")}
                className="text-xs font-medium text-slate-600 underline-offset-4 hover:underline dark:text-slate-200"
              >
                전체 프로젝트 보기 →
              </button>
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
      ) : (
        <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
          <ProjectsPage onBack={() => setView("home")} />
        </main>
      )}

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

type ProjectsPageProps = {
  onBack: () => void;
};

function ProjectsPage({ onBack }: ProjectsPageProps) {
  return (
    <section className="mb-8">
      <SectionTitle>All Projects</SectionTitle>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        실제로 운영·출시했거나 의미 있게 진행했던 프로젝트들을 정리했습니다.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.description}
            techs={project.techs}
            link={project.link}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-slate-600 underline-offset-4 hover:underline dark:text-slate-200"
        >
          메인으로 돌아가기
        </button>
      </div>
    </section>
  );
}

export default App;
