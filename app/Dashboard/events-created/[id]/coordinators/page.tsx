"use client";
import Coordinatorss from "@/app/components/Coordinators/CoordinatorsRecord";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import React from "react";

const Coordinators = () => {
  const { discount } = useDiscount();
  return (
    <EventDetailsComponent>
      {discount === "Discount" && <Coordinatorss />}
    </EventDetailsComponent>
  );
};

export default Coordinators;
