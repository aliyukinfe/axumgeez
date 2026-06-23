import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#0B5CFF",
          deep: "#003B9E"
        },
        ink: "#05070A",
        surface: {
          dark: "#101418",
          light: "#F6F8FB"
        },
        line: "#DDE3EA"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(5, 7, 10, 0.10)",
        blue: "0 18px 38px rgba(11, 92, 255, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
