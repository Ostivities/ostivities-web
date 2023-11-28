import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1500px",
    },
    fontFamily: {
      BricolageGrotesqueLight: "BricolageGrotesqueLight",
      BricolageGrotesqueMedium: "BricolageGrotesqueMedium",
      BricolageGrotesqueRegular: "BricolageGrotesqueRegular",
      BricolageGrotesqueSemiBold: "BricolageGrotesqueSemiBold",
      BricolageGrotesqueBold: "BricolageGrotesqueBold",
    },
    extend: {
      colors: {
        OWANBE_PRY: "#E20000",
        OWANBE_SECONDARY: "#19235B",
        OWANBE_NOTIFICATION: "#FADEDE",
        OWANBE_INFO: "#A6264C",
        OWANBE_BACKGROUND: "#F7F7F7",
        OWANBE_BORDER: "#D0D4D4",
        OWANBE_ASH: "#989C9F",
        OWANBE_TEXT: "#000000",
        OWANBE_H5: "#1B1C20",
        OWANBE_H4: "#383A47",
      },
    },
  },
  plugins: [],
};
export default config;
