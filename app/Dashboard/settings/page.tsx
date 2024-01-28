import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Button from "@/app/ui/atoms/Button";
import { PlusOutlined } from "@ant-design/icons";
import Table from "@/app/ui/organisms/Table";
import data from "@/app/lib/data/index.json";
import { settingsTableHeaders } from "@/app/lib/config/constants";
import TableSearch from "@/app/ui/organisms/Table/TableSearch";
import Tab from "@/app/ui/molecules/Tab";

function Settings() {
  const tabs = [
    "Profile",
    "Billing",
    "Order Notifications",
    "Payment Settings",
  ];
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
      <Tab tabs={tabs} currentPage="registeredUserSettingsPage" />
      {/* <div className="mx-auto md:max-w-[95%] flex flex-col h-[60dvh]">
        <Table
          columns={settingsTableHeaders}
          data={data.settingsData}
          Btn={
            <Button
              size="default"
              label="Add New Admin"
              prefixIcon={<PlusOutlined />}
            />
          }
        />
      </div> */}
    </DashboardLayout>
  );
}

export default Settings;
