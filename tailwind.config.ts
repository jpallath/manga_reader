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
        accent: {
          1: "hsl(var(--accent1)/<alpha-value>)",
          2: "hsl(var(--accent2)/<alpha-value>)",
        },
        background: "hsl(var(--color-background)/<alpha-value>)",
        content: "hsl(var(--color-content))",

        //         --color-background: 210deg 40%, 98%;
        // --color-content: 217deg 32.6% 17.5%;
        // --accent1: 288deg 95.8%, 90.6%;
        // --accent2: 168deg 83.8%, 78.2%;
      },
    },
  },
  plugins: [],
};
export default config;
