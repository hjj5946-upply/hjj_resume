import { DatedRow } from "../components/DatedRow.tsx";
import { CERTIFICATIONS, LANGUAGES } from "../data/resume.ts";
import { formatYearMonth } from "../lib/career.ts";
import { SectionTitle } from "./SectionTitle.tsx";

// 자격증과 어학은 항목 수가 적은 경우가 많아 한 섹션으로 묶는다.
export function CredentialsSection() {
  const title = [CERTIFICATIONS.length > 0 && "자격증", LANGUAGES.length > 0 && "어학"]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div className="space-y-3">
        {CERTIFICATIONS.map(({ date, name, issuer }) => (
          <DatedRow key={name} date={formatYearMonth(date)} title={name} subtitle={issuer} />
        ))}
        {LANGUAGES.map(({ language, detail, date }) => (
          <DatedRow
            key={`${language}-${detail}`}
            date={date ? formatYearMonth(date) : ""}
            title={detail}
            subtitle={language}
          />
        ))}
      </div>
    </>
  );
}
