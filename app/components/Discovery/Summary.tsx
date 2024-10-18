"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { global } from "styled-jsx/css";
import "@/app/globals.css";
import { Heading5 } from "../typography/Typography";
import PaymentSuccess from "@/app/components/OstivitiesModal/PaymentSuccessModal";
import { PlusSquareOutlined } from "@ant-design/icons";
import { ITicketDetails } from "@/app/utils/interface";
import { useRouter, useParams } from "next/navigation";
import { Button } from "antd";
import { TICKET_ENTITY } from "@/app/utils/enums";

interface SummaryProps {
  continueBtn?: boolean;
  to?: string | any;
  paymentBtn?: boolean;
  ticketDetails?: {
    ticketName: string;
    ticketId: string;
    ticketPrice: number;
    ticketFee: number;
    ticketNumber: number;
    subTotal: number;
  }[];
  eventName?: string;
  onClick?: () => void;
}

const Summary = ({
  continueBtn,
  to,
  paymentBtn,
  ticketDetails,
  eventName,
  onClick,
}: SummaryProps) => {
  const [showInput, setShowInput] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalTicketPrice, setTotalTicketPrice] = useState<number>();
  const [subTotal, setSubTotal] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ event: string }>();
  const router = useRouter();
  console.log(to, "to");

  const handleAddDiscountClick = () => {
    setShowInput(true);
  };

  const handleApplyDiscount = () => {
    // Logic to apply the discount code (e.g., validate code, apply discount)
    if (discountCode.trim() !== "") {
      setDiscountApplied(true);
    }
  };

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
      <Heading5 className="text-4xl text-center" content={"Summary"} />
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
              onClick={handleAddDiscountClick}
              className="flex-center gap-2 text-OWANBE_PRY text-lg font-BricolageGrotesqueRegular cursor-pointer"
            >
              <h3>Add discount code</h3> {<PlusSquareOutlined />}
            </div>
          )}
          {showInput && (
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
                    className={`py-1 px-7 rounded-full bg-OWANBE_PRY font-semibold text-white ${!discountCode.trim() && "opacity-50 cursor-not-allowed"
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
                  Discount code has been applied to checkout!
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
                          Group of {ticket?.groupSize} -{" "}
                          {ticket?.ticketName} x {ticket?.ticketNumber}
                        </div>
                      ) : (
                        // Default rendering for non-collective ticketEntity
                        <div>
                          {ticket?.ticketName} x {ticket?.ticketNumber}
                        </div>
                      )}
                      <div>₦{ticket?.ticketPrice?.toLocaleString()}{".00 "}</div>
                    </div>
                  ))}
                <div className="flex-center justify-between">
                  <div>Fee</div>
                  <div>
                    ₦
                    {ticketDetails
                      ?.reduce((acc, ticket) => acc + ticket?.ticketFee, 0)
                      ?.toLocaleString()}{".00 "}
                  </div>
                </div>
                {discountApplied && (
                  <div className="flex-center justify-between">
                    <div>Discount</div>
                    <div>-₦100.00</div>{" "}
                    {/* Adjust this based on your discount logic */}
                  </div>
                )}
                <div className="flex-center justify-between">
                  <div>Subtotal</div>
                  <div>
                    ₦
                    {ticketDetails
                      ?.reduce((acc, ticket) => acc + ticket?.subTotal, 0)
                      ?.toLocaleString()}{".00 "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center justify-between font-BricolageGrotesqueMedium text-2xl text-OWANBE_PRY my-6">
            <div>Total</div>
            <div>
              ₦{" "}
              {ticketDetails
                ?.reduce(
                  (acc, ticket) => acc + ticket?.subTotal,
                  0
                )
                ?.toLocaleString()}{".00 "}
            </div>
            {/* Adjust this based on your calculation */}
          </div>
          {continueBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
              <Button
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
              >
                Continue
              </Button>
            </div>
          )}
          {paymentBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
              <button
                className="primary-btn w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Make Payment
              </button>
            </div>
          )}
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