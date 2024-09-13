"use client";

import EventPageAppearance from "@/app/components/forms/create-events/EventPageAppearance";
import React from "react";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Steppers from "@/app/components/Steppper/Steppers";
import { useParams } from "next/navigation";

function Page() {
  const { id } = useParams();

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: "24px" }}>Create Event</h1>
      <div className="flex space-x-4"></div>
    </div>
  );

  console.log(id);
  return (
    <>
      <DashboardLayout title={title} steppers={<Steppers />} isLoggedIn>
        <div className="w-full mx-auto flex flex-col space-y-5 py-6">
          <EventPageAppearance />
        </div>
      </DashboardLayout>
    </>
  );
}

export default Page;
