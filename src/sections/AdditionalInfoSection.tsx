import { ADDITIONAL_INFO } from "../data/resume.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function AdditionalInfoSection() {
  return (
    <>
      <SectionTitle>병역 · 취업우대사항</SectionTitle>
      <dl className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[9.5rem_1fr]">
        {ADDITIONAL_INFO.map(({ label, value }) => (
          <div key={label} className="contents">
            <dt className="font-semibold text-slate-600 dark:text-slate-400">{label}</dt>
            <dd className="text-slate-800 dark:text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
