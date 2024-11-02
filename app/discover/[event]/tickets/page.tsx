"use client";

import { useEffect, useRef, useState, MutableRefObject } from "react";
import { Col, Form, FormInstance, Input, Row, Select, Checkbox } from "antd";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Summary from "@/app/components/Discovery/Summary";
import Image from "next/image";
import {
  ITicketCreate,
  ITicketDetails,
  InfoNeeded,
} from "@/app/utils/interface";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import { useRouter, useParams } from "next/navigation";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import "@/app/globals.css";
import "@/app/scroll.css";
import ReadMoreHTML from "@/app/components/ReadMoreHTML";
import {
  DISCOUNT_TYPE,
  PAYMENT_METHODS,
  TICKET_ENTITY,
} from "@/app/utils/enums";
import { Skeleton } from "antd";
import { useTimer } from "@/app/hooks/countdown";
import { useRegisterGuest } from "@/app/hooks/guest/guest.hook";

import TimerModal from "@/app/components/OstivitiesModal/TimerModal";
import ContactForm from "@/app/components/ContactForm/ContactForm";

const TicketsSelection = () => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const { registerGuest } = useRegisterGuest();
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  const [currentPage, setCurrentPage] = useState<
    "tickets" | "contactform" | "payment"
  >("tickets");
  const [externalTrigger, setExternalTrigger] =
    useState<() => void | undefined>();
    const [discountApplied, setDiscountApplied] = useState(false);
    const eventDetails = getUserEventByUniqueKey?.data?.data?.data;
    const { getTickets } = useGetEventTickets(eventDetails?.id);
    const ticketData = getTickets?.data?.data?.data;
  // console.log(eventDetails?.eventName, "eventName")
  // console.log(eventDetails?.id, "eventID")
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
          } else if (currentPage === "payment") {
            setCurrentPage("contactform");
          }
        }}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>
        {currentPage === "tickets"
          ? "Choose your tickets"
          : currentPage === "contactform" 
          ? "Contact Information" : "Payment Options"}{" "}
      </h1>
    </div>
  );

  let ticketCounter = 0;

  const tiral = () => {
    console.log("here");
  };

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
      eventName?: string;
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
    // Create a new filtered list only if necessary
    const filteredDetails = ticketDetails?.filter(
      (ticket) => ticket.ticketNumber > 0
    );
    // Check if there's a change before setting state
    if (filteredDetails?.length !== ticketDetails?.length) {
      setTicketDetails(filteredDetails);
    }
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
                (ticket?.discount?.discount_value / 100) * ticket?.ticketPrice
              );
            } else if (ticket?.discount?.discountType === DISCOUNT_TYPE.FIXED) {
              return ticket.ticketPrice - ticket.discount.discount_value;
            }
            return ticket.ticketPrice; // No discount
          } else if (ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE) {
            if (ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE) {
              return (
                ticket.groupPrice -
                (ticket.discount.discount_value / 100) * ticket.groupPrice
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
            discountToDeduct:
              ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE
                ? realPrice *
                  (ticket?.discount?.discount_value / 100) *
                  newTicketNumber
                : ticket?.discount?.discount_value * newTicketNumber,
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
            discountToDeduct:
              ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE
                ? realPrice * (ticket?.discount?.discount_value / 100)
                : ticket?.discount?.discount_value,
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
              discountedTicketPrice: discountApplied
                ? existingTicket?.discountedTicketPrice
                : undefined,
              discountToDeduct:
                ticket?.discount?.discountType === DISCOUNT_TYPE.PERCENTAGE
                  ? price *
                    (ticket?.discount?.discount_value / 100) *
                    newTicketNumber
                  : ticket?.discount?.discount_value * newTicketNumber,
              ticketFee: currentFee * newTicketNumber,
              ticketNumber: newTicketNumber,
              subTotal:
                price * newTicketNumber +
                currentFee * newTicketNumber -
                ticket?.discountToDeduct * newTicketNumber,
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

  const [form] = Form.useForm();
  // ! contactform
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; question: string; answer: string }[]
  >([]);
  const [allInfo, setAllInfo] = useState<{
    personal_information: {
      firstName: string;
      lastName: string;
      email: string;
      confirmEmail: string;
      phoneNumber: string;
    };
    additional_information: {
      id: number;
      question: string;
      answer: string;
    }[];
    attendees_information: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      confirmEmail: string;
    }[];
    event: string;
    event_unique_code: string;
    fees: number;
    total_amount_paid: number;
    disocuntCode?: string;
    total_purchased: number;
    payment_method?: PAYMENT_METHODS;
  }>({
    personal_information: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      phoneNumber: "",
    },
    additional_information: [],
    attendees_information: [],
    event: "",
    event_unique_code: params?.event,
    fees: ticketDetails
      ?.map((ticket) => ticket?.ticketFee)
      .reduce((acc, curr) => acc + curr, 0),
    total_amount_paid: 0,
    disocuntCode: "",
    total_purchased: 0,
  });
  const [attendeesInformation, setAttendeesInformation] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      confirmEmail: string;
    }[]
  >([]);
  // console.log(additionalFields, "additionalFields");
  const [modal, setModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // console.log(isFormValid, "isFormValid")
  const validateForm = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };
  const handleInputChange = (
    value: string,
    attendeeId: number,
    field: "firstName" | "lastName" | "attendeeEmail" | "confirmAttendeeEmail"
  ) => {
    setAttendeesInformation((prevInfo) => {
      const updatedInfo = [...prevInfo];

      // Map 'attendeeEmail' and 'confirmAttendeeEmail' to 'email' and 'confirmEmail'
      const stateFieldMap: Record<string, "email" | "confirmEmail"> = {
        attendeeEmail: "email",
        confirmAttendeeEmail: "confirmEmail",
      };

      // Determine the actual field name in the state
      const actualField = stateFieldMap[field] || field;

      // Find index based on attendee ID; if not found, add a new attendee
      let attendeeIndex = updatedInfo.findIndex(
        (attendee) => attendee.id === attendeeId
      );

      if (attendeeIndex === -1) {
        // If attendee doesn't exist, add a new entry with default values
        updatedInfo.push({
          id: attendeeId,
          firstName: "",
          lastName: "",
          email: "",
          confirmEmail: "",
        });
        attendeeIndex = updatedInfo.length - 1;
      }

      // Update the specified field for this attendee
      updatedInfo[attendeeIndex] = {
        ...updatedInfo[attendeeIndex],
        [actualField]: value,
      };

      return updatedInfo;
    });
  };
  useEffect(() => {
    let counter = 0;

    const initialAdditionalFields =
      ticketDetails?.flatMap((ticketDetail) => {
        if (
          ticketDetail?.additionalInformation &&
          ticketDetail?.additionalInformation.length > 0
        ) {
          return ticketDetail.additionalInformation.map((info) => ({
            id: counter++,
            question: info.question,
            answer: "",
          }));
        }
        return [];
      }) || [];

    setAdditionalFields(initialAdditionalFields);
  }, [ticketDetails]);

  useEffect(() => {
    console.log(allInfo, "Updated allInfo");
  }, [allInfo]);

  const [loading, setLoading] = useState(false)
  const onFinish = async(values: any) => {
    console.log(values);
    console.log(ticketDetails, "ticketDetails");
    const {
      firstName,
      lastName,
      email,
      confirmEmail,
      phoneNumber,
      additional_information,
      ...rest
    } = values;

    // Check if additional_information exists and has items
    const additionalFields = additional_information?.length
      ? additional_information.map((field: any) => {
          const { id, ...fieldData } = field;
          return fieldData;
        })
      : [];

    // Check if attendeesInformation exists and has items
    const attendees_information = attendeesInformation?.length
      ? attendeesInformation.map((attendee) => {
          const { id, ...attendeeData } = attendee;
          return attendeeData;
        })
      : [];

    const personal_information = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    const ticket_information = ticketDetails?.map((ticket) => {
      return {
        ticket_id: ticket?.ticketId,
        quantity: ticket?.ticketNumber,
        ticket_name: ticket?.ticketName,
        total_amount: ticket?.subTotal,
      };
    });
    console.log(
      attendees_information,
      personal_information,
      ticket_information
    );

    const updatedInfo = {
      ...allInfo,
      personal_information,
      ticket_information,
      additional_information: additionalFields,
      attendees_information,
      event: eventDetails && eventDetails?.id || ticketData?.event?.id,
      fees: ticketDetails
        ?.map((ticket) => ticket?.ticketFee)
        .reduce((acc, curr) => acc + curr, 0),
      total_amount_paid: ticketDetails
        ?.map((ticket) => ticket?.subTotal)
        .reduce((acc, curr) => acc + curr, 0),
      total_purchased: ticketDetails
        ?.map((ticket) => ticket?.ticketNumber)
        .reduce((acc, curr) => acc + curr, 0),
    };
    setAllInfo((prevInfo: any) => {
      return {
        ...prevInfo,
        personal_information,
        ticket_information,
        additional_information: additionalFields,
        attendees_information,
        event: eventDetails && eventDetails?.id || ticketData?.event?.id,
        fees: ticketDetails
          ?.map((ticket) => ticket?.ticketFee)
          .reduce((acc, curr) => acc + curr, 0),
        total_amount_paid: ticketDetails
          ?.map((ticket) => ticket?.subTotal)
          .reduce((acc, curr) => acc + curr, 0),
        total_purchased: ticketDetails
          ?.map((ticket) => ticket?.ticketNumber)
          .reduce((acc, curr) => acc + curr, 0),
      };
    });
    // return console.log(allInfo, "allInfo")

    if(ticketDetails
      ?.map((ticket) => ticket?.subTotal)
      .reduce((acc, curr) => acc + curr, 0) === 0 ) {
        setLoading(true)
        const response = await registerGuest.mutateAsync({
          ...updatedInfo,
          payment_method: PAYMENT_METHODS.FREE,
          eventId: eventDetails && eventDetails?.id
        });

        if(response.status === 201) {
          setModal(true);
          setLoading(false)
        }
        // setTimeout( async() => {
        // }, 2000)

      } else {
        setCurrentPage("payment");
      }
    // router.push(`discover/${params?.event}/payment`);

  };

  const handleSubmit = () => {
    // if (externalTrigger) {
    //   externalTrigger(); // Trigger the `onFinish` function in ContactForm
    // }
    onFinish(form.getFieldsValue());
  };

  const isPending: boolean = getTickets?.isLoading;

  const { minutes, remainingSeconds, timer } = useTimer();
  useEffect(() => {
    if (minutes === 0 && remainingSeconds === 0) {
      setModal(true);
    }
  }, [minutes, remainingSeconds]);

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex gap-12">
        {currentPage === "tickets" ? (
          <section className="flex-1 pr-1 pl-3 pb-4 scrollable-content overflow-y-auto scroll-smooth h-full">
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
                  <h3
                    className="text-sm"
                    style={{
                      fontWeight: 600,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    Date
                  </h3>
                  <span
                    style={{
                      fontWeight: 300,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    {dateFormat(eventDetails?.startDate)}
                  </span>
                </div>
              </div>
              <div className="flex-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                  <Image src="/icons/time.svg" alt="" height={25} width={25} />
                </div>
                <div>
                  <h3
                    className="text-sm"
                    style={{
                      fontWeight: 600,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    Time
                  </h3>

                  <span
                    style={{
                      fontWeight: 300,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
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
        ) : currentPage === "contactform" ? (
          // <ContactForm
          //  ticketDetails={ticketDetails}
          //  onSubmit={handleSubmit}
          //  onExternalFinishTrigger={(trigger) => setExternalTrigger(() => trigger)}
          // />
          <section className="flex-1 pr-1 pl-3 pb-4 scrollable-content overflow-y-auto scroll-smooth h-full">
            <div className="bg-OWANBE_NOTIFICATION text-s font-BricolageGrotesqueRegular px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem] w-[570px]">
              We have reserved your tickets, please complete checkout within{" "}
              <span className="text-OWANBE_PRY text-s font-BricolageGrotesqueRegular">
                {timer}
              </span>
              minutes to secure your tickets.
            </div>

            {/* <div className="flex-center justify-between">
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image src="/icons/calendar.svg" alt="" height={25} width={25} />
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
          </div> */}
            <div className="pr-full mt-12">
              <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueMedium my-5 custom-font-size">
                Please fill out the form below with your information so we can
                send you your ticket.
              </h3>
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="form-spacing"
                onValuesChange={validateForm}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span>
                          First Name <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please provide your first name",
                        },
                      ]}
                      style={{}}
                      // className=""
                    >
                      <Input placeholder="Enter First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span>
                          Last Name <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please provide your last name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Last Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label={
                    <span>
                      Email Address <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please provide your email" },
                  ]}
                >
                  <Input type="email" placeholder="Enter Email Address" />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      Confirm Email <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="confirmEmail"
                  dependencies={["email"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your email!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("email") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Emails do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input type="email" placeholder="Confirm Email Address" />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      Phone Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your phone number",
                    },
                  ]}
                >
                  <Input
                    addonBefore={
                      <Select defaultValue="234">
                        {Array.from({ length: 1 }, (_, index) => (
                          <Select.Option key={index} value={`23${index + 4}`}>
                            +23{index + 4}
                          </Select.Option>
                        ))}
                      </Select>
                    }
                    placeholder="Enter Phone Number"
                  />
                </Form.Item>
                <br />
                {ticketDetails?.some(
                  (ticket) =>
                    ticket?.additionalInformation &&
                    ticket?.additionalInformation?.length > 0
                ) && (
                  <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-2 custom-font-size">
                    Additional Information
                  </h3>
                )}
                {/* {ticketDetails?.map((ticketDetail, ticketIndex) => {
                return ticketDetail?.additionalInformation?.map(
                  (
                    infoDetails: {
                      question: string | number | ReactNode;
                      is_compulsory: boolean;
                    },
                    infoIndex: Key | null | undefined
                  ) => {
                    return (
                      <Form.Item
                        key={`${ticketIndex}-${infoIndex}`} // Unique key combining ticketIndex and infoIndex
                        label={
                          <span>
                            {infoDetails?.question}{" "}
                            {infoDetails?.is_compulsory ? (
                              <span style={{ color: "red" }}>*</span>
                            ) : null}
                          </span>
                        }
                        name={`additionalField${ticketIndex}-${infoIndex}`} // Unique name to avoid conflicts
                        rules={
                          infoDetails?.is_compulsory
                            ? [
                                {
                                  required: true,
                                  message: "This question is required",
                                },
                              ]
                            : []
                        }
                        validateTrigger={["onChange", "onBlur"]} // Validate on change and blur
                      >
                        <Input type="text" placeholder="Enter your answer" />
                      </Form.Item>
                    );
                  }
                );
              })} */}
                <Form.List name="additional_information">
                  {(fields, { add, remove }) => (
                    <>
                      {additionalFields.map(({ id, question }) => (
                        <div key={id}>
                          <Form.Item
                            name={[id, "question"]}
                            initialValue={question}
                            hidden
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            key={id}
                            label={
                              <span>
                                {question}{" "}
                                <span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            name={[id, "answer"]}
                            rules={[
                              {
                                required: true,
                                message: "Please provide an answer",
                              },
                            ]}
                          >
                            <Input placeholder="Enter your answer" />
                          </Form.Item>
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
                <br />
                {ticketDetails?.map((ticketDetail, ticketIndex) => {
                  return (
                    ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE && (
                      <div key={ticketIndex}>
                        {[...Array(ticketDetail?.groupSize)]?.map(
                          (_, index) => {
                            ticketCounter++; // Increment ticketCounter globally
                            const attendeeId = ticketCounter;

                            return (
                              <div key={index}>
                                <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueBold my-4 custom-font-size mt-4">
                                  Ticket {ticketCounter} - Collective of{" "}
                                  {ticketDetail?.groupSize} -{" "}
                                  {ticketDetail?.ticketName}
                                </h3>
                                <Row gutter={16} className="mb-6">
                                  <Col span={12}>
                                    <Form.Item
                                      name={[attendeeId, "firstName"]}
                                      label={
                                        <span>
                                          Attendee First Name{" "}
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </span>
                                      }
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please provide attendee first name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Enter Attendee First Name"
                                        onChange={(e) =>
                                          handleInputChange(
                                            e.target.value,
                                            attendeeId,
                                            "firstName"
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[attendeeId, "lastName"]}
                                      label={
                                        <span>
                                          Attendee Last Name{" "}
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </span>
                                      }
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please provide attendee last name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Enter Attendee Last Name"
                                        onChange={(e) =>
                                          handleInputChange(
                                            e.target.value,
                                            attendeeId,
                                            "lastName"
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Row gutter={16} className="mb-12">
                                  <Col span={12}>
                                    <Form.Item
                                      name={[attendeeId, "attendeeEmail"]}
                                      label={
                                        <span>
                                          Attendee Email Address{" "}
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </span>
                                      }
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please provide attendee email",
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="email"
                                        placeholder="Enter Attendee Email Address"
                                        onChange={(e) =>
                                          handleInputChange(
                                            e.target.value,
                                            attendeeId,
                                            "attendeeEmail"
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      name={[
                                        attendeeId,
                                        "confirmAttendeeEmail",
                                      ]}
                                      label={
                                        <span>
                                          Confirm Attendee Email{" "}
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </span>
                                      }
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please confirm attendee email",
                                        },
                                        ({ getFieldValue }) => ({
                                          validator(_, value) {
                                            const emailValue = getFieldValue([
                                              attendeeId,
                                              "attendeeEmail",
                                            ]); // Get the value of the email field
                                            if (
                                              !value ||
                                              emailValue === value
                                            ) {
                                              return Promise.resolve();
                                            }
                                            return Promise.reject(
                                              new Error("Emails do not match!")
                                            );
                                          },
                                        }),
                                      ]}
                                    >
                                      <Input
                                        type="email"
                                        placeholder="Confirm Attendee Email Address"
                                        onChange={(e) =>
                                          handleInputChange(
                                            e.target.value,
                                            attendeeId,
                                            "confirmAttendeeEmail"
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )
                  );
                })}{" "}
              </Form>
            </div>
            {modal && <TimerModal />}
          </section>
        ) : (
          <section className="flex-1">
            <div className=" bg-OWANBE_NOTIFICATION text-s font-BricolageGrotesqueRegular px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem]">
              We have reserved your tickets please complete checkout within{" "}
              <span className=" text-OWANBE_PRY text-s font-BricolageGrotesqueRegular">
                {timer}
              </span>
              minutes to secure your tickets.
            </div>
            <div className="pr-full mt-16">
              <div className="flex flex-col gap-8">
                <div className="card-shadow flex justify-between">
                  <div className="flex gap-3 items-start">
                    <div className="pt-1">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div>
                      <h2 className="text-lg font-BricolageGrotesqueRegular text-OWANBE_PRY">
                        Pay with Card
                      </h2>
                      <span className="text-s font-BricolageGrotesqueRegular">
                        Pay with a MasterCard, Visa, Verve Card or directly with
                        your bank.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-shadow flex justify-between">
                  <div className="flex gap-3 items-start">
                    <div className="pt-1">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div>
                      <h2 className="text-lg font-BricolageGrotesqueRegular text-OWANBE_PRY">
                        Pay with Bank Transfer
                      </h2>
                      <span className="text-s font-BricolageGrotesqueRegular">
                        Make payment by transferring to our dedicated account
                        number.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-center gap-2 mt-7 [&>p>a]:text-OWANBE_PRY">
                <div className=""></div>

                <Checkbox>
                  <span
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    I accept the{" "}
                    <a
                      href="/terms-and-condition"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#e20000",
                        textDecoration: "none",
                        fontFamily: "Bricolage Grotesque, sans-serif",
                      }}
                    >
                      Terms and Conditions
                    </a>
                    {", "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#e20000",
                        textDecoration: "none",
                        fontFamily: "Bricolage Grotesque, sans-serif",
                      }}
                    >
                      Privacy Policy
                    </a>
                    {" and "}
                    <a
                      href="/refund-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#e20000",
                        textDecoration: "none",
                        fontFamily: "Bricolage Grotesque, sans-serif",
                      }}
                    >
                      Refund Policy
                    </a>
                    .
                  </span>
                </Checkbox>
              </div>
            </div>
          </section>
        )}
        {/* Summary Section with Correct Props */}
        <Summary
          onDiscountApplied={handleDiscountApplied}
          eventId={eventDetails?.id}
          loading={loading}
          eventName={eventDetails?.eventName}
          allInfo={allInfo}
          onClick={
            currentPage === "tickets"
              ? () => setCurrentPage("contactform")
              : currentPage === "contactform"
              ? () => handleSubmit()
              : undefined
          }
          ticketDetails={ticketDetails}
          continueBtn
        />
      </section>
    </DashboardLayout>
  );
};

export default TicketsSelection;
