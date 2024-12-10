"use client";
import Product from "@/app/components/Product/productrecord";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import React from "react";

const merchandise = () => {
  return (
    <EventDetailsComponent>
      <Product />
    </EventDetailsComponent> 
  );
};

export default merchandise;