import { SKILL_GROUPS } from "../data/resume.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function SkillsSection() {
  return (
    <>
      <SectionTitle>기술 스택</SectionTitle>
      <dl className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[8.5rem_1fr]">
        {SKILL_GROUPS.map(({ label, items }) => (
          <div key={label} className="contents">
            <dt className="font-semibold text-slate-600 dark:text-slate-400">{label}</dt>
            <dd className="text-slate-800 dark:text-slate-100">{items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
