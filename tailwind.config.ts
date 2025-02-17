import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:{
          IntusBlue: "#4D7EF8",
          IntusNavy: "#062D8F",
        },
        grayscale:{
          White: "#FFFFFF",
          OffWhite: "#E5E5E5",
          InputBlack: "#F1F2F3",
          Labels: "#97999B",
          Body: "#626275",
          Black: "#000000",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
