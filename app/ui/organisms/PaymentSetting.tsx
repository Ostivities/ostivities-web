import Button from "../atoms/Button";
import H4 from "../atoms/H4";
import ToggleSwitch from "../atoms/ToggleSwitch";

const PaymentSetting = () => {
  return (
    <form className="px-12 py-5 min-h-[60vh] flex flex-col items-center justify-between">
      <div className="self-start">
        <>
          <H4 content="Payment Setting" />
          <p className="text-OWANBE_PRY mt-3">
            How frequently do you want to receive payouts of ticket sales?
          </p>
        </>

        <div className="flex flex-col gap-y-9 mt-11">
          <ToggleSwitch
            label="weeklyPayment"
            description="Weekly, Payments will be grouped and processed weekly, with disbursements made every Friday."
          />

          <ToggleSwitch
            label="monthlyPayment"
            description="Monthly, Payments will be processed and disbursed monthly on the last Friday of each month."
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

export default PaymentSetting;
