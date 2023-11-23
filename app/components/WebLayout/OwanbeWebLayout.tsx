import RootLayout from "@/app/layout";
import React from "react";

function OwanbeWebLayout({
  children,
  active,
  location,
  className,
}: {
  children: React.ReactNode;
  active?: string;
  location?: string;
  className?: string;
}): JSX.Element {
  return (
    <RootLayout>
      <main className={`${className}`}></main>
    </RootLayout>
  );
}

export default OwanbeWebLayout;
