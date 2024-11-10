import { useState } from "react";

type DiscountState = "Discount" | "Discount_Code";

const useToggleDiscount = () => {
  const [discount, setDiscount] = useState<DiscountState>("Discount");

  const toggleDiscount = () => {
    setDiscount((prevState) =>
      prevState === "Discount" ? "Discount_Code" : "Discount"
    );
  };

  return [discount, toggleDiscount] as const;
};

export default useToggleDiscount;
