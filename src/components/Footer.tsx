import { FiGithub, FiInstagram, FiMail } from "react-icons/fi";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "../data/resume.ts";

const ICON_LINK_CLASS =
  "transition-colors duration-300 ease-out hover:text-accent dark:hover:text-accent-light";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
      <div className="mb-3 flex justify-center gap-6 text-2xl">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={ICON_LINK_CLASS}
        >
          <FiGithub />
        </a>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={ICON_LINK_CLASS}
        >
          <FiInstagram />
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className={ICON_LINK_CLASS}>
          <FiMail />
        </a>
      </div>

      <p>© {year} Hong JeongJun.</p>
    </footer>
  );
}
