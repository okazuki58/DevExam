// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#e8eaf6",
          100: "#c5cae9",
          200: "#9fa8da",
          300: "#7986cb",
          400: "#5c6bc0",
          500: "#3f51b5",
          600: "#3949ab",
          700: "#303f9f",
          800: "#283593",
          900: "#1a237e",
        },
      },
    },
    gridTemplateColumns: {
      "30": "repeat(30, minmax(0, 1fr))",
      "50": "repeat(50, minmax(0, 1fr))",
      "84": "repeat(84, minmax(0, 1fr))",
    },
    fontSize: {
      xxs: "0.625rem", // 10px
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
