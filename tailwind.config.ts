import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F8F8",
        warm: {
          50: "#F8F0F0",
          100: "#F8F0E8",
          200: "#F8D8D0",
          300: "#F8D0C8",
          400: "#F8C8C8",
        },
        cold: {
          100: "#C8D8D0",
          200: "#C0D8D0",
          300: "#B8D0C8",
        },
        text: {
          primary: "#202020",
          secondary: "#6B6B6B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
