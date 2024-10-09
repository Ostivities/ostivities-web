import { useState } from "react";

interface ReadMoreHTMLProps {
  htmlContent: string;
  maxLength?: number; // Optional, defaults to 100 characters
}

const ReadMoreHTML = ({ htmlContent, maxLength = 100 }: ReadMoreHTMLProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // Function to strip HTML tags and limit to maxLength
  const getTextContent = (html: string) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  // Truncated text version without breaking HTML tags
  const truncatedContent = getTextContent(htmlContent).slice(0, maxLength);

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
            marginLeft: "",
          }}
        >
          {isExpanded ? "Hide" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMoreHTML;