"use client";
import Discount from "@/app/components/Discounts/Discount";
import DiscountCode from "@/app/components/Discounts/DiscountCode";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import React from "react";

const EventTicketDiscount = () => {
  const { discount } = useDiscount();
  return (
    <EventDetailsComponent>
      {discount === "Discount" ? <Discount /> : <DiscountCode />}
    </EventDetailsComponent>
  );
};

export default EventTicketDiscount;
