"use client";

import { IModal } from "@/app/utils/interface";
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Button } from "antd"; // Import only Button now

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
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchHtmlContent = async () => {
      // Delay fetching and modal appearance by 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/guestmail.html");
      const text = await response.text();
      setHtmlContent(text);
      setLoading(false); // Set loading to false after content is fetched
    };

    fetchHtmlContent();
  }, []);

  // Only render the modal after loading is done
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/20 grid place-items-center">
        <svg
          className="animate-spin h-12 w-12 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

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
          <h2 className="font-bricolage-grotesque font-regular">Email Preview</h2>
          <Button
            onClick={onCancel}
            style={{
              backgroundColor: "#e20000", // Background color
              borderRadius: "25px",       // Corner radius
              border: "none",             // Optional: remove border
              color: "#fff",              // Text color for contrast
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
          <div
            className="flex justify-center"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewEmail;
