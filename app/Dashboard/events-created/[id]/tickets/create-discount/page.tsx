"use client";
import DiscountCode from "@/app/components/Discounts/DiscountCode";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import React from "react";

const EventTicketDiscount = () => {
  return (
    <EventDetailsComponent>
      <DiscountCode />
    </EventDetailsComponent>
  );
};

export default EventTicketDiscount;
