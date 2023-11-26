import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./lib/Registry";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Owanbe",
  description: "Event creation made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-white"}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
