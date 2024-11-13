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
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const CreateAttendeeFlyer = () => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const flyerRef = useRef<HTMLDivElement | null>(null); // Ref to target the flyer
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref to access the file input

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedImage(file);
            setImageUrl(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Download the flyer as an image
    const handleDownload = async () => {
        if (!flyerRef.current) return;

        const canvas = await html2canvas(flyerRef.current);
        const image = canvas.toDataURL("image/png");

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

    return (
        <div
            className="flex flex-col items-center justify-center bg-gray-100 p-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
            <div
                className="relative bg-[#151515] text-white p-14 rounded-lg shadow-lg max-w-lg w-full text-center mb-4"
                ref={flyerRef}
            >
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src={eventDetails?.eventImage ? eventDetails.eventImage : placeholder}
                        alt="Event Logo"
                        width={60}
                        height={60}
                    />
                </div>

                <div className="absolute top-4 right-4 text-[#ffff] px-3 py-1 rounded-full font-semibold text-sm">
                    Attendee
                </div>
                <br />
                {imageUrl ? (
                    <div className="relative">
                        <div className="relative w-48 h-48 mx-auto border-4 border-white rounded-full overflow-hidden">
                            <Image
                                src={imageUrl}
                                alt="Uploaded Attendee"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div
                            className="w-full flex justify-center items-center"
                            style={{
                                backgroundImage: `url(${rec.src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100%",
                                height: "auto",
                                borderRadius: "18px",
                                padding: "10px",
                            }}
                        >
                            <p className="text-center font-semibold text-white">
                                I will be attending
                                <span className="block text-white font-bold" style={{ fontSize: "20px" }}>
                                    {eventDetails?.eventName}
                                </span>
                            </p>
                        </div>
                        <br />
                        <div className="flex items-center justify-center text-sm space-x-2">
                            <p>{eventDetails?.address}</p>
                        </div>
                        <div className="mt-1 flex items-center justify-center text-sm space-x-2">
                            <p>
                                {dateFormat(eventDetails?.startDate)} - {dateFormat(eventDetails?.endDate)}
                            </p>
                        </div>
                        <div className="mt-1 flex items-center justify-center text-sm space-x-2">
                            <p>
                                {timeFormat(eventDetails?.startDate)} - {timeFormat(eventDetails?.endDate)}{" "}
                                {eventDetails?.timeZone}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No image uploaded yet</p>
                )}
            </div>

            <div className="flex justify-between w-full max-w-lg mt-4">
                {/* Hidden File Input */}
                <input
                    type="file"
                     accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />

                {/* Upload Image Button (aligned to the left) */}
                <button
                    onClick={triggerFileInput}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" transform="rotate(180 12 12)" />
</svg>


                    Upload Image
                </button>

                {/* Download Flyer Button (aligned to the right) */}
                <Button
                    onClick={handleDownload}
                    disabled={!uploadedImage} // Disable the button if no image is uploaded
                    style={{
                        backgroundColor: uploadedImage ? "#e20000" : "#cccccc", // Change color when disabled
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
    );
};

export default CreateAttendeeFlyer;
