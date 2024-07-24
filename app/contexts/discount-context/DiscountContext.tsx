import React, { createContext, ReactNode, useContext, useState } from "react";

type DiscountState = "Discount" | "Discount_Code" | "Discount_Record";

interface DiscountContextProps {
  discount: DiscountState;
  toggleDiscount: (stateValue: DiscountState) => void;
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

  const toggleDiscount = (stateValue: DiscountState) => {
    setDiscount(stateValue);
  };

  return (
    <DiscountContext.Provider value={{ discount, toggleDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};

export { DiscountProvider, useDiscount };
