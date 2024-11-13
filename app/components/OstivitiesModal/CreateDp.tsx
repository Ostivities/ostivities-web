import Image from "next/image";
import { Button } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import html2canvas from "html2canvas";
import placeholder from "@/public/placeholder.svg";
import attend from "@/public/attend.svg";
import rec from "@/public/recbg.svg";
import watermark from "@/public/watermark.svg";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const templates = [
    { id: 1, name: "Template 1", backgroundColor: "#151515", textColor: "#ffffff" },
    { id: 2, name: "Template 2", backgroundColor: "#ffffff", textColor: "#151515" },
    { id: 3, name: "Template 3", backgroundColor: "#e20000", textColor: "#ffffff" },
    { id: 4, name: "Template 4", backgroundColor: "#19235B", textColor: "#ffffff" },
];

const CreateAttendeeFlyer = () => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
    const flyerRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDownload = async () => {
        if (!flyerRef.current) return;
    
        // Render the canvas with a higher scale for better resolution
        const canvas = await html2canvas(flyerRef.current, {
            scale: 5, // Adjust this scale for higher resolution, e.g., 2x, 3x, etc.
            useCORS: true, // Enable cross-origin image loading
        });
    
        // Convert the canvas to a high-quality PNG image
        const image = canvas.toDataURL("image/png", 1.0); // 1.0 = highest quality
    
        // Create a link element for downloading the image
        const link = document.createElement("a");
        link.href = image;
        link.download = "attendee_flyer.png";
        link.click();
    };
    

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<{ event: string }>();
    const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
    const eventDetails =
        getUserEventByUniqueKey?.data?.data?.data === null
            ? router.push("/not-found")
            : getUserEventByUniqueKey?.data?.data?.data;

    const eventUrl = eventDetails?.eventURL;
    const [watermarkOpacity, setWatermarkOpacity] = useState(0.1); // Initial opacity of watermark
    const [watermarkSize, setWatermarkSize] = useState(80); // Initial size of the watermark


    return (
        <div className="flex bg-gray-100 p-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {/* Template Gallery Sidebar */}
            <div className="flex flex-col items-start mr-4">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className="mb-2 p-2 rounded-lg border border-gray-300 shadow-sm"
                        style={{
                            backgroundColor: template.backgroundColor,
                            color: template.textColor,
                            width: "120px",
                            textAlign: "center",
                        }}
                    >
                        {template.name}
                    </button>
                ))}
            </div>

            {/* Flyer Preview */}
            <div
                className="flex flex-col items-center justify-center"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
                <div
                    className="relative text-center pt-14 pr-4 pb-4 pl-4 rounded-lg shadow-lg w-full mb-4"
                    ref={flyerRef}
                    style={{
                        width: '500px', // Set a fixed width
                        backgroundColor: selectedTemplate.backgroundColor,
                        color: selectedTemplate.textColor,
                        overflow: 'hidden', // Ensure watermark doesn't overflow outside the template
                    }}
                >
                    {/* Watermark Overlay (Placed behind the content) */}
                    <div
                        className="absolute inset-0 z-0" // z-0 ensures the watermark stays behind
                        style={{
                            backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"%3E%3Crect x="10" y="10" width="180" height="80" rx="15" ry="15" stroke="black" stroke-width="4" fill="lightgray" /%3E%3Ctext x="100" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="black"%3EEvent%3C/text%3E%3Ctext x="100" y="60" font-size="16" text-anchor="middle" fill="black"%3EAdmit One%3C/text%3E%3Cline x1="10" y1="20" x2="190" y2="20" stroke="black" stroke-dasharray="5,5" /%3E%3Cline x1="10" y1="40" x2="190" y2="40" stroke="black" stroke-dasharray="5,5" /%3E%3Cline x1="10" y1="60" x2="190" y2="60" stroke="black" stroke-dasharray="5,5" /%3E%3Cline x1="10" y1="80" x2="190" y2="80" stroke="black" stroke-dasharray="5,5" /%3E%3C/svg%3E')`, // The SVG encoded as a URL
                            backgroundRepeat: 'repeat', // Repeats the watermark in both directions
                            backgroundSize: `${watermarkSize}px ${watermarkSize}px`, // Makes the watermark small and repeatable
                            opacity: watermarkOpacity, // Controls the opacity of the watermark
                            pointerEvents: 'none', // Prevents interaction with the watermark
                            transform: 'rotate(10deg)', // Rotate the watermark by 10 degrees
                            transformOrigin: 'center', // Ensures the rotation is centered within the div
                        }}
                    ></div>
                    <div className="absolute top-4 left-4 rounded-full overflow-hidden" style={{ width: "50px", height: "50px" }}>
                        <Image
                            src={eventDetails?.eventImage ? eventDetails.eventImage : placeholder}
                            alt="Event Logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    <div className="absolute top-4 right-3 py-1 rounded-full font-semibold text-sm">
                        <Image
                            src={attend} // your imported image variable
                            alt="Attendee Image"
                            width={120} // Set a size for the image
                            height={120} // Set a size for the image
                        />
                    </div>

                    <br />
                    {imageUrl ? (
                        <div className="relative">
                            <div className="relative w-48 h-48 mx-auto border-2 rounded-full shadow-s overflow-hidden" style={{ borderColor: selectedTemplate.textColor }}>
                                <Image
                                    src={imageUrl}
                                    alt="Uploaded Attendee"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            <div
                                className="w-full flex justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage: `url(${rec.src})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    width: "250px", // Fixed width in pixels
                                    height: "60px", // Fixed height in pixels
                                    borderRadius: "10px",
                                    padding: "10px 20px", // Adds padding with some horizontal and vertical space
                                    transform: "rotate(-5deg)", // Optional rotation
                                    transformOrigin: "center",
                                    border: "1px solid white",
                                    margin: "0 auto",
                                    marginTop: "-15px" // Centers the component horizontally
                                }}

                            >
                                <p className="text-center font-regular" style={{ color: 'white', fontSize: "12px", lineHeight: "1.2" }}>
                                    I will be attending
                                    <span
                                        className="block font-extrabold"
                                        style={{ fontSize: "18px", color: 'white' }} // Inherit color or set a specific color here if needed
                                    >
                                        {eventDetails?.eventName}
                                    </span>
                                </p>
                            </div>
                            <div className="mt-16 flex items-center justify-end text-xs space-x-2 text-right">
                                <FaMapMarkerAlt className="text-red-500" />
                            </div>
                            <div className="mt-1 flex items-center justify-end text-xs space-x-2 text-right">
                                {/* <FaMapMarkerAlt className="text-red-500" /> */}
                                <p>{eventDetails?.address}</p>
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs">
                                {/* Registration Link on the Left */}
                                <div className="text-white-500 font-semibold">
                                    Register at: Ostivitis.com
                                </div>

                                {/* Time Information on the Right */}
                                <div className="flex items-center space-x-2 text-right">
                                    {/* <FaClock className="text-green-500" /> */}
                                    <p>
                                        {timeFormat(eventDetails?.startDate)} {eventDetails?.timeZone} | {dateFormat(eventDetails?.startDate)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <p className="text-gray-500">No image uploaded yet</p>
                    )}
                </div>

                {/* Upload and Download Buttons */}
                <div className="flex justify-between w-full max-w-lg mt-4">
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                    />

                    <button
                        onClick={triggerFileInput}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-600 hover:bg-gray-100 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" transform="rotate(180 12 12)" />
                        </svg>
                        Upload Image
                    </button>

                    <Button
                        onClick={handleDownload}
                        disabled={!uploadedImage}
                        style={{
                            backgroundColor: uploadedImage ? "#e20000" : "#cccccc",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "25px",
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            padding: "18px 20px",
                        }}
                    >
                        Download Flyer
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateAttendeeFlyer;
