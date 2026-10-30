import { PORTFOLIO_LINKS, PROJECTS } from "../data/resume.ts";
import { toLinkLabel } from "../lib/links.ts";
import { SectionTitle } from "./SectionTitle.tsx";

// 프로젝트에 달린 링크를 따로 적지 않아도 포트폴리오에 함께 모이도록 한다.
const LINKS = [
  ...PORTFOLIO_LINKS,
  ...PROJECTS.flatMap((p) =>
    (p.links ?? []).map((link) => ({
      label: p.name.split(" – ")[0],
      url: link.url,
      description: link.label,
    }))
  ),
];

export function PortfolioSection() {
  return (
    <>
      <SectionTitle>포트폴리오</SectionTitle>
      <dl className="grid break-inside-avoid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[8.5rem_1fr]">
        {LINKS.map(({ label, url, description }) => (
          <div key={url} className="contents">
            <dt className="font-semibold text-slate-600 dark:text-slate-400">{label}</dt>
            <dd className="mb-1 flex flex-wrap items-baseline gap-x-2 sm:mb-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline dark:text-accent-light"
              >
                {toLinkLabel(url)}
              </a>
              <span className="text-[13px] text-slate-500 dark:text-slate-400">{description}</span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
