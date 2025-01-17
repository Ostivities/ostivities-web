"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import useModal from "@/app/hooks/useModal";
import type { MenuProps } from "antd";
import { Skeleton } from "antd";
import { Button, Card, Dropdown, message, Space, Switch, Tooltip } from "antd";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import PaymentDetails from "../OstivitiesModal/PaymentDetails";
import Image from "next/image";
import ToggleSwitch from "@/app/ui/atoms/ToggleSwitch";
// import { useGetUserEvent, usePublishEvent } from "@/app/hooks/event/event.hook";
import {
  useGetUserEvent,
  useAddEventToDiscovery,
  usePublishEvent,
} from "@/app/hooks/event/event.hook";
import { useGetSettlementAccount } from "@/app/hooks/settlement/settlement.hook";
import { EVENT_INFO, PUBLISH_TYPE } from "@/app/utils/enums";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";

interface EventProps {
  totalTickets?: number;
  totalRevenue?: number;
  nextDate?: string;
  isLoading?: boolean;
}
export default function EventDetailsComponent({
  children,
  totalTickets,
  totalRevenue,
  nextDate,
  isLoading,
}: {
  children: React.ReactNode;
} & EventProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getUserEvent } = useGetUserEvent(params?.id);
  const { getTickets } = useGetEventTickets(params?.id);
  const { addEventToDiscovery } = useAddEventToDiscovery();
  const { publishEvent } = usePublishEvent();
  const [accountDetailsAdded, setAccountDetailsAdded] = useState(false);
  const eventDetails = getUserEvent?.data?.data?.data;
  const { getSettlementAccount } = useGetSettlementAccount(
    eventDetails?.user?.id
  );
  const [isPublished, setIsPublished] = useState(eventDetails?.mode || null); // State to track publish status
  const [isDiscover, setIsDiscover] = useState(false); // State to track discovery status
  const tickets = getTickets?.data?.data?.data;
  const eventDate = eventDetails?.endDate;
  const eventdates = new Date(eventDate).getTime();

  useEffect(() => {
    if (eventDetails?.mode && eventDetails?.mode === PUBLISH_TYPE.ACTIVE) {
      setTimeout(() => {
        setIsPublished(true);
      }, 2000);
    } else if (
      eventDetails?.mode &&
      eventDetails?.mode === PUBLISH_TYPE.INACTIVE
    ) {
      setTimeout(() => {
        setIsPublished(false);
      }, 2000);
    }
    if (eventDetails?.discover === true) {
      setIsDiscover(true);
    }
  }, [eventDetails]);

  const handlePublishEvent = async () => {
    if (eventDetails?.mode === PUBLISH_TYPE.ACTIVE) {
      if (eventDetails?.total_ticket_sold > 0) {
        message.error("Event with sold tickets cannot be unpublished");
        return;
      }

      const response = await publishEvent.mutateAsync({
        ids: [params?.id],
        mode: PUBLISH_TYPE.INACTIVE,
      });

      if (response.status === 200) {
        setIsPublished(!isPublished);
        getUserEvent.refetch();
        setIsDiscover(false);
        message.success("Event unpublished successfully");
        //
      }
    } else if (
      eventDetails?.mode === PUBLISH_TYPE.INACTIVE ||
      !eventDetails?.mode
    ) {
      if (
        eventdates < new Date().getTime() &&
        eventDetails?.eventInfo === EVENT_INFO.SINGLE_EVENT
      ) {
        message.error(
          "The event has ended and cannot be published. Please update the event details to republish."
        );
        return;
      }
      const response = await publishEvent.mutateAsync({
        ids: [params?.id],
        mode: PUBLISH_TYPE.ACTIVE,
      });
      if (response.status === 200) {
        getUserEvent.refetch();
        setIsPublished(!isPublished);
        message.success("Event published successfully");
        //
      }
    }
  };

  const linkToCopy = eventDetails?.eventURL;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(linkToCopy);
    message.success("Event link copied");
  };

  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleSwitchChange = async (checked: boolean) => {
    if (eventDetails?.discover === false) {
      const res = await addEventToDiscovery.mutateAsync({
        ids: [params?.id],
        discover: true,
      });

      if (res.status === 200) {
        message.success("Event added to discovery successfully");
        setIsDiscover(true);
        getUserEvent.refetch();
        //
      }
    } else if (eventDetails?.discover === true) {
      const res = await addEventToDiscovery.mutateAsync({
        ids: [params?.id],
        discover: false,
      });
      if (res.status === 200) {
        setIsDiscover(false);
        getUserEvent.refetch();
        message.success("Event removed from discovery successfully");
      }
    }
  };

  const handleToggle = (label: string) => {
    setActiveToggle((prev: string | null) => (prev === label ? null : label));
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isPublished === true) {
      const checkEventStatus = async () => {
        if (
          eventdates < new Date().getTime() &&
          eventDetails?.eventInfo === EVENT_INFO.SINGLE_EVENT
        ) {
          const response = await publishEvent.mutateAsync({
            ids: [params?.id],
            mode: PUBLISH_TYPE.INACTIVE,
          });
          if (response.status === 200) {
            setIsPublished(false);
          }
        }
      };
      checkEventStatus();
    }
  }, [eventDetails, params?.id]);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        // Replace this with your actual API call
        const response = eventDetails?.discover;
        setIsActive(response);
      } catch (error) {
        console.error("Failed to fetch event details", error);
      }
    };

    fetchInitialState();
  }, [eventDetails]);

  const ExtraTab = (): JSX.Element => {
    const handleMenuClick: MenuProps["onClick"] = (e) => {
      return e;
    };

    const TicktItems: MenuProps["items"] = [
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/tickets`}
            className={`font-BricolageGrotesqueRegular font-normal text-sm ${
              pathname.includes("tickets")
                ? "text-OWANBE_PRY"
                : "text-OWANBE_DARK"
            }`}
          >
            Tickets
          </Link>
        ),
        key: "1",
      },
      {
        label: (
          <Link
            href={
              tickets?.length === 0
                ? "#"
                : `/discover/events-created/${params?.id}/tickets/discounts`
            } // If discount is disabled, set href to "#"
            className={`font-BricolageGrotesqueRegular font-normal text-sm ${
              tickets?.length === 0
                ? "text-OWANBE_DARK opacity-50 cursor-not-allowed" // Disable styling
                : "text-OWANBE_DARK"
            }`}
            onClick={(e) => {
              if (tickets?.length === 0) e.preventDefault(); // Prevent link click if disabled
            }}
          >
            Discounts
          </Link>
        ),
        key: "2",
      },
    ];

    const GuestItems: MenuProps["items"] = [
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/guestlist`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Guestlist
          </Link>
        ),
        key: "1",
      },
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/guestlist/email`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Email Guestlist
          </Link>
        ),
        key: "2",
      },
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/guestlist/summary`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Check in Summary
          </Link>
        ),
        key: "3",
      },
    ];

    const CoordinatorsItems: MenuProps["items"] = [
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/coordinators`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Coordinators
          </Link>
        ),
        key: "1",
      },
      {
        label: (
          <Tooltip title="Coming Soon">
            <span>
              <Link
                href={`/discover/events-created/${params?.id}/coordinators/vendors`}
                className="font-BricolageGrotesqueRegular font-normal text-sm text-gray-400 cursor-not-allowed"
              >
                Vendors Management
              </Link>
            </span>
          </Tooltip>
        ),
        key: "2",
        disabled: true, // Keeps the item disabled
      },
    ];

    const MerchandiseItems: MenuProps["items"] = [
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/merchandise/products`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Products
          </Link>
        ),
        key: "1",
        disabled: true,
      },
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/merchandise/orders`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Orders
          </Link>
        ),
        key: "2",
        disabled: true,
      },
      {
        label: (
          <Link
            href={`/discover/events-created/${params?.id}/merchandise/shipping`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Shipping
          </Link>
        ),
        key: "3",
        disabled: true,
      },
    ];

    return (
      <div
        className={`flex flex-row overflow-x-scroll items-center justify-between`}
      >
        <div className="flex flex-row items-center space-x-4">
          <Button
            type={pathname.includes("about") ? "primary" : "text"}
            size={"large"}
            className={`font-BricolageGrotesqueRegular ${
              pathname.includes("about") ? "sign-up" : ""
            } cursor-pointer font-medium w-32 rounded-2xl`}
            style={{
              borderRadius: "25px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={() => {
              router.push(`/discover/events-created/${params?.id}/about`);
            }}
          >
            About
          </Button>
          <Dropdown
            menu={{
              items: TicktItems,
              onClick: handleMenuClick,
            }}
          >
            <Button
              type={pathname.includes("tickets") ? "primary" : "text"}
              className={`font-BricolageGrotesqueRegular cursor-pointer font-medium w-32 rounded-2xl ${
                pathname.includes("tickets") ? "sign-up" : ""
              }`}
              style={{
                borderRadius: "25px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              size="large"
            >
              <Space>
                Tickets
                <IoChevronDown
                  color={`${
                    pathname.includes("tickets") ? "#ffffff" : "#000000"
                  }`}
                />
              </Space>
            </Button>
          </Dropdown>

          <Button
            type={pathname.includes("event_page_view") ? "primary" : "text"}
            size="large"
            className={`font-BricolageGrotesqueRegular ${
              pathname.includes("event_page_view") ? "sign-up" : ""
            } cursor-pointer font-medium w-40 rounded-2xl`}
            style={{
              borderRadius: "25px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={() => {
              router.push(
                `/discover/events-created/${params?.id}/event_page_view`
              );
            }}
          >
            Event Page view
          </Button>

          <Dropdown menu={{ items: GuestItems, onClick: handleMenuClick }}>
            <Button
              type={pathname.includes("guestlist") ? "primary" : "text"}
              className="font-BricolageGrotesqueRegular cursor-pointer font-medium w-32 rounded-2xl"
              style={{
                borderRadius: "25px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              size="large"
            >
              <Space>
                Guest List
                <IoChevronDown />
              </Space>
            </Button>
          </Dropdown>

          <Dropdown
            menu={{ items: CoordinatorsItems, onClick: handleMenuClick }}
          >
            <Button
              type={pathname.includes("coordinators") ? "primary" : "text"}
              className="font-BricolageGrotesqueRegular cursor-pointer font-medium w-40 rounded-2xl"
              style={{
                borderRadius: "25px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              size="large"
            >
              <Space>
                Coordinators
                <IoChevronDown />
              </Space>
            </Button>
          </Dropdown>

          <Button
            type={pathname.includes("sales") ? "primary" : "text"}
            size="large"
            className={`font-BricolageGrotesqueRegular ${
              pathname.includes("sales") ? "sign-up" : ""
            } cursor-pointer font-medium w-32 rounded-2xl`}
            style={{
              borderRadius: "25px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={() => {
              router.push(`/discover/events-created/${params?.id}/sales`);
            }}
          >
            Ticket Sales
          </Button>

          <Dropdown
            menu={{ items: MerchandiseItems, onClick: handleMenuClick }}
            disabled // Disables the dropdown functionality
          >
            <Tooltip title="Coming Soon">
              <Button
                type={pathname.includes("merchandise") ? "primary" : "text"}
                className="font-BricolageGrotesqueRegular cursor-pointer font-medium w-40 rounded-2xl"
                style={{
                  borderRadius: "25px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                size="large"
                disabled // Disables the button
              >
                <Space>
                  Merchandise
                  <IoChevronDown />
                </Space>
              </Button>
            </Tooltip>
          </Dropdown>
        </div>
        {pathname.includes("sales") &&
          getSettlementAccount?.data === undefined && (
            <div className="flex flex-row">
              <Button
                type={"default"}
                size={"large"}
                className={`font-BricolageGrotesqueSemiBold  cursor-pointer font-bold w-48 rounded-2xl place-self-end float-right`}
                style={{
                  borderRadius: "25px",
                  fontFamily: "BricolageGrotesqueRegular",
                  float: "right",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                Add Account Details
              </Button>
            </div>
          )}
      </div>
    );
  };

  const SalesMetrics = (): JSX.Element => {
    const CardMetrics = ({
      title,
      value,
      cardStyle = {},
      titleStyle = {},
      valueStyle = {},
      containerStyle = {},
    }: {
      title: string;
      value: number | string;
      cardStyle?: React.CSSProperties;
      titleStyle?: React.CSSProperties;
      valueStyle?: React.CSSProperties;
      containerStyle?: React.CSSProperties;
    }): JSX.Element => {
      return (
        <Card
          className="rounded-3xl p-0"
          style={{
            borderRadius: "30px",
            padding: "0px",
            boxShadow: "0px 8px 24px 0px #00000014",
            ...cardStyle,
          }}
        >
          <div
            className="flex flex-col mx-auto text-center py-5"
            style={containerStyle}
          >
            <p
              className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_PRY"
              style={titleStyle}
            >
              {title}
            </p>
            <p
              className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_DARK"
              style={valueStyle}
            >
              {value}
            </p>
          </div>
        </Card>
      );
    };

    const cardStyle = {
      width: "full", // Adjust card width
      height: "150px", // Adjust card height
    };

    const titleStyle = {
      fontSize: "20px", // Adjust title text size
    };

    const valueStyle = {
      fontSize: "19px", // Adjust value text size
    };

    const containerStyle = {
      gap: "4px", // Adjust the spacing between title and value (you can customize this)
    };

    const salesRevenue = 250000;

    const formattedRevenue = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalRevenue ?? 0);

    return (
      <div className="grid grid-cols-3 gap-x-6">
        <CardMetrics
          title="Total Tickets Sold"
          value={totalTickets ?? ""}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
        {/* <CardMetrics
          title="Total Space Booked"
          value={10}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        /> */}
        <CardMetrics
          title="Total Net Sales Revenue"
          value={formattedRevenue}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
        <CardMetrics
          title="Next Payout Date"
          value={nextDate || "2024-04-07"}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
      </div>
    );
  };

  const StoreMetrics = (): JSX.Element => {
    const CardMetrics = ({
      title,
      value,
      cardStyle = {},
      titleStyle = {},
      valueStyle = {},
      containerStyle = {},
    }: {
      title: string;
      value: number | string;
      cardStyle?: React.CSSProperties;
      titleStyle?: React.CSSProperties;
      valueStyle?: React.CSSProperties;
      containerStyle?: React.CSSProperties;
    }): JSX.Element => {
      return (
        <Card
          className="rounded-3xl p-0"
          style={{
            borderRadius: "30px",
            padding: "0px",
            boxShadow: "0px 8px 24px 0px #00000014",
            ...cardStyle,
          }}
        >
          <div
            className="flex flex-col mx-auto text-center py-5"
            style={containerStyle}
          >
            <p
              className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_PRY"
              style={titleStyle}
            >
              {title}
            </p>
            <p
              className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_DARK"
              style={valueStyle}
            >
              {value}
            </p>
          </div>
        </Card>
      );
    };

    const cardStyle = { width: "full", height: "150px" };
    const titleStyle = { fontSize: "20px" };
    const valueStyle = { fontSize: "19px" };
    const containerStyle = { gap: "4px" };

    const totalRevenue = 500000; // Example data
    const formattedRevenue = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalRevenue ?? 0);

    return (
      <div className="grid grid-cols-3 gap-4">
        <CardMetrics
          title="Total Inventory Value"
          value={formattedRevenue}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
        <CardMetrics
          title="Products Sold"
          value={120} // Example value
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
        <CardMetrics
          title="Out of Stock"
          value={0}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
      </div>
    );
  };

  const OrderMetrics = (): JSX.Element => {
    const CardMetrics = ({
      title,
      value,
      cardStyle = {},
      titleStyle = {},
      valueStyle = {},
      containerStyle = {},
    }: {
      title: string;
      value: number | string;
      cardStyle?: React.CSSProperties;
      titleStyle?: React.CSSProperties;
      valueStyle?: React.CSSProperties;
      containerStyle?: React.CSSProperties;
    }): JSX.Element => {
      return (
        <Card
          className="rounded-3xl p-0"
          style={{
            borderRadius: "30px",
            padding: "0px",
            boxShadow: "0px 8px 24px 0px #00000014",
            ...cardStyle,
          }}
        >
          <div
            className="flex flex-col mx-auto text-center py-5"
            style={containerStyle}
          >
            <p
              className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_PRY"
              style={titleStyle}
            >
              {title}
            </p>
            <p
              className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_DARK"
              style={valueStyle}
            >
              {value}
            </p>
          </div>
        </Card>
      );
    };

    const cardStyle = { width: "full", height: "150px" };
    const titleStyle = { fontSize: "20px" };
    const valueStyle = { fontSize: "19px" };
    const containerStyle = { gap: "4px" };

    const totalRevenue = 146000; // Example data
    const formattedRevenue = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalRevenue ?? 0);

    return (
      <div className="grid grid-cols-3 gap-4">
        <CardMetrics
          title="Total Sales"
          value={formattedRevenue}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
        <CardMetrics
          title="Total Orders"
          value={120} // Example value
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
        <CardMetrics
          title="Completed Orders"
          value={0}
          cardStyle={cardStyle}
          titleStyle={titleStyle}
          valueStyle={valueStyle}
          containerStyle={containerStyle}
        />
      </div>
    );
  };

  const title = (
    <div className="flex items-center w-full relative space-x-8">
      <div className="flex flex-row items-center space-x-2 cursor-pointer min-w-[130px] md:min-w-[180px]">
        <Image
          src="/icons/back-arrow.svg"
          alt=""
          height={25}
          width={25}
          onClick={() => {
            router.push(`/discover/events-created`);
          }}
          className="hidden md:flex"
        />
        <h1 className="md:text-2xl text-xl w-max">Event Details</h1>
      </div>

      {isLoading && getUserEvent?.isLoading === true ? (
        <Skeleton.Button
          style={{
            height: "40px",
            minWidth: "100%",
            width: "100%",
            maxWidth: "100%",
            borderRadius: "12px",
          }}
          active
        />
      ) : (
        <div className="overflow-x-auto flex flex-row gap-4">
          <div className="flex flex-row gap-6 items-center">
            {isPublished === true && (
              <div className="flex flex-row min-w-[263px] items-center gap-4">
                <ToggleSwitch
                  isActive={isActive}
                  onToggle={(checked: boolean) => {
                    handleSwitchChange(checked);
                    handleToggle("someLabel"); // Replace 'someLabel' with the actual label you want to toggle
                  }}
                  label="Add to discovery page"
                />
                <span className="font-BricolageGrotesqueMedium font-medium text-sm text-OWANBE_DARK min-w-8">
                  {isDiscover ? "Remove from discovery" : "Add to discovery"}
                  <a
                    href="https://ostivities.tawk.help/article/how-to-add-or-remove-events-from-discovery-on-ostivities" // Replace with your actual URL
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "8px" }}
                  >
                    <Tooltip title="Click to learn more">
                      <QuestionCircleOutlined
                        style={{ fontSize: "18px", color: "#858990" }}
                      />
                    </Tooltip>
                  </a>
                </span>
              </div>
            )}
          </div>
          {isPublished === false && (
            <Button
              type="primary"
              size={"middle"}
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-40 rounded-2xl"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                backgroundColor:
                  eventDetails?.total_ticket_sold > 0
                    ? "#cccccc" // Gray for disabled
                    : "#e20000", // Red for active
                color:
                  eventDetails?.total_ticket_sold > 0 ? "#666666" : "white",
              }}
              onClick={handlePublishEvent}
              loading={publishEvent.isPending}
            >
              Publish Event
            </Button>
          )}
          {isPublished === true && (
            <Button
              type="primary"
              size={"middle"}
              className="font-BricolageGrotesqueSemiBold sign-up  cursor-pointer font-bold  w-40 rounded-2xl"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                backgroundColor:
                  eventDetails?.total_ticket_sold > 0
                    ? "#cccccc" // Gray for disabled
                    : "#e20000", // Red for active
                color:
                  eventDetails?.total_ticket_sold > 0 ? "#666666" : "white",
              }}
              onClick={handlePublishEvent}
              loading={publishEvent.isPending}
            >
              Unpublish Event
            </Button>
          )}
          {isPublished === true && (
            <div className="flex flex-row items-center space-x-1">
              <Button
                type="text"
                target="_self"
                className="font-BricolageGrotesqueMedium text-sm text-OWANBE_DARK cursor-pointer"
                onClick={copyToClipBoard}
              >
                <LiaExternalLinkAltSolid
                  color="#E20000"
                  width={14}
                  height={14}
                  className="cursor-pointer text-lg"
                />
                <span className="font-BricolageGrotesqueMedium">
                  Copy Event Link
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <PaymentDetails
        open={isModalOpen}
        data={eventDetails?.user?.id}
        onOk={() => {
          setAccountDetailsAdded(true);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />

      <DashboardLayout
        title={title}
        isLoggedIn
        extraComponents={
          <div
            className={`flex flex-col ${
              pathname.includes("sales") ||
              pathname.includes("order") ||
              pathname.includes("product")
                ? "space-y-8"
                : ""
            }`}
          >
            <ExtraTab />
            {pathname.includes("sales") && <SalesMetrics />}
            {pathname.includes("product") && <StoreMetrics />}
            {pathname.includes("order") && <OrderMetrics />}
          </div>
        }
      >
        <div className="w-full mx-auto flex flex-col space-y-5 py-2">
          <>{children}</>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}
