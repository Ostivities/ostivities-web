import React, { useState } from "react";
import { Space, Upload, message } from "antd";
import { CameraFilled } from "@ant-design/icons";
import Image from "next/image";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import { Heading5 } from "../../typography/Typography";
import axios from "axios";
import { useGetUserEvent, useUpdateEvent } from "@/app/hooks/event/event.hook";
import { useCookies } from "react-cookie";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { useProfile, useUpdateProfile } from "@/app/hooks/auth/auth.hook";
import Link from "next/link";

const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const event_appearance_image: any =
  process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_APPEARANCE_IMAGES;

const EventPageAppearance: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("/images/emptyimage2.png");
  const [loader, setLoader] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["event_id"]);
  const { getUserEvent } = useGetUserEvent(cookies.event_id);
  const { updateEvent } = useUpdateEvent();
  const { profile } = useProfile();
  const userFullName =
    profile?.data?.data?.data?.firstName +
    " " +
    profile?.data?.data?.data?.lastName;
  console.log(getUserEvent);

  const eventDetails = getUserEvent?.data?.data?.data;
  console.log(eventDetails?.socials);

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
    <Space direction="vertical" size={"large"}>
      <Space direction="vertical" size={"small"}></Space>
      <div className="flex gap-12">
        <div className="relative w-[400px] h-[520px] rounded-[3.125rem] overflow-hidden">
          <Image
            src={imageUrl}
            alt="Event Image"
            fill
            style={{ objectFit: "cover" }}
            className=""
          />
          <div className="absolute inset-0 bg-image-card"></div>
          <Upload className="absolute top-2 right-2 z-10" {...props}>
            <button className="bg-white p-4 rounded-full shadow flex items-center justify-center">
              <CameraFilled
                style={{
                  fontSize: "24px",
                  color: "#e20000",
                  background: "none",
                }}
              />
            </button>
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
                  {timeFormat(eventDetails?.startDate)}
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
    </Space>
  );
};

export default EventPageAppearance;
