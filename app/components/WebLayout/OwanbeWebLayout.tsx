import RootLayout from "@/app/layout";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

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
      {/* Header with white background, shadow, fixed position, and matching padding */}
      <div className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 px-1 sm:px-16">
        <Header />
      </div>

       {/* Main content with top margin to avoid overlap with fixed header */}
       <main
        className={`${className} min-h-screen pt-[80px] px-1 sm:px-16 w-full max-w-screen-sm sm:max-w-screen-xl mx-auto`}
      >
        {children}
      </main>

      {/* Full-width footer background container */}
      <div style={{ backgroundColor: "#FADEDE" }} className="w-full">
        <div className="px-1 sm:px-16 mx-auto max-w-screen-xl">
          <Footer />
        </div>
      </div>
    </RootLayout>
  );
}

export default OwanbeWebLayout;
