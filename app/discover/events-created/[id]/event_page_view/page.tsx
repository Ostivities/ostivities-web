"use client";
import { useGetUserEvent, useUpdateEvent } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { CameraFilled } from "@ant-design/icons";
import { Button, Flex, Space, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";


const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const event_appearance_image: any =
  process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_APPEARANCE_IMAGES;


const EventPageView = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("/images/emptyimage2.png");
  const [loader, setLoader] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
  ]);
  const { updateEvent } = useUpdateEvent();
  const params = useParams<{ id: string }>();
  const { getUserEvent } = useGetUserEvent(params?.id);
  // console.log(getUserEvent, "getUserEvent");


  const eventDetails = getUserEvent?.data?.data?.data;

  const userFullName =
    (eventDetails?.user?.firstName || "") +
    " " +
    (eventDetails?.user?.lastName || "");

  const props: UploadProps = {
    name: "image",
    maxCount: 1,
    action: `${cloud_api}/${cloud_name}/auto/upload`,
    beforeUpload: (file, fileList) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", event_appearance_image);
      formData.append("upload_preset", preset);
    },
    async customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", event_appearance_image);
      formData.append("upload_preset", preset);
      setLoader(true);
      try {
        const response = await axios.post(
          `${cloud_api}/${cloud_name}/auto/upload`,
          formData
        );
        if (response.status === 200) {
          const urlString: string | any =
            response?.data?.secure_url || response?.data?.url;
          const res = await updateEvent.mutateAsync({
            id: eventDetails?.id,
            eventImage: urlString,
          });
          if (res.status === 200) {
            message.success("Image uploaded successfully");
            getUserEvent.refetch();
            setImageUrl(urlString);
          }
        }
        setLoader(false);
      } catch (error) { }
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
      } else if (info.file.status === "error") {
      }
    },
    showUploadList: false,
  };

  const socialLinks = eventDetails?.socials;
  const twitterLink = socialLinks?.find(
    (link: any) => link?.name.toLowerCase() === "twitter"
  );
  const instagramLink = socialLinks?.find(
    (link: any) => link?.name.toLowerCase() === "instagram"
  );
  const websiteLink = socialLinks?.find(
    (link: any) => link?.name.toLowerCase() === "website"
  );
  const facebookLink = socialLinks?.find(
    (link: any) => link?.name.toLowerCase() === "facebook"
  );

  const validateFile = (file: { type: string; size: number; }) => {
    const isAllowedFormat = ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
    const isBelowSizeLimit = file.size / 1024 / 1024 < 10; // Convert file size to MB

    if (!isAllowedFormat) {
      message.error('Only PNG, JPEG, and GIF files are allowed.');
    }

    if (!isBelowSizeLimit) {
      message.error('File must be smaller than 10MB.');
    }

    return isAllowedFormat && isBelowSizeLimit;
  };



  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Space direction="vertical" size={"small"}>
          <Heading5 className="" content={"Event Page Appearance "} />
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={
              "Update your event image here by clicking the camera icon (File size should not be more than 10MB)." 
            }
            styles={{ fontWeight: "normal !important" }}
          /><br />
        </Space>
        <div className="flex gap-12">
          <div className="relative w-[390px] h-[520px] rounded-[3.125rem] overflow-hidden">
            <Image
              src={eventDetails?.eventImage || imageUrl}
              alt="Event Image"
              fill
              style={{ objectFit: "cover" }}
              className=""
            />
            <div className="absolute inset-0 bg-image-card"></div>
            <Upload
              className="absolute top-2 right-2 z-10"
              {...props}
              beforeUpload={(file) => validateFile(file)} // Add validation check here
            >
              <button
                className="bg-white p-4 rounded-full shadow flex items-center justify-center relative"
                disabled={loader}
              >
                {loader ? (
                  // Replace this with your actual loader component
                  <svg
                    className="animate-spin h-6 w-6 text-red-600"
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
                ) : (
                  <CameraFilled
                    style={{
                      fontSize: '24px',
                      color: '#e20000',
                      background: 'none',
                    }}
                  />
                )}
              </button>
            </Upload>
          </div>
          <div className="py-8">
            <Heading5 className="text-2xl" content={"About this event"} />
            <div className="mt-14 flex flex-col gap-8">
              <div className="flex items-start">
                {/* Image Section */}
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                  <Image
                    src="/icons/calendar.svg"
                    alt=""
                    height={25}
                    width={25}
                  />
                </div>

                {/* Text Section */}
                <div className="ml-2">
                  <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Date
                  </div>
                  <div
                    style={{
                      width: "140px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      fontWeight: 300, fontFamily: "'Bricolage Grotesque', sans-serif"
                    }}
                  >
                    {dateFormat(eventDetails?.startDate)} -{" "}
                    {dateFormat(eventDetails?.endDate)}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                  <Image
                    src="/icons/time.svg"
                    alt=""
                    height={25}
                    width={25}
                  />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Time
                  </div>
                  <div style={{ fontWeight: 300, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {timeFormat(eventDetails?.startDate)} -{" "}
                    {timeFormat(eventDetails?.endDate)}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                  <Image
                    src="/icons/location.svg"
                    alt=""
                    height={25}
                    width={25}
                  />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Location
                  </div>
                  <div
                    style={{
                      maxWidth: "190px", // Adjust this value as needed
                      wordWrap: "break-word", // Ensures long words wrap to the next line
                      overflowWrap: "break-word", // Adds further wrapping behavior for better browser support
                    }}
                  >
                    <a
                      href="https://maps.app.goo.gl/jBmgQ5EFxngj2ffS6"
                      style={{ color: "#e20000", textDecoration: "none", fontWeight: 300, fontFamily: "'Bricolage Grotesque', sans-serif" }}
                      target="_blank"
                    >
                      {eventDetails?.address}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                  <Image
                    src="/icons/host.svg"
                    alt=""
                    height={25}
                    width={25}
                  />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Host
                  </div>
                  <div style={{ fontWeight: 300, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{userFullName}</div>
                </div>
              </div>

              {twitterLink?.url ||
                instagramLink?.url ||
                websiteLink?.url ||
                facebookLink?.url ? (
                <div className="flex gap-3 items-center">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                    <Image
                      src="/icons/phone.svg"
                      alt=""
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      Contact Us
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-4 mt-1">
                        {websiteLink && websiteLink?.url && (
                          <Link
                            href={websiteLink?.url}
                            className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Image
                              src="/icons/link.svg"
                              alt=""
                              height={14}
                              width={14}
                            />
                          </Link>
                        )}
                        {twitterLink && twitterLink?.url && (
                          <Link
                            href={twitterLink?.url}
                            className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Image
                              src="/icons/x.svg"
                              alt=""
                              height={14}
                              width={14}
                            />
                          </Link>
                        )}
                        {facebookLink && facebookLink?.url && (
                          <Link
                            href={facebookLink?.url}
                            className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Image
                              src="/icons/facebook.svg"
                              alt=""
                              height={10}
                              width={10}
                            />
                          </Link>
                        )}
                        {instagramLink && instagramLink?.url && (
                          <Link
                            href={instagramLink?.url}
                            className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Image
                              src="/icons/instagram.svg"
                              alt=""
                              height={16}
                              width={16}
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="font-BricolageGrotesqueRegular flex-1 h-fit my-auto border-l border-black px-6">
            <div className="py-8">
              <div className="border rounded-lg p-3 bg-white card-shadow flex justify-between">
                <h2 className="text-2xl font-BricolageGrotesqueMedium">
                  {eventDetails?.eventName}
                </h2>
              </div>
            </div>
            {/* <div
                className="font-BricolageGrotesqueRegular flex-1 h-fit px-1"
                dangerouslySetInnerHTML={{
                  __html: eventDetails?.eventDetails as string,
                }}
              ></div> */}
            <ReadMoreHTML htmlContent={eventDetails?.eventDetails || ""} maxLength={500} />
            <div className="flex justify-center mt-12">
            </div>
          </div>
        </div>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventPageView;
