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
          DEFAULT: "#de9b2f",
          light: "#f5ba3b",
          // DEFAULT: "#cc1231",
          // light: "#f03252",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "ui-sans-serif", "system-ui"],
        pre: ["Pretendard", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};