import React from "react";
import Image from "next/image";
import comingsoon from "@/public/feature.gif"; // Assuming this is the image you want to use

function ComingSoon(): JSX.Element {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center space-x-3">
      </div>
      <div className="mx-auto hidden md:hidden lg:flex lg:justify-center lg:items-center xl:flex xl:justify-center xl:items-center w-full h-full">
        <Image src={comingsoon} alt="hero" className="ms-1" width={1820} height={100} unoptimized /> {/* Replace with actual image and dimensions */}
      </div>
    </div>
  );
}

export default ComingSoon;
