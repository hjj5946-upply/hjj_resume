import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { SOCIAL_LINKS } from "../data/resume.ts";

const ICON_LINK_CLASS =
  "transition-colors duration-300 ease-out hover:text-accent dark:hover:text-accent-light";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 print:hidden border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
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
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={ICON_LINK_CLASS}
        >
          <FiLinkedin />
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
      </div>

      <p>© {year} Hong JeongJun.</p>
    </footer>
  );
}
