"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  MutableRefObject,
  useCallback,
} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Checkbox,
  Radio,
  FormProps,
} from "antd";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Summary from "@/app/components/Discovery/Summary";
import Image from "next/image";
// import { debounce } from "lodash";
import {
  ITicketCreate,
  ITicketDetails,
  InfoNeeded,
} from "@/app/utils/interface";
import {
  useGetEventTickets,
  useGetEventTicketsByUniqueKey,
} from "@/app/hooks/ticket/ticket.hook";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
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
import {
  useGetEventDiscount,
  useGetTicketDiscount,
} from "@/app/hooks/discount/discount.hook";
import TimerModal from "@/app/components/OstivitiesModal/TimerModal";
import PaymentSuccessModal from "@/app/components/OstivitiesModal/PaymentSuccessModal";
import ContactForm from "@/app/components/ContactForm/ContactForm";
import PaymentValidation from "@/app/components/OstivitiesModal/PaymentValidation";
import paystack from "@/public/paystack.png";
import soldout from "@/public/Soldout.svg";
import ToggleSwitch from "@/app/ui/atoms/ToggleSwitch";
import { useCookies } from "react-cookie";

const TicketsSelection = () => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const { registerGuest } = useRegisterGuest();
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Get query params
  const [cookies, setCookie, removeCookie] = useCookies([
    "ticketDetails",
    "selectedTickets",
  ]);
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  const [currentPage, setCurrentPage] = useState<
    "tickets" | "contactform" | "payment"
  >("tickets");
  const [discountCode, setDiscountCode] = useState("");
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data;
  const { getTicketsByUniqueKey } = useGetEventTicketsByUniqueKey(
    eventDetails?.unique_key
  );
  // const { getTickets } = useGetEventTickets(eventDetails?.id);
  const { getEventDiscount } = useGetEventDiscount(eventDetails?.id);
  const ticketData = getTicketsByUniqueKey?.data?.data?.data;
  const discountDetails = getEventDiscount?.data?.data?.data;
  const [isToggled, setIsToggled] = useState(false);
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
          ? "Contact Information"
          : "Payment Options"}{" "}
      </h1>
    </div>
  );

  const generateOrderNumber = (): string => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return randomDigits.toString();
  };

  const order_number = `ORD${generateOrderNumber()}`;
  // State to manage selected ticket counts
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: number;
  }>({});

  console.log(selectedTickets, "selectedTickets");
  const [ticketDetails, setTicketDetails] = useState<
    {
      ticketName: string;
      ticketPrice: number;
      constantTicketPrice: number;
      discountedTicketPrice?: number;
      discountToDeduct?: number;
      ticketFee: number;
      eventName?: string;
      ticketDiscountType: string;
      ticketDiscountCode: string[];
      ticketDiscountValue: number;
      ticketNumber: number;
      ticketId: string;
      subTotal: number;
      ticketStock: string;
      ticketEntity: string;
      guestAsChargeBearer: boolean;
      groupSize: number;
      orderNumber: string;
      additionalInformation: { question: string; is_compulsory: boolean }[];
    }[]
  >([]);

  console.log(ticketDetails, "ticketDetails");

  useEffect(() => {
    if (!cookies?.ticketDetails || ticketDetails?.length > 0) {
      return;
    }
    setTicketDetails(cookies?.ticketDetails);
    setSelectedTickets(cookies?.selectedTickets);
  }, [cookies?.ticketDetails, cookies?.selectedTickets, ticketDetails?.length]);

  // Save state to cookies when ticketDetails or selectedTickets change
  useEffect(() => {
    const nonZeroTickets = ticketDetails?.filter(
      (ticket) => ticket.ticketNumber > 0
    ); // Remove tickets with zero count
    if (ticketDetails.length > 0) {
      // Save non-empty state to cookies
      setCookie("ticketDetails", JSON.stringify(nonZeroTickets), {
        maxAge: 600,
        secure: true,
        sameSite: "strict",
        path: `/discover/${params?.event}/tickets`,
      });
      setCookie("selectedTickets", JSON.stringify(selectedTickets), {
        maxAge: 600,
        secure: true,
        sameSite: "strict",
        path: `/discover/${params?.event}/tickets`,
      });
    } else if (ticketDetails?.length === 0) {
      // Remove cookies if `ticketDetails` is empty
      removeCookie("ticketDetails", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("selectedTickets", {
        path: `/discover/${params?.event}/tickets`,
      });
    }
  }, [ticketDetails, selectedTickets, setCookie, removeCookie, params?.event]);

  useEffect(() => {
    // Cleanup cookies when navigating away from the target path
    if (!pathname.startsWith(`/discover/${params?.event}/tickets`)) {
      removeCookie("ticketDetails", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("selectedTickets", {
        path: `/discover/${params?.event}/tickets`,
      });
    }
  }, [pathname, removeCookie, params?.event]);

  let ticketCounter = 1;

  const renderedTickets = useMemo(() => {
    return ticketDetails?.map((ticketDetail, ticketIndex) => {
      const arrayLength =
        ticketIndex === 0
          ? ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE
            ? ticketDetail?.groupSize - 1
            : ticketDetail?.ticketNumber - 1
          : ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE
          ? ticketDetail?.groupSize
          : ticketDetail?.ticketNumber;

      return (
        <div key={ticketIndex}>
          {Array.from({ length: arrayLength })?.map((_, index) => {
            ticketCounter++; // Increment ticketCounter globally
            const attendeeId = ticketCounter;

            return (
              <div key={index}>
                <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-4 custom-font-size mt-4">
                  Ticket {ticketCounter} -{" "}
                  {ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                    ? `Collective of ${ticketDetail?.groupSize}`
                    : "Single"}{" "}
                  - {ticketDetail?.ticketName}
                </h3>
                <Row gutter={16} className="">
                  <Col span={12}>
                    <Form.Item
                      name={[attendeeId, "firstName"]}
                      label={
                        <span>
                          Attendee First Name{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please provide attendee first name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Attendee First Name"
                        onChange={(e) =>
                          handleInputChange(
                            e.target.value,
                            attendeeId,
                            ticketDetail?.ticketName,
                            ticketDetail?.ticketPrice?.toString(),
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
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please provide attendee last name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Attendee Last Name"
                        onChange={(e) =>
                          handleInputChange(
                            e.target.value,
                            attendeeId,
                            ticketDetail?.ticketName,
                            ticketDetail?.ticketPrice?.toString(),
                            "lastName"
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="">
                  <Col span={12}>
                    <Form.Item
                      name={[attendeeId, "attendeeEmail"]}
                      label={
                        <span>
                          Attendee Email Address{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please provide attendee email",
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
                            ticketDetail?.ticketName,
                            ticketDetail?.ticketPrice?.toString(),
                            "attendeeEmail"
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[attendeeId, "confirmAttendeeEmail"]}
                      label={
                        <span>
                          Confirm Attendee Email{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please confirm attendee email",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const emailValue = getFieldValue([
                              attendeeId,
                              "attendeeEmail",
                            ]); // Get the value of the email field
                            if (!value || emailValue === value) {
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
                            ticketDetail?.ticketName,
                            ticketDetail?.ticketPrice?.toString(),
                            "confirmAttendeeEmail"
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      );
    });
  }, [ticketDetails, ticketCounter]); // Dependencies

  useEffect(() => {
    // When ticketData is updated, re-initialize selectedTickets
    if (
      ticketData?.length &&
      !cookies?.selectedTickets &&
      cookies?.ticketDetails?.length < 1
    ) {
      const initialSelectedTickets = ticketData?.reduce(
        (acc: { [key: string]: number }, ticket: ITicketDetails) => {
          acc[ticket.id] = 0;
          return acc;
        },
        {}
      );
      setSelectedTickets(initialSelectedTickets);
    }
  }, [ticketData, cookies?.selectedTickets, cookies?.ticketDetails]);

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

  const handleDiscountApplied = (code: string) => {
    setDiscountCode(code);
  };

  useEffect(() => {
    const discountCodeUsed = discountDetails?.find(
      (discount: any) =>
        discount?.discountCode?.toLowerCase() === discountCode?.toLowerCase()
    );
    const discountTypeUsed = discountCodeUsed && discountCodeUsed?.discountType; // Use null or a default value if not found
    const discountValueUsed =
      discountCodeUsed && discountCodeUsed?.discount_value; // Use null or a default value if not found
    setTicketDetails((prevDetails) =>
      prevDetails?.map((ticket: any) => {
        if (
          discountCode &&
          ticket?.ticketDiscountCode?.includes(discountCode)
        ) {
          // Calculate the discounted ticket price or any other property you want to update
          const discountValue =
            discountTypeUsed === "PERCENTAGE"
              ? (ticket?.constantTicketPrice * discountValueUsed) / 100
              : discountValueUsed;

          const discountedTicketPrice = ticket?.ticketPrice - discountValue;

          return {
            ...ticket,
            ticketDiscountType: discountTypeUsed,
            ticketDiscountValue: Math.round(discountValueUsed),
            discountedTicketPrice: Math.round(
              Math.max(discountedTicketPrice, 0)
            ), // Ensure price isn't negative
            discountToDeduct: Math.round(discountValue),
            subTotal:
              ticket?.guestAsChargeBearer === true
                ? Math.round(
                    ticket?.ticketPrice - discountValue + ticket?.ticketFee
                  )
                : Math.round(ticket?.ticketPrice - discountValue),
          };
        }
        return {
          ...ticket,
          ticketDiscountType: undefined,
          ticketDiscountValue: undefined,
          discountedTicketPrice: undefined,
          discountToDeduct: undefined,
          subTotal:
            ticket?.guestAsChargeBearer === true
              ? Math.round(ticket?.ticketPrice + ticket?.ticketFee)
              : ticket?.ticketPrice,
        }; // Return ticket unchanged if discountCode doesn't match
      })
    );
  }, [discountCode, discountDetails]);

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
        const realPrice =
          ticket?.ticketEntity === TICKET_ENTITY.SINGLE
            ? ticket?.ticketPrice
            : ticket?.groupPrice || 0;

        // const discountedPrice
        const currentFee =
          ticket?.ticketType === "PAID"
            ? Math.round(realPrice * 0.04 + 100)
            : 0;
        if (existingTicketIndex > -1) {
          const existingTicket = updatedDetails[existingTicketIndex];
          const realDiscount = existingTicket?.discountToDeduct || 0;
          const newTicketNumber = existingTicket?.ticketNumber + 1;
          updatedDetails[existingTicketIndex] = {
            ...existingTicket,
            ticketPrice: realPrice * newTicketNumber,
            ticketFee:
              ticket?.ticketType === "PAID" ? newTicketNumber * currentFee : 0,
            ticketNumber: newTicketNumber,
            subTotal:
              existingTicket?.guestAsChargeBearer === false
                ? discountCode
                  ? realPrice * newTicketNumber - realDiscount
                  : realPrice * newTicketNumber
                : discountCode
                ? realPrice * newTicketNumber +
                  newTicketNumber * currentFee -
                  realDiscount
                : realPrice * newTicketNumber + newTicketNumber * currentFee,
          };
        } else {
          updatedDetails.push({
            ticketName: ticket?.ticketName,
            ticketPrice: realPrice,
            ticketFee: currentFee,
            ticketNumber: 1,
            ticketStock: ticket?.ticketStock,
            ticketDiscountCode: ticket?.discountCode,
            ticketDiscountType: ticket?.discount?.discountType,
            ticketDiscountValue: ticket?.discount?.discount_value,
            subTotal:
              ticket?.guestAsChargeBearer === true
                ? realPrice + currentFee
                : realPrice,
            ticketId: ticket?.id,
            guestAsChargeBearer: ticket?.guestAsChargeBearer,
            constantTicketPrice: ticket?.ticketPrice,
            ticketEntity: ticket?.ticketEntity,
            groupSize: ticket?.groupSize,
            orderNumber: order_number,
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
            ticket?.ticketType === "PAID"
              ? Math.round(ticket?.ticketPrice * 0.04 + 100)
              : 0;
          const existingDiscount = existingTicket?.discountToDeduct;

          if (newTicketNumber >= 0) {
            const price =
              ticket.ticketEntity === TICKET_ENTITY.SINGLE
                ? ticket.ticketPrice
                : ticket.groupPrice || 0;

            updatedDetails[existingTicketIndex] = {
              ...existingTicket,
              ticketPrice: price * newTicketNumber,
              ticketFee: currentFee * newTicketNumber,
              ticketNumber: newTicketNumber,
              subTotal:
                ticket?.guestAsChargeBearer === false
                  ? discountCode
                    ? price * newTicketNumber - (existingDiscount ?? 0)
                    : price * newTicketNumber
                  : discountCode
                  ? price * newTicketNumber +
                    currentFee * newTicketNumber -
                    (existingDiscount ?? 0)
                  : price * newTicketNumber + currentFee * newTicketNumber,
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

  const [form] = Form.useForm();
  // ! contactform
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; question: string; answer: string; is_compulsory: boolean }[]
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
      phoneNumber: string;
      ticket_name: string;
      ticket_price: string;
    }[];
    event: string;
    event_unique_code: string;
    fees: number;
    total_amount_paid: number;
    discountCode?: string;
    discount: number;
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
      .reduce((acc, curr) => acc + (curr ?? 0), 0),
    total_amount_paid: 0,
    discountCode: ticketDetails?.[0]?.ticketDiscountCode?.[0] || "",
    discount:
      ticketDetails
        ?.map((ticket) => ticket?.discountToDeduct ?? 0)
        .reduce((acc, curr) => acc + curr, 0) || 0,
    total_purchased: 0,
  });
  const [attendeesInformation, setAttendeesInformation] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      confirmEmail: string;
      ticket_name: string;
      ticket_price: string;
    }[]
  >([]);
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(attendeesInformation, "attendeesInformation");

  const handleInputChange = (
    value: string,
    attendeeId: number,
    ticket_name: string,
    ticket_price: string,
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
          ticket_name,
          ticket_price,
        });
        attendeeIndex = updatedInfo.length - 1;
      }

      // Update the specified field for this attendee
      updatedInfo[attendeeIndex] = {
        ...updatedInfo[attendeeIndex],
        [actualField]: value,
        ticket_name, // Ensure ticket name is updated
        ticket_price, // Ensure ticket price is updated
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
          return ticketDetail.additionalInformation.map((info: any) => ({
            id: counter++,
            question: info.question,
            is_compulsory: info.is_compulsory,
            answer: "",
          }));
        }
        return [];
      }) || [];

    setAdditionalFields(initialAdditionalFields);
  }, [ticketDetails]);

  useEffect(() => {}, [allInfo]);

  const [loading, setLoading] = useState(false);
  const onFinish: FormProps<any>["onFinish"] = async (values: any) => {
    const validateFields = await form.validateFields();
    if (!validateFields) {
      return;
    }
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
          const { id, confirmEmail, ...attendeeData } = attendee;
          return attendeeData;
        })
      : [];

    const personal_information = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
    };
    const ticket_information = ticketDetails?.map((ticket) => {
      return {
        ticket_id: ticket?.ticketId,
        quantity: ticket?.ticketNumber,
        ticket_name: ticket?.ticketName,
        total_amount: ticket?.subTotal,
        ticket_price: ticket?.ticketPrice === null ? 0 : ticket?.ticketPrice,
        ticket_type: ticket?.ticketEntity,
        ticket_stock: ticket?.ticketStock,
        order_number: ticket?.orderNumber,
      };
    });

    const updatedInfo = {
      ...allInfo,
      personal_information,
      ticket_information,
      discount: ticketDetails
        ?.map((ticket) => ticket?.discountToDeduct)
        .reduce((acc, curr) => (acc ?? 0) + (curr ?? 0), 0),
      discountCode: discountCode,
      additional_information: additionalFields,
      attendees_information,
      event: (eventDetails && eventDetails?.id) || ticketData?.event,
      fees: ticketDetails
        ?.filter((ticket) => ticket?.guestAsChargeBearer === true)
        ?.map((ticket) => ticket?.ticketFee || 0)
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
        discount: ticketDetails?.reduce(
          (acc, ticket) => acc + (ticket?.discountToDeduct ?? 0),
          0
        ),
        discountCode: discountCode,
        ticket_information,
        additional_information: additionalFields,
        attendees_information,
        event: (eventDetails && eventDetails?.id) || ticketData?.event,
        fees: ticketDetails
          ?.filter((ticket) => ticket?.guestAsChargeBearer === true)
          ?.map((ticket) => ticket?.ticketFee || 0)
          .reduce((acc, curr) => acc + curr, 0),
        total_amount_paid: ticketDetails
          ?.map((ticket) => ticket?.subTotal)
          .reduce((acc, curr) => acc + curr, 0),
        total_purchased: ticketDetails
          ?.map((ticket) => ticket?.ticketNumber)
          .reduce((acc, curr) => acc + curr, 0),
      };
    });

    if (
      ticketDetails
        ?.map((ticket) => ticket?.subTotal)
        .reduce((acc, curr) => acc + curr, 0) === 0
    ) {
      setLoading(true);
      const response = await registerGuest.mutateAsync({
        ...updatedInfo,
        payment_method: PAYMENT_METHODS.FREE,
        eventId: eventDetails && eventDetails?.id,
      });

      if (response.status === 200) {
        setSuccessModal(true);
        setLoading(false);
        removeCookie("ticketDetails");
        removeCookie("selectedTickets");
      }
    } else {
      setLoading(false);
      setCurrentPage("payment");
      router.push(`/discover/${params?.event}/tickets?page=payment`);
    }
    // router.push(`discover/${params?.event}/payment`);
  };
  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    return errorInfo;
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    const response = await registerGuest.mutateAsync({
      ...allInfo,
      payment_method: PAYMENT_METHODS.CARD,
      eventId: eventDetails && eventDetails?.id,
    });

    if (response.status === 200) {
      setLoading(false);
      removeCookie("ticketDetails");
      removeCookie("selectedTickets");
      setSuccessModal(true);
    } else {
      setLoading(false);
    }
  };

  const isFieldTouched = useRef(false);

  interface DebounceFunction {
    (...args: any[]): void;
  }

  const debounce = (
    func: (...args: any[]) => void,
    delay: number
  ): DebounceFunction => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const checkFormValidity = useCallback(
    debounce(async () => {
      try {
        await form.validateFields();
        setIsFormValid(true);
      } catch (errorInfo) {
        setIsFormValid(false);
      }
    }, 1000), // Delay in milliseconds
    [form]
  );

  useEffect(() => {
    if (currentPage === "contactform" && isFieldTouched.current) {
      checkFormValidity();
    }
  }, [currentPage, form.getFieldsValue(), checkFormValidity]);

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const pageParam = searchParams.get("page");

    if (isInitialLoad) {
      setIsInitialLoad(false); // Set the flag to false after initial load

      if (pageParam === "payment") {
        // Redirect to `contactform` on reload if on the `payment` page
        router.replace(`${pathname}?page=contactform`);
        setCurrentPage("contactform");
      } else if (pageParam === "contactform" || pageParam === "payment") {
        // Update state based on the query parameter
        setCurrentPage(pageParam);
      } else if (pageParam === null) {
        // Default to `tickets` if no valid page query exists
        setCurrentPage("tickets");
      }
    } else {
      // Handle navigation changes after the initial load
      if (pageParam === "contactform" || pageParam === "payment") {
        setCurrentPage(pageParam);
      } else if (pageParam === null) {
        setCurrentPage("tickets");
      }
    }
  }, [searchParams, pathname, router, isInitialLoad]);

  const handleButtonClick = () => {
    if (currentPage === "tickets") {
      // Check if tickets are selected
      if (ticketDetails?.length > 0) {
        setCurrentPage("contactform"); // Move to contact form page
        router.push(`/discover/${params?.event}/tickets?page=contactform`);
      }
    } else if (currentPage === "contactform") {
      // Check if the form is valid
      if (isFormValid) {
        onFinish(form.getFieldsValue()); // Proceed to payment or next step
      } else return;
    } else if (currentPage === "payment") {
      handleFinalSubmit();
      // setSuccessModal(true);
    }
  };

  const isPending: boolean = getTicketsByUniqueKey?.isLoading;

  const {
    minutes,
    remainingSeconds,
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer();

  useEffect(() => {
    if (currentPage === "contactform" || currentPage === "payment") {
      startTimer();
    } else resetTimer();
  }, [currentPage, resetTimer, startTimer]);
  useEffect(() => {
    if (minutes === 0 && remainingSeconds === 0 && successModal === false) {
      setModal(true);
    } else if (successModal === true) {
      pauseTimer();
    }
  }, [minutes, remainingSeconds, successModal, pauseTimer]);

  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    PAYMENT_METHODS | undefined
  >(undefined);

  const disableConditionOne = ticketDetails?.some(
    (ticket) =>
      ticket?.ticketEntity === TICKET_ENTITY.SINGLE && ticket?.ticketNumber > 1
  );
  const disableConditionTwo = ticketDetails?.some(
    (ticket) =>
      ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE && ticket?.groupSize > 1
  );

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex flex-col md:flex-row gap-6 md:gap-12">
        {currentPage === "tickets" ? (
          <section className="flex-1 pb-4 md:px-5 scrollable-content overflow-y-auto scroll-smooth h-full">
            <div className="flex-center gap-10 sm:gap-10 md:gap-20">
              <div className="flex-center gap-3">
                <div className="min-w-12 min-h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
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
                <div className="min-w-12 min-h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
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
                    {timeFormat(eventDetails?.startDate)}{" "}
                    {eventDetails?.timeZone}
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
                        className={`card-shadow relative ${
                          ticket?.ticket_sold === ticket?.ticketQty
                            ? "bg-[#dedede] cursor-not-allowed"
                            : ""
                        } flex justify-between items-start mb-6`}
                      >
                        {ticket?.ticket_sold === ticket?.ticketQty && (
                          <Image
                            src={soldout}
                            alt="soldout"
                            className="w-24 h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0"
                            style={{
                              zIndex: 10,
                              pointerEvents: "none", // Prevent interaction with the overlay
                            }}
                          />
                        )}
                        <div>
                          <h2
                            className={`${
                              ticket?.ticket_sold === ticket?.ticketQty
                                ? "text-gray-400"
                                : ""
                            } text-lg font-BricolageGrotesqueMedium`}
                            style={{ fontWeight: 500, fontSize: "18px" }}
                          >
                            {ticket?.ticketName}
                          </h2>
                          <h3>
                            {ticket?.ticketPrice ? (
                              <>
                                {ticket?.guestAsChargeBearer === true ? (
                                  <>
                                    <span
                                      className={`${
                                        ticket?.ticket_sold ===
                                        ticket?.ticketQty
                                          ? "text-gray-400"
                                          : "text-OWANBE_PRY"
                                      } text-xl font-BricolageGrotesqueRegular`}
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {Math.round(
                                        ticket?.ticketPrice * 0.04 +
                                          100 +
                                          ticket?.ticketPrice
                                      ).toLocaleString()}
                                    </span>{" "}
                                    <span
                                      className={`${
                                        ticket?.ticket_sold ===
                                        ticket?.ticketQty
                                          ? "text-gray-400"
                                          : ""
                                      } text-s font-BricolageGrotesqueRegular`}
                                      style={{
                                        fontWeight: 400,
                                        fontSize: "12px",
                                      }}
                                    >
                                      Including ₦
                                      {Math.round(
                                        ticket?.ticketPrice * 0.04 + 100
                                      ).toLocaleString()}{" "}
                                      fee
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span
                                      className={`${
                                        ticket?.ticket_sold ===
                                        ticket?.ticketQty
                                          ? "text-gray-400"
                                          : "text-OWANBE_PRY"
                                      } text-xl font-BricolageGrotesqueRegular`}
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {Math.round(
                                        ticket?.ticketPrice
                                      ).toLocaleString()}
                                    </span>{" "}
                                  </>
                                )}
                              </>
                            ) : (
                              <span
                                className={`${
                                  ticket?.ticket_sold === ticket?.ticketQty
                                    ? "text-gray-400"
                                    : "text-OWANBE_PRY"
                                } text-xl font-BricolageGrotesqueRegular`}
                                style={{ fontWeight: 600, fontSize: "17px" }}
                              >
                                Free
                              </span>
                            )}
                          </h3>
                          <p
                            className={`${
                              ticket?.ticket_sold === ticket?.ticketQty
                                ? "text-gray-400"
                                : ""
                            } text-s font-BricolageGrotesqueRegular`}
                            style={{
                              fontSize: "13px",
                              // color: "black",
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
                            className="sm:w-8 w-6 h-6 sm:h-8 flex-center justify-center bg-gray-200 rounded-full text-lg font-bold"
                            onClick={() => handleDecrement(ticket?.id)}
                            disabled={selectedTickets[ticket?.id] === 0}
                            style={{
                              backgroundColor:
                                selectedTickets[ticket?.id] === 0 || !selectedTickets[ticket?.id]
                                  ? "#ccc"
                                  : "#FADEDE",
                              color:
                                selectedTickets[ticket?.id] === 0 || !selectedTickets[ticket?.id]
                                  ? "#fff"
                                  : "#000",
                              cursor: 
                                selectedTickets[ticket?.id] === 0 || !selectedTickets[ticket?.id]
                                ? "not-allowed"
                                : "pointer"
                            }}
                          >
                            -
                          </button>
                          <span
                            className={`${
                              ticket?.ticket_sold === ticket?.ticketQty
                                ? "text-gray-400"
                                : ""
                            } text-base sm:text-lg mx-2`}
                          >
                            {selectedTickets[ticket?.id] || 0}
                          </span>
                          <button
                            className="sm:w-8 w-6 h-6 sm:h-8 flex-center justify-center rounded-full text-lg font-bold"
                            onClick={() => handleIncrement(ticket?.id)}
                            disabled={
                              selectedTickets[ticket?.id] ===
                                ticket?.purchaseLimit ||
                              selectedTickets[ticket?.id] ===
                                ticket?.ticket_available
                            }
                            style={{
                              color:
                                selectedTickets[ticket?.id] ===
                                  ticket?.purchaseLimit ||
                                ticket?.ticket_sold === ticket?.ticketQty
                                  ? "white"
                                  : "#e20000",
                              backgroundColor:
                                selectedTickets[ticket?.id] ===
                                  ticket?.purchaseLimit ||
                                ticket?.ticket_sold === ticket?.ticketQty
                                  ? "#ccc"
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
                        className={`card-shadow relative ${
                          ticket?.ticket_sold === ticket?.ticketQty
                            ? "bg-[#dedede] cursor-not-allowed"
                            : ""
                        } flex justify-between items-start mb-6`}
                      >
                        {ticket?.ticket_sold === ticket?.ticketQty && (
                          <Image
                            src={soldout}
                            alt="soldout"
                            className="w-24 h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0"
                            style={{
                              zIndex: 10,
                              pointerEvents: "none", // Prevent interaction with the overlay
                            }}
                          />
                        )}
                        <div>
                          <h2
                            className={`${
                              ticket?.ticket_sold === ticket?.ticketQty
                                ? "text-gray-400"
                                : ""
                            } text-lg font-BricolageGrotesqueMedium`}
                            style={{ fontWeight: 500, fontSize: "18px" }}
                          >
                            Group Of {ticket?.groupSize} - {ticket.ticketName}
                          </h2>
                          <h3>
                            {ticket?.groupPrice ? (
                              <>
                                {ticket?.guestAsChargeBearer === true ? (
                                  <>
                                    <span
                                      className={`${
                                        ticket?.ticket_sold ===
                                        ticket?.ticketQty
                                          ? "text-gray-400"
                                          : "text-OWANBE_PRY"
                                      } text-xl font-BricolageGrotesqueRegular`}
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {Math.round(
                                        ticket?.groupPrice * 0.04 +
                                          100 +
                                          ticket?.groupPrice
                                      ).toLocaleString()}
                                    </span>{" "}
                                    <span
                                      className={`${
                                        ticket?.ticket_sold ===
                                        ticket?.ticketQty
                                          ? "text-gray-400"
                                          : ""
                                      } text-s font-BricolageGrotesqueRegular`}
                                      style={{
                                        fontWeight: 400,
                                        fontSize: "12px",
                                      }}
                                    >
                                      Including ₦
                                      {Math.round(
                                        ticket?.groupPrice * 0.04 + 100
                                      ).toLocaleString()}{" "}
                                      fee
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span
                                      className={`${
                                        ticket?.ticket_sold ===
                                        ticket?.ticketQty
                                          ? "text-gray-400"
                                          : "text-OWANBE_PRY"
                                      } text-xl font-BricolageGrotesqueRegular`}
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "17px",
                                      }}
                                    >
                                      ₦
                                      {Math.round(
                                        ticket?.groupPrice
                                      ).toLocaleString()}
                                    </span>{" "}
                                  </>
                                )}
                              </>
                            ) : (
                              <span
                                className={`${
                                  ticket?.ticket_sold === ticket?.ticketQty
                                    ? "text-gray-400"
                                    : "text-OWANBE_PRY"
                                } text-xl font-BricolageGrotesqueRegular`}
                                style={{ fontWeight: 600, fontSize: "17px" }}
                              >
                                Free
                              </span>
                            )}
                          </h3>
                          <p
                            className={`${
                              ticket?.ticket_sold === ticket?.ticketQty
                                ? "text-gray-400"
                                : ""
                            } text-s font-BricolageGrotesqueRegular`}
                            style={{
                              fontSize: "13px",
                              // color: "black",
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
                            className={`sm:w-8 w-6 h-6 sm:h-8 flex-center justify-center bg-gray-200 rounded-full text-lg font-bold`}
                            onClick={() => handleDecrement(ticket?.id)}
                            disabled={selectedTickets[ticket?.id] === 0}
                            style={{
                              backgroundColor:
                                selectedTickets[ticket?.id] === 0 || !selectedTickets[ticket?.id]
                                  ? "#ccc"
                                  : "#FADEDE",
                              color:
                                selectedTickets[ticket?.id] === 0 || !selectedTickets[ticket?.id]
                                  ? "#fff"
                                  : "#000",
                              cursor: 
                                selectedTickets[ticket?.id] === 0 || !selectedTickets[ticket?.id]
                                ? "not-allowed"
                                : "pointer"
                            }}
                          >
                            -
                          </button>
                          <span
                            className={`${
                              ticket?.ticket_sold === ticket?.ticketQty
                                ? "text-gray-400"
                                : ""
                            } text-base sm:text-lg mx-2`}
                          >
                            {selectedTickets[ticket?.id] || 0}
                          </span>
                          <button
                            className={`sm:w-8 w-6 h-6 sm:h-8 flex-center justify-center rounded-full text-lg font-bold ${
                            ticket?.ticket_sold === ticket?.ticketQty
                            ? "cursor-not-allowed"
                            : ""
                            } `}
                            onClick={() => handleIncrement(ticket?.id)}
                            disabled={
                              selectedTickets[ticket?.id] === 1 ||                   
                              ticket?.ticket_available === 0 || 
                              ticket?.ticket_sold === ticket?.ticketQty
                            }
                            style={{
                              color:
                                selectedTickets[ticket?.id] === 1 ||
                                ticket?.ticket_sold === ticket?.ticketQty
                                  ? "white"
                                  : "#e20000",
                              backgroundColor:
                                selectedTickets[ticket?.id] === 1 ||
                                ticket?.ticket_sold === ticket?.ticketQty
                                  ? "#ccc"
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
          <section className="flex-1 pr-1 pl-3 pb-4 scrollable-content overflow-y-auto scroll-smooth h-full">
            <div className="bg-OWANBE_NOTIFICATION text-s font-BricolageGrotesqueRegular px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem] w-full">
              We have reserved your tickets, please complete checkout within{" "}
              <span className="text-OWANBE_PRY text-s font-BricolageGrotesqueRegular">
                {/* {currentPage === "contactform" ||
                  (currentPage === "payment") && timer} */}
                {timer}
              </span>{" "}
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
              {isToggled === true && (
                <div className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-4 custom-font-size mt-4">
                  Ticket 1 -{" "}
                  {ticketDetails?.[0]?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                    ? `Collective of ${ticketDetails?.[0]?.groupSize}`
                    : "Single"}{" "}
                  - {ticketDetails?.[0]?.ticketName}
                </div>
              )}
              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="form-spacing"
                onValuesChange={(changedValues, allValues) => {
                  isFieldTouched.current = true;

                  // Track specific fields or debounce validation
                  if (currentPage === "contactform") {
                    const changedField = Object.keys(changedValues)[0];
                    form
                      .validateFields([changedField])
                      .then(() => {
                        setIsFormValid(true);
                      })
                      .catch(() => {
                        setIsFormValid(false);
                      });
                  }
                }}
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
                <div className="flex flex-row items-center justify-between space-x-2">
                  <span
                    className={`font-BricolageGrotesqueMedium font-medium text-sm ${
                      !disableConditionOne &&
                      !disableConditionTwo &&
                      ticketDetails?.length === 1
                        ? "text-gray-400"
                        : "text-OWANBE_DARK"
                    }`}
                  >
                    {isToggled
                      ? "Toggle to stop sending tickets to multiple email addresses"
                      : "Toggle to send tickets to multiple email addresses"}
                  </span>
                  <ToggleSwitch
                    isActive={isToggled}
                    onToggle={(checked: boolean) => {
                      if (isToggled !== checked) {
                        setIsToggled(checked); // Only update if there's a change
                      }
                    }}
                    isDisabled={
                      !disableConditionOne &&
                      !disableConditionTwo &&
                      ticketDetails?.length === 1
                    }
                    label="Registration toggle"
                  />
                </div>

                {additionalFields && additionalFields.length > 0 && (
                  <>
                    <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-2 custom-font-size">
                      Additional Information
                    </h3>
                    <Form.List name="additional_information">
                      {(fields) => (
                        <>
                          {additionalFields.map((fieldData, index) => (
                            <div key={index}>
                              <Form.Item
                                name={[index, "question"]}
                                initialValue={fieldData.question}
                                hidden
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                key={fieldData.id}
                                label={
                                  fieldData?.is_compulsory === true ? (
                                    <span>
                                      {fieldData.question}{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </span>
                                  ) : (
                                    <span>{fieldData.question}</span>
                                  )
                                }
                                name={[index, "answer"]}
                                rules={
                                  fieldData?.is_compulsory === true
                                    ? [
                                        {
                                          required: true,
                                          message: "Please provide an answer",
                                        },
                                      ]
                                    : []
                                }
                              >
                                <Input placeholder="Enter your answer" />
                              </Form.Item>
                            </div>
                          ))}
                        </>
                      )}
                    </Form.List>
                    <br />
                  </>
                )}
                {isToggled && <>{renderedTickets}</>}
              </Form>
            </div>
            {modal && <TimerModal />}
            {successModal && (
              <PaymentSuccessModal data={eventDetails?.user?.firstName} />
            )}
          </section>
        ) : (
          <section className="flex-1">
            <div className="w-full bg-OWANBE_NOTIFICATION text-s font-BricolageGrotesqueRegular px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem]">
              We have reserved your tickets please complete checkout within{" "}
              <span className=" text-OWANBE_PRY text-s font-BricolageGrotesqueRegular">
                {/* {currentPage === "contactform" ||
                  (currentPage !== "tickets" && timer)} */}
                {timer}
              </span>{" "}
              minutes to secure your tickets.
            </div>
            <div className="pr-full w-full mt-16">
              <Radio.Group className="w-full">
                <div className="flex flex-col w-full gap-8">
                  <div className="card-shadow w-full flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex gap-3 items-start">
                      <div className="pt-1">
                        <Radio
                          onChange={() =>
                            setPaymentMethod(PAYMENT_METHODS.CARD)
                          }
                          value={PAYMENT_METHODS.CARD}
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-BricolageGrotesqueRegular text-OWANBE_PRY">
                          Pay with Card or bank
                        </h2>
                        <span
                          className="text-s font-BricolageGrotesqueRegular"
                          style={{ fontSize: "14px", color: "#000" }}
                        >
                          Pay with a MasterCard, Visa or Verve Card
                        </span>
                      </div>
                    </div>

                    {/* Right Section (Image) */}
                    <div>
                      <img
                        src="/paystack.svg"
                        alt="Paystack Logo"
                        style={{ height: "50px", width: "100px" }} // Adjust size as needed
                      />
                    </div>
                  </div>
                </div>
              </Radio.Group>
              <div className="flex-center gap-2 mt-7 [&>p>a]:text-OWANBE_PRY">
                <div className=""></div>

                <Checkbox
                  checked={termsAndCondition}
                  onChange={(e) => setTermsAndCondition(e.target.checked)}
                >
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
            {successModal && (
              <PaymentSuccessModal data={eventDetails?.user?.firstName} />
            )}
          </section>
        )}
        {/* Summary Section with Correct Props */}
        <Summary
          onDiscountApplied={handleDiscountApplied}
          eventId={eventDetails?.id}
          loading={loading}
          currentPage={currentPage}
          eventName={eventDetails?.eventName}
          paymentMethod={paymentMethod}
          termsAndCondition={termsAndCondition}
          allInfo={allInfo}
          isFormValid={isFormValid}
          onClick={handleButtonClick}
          ticketDetails={ticketDetails}
          continueBtn
          // {currentPage === "tickets" ? continueBtn : paymentBtn}
        />
        {modal && <TimerModal />}
      </section>
    </DashboardLayout>
  );
};

export default TicketsSelection;
