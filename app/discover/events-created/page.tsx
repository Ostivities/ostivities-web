"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import useFetch from "@/app/components/forms/create-events/auth";
import Details from "@/app/components/forms/events-created/Details";
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function EventsCreated(): JSX.Element {
  const router = useRouter();
  const {isLoggedIn, loading} = useFetch() // Update this based on your authentication logic
  console.log(isLoggedIn, "isLoed")

  useEffect(() => {
    // Only attempt redirect if not loading
    if (!loading && isLoggedIn === false) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);

  const header = (
    <div className="flex-center justify-between w-full">
      <h1 className="text-2xl">Events Created</h1>

      {isLoggedIn && ( 
        <button
          onClick={() => router.push('/discover/create-events')}
          className="bg-OWANBE_PRY rounded-full px-4 py-2 text-xs font-semibold text-white flex items-center"
        >
          <PlusOutlined />
          <span className="pl-1">Create New Event</span>
        </button>
      )}
    </div>
  );

  return (
    <DashboardLayout title={header} isLoggedIn>
     <div className="w-full mx-auto flex flex-col space-y-5 py-6">
        <h1 className="text-black text-lg font-normal font-BricolageGrotesqueRegular mb-2" >
          View & manage all your created events here.
        </h1>
        <Details />
      </div>
    </DashboardLayout>
  );
}

export default EventsCreated;
