import { useState } from "react";
import Button from "../atoms/Button";
import H4 from "../atoms/H4";
import ToggleSwitch from "../atoms/ToggleSwitch";

const OrderNotification = () => {
  const [activeToggle, setActiveToggle] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setActiveToggle((prev) => (prev === label ? null : label));
  };

  return (
    <form className="px-12 py-5 min-h-[60vh] flex flex-col items-center justify-between">
      <div className="self-start">
        <>
          <H4 content="Order Notifications" />
          <p style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: '400' }} className="text-OWANBE_PRY mt-3">
    How frequently should we send you order notifications?
</p>
        </>

        <div className="flex flex-col gap-y-8 mt-11">
          <ToggleSwitch
            label="instantOrder"
            description="Instantly, for each order as it comes in."
            isActive={activeToggle === "instantOrder"} 
            onToggle={() => handleToggle("instantOrder")}
          />

          <ToggleSwitch
            label="dailySummary"
            description="A daily summary of all orders sold each day."
            isActive={activeToggle === "dailySummary"}
            onToggle={() => handleToggle("dailySummary")}
          />

          <ToggleSwitch
            label="weeklySummary"
            description="A weekly summary of all orders sold each week."
            isActive={activeToggle === "weeklySummary"}
            onToggle={() => handleToggle("weeklySummary")}
          />

          <ToggleSwitch
            label="notification"
            description="I do not want to receive order notifications."
            isActive={activeToggle === "notification"}
            onToggle={() => handleToggle("notification")}
          />
        </div>
      </div>

      <Button
            label="Save changes"
            size="lg"
            className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
            style={{ marginBottom: '20px' }}
           />
    </form>
  );
};

export default OrderNotification;
