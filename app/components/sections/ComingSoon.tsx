"use client";
import React, { useState, useEffect } from "react";
import "@/app/comingsooncard.css";

const options = [
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391173/Rectangle_34624138_wjlfuk.png)",
    main: "Events",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391169/placeholder_mr99ha.png)",
    main: "Weddings",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391182/Rectangle_34624145_pdhqhv.png)",
    main: "Concerts",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391170/Rectangle_34624139_l8e2sy.png)",
    main: "Hangouts",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391169/Rectangle_34624137_r5mxr7.png)",
    main: "Conferences",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391169/Rectangle_34624135_qhgim4.png)",
    main: "Theater Performances",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391171/Rectangle_34624141_k0nx25.png)",
    main: "Birthdays",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391170/Rectangle_34624143_btbrzb.png)",
    main: "Hackathons",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391172/Rectangle_34624144_q5zagu.png)",
    main: "Sporting Events",
  },
  {
    background: "url(https://res.cloudinary.com/ddgehpmnq/image/upload/v1724391178/Rectangle_34624136_fcu8pz.png)",
    main: "Other Events",
  },
];

function ComingSoon(): JSX.Element | null {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    updateMedia();
    window.addEventListener("resize", updateMedia);

    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  if (!isDesktop) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-row items-stretch overflow-hidden min-w-[600px] max-w-[1200px] w-[calc(100%-100px)] h-[500px]">
        {options.map((option, index) => (
          <div
            key={index}
            className={`relative overflow-hidden min-w-[60px] m-2 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
              index === activeIndex ? "flex-grow-[10000] max-w-[600px] m-0 rounded-[30px]" : "flex-grow rounded-[20px]"
            }`}
            style={{
              background: option.background,
              backgroundSize: "auto 120%",
              backgroundPosition: "center",
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div
              className={`absolute bottom-0 left-0 right-0 h-[120px] transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                index === activeIndex ? "shadow-inset shadow-black" : ""
              }`}
            />
            <div
              className={`absolute right-0 h-[40px] transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] ${
                index === activeIndex ? "bottom-[20px] left-[20px]" : "bottom-[10px] left-[10px]"
              }`}
            >
              <div className="flex items-center justify-center">
                <div style={{ color: option.background }} />
              </div>
              <div className="flex flex-col justify-center ml-2 text-white whitespace-pre">
                <div
                  className={`font-bold text-lg transition-all duration-500 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {option.main}
                </div>
                <div
                  className={`transition-all duration-500 delay-100 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComingSoon;
