import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: '#0FB7C0',
        'main-dark': '#097479',
        secondary: '#333333',
        background: '#111111',
        border: '#555555',
      },
    },
  },
  plugins: [],
};
export default config;
