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
      <div className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8">
        <Header />
      </div>

      {/* Main content with top margin to avoid overlap with fixed header */}
      <main
        className={`min-h-screen pt-[90px] px-0 sm:px-0 lg:px-6 w-full ${className} max-w-full sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto`}
      >
        {children}
      </main>

      {/* Full-width footer background container */}
      <div style={{ backgroundColor: "#FFF2F2" }} className="w-full">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-full sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <Footer />
        </div>
      </div>
    </RootLayout>
  );
}

export default OwanbeWebLayout;
