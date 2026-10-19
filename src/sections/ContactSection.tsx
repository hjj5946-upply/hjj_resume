import { CONTACT_EMAIL } from "../data/resume.ts";
import { SectionTitle } from "./SectionTitle.tsx";

export function ContactSection() {
  return (
    <>
      <SectionTitle>Contact</SectionTitle>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        협업 제안, 문의, 기타 연락은 아래 채널로 부탁드립니다.
      </p>
      <div className="mt-3 space-y-1 text-sm">
        <p>
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </>
  );
}
