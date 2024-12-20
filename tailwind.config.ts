import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
     './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "#FFD700",
      },
      animation: {
        pulse: "pulse 1.5s infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: '1' },
          "50%": { opacity: '0.5'},
        },
      },
      
      
    },
  },
  plugins: [nextui()],
};
export default config;
