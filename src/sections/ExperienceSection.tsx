import { DatedRow } from "../components/DatedRow.tsx";
import { EXPERIENCES, type Experience } from "../data/resume.ts";
import { experienceMonths, formatDuration, formatYearMonth, totalCareerMonths } from "../lib/career.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function ExperienceSection() {
  return (
    <>
      <SectionTitle>
        경력
        <span className="ml-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">
          총 {formatDuration(totalCareerMonths(EXPERIENCES))}
        </span>
      </SectionTitle>
      <div className="space-y-5">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.start} {...experience} />
        ))}
      </div>
    </>
  );
}

function ExperienceItem({ start, end, role, org, bullets }: Experience) {
  return (
    <DatedRow
      date={
        <>
          {formatYearMonth(start)} ~ {end ? formatYearMonth(end) : "재직 중"}
          <span className="ml-1 sm:ml-0 sm:block">({formatDuration(experienceMonths({ start, end }))})</span>
        </>
      }
      title={org}
      subtitle={role}
    >
      <ul className="mt-1.5 list-disc space-y-0.5 pl-4 leading-relaxed text-slate-700 dark:text-slate-300">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </DatedRow>
  );
}
