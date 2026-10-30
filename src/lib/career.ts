import type { Experience } from "../data/resume.ts";

// "YYYY-MM" 문자열을 월 단위 정수로 바꿔 기간 계산을 단순하게 한다.
function toMonthIndex(yearMonth: string) {
  const [year, month] = yearMonth.split("-").map(Number);
  return year * 12 + (month - 1);
}

function currentMonthIndex() {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

// 기존 이력서 표기(2022-01 ~ 2025-09 = 3년 8개월)와 맞추기 위해 시작·종료 월의 차이로 계산한다.
export function experienceMonths({ start, end }: Pick<Experience, "start" | "end">) {
  return (end ? toMonthIndex(end) : currentMonthIndex()) - toMonthIndex(start);
}

export function totalCareerMonths(experiences: Experience[]) {
  return experiences.reduce((sum, experience) => sum + experienceMonths(experience), 0);
}

export function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest}개월`;
  return rest === 0 ? `${years}년` : `${years}년 ${rest}개월`;
}

// "2011-03" 또는 "2011-03 ~ 2017-02" 같은 기간 문자열을 "2011.03" 표기로 통일한다.
export function formatYearMonth(text: string) {
  return text.replace(/(\d{4})-(\d{2})/g, "$1.$2");
}
