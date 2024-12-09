"use client";
import Product from "@/app/components/order/orderrecord";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import React from "react";

const merchandise = () => {
  const { discount } = useDiscount();
  return (
    <EventDetailsComponent>
      {discount === "Discount" && <Product />}
    </EventDetailsComponent> 
  );
};

export default merchandise;