"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Details from "@/app/components/forms/events-created/Details";


function EventsCreated(): JSX.Element {
  
  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: '24px' }}>Events Created</h1>
      <div className="flex space-x-4">
      </div>
    </div>
  );

  return (
    <DashboardLayout title={title} isLoggedIn>
      <div className="w-full mx-auto flex flex-col space-y-5 py-6">
        {/* Content for Events Created */}
        {/* For example, <EventsCreatedComponent /> */}
        {/* Replace with your actual content for Events Created */}
        <Details />
      </div>
    </DashboardLayout>
  );
}

export default EventsCreated;
