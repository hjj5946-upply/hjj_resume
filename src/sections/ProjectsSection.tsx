import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";
import { PROJECTS, PROJECTS_NOTE, WEB_PREVIEW_PROJECT_COUNT, type Project, type ProjectType } from "../data/resume.ts";
import { toLinkLabel } from "../lib/links.ts";
import { SectionTitle } from "./SectionTitle.tsx";

const HIDDEN_COUNT = PROJECTS.length - WEB_PREVIEW_PROJECT_COUNT;

export function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <SectionTitle>프로젝트</SectionTitle>
      {/* 항목 수가 많아 구분선으로 프로젝트 경계를 확실히 나눈다. */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {PROJECTS.map((project, index) => (
          // 접힌 상태에서도 PDF에는 전부 나와야 하므로 DOM에서 빼지 않고 화면에서만 숨긴다.
          <ProjectItem
            key={project.id}
            {...project}
            hiddenOnScreen={!expanded && index >= WEB_PREVIEW_PROJECT_COUNT}
          />
        ))}
      </div>

      {PROJECTS_NOTE && (
        <p className="mt-3 text-[13px] text-slate-500 dark:text-slate-400">{PROJECTS_NOTE}</p>
      )}

      {HIDDEN_COUNT > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded border border-slate-300 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/40 print:hidden"
        >
          {expanded ? (
            <>
              접기 <FiChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              프로젝트 {HIDDEN_COUNT}개 더보기 <FiChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      )}
    </>
  );
}

type ProjectItemProps = Project & { hiddenOnScreen: boolean };

// 자사/외주/개인을 색으로도 구분해 목록을 훑을 때 바로 보이게 한다.
const TYPE_BADGE_CLASS: Record<ProjectType, string> = {
  자사: "border-slate-800 bg-slate-800 text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900",
  외주: "border-slate-400 text-slate-600 dark:border-slate-500 dark:text-slate-300",
  개인: "border-accent text-accent dark:border-accent-light dark:text-accent-light",
};

function ProjectItem({ name, type, period, status, group, description, techs, achievement, links, hiddenOnScreen }: ProjectItemProps) {
  return (
    <article
      className={`break-inside-avoid py-3 text-sm first:pt-0 ${hiddenOnScreen ? "hidden print:block" : ""}`}
    >
      {group && (
        <p className="mb-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400">{group}</p>
      )}
      <h3 className="flex flex-wrap items-center gap-x-2 text-[15px] font-bold text-slate-900 dark:text-slate-50">
        <span className="border-l-[3px] border-accent pl-2 dark:border-accent-light">{name}</span>
        <span className={`rounded border px-1.5 py-px text-[11px] font-semibold leading-4 ${TYPE_BADGE_CLASS[type]}`}>
          {type}
        </span>
        <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
          {period}
          {status && ` · ${status}`}
        </span>
      </h3>
      <p className="mt-1.5 leading-relaxed text-slate-700 dark:text-slate-300">{description}</p>
      {achievement && (
        <p className="mt-1 font-medium text-slate-900 dark:text-slate-50">
          <span className="mr-1 text-[13px] font-semibold text-accent dark:text-accent-light">성과</span>
          {achievement}
        </p>
      )}
      {techs.length > 0 && (
        <ul className="mt-1.5 flex flex-wrap gap-1">
          {techs.map((tech) => (
            <li
              key={tech}
              className="rounded border border-slate-200 px-1.5 py-px text-xs text-slate-600 dark:border-slate-600 dark:text-slate-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
      {links && links.length > 0 && (
        <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[13px]">
          {links.map(({ label, url }) => (
            <li key={url} className="flex items-center gap-1.5">
              <FiExternalLink className="h-3 w-3 text-slate-400" aria-hidden />
              <span className="font-semibold text-slate-500 dark:text-slate-400">{label}</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline dark:text-accent-light"
              >
                {toLinkLabel(url)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
