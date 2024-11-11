"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Button } from "antd";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Heading5 } from "../../../../components/typography/Typography";
import CantPublish from "@/app/components/OstivitiesModal/CantPublishModal";
import { useState } from "react";
import { useGetUserEvent, usePublishEvent } from "@/app/hooks/event/event.hook";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import { useCookies } from "react-cookie";
import React from "react";
import { dateFormat, timeFormat } from "../../../../utils/helper";
import Link from "next/link";
import useFetch from "@/app/components/forms/create-events/auth";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import placeholder from "@/public/placeholder.svg";

export default function PublishEvent(): JSX.Element {
  // const { isLoggedIn } = useFetch();

  // if(!isLoggedIn) {
  //   return <></>;
  // }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
  ]);
  const pathname = usePathname();
  const [imageUrl, setImageUrl] = useState<string>("/images/emptyimage2.png");
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { profile } = useProfile();
  const { publishEvent } = usePublishEvent();
  const userFullName =
    profile?.data?.data?.data?.firstName +
    " " +
    profile?.data?.data?.data?.lastName;

  const { getUserEvent } = useGetUserEvent(params?.id || cookies.event_id);
  const eventDetails = getUserEvent?.data?.data?.data;
  // console.log(eventDetails, "eventDetails");

  const handlePublishEvent = async () => {
    setIsModalOpen(true);
    // if (response.) {
    // }
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

  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>Publish your event</h1>
    </div>
  );

  return (
    <React.Fragment>
      <DashboardLayout title={title} isLoggedIn>
        <section>
          <div className="flex gap-12">
            <div className="relative w-[400px] h-[550px] rounded-[3.125rem] overflow-hidden">
              <Image
                src={eventDetails?.eventImage ? eventDetails.eventImage : placeholder}
                alt="Event Image"
                fill
                style={{ objectFit: "cover" }}
                className=""
              />
              <div className="absolute inset-0 bg-image-card"></div>
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
                    <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
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
                      <Image
                        src="/icons/phone.svg"
                        alt=""
                        height={25}
                        width={25}
                      />
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7465438415493!2d3.427544374805034!3d6.426600593564447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5402368b913%3A0xca22600eeec46d00!2sEko%20Hotel%20And%20Suites!5e0!3m2!1sen!2sus!4v1730907605084!5m2!1sen!2sus"
                  width="100%"
                  height="120"
                  style={{ border: 0, marginTop: "20px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
          <div className="flex justify-center mt-12">
                <Button
                  type="primary"
                 
                  className="primary-btn w-full"
                  style={{
                    borderRadius: "25px",
                    fontFamily: "BricolageGrotesqueMedium",
                    float: "right",
                    height: "50px", // Adjust height as needed
                    fontSize: "16px", // Increase text size
                    border: "none", // Remove border if needed
                  }}
                  onClick={handlePublishEvent}
                >
                  Publish Event
                </Button>
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>

      {/* Modal for Publish Success */}
      {isModalOpen && (
        <CantPublish
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
}
