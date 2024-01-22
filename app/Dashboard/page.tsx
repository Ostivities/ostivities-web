import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React from "react";
import { NAV_LINKS } from "../utils/data";
import { Heading3 } from "../components/typography/Typography";
import Discovery from "./settings/discovery/page";

function Dashboard(): JSX.Element {
  return (
    <DashboardLayout title="Event Discovery">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-7">
          <Heading3
            content="Discover Events"
            styles={{ fontSize: "30px", fontWeight: 100 }}
          />
          <Discovery />
        </div>
        {/* <div className="w-[1305px] h-[184px] border-[1px] border-[#FADEDE] rounded-[50px] mx-auto p-8 ">
          <span className="font-semibold text-[16px]">
            Find Events Happening around you
          </span>
        </div> */}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
