import { EXPERIENCES, type Experience } from "../data/resume.ts";
import { CARD_SURFACE_CLASS } from "../lib/ui.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function ExperienceSection() {
  return (
    <>
      <SectionTitle>Experience</SectionTitle>

      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        다년간 수행한 역할과 책임 중심으로 정리했습니다.
      </p>

      <div className="mt-4 space-y-5">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.period} {...experience} />
        ))}
      </div>
    </>
  );
}

function ExperienceItem({ period, role, org, bullets }: Experience) {
  return (
    <div className={`p-4 text-sm ${CARD_SURFACE_CLASS}`}>
      <p className="text-xs text-slate-500 dark:text-slate-300">{period}</p>
      <p className="mt-1 font-semibold text-slate-900 dark:text-slate-50">
        {role} · {org}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-700 dark:text-slate-200">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
