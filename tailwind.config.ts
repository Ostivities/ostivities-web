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
        OWANBE_INACTIVE: "#FFF2F2",
        OWANBE_AUTH_BG: "#F8FAFC",
        OWANBE_DARK: "#1E1E1E",
        OWANBE_LIGHT_DARK: "#120D26",
        OWANBE_BADGE: "#FBDBE2",
        OWANBE_DEEP_RED: "#A6264C",
        OWANBE_DARK_LIGHT: "#00000060"
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: " translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
