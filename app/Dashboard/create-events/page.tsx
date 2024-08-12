"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Steppers from "@/app/components/Steppper/Steppers";
import Details from "@/app/components/forms/create-events/Details";
import { useRouter } from "next/navigation";

function CreateEvents(): JSX.Element {

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: '24px' }}>Create Event</h1>
      <div className="flex space-x-4">
      </div>
    </div>
  );

  return (
    <DashboardLayout title={title} steppers={<Steppers />} isLoggedIn>
      <div className="w-full mx-auto flex flex-col space-y-5 py-6">
        <Details />
      </div>
    </DashboardLayout>
  );
}

export default CreateEvents;
