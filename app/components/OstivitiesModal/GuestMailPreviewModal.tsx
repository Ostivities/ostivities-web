import { IModal } from "@/app/utils/interface";
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Button } from "antd";

interface PreviewEmailProps extends IModal {
  messageContent: string;
  guestName: string;
  eventName: string;
}


const PreviewEmail = ({
  open,
  onCancel,
  onClose,
  onOk,
  messageContent,
  guestName,
  eventName,
}: PreviewEmailProps): JSX.Element => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [cookies, setCookie, removeCookie] = useCookies(["event_id"]);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("/guestmail.html");
      let text = await response.text();

      text = text
        .replace("{{message}}", messageContent)
        .replace("{{guest_name}}", guestName)
        .replace("{{event_name}}", eventName);

      setHtmlContent(text);
      setLoading(false);
    };

    fetchHtmlContent();
  }, [messageContent, guestName, eventName]);

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
    onCancel();
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 grid place-items-center"
      onClick={handleBackdropClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl px-6 py-8 lg:min-w-[10rem]"
        style={{
          maxHeight: '800px', // Set the maximum height for the modal
          overflow: 'hidden', // Hide overflow for the modal
        }}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bricolage-grotesque font-regular">Email Preview</h2>
          <Button
            onClick={onCancel}
            style={{
              backgroundColor: "#e20000",
              borderRadius: "25px",
              border: "none",
              color: "#fff",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              width: "100px",
              height: "40px",
              fontSize: "16px",
            }}
          >
            Close
          </Button>
        </div>

        {/* Scrollable content with inline styles */}
        <div
          className="mt-8 text-aligned"
          style={{
            overflowY: 'auto', // Enable vertical scrolling
            maxHeight: '600px', // Set the maximum height for content
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            WebkitOverflowScrolling: 'touch', // Enable momentum scrolling on iOS
          }}
          onScroll={(e) => {
            // Hide scrollbar for Chrome, Safari, Edge and Opera
            const target = e.currentTarget;
            target.style.overflowY = target.scrollHeight > target.clientHeight ? 'scroll' : 'hidden';
          }}
        >
          <div
            className="w-full text-aligned"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewEmail;
