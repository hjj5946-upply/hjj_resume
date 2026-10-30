import { CONTACT_EMAIL, PROFILE, SOCIAL_LINKS } from "../data/resume.ts";
import { toLinkLabel } from "../lib/links.ts";

const PROFILE_BASE = `${import.meta.env.BASE_URL}profile_img`;

// 생월 없이 연도만 있으므로 올해 연도 - 출생 연도로 계산한다 (해가 바뀌면 자동으로 +1).
const AGE = new Date().getFullYear() - PROFILE.birthYear;

// 웹 이력서 등 나머지 링크는 하단 포트폴리오 섹션에 모아둔다.
const LINKS = [
  { label: "GitHub", href: SOCIAL_LINKS.github },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
];

export function ProfileSection() {
  return (
    <header className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50">
          {PROFILE.nameKo}
          <span className="ml-2 align-middle font-inter text-base font-semibold text-slate-500 dark:text-slate-400">
            {PROFILE.nameEn}
          </span>
          <span className="ml-2 align-middle text-sm font-medium text-slate-500 dark:text-slate-400">
            {AGE} Age
          </span>
        </h1>
        <p className="mt-1 text-[15px] font-medium text-accent dark:text-accent-light">{PROFILE.title}</p>

        <dl className="mt-4 grid grid-cols-[4.5rem_1fr] gap-y-1 text-sm">
          <dt className="text-slate-500 dark:text-slate-400">Email</dt>
          <dd>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
              {CONTACT_EMAIL}
            </a>
          </dd>
          {LINKS.map(({ label, href }) => (
            <div key={label} className="contents">
              <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
              <dd>
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {toLinkLabel(href)}
                </a>
              </dd>
            </div>
          ))}
          {PROFILE.military && (
            <>
              <dt className="text-slate-500 dark:text-slate-400">병역</dt>
              <dd>{PROFILE.military}</dd>
            </>
          )}
        </dl>
      </div>

      {/* 증명사진 비율(3:4) */}
      <div className="w-24 shrink-0 overflow-hidden rounded border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 sm:w-28">
        <picture>
          <source srcSet={`${PROFILE_BASE}.webp`} type="image/webp" />
          <img
            src={`${PROFILE_BASE}.jpg`}
            alt="실제 증명사진 기반 AI 생성 프로필 이미지"
            width={480}
            height={640}
            decoding="async"
            fetchPriority="high"
            className="aspect-[3/4] w-full object-cover object-[center_20%]"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </picture>
      </div>
    </header>
  );
}
