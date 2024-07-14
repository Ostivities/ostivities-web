import React, { createContext, ReactNode, useContext, useState } from "react";

type DiscountState = "Discount" | "Discount_Code";

interface DiscountContextProps {
  discount: DiscountState;
  toggleDiscount: () => void;
}

const DiscountContext = createContext<DiscountContextProps | undefined>(
  undefined
);

const useDiscount = (): DiscountContextProps => {
  const context = useContext(DiscountContext);
  if (context === undefined) {
    throw new Error("useDiscount must be used within a DiscountProvider");
  }
  return context;
};

interface DiscountProviderProps {
  children: ReactNode;
}

const DiscountProvider: React.FC<DiscountProviderProps> = ({ children }) => {
  const [discount, setDiscount] = useState<DiscountState>("Discount");

  const toggleDiscount = () => {
    setDiscount((prevState) =>
      prevState === "Discount" ? "Discount_Code" : "Discount"
    );
  };

  return (
    <DiscountContext.Provider value={{ discount, toggleDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};

export { DiscountProvider, useDiscount };
