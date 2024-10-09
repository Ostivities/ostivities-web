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
import { useGetUserEvent, usePublishEvent } from "@/app/hooks/event/event.hook";
import { useCookies } from "react-cookie";
import useFetch from "@/app/components/forms/create-events/auth";
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
  const params = useParams<{ event: string; id: string }>();
  // console.log(params, 'params');
  const { getUserEvent } = useGetUserEvent(params?.id);
  const eventDetails = getUserEvent?.data?.data?.data;
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
  const eventdates = new Date(eventDate).getTime();
  // console.log(eventdates, "eventdates");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      // console.log(now, "now");
      const distance = new Date(eventDate).getTime() - now;
      //  console.log(distance)

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [eventDate]);

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
          href={`/Dashboard/${params?.event}/${params?.id}/tickets`}
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
          href={`/Dashboard/vendorsregistration`}
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
                  <Image src="/icons/time.svg" alt="" height={25} width={25} />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>
                    Time
                  </div>
                  <div>
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
                  <div className="text-sm" style={{ fontWeight: 600 }}>
                    Location
                  </div>
                  <div
                    style={{
                      width: "190px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
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
                  <Image src="/icons/host.svg" alt="" height={25} width={25} />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>
                    Host
                  </div>
                  <div>
                    <div>{userFullName}</div>
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
                    padding: "20px"  // Include padding here instead of using bodyStyle
                  }}
                >
                  <ShareModalContent url={eventUrl} title={eventTitle} />
                </Modal>
              </div>

              <div className="mt-8">
                <div className="flex justify-center gap-12">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl font-semibold">
                        {timeRemaining.days}
                      </div>
                    </div>
                    <div className="text-xs capitalize mt-2">Days</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl font-semibold">
                        {timeRemaining.hours}
                      </div>
                    </div>
                    <div className="text-xs capitalize mt-2">Hours</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl font-semibold">
                        {timeRemaining.minutes}
                      </div>
                    </div>
                    <div className="text-xs capitalize mt-2">Minutes</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#e20000] rounded-full">
                      <div className="text-2xl font-semibold">
                        {timeRemaining.seconds}
                      </div>
                    </div>
                    <div className="text-xs capitalize mt-2">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div
              className="font-BricolageGrotesqueRegular flex-1 h-fit px-1"
              dangerouslySetInnerHTML={{
                __html: eventDetails?.eventDetails as string,
              }}
            ></div> */}
            <ReadMoreHTML htmlContent={eventDetails?.eventDetails || ""} maxLength={400} />
            <div className="flex justify-center mt-12">
              <Dropdown
                disabled={eventdates < new Date().getTime()}
                menu={{ items: RegistrationTypes, onClick: handleMenuClick }}
              >
                <Button
                  type={pathname.includes("register") ? "primary" : "text"}
                  className="primary-btn w-full"
                  style={{
                    borderRadius: "25px",
                    fontFamily: "BricolageGrotesqueMedium",
                    backgroundColor: eventdates < new Date().getTime() ? "#cccccc" : "#e20000", // Gray for disabled, red for active
                    color: eventdates < new Date().getTime() ? "#666666" : "white",
                    height: "50px", // Adjust height as needed
                    fontSize: "16px", // Increase text size
                    border: "none", // Remove border if needed
                  }}
                  title={eventdates < new Date().getTime() ? "Registration Closed" : ""}
                  disabled={eventdates < new Date().getTime()}
                >
                  <Space>
                  Get Tickets
                    <IoChevronDown />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <AvailableEvents />
      </section>
    </DashboardLayout>
  );
};

export default EventDetail;
