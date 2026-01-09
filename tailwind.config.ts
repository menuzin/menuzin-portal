import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14B8A6",
        "primary-hover": "#0D9488",
        background: "#FAFAF9",
        text: {
          primary: "#0F172A",
          muted: "#64748B",
        },
        accent: "#365314",
        border: "#E5E7EB",
      },
      maxWidth: {
        container: "1280px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
