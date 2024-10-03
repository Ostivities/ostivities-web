"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import EventDetailsComponent from "@/app/components/VenueHubDetails/VenueHubDetails";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space, Switch } from "antd";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Image from 'next/image';


export default function Page(): JSX.Element {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const ExtraTab = (): JSX.Element => {
    const handleMenuClick: MenuProps["onClick"] = (e) => {
      return e;
    };


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
            router.push(`/Dashboard/venue-hub/${params?.id}/about`);
          }}
        >
          About
        </Button>
        

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
              `/Dashboard/venue-hub/${params?.id}/event_page_view`
            );
          }}
        >
          Event Page view
        </Button>

       

      </div>
    );
  };

  const title = (
    <div className="flex items-center w-full relative pb-2 space-x-8">
      <div className="flex flex-row items-center space-x-2 cursor-pointer">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
          onClick={() => {
            router.push(`/Dashboard/venue-hub`);
          }}
        />
        <h1 style={{ fontSize: "24px" }}>Venue Name</h1>
      </div>

      <div className="flex flex-row items-center space-x-4">
        
        <div>
          
        </div>
      </div>
    </div>
  );

  return (
    <EventDetailsComponent>
      <></>
    </EventDetailsComponent>
  );
}
