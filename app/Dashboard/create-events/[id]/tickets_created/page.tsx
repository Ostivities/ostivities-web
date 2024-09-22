"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import AddTicketModal from "@/app/components/OstivitiesModal/AddTicket";
import Steppers from "@/app/components/Steppper/Steppers";
import EventTicketTable from "@/app/components/Tables/EventTicket";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import Ticket from "@/public/Ticket.svg";
import { Button, Flex, Space } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function CreateTicketPage(): JSX.Element {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
  ]);

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: "24px" }}>Create Event</h1>
      <div className="flex space-x-4"></div>
    </div>
  );
  return (
    <>
      <AddTicketModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
      <DashboardLayout title={title} steppers={<Steppers />} isLoggedIn>
        <Flex
          align="flex-start"
          justify="space-between"
          style={{ width: "100%" }}
        >
          <div className="flex flex-row justify-between">
            <Space direction="vertical">
              <Heading5 className="" content={"Event Ticket"} />
              <Paragraph
                className="text-OWANBE_PRY text-md font-normal font-BricolageGrotesqueMedium"
                content={
                  "For free events, Ostivities is free. For paid events, we charge a percentage-based transaction fee on ticket sales."
                }
                styles={{ fontWeight: "normal !important" }}
              />
            </Space>
          </div>
        </Flex>
        <div className="w-full mx-auto flex flex-col space-y-5 py-6">
          <EventTicketTable />
          <Space className="flex flex-row justify-center space-x-4 mt-8">
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueSemiBold  continue cursor-pointer font-bold equal-width-button"
              onClick={() => {
                // router.push("/publish-events");
              }}
            >
              Skip & do this later
            </Button>
            <Button
              type="primary"
              htmlType="button"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              onClick={() => {
                // router.push("/publish-events");
              }}
            >
              Save & continue
            </Button>
          </Space>
        </div>

        <br />
      </DashboardLayout>
    </>
  );
}

export default CreateTicketPage;
