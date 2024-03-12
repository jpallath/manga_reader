import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      transitionDelay: { "1": "1s" },
      colors: {
        text: "rgba(var(--text))",
        background: "rgba(var(--background))",
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
        accent: "rgba(var(--accent))",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
