import { ProjectCard } from "../components/ProjectCard.tsx";
import { FEATURED_PROJECT_COUNT, PROJECTS } from "../data/resume.ts";
import { SectionTitle } from "./SectionTitle.tsx";

const FEATURED_PROJECTS = PROJECTS.slice(0, FEATURED_PROJECT_COUNT);

type ProjectsSectionProps = { onShowAll: () => void };

export function ProjectsSection({ onShowAll }: ProjectsSectionProps) {
  return (
    <>
      <SectionTitle>Projects</SectionTitle>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        최근에 집중해서 만들었던 프로젝트 몇 가지를 정리했습니다.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onShowAll}
          className="text-xs font-medium text-slate-600 underline-offset-4 hover:underline dark:text-slate-200"
        >
          전체 프로젝트 보기 →
        </button>
      </div>
    </>
  );
}

type ProjectsPageProps = { onBack: () => void };

export function ProjectsPage({ onBack }: ProjectsPageProps) {
  return (
    <section className="mb-8">
      <SectionTitle>All Projects</SectionTitle>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        자사, 외주·프리랜서 및 개인 프로젝트 중 실제 서비스 기준으로 개발을 완료하고, 인계 또는 운영까지 수행한 프로젝트들을 정리했습니다.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
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
