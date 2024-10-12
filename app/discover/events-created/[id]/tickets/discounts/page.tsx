"use client";
import Discount from "@/app/components/Discounts/Discount";
import DiscountCode from "@/app/components/Discounts/DiscountCode";
import DiscountRecord from "@/app/components/Discounts/DiscountRecord";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import React from "react";

const EventTicketDiscount = () => {
  return (
    <EventDetailsComponent>
      {/* {discount === "Discount" && <Discount />} */}
      {/* {discount === "Discount_Code" && <DiscountCode />} */}
     <DiscountRecord />
    </EventDetailsComponent>
  );
};

export default EventTicketDiscount;
