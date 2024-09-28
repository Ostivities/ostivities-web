"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Button } from "antd";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Heading5 } from "../../../../components/typography/Typography";
import PublishSuccess from "@/app/components/OstivitiesModal/PublishSuccessModal";
import CantPublish from "@/app/components/OstivitiesModal/CantPublishModal";
import { useState } from "react";
import { useGetUserEvent, usePublishEvent } from "@/app/hooks/event/event.hook";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import { useCookies } from "react-cookie";

import React from "react";
import { dateFormat, timeFormat } from "../../../../utils/helper";
import Link from "next/link";

export default function PublishEvent(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "event_id",
    "form_stage",
    "ticket_created",
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
    const response = await publishEvent.mutateAsync(params?.id || cookies.event_id);
    console.log(response, "response");
    if (response.status === 200) {
      setIsModalOpen(true);
      removeCookie('event_id');
      removeCookie('form_stage');
      removeCookie('ticket_created');
      removeCookie('stage_one');
      removeCookie('stage_two');
      removeCookie('stage_three');
    }
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
                src={eventDetails?.eventImage || imageUrl}
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
                <div className="flex gap-3">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                    <Image
                      src="/icons/calendar.svg"
                      alt=""
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>
                      Date
                    </div>
                    <div>
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
                    <div className="text-sm" style={{ fontWeight: 600 }}>
                      Time
                    </div>
                    <div>
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
                    <div className="text-sm" style={{ fontWeight: 600 }}>
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
                        style={{ color: "#e20000", textDecoration: "none" }}
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
              <div
                className="font-BricolageGrotesqueRegular flex-1 h-fit px-1"
                dangerouslySetInnerHTML={{
                  __html: eventDetails?.eventDetails as string,
                }}
              ></div>
              <div className="flex justify-center mt-12">
                <Button
                  type="primary"
                  size={"large"}
                  className="w-full rounded-full bg-OWANBE_PRY px-24 py-3 text-white text-l font-bold"
                  style={{
                    borderRadius: "25px",
                    fontFamily: "BricolageGrotesqueMedium",
                    float: "right",
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
        <PublishSuccess
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
}
