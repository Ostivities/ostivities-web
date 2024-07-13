"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Switch } from "antd";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

function EventsDetails({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  console.log(params?.id, "params");

  const ExtraTab = (): JSX.Element => {
    const handleMenuClick: MenuProps["onClick"] = (e) => {
      // message.info("Click on menu item.");
      console.log("click", e);
    };

    const TicktItems: MenuProps["items"] = [
      {
        label: (
          <Link
            href={`/Dashboard/events-created/${params?.id}/tickets`}
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
            href={`/Dashboard/events-created/${params?.id}/tickets/discounts`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Discounts
          </Link>
        ),
        key: "2",
      },
      {
        label: (
          <Link
            href={`/Dashboard/events-created/${params?.id}/tickets/email`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Ticket E-mail
          </Link>
        ),
        key: "3",
      },
    ];

    const GuestItems: MenuProps["items"] = [
      {
        label: (
          <Link
            href={`/Dashboard/events-created/${params?.id}/guestlist`}
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
            href={`/Dashboard/events-created/${params?.id}/guestlist/email`}
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
            href={`/Dashboard/events-created/${params?.id}/guestlist/summary`}
            className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          >
            Check in Summary
          </Link>
        ),
        key: "3",
      },
    ];

    return (
      <div className="flex flex-row items-center space-x-4">
        <Button
          type={pathname.includes("about") ? "primary" : "text"}
          size={"middle"}
          className={`font-BricolageGrotesqueSemiBold ${
            pathname.includes("about") ? "sign-up" : ""
          } cursor-pointer font-bold w-32 rounded-2xl`}
          style={{
            borderRadius: "16px",
            fontFamily: "BricolageGrotesqueMedium",
          }}
          onClick={() => {
            router.push(`/Dashboard/events-created/${params?.id}/about`);
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
            className={`font-BricolageGrotesqueSemiBold cursor-pointer font-bold w-32 rounded-2xl ${
              pathname.includes("tickets") ? "sign-up" : ""
            }`}
            style={{
              borderRadius: "16px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
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
          size={"middle"}
          className={`font-BricolageGrotesqueSemiBold ${
            pathname.includes("event_page_view") ? "sign-up" : ""
          } cursor-pointer font-bold w-32 rounded-2xl`}
          style={{
            borderRadius: "16px",
            fontFamily: "BricolageGrotesqueMedium",
          }}
          onClick={() => {
            router.push(
              `/Dashboard/events-created/${params?.id}/event_page_view`
            );
          }}
        >
          Event Page view
        </Button>

        <Dropdown menu={{ items: GuestItems, onClick: handleMenuClick }}>
          <Button
            type="text"
            className="font-BricolageGrotesqueSemiBold cursor-pointer font-bold w-32 rounded-2xl"
            style={{
              borderRadius: "16px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
          >
            <Space>
              Guest List
              <IoChevronDown />
            </Space>
          </Button>
        </Dropdown>

        <Button
          type={pathname.includes("sales") ? "primary" : "text"}
          size={"middle"}
          className={`font-BricolageGrotesqueSemiBold ${
            pathname.includes("sales") ? "sign-up" : ""
          } cursor-pointer font-bold w-32 rounded-2xl`}
          style={{
            borderRadius: "16px",
            fontFamily: "BricolageGrotesqueMedium",
          }}
          onClick={() => {
            router.push(`/Dashboard/events-created/${params?.id}/sales`);
          }}
        >
          Sales
        </Button>
      </div>
    );
  };

  const title = (
    <div className="flex items-center w-full relative pb-2 space-x-8">
      <div className="flex flex-row items-center space-x-2 cursor-pointer">
        <HiMiniArrowLongLeft
          onClick={() => {
            router.push(`/Dashboard/events-created`);
          }}
        />
        <h1 style={{ fontSize: "24px" }}>Events Details</h1>
      </div>

      <div className="flex flex-row items-center space-x-4">
        <div className="flex flex-row items-center space-x-1">
          <Switch onChange={onChange} className="" size="small" />
          <span className="font-BricolageGrotesqueMedium font-medium text-sm text-OWANBE_DARK">
            Add to discovery page
          </span>
        </div>
        <div>
          <Button
            type="primary"
            size={"middle"}
            className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-32 rounded-2xl"
            style={{
              borderRadius: "16px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
          >
            Publish event
          </Button>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <LiaExternalLinkAltSolid
            color="#E20000"
            width={14}
            height={14}
            className="cursor-pointer text-lg"
          />
          <Link
            href={"/Dashboard"}
            target="_self"
            className="font-BricolageGrotesqueMedium font-medium text-sm text-OWANBE_DARK cursor-pointer"
          >
            Copy Link
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout
      title={title}
      isLoggedIn
      extraComponents={
        <>
          <ExtraTab />
        </>
      }
    >
      <div className="w-11/12 mx-auto flex flex-col space-y-5 py-6">
        {children}
      </div>
    </DashboardLayout>
  );
}

export default EventsDetails;
