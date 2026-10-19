import type { Project } from "../data/resume.ts";
import { CARD_SURFACE_CLASS } from "../lib/ui.ts";

export function ProjectCard({ name, description, techs, achievement, link }: Project) {
  return (
    <article className={`flex h-full flex-col p-4 text-sm ${CARD_SURFACE_CLASS}`}>
      <h3 className="font-inter text-sm font-semibold text-slate-900 dark:text-slate-50">
        {name}
      </h3>
      <p className="mt-2 flex-1 text-slate-700 dark:text-slate-200">
        {description}
      </p>
      {achievement && (
        <p className="mt-2 text-xs font-medium text-accent dark:text-accent-light">
          ✓ {achievement}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {techs.map((t) => (
          <span
            key={t}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-800 dark:bg-[#4a4c50] dark:text-slate-50"
          >
            {t}
          </span>
        ))}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-xs font-medium text-accent dark:text-accent-light hover:underline"
        >
          View project →
        </a>
      )}
    </article>
  );
}
