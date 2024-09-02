"use client";

import { CaretUpOutlined, UpOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import the up arrow icon from react-icons

const ScrollToTopButton: React.FC = () => {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-32 right-4 bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
      aria-label="Scroll to Top"
    >
      <CaretUpOutlined color="#e20000" size={30} /> 
    </button>
  );
};

export default ScrollToTopButton;
