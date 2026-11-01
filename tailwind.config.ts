import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        violet:  "#7c3aed",
        cyan:    "#06b6d4",
        amber:   "#f59e0b",
        rose:    "#f43f5e",
        emerald: "#10b981",
      },
    },
  },
  plugins: [],
};

export default config;
