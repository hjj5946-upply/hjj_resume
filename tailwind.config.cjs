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
    },
  },
  plugins: [],
};