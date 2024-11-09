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
    ticketDiscountCode: string;
    ticketDiscountType: string;
    ticketDiscountValue: number;
    ticketFee: number;
    ticketNumber: number;
    subTotal: number;
  }[];
  eventName?: string;
  currentPage: string;
  eventId?: string;
  isFormValid?: boolean;
  termsAndCondition?: boolean;
  paymentMethod?: PAYMENT_METHODS | null;
  onClick?: () => void;
  onDiscountApplied?: (applied: boolean) => void;
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
  currentPage,
  termsAndCondition,
  paymentMethod,
  onDiscountApplied,
  onClick,
}: SummaryProps) => {
  const [showInput, setShowInput] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [ticketWithDiscount, setTicketWithDiscount] = useState<{
    [key: string]: number;
  }>({});
  const [discountMessage, setDiscountMessage] = useState("");
  const [totalTicketPrice, setTotalTicketPrice] = useState<number>();
  const [subTotal, setSubTotal] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ event: string }>();
  const router = useRouter();

  // const { getTicketDiscount } = useGetTicketDiscount(ticketDetails?.map)
  const { getEventDiscount } = useGetEventDiscount(eventId ?? "");
  const discountDetails = getEventDiscount?.data?.data?.data;
  // console.log(discountDetails)

  useEffect(() => {
    onDiscountApplied && onDiscountApplied(discountApplied);
  }, [discountApplied, onDiscountApplied]);

  // useEffect(() => {
  //   const checkDiscountCode = async () => {
  //     // Ensure `discountCode` and `discountDetails` are defined
  //     if (!discountCode || !discountDetails || !ticketDetails) return;

  //     const discount = discountDetails?.find(
  //       (discount: any) => discount?.discountCode === discountCode
  //     );

  //     const ticketApplicable = discount?.ticket

  //     const ticketIds = ticketApplicable?.map((tickets: any) => tickets?.id);
  //     const discountPresent = ticketDetails?.map((ticket: any) => ticket?.ticketId);

  //     const discountChecks = discountPresent?.map(ticketId => ticketIds?.includes(ticketId));

  //     // console.log(discountChecks);
  //     // console.log(ticketIds, "ticketIds", ticketApplicable)
  //     console.log(ticketDetails, "ticketDetails")
  //     // const discountApplicable = ticketApplicable?.map((tickets: any) => tickets?.map((ticket: ITicketDetails) => ticket?.id))
  //     // console.log(discount)
  //     if (!discount) {
  //       setDiscountMessage("Discount Code isn't valid");
  //     } else if (discount) {
  //       setDiscountMessage("Discount code has been applied to checkout!");
  //     }
  //   };

  //   checkDiscountCode();
  // }, [discountCode, discountDetails, ticketDetails]);
  // console.log(discountCode)

  const handleAddDiscountClick = () => {
    setShowInput(true);
  };

  const handleApplyDiscount = () => {
    // Logic to apply the discount code (e.g., validate code, apply discount)
    if (discountCode.trim() !== "") {
      setDiscountApplied(true);
    }
  };

  useEffect(() => {
    if (ticketDetails?.length === 0) {
      setShowInput(false)
    }
  }, [ticketDetails])

  const handleClearDiscount = () => {
    setDiscountCode("");
    setDiscountApplied(false);
    setShowInput(false); // Disable input after clearing
  };
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <section className="flex-1">
      <Heading5 className="text-4xl text-center" content={"Order Summary"} />
      <section className="mt-14 px-20 h-4/5 border-l border-[#525252]">
        <div>
          <h3 className="text-OWANBE_PRY text-lg font-BricolageGrotesqueRegular">
            Event name
          </h3>
          <span className="text-OWANBE_FADE text-s font-BricolageGrotesqueRegular">
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
          {showInput && (ticketDetails && ticketDetails?.length > 0) && (
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
                    disabled={!discountCode.trim()} // Disable button if discountCode is empty or only whitespace
                    className={`py-1 px-7 rounded-full bg-OWANBE_PRY font-semibold text-white ${
                      !discountCode.trim() && "opacity-50 cursor-not-allowed"
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
              {discountApplied && (
                <span className="text-OWANBE_PRY text-sm font-BricolageGrotesqueRegular">
                  {discountMessage}
                </span>
              )}
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
                    {ticketDetails
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
                      ?.reduce((acc, ticket) => acc + ticket?.subTotal, 0)
                      .toLocaleString()}
                    {".00 "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center justify-between font-BricolageGrotesqueMedium text-2xl text-OWANBE_PRY my-6">
            <div>Total</div>
            <div>
              ₦{""}
              {ticketDetails
                ?.reduce((acc, ticket) => acc + ticket?.subTotal, 0)
                .toLocaleString()}
              {".00 "}
            </div>
            {/* Adjust this based on your calculation */}
          </div>
          {/* {continueBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
              <Button
                loading={loading}
                onClick={() => {
                  handleClick();
                }}
                className="primary-btn hover:none w-full text-center"
                style={{
                  borderRadius: "25px",
                  fontFamily: "BricolageGrotesqueMedium",
                  backgroundColor:
                    ticketDetails && ticketDetails?.length === 0
                      ? "#cccccc"
                      : "#e20000", // Gray for disabled, red for active
                  color:
                    ticketDetails && ticketDetails?.length === 0
                      ? "#666666"
                      : "white",
                  height: "50px", // Adjust height as needed
                  fontSize: "16px", // Increase text size
                  border: "none", // Remove border if needed
                }}
                title={
                  ticketDetails && ticketDetails?.length === 0
                    ? "Add Ticket"
                    : "Continue"
                }
                disabled={!isFormValid ||(ticketDetails && ticketDetails?.length === 0)}
              >
                Continue
              </Button>
            </div>
          )} */}
          {continueBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
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
                  zIndex: 10,
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
                  : "Make Payment"}
              </Button>{" "}
            </div>
          )}
          {/* {paymentBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
              <button
                className="primary-btn w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Make Payment
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
