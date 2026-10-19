import { SkillChart } from "../components/SkillChart.tsx";
import { SKILL_GROUPS, type SkillGroup } from "../data/resume.ts";
import { CARD_SURFACE_CLASS } from "../lib/ui.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function SkillsSection() {
  return (
    <>
      <SectionTitle>Skills</SectionTitle>

      <div className="mt-4 space-y-5 text-sm">
        <div className="space-y-4">
          {SKILL_GROUPS.map((group) => (
            <SkillRow key={group.label} {...group} />
          ))}
        </div>

        {/* 아래: Tech 비중 차트 카드 */}
        <div className={`p-4 text-xs ${CARD_SURFACE_CLASS}`}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-semibold text-slate-700 dark:text-slate-100">
              Tech Proficiency Overview
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-300">
              상대적인 비중 / 활용도 기준 (0–100)
            </p>
          </div>

          <div className="mt-4">
            <SkillChart />
          </div>
        </div>
      </div>
    </>
  );
}

function SkillRow({ label, items }: SkillGroup) {
  return (
    <div className="flex flex-col gap-1 text-sm md:flex-row md:items-baseline md:gap-4">
      <div className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-800 dark:border-slate-600 dark:bg-[#383a3d] dark:text-slate-50"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
