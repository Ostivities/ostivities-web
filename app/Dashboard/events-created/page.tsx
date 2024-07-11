"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Details from "@/app/components/forms/events-created/Details";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Events(): JSX.Element {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('eventsCreated'); // Set 'eventsCreated' as the initial active tab

  useEffect(() => {
    if (activeTab === "createEvent") {
      router.push('/Dashboard/create-events')   
    }else {
      router.push('/Dashboard/events-created')  
    }
  }, [activeTab])

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: '24px' }}>Events Created</h1>
      <div className="flex space-x-4">
        <span
          className={`font-medium cursor-pointer relative ${activeTab === 'createEvent' ? 'text-black' : 'text-gray-400'}`}
          style={{ fontSize: '15px' }}
          onClick={() => setActiveTab('createEvent')}
        >
          Create Event
          {activeTab === 'createEvent' && (
            <div className="absolute left-0 bottom-[-16px] w-full h-1 bg-red-600 rounded-full"></div>
          )}
        </span>
        <span
          className={`font-medium cursor-pointer relative ${activeTab === 'eventsCreated' ? 'text-black' : 'text-gray-400'}`}
          style={{ fontSize: '15px' }}
          onClick={() => setActiveTab('eventsCreated')}
        >
          Events Created
          {activeTab === 'eventsCreated' && (
            <div className="absolute left-0 bottom-[-16px] w-full h-1 bg-red-600 rounded-full"></div>
          )}
        </span>
      </div>
    </div>
  );

  return (
    <DashboardLayout title={title} isLoggedIn>
      <div className="w-5/6 mx-auto flex flex-col space-y-5 py-6">
        {/* Content for Events Created */}
        {/* For example, <EventsCreatedComponent /> */}
        {/* Replace with your actual content for Events Created */}
        <Details/>
      </div>
    </DashboardLayout>
  );
}

export default Events;
