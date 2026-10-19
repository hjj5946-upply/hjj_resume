import { SectionTitle } from "./SectionTitle.tsx";

export function SummarySection() {
  return (
    <>
      <SectionTitle>Summary</SectionTitle>

      <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        AI를 활용해 실제 사용되는 제품을 빠르게 만드는 개발자입니다.
        단순 기능 구현보다 사용자 경험과 실행 속도를 중요하게 생각하며,
        LLM·자동화·백엔드 시스템을 조합해 아이디어를 서비스로 연결하는 작업에 집중하고 있습니다.
      </p>

      <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Java(Spring), Python(FastAPI) 기반으로 개발하며,
        OpenAI API와 다양한 AI 워크플로우를 활용해 서비스 자동화와 생산성 향상을 구현합니다.
        백엔드를 중심으로 필요 시 프론트엔드와 모바일까지 직접 개발합니다.
      </p>
    </>
  );
}
