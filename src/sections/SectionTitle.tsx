import type { ReactNode } from "react";

// 인쇄 시 제목만 페이지 끝에 홀로 남지 않도록 다음 내용과 붙여둔다.
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 break-after-avoid border-b-2 border-slate-900 dark:border-slate-200 pb-1 text-[15px] font-bold tracking-tight text-slate-900 dark:text-slate-50">
      {children}
    </h2>
  );
}
