import { billingTableHeaders } from "@/app/lib/config/constants";
import Table from "./Table";
import data from "@/app/lib/data/index.json";
import H4 from "../atoms/H4";
import Button from "../atoms/Button";

const Billing = () => {
  return (
    <div className="mx-auto md:max-w-[95%] flex flex-col h-[60dvh]">
      <Table
        columns={billingTableHeaders}
        data={data.billingData}
        TableTop={
          <div className="flex justify-between items-center px-4 my-6">
            <H4 content="Your Invoices" />
            <Button label="Export" />
          </div>
        }
        action="download"
      />
    </div>
  );
};

export default Billing;
