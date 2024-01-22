import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React from "react";

function Dashboard() {
  return (
    <DashboardLayout title="Event Discovery">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-7">
          <span className="font-semibold text-3xl">Discover Events</span>
          <div>
            <div className="h-[244px] w-[236px] rounded-[50px] "></div>
          </div>
        </div>
        <div className="w-[1305px] h-[184px] border-[1px] border-[#FADEDE] rounded-[50px] mx-auto p-8 ">
          <span className="font-semibold text-[16px]">
            Find Events Happening around you
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
