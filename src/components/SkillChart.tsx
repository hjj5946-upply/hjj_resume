import { SKILL_FOCUS } from "../data/resume.ts";

// 고정된 막대 4개만 그리면 되므로 차트 라이브러리 없이 CSS 막대로 구현한다.
// (Recharts를 쓰면 메인 번들이 100KB(gzip) 이상 커진다)
export function SkillChart() {
  return (
    <ul className="space-y-3 text-[11px]">
      {SKILL_FOCUS.map(({ name, value }) => (
        <li key={name} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-right text-slate-600 dark:text-slate-200">
            {name}
          </span>
          <div
            className="h-6 flex-1 rounded-r bg-slate-200/60 dark:bg-slate-600/40"
            role="meter"
            aria-label={name}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
          >
            <div
              className="h-full rounded-r bg-slate-400 dark:bg-slate-200"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="w-7 shrink-0 tabular-nums text-slate-500 dark:text-slate-300">
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
}
