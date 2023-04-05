import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        newBlack: "#484848",
        newGrey: "#9A9A9A",
        mediumGrey: "#F8FAFB",
        lightGrey: "#F1F5F6",
        info: "rgba (205, 221, 224, 0.15)",
      },
      fontFamily: {
        sans: ["Montesserat"],
      },
    },
  },
  plugins: [],
} satisfies Config;
