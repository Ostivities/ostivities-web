"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Summary from "@/app/components/Discovery/Summary";
import Image from "next/image";
import { ITicketCreate, ITicketDetails } from "@/app/utils/interface";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import { useRouter, useParams } from "next/navigation";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import "@/app/globals.css";
import "@/app/scroll.css";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import { TICKET_ENTITY } from "@/app/utils/enums";

const TicketsSelection = () => {
  const router = useRouter();
  const params = useParams<{ event: string; }>();
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data;
  const { getTickets } = useGetEventTickets(eventDetails?.id);
  const ticketData = getTickets?.data?.data?.data;

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
      <h1 style={{ fontSize: "24px" }}>Choose your tickets</h1>
    </div>
  );

  // State to manage selected ticket counts
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});

  console.log(selectedTickets, "selectedTickets");
  const [ticketDetails, setTicketDetails] = useState<
    {
      ticketName: string;
      ticketPrice: number;
      ticketFee: number;
      ticketNumber: number;
      subTotal: number;
    }[]
  >([]);

  console.log(ticketDetails, "ticketDetails");

  useEffect(() => {
    // When ticketData is updated, re-initialize selectedTickets
    if (ticketData?.length) {
      const initialSelectedTickets = ticketData.reduce((acc: { [key: string]: number }, ticket: ITicketDetails) => {
        acc[ticket.id] = 0;
        return acc;
      }, {});
      setSelectedTickets(initialSelectedTickets);
    }
  }, [ticketData]);

  useEffect(() => {
    // Check if there are any tickets with ticketNumber of 0 and filter them out
    setTicketDetails((prevDetails) => prevDetails.filter((ticket) => ticket.ticketNumber > 0));
  }, [ticketDetails]); 

const handleIncrement = (ticketId: string) => {
  const ticket = ticketData?.find((ticket: ITicketDetails) => ticket.id === ticketId);

  if (ticket) {
    setTicketDetails((prevDetails) => {
      const existingTicketIndex = prevDetails.findIndex(
        (item) => item.ticketName === ticket.ticketName
      );

      const updatedDetails = [...prevDetails];

      if (existingTicketIndex > -1) {
        const existingTicket = updatedDetails[existingTicketIndex];
        const newTicketNumber = existingTicket.ticketNumber + 1;
        const price = ticket.ticketEntity === TICKET_ENTITY.SINGLE
          ? ticket.ticketPrice
          : ticket.groupPrice || 0;

        updatedDetails[existingTicketIndex] = {
          ...existingTicket,
          ticketPrice: price * newTicketNumber,
          ticketNumber: newTicketNumber,
          subTotal: (price * newTicketNumber) + ticket.ticketPrice,
        };
      } else {
        const price = ticket.ticketEntity === TICKET_ENTITY.SINGLE
          ? ticket.ticketPrice
          : ticket.groupPrice || 0;

        updatedDetails.push({
          ticketName: ticket.ticketName,
          ticketPrice: price,
          ticketFee: ticket.ticketPrice || 0,
          ticketNumber: 1,
          subTotal: price + (ticket.ticketPrice || 0),
        });
      }

      return updatedDetails;
    });

    // Update the selected tickets count by ticket ID
    setSelectedTickets((prevTickets) => ({
      ...prevTickets,
      [ticketId]: (prevTickets[ticketId] || 0) + 1,
    }));
  }
};

// Function to handle ticket decrement
const handleDecrement = (ticketId: string) => {
  const ticket = ticketData?.find((ticket: ITicketDetails) => ticket.id === ticketId);

  if (ticket && (selectedTickets[ticketId] ?? 0) > 0) {
    setTicketDetails((prevDetails) => {
      const existingTicketIndex = prevDetails.findIndex(
        (item) => item.ticketName === ticket.ticketName
      );

      const updatedDetails = [...prevDetails];

      if (existingTicketIndex > -1) {
        const existingTicket = updatedDetails[existingTicketIndex];
        const newTicketNumber = existingTicket.ticketNumber - 1;

        if (newTicketNumber >= 0) {
          const price = ticket.ticketEntity === TICKET_ENTITY.SINGLE
            ? ticket.ticketPrice
            : ticket.groupPrice || 0;

          updatedDetails[existingTicketIndex] = {
            ...existingTicket,
            ticketPrice: price * newTicketNumber,
            ticketNumber: newTicketNumber,
            subTotal: (price * newTicketNumber) + ticket.ticketPrice,
          };
        }
      }

      return updatedDetails;
    });

    // Update the selected tickets count by ticket ID
    setSelectedTickets((prevTickets) => ({
      ...prevTickets,
      [ticketId]: Math.max((prevTickets[ticketId] ?? 0) - 1, 0),
    }));
  }
};


  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex gap-12">
        <section className="flex-1 pr-1 pl-3 pb-4 scrollable-content shadow-none">
          <div className="flex-center justify-between">
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  height={25}
                  width={25}
                />
              </div>
              <div>
                <h3 className="text-sm" style={{ fontWeight: 600 }}>
                  Date
                </h3>
                <span>{dateFormat(eventDetails?.startDate)}</span>
              </div>
            </div>
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image src="/icons/time.svg" alt="" height={25} width={25} />
              </div>
              <div>
                <h3 className="text-sm" style={{ fontWeight: 600 }}>
                  Time
                </h3>
                <span>
                  {timeFormat(eventDetails?.startDate)} -{" "}
                  {timeFormat(eventDetails?.endDate)} {eventDetails?.timeZone}
                </span>
              </div>
            </div>
          </div>

          <div className="pr-full mt-16">
            <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueMedium my-8 custom-font-size">
              Choose one or more tickets and prepare for an extraordinary
              experience!
            </h3>
          </div>

          {/* Single Ticket Section */}
          <div className="mb-4">
            <button
              className="bg-OWANBE_PRY text-white px-3 py-1 rounded-md text-sm font-BricolageGrotesqueMedium"
              style={{ borderRadius: "20px", fontSize: "12px" }}
            >
              Single Ticket
            </button>
            <div>
              {ticketData
                ?.filter(
                  (ticket: ITicketDetails) =>
                    ticket?.ticketEntity === TICKET_ENTITY.SINGLE
                )
                .map((ticket: ITicketDetails, index: any) => (
                  <div
                    key={index}
                    className="card-shadow flex justify-between items-start"
                  >
                    <div>
                      <h2
                        className="text-lg font-BricolageGrotesqueMedium"
                        style={{ fontWeight: 500, fontSize: "18px" }}
                      >
                        {ticket?.ticketName}
                      </h2>
                      <h3>
                        {ticket?.ticketPrice ? (
                          <>
                            <span
                              className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                              style={{ fontWeight: 600, fontSize: "17px" }}
                            >
                              ₦{ticket.ticketPrice.toLocaleString()}
                            </span>{" "}
                            <span
                              className="text-s font-BricolageGrotesqueRegular"
                              style={{ fontWeight: 400, fontSize: "12px" }}
                            >
                              Including ₦{ticket.ticketPrice.toLocaleString()}{" "}
                              fee
                            </span>
                          </>
                        ) : (
                          <span
                            className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                            style={{ fontWeight: 600, fontSize: "17px" }}
                          >
                            Free
                          </span>
                        )}
                      </h3>
                      <p
                        className="text-s font-BricolageGrotesqueRegular"
                        style={{
                          fontSize: "13px",
                          color: "black",
                          marginTop: "17px",
                        }}
                      >
                        <ReadMoreHTML
                          htmlContent={ticket.ticketDescription || ""}
                          maxLength={100}
                        />
                      </p>
                    </div>
                    <div
                      className="flex items-start gap-2"
                      style={{ marginBlockStart: "10px" }}
                    >
                      <button
                        className="w-8 h-8 flex-center justify-center bg-gray-200 rounded-full text-lg font-bold"
                        onClick={() => handleDecrement(ticket?.id)}
                        disabled={selectedTickets[ticket?.id] === 0}
                        style={{ backgroundColor: "#FADEDE" }}
                      >
                        -
                      </button>
                      <span className="text-lg mx-2">
                        {selectedTickets[ticket?.id] || 0}
                      </span>
                      <button
                        className="w-8 h-8 flex-center justify-center rounded-full text-lg font-bold"
                        onClick={() => handleIncrement(ticket?.id)}
                        style={{ color: "#e20000", backgroundColor: "#FADEDE" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Collective Ticket Section */}
          <div className="mb-4">
            <button
              className="bg-OWANBE_PRY text-white px-3 py-1 rounded-md text-sm font-BricolageGrotesqueMedium"
              style={{ borderRadius: "20px", fontSize: "12px" }}
            >
              Collective Ticket
            </button>
            <div>
              {ticketData
                ?.filter(
                  (ticket: ITicketDetails) =>
                    ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                )
                .map((ticket: ITicketDetails, index: any) => (
                  <div
                    key={index}
                    className="card-shadow flex justify-between items-start"
                  >
                    <div>
                      <h2
                        className="text-lg font-BricolageGrotesqueMedium"
                        style={{ fontWeight: 500, fontSize: "18px" }}
                      >
                        {ticket?.ticketName}
                      </h2>
                      <h3>
                        <span
                          className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                          style={{ fontWeight: 600, fontSize: "17px" }}
                        >
                          ₦{(ticket?.ticketPrice ?? 0).toLocaleString()}
                        </span>{" "}
                        <span
                          className="text-s font-BricolageGrotesqueRegular"
                          style={{ fontWeight: 400, fontSize: "12px" }}
                        >
                          Including ₦
                          {(ticket?.ticketPrice ?? 0).toLocaleString()} fee
                        </span>
                      </h3>
                      <p
                        className="text-s font-BricolageGrotesqueRegular"
                        style={{
                          fontSize: "13px",
                          color: "black",
                          marginTop: "17px",
                        }}
                      >
                        <ReadMoreHTML
                          htmlContent={ticket?.ticketDescription || ""}
                          maxLength={100}
                        />
                      </p>
                    </div>
                    <div
                      className="flex items-start gap-2"
                      style={{ marginBlockStart: "10px" }}
                    >
                      <button
                        className="w-8 h-8 flex-center justify-center bg-gray-200 rounded-full text-lg font-bold"
                        onClick={() => handleDecrement(ticket?.id)}
                        disabled={selectedTickets[ticket?.id] === 0}
                        style={{ backgroundColor: "#FADEDE" }}
                      >
                        -
                      </button>
                      <span className="text-lg mx-2">
                        {selectedTickets[ticket?.id] || 0}
                      </span>
                      <button
                        className="w-8 h-8 flex-center justify-center rounded-full text-lg font-bold"
                        onClick={() => handleIncrement(ticket?.id)}
                        style={{ color: "#e20000", backgroundColor: "#FADEDE" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Summary Section with Correct Props */}
        <Summary
          eventName={eventDetails?.eventName}
          ticketDetails={ticketDetails}
          continueBtn
          to={`/discover/${params?.event}/contact-form`}
        />
      </section>
    </DashboardLayout>
  );
};

export default TicketsSelection;
