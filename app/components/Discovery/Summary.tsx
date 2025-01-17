"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { global } from "styled-jsx/css";
import "@/app/globals.css";
import { Heading5 } from "../typography/Typography";
import PaymentSuccess from "@/app/components/OstivitiesModal/PaymentSuccessModal";
import { PlusSquareOutlined } from "@ant-design/icons";
import { IDiscountData, ITicketDetails } from "@/app/utils/interface";
import { useRouter, useParams } from "next/navigation";
import { Button } from "antd";
import { PAYMENT_METHODS, TICKET_ENTITY } from "@/app/utils/enums";
import { MdOutlineDiscount } from "react-icons/md";
import {
  useGetEventDiscount,
  useGetTicketDiscount,
} from "@/app/hooks/discount/discount.hook";
import { useCookies } from "react-cookie";

interface SummaryProps {
  continueBtn?: boolean;
  allInfo?: any;
  to?: string | any;
  loading?: boolean;
  paymentBtn?: boolean;
  ticketDetails?: {
    ticketName: string;
    ticketId: string;
    ticketPrice: number;
    discountedTicketPrice?: number;
    discountToDeduct?: number;
    ticketDiscountCode: string[];
    ticketDiscountType: string;
    ticketDiscountValue: number;
    ticketFee: number;
    ticketNumber: number;
    subTotal: number;
    guestAsChargeBearer: boolean;
  }[];
  eventName?: string;
  currentPage: string;
  eventId?: string;
  isFormValid?: boolean;
  termsAndCondition?: boolean;
  paymentMethod?: PAYMENT_METHODS | null;
  discountCodeApplied?: string;
  onClick?: () => void;
  onDiscountApplied?: (applied: string) => void;
}

const Summary = ({
  continueBtn,
  to,
  allInfo,
  paymentBtn,
  ticketDetails,
  eventName,
  loading,
  isFormValid,
  eventId,
  discountCodeApplied,
  currentPage,
  termsAndCondition,
  paymentMethod,
  onDiscountApplied,
  onClick,
}: SummaryProps) => {
  const [showInput, setShowInput] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [ticketWithDiscount, setTicketWithDiscount] = useState(ticketDetails);
  const [isAtPageEnd, setIsAtPageEnd] = useState(false);
  const [discountMessage, setDiscountMessage] = useState("");
  const [totalTicketPrice, setTotalTicketPrice] = useState<number>();
  const [subTotal, setSubTotal] = useState(false);
  const [cookies, setCookie] = useCookies(["ticketDetails"]);
  const [adjustedTotal, setAdjustedTotal] = useState<string>("0.00");
  const [shownDicount, setShownDiscount] = useState<number>();
  const [validDiscount, setValidDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ event: string }>();
  const router = useRouter();

  const { getEventDiscount } = useGetEventDiscount(eventId ?? "");
  const discountDetails = getEventDiscount?.data?.data?.data;

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10; // Adjust threshold if needed
      setIsAtPageEnd(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

useEffect(() => {
  const isValid =
    ticketDetails?.some((ticket) =>
      ticket?.ticketDiscountCode?.includes(discountCode.trim())
    ) ?? false;

  setValidDiscount(isValid); // Update validDiscount based on the check

  if (!isValid && discountCode.trim()) {
    setDiscountMessage("Invalid discount code for the ticket(s)"); // Set the message if the code is invalid
  } else if (isValid && discountCode.trim() && validDiscount === false) {
    setDiscountMessage(""); // Clear the message when the code is valid
  }
}, [discountCode, ticketDetails, validDiscount]);


  const handleAddDiscountClick = () => {
    setShowInput(true);
  };

  const handleApplyDiscount = () => {
    // Logic to apply the discount code (e.g., validate code, apply discount)
    if (discountCode.trim() !== "") {
      setDiscountApplied(true);
      onDiscountApplied && onDiscountApplied(discountCode);
    }
    if (validDiscount === true) {
      setDiscountMessage("Discount applied successfully");
    }
  };


  const handleClearDiscount = () => {
    setDiscountCode("");
    setDiscountMessage("");
    setDiscountApplied(false);
    onDiscountApplied && onDiscountApplied("");
    setShowInput(false); // Disable input after clearing
  };

  useEffect(() => {
    if (ticketDetails?.length === 0) {
      setShowInput(false);
      handleClearDiscount()
      setDiscountMessage("");
    }
  }, [ticketDetails]);


  return (
    <section className="flex-1">
      <Heading5
        className="text-4xl text-left md:text-center"
        content={"Order Summary"}
      />
      <section className="mt-7 md:mt-14 md:px-20 h-4/5 border-l md:border-[#525252]">
        <div>
          <h3 className="text-OWANBE_PRY text-lg font-BricolageGrotesqueRegular">
            Event name
          </h3>
          <span
            className="font-BricolageGrotesqueRegular"
            style={{ fontSize: "16px" }}
          >
            {eventName}
          </span>
        </div>
        <div className="mt-3">
          {!showInput && (
            <div
              onClick={
                ticketDetails &&
                ticketDetails.length > 0 &&
                ticketDetails
                  .map((ticket) => ticket?.subTotal || 0)
                  .reduce((acc, curr) => acc + curr, 0) > 0
                  ? handleAddDiscountClick
                  : undefined
              }
              className={`flex-center gap-2 text-lg font-BricolageGrotesqueRegular ${
                ticketDetails &&
                ticketDetails?.length > 0 &&
                ticketDetails
                  ?.map((ticket) => ticket?.subTotal || 0)
                  ?.reduce((acc, curr) => acc + curr, 0) > 0
                  ? "text-OWANBE_PRY cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <h3>Add discount code</h3>
              <MdOutlineDiscount />
            </div>
          )}
          {showInput && ticketDetails && ticketDetails?.length > 0 && (
            <>
              <div className="mt-3"></div>
              <div className="flex-center gap-3 w-full mt-3">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  readOnly={discountApplied} // Disable input if discount is applied
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="border border-[#888] rounded-[0.625rem] w-full py-1 px-3"
                />
                {!discountApplied ? (
                  <button
                    onClick={handleApplyDiscount}
                    disabled={!validDiscount} // Disable button if discountCode is empty or only whitespace
                    className={`py-1 px-7 rounded-full bg-OWANBE_PRY font-semibold text-white ${
                      !validDiscount && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    onClick={handleClearDiscount}
                    className="py-1 px-7 rounded-full bg-OWANBE_PRY font-semibold text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
              <span className="text-OWANBE_PRY text-sm font-BricolageGrotesqueRegular">
                {discountMessage}
              </span>
            </>
          )}
        </div>
        <div>
          <div className="mt-3 border-b border-[#525252] pb-10">
            <h3 className="text-OWANBE_PRY text-lg font-BricolageGrotesqueRegular">
              Payment details
            </h3>
            <div className="flex flex-col gap-2 mt-2 text-OWANBE_FADE text-s font-BricolageGrotesqueRegular">
              <div className="flex flex-col gap-2 mt-2 text-OWANBE_FADE text-s font-BricolageGrotesqueRegular">
                {ticketDetails
                  ?.filter((ticketDetails: any) => {
                    return (
                      ticketDetails?.ticketNumber !== 0 ||
                      ticketDetails !== "undefined"
                    );
                  })
                  .map((ticket: any, index: any) => (
                    <div key={index} className="flex-center justify-between">
                      {ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE ? (
                        // Render something different when ticketEntity is "collective"
                        <div>
                          Group of {ticket?.groupSize} - {ticket?.ticketName} x{" "}
                          {ticket?.ticketNumber}
                        </div>
                      ) : (
                        // Default rendering for non-collective ticketEntity
                        <div>
                          {ticket?.ticketName} x {ticket?.ticketNumber}
                        </div>
                      )}
                      <div>
                        ₦{ticket?.ticketPrice?.toLocaleString()}
                        {".00 "}
                      </div>
                    </div>
                  ))}
                <div className="flex-center justify-between">
                  <div>Fee</div>
                  <div>
                    ₦
                    {/* {ticketDetails
                      ?.reduce((acc, ticket) => acc + ticket?.ticketFee, 0)
                      .toLocaleString()}
                    {".00 "} */}
                    {ticketDetails
                      ?.filter((ticket: any) => {
                        return ticket?.guestAsChargeBearer === true;
                      })
                      ?.reduce((acc, ticket) => acc + ticket?.ticketFee, 0)
                      .toLocaleString()}
                    {".00 "}
                  </div>
                </div>
                {discountApplied && (
                  <div className="flex-center justify-between">
                    <div>Discount</div>
                    <div>
                      -₦
                      {ticketDetails
                        ?.reduce(
                          (acc, ticket) =>
                            acc + (ticket?.discountToDeduct ?? 0),
                          0
                        )
                        .toLocaleString()}
                      {".00 "}
                    </div>{" "}
                    {/* Adjust this based on your discount logic */}
                  </div>
                )}
                <div className="flex-center justify-between">
                  <div>Subtotal</div>
                  <div>
                    ₦
                    {ticketDetails
                      ?.reduce(
                        (acc, ticket) => acc + (ticket?.subTotal ?? 0),
                        0
                      )
                      .toLocaleString() + ".00"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center justify-between font-BricolageGrotesqueMedium text-2xl text-OWANBE_PRY md:mb-10 mb-28 my-6">
            <div>Total</div>
            <div>
              ₦
              {ticketDetails
                ?.reduce((acc, ticket) => acc + (ticket?.subTotal ?? 0), 0)
                .toLocaleString() + ".00"}
            </div>
            {/* Adjust this based on your calculation */}
          </div>
          {continueBtn && (
            <div style={{ zIndex: 11 }} className="continue-btn-container">
              <Button
                loading={loading}
                onClick={onClick}
                className="primary-btn hover:none w-full text-center"
                style={{
                  borderRadius: "25px",
                  fontFamily: "BricolageGrotesqueMedium",
                  backgroundColor:
                    (currentPage === "tickets" &&
                      ticketDetails?.length === 0) ||
                    (currentPage === "contactform" && !isFormValid) ||
                    (currentPage === "payment" &&
                      (!termsAndCondition || !paymentMethod))
                      ? "#cccccc" // Gray for disabled
                      : "#e20000", // Red for active
                  color:
                    (currentPage === "tickets" &&
                      ticketDetails?.length === 0) ||
                    (currentPage === "contactform" && !isFormValid) ||
                    (currentPage === "payment" &&
                      (!termsAndCondition || !paymentMethod))
                      ? "#666666"
                      : "white",
                  height: "50px",
                  fontSize: "16px",
                  border: "none",
                  zIndex: 11,
                }}
                title={
                  currentPage === "tickets"
                    ? "Continue"
                    : currentPage === "contactform" && !isFormValid
                    ? "Continue"
                    : "Continue"
                }
                disabled={
                  (currentPage === "tickets" && ticketDetails?.length === 0) ||
                  (currentPage === "contactform" && !isFormValid) ||
                  (currentPage === "payment" &&
                    (!termsAndCondition || !paymentMethod))
                }
              >
                {currentPage === "tickets"
                  ? "Continue"
                  : currentPage === "contactform" &&
                    ticketDetails
                      ?.map((tickets) => tickets?.subTotal)
                      .reduce((acc, curr) => acc + curr, 0) === 0
                  ? "Order Tickets"
                  : currentPage === "contactform" &&
                    ticketDetails &&
                    ticketDetails
                      ?.map((tickets) => tickets?.subTotal)
                      .reduce((acc, curr) => acc + curr, 0) > 0
                  ? "Continue"
                  : "Checkout"}
              </Button>{" "}
            </div>
          )}
          {/* <PaystackButton {...componentProps} /> */}
          {/* {paymentBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
              <button
                className="primary-btn w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          )} */}
          {isModalOpen && (
            <PaymentSuccess
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default Summary;
