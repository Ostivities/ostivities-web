"use client";

import AvailableEvents from "@/app/components/DashboardLayout/OtherEvents";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Heading5 } from "@/app/components/typography/Typography";
import { Button, Dropdown, MenuProps, Space, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { useCookies } from "react-cookie";
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
import { ShareAltOutlined, CopyOutlined } from "@ant-design/icons";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import start from "@/public/Startsin.svg";
import end from "@/public/Endsin.svg";

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

  const eventDetails = getUserEventByUniqueKey?.data?.data?.data === null ? router.push('/not-found') : getUserEventByUniqueKey?.data?.data?.data;
  // console.log(eventDetails, "eventDetails");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    return e;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const eventUrl = eventDetails?.eventURL;
  const eventTitle = eventDetails?.eventName;

  const userFullName =
    (eventDetails?.user?.firstName || "") +
    " " +
    (eventDetails?.user?.lastName || "");

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

      // Check if the event has started
      if (distanceToStart > 0) {
        // Event hasn't started yet
        setIsEventStarted(false);
        setIsRegistrationClosed(false); // Registration is open

        const days = Math.floor(distanceToStart / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distanceToStart % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distanceToStart % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else if (distanceToEnd && distanceToEnd > 0) {
        // Event has started and is ongoing
        setIsEventStarted(true);
        setIsRegistrationClosed(false); // Registration is still open

        const days = Math.floor(distanceToEnd / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distanceToEnd % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distanceToEnd % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
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
    <div className="flex-center gap-2">
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
      <section>
        <div className="flex gap-10">
          <div className="relative w-[400px] h-[520px] rounded-[3.125rem] overflow-hidden">
            <Image
              src={eventDetails?.eventImage}
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
                  <Image src="/icons/time.svg" alt="" height={25} width={25} />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Time
                  </div>
                  <div style={{ fontWeight: 300, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {timeFormat(eventDetails?.startDate)} -{" "}
                    {timeFormat(eventDetails?.endDate)} {eventDetails?.timeZone}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
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
                  <Image src="/icons/host.svg" alt="" height={25} width={25} />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Host
                  </div>
                  <div>
                    <div style={{ fontWeight: 300, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
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
              <div className="border rounded-lg p-3 bg-white card-shadow flex justify-between items-center">
                <h2 className="text-xl font-BricolageGrotesqueMedium">
                  {eventDetails?.eventName}
                </h2>

                <Button
                  icon={<ShareAltOutlined className="text-black text-2xl" />}
                  onClick={handleOpenModal}
                  className="bg-white border-none p-0"
                />

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
                <div className="rounded-lg overflow-hidden flex flex-row items-center justify-center text-center p-4">
                  {/* Image on the left side */}
                  <Image
                    src={isEventStarted ? end : start}
                    alt={isEventStarted ? "Ends" : "Starts"}
                    className="w-20 h-auto flex-shrink-0"
                  />

                  {/* Countdown beside the image */}
                  <div className="p-4">
                    <div className="flex justify-center gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                          <div className="text-2xl font-semibold">
                            {timeRemaining.days}
                          </div>
                        </div>
                        <div className="text-xs capitalize mt-2">Days</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                          <div className="text-2xl font-semibold">
                            {timeRemaining.hours}
                          </div>
                        </div>
                        <div className="text-xs capitalize mt-2">Hours</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                          <div className="text-2xl font-semibold">
                            {timeRemaining.minutes}
                          </div>
                        </div>
                        <div className="text-xs capitalize mt-2">Minutes</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                          <div className="text-2xl font-semibold">
                            {timeRemaining.seconds}
                          </div>
                        </div>
                        <div className="text-xs capitalize mt-2">Seconds</div>
                      </div>
                    </div>
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
                        onClick={() => router.push(`/discover/${params?.event}/tickets`)}
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
        </div>
        <br />
        <br />
        <AvailableEvents />
      </section>
    </DashboardLayout>
  );
};

export default EventDetail;
