"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import useFetch from "@/app/components/forms/create-events/auth";
import Details from "@/app/components/forms/venue-hub/Details";
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import React from 'react';

function VenueHub(): JSX.Element {
  const router = useRouter();
  const { isLoggedIn } = useFetch() // Update this based on your authentication logic

  const header = (
    <div className="flex-center justify-between w-full">
      <h1 className="text-2xl">Venue Hub</h1>

      {isLoggedIn && (
        <button
          onClick={() => router.push('/discover/venue-hub')}

        >


        </button>
      )}
    </div>
  );

  return (
    <DashboardLayout title={header} isLoggedIn>
      <div className="w-full mx-auto flex flex-col space-y-5 py-6">
        <h1 className="text-black text-lg font-normal font-BricolageGrotesqueRegular mb-2" >
          Find & book available venue for your events
        </h1>
        <Details />
      </div>
    </DashboardLayout>
  );
}

export default VenueHub;