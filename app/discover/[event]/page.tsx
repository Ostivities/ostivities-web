"use client";

import AvailableEvents from "@/app/components/DashboardLayout/OtherEvents";
import EventStore from "@/app/components/DashboardLayout/EventStore";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Heading5 } from "@/app/components/typography/Typography";
import useFetch from "@/app/components/forms/create-events/auth";
import { Button, Dropdown, MenuProps, Space, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import React, { useEffect, useState, useMemo } from "react";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { useCookies } from "react-cookie";
import { useGetEventGuests } from "@/app/hooks/guest/guest.hook";
import EventPageLoader from "@/app/components/Loaders/EventPageLoader";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  XIcon,
} from "react-share";
import {
  ShareAltOutlined,
  CopyOutlined,
  EditOutlined,
  PlusOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import start from "@/public/Startsin.svg";
import end from "@/public/Endsin.svg";
import placeholder from "@/public/placeholder.svg";
import Head from "next/head";
import { Tooltip, Skeleton } from "antd";
import Dpmodal from "@/app/components/OstivitiesModal/CreateDp";
import { Heading3 } from "@/app/components/typography/Heading3";
import { ACCOUNT_TYPE } from "@/app/utils/enums";

const ShareModalContent: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: 600,
          fontFamily: "Bricolage Grotesque",
        }}
      >
        Share Event
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <FacebookShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FacebookIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Facebook
            </p>
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <XIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Twitter
            </p>
          </div>
        </TwitterShareButton>

        <WhatsappShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WhatsappIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              Whatsapp
            </p>
          </div>
        </WhatsappShareButton>

        <LinkedinShareButton url={url}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LinkedinIcon size={50} round />
            <p
              style={{
                marginTop: "5px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              LinkedIn
            </p>
          </div>
        </LinkedinShareButton>
      </div>

      <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            style={{
              width: "80%",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            value={url}
            readOnly
          />
          <Button onClick={copyToClipboard} icon={<CopyOutlined />}></Button>
        </div>
        {copySuccess && (
          <p style={{ color: "green", marginTop: "10px" }}>{copySuccess}</p>
        )}
      </div>
    </div>
  );
};

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ event: string }>();
  // console.log(params, 'params');
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  // console.log(getUserEventByUniqueKey, "getUserEventByUniqueKey");
  const { isLoggedIn, loading } = useFetch();
  const eventDetails =
    getUserEventByUniqueKey?.data?.data?.data === null
      ? router.push("/not-found")
      : getUserEventByUniqueKey?.data?.data?.data;
  // console.log(eventDetails, "eventDetails");

  const { getEventGuests } = useGetEventGuests(eventDetails?.id, 1, 10);
  const allGuestsData = getEventGuests?.data?.data?.data?.guests;
  const totalGuests = getEventGuests?.data?.data?.data?.total;

  interface Guest {
    personal_information: {
      firstName: string;
    };
  }


  const handleMenuClick: MenuProps["onClick"] = (e) => {
    return e;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Open the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModal2 = () => setShowModal(false);

  const eventUrl = eventDetails?.eventURL;
  const eventTitle = eventDetails?.eventName;

  const userFullName =
    eventDetails?.user?.accountType === ACCOUNT_TYPE.PERSONAL
      ? `${eventDetails?.user?.firstName ?? ""} ${
          eventDetails?.user?.lastName ?? ""
        }`.trim()
      : `${eventDetails?.user?.businessName ?? ""}`;

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

  // Countdown logic
  const eventDate = eventDetails?.startDate;
  const eventEndDate = eventDetails?.endDate; // End date if needed
  const eventdates = new Date(eventDate).getTime();
  const eventEnddates = eventEndDate ? new Date(eventEndDate).getTime() : null;

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isEventStarted, setIsEventStarted] = useState(false);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

  useEffect(() => {
    if (eventDetails?.enable_registration === false) {
      setIsRegistrationClosed(true);
    }

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distanceToStart = eventdates - now;
      const distanceToEnd = eventEnddates ? eventEnddates - now : null;

      const formatWithLeadingZero = (value: number): string =>
        String(value).padStart(2, "0");

      // Check if the event has started
      if (distanceToStart > 0) {
        // Event hasn't started yet
        setIsEventStarted(false);
        setIsRegistrationClosed(false); // Registration is open

        const days = formatWithLeadingZero(
          Math.floor(distanceToStart / (1000 * 60 * 60 * 24))
        );
        const hours = formatWithLeadingZero(
          Math.floor(
            (distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
        );
        const minutes = formatWithLeadingZero(
          Math.floor((distanceToStart % (1000 * 60 * 60)) / (1000 * 60))
        );
        const seconds = formatWithLeadingZero(
          Math.floor((distanceToStart % (1000 * 60)) / 1000)
        );

        setTimeRemaining({
          days: parseInt(days, 10),
          hours: parseInt(hours, 10),
          minutes: parseInt(minutes, 10),
          seconds: parseInt(seconds, 10),
        });
      } else if (distanceToEnd && distanceToEnd > 0) {
        // Event has started and is ongoing
        setIsEventStarted(true);
        setIsRegistrationClosed(false); // Registration is still open

        const days = formatWithLeadingZero(
          Math.floor(distanceToEnd / (1000 * 60 * 60 * 24))
        );
        const hours = formatWithLeadingZero(
          Math.floor((distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        const minutes = formatWithLeadingZero(
          Math.floor((distanceToEnd % (1000 * 60 * 60)) / (1000 * 60))
        );
        const seconds = formatWithLeadingZero(
          Math.floor((distanceToEnd % (1000 * 60)) / 1000)
        );

        setTimeRemaining({
          days: parseInt(days, 10),
          hours: parseInt(hours, 10),
          minutes: parseInt(minutes, 10),
          seconds: parseInt(seconds, 10),
        });
      } else if (eventDetails?.enable_registration === false) {
        setIsRegistrationClosed(true);
      } else {
        // Event has ended
        setIsEventStarted(false);
        setIsRegistrationClosed(true); // Close registration
        clearInterval(countdownInterval);
      }

      if (eventDetails?.enable_registration === false) {
        setIsRegistrationClosed(true); // Close registration
      } else {
        setIsRegistrationClosed(false);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [eventDate, eventDetails, eventEndDate, eventEnddates, eventdates]);

  const title = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="/icons/back-arrow.svg"
          alt=""
          height={25}
          width={25}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h1 style={{ fontSize: "24px" }}>{eventTitle}</h1>
      </div>
    </div>
  );

  const RegistrationTypes: MenuProps["items"] = [
    {
      label: (
        <Link
          href={`/discover/${params?.event}/tickets`}
          className="font-BricolageGrotesqueRegular font-normal text-md text-OWANBE_DARK"
        >
          Register as a guest
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          href={`/discover/vendorsregistration`}
          className="font-BricolageGrotesqueRegular font-normal text-md text-OWANBE_DARK"
        >
          Register as a vendor
        </Link>
      ),
      key: "2",
    },
  ];

  return (
    <DashboardLayout title={title} isLoggedIn>
      <Head>
        <meta property="og:title" content={eventDetails?.eventName} />
        <meta property="og:description" content={eventDetails?.eventDetails} />
        <meta property="og:image" content={eventDetails?.eventImage} />
        <meta
          property="og:url"
          content={`https://ostivities.com/discover/${params?.event}`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <section>
        {getUserEventByUniqueKey?.isLoading ? (
          <EventPageLoader />
        ) : (
          <div className="hidden min-[900px]:flex gap-10 md:flex-row">
            <div
              className="relative w-[400px] h-[520px] rounded-[3.125rem] overflow-hidden bg-white"
              style={{ boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)" }}
            >
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
            <div className="py-8" style={{ maxWidth: "21%" }}>
              <Heading5 className="text-2xl" content={"About this event"} />
              <div className="mt-8 flex flex-col gap-8">
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
            <div
              style={{ minWidth: "40%" }}
              className="font-BricolageGrotesqueRegular flex-1 h-fit my-auto border-l border-black pl-6"
            >
              <div className="py-8">
                <div className="border rounded-lg p-3 bg-white card-shadow flex justify-between items-center">
                  <h2 className="text-xl font-BricolageGrotesqueMedium">
                    {eventDetails?.eventName}
                  </h2>

                  <div className="flex items-center space-x-3">
                    {" "}
                    {/* Wrapper for buttons with tighter spacing */}
                    <Button
                      icon={
                        <ShareAltOutlined className="text-black text-2xl" />
                      }
                      onClick={handleOpenModal}
                      className="bg-white border-none p-0"
                    />
                    <Tooltip
                      title={
                        isLoggedIn
                          ? "Click to Scan Event Tickets"
                          : "Click to Create Your Attendee Flyer"
                      }
                    >
                      {isLoggedIn ? (
                        <Button
                          icon={
                            <ScanOutlined className="text-black text-2xl" />
                          }
                          onClick={() =>
                            window.open(
                              "https://scanner.ostivities.com/",
                              "_blank"
                            )
                          }
                          className="bg-white border-none p-0"
                        />
                      ) : (
                        <Button
                          icon={
                            <EditOutlined className="text-black text-2xl" />
                          }
                          onClick={handleShowModal}
                          className="bg-white border-none p-0"
                        />
                      )}
                    </Tooltip>
                  </div>

                  <Modal
                    open={isModalOpen}
                    onCancel={handleCloseModal}
                    footer={null}
                    centered
                    style={{
                      borderRadius: "15px",
                      padding: "20px", // Include padding here instead of using bodyStyle
                    }}
                  >
                    <ShareModalContent url={eventUrl} title={eventTitle} />
                  </Modal>
                </div>

                <div className="mt-1">
                  <div className="w-full min-w-[330px] gap-4 flex flex-row items-center justify-center text-center py-4">
                    {/* Image on the left side */}
                    <Image
                      src={isEventStarted ? end : start}
                      alt={isEventStarted ? "Ends" : "Starts"}
                      className="w-16 h-auto flex-shrink-0"
                    />

                    {/* Countdown beside the image */}
                    <div className="p-0">
                      {" "}
                      {/* Removed unnecessary padding */}
                      <div className="flex justify-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-12 h-12 border-2 border-[#e20000] rounded-full">
                            <div className="text-xl font-semibold">
                              {timeRemaining.days}
                            </div>
                          </div>
                          <div className="text-xs capitalize mt-2">Days</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-12 h-12 border-2 border-[#e20000] rounded-full">
                            <div className="text-xl font-semibold">
                              {timeRemaining.hours}
                            </div>
                          </div>
                          <div className="text-xs capitalize mt-2">Hours</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-12 h-12 border-2 border-[#e20000] rounded-full">
                            <div className="text-xl font-semibold">
                              {timeRemaining.minutes}
                            </div>
                          </div>
                          <div className="text-xs capitalize mt-2">Minutes</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-12 h-12 border-2 border-[#e20000] rounded-full">
                            <div className="text-xl font-semibold">
                              {timeRemaining.seconds}
                            </div>
                          </div>
                          <div className="text-xs capitalize mt-2">Seconds</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Heading3
                    className="text-lg font-bold mb-3"
                    content={"About this event"}
                  /> */}

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
                          marginTop: "20px",
                          borderRadius: "0.5rem", // Corner radius
                        }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    )}
                  </>
                  {eventDetails?.total_ticket_sold > 6 && (
                    <div style={{ marginTop: "20px", textAlign: "start" }}>
                      <p
                        style={{
                          fontWeight: "500", // Medium weight
                          fontFamily: "'Bricolage Grotesque', sans-serif", // Use the font here
                          fontSize: "16px",
                          // color: "#e20000", // Font color
                          borderBottom: "1px solid #ccc", // Adds the line
                          paddingBottom: "5px", // Adds spacing between text and line
                          marginBottom: "10px", // Adds spacing below the paragraph
                        }}
                      >
                        {eventDetails?.total_ticket_sold || 0} Going
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "start",
                          marginTop: "10px",
                        }}
                      >
                        {/* Add circular images for attendees */}
                        <img
                          src="/Profile1.svg"
                          alt="Attendee 1"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginLeft: "-10px", // Overlap effect
                            border: "2px solid white", // Border for better visibility
                          }}
                        />
                        <img
                          src="/Profile2.svg"
                          alt="Attendee 2"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginLeft: "-10px",
                            border: "2px solid white",
                          }}
                        />
                        <img
                          src="/Profile3.svg"
                          alt="Attendee 3"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginLeft: "-10px",
                            border: "2px solid white",
                          }}
                        />
                        <img
                          src="/Profile4.svg"
                          alt="Attendee 4"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginLeft: "-10px",
                            border: "2px solid white",
                          }}
                        />
                        <img
                          src="/Profile3.svg"
                          alt="Attendee 5"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginLeft: "-10px",
                            border: "2px solid white",
                          }}
                        />
                        <img
                          src="/Profile2.svg"
                          alt="Attendee 6"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginLeft: "-10px",
                            border: "2px solid white",
                          }}
                        />
                        {/* Add as many profile images as necessary */}
                      </div>
                      <p
                        style={{
                          marginTop: "10px",
                          fontWeight: 400,
                          color: "#000",
                          fontFamily: "'Bricolage Grotesque', sans-serif", // Apply the font here as well
                        }}
                      >
                        {/* <LatestGuests allGuestsData={allGuestsData} /> */}
                        and {eventDetails?.total_ticket_sold - 2 || 0} others
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center mt-12">
                    {eventDetails?.vendor_registration === true ? (
                      <>
                        <Dropdown
                          disabled={isRegistrationClosed} // Disable if registration is closed
                          menu={{
                            items: RegistrationTypes,
                            onClick: handleMenuClick,
                          }}
                        >
                          <Button
                            type={
                              pathname.includes("register") ? "primary" : "text"
                            }
                            className="primary-btn w-full"
                            style={{
                              borderRadius: "25px",
                              fontFamily: "BricolageGrotesqueMedium",
                              backgroundColor: isRegistrationClosed
                                ? "#cccccc"
                                : "#e20000", // Gray for disabled, red for active
                              color: isRegistrationClosed ? "#666666" : "white",
                              height: "50px", // Adjust height as needed
                              fontSize: "16px", // Increase text size
                              border: "none", // Remove border if needed
                            }}
                            title={
                              isRegistrationClosed ? "Registration Closed" : ""
                            }
                            disabled={isRegistrationClosed} // Disable button when registration is closed
                          >
                            <Space>
                              {eventDetails?.enable_registration === false
                                ? "Registration Closed"
                                : "Get Tickets"}
                              <IoChevronDown />
                            </Space>
                          </Button>
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <Button
                          type={
                            pathname.includes("register") ? "primary" : "text"
                          }
                          onClick={() =>
                            router.push(`/discover/${params?.event}/tickets`)
                          }
                          className="primary-btn w-full"
                          style={{
                            borderRadius: "25px",
                            fontFamily: "BricolageGrotesqueMedium",
                            backgroundColor: isRegistrationClosed
                              ? "#cccccc"
                              : "#e20000", // Gray for disabled, red for active
                            color: isRegistrationClosed ? "#666666" : "white",
                            height: "50px", // Adjust height as needed
                            fontSize: "16px", // Increase text size
                            border: "none", // Remove border if needed
                          }}
                          title={
                            isRegistrationClosed ? "Registration Closed" : ""
                          }
                          disabled={isRegistrationClosed} // Disable button when registration is closed
                        >
                          <Space>
                            {eventDetails?.enable_registration === false
                              ? "Registration Closed"
                              : "Get Tickets"}
                          </Space>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Modal
              title="Create your attendee flyer, download and share with everyone 🥳 "
              open={showModal}
              onCancel={handleCloseModal2}
              footer={null} // Removes the default footer
              width="50%" // Optional: Adjust width for a better overlay feel
              styles={{
                body: {
                  padding: "20px",
                  height: "auto",
                  maxHeight: "87vh",
                  overflowY: "auto",
                },
              }} // Decrease height
              centered // Centers the modal in the viewport
              destroyOnClose // Destroy modal on close for cleanup
            >
              {/* Pass the onClose function to the CreateAttendeeFlyer modal */}
              <Dpmodal />
            </Modal>
          </div>
        )}

        {/* !!!For small screen */}
        <div className="min-[900px]:hidden flex gap-10 flex-col">
          {getUserEventByUniqueKey?.isLoading ? (
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
          <div className="border rounded-lg p-3 bg-white card-shadow flex justify-between items-center -mt-3">
            <div>
              {getUserEventByUniqueKey?.isLoading ? (
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
            <div className="flex items-center space-x-3">
              {/* Wrapper for buttons with tighter spacing */}
              <Button
                icon={<ShareAltOutlined className="text-black text-2xl" />}
                onClick={handleOpenModal}
                className="bg-white border-none p-0"
              />

              <Tooltip
                title={
                  isLoggedIn
                    ? "Click to Scan Event Tickets"
                    : "Click to Create Your Attendee Flyer"
                }
              >
                {isLoggedIn ? (
                  <Button
                    icon={<ScanOutlined className="text-black text-2xl" />}
                    onClick={() =>
                      window.open("https://scanner.ostivities.com/", "_blank")
                    }
                    className="bg-white border-none p-0"
                  />
                ) : (
                  <Button
                    icon={<EditOutlined className="text-black text-2xl" />}
                    onClick={handleShowModal}
                    className="bg-white border-none p-0"
                  />
                )}
              </Tooltip>
            </div>

            <Modal
              open={isModalOpen}
              onCancel={handleCloseModal}
              footer={null}
              centered
              style={{
                borderRadius: "15px",
                padding: "20px", // Include padding here instead of using bodyStyle
              }}
            >
              <ShareModalContent url={eventUrl} title={eventTitle} />
            </Modal>
          </div>{" "}
          {getUserEventByUniqueKey?.isLoading ? (
            <Skeleton.Button
              active
              className="relative h-20 w-[126px] md:w-[100px] sm:w-[80px] rounded-[1rem]"
              shape="round"
              style={{
                height: "100%",
                width: "100%",
                margin: "6px",
                maxWidth: "100%",
              }}
            />
          ) : (
            <div className="rounded-lg flex flex-row items-center justify-center text-center p-3 w-full max-w-[95%] mx-auto">
              {/* Image on the left side */}
              <Image
                src={isEventStarted ? end : start}
                alt={isEventStarted ? "Ends" : "Starts"}
                className="w-20 h-auto flex-shrink-0 img_reduce"
              />

              {/* Countdown beside the image */}
              <div className="p-2 -mt-5 -mb-8">
                <div className="flex justify-center gap-4">
                  <div className="flex gap-1 flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 time_reduce border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl text-reduce font-semibold">
                        {timeRemaining.days}
                      </div>
                    </div>
                    <div className="text-xs capitalize">Days</div>
                  </div>

                  <div className="flex gap-1 flex-col items-center">
                    <div className="flex items-center time_reduce justify-center w-12 h-12 border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl text-reduce font-semibold">
                        {timeRemaining.hours}
                      </div>
                    </div>
                    <div className="text-xs capitalize">Hours</div>
                  </div>

                  <div className="flex gap-1 flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 time_reduce border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl text-reduce font-semibold">
                        {timeRemaining.minutes}
                      </div>
                    </div>
                    <div className="text-xs capitalize">Minutes</div>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="flex items-center time_reduce justify-center w-12 h-12 border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl text-reduce font-semibold">
                        {timeRemaining.seconds}
                      </div>
                    </div>
                    <div className="text-xs capitalize">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {getUserEventByUniqueKey?.isLoading ? (
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
              {eventDetails?.total_ticket_sold > 6 && (
                <div style={{ marginTop: "20px", textAlign: "start" }}>
                  <p
                    style={{
                      fontWeight: "500", // Medium weight
                      fontFamily: "'Bricolage Grotesque', sans-serif", // Use the font here
                      fontSize: "16px",
                      // color: "#e20000", // Font color
                      borderBottom: "1px solid #ccc", // Adds the line
                      paddingBottom: "5px", // Adds spacing between text and line
                      marginBottom: "10px", // Adds spacing below the paragraph
                    }}
                  >
                    {eventDetails?.total_ticket_sold || 0} Going
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      marginTop: "10px",
                    }}
                  >
                    {/* Add circular images for attendees */}
                    <img
                      src="/Profile1.svg"
                      alt="Attendee 1"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "-10px", // Overlap effect
                        border: "2px solid white", // Border for better visibility
                      }}
                    />
                    <img
                      src="/Profile2.svg"
                      alt="Attendee 2"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "-10px",
                        border: "2px solid white",
                      }}
                    />
                    <img
                      src="/Profile3.svg"
                      alt="Attendee 3"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "-10px",
                        border: "2px solid white",
                      }}
                    />
                    <img
                      src="/Profile4.svg"
                      alt="Attendee 4"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "-10px",
                        border: "2px solid white",
                      }}
                    />
                    <img
                      src="/Profile3.svg"
                      alt="Attendee 5"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "-10px",
                        border: "2px solid white",
                      }}
                    />
                    <img
                      src="/Profile2.svg"
                      alt="Attendee 6"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "-10px",
                        border: "2px solid white",
                      }}
                    />
                    {/* Add as many profile images as necessary */}
                  </div>
                  <p
                    style={{
                      marginTop: "10px",
                      fontWeight: 400,
                      color: "#000",
                      fontFamily: "'Bricolage Grotesque', sans-serif", // Apply the font here as well
                    }}
                  >
                    {allGuestsData?.[0]?.personal_information?.firstName},{" "}
                    {allGuestsData?.[1]?.personal_information?.firstName} and{" "}
                    {eventDetails?.total_ticket_sold - 2 || 0} others
                  </p>
                </div>
              )}
            </div>
          )}
          <div>
            <Heading3
              className="text-lg font-bold mb-3"
              content={"About this event"}
            />
            {getUserEventByUniqueKey?.isLoading ? (
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
            <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: "20px",
              backgroundColor: "white",
              zIndex: 99,
            }}
             className="flex justify-center mt-12">
              {eventDetails?.vendor_registration === true ? (
                <>
                  <Dropdown
                    disabled={isRegistrationClosed} // Disable if registration is closed
                    menu={{
                      items: RegistrationTypes,
                      onClick: handleMenuClick,
                    }}
                  >
                    <Button
                      type={pathname.includes("register") ? "primary" : "text"}
                      className="primary-btn w-full "
                      style={{
                        borderRadius: "25px",
                        fontFamily: "BricolageGrotesqueMedium",
                        backgroundColor: isRegistrationClosed
                          ? "#cccccc"
                          : "#e20000", // Gray for disabled, red for active
                        color: isRegistrationClosed ? "#666666" : "white",
                        height: "50px", // Adjust height as needed
                        fontSize: "16px", // Increase text size
                        border: "none", // Remove border if needed
                      }}
                      title={isRegistrationClosed ? "Registration Closed" : ""}
                      disabled={isRegistrationClosed} // Disable button when registration is closed
                    >
                      <Space>
                        {eventDetails?.enable_registration === false
                          ? "Registration Closed"
                          : "Get Tickets"}
                        <IoChevronDown />
                      </Space>
                    </Button>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button
                    type={pathname.includes("register") ? "primary" : "text"}
                    onClick={() =>
                      router.push(`/discover/${params?.event}/tickets`)
                    }
                    className="primary-btn w-full"
                    style={{
                      borderRadius: "25px",
                      fontFamily: "BricolageGrotesqueMedium",
                      backgroundColor: isRegistrationClosed
                        ? "#cccccc"
                        : "#e20000", // Gray for disabled, red for active
                      color: isRegistrationClosed ? "#666666" : "white",
                      height: "50px", // Adjust height as needed
                      fontSize: "16px", // Increase text size
                      border: "none", // Remove border if needed
                    }}
                    title={isRegistrationClosed ? "Registration Closed" : ""}
                    disabled={isRegistrationClosed} // Disable button when registration is closed
                  >
                    <Space>
                      {eventDetails?.enable_registration === false
                        ? "Registration Closed"
                        : "Get Tickets"}
                    </Space>
                  </Button>
                </>
              )}
            </div>
          </div>
          <Modal
            title="Create your attendee flyer, download and share with everyone 🥳"
            open={showModal}
            onCancel={handleCloseModal2}
            footer={null} // Removes the default footer
            width="50%" // Optional: Adjust width for a better overlay feel
            styles={{
              body: {
                padding: "20px",
                height: "auto",
                maxHeight: "87vh",
                overflowY: "auto",
              },
            }} // Decrease height
            centered // Centers the modal in the viewport
            destroyOnClose // Destroy modal on close for cleanup
          >
            {/* Pass the onClose function to the CreateAttendeeFlyer modal */}
            <Dpmodal />
          </Modal>
        </div>
        <br /><br />
        <EventStore />
        <br /><br /><br />
        <hr style={{ border: "0.1px solid #d3d3d3", margin: "3px 0" }} />
        <br /><br /><br />
        <AvailableEvents />
      </section>
    </DashboardLayout>
  );
};

export default EventDetail;
