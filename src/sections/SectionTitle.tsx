import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="h-[4px] w-4 rounded-full bg-accent/80" />
      <h2 className="font-inter text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        {children}
      </h2>
    </div>
  );
}
