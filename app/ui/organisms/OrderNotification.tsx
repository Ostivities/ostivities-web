import Button from "../atoms/Button";
import H4 from "../atoms/H4";
import ToggleSwitch from "../atoms/ToggleSwitch";

const OrderNotification = () => {
  return (
    <form className="px-12 py-5 min-h-[60vh] flex flex-col items-center justify-between">
      <div className="self-start">
        <>
          <H4 content="Order Notifications" />
          <p className="text-OWANBE_PRY mt-3">
            How frequently should we send you order notifications?
          </p>
        </>

        <div className="flex flex-col gap-y-9 mt-11">
          <ToggleSwitch
            label="instantOrder"
            description="Instantly, for each order as it comes in"
          />

          <ToggleSwitch
            label="dailySummary"
            description="A daily summary of all orders sold each day"
          />

          <ToggleSwitch
            label="weeklySummary"
            description="A weekly summary of all orders sold each week"
          />

          <ToggleSwitch
            label="notification"
            description="I do not want to receive order notifications"
          />
        </div>
      </div>

      <Button
        label="Save"
        size="lg"
        className="mt-16 max-w-xs font-BricolageGrotesqueBold"
      />
    </form>
  );
};

export default OrderNotification;
