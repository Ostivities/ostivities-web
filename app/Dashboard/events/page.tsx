import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Details from "@/app/components/forms/events/Details";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Space } from "antd";
import React from "react";

function Events(): JSX.Element {
  return (
    <DashboardLayout title="Events Creation" tab={<></>}>
      <div className="w-5/6 mx-auto flex flex-col space-y-5 py-6">
        <Details />
      </div>
    </DashboardLayout>
  );
}

export default Events;
