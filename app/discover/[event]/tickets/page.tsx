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
  IGuestCreate,
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
  GUEST_CATEGORY,
} from "@/app/utils/enums";
import { Skeleton } from "antd";
import { useTimer } from "@/app/hooks/countdown";
import { useRegisterGuest } from "@/app/hooks/guest/guest.hook";
import {
  useInitialisePayment,
  useVerifyPayment,
} from "@/app/hooks/payment/payment.hook";
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
import { PaystackButton, usePaystackPayment } from "react-paystack";

const paystack_public_key: any = process.env.OSTIVITIES_PAYSTACK_TEST_KEY;

const TicketsSelection = () => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const [reference, setReference] = useState("");
  const { registerGuest } = useRegisterGuest();
  const { verifyPayment } = useVerifyPayment();
  const { initialisePayment } = useInitialisePayment();
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Get query params
  const [cookies, setCookie, removeCookie] = useCookies([
    "ticketDetails",
    "selectedTickets",
    "ticketDataQ",
    "allInfo",
    "isToggled",
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
            setIsToggled(false);
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
      ticketType: string;
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

  const [ticketDataQ, setTicketDataQ] = useState<{
    ticket_information: {
      ticket_name: string;
      ticket_price: number;
      constantTicketPrice: number;
      discountedTicketPrice?: number;
      discountToDeduct?: number;
      ticketFee: number;
      eventName?: string;
      ticketDiscountType: string;
      ticketDiscountCode: string[];
      ticketDiscountValue: number;
      ticketNumber: number;
      ticket_type: string;
      ticket_id: string;
      subTotal: number;
      quantity: number;
      total_amount: number;
      ticket_stock: string;
      ticketEntity: string;
      guestAsChargeBearer: boolean;
      groupSize: number;
      order_number: string;
    }[];
    fees: number;
    discount: number;
    total_amount_paid: number;
    discountCode: string;
    total_purchased: number;
    payment_method: PAYMENT_METHODS;
  }>({
    ticket_information: [],
    fees: 0,
    discount: 0,
    total_amount_paid: 0,
    discountCode: "",
    total_purchased: 0,
    payment_method: PAYMENT_METHODS.CARD,
  });

  const [allInfo, setAllInfo] = useState<{
    personal_information: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    ticket_information: {
      ticket_id: string;
      ticket_name: string;
      quantity: number;
      total_amount: number;
      ticket_price: number;
      ticket_type: string;
      ticket_stock: string;
      order_number: string;
    }[];
    additional_information: {
      question: string;
      answer: string;
    }[];
    attendees_information: {
      id: number;
      event: string;
      event_unique_code: string;
      ticket_information: {
        ticket_id: string;
        quantity: number;
        ticket_name: string;
        total_amount: number;
        ticket_price: number;
        ticket_type: string;
        ticket_stock: string;
        order_number: string;
      };
      personal_information: {
        firstName: string;
        lastName: string;
        email: string;
      };
      guest_category: GUEST_CATEGORY;
      total_purchased: number;
      payment_method?: PAYMENT_METHODS;
      fees: number;
      total_amount_paid: number;
      discount: number;
    }[];
    guest_category: GUEST_CATEGORY;
    event: string;
    event_unique_code: string;
    fees: number;
    total_amount_paid: number;
    discountCode?: string;
    discount: number;
    total_purchased: number;
    payment_method: PAYMENT_METHODS;
  }>({
    personal_information: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    additional_information: [],
    attendees_information: [],
    ticket_information: [],
    event: eventDetails?.id,
    guest_category: GUEST_CATEGORY.BUYER,
    event_unique_code: params?.event,
    fees: 0,
    total_amount_paid: 0,
    discountCode: "",
    discount: 0,
    total_purchased: 0,
    payment_method: PAYMENT_METHODS.FREE,
  });

  // console.log(ticketDetails, "ticketDetails");
  // console.log(allInfo, "allInfo");

  useEffect(() => {
    if (!cookies?.ticketDetails || ticketDetails?.length > 0) {
      return;
    }
    setTicketDetails(cookies?.ticketDetails);
    setSelectedTickets(cookies?.selectedTickets);
    setTicketDataQ(cookies?.ticketDataQ);
    setAllInfo(cookies?.allInfo);
  }, [
    cookies?.ticketDetails,
    cookies?.selectedTickets,
    cookies?.ticketDataQ,
    cookies?.allInfo,
    ticketDetails?.length,
  ]);

  // Save state to cookies when ticketDetails or selectedTickets change
  useEffect(() => {
    const nonZeroTickets = ticketDetails?.filter(
      (ticket) => ticket.ticketNumber > 0
    ); // Remove tickets with zero count
    const nonZero = ticketDataQ?.total_purchased > 0 && ticketDataQ;
    if (ticketDetails?.length > 0) {
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
      setCookie("ticketDataQ", JSON.stringify(ticketDataQ), {
        maxAge: 600,
        secure: true,
        sameSite: "strict",
        path: `/discover/${params?.event}/tickets`,
      });
      setCookie("allInfo", JSON.stringify(allInfo), {
        maxAge: 600,
        secure: true,
        sameSite: "strict",
        path: `/discover/${params?.event}/tickets`,
      });
    } else {
      // Remove cookies if `ticketDetails` is empty
      removeCookie("ticketDetails", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("selectedTickets", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("ticketDataQ", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("allInfo", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("isToggled", {
        path: `/discover/${params?.event}/tickets`,
      });
    }
  }, [
    ticketDetails,
    ticketDataQ,
    selectedTickets,
    setCookie,
    removeCookie,
    params?.event,
    allInfo,
  ]);

  useEffect(() => {
    // Cleanup cookies when navigating away from the current event
    if (!pathname.startsWith(`/discover/${params?.event}/tickets`)) {
      removeCookie("ticketDetails", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("selectedTickets", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("ticketDataQ", {
        path: `/discover/${params?.event}/tickets`,
      });
      removeCookie("allInfo", { path: `/discover/${params?.event}/tickets` });
      removeCookie("isToggled", { path: `/discover/${params?.event}/tickets` });
    }
  }, [pathname, params?.event, removeCookie]);

  useEffect(() => {
    if (cookies?.isToggled) {
      setIsToggled(cookies?.isToggled);
    }
  }, [cookies?.isToggled]);

  let ticketCounter = 1;

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
            discountTypeUsed === DISCOUNT_TYPE.PERCENTAGE
              ? ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                ? (ticket?.ticketPrice * discountValueUsed) / 100
                : (ticket?.constantTicketPrice * discountValueUsed) / 100
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

    setTicketDataQ((prevTicketData) => {
      const appliedDiscountTicketIds = new Set<string>();

      const updatedTicketInformation = prevTicketData?.ticket_information.map(
        (ticket) => {
          if (
            discountCode &&
            discountCodeUsed &&
            ticket?.ticketDiscountCode?.includes(discountCode) &&
            !appliedDiscountTicketIds.has(ticket?.ticket_id)
          ) {
            // Apply the discount
            const discountValue =
              discountTypeUsed === DISCOUNT_TYPE.PERCENTAGE
                ? ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                  ? (ticket?.ticket_price * discountValueUsed) / 100
                  : (ticket?.constantTicketPrice * discountValueUsed) / 100
                : discountValueUsed;

            const discountedTicketPrice = ticket?.ticket_price - discountValue;

            appliedDiscountTicketIds.add(ticket?.ticket_id);

            return {
              ...ticket,
              ticketDiscountType: discountTypeUsed,
              ticketDiscountValue: Math.round(discountValue),
              discountedTicketPrice: Math.round(
                Math.max(discountedTicketPrice, 0)
              ),
              discountToDeduct: Math.round(discountValue),
              subTotal:
                ticket?.guestAsChargeBearer === true
                  ? Math.round(discountedTicketPrice + ticket?.ticketFee)
                  : Math.round(discountedTicketPrice),
            };
          }

          // Reset to original state if no discount is applied
          return {
            ...ticket,
            ticketDiscountType: "",
            ticketDiscountValue: 0,
            discountedTicketPrice: undefined,
            discountToDeduct: undefined,
            subTotal:
              ticket?.guestAsChargeBearer === true
                ? Math.round(ticket?.ticket_price + ticket?.ticketFee)
                : ticket?.ticket_price,
          };
        }
      );

      const updatedFees = updatedTicketInformation
        .filter((ticket) => ticket?.guestAsChargeBearer === true)
        .reduce((acc, ticket) => acc + (ticket.ticketFee || 0), 0);

      const updatedDiscount = updatedTicketInformation
        .map((ticket) => ticket?.discountToDeduct || 0)
        .reduce((acc, curr) => acc + curr, 0);

      const updatedTotalAmountPaid =
        prevTicketData?.total_amount_paid - updatedDiscount;

      const updatedTotalPurchased = updatedTicketInformation
        .map((ticket) => ticket?.quantity)
        .reduce((acc, curr) => acc + curr, 0);

      setAllInfo((prevTicketData) => {
        return {
          ...prevTicketData,
          ticket_information: updatedTicketInformation?.map((ticket) => ({
            ticket_id: ticket.ticket_id,
            ticket_name: ticket.ticket_name,
            quantity: ticket.quantity,
            total_amount: ticket.subTotal,
            ticket_price: ticket.ticket_price,
            ticket_type: ticket.ticket_type,
            ticket_stock: ticket.ticket_stock,
            order_number: ticket.order_number,
          })),
          fees: updatedFees,
          discount: updatedDiscount,
          total_amount_paid: updatedTotalAmountPaid,
          total_purchased: updatedTotalPurchased,
          discountCode: discountCodeUsed ? discountCode : "",
        };
      });

      return {
        ...prevTicketData,
        ticket_information: updatedTicketInformation,
        fees: updatedFees,
        discount: updatedDiscount,
        total_amount_paid: updatedTotalAmountPaid,
        total_purchased: updatedTotalPurchased,
        discountCode: discountCodeUsed ? discountCode : "",
      };
    });
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
            ticketType: ticket?.ticketType,
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

  const handleIncrementWithUniqueOrder = (ticketId: string) => {
    const ticket = ticketData?.find(
      (ticket: ITicketDetails) => ticket?.id === ticketId
    );

    if (ticket) {
      setTicketDataQ((prevData) => {
        const realPrice =
          ticket?.ticketType === "PAID"
            ? ticket?.ticketEntity === TICKET_ENTITY.SINGLE
              ? ticket?.ticketPrice
              : ticket?.groupPrice
            : 0;

        // Calculate the fee (only once for collective tickets)
        const currentFee =
          ticket?.ticketType === "PAID"
            ? Math.round(realPrice * 0.04 + 100)
            : 0;

        // Create tickets based on ticket entity type
        const newTickets = {
          ticket_name: ticket?.ticketName,
          ticket_price: realPrice,
          constantTicketPrice: ticket?.ticketPrice,
          discountedTicketPrice: ticket?.discountedTicketPrice,
          discountToDeduct: ticket?.discountToDeduct,
          ticketFee: currentFee,
          eventName: ticket?.eventName,
          ticketDiscountType: ticket?.discount?.discountType,
          ticketDiscountCode: ticket?.discountCode,
          ticketDiscountValue: ticket?.discount?.discount_value,
          ticketNumber: 1,
          ticket_type: ticket?.ticketType,
          ticket_id: ticket?.id,
          subTotal:
            ticket?.guestAsChargeBearer === true
              ? realPrice + currentFee
              : realPrice,
          total_amount:
            ticket?.guestAsChargeBearer === true
              ? realPrice + currentFee
              : realPrice,
          ticket_stock: ticket?.ticketStock,
          ticketEntity: ticket?.ticketEntity,
          guestAsChargeBearer: ticket?.guestAsChargeBearer,
          groupSize: ticket?.groupSize,
          order_number: `ORD${generateOrderNumber()}`, // Unique order number
          quantity: 1,
        };

        // Update the ticket_information array and recalculate totals
        const updatedTicketInformation = [
          ...prevData?.ticket_information,
          newTickets,
        ];

        const updatedFees = updatedTicketInformation.reduce((acc, ticket) => {
          if (ticket.ticketEntity === TICKET_ENTITY.COLLECTIVE) {
            return acc + (ticket.ticketFee || 0); // Only count the single collective fee
          }
          return acc + (ticket.ticketFee || 0); // Sum individual fees for single tickets
        }, 0);

        const updatedDiscount = updatedTicketInformation
          .map((ticket) => ticket?.discountToDeduct || 0)
          .reduce((acc, curr) => acc + curr, 0);

        const updatedTotalAmountPaid = updatedTicketInformation.reduce(
          (acc, ticket) => {
            if (ticket.ticketEntity === TICKET_ENTITY.COLLECTIVE) {
              return acc + (ticket.subTotal || 0); // Only count the first collective fee
            }
            return acc + ticket.subTotal; // Add subtotal for single tickets
          },
          0
        );

        const updatedTotalPurchased = updatedTicketInformation
          .map((ticket) => ticket?.ticketNumber)
          .reduce((acc, curr) => acc + curr, 0);

        // Update allInfo state with the new ticket information
        setAllInfo((prevAllInfo) => ({
          ...prevAllInfo,
          ticket_information: updatedTicketInformation?.map((ticket) => ({
            ticket_id: ticket.ticket_id,
            ticket_name: ticket.ticket_name,
            quantity: ticket.quantity,
            total_amount: ticket.total_amount,
            ticket_price: ticket.ticket_price,
            ticket_type: ticket.ticket_type,
            ticket_stock: ticket.ticket_stock,
            order_number: ticket.order_number,
          })),
          fees: updatedFees,
          discount: updatedDiscount,
          total_amount_paid: updatedTotalAmountPaid,
          total_purchased: updatedTotalPurchased,
        }));

        return {
          ...prevData,
          ticket_information: updatedTicketInformation,
          fees: updatedFees,
          discount: updatedDiscount,
          total_amount_paid: updatedTotalAmountPaid,
          total_purchased: updatedTotalPurchased,
        };
      });
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

  const handleDecreaseWithUniqueOrder = (ticketId: string) => {
    setTicketDataQ((prevData) => {
      // Check if the ticket is collective
      const isCollectiveTicket = prevData.ticket_information.some(
        (ticket) =>
          ticket.ticket_id === ticketId &&
          ticket.ticketEntity === TICKET_ENTITY.COLLECTIVE
      );

      let updatedTicketInformation;

      if (isCollectiveTicket) {
        // Remove all tickets with the same `ticketId` for collective tickets
        updatedTicketInformation = prevData.ticket_information.filter(
          (ticket) => ticket.ticket_id !== ticketId
        );
      } else {
        // For non-collective tickets, remove only the last occurrence
        const lastOrderTicketIndex = prevData.ticket_information
          .map((ticket, index) => ({ ...ticket, index }))
          .filter((ticket) => ticket.ticket_id === ticketId)
          .pop(); // Get the last ticket object for this `ticketId`

        if (!lastOrderTicketIndex) {
          // If no matching ticket is found, return the state as-is
          return prevData;
        }

        const { index: lastOrderIndex } = lastOrderTicketIndex;

        // Remove the ticket with the last `order_number`
        updatedTicketInformation = prevData.ticket_information.filter(
          (_, idx) => idx !== lastOrderIndex
        );
      }

      // Reset to default state if no tickets remain
      if (updatedTicketInformation.length === 0) {
        const defaultState = {
          ticket_information: [],
          fees: 0,
          discount: 0,
          total_amount_paid: 0,
          discountCode: "",
          total_purchased: 0,
          payment_method: prevData.payment_method || "CARD", // Ensure fallback value for payment_method
        };

        // Update `allInfo` state to match
        setAllInfo((prevAllInfo) => ({
          ...prevAllInfo,
          ...defaultState,
        }));

        return defaultState;
      }

      // Recalculate totals if tickets remain
      const updatedFees = updatedTicketInformation
        .filter((ticket) => ticket?.guestAsChargeBearer === true)
        .reduce((acc, ticket) => acc + (ticket.ticketFee || 0), 0);

      const updatedDiscount = updatedTicketInformation
        .map((ticket) => ticket?.discountToDeduct || 0)
        .reduce((acc, curr) => acc + curr, 0);

      const updatedTotalAmountPaid = updatedTicketInformation
        .map((ticket) => ticket?.subTotal)
        .reduce((acc, curr) => acc + curr, 0);

      const updatedTotalPurchased = updatedTicketInformation
        .map((ticket) => ticket?.quantity)
        .reduce((acc, curr) => acc + curr, 0);

      const updatedState = {
        ...prevData,
        ticket_information: updatedTicketInformation,
        fees: updatedFees,
        discount: updatedDiscount,
        total_amount_paid: updatedTotalAmountPaid,
        total_purchased: updatedTotalPurchased,
      };

      // Update `allInfo` to reflect the changes
      setAllInfo((prevAllInfo) => ({
        ...prevAllInfo,
        ticket_information: updatedTicketInformation.map((ticket) => ({
          ticket_id: ticket.ticket_id,
          ticket_name: ticket.ticket_name,
          quantity: ticket.quantity,
          total_amount: ticket.total_amount,
          ticket_price: ticket.ticket_price,
          ticket_type: ticket.ticket_type,
          ticket_stock: ticket.ticket_stock,
          order_number: ticket.order_number,
        })),
        fees: updatedFees,
        discount: updatedDiscount,
        total_amount_paid: updatedTotalAmountPaid,
        total_purchased: updatedTotalPurchased,
      }));

      return updatedState;
    });
  };

  const [form] = Form.useForm();
  // ! contactform
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; question: string; answer: string; is_compulsory: boolean }[]
  >([]);

  // console.log(ticketDataQ, "ticketDataQ");

  const [attendeesInformation, setAttendeesInformation] = useState<
    {
      event: string;
      event_unique_code: string;
      ticket_information: {
        ticket_id: string;
        quantity: number;
        ticket_name: string;
        total_amount: number;
        ticket_price: number;
        ticket_type: string;
        ticket_stock: string;
        order_number: string;
      }[];
      personal_information: {
        firstName: string;
        lastName: string;
        email: string;
        confirmEmail: string;
      };
      id: number;
      guest_category: GUEST_CATEGORY;
      total_purchased: number;
      payment_method: PAYMENT_METHODS;
      fees: number;
      discount: number;
      total_amount_paid: number;
    }[]
  >([]);
  // console.log(attendeesInformation, "attendeesInformation");
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [downloadDetails, setDownloadDetails] = useState<
    {
      order_number: string;
      order_date: string;
      event_date_time: string;
      event_address: string;
      buyer_name: string;
      ticket_name: string;
      ticket_type: string;
      event_name: string;
      // qr_code: string;
      // ostivities_logo?: string;
      // ticket_banner?: string;
    }[]
  >([]);
  // console.log(downloadDetails, "downloadDetails")
  const [isFormValid, setIsFormValid] = useState(false);

  const renderedAttendees = useMemo(() => {
    return allInfo?.attendees_information?.map((attendee) => (
      <div key={attendee.id}>
        <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-4 custom-font-size mt-4">
          Ticket {attendee?.id + 2} -{" "}
          {attendee?.ticket_information?.ticket_name}
        </h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={[attendee?.id + 2, "firstName"]}
              label={
                <span>
                  Attendee First Name <span style={{ color: "red" }}>*</span>
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
                  handlePersonalInfoChange(
                    e.target.value,
                    attendee.id,
                    "firstName"
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={[attendee?.id + 2, "lastName"]}
              label={
                <span>
                  Attendee Last Name <span style={{ color: "red" }}>*</span>
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
                  handlePersonalInfoChange(
                    e.target.value,
                    attendee.id,
                    "lastName"
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={[attendee?.id + 2, "attendeeEmail"]}
              label={
                <span>
                  Attendee Email Address <span style={{ color: "red" }}>*</span>
                </span>
              }
              rules={[
                { required: true, message: "Please provide attendee email" },
              ]}
            >
              <Input
                type="email"
                placeholder="Enter Attendee Email Address"
                onChange={(e) =>
                  handlePersonalInfoChange(e.target.value, attendee.id, "email")
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={[attendee?.id + 2, "confirmAttendeeEmail"]}
              label={
                <span>
                  Confirm Attendee Email <span style={{ color: "red" }}>*</span>
                </span>
              }
              rules={[
                { required: true, message: "Please confirm attendee email" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const emailValue = getFieldValue([
                      attendee?.id + 2,
                      "attendeeEmail",
                    ]); // Get the value of the email field
                    if (!value || emailValue === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Emails do not match!"));
                  },
                }),
              ]}
            >
              <Input
                type="email"
                placeholder="Confirm Attendee Email Address"
                onChange={(e) =>
                  handlePersonalInfoChange(
                    e.target.value,
                    attendee.id,
                    "confirmEmail"
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    ));
  }, [allInfo]);

  const handlePersonalInfoChange = (
    value: string,
    attendeeId: number,
    field: "firstName" | "lastName" | "email" | "confirmEmail"
  ) => {
    setAllInfo((prevAllInfo) => {
      const updatedAttendees = [...prevAllInfo.attendees_information];
      const attendeeIndex = updatedAttendees?.findIndex(
        (attendee) => attendee.id === attendeeId
      );
      if (attendeeIndex !== -1) {
        updatedAttendees[attendeeIndex].personal_information = {
          ...updatedAttendees[attendeeIndex].personal_information,
          [field]: value,
        };
      }

      return {
        ...prevAllInfo,
        attendees_information: updatedAttendees,
      };
    });

    setAttendeesInformation((prevAttendeesInformation) => {
      const updatedAttendees = [...prevAttendeesInformation];
      const attendeeIndex = updatedAttendees?.findIndex(
        (attendee) => attendee.id === attendeeId
      );
      if (attendeeIndex !== -1) {
        updatedAttendees[attendeeIndex].personal_information = {
          ...updatedAttendees[attendeeIndex].personal_information,
          [field]: value,
        };
      }

      return updatedAttendees;
    });
  };

  const distributeTicketsToAttendees = useCallback(() => {
    setAllInfo((prevAllInfo) => {
      if (!isToggled) {
        return {
          ...prevAllInfo,
          attendees_information: [], // Clear attendees completely
          ticket_information: [
            ...prevAllInfo.ticket_information,
            ...prevAllInfo.attendees_information.flatMap(
              (attendee) => attendee.ticket_information // Restore tickets
            ),
          ],
        };
      }

      // Exclude the first ticket
      const remainingTickets = prevAllInfo.ticket_information.slice(1);

      // Map remaining tickets to updated attendees
      const updatedAttendees = remainingTickets.map((ticket, index) => ({
        id: index, // Ensure IDs start from 1
        event: prevAllInfo.event,
        event_unique_code: prevAllInfo.event_unique_code,
        ticket_information: {
          ticket_id: ticket.ticket_id,
          quantity: ticket.quantity,
          ticket_name: ticket.ticket_name,
          total_amount: ticket.total_amount,
          ticket_price: ticket.ticket_price,
          ticket_type: ticket.ticket_type,
          ticket_stock: ticket.ticket_stock,
          order_number: ticket.order_number,
        },
        personal_information: {
          firstName: "",
          lastName: "",
          email: "",
        },
        guest_category: GUEST_CATEGORY.ATTENDEE,
        total_purchased: ticket.quantity,
        fees: Math.round(ticket.ticket_price * 0.04 + 100),
        total_amount_paid: ticket.total_amount,
        discount: prevAllInfo.discount,
        payment_method: PAYMENT_METHODS.FREE,
      }));

      return {
        ...prevAllInfo,
        attendees_information: updatedAttendees,
        ticket_information: prevAllInfo.ticket_information.slice(0, 1), // Retain only the first ticket
      };
    });
  }, [isToggled]);

  useEffect(() => {
    distributeTicketsToAttendees();
  }, [isToggled, distributeTicketsToAttendees]);

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

    const personal_information = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
    };
    const newAllInfo = (({
      personal_information,
      additional_information,
      ...rest
    }) => rest)(allInfo);

    setAllInfo({
      ...newAllInfo,
      personal_information,
      additional_information: additionalFields,
    });

    if (
      ticketDetails
        ?.map((ticket) => ticket?.subTotal)
        .reduce((acc, curr) => acc + curr, 0) === 0
    ) {
      setLoading(true);
      const response = await registerGuest.mutateAsync({
        ...newAllInfo,
        personal_information,
        additional_information: additionalFields,
        eventId: eventDetails?.id,
      });

      if (response.status === 200) {
        setSuccessModal(true);
        setLoading(false);
        removeCookie("ticketDetails");
        removeCookie("selectedTickets");
        removeCookie("ticketDataQ");
        removeCookie("allInfo");
        removeCookie("isToggled");
      }
    } else {
      setLoading(false);
      setCurrentPage("payment");
      router.push(`/discover/${params?.event}/tickets?page=payment`);
    }
  };
  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    return errorInfo;
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: allInfo?.personal_information?.email,
    amount: allInfo.total_amount_paid, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: paystack_public_key,
  };
  // console.log(reference, "reference");
  const initializePayment = usePaystackPayment(config);
  const handleFinalSubmit = async () => {
    setLoading(true);

    const res = await initialisePayment.mutateAsync({
      amount: allInfo.total_amount_paid.toString(),
      email: allInfo?.personal_information?.email,
      event_unique_key: params?.event,
    });
    if (res.status === 200) {
      const onSuccess = async () => {
        const verify = await verifyPayment.mutateAsync(
          res?.data?.data?.data?.reference as string
        );
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference, "reference");
        console.log(verify, "verify");
        if(verify.status === 200) {
          const sanitizedData = {
            ...allInfo, // Spread the existing data
            attendees_information: allInfo.attendees_information.map(
              ({ id, personal_information, ...attendee }) => ({
                ...attendee,
                personal_information: {
                  ...personal_information,
                  confirmEmail: undefined, // Remove `confirmEmail`
                },
                payment_method: PAYMENT_METHODS.CARD, // Update the payment method for each attendee
              })
            ),
          };
          const response = await registerGuest.mutateAsync({
            ...sanitizedData,
            payment_method: PAYMENT_METHODS.CARD,
            eventId: eventDetails?.id,
          });
  
          if (response.status === 200) {
            setLoading(false);
            removeCookie("ticketDetails");
            removeCookie("selectedTickets");
            removeCookie("ticketDataQ");
            removeCookie("allInfo");
            removeCookie("isToggled");
            setSuccessModal(true);
            const details = response?.data?.data?.ticket_information?.map(
              (ticket: any) => ({
                order_number: ticket?.order_number,
                order_date: dateFormat(response?.data?.data?.createdAt),
                event_date_time: dateFormat(eventDetails?.startDate),
                event_address: eventDetails?.address,
                buyer_name: response?.data?.data?.personal_information?.firstName,
                ticket_name: ticket?.ticket_name,
                ticket_type: ticket?.ticket_type,
                event_name: eventDetails?.eventName,
                // qr_code: ticket?.qr_code,
                // ostivities_logo: "",
                // ticket_banner: ticket?.ticket_banner,
              })
            );
            let combinedDetails = [...details];
            if (response?.data?.data?.attendees_information?.length > 0) {
              const extraDetails =
                response?.data?.data?.attendees_information?.map(
                  (attendees: any) => ({
                    order_number: attendees?.ticket_information?.order_number,
                    order_date: dateFormat(response?.data?.data?.createdAt),
                    event_date_time: dateFormat(eventDetails?.startDate),
                    event_address: eventDetails?.address,
                    buyer_name: attendees?.personal_information?.firstName,
                    ticket_name: attendees?.ticket_information?.ticket_name,
                    ticket_type: attendees?.ticket_information?.ticket_type,
                    event_name: eventDetails?.eventName,
                    // qr_code: attendees?.ticket_information?.qr_code,
                    // ostivities_logo: "",
                    // ticket_banner: attendees?.ticket_information?.ticket_banner,
                  })
                );
              combinedDetails = [...details, ...extraDetails];
            }
            setDownloadDetails(combinedDetails);
          } else {
            setLoading(false);
          }
        }
      };

      // you can call this function anything
      const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
      };
      initializePayment({
        onSuccess,
        onClose,
        config,
      });
    }
  };

  const isFieldTouched = useRef(false);

  interface DebounceFunction {
    (...args: any[]): void;
  }

  const useDebounce = (
    func: (...args: any[]) => void,
    delay: number
  ): DebounceFunction => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    return (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => func(...args), delay);
    };
  };

  const checkFormValidity = useDebounce(async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch (errorInfo) {
      setIsFormValid(false);
    }
  }, 1000);

  useEffect(() => {
    if (currentPage === "contactform" && isFieldTouched.current === true) {
      checkFormValidity();
    }
  }, [currentPage, form.getFieldsValue(), checkFormValidity, isFieldTouched]);

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const pageParam = searchParams.get("page");

    if (isInitialLoad) {
      setIsInitialLoad(false); // Set the flag to false after initial load

      if (pageParam === "payment" && successModal === false) {
        // Redirect to `contactform` on reload if on the `payment` page
        router.replace(`${pathname}?page=contactform`);
        setCurrentPage("contactform");
      } else if (pageParam === "contactform" || pageParam === "payment") {
        // Update state based on the query parameter
        setCurrentPage(pageParam);
      } else if (pageParam === null) {
        // Default to `tickets` if no valid page query exists
        setCurrentPage("tickets");
        setIsToggled(false);
        setCookie("isToggled", "false", {
          maxAge: 600,
          secure: true,
          sameSite: "strict",
          path: `/discover/${params?.event}/tickets`,
        });
      }
    } else {
      // Handle navigation changes after the initial load
      if (pageParam === "contactform" || pageParam === "payment") {
        setCurrentPage(pageParam);
      } else if (pageParam === null) {
        setCurrentPage("tickets");
        setIsToggled(false);
        setCookie("isToggled", "false", {
          maxAge: 600,
          secure: true,
          sameSite: "strict",
          path: `/discover/${params?.event}/tickets`,
        });
      }
    }
  }, [
    searchParams,
    pathname,
    router,
    isInitialLoad,
    setCookie,
    params?.event,
    successModal,
  ]);

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
                            onClick={() => {
                              handleDecrement(ticket?.id),
                                handleDecreaseWithUniqueOrder(ticket?.id);
                            }}
                            disabled={selectedTickets[ticket?.id] === 0}
                            style={{
                              backgroundColor:
                                selectedTickets[ticket?.id] === 0 ||
                                !selectedTickets[ticket?.id]
                                  ? "#ccc"
                                  : "#FADEDE",
                              color:
                                selectedTickets[ticket?.id] === 0 ||
                                !selectedTickets[ticket?.id]
                                  ? "#fff"
                                  : "#000",
                              cursor:
                                selectedTickets[ticket?.id] === 0 ||
                                !selectedTickets[ticket?.id]
                                  ? "not-allowed"
                                  : "pointer",
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
                            onClick={() => {
                              handleIncrement(ticket?.id),
                                handleIncrementWithUniqueOrder(ticket?.id);
                            }}
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
                            onClick={() => {
                              handleDecrement(ticket?.id),
                                handleDecreaseWithUniqueOrder(ticket?.id);
                            }}
                            disabled={selectedTickets[ticket?.id] === 0}
                            style={{
                              backgroundColor:
                                selectedTickets[ticket?.id] === 0 ||
                                !selectedTickets[ticket?.id]
                                  ? "#ccc"
                                  : "#FADEDE",
                              color:
                                selectedTickets[ticket?.id] === 0 ||
                                !selectedTickets[ticket?.id]
                                  ? "#fff"
                                  : "#000",
                              cursor:
                                selectedTickets[ticket?.id] === 0 ||
                                !selectedTickets[ticket?.id]
                                  ? "not-allowed"
                                  : "pointer",
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
                            onClick={() => {
                              handleIncrement(ticket?.id),
                                handleIncrementWithUniqueOrder(ticket?.id);
                            }}
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
                {currentPage === "contactform" ||
                  (currentPage === "payment" && timer)}
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
                  checkFormValidity();
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
                      ? "Toggle to disable sending tickets to multiple email addresses"
                      : "Toggle to send tickets to multiple email addresses"}
                  </span>
                  <ToggleSwitch
                    isActive={isToggled}
                    onToggle={(checked: boolean) => {
                      if (isToggled !== checked) {
                        setIsToggled(checked);
                        setCookie("isToggled", checked, {
                          maxAge: 600,
                          secure: true,
                          sameSite: "strict",
                          path: `/discover/${params?.event}/tickets`,
                        });
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
                {isToggled && <>{renderedAttendees}</>}
              </Form>
            </div>
            {modal && <TimerModal />}
            {successModal && (
              <PaymentSuccessModal downloadDetails={downloadDetails} />
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
              <PaymentSuccessModal downloadDetails={downloadDetails} />
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
        />
        {modal && <TimerModal />}
      </section>
    </DashboardLayout>
  );
};

export default TicketsSelection;
