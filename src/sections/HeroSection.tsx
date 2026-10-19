const PROFILE_BASE = `${import.meta.env.BASE_URL}profile_img`;
const HEADER_OFFSET_PX = 72; // 대략 h-14 헤더 + 여유

function scrollToProjects() {
  const el = document.getElementById("projects");
  if (!el) return;

  const offsetTop = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
}

export function HeroSection() {
  return (
    <section className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-700">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* 프로필 이미지 틀 */}
        <div className="w-40 aspect-square flex-shrink-0 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-[#383a3d] md:w-[25%]">
          <picture>
            <source srcSet={`${PROFILE_BASE}.webp`} type="image/webp" />
            <img
              src={`${PROFILE_BASE}.jpg`}
              alt="실제 증명사진 기반 AI 생성 프로필 이미지"
              width={480}
              height={720}
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover object-[center_20%]"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </picture>
        </div>

        <div className="flex-1">
          <h1 className="font-inter text-2xl font-semibold tracking-tight">
            AI 제품을 빠르게 구현하는 엔지니어, 준입니다.
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            LLM과 자동화를 활용해 실제로 사용되는 서비스를 만드는 데 집중하고 있습니다.
            아이디어 단계부터 백엔드, 프론트엔드, AI 연동, 배포까지 직접 구현하며 빠른 실행과 개선을 중요하게 생각합니다.
          </p>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Java(Spring), Python(FastAPI) 기반으로 개발하며,
            OpenAI API와 AI 워크플로우를 활용해 생산성과 사용자 경험을 동시에 개선하는 서비스를 구축합니다.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToProjects();
              }}
              className="inline-flex items-center rounded-full border border-accent/70 bg-accent/90 px-4 py-1.5 text-sm font-medium text-white transition-colors duration-300 ease-out hover:bg-accent dark:border-accent-light/70 dark:bg-accent-light/90 dark:hover:bg-accent-light"
            >
              프로젝트 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
