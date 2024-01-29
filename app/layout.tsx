import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import StyledComponentsRegistry from "./lib/Registry";

// const inter = Bricolage_Grotesque({ subsets: ["latin"] });

const bricoLage = localFont({
  src: [
    {
      path: "../public/fonts/BricolageGrotesque-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Ostivities",
  description: "Event creation made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Favicon.png" type="image/x-icon" sizes="any" />
      </head>
      <body className={`${bricoLage.className} bg-white`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
