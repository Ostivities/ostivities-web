"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Details from "@/app/components/forms/events/Details";
import Themes from "@/app/components/forms/events/Themes";
import Tickets from "@/app/components/forms/events/Tickets";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Space } from "antd";
import React, { useState } from "react";

function Events(): JSX.Element {
  return (
    <DashboardLayout title="Events Creation" tab={<></>}>
      <div className="w-5/6 mx-auto flex flex-col space-y-5 py-6">
        <Space direction="vertical">
          <Heading5 className="" content="Hello, Rose" />
          <Paragraph
            className="text-OWANBE_PRY text-xl font-normal font-BricolageGrotesqueRegular"
            content="Lets get started by creating your event "
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>

        <Details />
      </div>
    </DashboardLayout>
  );
}

export default Events;
