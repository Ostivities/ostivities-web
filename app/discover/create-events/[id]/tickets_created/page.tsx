"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import useFetch from "@/app/components/forms/create-events/auth";
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
  // const { isLoggedIn } = useFetch();

  // if(!isLoggedIn) {
  //   return <></>;
  // }
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
    "ticket_created",
  ]);

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: "24px" }}>Create Event</h1>
      <div className="flex space-x-4"></div>
    </div>
  );

  const [hasTickets, setHasTickets] = useState(false); // Track if there are any tickets

  // This function will receive the ticket data count from the EventTicketTable
  const handleTicketDataCount = (ticketCount: number) => {
    setHasTickets(ticketCount > 0);
  };

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
          <div className="hidden md:flex">
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueSemiBold button-style sign-in cursor-pointer font-bold float-end place-self-end"
              style={{ width: "150px" }}
              onClick={() => {
                setCookie("stage_one", "process");
                setCookie("stage_two", "process");
                setCookie("stage_three", "wait");
                setCookie("ticket_created", "yes");
                router.push(
                  `/discover/create-events/${params?.id}/event_appearance`
                );
              }}
            >
              Back
            </Button>
          </div>
        </Flex>
        <div className="w-full mx-auto flex flex-col space-y-5 py-6">
          <br />
          <br />
          <EventTicketTable onTicketDataCount={handleTicketDataCount} /> <br />
          <br />
          <Space className="flex flex-row justify-center space-x-4 mt-8">
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueSemiBold  continue cursor-pointer font-bold equal-width-button"
              onClick={() => {
                router.push(
                  `/discover/create-events/${params?.id}/incomplete-publish-event`
                );
              }}
              disabled={hasTickets}
              style={{
                backgroundColor: hasTickets ? "#cccccc" : "#e20000",
                color: hasTickets ? "#666666" : "white",
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
                removeCookie("ticket_created");
                router.push(
                  `/discover/create-events/${params?.id}/publish-events`
                );
              }}
              style={{
                backgroundColor: !hasTickets ? "#cccccc !important" : "#e20000",
                color: !hasTickets ? "#666666 !important" : "white",
              }}
              disabled={!hasTickets}
              // title="This button is disabled until the user creates a ticket"
              title={!hasTickets ? "Please create a ticket" : ""}
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
