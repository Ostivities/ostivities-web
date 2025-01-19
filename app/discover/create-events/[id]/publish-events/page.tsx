"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Button, Skeleton } from "antd";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Heading5 } from "../../../../components/typography/Typography";
import PublishSuccess from "@/app/components/OstivitiesModal/PublishSuccessModal";
import CantPublish from "@/app/components/OstivitiesModal/CantPublishModal";
import { useState } from "react";
import {
  useGetUserEvent,
  usePublishEvent,
  useAddEventToDiscovery,
  useEnableEventRegistration,
} from "@/app/hooks/event/event.hook";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import { useCookies } from "react-cookie";

import React from "react";
import { dateFormat, timeFormat } from "../../../../utils/helper";
import Link from "next/link";
import { PUBLISH_TYPE } from "@/app/utils/enums";
import useFetch from "@/app/components/forms/create-events/auth";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import placeholder from "@/public/placeholder.svg";
import EventPageLoader from "@/app/components/Loaders/EventPageLoader";

export default function PublishEvent(): JSX.Element {
  // const { isLoggedIn } = useFetch();

  // if(!isLoggedIn) {
  //   return <></>;
  // }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "event_id",
    "form_stage",
    "ticket_created",
    "stage_one",
    "stage_two",
    "stage_three",
    "mapSrc",
    "profileData",
  ]);
  const pathname = usePathname();
  const [imageUrl, setImageUrl] = useState<string>("/images/emptyimage2.png");
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { profile } = useProfile();
  const { publishEvent } = usePublishEvent();
  const { addEventToDiscovery } = useAddEventToDiscovery();
  const { enableEventRegistration } = useEnableEventRegistration();
  const userFullName =
    cookies?.profileData?.firstName + " " + cookies?.profileData?.lastName;

  const { getUserEvent } = useGetUserEvent(params?.id || cookies.event_id);
  const eventDetails = getUserEvent?.data?.data?.data;
  //

  const handlePublishEvent = async () => {
    const response = await publishEvent.mutateAsync({
      ids: [params?.id],
      mode: PUBLISH_TYPE.ACTIVE,
    });

    if (response.status === 200) {
      await addEventToDiscovery.mutateAsync({
        ids: [params?.id],
        discover: true,
      });
      await enableEventRegistration.mutateAsync({
        id: params?.id,
        enable_registration: true,
      });

      localStorage.removeItem("uploadedFiles");
      setIsModalOpen(true);
      removeCookie("event_id");
      removeCookie("form_stage");
      removeCookie("ticket_created");
      removeCookie("stage_one");
      removeCookie("stage_two");
      removeCookie("stage_three");
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
          {getUserEvent.isLoading ? (
            <EventPageLoader />
          ) : (
            <div className="hidden min-[900px]:flex gap-10 md:flex-row">
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
              </div>
              <div className="py-8" style={{ maxWidth: "21%" }}>
                <Heading5 className="text-2xl" content={"About this event"} />
                <div className="mt-14 flex flex-col gap-8">
                  <div className="flex items-start">
                    {/* Image Section */}
                    <div className="bg-OWANBE_PRY/20 max-h-[41px] min-w-[41px] p-2 rounded-xl flex-center justify-center">
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
                    <div className="bg-OWANBE_PRY/20 max-h-[41px] min-w-[41px] p-2 rounded-xl flex-center justify-center">
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
                        {timeFormat(eventDetails?.endDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
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
                          // width: "190px",
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
                      <Image
                        src="/icons/host.svg"
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
                      <div className="bg-OWANBE_PRY/20 max-h-[41px] min-w-[41px] p-2 rounded-xl flex items-center justify-center">
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
              <div style={{ minWidth: "40%" }} className="font-BricolageGrotesqueRegular flex-1 h-fit my-auto border-l border-black px-6">
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
                    disabled={publishEvent.isPending}
                    loading={publishEvent.isPending}
                    onClick={handlePublishEvent}
                  >
                    Publish Event
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* For small screen */}
          <div className="min-[900px]:hidden flex gap-10 flex-col">
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
                    eventDetails?.eventImage
                      ? eventDetails.eventImage
                      : placeholder
                  }
                  alt="Event Image"
                  fill
                  style={{ objectFit: "cover" }}
                  className=""
                />
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
                    <Image
                      src="/icons/host.svg"
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
                disabled={publishEvent.isPending}
                loading={publishEvent.isPending}
                onClick={handlePublishEvent}
              >
                Publish Event
              </Button>
            </div>
          </div>
        </section>
      </DashboardLayout>

      {/* Modal for Publish Success */}
      {isModalOpen && (
        <PublishSuccess
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOk={getUserEvent.refetch}
        />
      )}
    </React.Fragment>
  );
}
