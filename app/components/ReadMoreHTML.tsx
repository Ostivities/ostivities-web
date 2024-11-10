import { useState, useEffect } from "react";

interface ReadMoreHTMLProps {
  htmlContent: string;
  maxLength?: number; // Optional, defaults to 100 characters
}

const ReadMoreHTML = ({ htmlContent, maxLength = 100 }: ReadMoreHTMLProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState("");

  // Toggle the expanded state
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // Function to strip HTML tags and limit to maxLength
  const getTextContent = (html: string) => {
    if (typeof document !== "undefined") {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = html;
      return tempElement.textContent || tempElement.innerText || "";
    }
    return ""; // Return an empty string if document is not defined
  };

  // Set truncated content on client side
  useEffect(() => {
    setTruncatedContent(getTextContent(htmlContent).slice(0, maxLength));
  }, [htmlContent, maxLength]);

  return (
    <div className="font-BricolageGrotesqueRegular flex-1 h-fit px-1">
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded ? htmlContent : `${truncatedContent}...`,
        }}
      ></div>
      {getTextContent(htmlContent).length > maxLength && (
        <button
          onClick={toggleReadMore}
          style={{
            border: "none",
            background: "transparent",
            color: "#e20000",
            cursor: "pointer",
            padding: "0",
          }}
        >
          {isExpanded ? "Read less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMoreHTML;