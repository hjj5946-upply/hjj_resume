import { DatedRow } from "../components/DatedRow.tsx";
import { EDUCATION } from "../data/resume.ts";
import { formatYearMonth } from "../lib/career.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function EducationSection() {
  return (
    <>
      <SectionTitle>학력</SectionTitle>
      <div className="space-y-3">
        {EDUCATION.map(({ period, school, major, status }) => (
          <DatedRow
            key={school}
            date={formatYearMonth(period)}
            title={school}
            subtitle={[major, status].filter(Boolean).join(" · ")}
          />
        ))}
      </div>
    </>
  );
}
