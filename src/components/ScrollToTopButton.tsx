import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const SHOW_AFTER_PX = 740;

// 스크롤 위치 state를 이 버튼 안에 가둬서, 기준선을 넘나들 때 App 전체가 리렌더되지 않게 한다.
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-5 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-accent-light/70 dark:bg-[#383a3d]/90 dark:text-slate-100 md:bottom-7 md:right-8 print:hidden"
    >
      <FiArrowUp className="h-4 w-4" />
    </button>
  );
}
