// 라이트/다크 모드. 사용자가 직접 토글해서 저장한 경우에만 다크로 연다.
// (index.html 인라인 스크립트도 같은 키/규칙으로 첫 페인트 전에 dark 클래스를 반영한다)
export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function readStoredTheme(): Theme {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    // Safari 사생활 보호 모드 등에서는 localStorage 접근 자체가 예외를 던진다.
    return "light";
  }
}

export function storeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // 저장 실패는 무시 - 이번 세션에서만 유지된다.
  }
}

export function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
