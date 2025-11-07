export default {
  content: [
    "./index.html",           // Needed for Vite root
    "./src/**/*.{js,jsx,ts,tsx}" // All React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/postcss"), // ✅ ensures full utility generation
  ],
};
