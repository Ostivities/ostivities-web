import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Form, Space } from "antd";
import React from "react";

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

        <Form className="grid grid-cols-2">
          <div></div>
        </Form>
      </div>
    </DashboardLayout>
  );
}

export default Events;
