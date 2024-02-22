"use client";

import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Button from "@/app/ui/atoms/Button";
import { PlusOutlined } from "@ant-design/icons";
import Table from "@/app/ui/organisms/Table";
import data from "@/app/lib/data/index.json";
import { settingsTableHeaders } from "@/app/lib/config/constants";
import TableSearch from "@/app/ui/organisms/Table/TableSearch";
import Tab from "@/app/ui/molecules/Tab";
import { useCallback, useState } from "react";
import Profile from "@/app/ui/organisms/Profile";

const tabs = ["Profile", "Billing", "Order Notifications", "Payment Settings"];

function Settings() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const selectCurrentTab = useCallback((tab: string) => {
    setCurrentTab(tab);
  }, []);
  return (
    <DashboardLayout
      title="Settings"
      extraComponents={
        <Tab
          tabs={tabs}
          currentTab={currentTab}
          handleCurrentTab={selectCurrentTab}
        />
      }
    >
      {currentTab === "Profile" ? (
        <Profile />
      ) : currentTab === "Billing" ? (
        <div>Billing</div>
      ) : currentTab === "Order Notifications" ? (
        <div>Order Notifications</div>
      ) : currentTab === "Payment Settings" ? (
        <div>PAyment Settings</div>
      ) : null}

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
