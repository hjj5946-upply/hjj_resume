/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#d91e53",
          light: "#f2668b",
        },
      },
      fontFamily: {
        // 폰트 파일은 index.html에서 로드한다 (Pretendard: 동적 서브셋, Inter: 600 weight만)
        sans: ["Pretendard Variable", "Pretendard", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "Pretendard Variable", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};