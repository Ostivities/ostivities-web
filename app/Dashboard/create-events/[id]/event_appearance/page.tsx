"use client";

import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import useFetch from "@/app/components/forms/create-events/auth";
import EventPageAppearance from "@/app/components/forms/create-events/EventPageAppearance";
import Steppers from "@/app/components/Steppper/Steppers";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { id } = useParams();

  // const { isLoggedIn } = useFetch();

  // if(!isLoggedIn) {
  //   return null;
  // }

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: "24px" }}>Create Event</h1>
      <div className="flex space-x-4"></div>
    </div>
  );

  return (
    <>
      <DashboardLayout title={title} steppers={<Steppers />} isLoggedIn>
        <div className="w-full mx-auto flex flex-col space-y-5 py-6">
          <EventPageAppearance />
        </div>
        <br />
      </DashboardLayout>
    </>
  );
}

export default Page;
