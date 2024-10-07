"use client";

import { IModal } from "@/app/utils/interface";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Button } from "antd";

const PreviewEmail = ({
  open,
  onCancel,
  onClose,
  onOk,
}: IModal): JSX.Element => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [cookies, setCookie, removeCookie] = useCookies(["event_id"]);
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const fetchHtmlContent = async () => {
      const response = await fetch("/guestmail.html");
      const text = await response.text();
      setHtmlContent(text);
    };

    fetchHtmlContent();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onCancel(); // Close modal when clicking outside
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 grid place-items-center"
      onClick={handleBackdropClick} // Click outside closes modal
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        className="bg-white rounded-2xl px-6 py-8 lg:min-w-[10rem]" // Decrease width
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bricolage-grotesque font-semibold">Email Preview</h2>
          <Button
             onClick={onCancel}
              style={{
                backgroundColor: "#e20000", // Background color
                borderRadius: "25px",       // Corner radius
                border: "none",             // Optional: remove border
                color: "#fff",           // Text color for contrast
                fontFamily: "'Bricolage Grotesque', sans-serif", // Set custom font
                width: "100px",             // Adjust the width
                height: "40px", 
                fontSize: "16px",           // Adjust the height
              }}
            >
              Close
            </Button>
        </div>
        <div className="mt-8 text-center">
          
          <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  );
};

export default PreviewEmail;
