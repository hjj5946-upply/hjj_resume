import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCES,
  LANGUAGES,
  PROJECTS,
} from "../data/resume.ts";
import { formatDuration, totalCareerMonths } from "../lib/career.ts";

type Highlight = { label: string; value: string; detail?: string };

// 이력서 상단 요약 줄. 데이터가 없는 항목(학력·자격증·어학)은 빈칸 대신 아예 뺀다.
function buildHighlights(): Highlight[] {
  const [latestEducation] = EDUCATION;
  const [firstLanguage] = LANGUAGES;

  const items: (Highlight | false | undefined)[] = [
    latestEducation && {
      label: "최종학력",
      value: latestEducation.school,
      detail: [latestEducation.major, latestEducation.status, latestEducation.period].filter(Boolean).join(" · "),
    },
    {
      label: "총 경력",
      value: formatDuration(totalCareerMonths(EXPERIENCES)),
      // 종료일이 없는 경력이 하나라도 있으면 현재 재직 중으로 본다.
      detail: EXPERIENCES.some((e) => !e.end) ? "재직 중" : undefined,
    },
    CERTIFICATIONS.length > 0 && {
      label: "자격증",
      value: `${CERTIFICATIONS.length}개`,
      detail: CERTIFICATIONS.map((c) => c.name).join(", "),
    },
    firstLanguage && {
      label: "어학",
      value: firstLanguage.detail,
      detail: firstLanguage.language,
    },
    { label: "프로젝트", value: `${PROJECTS.length}건` },
  ];
  return items.filter((item): item is Highlight => Boolean(item));
}

export function HighlightsSection() {
  return (
    <dl className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] divide-x divide-slate-200 rounded border border-slate-300 dark:divide-slate-700 dark:border-slate-600">
      {buildHighlights().map(({ label, value, detail }) => (
        <div key={label} className="px-4 py-3">
          <dt className="text-[13px] text-slate-500 dark:text-slate-400">{label}</dt>
          <dd className="mt-0.5 text-[15px] font-bold text-slate-900 dark:text-slate-50">{value}</dd>
          {detail && <dd className="text-[13px] text-slate-600 dark:text-slate-400">{detail}</dd>}
        </div>
      ))}
    </dl>
  );
}
