import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Button from "@/app/ui/atoms/Button";
import { PlusOutlined } from "@ant-design/icons";
import Table from "@/app/ui/organisms/Table";
import data from "@/app/lib/data/index.json";
import { settingsTableHeaders } from "@/app/lib/config/constants";
import TableSearch from "@/app/ui/organisms/Table/TableSearch";
import TablePagination from "@/app/ui/organisms/Table/TablePagination";

function Settings() {
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
      <div className="mx-auto max-w-[95%] flex flex-col">
        <div className="flex justify-between mb-11 w-full">
          <TableSearch />

          <Button
            size="default"
            label="Add New Admin"
            prefixIcon={<PlusOutlined />}
          />
        </div>

        <Table columns={settingsTableHeaders} data={data.settingsData} />

        <TablePagination />
      </div>
    </DashboardLayout>
  );
}

export default Settings;
