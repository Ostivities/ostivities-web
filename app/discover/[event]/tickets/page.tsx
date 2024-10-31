"use client";

import { useEffect, useRef, useState, MutableRefObject } from "react";
import { FormInstance } from "antd";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Summary from "@/app/components/Discovery/Summary";
import Image from "next/image";
import { ITicketCreate, ITicketDetails, InfoNeeded } from "@/app/utils/interface";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import { useRouter, useParams } from "next/navigation";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import "@/app/globals.css";
import "@/app/scroll.css";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import { DISCOUNT_TYPE, TICKET_ENTITY } from "@/app/utils/enums";
import { Skeleton } from "antd";
import ContactForm from "@/app/components/ContactForm/ContactForm";

const TicketsSelection = () => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  const [currentPage, setCurrentPage] = useState<"tickets" | "contactform">(
    "tickets"
  );
  const [externalTrigger, setExternalTrigger] = useState<() => void | undefined>();
  const [totalFee, setTotalFee] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data;
  const { getTickets } = useGetEventTickets(eventDetails?.id);
  const ticketData = getTickets?.data?.data?.data;
  // console.log(discountApplied, "discountApplied")
  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => {
          if (currentPage === "tickets") {
            router.back();
          } else if (currentPage === "contactform") {
            setCurrentPage("tickets");
          }
        }}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>
        {currentPage === "tickets"
          ? "Choose your tickets"
          : "Contact Information"}{" "}
      </h1>
    </div>
  );

  const formRef = useRef<FormInstance | null>(null);
  // const formRef = useRef<HTMLFormElement>(null);

  // const handleSubmit = () => {
  //   console.log("its time to submit the form")
  //   if (formRef.current) {
  //     formRef.current.submit(); // This will trigger the onFinish method in ContactForm
  //   }
  // };

  const handleSubmit = () => {
    if (externalTrigger) {
      externalTrigger(); // Trigger the `onFinish` function in ContactForm
    }
  };

  const tiral = () => {
    console.log('here')
  }

  // const ticketEnt = ticketEntity === TICKET_ENTITY.SINGLE ? "Single Ticket" : "Collective Ticket";

  // State to manage selected ticket counts
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: number;
  }>({});

  // console.log(selectedTickets, "selectedTickets");
  const [ticketDetails, setTicketDetails] = useState<
    {
      ticketName: string;
      ticketPrice: number;
      discountedTicketPrice?: number;
      discountToDeduct?: number;
      ticketFee: number;
      ticketDiscountType: string;
      ticketDiscountCode: string;
      ticketDiscountValue: number;
      ticketNumber: number;
      ticketId: string;
      subTotal: number;
      ticketEntity: string;
      groupSize: number;
      additionalInformation: { question: string; is_compulsory: boolean }[];
    }[]
  >([]);

  // console.log(ticketDetails, "ticketDetails");

  useEffect(() => {
    // When ticketData is updated, re-initialize selectedTickets
    if (ticketData?.length) {
      const initialSelectedTickets = ticketData.reduce(
        (acc: { [key: string]: number }, ticket: ITicketDetails) => {
          acc[ticket.id] = 0;
          return acc;
        },
        {}
      );
      setSelectedTickets(initialSelectedTickets);
    }
  }, [ticketData]);

  useEffect(() => {
    // Check if there are any tickets with ticketNumber of 0 and filter them out
    setTicketDetails((prevDetails) =>
      prevDetails.filter((ticket) => ticket.ticketNumber > 0)
    );
  }, [ticketDetails]);

  const handleDiscountApplied = (applied: boolean) => {
    setDiscountApplied(applied === true);
  };

  const handleIncrement = (ticketId: string) => {
    const ticket = ticketData?.find(
      (ticket: ITicketDetails) => ticket?.id === ticketId
    );

    if (ticket) {
      setTicketDetails((prevDetails) => {
        const existingTicketIndex = prevDetails.findIndex(
          (item) => item?.ticketName === ticket?.ticketName
        );

        const updatedDetails = [...prevDetails];
        const discountedPrice = (() => {
          if (ticket?.ticketEntity === TICKET_ENTITY.SINGLE) {
            if (ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE) {
              return (
                ticket?.ticketPrice -
                ((ticket?.discount?.discount_value / 100) * ticket?.ticketPrice)
              );
            } else if (ticket?.discount?.discountType === DISCOUNT_TYPE.FIXED) {
              return ticket.ticketPrice - ticket.discount.discount_value;
            }
            return ticket.ticketPrice; // No discount
          } else if (ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE) {
            if (ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE) {
              return (
                ticket.groupPrice -
                ((ticket.discount.discount_value / 100) * ticket.groupPrice)
              );
            } else if (ticket?.discount?.discountType === DISCOUNT_TYPE.FIXED) {
              return ticket.groupPrice - ticket.discount.discount_value;
            }
            return ticket.groupPrice; // No discount
          }
          return 0; // Default if no conditions are met
        })();
        const realPrice =
          ticket?.ticketEntity === TICKET_ENTITY.SINGLE
            ? ticket?.ticketPrice
            : ticket?.groupPrice || 0;
        const currentFee =
          realPrice < 10000 && realPrice > 0
            ? realPrice * 0.05 + 150
            : realPrice >= 10000 && realPrice < 25000
            ? realPrice * 0.045 + 150 // For ticketrealPrice between 10000 and 24999
            : realPrice >= 25000
            ? realPrice * 0.035 + 150 // For ticketPrice 25000 and above
            : 0;
        if (existingTicketIndex > -1) {
          const existingTicket = updatedDetails[existingTicketIndex];
          const newTicketNumber = existingTicket?.ticketNumber + 1;
          updatedDetails[existingTicketIndex] = {
            ...existingTicket,
            ticketPrice: realPrice * newTicketNumber,
            discountToDeduct: ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE 
            ? (realPrice * (ticket?.discount?.discount_value / 100)) * newTicketNumber : ticket?.discount?.discount_value * newTicketNumber,
            discountedTicketPrice: discountedPrice * newTicketNumber,
            ticketFee: newTicketNumber * currentFee,
            ticketNumber: newTicketNumber,
            subTotal: discountApplied
              ? discountedPrice * newTicketNumber + newTicketNumber * currentFee
              : realPrice * newTicketNumber + newTicketNumber * currentFee,
          };
        } else {
          updatedDetails.push({
            ticketName: ticket?.ticketName,
            ticketPrice: realPrice,
            discountedTicketPrice: discountedPrice,
            discountToDeduct: ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE 
              ? realPrice * (ticket?.discount?.discount_value / 100) : ticket?.discount?.discount_value,
            ticketFee: currentFee,
            ticketNumber: 1,
            ticketDiscountCode: ticket?.discountCode,
            ticketDiscountType: ticket?.discount?.discountType,
            ticketDiscountValue: ticket?.discount?.discount_value,
            subTotal: discountApplied
              ? discountedPrice + currentFee
              : realPrice + currentFee,
            ticketId: ticket?.id,
            ticketEntity: ticket?.ticketEntity,
            groupSize: ticket?.groupSize,
            additionalInformation: ticket?.ticketQuestions?.map(
              (questionDetails: {
                question: string;
                is_compulsory: boolean;
              }) => {
                return {
                  question: questionDetails?.question,
                  is_compulsory: questionDetails?.is_compulsory,
                };
              }
            ),
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
    const ticket = ticketData?.find(
      (ticket: ITicketDetails) => ticket?.id === ticketId
    );

    if (ticket && (selectedTickets[ticketId] ?? 0) > 0) {
      setTicketDetails((prevDetails) => {
        const existingTicketIndex = prevDetails.findIndex(
          (item) => item.ticketName === ticket.ticketName
        );

        const updatedDetails = [...prevDetails];

        if (existingTicketIndex > -1) {
          const existingTicket = updatedDetails[existingTicketIndex];
          const newTicketNumber = existingTicket?.ticketNumber - 1;
          const currentFee =
            ticket?.ticketPrice < 10000 && ticket?.ticketPrice > 0
              ? ticket?.ticketPrice * 0.05 + 150
              : ticket?.ticketPrice >= 10000 && ticket?.ticketPrice < 25000
              ? ticket?.ticketPrice * 0.045 + 150
              : ticket?.ticketPrice >= 25000
              ? ticket?.ticketPrice * 0.035 + 150
              : 0;

          if (newTicketNumber >= 0) {
            const price =
              ticket.ticketEntity === TICKET_ENTITY.SINGLE
                ? ticket.ticketPrice
                : ticket.groupPrice || 0;

            updatedDetails[existingTicketIndex] = {
              ...existingTicket,
              ticketPrice: price * newTicketNumber,
              discountedTicketPrice: discountApplied ? existingTicket?.discountedTicketPrice : undefined,
              discountToDeduct: ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE 
              ? (price * (ticket?.discount?.discount_value / 100)) * newTicketNumber : ticket?.discount?.discount_value * newTicketNumber,
              ticketFee: currentFee * newTicketNumber,
              ticketNumber: newTicketNumber,
              subTotal: (price * newTicketNumber + currentFee * newTicketNumber) - (ticket?.discountToDeduct * newTicketNumber),
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

  //   useEffect(() => {
  //   // Recalculate ticket prices when discountApplied changes
  //   setTicketDetails((prevDetails) =>
  //     prevDetails.map((ticket) => {
  //       const {
  //         ticketPrice,
  //         ticketFee,
  //         ticketDiscountValue,
  //         ticketDiscountType,
  //         discountedTicketPrice,
  //         ticketNumber,
  //       } = ticket;
  //       const realPrice = ticketPrice;
  //       const priceWithDiscount =
  //         ticketDiscountType === DISCOUNT_TYPE.PERCENTAGE
  //           ? realPrice - ((ticketDiscountValue / 100) * realPrice)
  //           : ticketDiscountType === DISCOUNT_TYPE.FIXED
  //           ? realPrice - ticketDiscountValue
  //           : realPrice;

  //       const price = discountApplied === true ? priceWithDiscount : realPrice;

  //       return {
  //         ...ticket,
  //         ticketPrice: price * ticketNumber,
  //         ticketFee: ticketFee,
  //         subTotal: price * ticketNumber + ticketFee * ticketNumber,
  //       };
  //     })
  //   );
  // }, [discountApplied]);

  const isPending: boolean = getTickets?.isLoading;

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex gap-12">
        {currentPage === "tickets" ? (
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
              {isPending ? (
                <>
                  {Array(2)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton.Button
                        key={index}
                        active
                        shape="round"
                        style={{
                          height: 160,
                          width: 600,
                          margin: "6px",
                          maxWidth: "100%",
                        }}
                      />
                    ))}
                </>
              ) : (
                <div>
                  {ticketData?.some(
                    (ticket: ITicketDetails) =>
                      ticket?.ticketEntity === TICKET_ENTITY.SINGLE
                  ) && (
                    <button
                      className="bg-OWANBE_PRY text-white px-3 py-1 mb-6 rounded-md text-sm font-BricolageGrotesqueMedium"
                      style={{ borderRadius: "20px", fontSize: "12px" }}
                    >
                      Single Ticket
                    </button>
                  )}
                  {ticketData
                    ?.filter(
                      (ticket: ITicketDetails) =>
                        ticket?.ticketEntity === TICKET_ENTITY.SINGLE
                    )
                    .map((ticket: ITicketDetails, index: any) => (
                      <div
                        key={index}
                        className="card-shadow flex justify-between items-start mb-6"
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
                                {ticket?.ticketPrice < 10000 && (
                                  <>
                                    <span
                                      className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {(
                                        ticket?.ticketPrice * 0.05 +
                                        150 +
                                        ticket?.ticketPrice
                                      )
                                        .toFixed(0)
                                        .toLocaleString()}
                                    </span>{" "}
                                    <span
                                      className="text-s font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 400,
                                        fontSize: "12px",
                                      }}
                                    >
                                      Including ₦
                                      {(ticket?.ticketPrice * 0.05 + 150)
                                        .toFixed(0)
                                        .toLocaleString()}{" "}
                                      fee
                                    </span>
                                  </>
                                )}
                                {ticket?.ticketPrice >= 10000 &&
                                  ticket?.ticketPrice < 25000 && (
                                    <>
                                      <span
                                        className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                                        style={{
                                          fontWeight: 600,
                                          fontSize: "17px",
                                        }}
                                      >
                                        ₦
                                        {(
                                          ticket?.ticketPrice * 0.045 +
                                          150 +
                                          ticket?.ticketPrice
                                        )
                                          .toFixed(0)
                                          .toLocaleString()}
                                      </span>{" "}
                                      <span
                                        className="text-s font-BricolageGrotesqueRegular"
                                        style={{
                                          fontWeight: 400,
                                          fontSize: "12px",
                                        }}
                                      >
                                        Including ₦
                                        {(ticket?.ticketPrice * 0.045 + 150)
                                          .toFixed(0)
                                          .toLocaleString()}{" "}
                                        fee
                                      </span>
                                    </>
                                  )}
                                {ticket?.ticketPrice >= 25000 && (
                                  <>
                                    <span
                                      className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {(
                                        ticket?.ticketPrice * 0.035 +
                                        150 +
                                        ticket?.ticketPrice
                                      )
                                        .toFixed(0)
                                        .toLocaleString()}
                                    </span>{" "}
                                    <span
                                      className="text-s font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 400,
                                        fontSize: "12px",
                                      }}
                                    >
                                      Including ₦
                                      {(ticket?.ticketPrice * 0.035 + 150)
                                        .toFixed(0)
                                        .toLocaleString()}{" "}
                                      fee
                                    </span>
                                  </>
                                )}
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
                            disabled={
                              selectedTickets[ticket?.id] ===
                              ticket?.purchaseLimit
                            }
                            style={{
                              color:
                                selectedTickets[ticket?.id] ===
                                ticket?.purchaseLimit
                                  ? "white"
                                  : "#e20000",
                              backgroundColor:
                                selectedTickets[ticket?.id] ===
                                ticket?.purchaseLimit
                                  ? "#cccccc"
                                  : "#FADEDE",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Collective Ticket Section */}
            <div className="mb-4">
              {isPending ? (
                <>
                  {Array(1)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton.Button
                        key={index}
                        active
                        shape="round"
                        style={{
                          height: 160,
                          width: 600,
                          margin: "6px",
                          maxWidth: "100%",
                        }}
                      />
                    ))}
                </>
              ) : (
                <div>
                  {ticketData?.some(
                    (ticket: ITicketDetails) =>
                      ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                  ) && (
                    <button
                      className="bg-OWANBE_PRY text-white px-3 py-1 mb-6 rounded-md text-sm font-BricolageGrotesqueMedium"
                      style={{ borderRadius: "20px", fontSize: "12px" }}
                    >
                      Collective Ticket
                    </button>
                  )}

                  {ticketData
                    ?.filter(
                      (ticket: ITicketDetails) =>
                        ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                    )
                    .map((ticket: ITicketDetails, index: any) => (
                      <div
                        key={index}
                        className="card-shadow flex justify-between items-start mb-6"
                      >
                        <div>
                          <h2
                            className="text-lg font-BricolageGrotesqueMedium"
                            style={{ fontWeight: 500, fontSize: "18px" }}
                          >
                            Group Of {ticket?.groupSize} - {ticket.ticketName}
                          </h2>
                          <h3>
                            {ticket?.groupPrice ? (
                              <>
                                {ticket?.groupPrice < 10000 && (
                                  <>
                                    <span
                                      className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {(
                                        ticket?.groupPrice * 0.05 +
                                        150 +
                                        ticket?.groupPrice
                                      ).toLocaleString()}
                                    </span>{" "}
                                    <span
                                      className="text-s font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 400,
                                        fontSize: "12px",
                                      }}
                                    >
                                      Including ₦
                                      {(
                                        ticket?.groupPrice * 0.05 +
                                        150
                                      ).toLocaleString()}{" "}
                                      fee
                                    </span>
                                  </>
                                )}
                                {ticket?.groupPrice >= 10000 &&
                                  ticket?.groupPrice < 25000 && (
                                    <>
                                      <span
                                        className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                                        style={{
                                          fontWeight: 600,
                                          fontSize: "17px",
                                        }}
                                      >
                                        ₦
                                        {(
                                          ticket?.groupPrice * 0.045 +
                                          150 +
                                          ticket?.groupPrice
                                        ).toLocaleString()}
                                      </span>{" "}
                                      <span
                                        className="text-s font-BricolageGrotesqueRegular"
                                        style={{
                                          fontWeight: 400,
                                          fontSize: "12px",
                                        }}
                                      >
                                        Including ₦
                                        {(
                                          ticket?.groupPrice * 0.045 +
                                          150
                                        ).toLocaleString()}{" "}
                                        fee
                                      </span>
                                    </>
                                  )}
                                {ticket?.groupPrice >= 25000 && (
                                  <>
                                    <span
                                      className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {(
                                        ticket?.groupPrice * 0.035 +
                                        150 +
                                        ticket?.groupPrice
                                      ).toLocaleString()}
                                    </span>{" "}
                                    <span
                                      className="text-s font-BricolageGrotesqueRegular"
                                      style={{
                                        fontWeight: 400,
                                        fontSize: "12px",
                                      }}
                                    >
                                      Including ₦
                                      {(
                                        ticket?.groupPrice * 0.035 +
                                        150
                                      ).toLocaleString()}{" "}
                                      fee
                                    </span>
                                  </>
                                )}
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
                            disabled={selectedTickets[ticket?.id] === 1}
                            style={{
                              color:
                                selectedTickets[ticket?.id] === 1
                                  ? "white"
                                  : "#e20000",
                              backgroundColor:
                                selectedTickets[ticket?.id] === 1
                                  ? "#cccccc"
                                  : "#FADEDE",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        ) : (
          <ContactForm 
          ticketDetails={ticketDetails}
           onSubmit={handleSubmit}
           onExternalFinishTrigger={(trigger) => setExternalTrigger(() => trigger)} 
          />
        )}
        {/* Summary Section with Correct Props */}
        <Summary
          onDiscountApplied={handleDiscountApplied}
          eventId={eventDetails?.id}
          eventName={eventDetails?.eventName}
          onClick={
            currentPage === "tickets"
              ? () => setCurrentPage("contactform")
              : currentPage === "contactform"
              ? () => handleSubmit() : undefined
          }
          ticketDetails={ticketDetails}
          continueBtn
        />
      </section>
    </DashboardLayout>
  );
};

export default TicketsSelection;
