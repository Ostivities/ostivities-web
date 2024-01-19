import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Button from "@/app/ui/atoms/Button";
import { Input } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function Settings() {
  const headers = ["Staff Name", "Designation", "Date Assigned", "Action"];
  return (
    <DashboardLayout
      title="Settings"
      extraComponents={
        <div className="flex gap-x-2">
          <Button label="Manage admin" />
          <Button label="Revenue Generated" variant="text" />
        </div>
      }
    >
      <div className="">
        <div className="flex justify-between mb-11">
          <div className="flex gap-x-4">
            <Input name="search" placeholder="Search staff name" />
            <Button label="Search" />
          </div>

          <Button label="Add New Admin" prefixIcon={<PlusOutlined />} />
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr className="border-b">
              {headers.map((header, i) => (
                <th
                  key={header}
                  className="text-[0.9375rem] font-BricolageGrotesqueMedium text-OWANBE_TABLE_TITLE pb-3"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* <tbody></tbody> */}
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
