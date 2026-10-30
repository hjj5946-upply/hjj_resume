import { DatedRow } from "../components/DatedRow.tsx";
import { TRAININGS } from "../data/resume.ts";
import { formatYearMonth } from "../lib/career.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function TrainingSection() {
  return (
    <>
      <SectionTitle>교육</SectionTitle>
      <div className="space-y-3">
        {TRAININGS.map(({ period, name, org, description }) => (
          <DatedRow key={name} date={formatYearMonth(period)} title={name} subtitle={org}>
            {description && (
              <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{description}</p>
            )}
          </DatedRow>
        ))}
      </div>
    </>
  );
}
