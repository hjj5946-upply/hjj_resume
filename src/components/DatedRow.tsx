import type { ReactNode } from "react";

type DatedRowProps = {
  date: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
};

// 학력·경력·자격증·교육이 같은 "왼쪽 기간 / 오른쪽 내용" 배치를 쓰도록 공통화한다.
// 인쇄 시 항목 하나가 두 페이지에 걸쳐 잘리지 않도록 break-inside-avoid를 건다.
export function DatedRow({ date, title, subtitle, children }: DatedRowProps) {
  return (
    <article className="break-inside-avoid text-sm sm:grid sm:grid-cols-[9.5rem_1fr] sm:gap-4">
      <p className="text-[13px] leading-5 text-slate-500 dark:text-slate-400">{date}</p>
      <div>
        <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
        {subtitle && <p className="text-[13px] text-slate-600 dark:text-slate-400">{subtitle}</p>}
        {children}
      </div>
    </article>
  );
}
