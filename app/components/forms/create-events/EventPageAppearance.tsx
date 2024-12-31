import { useProfile } from "@/app/hooks/auth/auth.hook";
import { useGetUserEvent, useUpdateEvent } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { CameraFilled } from "@ant-design/icons";
import { Button, Flex, Space, Upload, message, Skeleton } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { Heading5, Paragraph } from "../../typography/Typography";
import { GET_EVENT } from "@/app/utils/constants";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import placeholder from "@/public/emptyimage2.png";
import { ACCOUNT_TYPE, EVENT_INFO, EXHIBITION_SPACE } from "@/app/utils/enums";
import EventPageLoader from "@/app/components/Loaders/EventPageLoader";

const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const event_appearance_image: any =
  process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_APPEARANCE_IMAGES;

const EventPageAppearance: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string>("/images/emptyimage2.png");
  const [loader, setLoader] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
    "ticket_created",
    "mapSrc",
    "profileData",
  ]);
  const params = useParams<{ id: string }>();
  const { getUserEvent } = useGetUserEvent(params?.id);
  const { updateEvent } = useUpdateEvent();

  useEffect(() => {
    if (params?.id) {
      queryClient.invalidateQueries({ queryKey: [GET_EVENT, params.id] });
    }
  }, [params?.id]);

  const accountType = cookies?.profileData?.accountType;

  const userFullName =
    accountType === ACCOUNT_TYPE.PERSONAL
      ? cookies?.profileData?.firstName + " " + cookies?.profileData?.lastName
      : cookies?.profileData?.businessName;

  const eventDetails = getUserEvent?.data?.data?.data;
  //

  const API_KEY = "pk.78628ea993a1c84c0c71a9563edddb7f";

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
      } catch (error) {}
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

  const validateFile = (file: { type: string; size: number }) => {
    const isAllowedFormat = ["image/png", "image/jpeg", "image/gif"].includes(
      file.type
    );
    const isBelowSizeLimit = file.size / 1024 / 1024 < 10; // Convert file size to MB

    if (!isAllowedFormat) {
      message.error("Only PNG, JPEG, and GIF files are allowed.");
    }

    if (!isBelowSizeLimit) {
      message.error("File must be smaller than 10MB.");
    }

    return isAllowedFormat && isBelowSizeLimit;
  };

  return (
    <>
      {getUserEvent?.isLoading ? (
        <EventPageLoader />
      ) : (
        <Flex
          className="hidden min-[900px]:flex"
          vertical
          gap={48}
          style={{ width: "100%" }}
        >
          <Flex
            align="flex-start"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <div className="flex flex-row justify-between">
              <Space direction="vertical">
                <Heading5 className="" content={"Event Page Appearance"} />
                <Paragraph
                  className="text-OWANBE_PRY text-md font-normal font-BricolageGrotesqueMedium"
                  content={
                    "Upload your event image here by clicking the camera icon (File size should not be more than 10MB)."
                  }
                  styles={{ fontWeight: "normal !important" }}
                />
              </Space>
            </div>
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueSemiBold button-style sign-in cursor-pointer font-bold float-end place-self-end"
              style={{ width: "150px" }}
              onClick={() => {
                setCookie("form_stage", 1);
                setCookie("stage_one", "process");
                setCookie("stage_two", "wait");
                setCookie("stage_three", "wait");
                router.push(
                  `/discover/create-events/${params?.id}/event_details`
                );
              }}
            >
              Back
            </Button>
          </Flex>
          <div className="flex gap-12">
            <div className="relative w-[400px] h-[520px] rounded-[3.125rem] overflow-hidden">
              <Image
                src={
                  eventDetails?.eventImage
                    ? eventDetails.eventImage
                    : placeholder
                }
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
                        fontSize: "24px",
                        color: "#e20000",
                        background: "none",
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
                    <div
                      className="text-sm"
                      style={{
                        fontWeight: 600,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      Date
                    </div>
                    <div
                      style={{
                        width: "140px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        fontWeight: 300,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
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
                    <div
                      className="text-sm"
                      style={{
                        fontWeight: 600,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      Time
                    </div>
                    <div
                      style={{
                        fontWeight: 300,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      {timeFormat(eventDetails?.startDate)} -{" "}
                      {timeFormat(eventDetails?.endDate)}{" "}
                      {eventDetails?.timeZone}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl max-h-[41px] min-w-[41px] flex-center justify-center">
                    <Image
                      src="/icons/location.svg"
                      alt=""
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                    <div
                      className="text-sm"
                      style={{
                        fontWeight: 600,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      Location
                    </div>
                    <div
                      style={{
                        width: "190px",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        fontWeight: 300,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      {eventDetails?.address}
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
                    <div className="text-sm" style={{ fontWeight: 600 }}>
                      Host
                    </div>
                    <div
                      style={{
                        fontWeight: 300,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      {userFullName}
                    </div>
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
                      <div
                        className="text-sm"
                        style={{
                          fontWeight: 600,
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                      >
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

              <ReadMoreHTML
                htmlContent={eventDetails?.eventDetails || ""}
                maxLength={250}
              />
              <iframe
                src={eventDetails?.event_coordinates}
                width="100%"
                height="120"
                style={{
                  border: 0,
                  marginTop: "20px",
                  borderRadius: "0.5rem", // Corner radius
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex justify-center mt-12"></div>
            </div>
          </div>

          <Space
            className="flex flex-row justify-center space-x-4 mt-8"
            style={{ width: "100%" }}
          >
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueSemiBold  continue cursor-pointer font-bold equal-width-button"
              onClick={() => {
                setCookie("form_stage", 3);
                setCookie("stage_one", "finish");
                setCookie("stage_two", "finish");
                setCookie("stage_three", "process");
                if (cookies.ticket_created === "yes") {
                  router.push(
                    `/discover/create-events/${params?.id}/tickets_created`
                  );
                } else {
                  router.push(
                    `/discover/create-events/${params?.id}/event_tickets`
                  );
                }
              }}
            >
              Skip & do this later
            </Button>
            <Button
              type="default"
              htmlType="button"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              onClick={() => {
                setCookie("form_stage", 3);
                setCookie("stage_one", "finish");
                setCookie("stage_two", "finish");
                setCookie("stage_three", "process");
                if (cookies.ticket_created === "yes") {
                  router.push(
                    `/discover/create-events/${params?.id}/tickets_created`
                  );
                } else {
                  router.push(
                    `/discover/create-events/${params?.id}/event_tickets`
                  );
                }
              }}
            >
              Save & Continue
            </Button>
          </Space>
        </Flex>
      )}

      {/* For small Screen */}
      <div className="min-[900px]:hidden flex gap-10 flex-col">
        <div className="flex flex-row justify-between">
          <Space direction="vertical">
            <Heading5 className="" content={"Event Page Appearance"} />
            <Paragraph
              className="text-OWANBE_PRY text-md font-normal font-BricolageGrotesqueMedium"
              content={
                "Upload your event image here by clicking the camera icon (File size should not be more than 10MB)."
              }
              styles={{ fontWeight: "normal !important" }}
            />
          </Space>
        </div>

        {getUserEvent?.isLoading ? (
          <Skeleton.Button
            active
            className="relative w-full h-[320px] rounded-[2.5rem]"
            shape="round"
            style={{
              height: "100%",
              width: "100%",
              margin: "6px",
              maxWidth: "100%",
            }}
          />
        ) : (
          <div className="relative w-full h-[320px] rounded-[2.5rem] overflow-hidden bg-white card-shadow ">
            <Image
              src={
                eventDetails?.eventImage ? eventDetails.eventImage : placeholder
              }
              alt="Event Image"
              fill
              style={{ objectFit: "cover" }}
              className=""
            />
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
                      fontSize: "24px",
                      color: "#e20000",
                      background: "none",
                    }}
                  />
                )}
              </button>
            </Upload>
          </div>
        )}
        <div>
          {getUserEvent?.isLoading ? (
            <Skeleton.Button
              active
              className="relative h-7 sm: w-[150px] md:w-[120px] sm:w-200px] rounded-[1rem]"
              shape="round"
              style={{
                height: "100%",
                width: "100%",
                margin: "6px",
                maxWidth: "100%",
              }}
            />
          ) : (
            <h2 className="text-xl font-BricolageGrotesqueMedium">
              {eventDetails?.eventName}
            </h2>
          )}
        </div>
        {getUserEvent?.isLoading ? (
          <div className="flex flex-col py-8 gap-3">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                avatar
                paragraph={{ rows: 1 }}
                active
                style={{
                  width: "250px",
                  margin: "10px 0",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-8">
            <div className="flex items-start">
              {/* Image Section */}
              <div className="bg-OWANBE_PRY/20 p-2 max-h-[41px] min-w-[41px] rounded-xl flex-center justify-center">
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  height={25}
                  width={25}
                />
              </div>

              {/* Text Section */}
              <div className="ml-2">
                <div
                  className="text-sm"
                  style={{
                    fontWeight: 600,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  Date
                </div>
                <div
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    fontWeight: 300,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {dateFormat(eventDetails?.startDate)} -{" "}
                  {dateFormat(eventDetails?.endDate)}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-OWANBE_PRY/20 max-h-[41px] min-w-[41px] p-2 rounded-xl flex-center justify-center">
                <Image src="/icons/time.svg" alt="" height={25} width={25} />
              </div>
              <div>
                <div
                  className="text-sm"
                  style={{
                    fontWeight: 600,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  Time
                </div>
                <div
                  style={{
                    fontWeight: 300,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {timeFormat(eventDetails?.startDate)} -{" "}
                  {timeFormat(eventDetails?.endDate)} {eventDetails?.timeZone}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-OWANBE_PRY/20 max-h-[41px] min-w-[41px] p-2 rounded-xl flex-center justify-center">
                <Image
                  src="/icons/location.svg"
                  alt=""
                  height={25}
                  width={25}
                />
              </div>
              <div>
                <div
                  className="text-sm"
                  style={{
                    fontWeight: 600,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  Location
                </div>
                <div
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    fontWeight: 300,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {eventDetails?.address}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-OWANBE_PRY/20 max-h-[41px] min-w-[41px] p-2 rounded-xl flex-center justify-center">
                <Image src="/icons/host.svg" alt="" height={25} width={25} />
              </div>
              <div>
                <div
                  className="text-sm"
                  style={{
                    fontWeight: 600,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  Host
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 300,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    {userFullName}
                  </div>
                </div>
              </div>
            </div>
            {twitterLink?.url ||
            instagramLink?.url ||
            websiteLink?.url ||
            facebookLink?.url ? (
              // If not loading and links exist, show the Contact Us section
              <div className="flex gap-3 items-center">
                <div className="bg-OWANBE_PRY/20 p-2 max-h-[41px] min-w-[41px] rounded-xl flex items-center justify-center">
                  <Image
                    src="/icons/phone.svg"
                    alt="Phone Icon"
                    height={25}
                    width={25}
                  />
                </div>
                <div>
                  <div
                    className="text-sm"
                    style={{
                      fontWeight: 600,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    Contact Us
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    {websiteLink?.url && (
                      <Link
                        href={websiteLink.url}
                        className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="/icons/link.svg"
                          alt="Website Icon"
                          height={14}
                          width={14}
                        />
                      </Link>
                    )}
                    {twitterLink?.url && (
                      <Link
                        href={twitterLink.url}
                        className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="/icons/x.svg"
                          alt="Twitter Icon"
                          height={14}
                          width={14}
                        />
                      </Link>
                    )}
                    {facebookLink?.url && (
                      <Link
                        href={facebookLink.url}
                        className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="/icons/facebook.svg"
                          alt="Facebook Icon"
                          height={10}
                          width={10}
                        />
                      </Link>
                    )}
                    {instagramLink?.url && (
                      <Link
                        href={instagramLink.url}
                        className="bg-black w-6 h-6 rounded-full flex items-center justify-center"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram Icon"
                          height={16}
                          width={16}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
        <div>
          <Heading5
            className="text-lg font-bold mb-3"
            content={"About this event"}
          />
          {getUserEvent?.isLoading ? (
            <div className="flex flex-col gap-1 ">
              {Array(2)
                .fill(null)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    // className="relative h-60 w-[200px] md:w-[200px] sm:w-[150px] rounded"
                    paragraph={{ rows: 1 }}
                    active
                    style={{
                      height: "50px",
                      width: "100%",
                      margin: "10px",
                      maxWidth: "100%",
                    }}
                  />
                ))}
            </div>
          ) : (
            <>
              <ReadMoreHTML
                htmlContent={eventDetails?.eventDetails || ""}
                maxLength={250}
              />

              {eventDetails?.event_coordinates && (
                <iframe
                  src={eventDetails?.event_coordinates}
                  width="100%"
                  height="120"
                  style={{
                    border: 0,
                    marginTop: "24px",
                    borderRadius: "0.5rem", // Corner radius
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </>
          )}
        </div>
        <Space
          className="flex flex-row justify-center space-x-4 mt-8"
          style={{ width: "100%" }}
        >
          <Button
            type="default"
            size={"large"}
            className="font-BricolageGrotesqueSemiBold  continue cursor-pointer font-bold equal-width-button"
            onClick={() => {
              setCookie("form_stage", 3);
              setCookie("stage_one", "finish");
              setCookie("stage_two", "finish");
              setCookie("stage_three", "process");
              if (cookies.ticket_created === "yes") {
                router.push(
                  `/discover/create-events/${params?.id}/tickets_created`
                );
              } else {
                router.push(
                  `/discover/create-events/${params?.id}/event_tickets`
                );
              }
            }}
          >
            Skip & do this later
          </Button>
          <Button
            type="default"
            htmlType="button"
            size="large"
            className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
            onClick={() => {
              setCookie("form_stage", 3);
              setCookie("stage_one", "finish");
              setCookie("stage_two", "finish");
              setCookie("stage_three", "process");
              if (cookies.ticket_created === "yes") {
                router.push(
                  `/discover/create-events/${params?.id}/tickets_created`
                );
              } else {
                router.push(
                  `/discover/create-events/${params?.id}/event_tickets`
                );
              }
            }}
          >
            Save & Continue
          </Button>
        </Space>
      </div>
    </>
  );
};

export default EventPageAppearance;
