import { useProfile, useUpdateProfile } from "@/app/hooks/auth/auth.hook";
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
import { Heading5, Paragraph } from "../../typography/Typography";

const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const event_appearance_image: any =
  process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_APPEARANCE_IMAGES;

const EventPageAppearance: React.FC = () => {
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
  const { getUserEvent } = useGetUserEvent(cookies.event_id);
  const { updateEvent } = useUpdateEvent();
  const params = useParams<{ id: string }>();

  const { profile } = useProfile();
  const userFullName =
    profile?.data?.data?.data?.firstName +
    " " +
    profile?.data?.data?.data?.lastName;

  const eventDetails = getUserEvent?.data?.data?.data;
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
            id: eventDetails?._id,
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

  return (
    <Flex vertical gap={48} style={{ width: "100%" }}>
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
              `/Dashboard/create-events/${cookies.event_id}/event_details`
            );
          }}
        >
          Back
        </Button>
      </Flex>
      <div className="flex gap-12">
        <div className="relative w-[400px] h-[520px] rounded-[3.125rem] overflow-hidden">
          <Image
            src={eventDetails?.eventImage || imageUrl}
            alt="Event Image"
            fill
            style={{ objectFit: "cover" }}
            className=""
          />
          <div className="absolute inset-0 bg-image-card"></div>
          <Upload className="absolute top-2 right-2 z-10" {...props}>
            <Button
              loading={loader}
              className="bg-white p-4 rounded-full shadow flex items-center justify-center"
            >
              <CameraFilled
                style={{
                  fontSize: "24px",
                  color: "#e20000",
                  background: "none",
                }}
              />
            </Button>
          </Upload>
        </div>
        <div className="py-8">
          <Heading5 className="text-2xl" content={"About this event"} />
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex gap-3 items-center">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>
                  Date
                </div>
                <div>
                  {dateFormat(eventDetails?.startDate)},{" "}
                  {dateFormat(eventDetails?.endDate)}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image src="/icons/time.svg" alt="" height={30} width={30} />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>
                  Time
                </div>
                <div>
                  {timeFormat(eventDetails?.startDate)} -{" "}
                  {timeFormat(eventDetails?.endDate)}
                </div>
              </div>
            </div>
            {/* Location 1 */}
            <div className="flex gap-3 items-center">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image
                  src="/icons/location.svg"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>
                  Location
                </div>
                <div>{eventDetails?.address}</div>
              </div>
            </div>

            {/* Location 2 */}
            <div className="flex gap-3 items-center">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image src="/icons/host.svg" alt="" height={30} width={30} />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>
                  Host
                </div>
                <div>{userFullName}</div>
              </div>
            </div>
            {twitterLink?.url ||
            instagramLink?.url ||
            websiteLink?.url ||
            facebookLink?.url ? (
              <div className="flex gap-3 items-center">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                  <Image src="/icons/phone.svg" alt="" height={30} width={30} />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>
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
        <div
          className="font-BricolageGrotesqueRegular flex-1 h-fit my-auto border-l border-black px-5"
          style={{ marginTop: "150px" }}
          dangerouslySetInnerHTML={{
            __html: eventDetails?.eventDetails as string,
          }}
        ></div>
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
            router.push("/create-events");
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
            router.push(
              `/Dashboard/create-events/${cookies.event_id}/event_tickets`
            );
          }}
        >
          Save & Continue
        </Button>
      </Space>
    </Flex>
  );
};

export default EventPageAppearance;
