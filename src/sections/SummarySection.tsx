import { PROFILE } from "../data/resume.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function SummarySection() {
  return (
    <>
      <SectionTitle>자기소개</SectionTitle>
      <p className="text-[15px] font-semibold text-slate-900 dark:text-slate-50">{PROFILE.headline}</p>
      {PROFILE.summary.map((paragraph) => (
        <p key={paragraph} className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {paragraph}
        </p>
      ))}
    </>
  );
}
