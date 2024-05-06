import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      sm: { max: "576px" },
      // => @media (min-width: 576px) { ... }

      md: { max: "768px" },
      // => @media (min-width: 768px) { ... }

      lg: { max: "1200px" },
      // => @media (min-width: 992px) { ... }
      xl: { max: "1440px" },
      // => @media (min-width: 1440px) { ... }
      "2xl": { max: "1800px" },
    },
  },
  plugins: [],
};
export default config;
