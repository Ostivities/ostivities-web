"use client";
import Vendorss from "@/app/components/Vendors/vendorsrecord";  
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import React from "react";

const Vendors = () => {
  const { discount } = useDiscount();
  return (
    <EventDetailsComponent>
      {discount === "Discount" && <Vendorss />}

    </EventDetailsComponent>
  );
};

export default Vendors;
